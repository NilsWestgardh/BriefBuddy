"use client";

import React, { 
  createContext,
  useState, 
  useEffect 
} from "react";
import { createClient } from '@/app/utils/supabase/client';
import { UserProfileType } from '@/app/utils/types/UserProfileType';
import { User } from '@supabase/supabase-js';

type UserContextType = {
  user: User | null;
  profile: UserProfileType | null;
  loading: boolean;
};

const UserContext = createContext<UserContextType>({
  user: null,
  profile: null,
  loading: true,
});

export default function UserProvider({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfileType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserProfile() {
      const { 
        data: { 
          user 
        } 
      } = await supabase
        .auth
        .getUser();

      setUser(user);

      if (user) {
        const { 
          data, 
          error 
        } = await supabase
          .from("users")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) {
          console.error(
            "Error fetching user profile:", 
            error.message
          );
        } else if (data) {
          setProfile(data);
        };
      };
      setLoading(false);
    };

    if (!profile) {
      fetchUserProfile();
    };

    // Subscribe to changes
    const channel = supabase
      .channel("realtime user changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "users",
        },
        (payload) => {
          console.log("User data change: ", payload); // Debugging
          if (
            payload.new && (
              payload.new as { 
                id: string 
              }
            ).id === user?.id
          ) {
            setProfile(payload.new as UserProfileType);
          }
        }
      )
      .subscribe();

      return () => {
        channel.unsubscribe();
      };

  }, [
    supabase, 
    profile, 
    user
  ]);

  return (
    <UserContext.Provider
      value={{ 
        user, 
        profile, 
        loading 
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => React.useContext(UserContext);
"use client";

// Hooks
import React, { 
  useState, 
  useEffect 
} from "react";
import { useForm } from "react-hook-form";
import { createClient } from "@/app/utils/supabase/client";
import { useUser } from "@/app/contexts/UserContext";
// Validation
import TeamFormSchema from "@/app/utils/schemas/TeamFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
// Types
import { TeamFormType } from "@/app/utils/types/TeamFormType";
import { TeamMember } from "@/app/utils/types/TeamMember";
// Utils
import clsx from "clsx";
// TODO: Import PostHog
// Components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Popover from "@mui/material/Popover";
import Skeleton from "@mui/material/Skeleton";
import Divider from "@mui/material/Divider";
// Icons
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import AddIcon from '@mui/icons-material/Add';

export default function SidebarTeamSelect({ 
  team 
}: { 
  team: string 
}) {
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const [teams, setTeams] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const methods = useForm<TeamFormType>({
    defaultValues: {
      id: 0,
      created_at: "",
      updated_at: "",
      name: "",
      plan: "",
      project_limit: 0,
      members_limit: 0,
    },
    resolver: zodResolver(TeamFormSchema),
  });
  const { 
    reset,
    register, 
    handleSubmit, 
    formState: { 
      errors,
      isDirty,
      isValid,
      isSubmitting
    } 
  } = methods;

  const { user, loading: userLoading } = useUser();
  const supabase = createClient();
  // TODO: Add PostHog

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    reset();
  };

  const open = Boolean(anchorEl);
  const id = open ? 'team-popover' : undefined;

  // Create team
  async function onSubmit(
    data: TeamFormType
  ) {
    if (user) {
      try {
        const { 
          data: newTeam, 
          error 
        } = await supabase
          .from("teams")
          .insert([
            {
              name: data.name,
              user_id: user.id,
            },
          ])
          .select();

        if (error) {
          console.error(
            "Error creating team: ",
              error
          );
        } else if (newTeam) {
          setTeams([...teams, newTeam[0].name]);
          handleClose();
        };
      } catch (error) {
        console.error("Error: ", error);
      }
    };
  };

  // Fetch teams
  useEffect(() => {
    async function fetchTeams() {
      if (user) {
        const { data, error } = await supabase
          .from("team_members")
          .select("team_id, teams(name)")
          .eq("user_id", user.id)

        if (error) {
          console.error("Error fetching teams: ", error);
        } else if (data) {
          setTeams(data.map((item: TeamMember) => item.teams[0].name));
        }
      };
      setLoading(false);
    };

    if (teams.length === 0) {
      fetchTeams();
    };
  }, [
    user, 
    supabase
  ]);

  return (
    <Box
      id="sidebar-team-select-container"
      className="
        relative
        flex
        flex-col
        w-full
      "
    >
      <Box
        id="sidebar-team-select-button"
        onClick={handleClick}
        className="
          flex
          flex-row
          justify-between
          items-center
          w-full
          gap-2
          py-1
          px-2
          rounded-md
          border
          border-neutral-700
          bg-white
          hover:border-neutral-500
          hover:cursor-pointer
          hover:opacity-90
        "
      >
        <Box
          id="sidebar-team-select-content"
          className="
            flex
            flex-col
            justify-start
            items-start
            w-full
          "
        >
          <Typography variant="caption" className="neutral-500">
            Team
          </Typography>
          <Typography variant="subtitle2" className="font-semibold text-black">
            {team}
          </Typography>
        </Box>
        {open ? (
          <ExpandLessIcon className="text-neutral-700" />
        ) : (
          <ExpandMoreIcon className="text-neutral-700" />
        )}
      </Box>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        className={clsx("",
          {
            "bg-black/20": open
          }
        )}
      >
        <Box
          id="sidebar-team-select-dropdown"
          className="
            flex
            flex-col
            justify-start
            center-start
            p-2
            rounded-md
            border
            border-black
            bg-white
            w-full
            gap-2
          "
        >
          <Box
            id="popover-teams-list"
            className="
              flex
              flex-col
              justify-start
              items-start
              w-full
            "
          >
            {
              teams.length === 0 && (
                <Typography
                  variant="body2"
                  className="
                    bg-neutral-100 
                    p-2
                    rounded-md
                    w-full
                  "
                >
                  No teams found
                </Typography>
              )
            }
            {loading ? (
              <Skeleton
                variant="text"
                width="100%"
                height={40}
              />
            ) : (
              teams.map((teamName, index) => (
                <Typography
                  key={index}
                  variant="body2"
                  className="
                    hover:cursor-pointer 
                    hover:bg-neutral-100 
                    p-2 
                    rounded-md
                    w-full
                  "
                >
                  {teamName}
                </Typography>
              ))
            )}
          </Box>
          {teams.length !== 0 && (
            <Divider
              flexItem
              className="opacity-20"
            />
          )}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="
              flex
              flex-col
              justify-start
              items-start
              gap-2
            "
          >
            <Box
              id="popover-new-team-form"
              className="
                flex
                flex-col
                justify-start
                items-start
                w-full
                gap-1
              "
            >
              <Typography
                variant="caption"
                className="font-semibold"
              >
                Create new team
              </Typography>
              <TextField
                {...register(
                  "name", { 
                    required: "Team name is required" 
                  })}
                label="Team Name"
                variant="outlined"
                fullWidth
                margin="dense"
                size="small"
                placeholder="ACME Inc."
                error={!!errors.name}
                helperText={errors.name?.message}
                inputProps={{ autoComplete: "off" }}
              />
              {isDirty && (
                <Button
                  type="submit"
                  variant="outlined"
                  color="primary"
                  size="small"
                  disabled={
                    !isValid || 
                    isSubmitting || 
                    loading || 
                    userLoading
                  }
                  endIcon={
                    isSubmitting ? 
                    <CircularProgress size={24} /> : 
                    <AddIcon />
                  }
                  className="
                    flex
                    flex-row
                    justify-between
                    items-center
                    w-full
                    bg-white
                    hover:bg-neutral-100
                    transition-all
                    border-neutral-700
                    hover:border-black
                    mb-1
                  "
                  sx={{
                    boxShadow: "0 2px 0 0 #404040",
                    "&:hover": {
                      boxShadow: "0 2px 0 0 #000000"
                    }
                  }}
                >
                  Create Team
                </Button>
              )}
            </Box>
          </form>
        </Box>
      </Popover>
    </Box>
  );
};
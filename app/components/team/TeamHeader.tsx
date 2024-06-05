"use client";

// Hooks
import React, { 
  useState, 
  useEffect, 
  useRef 
} from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTeam } from "@/app/contexts/TeamContext";
// Validation
import TeamFormSchema from "@/app/utils/schemas/TeamFormSchema";
import { TeamFormType } from "@/app/utils/types/TeamFormType";
// Utils
import { createClient } from "@/app/utils/supabase/client";
import timeSince from "@/app/actions/timeSince"; // Replace with ISO date formatting
// Components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
// Icons
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";

const defaultFormValues: TeamFormType = {
  id: 0,
  user_id: "",
  created_at: "",
  updated_at: "",
  name: "Team name",
  plan: "",
  projects_limit: 0,
  members_limit: 0,
};

export default function TeamHeader() {
  const { selectedTeam } = useTeam();
  const methods = useForm<TeamFormType>({
    defaultValues: defaultFormValues,
    resolver: zodResolver(TeamFormSchema),
    mode: "onChange",
  });

  const {
    watch,
    control,
    handleSubmit,
    setValue,
    formState: { 
      errors, 
      isDirty,
      isValid 
    },
  } = methods;

  const supabase = createClient();
  const form = watch();

  const textFieldRef = useRef<HTMLInputElement>(null);

  const [nameEditable, setNameEditable] = useState(false);
  const [creatorName, setCreatorName] = useState<string>("");
  const [createdAt, setCreatedAt] = useState<string>("");
  const [updatedAt, setUpdatedAt] = useState<string>("");

  // Update team name
  async function onSubmit(
    data: TeamFormType
  ) {
    // console.log("Submitted data: ", data);
    const { 
      error 
    } = await supabase
      .from('teams')
      .update({ 
        name: data.name, 
        updated_at: new Date().toISOString() 
      })
      .eq(
        'id', 
        data.id
      );

    if (error) {
      console.error(
        'Error updating team name:', 
        error
      );
    } else {
      setUpdatedAt(new Date().toISOString());
      setNameEditable(false);
    }
  };

  // Handle editable name
  function handleEditableName() {
    if (nameEditable) {
      handleSubmit(onSubmit)();
    } else {
      setNameEditable(true);
      if (form.name === defaultFormValues.name) {
        setValue("name", "");
      };
      setTimeout(
        () => textFieldRef.current?.focus(), 
        100
      );
    };
  };

  // Fetch team data
  useEffect(() => {
    if (!selectedTeam) return;
    async function fetchTeamData() {
      const { 
        data, 
        error 
      } = await supabase
        .from('teams')
        .select('*')
        .eq('id', selectedTeam?.id)
        .single();

      if (error) {
        console.error(
          'Error fetching team data:', 
          error
        );
        return;
      };

      if (data) {
        // console.log("Fetched team data: ", data)
        setValue('id', data.id);
        setValue('user_id', data.user_id);
        setValue('created_at', data.created_at);
        setValue('updated_at', data.updated_at);
        setValue('name', data.name);
        setValue('plan', data.plan);
        setValue('projects_limit', data.projects_limit);
        setValue('members_limit', data.members_limit);
        setCreatedAt(new Date(data.created_at).toLocaleDateString());
        setUpdatedAt(new Date(data.updated_at).toLocaleDateString());

        // Fetch team members data
        const { 
          data: teamMembersData, 
          error: teamMembersError 
        } = await supabase
          .from('team_members')
          .select('user_id')
          .eq('team_id', data.id)
          .eq('role', 'owner')
          .single();

        if (teamMembersError) {
          console.error(
            'Error fetching team members data:', 
            teamMembersError
          );
        } else if (teamMembersData) {
          // Fetch user data
          const { 
            data: userData, 
            error: userError 
          } = await supabase
            .from('users')
            .select('first_name, last_name')
            .eq(
              'id', 
              teamMembersData.user_id
            )
            .single();

          if (userError) {
            console.error(
              'Error fetching user data:', 
              userError
            );
          } else {
            setCreatorName(`${userData.first_name} ${userData.last_name}`);
          }
        }
      }
    };
    fetchTeamData();
  }, [
    selectedTeam, 
    setValue, 
    supabase
  ]);

  return (
    <Box
      id="team-header-container"
      className="
        flex
        flex-row
        justify-between
        items-center
        w-full
        min-h-20
        px-4
        pt-1
        pb-2
        bg-neutral-100
        border-b
        border-neutral-300
        z-10
        sticky
        top-0
      "
    >
      <Box
        id="team-name-header-info-container"
        className="
          flex
          flex-col
          justify-start
          items-start
        "
      >
        <Box
          id="team-name"
          className="
            flex
            flex-row
            justify-start
            items-center
            gap-1
          "
        >
          {nameEditable ? (
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  inputRef={textFieldRef}
                  id="team-name"
                  label="Team name"
                  placeholder="Team name"
                  size="small"
                  color="primary"
                  error={!!errors.name}
                  helperText={errors.name ? errors.name.message : ""}
                  inputProps={{
                    maxLength: 50,
                    autoComplete: "off",
                  }}
                  sx={{
                    flex: 1,
                    minWidth: "150px",
                    "& .MuiOutlinedInput-root": {
                      fontSize: "1rem",
                      fontWeight: "bold",
                      lineHeight: "1.5",
                      padding: 0,
                      "& fieldset": {
                        border: "none",
                      },
                      "&:hover fieldset": {
                        border: "none",
                      },
                      "&.Mui-focused fieldset": {
                        border: "none",
                      },
                      "&:after": {
                        borderBottom: "2px solid",
                      },
                    },
                    "& .MuiInputBase-input": {
                      padding: 0,
                      width: "auto",
                    },
                    "& .MuiInputLabel-root": {
                      display: "none",
                    },
                  }}
                />
              )}
            />
          ) : (
            <Typography
              variant="subtitle1"
              className="
                text-black
                font-semibold
              "
              sx={{ flex: 1 }}
            >
              {form.name !== defaultFormValues.name ? form.name : ""}
            </Typography>
          )}
          {form.name !== defaultFormValues.name && (
            !nameEditable ? (
              <IconButton
                onClick={handleEditableName}
                size="small"
              >
                <EditIcon />
              </IconButton>
            ) : (
              <IconButton
                onClick={handleEditableName}
                size="small"
                disabled={
                  form.name.length < 4 ||
                  !isDirty ||
                  !isValid
                }
              >
                <CheckIcon />
              </IconButton>
            )
          )}
        </Box>
        
        <Box
          id="team-details"
          className="
            flex
            flex-row
            flex-wrap
            justify-start
            items-center
            gap-2
            text-neutral-700
          "
        >
          <Typography variant="caption">
            {creatorName ? `Created by ${creatorName}` : "Created by user"}
          </Typography>
          <span className="text-neutral-500">•</span>
          <Typography variant="caption">
            {/* TODO: Replace with ISO formatted date */}
            {createdAt ? `Created ${timeSince(createdAt)}` : "Created date"}
          </Typography>
          {updatedAt && updatedAt !== createdAt && (
            <>
              <span className="text-neutral-500">•</span>
              <Typography variant="caption">
                {/* TODO: Replace with ISO formatted date */}
                Updated {timeSince(updatedAt)}
              </Typography>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};
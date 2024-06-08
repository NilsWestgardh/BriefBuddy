"use client";

// Hooks
import React, { 
  useState,
  useEffect, 
} from "react";
import { useRouter } from 'next/navigation';
import { useUser } from "@/app/contexts/UserContext";
import { useTeam } from "@/app/contexts/TeamContext";
import { useForm } from "react-hook-form";
// Validation
import ProjectFormSchema from "@/app/utils/schemas/ProjectFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProjectFormType } from "@/app/utils/types/ProjectFormType";
// Types
import { TeamMemberType } from "@/app/utils/types/TeamMemberType";
// Utils
import { createClient } from "@/app/utils/supabase/client";
// Components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import CircularProgress from '@mui/material/CircularProgress';
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import Alert from "@mui/material/Alert";
// Icons
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from '@mui/icons-material/Info';
import ErrorIcon from '@mui/icons-material/Error';
import CheckIcon from '@mui/icons-material/Check';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

type CreateProjectModalProps = {
  open: boolean;
  projects_limit?: number;
  handleClose: () => void;
}

export default function CreateProjectModal({ 
  open, 
  projects_limit,
  handleClose,
}: CreateProjectModalProps) {
  const methods = useForm<ProjectFormType>({
    defaultValues: {
      team_id: 0,
      user_id: "0",
      name: "",
      client: "",
      details: "",
    },
    resolver: zodResolver(ProjectFormSchema),
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

  const supabase = createClient();
  const router = useRouter();
  const { user } = useUser();
  const { selectedTeam } = useTeam();

  const [showAlertInfo, setShowAlertInfo] = useState<boolean>(false);
  const [alertInfo, setAlertInfo] = useState<{
    type: "success" | "error" | "info" | "warning";
    icon: React.ReactNode;
    message: string;
  } | null>(null);
  
  // Create new project
  async function onSubmit(
    data: ProjectFormType
  ) {
    setAlertInfo({
      type: "info",
      icon: <InfoIcon />,
      message: "Creating project..."
    });
    setShowAlertInfo(true);

    try {
      if (
        !user || 
        !selectedTeam
      ) {
        throw new Error("User or team not found");
      };

      // Fetch team members
      const { 
        data: teamMembers,
        error: teamMembersError
      } = await supabase
        .from("team_members")
        .select("*")
        .eq(
          "team_id", 
          selectedTeam.id
        );

      if (teamMembersError) {
        console.error(
          "Error fetching team members: ", 
          teamMembersError
        );
        setAlertInfo({
          type: "error",
          icon: <ErrorIcon />,
          message: "Error fetching team members. Please try again."
        });

      } else if (teamMembers) {
        // Check if user is a team admin or owner
        const adminOrOwnerMembers = teamMembers
          .find((
            member: TeamMemberType
          ) => member.role === "admin" || member.role === "owner"
        );

        if (!adminOrOwnerMembers) {
          console.error(
            "User is not an admin or owner of the team"
          );
          setAlertInfo({
            type: "error",
            icon: <ErrorIcon />,
            message: "You are not an admin or owner of the team."
          });
          return;

        } else if (adminOrOwnerMembers) {
          // Create new project
          const { 
            data: project, 
            error 
          } = await supabase
            .from("projects")
            .insert([
              {
                name: data.name,
                client: data.client,
                details: data.details,
                user_id: user.id,
                team_id: selectedTeam ? selectedTeam.id : null,
              },
            ])
            .select();
    
          if (error) {
            console.log(
              "Error creating project: ", 
              error
            );
            setAlertInfo({
              type: "error",
              icon: <ErrorIcon />,
              message: "Error creating project. Please try again."
            });

          } else if (project) {
            const projectId = project[0].id;
            
            // Add user to project_members
            const { 
              error: projectMemberError 
            } = await supabase
              .from("project_members")
              .insert([
                {
                  user_id: user.id,
                  project_id: projectId,
                  team_member_id: adminOrOwnerMembers.id,
                  project_role: "owner",
                },
              ]);
    
            if (projectMemberError) {
              console.log(
                "Error adding user to project_members: ", 
                projectMemberError
              );
              
            } else {
              // TODO: Log in PostHog

              console.log(
                "Project created successfully: ", 
                project
              );
              setAlertInfo({
                type: "success",
                icon: <CheckIcon />,
                message: "Project created successfully! Redirecting..."
              });

              setTimeout(() => {
                // Hide alert
                setShowAlertInfo(false);
                // Reset form
                reset();
                // Close modal
                handleClose();
                // Redirect to project page
                router.push(`/project/${projectId}`);
              }, 2000);
            };
          };
        };
      };
    } catch (error) {
      console.log(
        "Error creating project: ", 
        error
      );
      setAlertInfo({
        type: "error",
        icon: <ErrorIcon />,
        message: "Error creating project. Please try again."
      });
    } finally {
      // Hide alert
      setTimeout(() => {
        setShowAlertInfo(false);
      }, 3000);
    };
  };

  // Reset form when user or team changes
  useEffect(() => {
    if (user && selectedTeam) {
      reset({
        team_id: selectedTeam.id,
        user_id: user.id,
        name: "",
        client: "",
        details: "",
      });
    }
  }, [
    user, 
    selectedTeam, 
    reset
  ]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      aria-labelledby="New project modal"
      aria-describedby="New project modal"
      slots={{ 
        backdrop: Backdrop 
      }}
    >
      <Fade in={open}>
        <Box
          id="modal-container"
          className="
            flex
            items-center
            justify-center
            min-h-screen
          "
        >
          <Box
            id="modal-content"
            className="
              bg-white
              p-4
              rounded-md
              shadow-lg
              w-full
              max-w-md
              relative
              border
              border-neutral-500
            "
          >
            <Box
              id="modal-body"
              className="
                flex
                flex-col
                items-center
                justify-center
                w-full
                gap-6
              "
            >
              <Box
                id="modal-header"
                className="
                  flex
                  flex-row
                  justify-between
                  items-start
                  w-full
                "
              >
                <Box
                  id="modal-title"
                  className="
                    flex
                    flex-col
                    justify-start
                    items-start
                  "
                >
                  <Typography
                    variant="subtitle1"
                    className="
                      font-semibold
                      text-black
                    "
                  >
                    New Project
                  </Typography>
                  <Typography
                    variant="body2"
                    className="
                      text-neutral-500
                    "
                  >
                    Name your project to get started.
                  </Typography>
                </Box>
                <IconButton onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
              </Box>
              <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                <Box
                  className="
                    flex
                    flex-col
                    items-start
                    justify-start
                    w-full
                    gap-4
                  "
                >
                  <TextField
                    {...register("name", { required: "Project name is required" })}
                    disabled={projects_limit === 0}
                    type="text"
                    label="Project Name"
                    placeholder="Project X"
                    variant="outlined"
                    color="primary"
                    fullWidth
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    inputProps={{ autoComplete: "off" }}
                  />
                  <TextField
                    {...register("client")}
                    disabled={projects_limit === 0}
                    type="text"
                    label="Client Name"
                    placeholder="ACME Inc."
                    variant="outlined"
                    color="primary"
                    fullWidth
                    error={!!errors.client}
                    helperText={"(Client name is optional)"}
                    inputProps={{ autoComplete: "off" }}
                  />
                  <TextField
                    {...register("details")}
                    disabled={projects_limit === 0}
                    type="text"
                    label="Project details"
                    placeholder="This project is about..."
                    variant="outlined"
                    color="primary"
                    fullWidth
                    error={!!errors.details}
                    helperText={"(Project details is optional)"}
                    inputProps={{ autoComplete: "off" }}
                  />
                  {/* Alert */}
                  {showAlertInfo && (
                    <Alert
                      severity={alertInfo?.type}
                      icon={alertInfo ? alertInfo.icon : undefined}
                      className="w-full"
                    >
                      {alertInfo ? alertInfo.message : "Error"}
                    </Alert>
                  )}
                  {/* Submit Button */}
                  {isDirty && (
                    <Button
                      type="submit"
                      disabled={projects_limit === 0 || !isValid || isSubmitting}
                      variant="outlined"
                      className="
                        w-full
                        flex
                        justify-between
                        bg-white
                        hover:bg-neutral-100
                        transition-all
                        border-neutral-700
                        hover:border-black
                      "
                      sx={{
                        boxShadow: "0 2px 0 0 #404040",
                        "&:hover": {
                          boxShadow: "0 2px 0 0 #000000",
                        },
                      }}
                      endIcon={
                        isSubmitting ? (
                          <CircularProgress size={24} />
                        ) : (
                          <ArrowForwardIcon />
                        )
                      }
                    >
                      Create project
                    </Button>
                  )}
                </Box>
              </form>
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};
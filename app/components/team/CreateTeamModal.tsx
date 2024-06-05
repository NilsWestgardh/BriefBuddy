"use client";

// Hooks
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useUser } from '@/app/contexts/UserContext';
import { useTeam } from '@/app/contexts/TeamContext';
import { useRouter } from "next/navigation";
// Validation
import TeamFormSchema from "@/app/utils/schemas/TeamFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { TeamFormType } from "@/app/utils/types/TeamFormType";
// Utils
import { createClient } from "@/app/utils/supabase/client";
// Components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import Alert from "@mui/material/Alert";
// Icons
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from '@mui/icons-material/Info';
import ErrorIcon from '@mui/icons-material/Error';
import CheckIcon from '@mui/icons-material/Check';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

type NewTeamModalProps = {
  open: boolean;
  handleClose: () => void;
}

export default function NewTeamModal({ 
  open, handleClose 
}: NewTeamModalProps) {
  const methods = useForm<TeamFormType>({
    defaultValues: {
      id: 0,
      created_at: "",
      updated_at: "",
      name: "",
      plan: "",
      projects_limit: 0,
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

  const { user } = useUser();
  const { setSelectedTeam } = useTeam();
  const supabase = createClient();
  const router = useRouter();

  const [showAlertInfo, setShowAlertInfo] = useState<boolean>(false);
  const [alertInfo, setAlertInfo] = useState<{
    type: "success" | "error" | "info" | "warning";
    icon: React.ReactNode;
    message: string;
  } | null>(null);

  // Create a new team
  async function onSubmit(
    data: TeamFormType
  ) {
    setAlertInfo({
      type: "info",
      icon: <InfoIcon />,
      message: "Creating team..."
    });
    setShowAlertInfo(true);
    try {
      if (!user) {
        throw new Error("User not found");
      } else {
        // Create new team
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
          setAlertInfo({
            type: "error",
            icon: <ErrorIcon />,
            message: "Error creating team. Please try again."
          });
        } else if (newTeam) {
          const teamId = newTeam[0].id;

          // Add user to team_members
          const { 
            error: teamMemberError 
          } = await supabase
            .from("team_members")
            .insert([
              {
                team_id: teamId,
                user_id: user.id,
                role: "owner",
              }
            ]);
          
          if (teamMemberError) {
            console.error(
              "Error adding user to team_members: ", 
              teamMemberError
            );
            setAlertInfo({
              type: "error",
              icon: <ErrorIcon />,
              message: "Error creating team. Please try again."
            });
          } else {
            console.log(
              "Team created and user added successfully: ", 
              newTeam
            );
            setAlertInfo({
              type: "success",
              icon: <CheckIcon />,
              message: "Team created successfully! Redirecting..."
            });

            // Update selected team
            setSelectedTeam(newTeam[0]);

            // Redirect to new team
            setTimeout(() => {
              setShowAlertInfo(false);
              reset();
              console.log("Redirecting to team: ", teamId)
              router.push(`/team/${teamId}`);
              handleClose();
            }, 2000);
          };
        };
      };
    } catch (error) {
      console.error(
        "Error creating team: ", 
        error
      );
      setAlertInfo({
        type: "error",
        icon: <ErrorIcon />,
        message: "Error creating team. Please try again."
      });
    };
    setTimeout(() => {
      setShowAlertInfo(false);
    }, 3000);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      aria-labelledby="New team modal"
      aria-describedby="New team modal"
      slots={{ backdrop: Backdrop }}
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
                    New Team
                  </Typography>
                  <Typography
                    variant="body2"
                    className="
                      text-neutral-500
                    "
                  >
                    Name your team to get started.
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
                    {...register("name", { required: "Team name is required" })}
                    type="text"
                    label="Team Name"
                    variant="outlined"
                    color="primary"
                    fullWidth
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    inputProps={{ autoComplete: "off" }}
                  />
                  {/* Alert */}
                  {showAlertInfo && (
                    <Alert
                      severity={alertInfo?.type}
                      icon={
                        alertInfo ? 
                        alertInfo.icon : 
                        undefined
                      }
                      className="w-full"
                    >
                      {
                        alertInfo ? 
                        alertInfo.message : 
                        "Error"
                      }
                    </Alert>
                  )}
                  {/* Submit Button */}
                  {isDirty && (
                    <Button
                      type="submit"
                      disabled={!isValid || isSubmitting}
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
                      Create Team
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
"use client";

// Hooks
import React from "react";
import { useRouter } from 'next/navigation'
import { 
  useForm, 
  // SubmitHandler 
} from "react-hook-form";
// Validation
import ProjectFormSchema from "@/app/utils/schemas/ProjectFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProjectFormType } from "@/app/utils/types/ProjectFormType";
// Utils
import { createClient } from "@/app/utils/supabase/client";
// TODO: Import PostHog
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
// Icons
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

type NewProjectModalProps = {
  open: boolean;
  projects_limit: number;
  handleClose: () => void;
}

export default function NewProjectModal({ 
  open, 
  projects_limit,
  handleClose,
}: NewProjectModalProps) {
  const methods = useForm<ProjectFormType>({
    defaultValues: {
      id: 0,
      project_id: 0,
      team_id: 0,
      user_id: 0,
      created_at: "",
      updated_at: "",
      name: "",
      client: "",
      ideas_limit: 25,
    },
    resolver: zodResolver(ProjectFormSchema),
  });
  const { 
    register, 
    handleSubmit, 
    formState: { 
      errors,
      isValid,
      isSubmitting
    } 
  } = methods;

  const supabase = createClient();
  const router = useRouter();
  
  async function onSubmit(
    data: ProjectFormType
  ) {
    try {
      const { 
        data: { 
          user 
        } 
      } = await supabase
        .auth
        .getUser()

      if (!user) {
        throw new Error("User not found");
      } else if (user) {
        const { 
          data: project, 
          error 
        } = await supabase
          .from("projects")
          .insert([
            {
              name: data.name,
              client: data.client,
              user_id: user.id,
              team_id: data.team_id,
            },
          ])
          .select()

        if (error) {
          console.log(
            "Error creating project: ", 
            error
          );
        } else if (project) {
          console.log(
            "Project created successfully: ", 
            project
          );
          // TODO: PostHog tracking
          router.push(`/project/${project[0].id}`);
          handleClose();
        };
      };
    } catch (error) {
      console.log("Error creating project: ", error);
    };
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      aria-labelledby="New project modal"
      aria-describedby="New project modal"
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
                gap-8
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
                    placeholder=""
                    variant="outlined"
                    color="primary"
                    fullWidth
                    error={!!errors.client}
                    helperText={"(Client name is optional)"}
                    inputProps={{ autoComplete: "off" }}
                  />
                  <Button
                    type="submit"
                    disabled={
                      projects_limit === 0 || !isValid || isSubmitting
                    }
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
                </Box>
              </form>
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};
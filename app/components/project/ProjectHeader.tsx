"use client";

// Hooks
import React, { 
  useState, 
  useEffect,
  useRef, 
} from "react";
import { 
  useForm, 
  Controller 
} from "react-hook-form";
import { useProject } from "@/app/contexts/ProjectContext";
// Validation
import { zodResolver } from "@hookform/resolvers/zod";
import ProjectFormSchema from "@/app/utils/schemas/ProjectFormSchema";
// Types
import { ProjectFormType } from "@/app/utils/types/ProjectFormType";
import { ProjectType } from "@/app/utils/types/ProjectType";
// Utils
import { createClient } from "@/app/utils/supabase/client";
// CustomComponents
import ProjectDetails from "@/app/components/project/ProjectDetails";
import CreateProjectButton from "@/app/components/project/CreateProjectButton";
// Components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Skeleton from "@mui/material/Skeleton";
// Icons
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";

const defaultProjectName = "Project name";

type ProjectHeaderProps = {
  project_id: number;
};

export default function ProjectHeader({ 
  project_id,
}: ProjectHeaderProps) {
  const { projects } = useProject();
  const supabase = createClient();
  const textFieldRef = useRef<HTMLInputElement>(null);

  const methods = useForm<ProjectFormType>({
    defaultValues: {
      id: 0,
      team_id: 0,
      user_id: "",
      updated_at: "",
      name: defaultProjectName,
      client: "",
      details: "",
    },
    resolver: zodResolver(ProjectFormSchema),
    mode: "onChange",
  });

  const {
    watch,
    control,
    handleSubmit,
    setValue,
    formState: { 
      errors,
      isValid,
     },
  } = methods;

  const form = watch();

  const [projectData, setProjectData] = useState<ProjectType | null>(null);
  const [nameEditable, setNameEditable] = useState(false);
  
  // Update project name
  async function onSubmit(
    data: ProjectFormType
  ) {
    const { error } = await supabase
      .from('projects')
      .update({ 
        name: data.name, 
        updated_at: new Date().toISOString() 
      })
      .eq('id', data.id);

    if (error) {
      console.error(
        'Error updating project name:', 
        error
      );
    } else {
      setNameEditable(false);
    }
  };

  // Handle editable name
  function handleEditableName() {
    if (nameEditable) {
      handleSubmit(onSubmit)();
    } else {
      setNameEditable(true);
      if (form.name === defaultProjectName) {
        setValue("name", "");
      };
      setTimeout(() => textFieldRef.current?.focus(), 100);
    };
  };

  // Fetch project data
  useEffect(() => {
    if (!project_id) {
      console.log ("Project ID not found");
      return;

    } else {
      const projectData = projects
        .find(
          (project) => project.id === project_id
        );

      if (projectData) {
        setValue("id", projectData.id);
        setValue("team_id", projectData.team_id);
        setValue("user_id", projectData.user_id);
        setValue("updated_at", projectData.updated_at);
        setValue("name", projectData.name);
        setValue("client", projectData.client);
        setValue("details", projectData.details);

        setProjectData(projectData);
      };
    };
  }, [
    setValue,
    project_id
  ]);

  return (
    <Box
      id="project-header-container"
      className="
        flex
        flex-row
        justify-between
        items-center
        w-full
        min-h-20
        px-4
        pt-1
        pb-3
        bg-neutral-100
        border-b
        border-neutral-300
        z-10
        sticky
        top-0
      "
    >
      <Box
        id="project-header-content-container"
        className="
          flex
          flex-row
          justify-between
          items-stretch
          w-full
          h-full
          gap-6
        "
      >
        <Box
          id="project-header-info-container"
          className="
            flex
            flex-col
            justify-start
            items-start
            w-full
            gap-2
          "
        >
          <Box
            id="project-header-name-details-container"
            className="
              flex
              flex-col
              justify-start
              items-start
              w-full
            "
          >
            {form.name ? (
              <Box
                id="project-name"
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
                        id="project-name"
                        label="Project name"
                        placeholder="Project name"
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
                    {form.name}
                  </Typography>
                )}
                <IconButton
                  onClick={handleEditableName}
                  disabled={
                    form.name.length < 4 ||
                    !isValid
                  }
                  sx={{ 
                    width: "32px", 
                    height: "32px"
                  }}
                  className="
                    opacity-80 
                    hover:opacity-100 
                    transition-all
                  "
                >
                  {
                    nameEditable ? (
                      <CheckIcon 
                        sx={{ 
                          width: "24px", 
                          height: "24px"
                        }} 
                      />
                    ) : (
                      <EditIcon 
                        sx={{ 
                          width: "24px", 
                          height: "24px"
                        }} 
                      />
                    )
                  }
                </IconButton>
              </Box>
            ) : (
              <Skeleton
                variant="text"
                width="192px"
                height="30px"
                animation="wave"
                className="rounded-sm"
              />
            )}
            
            <Typography
              variant="body2"
              className="
                text-neutral-900
              "
            >
              {form.details ? (
                form.details
              ) : (
                <Skeleton
                  variant="text"
                  width="192px"
                  height="24px"
                  animation="wave"
                  className="rounded-sm"
                />
              )}
            </Typography>
          </Box>
          <Box
            id="project-header-dates-container"
            className="
              flex
              flex-col
              justify-start
              items-start
              w-full
            "
          >
            <ProjectDetails
              client={projectData?.client}
              user_id={projectData?.user_id}
              created_at={projectData?.created_at}
              updated_at={projectData?.updated_at}
            />
          </Box>
        </Box>
        <Box
          id="project-header-options-container"
          className="
            hidden
            sm:flex
            flex-col
            justify-between
            items-end
            min-w-32
            min-h-20
          "
        >
          <div></div>
          <CreateProjectButton />
          <div></div>
        </Box>
      </Box>
    </Box>
  )
}
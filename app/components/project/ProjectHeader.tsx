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
// Validation
import { zodResolver } from "@hookform/resolvers/zod";
import ProjectFormSchema from "@/app/utils/schemas/ProjectFormSchema";
import { ProjectFormType } from "@/app/utils/types/ProjectFormType";
// Utils
import { createClient } from "@/app/utils/supabase/client";
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
  loading: boolean;
};

export default function ProjectHeader({ 
  project_id,
  loading,
}: ProjectHeaderProps) {
  const methods = useForm<ProjectFormType>({
    defaultValues: {
      id: 0,
      team_id: 0,
      user_id: 0,
      updated_at: "",
      name: defaultProjectName,
      client: "",
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

  const supabase = createClient();
  const form = watch();
  const [nameEditable, setNameEditable] = useState(false);
  const textFieldRef = useRef<HTMLInputElement>(null);

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
    if (!project_id) return;
    async function fetchProjectData() {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', project_id)
        .single();

      if (error) {
        console.error('Error fetching project data:', error);
        return;
      };

      if (data) {
        setValue('id', data.id);
        setValue('team_id', data.team_id);
        setValue('user_id', data.user_id);
        setValue('updated_at', data.updated_at);
        setValue('name', data.name);
        setValue('client', data.client);
      }
    };
    fetchProjectData();
  }, [
    setValue, 
    supabase, 
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
        id="brief-id-header-info-container"
        className="
          flex
          flex-col
          justify-start
          items-start
        "
      >
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
            size="small"
            disabled={
              form.name.length < 4 ||
              !isValid
            }
          >
            {nameEditable ? <CheckIcon /> : <EditIcon />}
          </IconButton>
        </Box>
        
        {loading ? (
          <Skeleton
            variant="rectangular"
            width="100%"
            height={20}
            animation="wave"
          />
        ) : (
          <Typography
            variant="caption"
            className="
            text-neutral-700
            "
          >
            Created by {" "} Username
            {" "} <span className="text-neutral-500">•</span> {" "}
            Created 25/10/1988 {/* TODO: Make Dynamic */}
            {" "} <span className="text-neutral-500">•</span> {" "}
            Updated 25/10/1988 {/* TODO: Make Dynamic */}
          </Typography>
        )}
      </Box>
    </Box>
  )
}
// Hooks
import React from "react";
import { Controller, Control } from "react-hook-form";
// Validation
import { BriefFormType } from "@/app/utils/types/BriefFormType";
// Utils
import { useTheme } from "@mui/material/styles";
import { Theme } from "@mui/material/styles";
// Components
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import FormHelperText from '@mui/material/FormHelperText';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

type MultipleSelectChipProps = {
  name: keyof BriefFormType;
  label: string;
  options: string[];
  control: Control<BriefFormType>;
  helperText?: string;
}

function getStyles(
  name: string, 
  selectedValues: readonly string[], 
  theme: Theme
) {
  return {
    fontWeight:
      selectedValues.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelectChip({ 
  name, 
  label, 
  options, 
  control,
  helperText,
}: MultipleSelectChipProps) {
  const theme = useTheme();

  return (
    <FormControl fullWidth>
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        defaultValue={[]}
        render={({ field }) => (
          <Select
            labelId={`${name}-label`}
            id={name}
            multiple
            value={field.value}
            onChange={(event: SelectChangeEvent<typeof field.value>) => {
              const {
                target: { value },
              } = event;
              field.onChange(
                typeof value === "string" ? value.split(",") : value
              );
            }}
            input={
              <OutlinedInput
                id={`${name}-select-chip`} 
                label={label}
              />
            }
            renderValue={(selected) => (
              <Box
                className="
                  flex
                  flex-wrap
                  gap-1
                "
              >
                {(Array.isArray(selected) ? selected : []).map((value) => (
                  <Chip
                    key={value}
                    label={value}
                  />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {options.map((option) => (
              <MenuItem
                key={option}
                value={option}
                style={getStyles(
                    option, 
                    Array.isArray(field.value) ? field.value : [], theme
                )}
              >
                {option}
              </MenuItem>
            ))}
          </Select>
        )}
      />
      {helperText && (<FormHelperText>{helperText}</FormHelperText>)}
    </FormControl>
  );
};

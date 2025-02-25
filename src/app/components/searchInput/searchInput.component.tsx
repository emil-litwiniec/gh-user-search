import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDebounce } from "@/app/hooks";

type SearchFormProps = {
  onUpdate: (value: string) => void;
  label?: string;
  debounceDelay?: number;
  placeholder?: string;
  validationSchema?: yup.StringSchema;
};

const DEFAULT_DEBOUNCE_DELAY = 2000;

export const SearchInput = ({
  onUpdate: onQueryUpdate,
  label,
  debounceDelay = DEFAULT_DEBOUNCE_DELAY,
  placeholder,
  validationSchema,
}: SearchFormProps) => {
  const schema = yup.object().shape({
    searchQuery: validationSchema ?? yup.string(),
  });
  const {
    control,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { searchQuery: "" },
    mode: "onChange",
  });

  const searchValue = watch("searchQuery");

  const debouncedSearchValue = useDebounce(searchValue ?? "", debounceDelay);

  useEffect(() => {
    onQueryUpdate(debouncedSearchValue);
  }, [onQueryUpdate, debouncedSearchValue]);

  return (
    <Controller
      name="searchQuery"
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          label={label}
          placeholder={placeholder ?? "Search..."}
          variant="outlined"
          fullWidth
          margin="normal"
          error={!!errors.searchQuery}
          helperText={errors.searchQuery?.message}
        />
      )}
    />
  );
};

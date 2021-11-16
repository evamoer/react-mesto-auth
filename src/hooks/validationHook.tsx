import React, { useState, useCallback } from "react";

export default function useFormAndValidation() {
  const [values, setValues] = useState<{
    name?: string;
    value?: string;
    link?: string;
  }>({});
  const [errors, setErrors] = useState<{
    name?: string;
    value?: string;
    link?: string;
  }>({});
  const [isValid, setIsValid] = useState<boolean>(true);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = evt.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: evt.target.validationMessage });
    setIsValid(evt.target.closest("form")!.checkValidity());
  };

  const resetForm = useCallback(
    (
      newValues: {} = {},
      newErrors: {} = {},
      newIsValid: boolean = false
    ): void => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
    setValues,
    setIsValid,
  };
}

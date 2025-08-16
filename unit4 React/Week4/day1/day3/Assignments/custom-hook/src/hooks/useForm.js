import { useState } from "react";

function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);

  // Update field value dynamically
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  // Reset form values
  const resetForm = () => {
    setValues(initialValues);
  };

  return { values, handleChange, resetForm };
}

export default useForm;

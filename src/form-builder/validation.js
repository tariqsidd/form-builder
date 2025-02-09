export const validateForm = (schema, formData) => {
    const errors = {};

    schema.fields.forEach((field) => {
        const { name, validation } = field;
        const value = formData[name];

        if (validation) {
            if (validation.required && !value) {
                errors[name] = "This field is required";
            }
            if (validation.minLength && value?.length < validation.minLength) {
                errors[name] = `Minimum length is ${validation.minLength}`;
            }
            if (validation.maxLength && value?.length > validation.maxLength) {
                errors[name] = `Maximum length is ${validation.maxLength}`;
            }
            // Add more validation rules as needed
        }
    });

    return errors;
};

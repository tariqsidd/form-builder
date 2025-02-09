import React from "react";
import FormBuilder from "./components/FormBuilder";
import {validateForm} from "./validation";
import {Button} from "@mui/material";

const FormContainer = ({ schema, questioner }) => {
    const formDataRef = React.useRef({firstName: "Tariq Siddiqui"});
    const [errors, setErrors] = React.useState({});

    const handleFieldChange = (name, value) => {
        console.log('value', formDataRef)
        formDataRef.current[name] = value;
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        const validationErrors = validateForm(schema, formDataRef.current);
        if (Object.keys(validationErrors).length === 0) {
            console.log("Form submitted successfully:", formDataRef.current);
        } else {
            setErrors(validationErrors);
            console.log("Validation errors:", validationErrors);
        }
    };

    return (
        <div>
            <FormBuilder
                schema={schema}
                formData={formDataRef.current}
                questioner={questioner}
                onFieldChange={handleFieldChange}
            />
            <Button onClick={handleSubmit}>
                Submit
            </Button>
        </div>
    );
};

export default FormContainer;

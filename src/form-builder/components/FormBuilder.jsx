import React from "react";
import {Grid2 as Grid, Typography} from "@mui/material";
import {fieldRenderers} from "./FieldMapper";

const FormBuilder = ({schema, formData, questioner, onFieldChange}) => {
    const renderField = (field) => {
        console.log('field', field)
        const {type, name, label, placeholder, gridProps, question} = field;

        const renderer = fieldRenderers[type];
        if (!renderer) {
            console.warn(`No renderer found for field type: ${type}`);
            return null;
        }

        return (
            <Grid {...gridProps} key={name}>
                {questioner && <Typography variant="body1">{question}</Typography>}
                {React.createElement(renderer, {
                    name,
                    label,
                    placeholder,
                    value: formData[name],
                    onChange: onFieldChange,
                })}
            </Grid>
        );
    };

    return (
        <Grid container spacing={2}>
            {schema.fields.map((field) => renderField(field))}
        </Grid>
    );
};

export default FormBuilder;

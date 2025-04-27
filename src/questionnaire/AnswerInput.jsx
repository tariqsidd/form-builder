import React from "react";
import {TextComponent} from "./inputs/TextComponent";
import {Autocomplete, TextField, Typography, Box} from "@mui/material";

export const AnswerInput = React.memo(({question, value, onChange}) => {
    console.log('AnswerInput', question)
    switch (question.type.id) {
        case 'text':
            return (
                <TextComponent question={question} onChange={onChange}/>
            )
        case 'mcqs':
            return (
                <Box mb={2}>
                    <Typography variant="subtitle1">{question?.text}</Typography>
                <Autocomplete
                    options={question.options?.options??[]}
                    getOptionLabel={(option) => option.label || ''}
                    // onChange={(e, newValue) => {
                    // }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            fullWidth
                            variant="outlined"
                            label="Your answer"/>
                    )}
                />
                </Box>
            )
        default:
            return (
                <TextComponent question={question}  onChange={onChange}/>
            )
    }
});

import MCQS from "./inputs/MCQ(s)";
import React, {useState} from "react";
import {Autocomplete, Box, TextField} from "@mui/material";
const questionsTypes = [
    {id: 'text', label: 'Text'},
    {id: 'mcqs', label: 'MCQ(s)'},
]
export const FieldMapper =({onChange,data,onFieldChange, field}) => {
    const [questionType, setQuestionType] = useState(field);
    const renderField = ()=>{
        switch (questionType?.id) {
            case 'text':
                return null;
            case 'mcqs':
                return <MCQS data={data} onChange={onChange}/>
            default:
                return null
        }
    }


    return (
        <Box>
            <Autocomplete
                options={questionsTypes}
                getOptionLabel={(option) => option.label || ''}
                value={questionType}
                onChange={(e, newValue) => {
                    setQuestionType(newValue)
                    onFieldChange(newValue)
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        fullWidth
                        variant="outlined"
                        label="Question Type"/>
                )}
            />
            {renderField()}
        </Box>
    )

}

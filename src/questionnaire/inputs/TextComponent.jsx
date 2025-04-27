import React, {useRef} from "react";
import {Box, TextField, Typography} from "@mui/material";

export const TextComponent = ({onChange, question}) => {
    const inputRef = useRef(null);
    return (
        <Box mb={2}>
            <Typography variant="subtitle1">{question?.text}</Typography>
            <TextField
                fullWidth
                label="Your answer"
                value={inputRef.current || ''}
                onChange={(e) => {
                    inputRef.current = e.target.value;
                    onChange(question.id, e.target.value)
                }}
            />
        </Box>
    )
}

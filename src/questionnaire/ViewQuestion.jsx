import React from "react";
import {Box, Button, ListItemText} from "@mui/material";

export const ViewQuestion = React.memo(({question, startEditing, handleDeleteQuestion}) => {
    return (
        <Box sx={{display: 'flex', alignItems: 'center', width: '100%'}}>
            <ListItemText primary={question.text}/>
            <Button
                variant="outlined"
                size="small"
                onClick={() => startEditing(question)}
                sx={{mr: 1}}
            >
                Edit
            </Button>
            <Button
                variant="outlined"
                size="small"
                color="error"
                onClick={() => handleDeleteQuestion(question.id)}
            >
                Delete
            </Button>
        </Box>
    )
})

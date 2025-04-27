import React, {useCallback, useRef} from "react";
import {Button, Box, Typography} from "@mui/material";
import {AnswerInput} from "./AnswerInput";

export const QuestionList = ({questions = []}) => {
    const answers = useRef({});  // Changed to useRef

    const handleAnswerChange = useCallback((id, value) => {
        // Directly mutate the ref's current value
        answers.current = {
            ...answers.current,
            [id]: value
        };
    }, []);

    const handleSubmitAnswers = useCallback(() => {
        console.log('Submitted Answers:', answers.current);
    }, []);  // Empty deps since answers ref is mutable

    return (
        questions.length > 0 && (
            <Box sx={{p: 2, m:1}}>
                {questions.map((q) => (
                    <AnswerInput
                        key={q.id}
                        question={q}
                        onChange={handleAnswerChange}
                    />
                ))}
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleSubmitAnswers}
                >
                    Submit Answers
                </Button>
            </Box>
        )
    );
};

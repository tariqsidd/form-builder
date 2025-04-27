import {Box, Button, Grid2, List, ListItem, Paper, TextField, Typography} from "@mui/material";
import {ViewQuestion} from "./ViewQuestion";
import React, {useCallback, useState} from "react";
import {FieldMapper} from "./FieldMapper";
import {QuestionList} from "./QuestionList";
import {ModalRef} from "../Modal";

const PreviewQuestionnaire = ({questions}) => {
    return (
        <QuestionList questions={questions}/>
    )
}
export const Questionnaire = () => {
    const [questions, setQuestions] = useState([]);
    const [questionType, setQuestionType] = useState(null);
    const [newQuestion, setNewQuestion] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState('');
    const optionsRef = React.useRef([]);

    console.log('questions', questions)
    const handleDeleteQuestion = useCallback((id) => {
        setQuestions(prev => prev.filter(q => q.id !== id));
    }, []);

    const startEditing = useCallback((question) => {
        setEditingId(question.id);
        setEditText(question.text);
        // setEditType(question.type); // Initialize edit type
    }, []);

    const handleAddQuestion = useCallback(() => {
        if (newQuestion.trim()) {
            setQuestions(prev => [
                ...prev,
                {
                    id: Date.now(),
                    text: newQuestion.trim(),
                    type: questionType,
                    ...(
                        questionType.id === 'mcqs' && optionsRef.current.options?.length &&
                        {options: optionsRef.current}
                    )
                },
            ]);
            setNewQuestion('');
            optionsRef.current = []
        }
    }, [newQuestion, questionType]);

    const handleSaveEdit = useCallback(() => {
        console.log('optionsRef.current', optionsRef.current)
        if (editText.trim()) {
            setQuestions(prev => prev.map(q => {
                if (q.id !== editingId) return q;

                const updatedQuestion = {
                    ...q,
                    text: editText.trim(),
                    type: questionType
                };

                if (questionType?.id === 'mcqs' && optionsRef.current.options?.length) {
                    updatedQuestion.options = optionsRef.current;
                } else {
                    delete updatedQuestion.options;
                }

                return updatedQuestion;
            }))
            setEditingId(null);
            setEditText('');
            optionsRef.current = []
        }
    }, [editText, editingId, questionType]); // Include editType in dependencies

    const handleEditChange = useCallback((e) => setEditText(e.target.value), []);
    const handleCancelEdit = useCallback(() => {
        setEditingId(null);
        setEditText('');
    }, []);

    return (
        <Grid2 size={{xs: 12}}>
            <Paper sx={{p: 2, m: 1, mx:'100px', my:'50px'}}>
                <Box sx={{display:'flex', my:2,justifyContent:'space-between'}}>
                    <Typography variant="h6" gutterBottom>
                        Build Your Questionnaire
                    </Typography>
                    <Button
                        size="small"
                        variant="contained"
                        onClick={()=>{
                            ModalRef.handleClickOpen({
                                render: () => <PreviewQuestionnaire questions={questions}/>,
                                size: 'md',
                                modalTitle:'Questionnaire Preview'
                            })
                        }}
                    >
                        Preview Questionnaire
                    </Button>
                </Box>

                <FieldMapper
                    field={questionType}
                    onChange={(data)=>{
                        optionsRef.current = data
                    }}
                    onFieldChange={setQuestionType}
                />
                <TextField
                    fullWidth
                    label="Enter your question"
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    margin="normal"
                />
                <Button variant="contained" onClick={handleAddQuestion}>
                    Add Question
                </Button>

                {questions.length > 0 && (
                    <Box mt={2}>
                        <Typography variant="subtitle1">Questions List:</Typography>
                        <List>
                            {questions.map((q) => {
                                return(
                                    <ListItem key={q.id} divider>
                                        {editingId === q.id ? (
                                            <Box sx={{display: 'flex', gap: 1, width: '100%', flexDirection: 'column'}}>
                                                <FieldMapper
                                                    field={q?.type}
                                                    data={q?.options}
                                                    onFieldChange={setQuestionType}
                                                    onChange={(data)=>{
                                                        optionsRef.current = data
                                                    }}
                                                />
                                                <TextField
                                                    value={editText}
                                                    onChange={handleEditChange}
                                                    fullWidth
                                                    autoFocus
                                                />
                                                <Box sx={{display: 'flex', gap: 1}}>
                                                    <Button
                                                        variant="contained"
                                                        size="small"
                                                        onClick={handleSaveEdit}
                                                    >
                                                        Save
                                                    </Button>
                                                    <Button
                                                        variant="outlined"
                                                        size="small"
                                                        onClick={handleCancelEdit}
                                                    >
                                                        Cancel
                                                    </Button>
                                                </Box>
                                            </Box>
                                        ) : (
                                            <ViewQuestion
                                                question={q}
                                                startEditing={startEditing}
                                                handleDeleteQuestion={handleDeleteQuestion}/>
                                        )}
                                    </ListItem>
                                )
                            })}
                        </List>
                    </Box>
                )}
            </Paper>
        </Grid2>
    )
}

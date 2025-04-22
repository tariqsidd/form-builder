import React, {useCallback, useState, useRef} from 'react';
import {
    Container,
    TextField,
    Button,
    Typography,
    List,
    ListItem,
    ListItemText,
    Paper,
    Box, Autocomplete, Grid2,
} from '@mui/material';

const questionsTypes = [
    {id: 'text', label: 'Text'},
    {id: 'mcqs', label: 'MCQ(s)'},
]

function App() {
    const [questions, setQuestions] = useState([]);
    const [questionType, setQuestionType] = useState({id: 'text', label: 'Text'});
    const [newQuestion, setNewQuestion] = useState('');
    const [answers, setAnswers] = useState({});
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState('');
    const [editType, setEditType] = useState(questionType); // New state for edit type

    const handleDeleteQuestion = useCallback((id) => {
        setQuestions(prev => prev.filter(q => q.id !== id));
        setAnswers(prev => {
            const newAnswers = {...prev};
            delete newAnswers[id];
            return newAnswers;
        });
    }, []);

    const startEditing = useCallback((question) => {
        setEditingId(question.id);
        setEditText(question.text);
        setEditType(question.type); // Initialize edit type
    }, []);

    const handleAddQuestion = useCallback(() => {
        if (newQuestion.trim()) {
            setQuestions(prev => [
                ...prev,
                {id: Date.now(), text: newQuestion.trim(), type: questionType},
            ]);
            setNewQuestion('');
        }
    }, [newQuestion, questionType]);

    const handleSaveEdit = useCallback(() => {
        if (editText.trim()) {
            setQuestions(prev => prev.map(q =>
                q.id === editingId ? {...q, text: editText.trim(), type: editType} : q
            ));
            setEditingId(null);
            setEditText('');
        }
    }, [editText, editingId, editType]); // Include editType in dependencies

    const handleAnswerChange = useCallback((id, value) => {
        setAnswers(prev => ({...prev, [id]: value}));
    }, []);

    const handleSubmitAnswers = useCallback(() => {
        console.log('Submitted Answers:', answers);
    }, [answers]);

    const handleEditChange = useCallback((e) => setEditText(e.target.value), []);
    const handleCancelEdit = useCallback(() => {
        setEditingId(null);
        setEditText('');
    }, []);

    return (
        <Grid2 container spacing={2}>
            <Grid2 size={{xs: 12}}>
                <Typography variant="h4" align="center" gutterBottom>
                    Questionnaire Builder
                </Typography>
            </Grid2>
            <Grid2 size={{xs: 6}}>
                <Paper sx={{p: 2, m: 1}}>
                    <Typography variant="h6" gutterBottom>
                        Build Your Questionnaire
                    </Typography>
                    <Autocomplete
                        options={questionsTypes}
                        getOptionLabel={(option) => option.label || ''}
                        value={questionType}
                        onChange={(e, newValue) => setQuestionType(newValue)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                fullWidth
                                variant="outlined"
                                label="Question Type"/>
                        )}
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
                                {questions.map((q) => (
                                    <ListItem key={q.id} divider>
                                        {editingId === q.id ? (
                                            <Box sx={{display: 'flex', gap: 1, width: '100%', flexDirection: 'column'}}>
                                                <TextField
                                                    value={editText}
                                                    onChange={handleEditChange}
                                                    fullWidth
                                                    autoFocus
                                                />
                                                <Autocomplete
                                                    options={questionsTypes}
                                                    getOptionLabel={(option) => option.label || ''}
                                                    value={editType}
                                                    onChange={(e, newValue) => setEditType(newValue)}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            fullWidth
                                                            variant="outlined"
                                                            label="Question Type"/>
                                                    )}
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
                                ))}
                            </List>
                        </Box>
                    )}
                </Paper>
            </Grid2>
            <Grid2 size={{xs: 6}}>
                <QuestionList questions={questions} questionType={questionType.id}/>
            </Grid2>
        </Grid2>
    );
}

export default App;

const QuestionList = ({questions = [], questionType}) => {
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
            <Paper sx={{p: 2, m:1}}>
                <Typography variant="h6" gutterBottom>
                    Answer the Questionnaire
                </Typography>
                {questions.map((q) => (
                    <AnswerInput
                        key={q.id}
                        question={q}
                        questionType={questionType}
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
            </Paper>
        )
    );
};

const ViewQuestion = React.memo(({question, startEditing, handleDeleteQuestion}) => {
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

const AnswerInput = React.memo(({question, questionType, value, onChange}) => {
    console.log('question', question)
    switch (questionType) {
        case 'text':
            return (
                <TextComponent question={question} onChange={onChange}/>
            )
        case 'mcqs':
            return (
                <Box>MCQ(s)</Box>
            )
        default:
            return (
                <TextComponent question={question}  onChange={onChange}/>
            )
    }
});

const TextComponent = ({onChange, question}) => {
    const [value, setValue] = useState('');
    return (
        <Box mb={2}>
            <Typography variant="subtitle1">{question?.text}</Typography>
            <TextField
                fullWidth
                label="Your answer"
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                    onChange(question.id, e.target.value)
                }}
            />
        </Box>
    )
}

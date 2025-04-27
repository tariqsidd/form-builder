import React from 'react';
import {
    Typography,
    Grid2, Box,
} from '@mui/material';
import {Questionnaire} from "./questionnaire";
import Modal from "./Modal";

function App() {
    return (
        <Box>
            <Grid2 container spacing={2}>
                <Questionnaire/>
                <Modal/>
            </Grid2>
        </Box>
    );
}

export default App;








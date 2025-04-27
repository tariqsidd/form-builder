import React, {useEffect, useRef, useState} from 'react';
import {Box, Autocomplete, TextField, Chip, ListItem, FormControlLabel, Switch, IconButton} from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CloseIcon from '@mui/icons-material/Close';

const builtInOptions = [
    {
        id: 'builtInOptions_1',
        title: 'Built-in Options 1',
        options: [
            {id: 1, label: 'Option 1'},
            {id: 2, label: 'Option 2'},
            {id: 3, label: 'Option 3'},
        ]
    },
    {
        id: 'builtInOptions_2',
        title: 'Built-in Options 2',
        options: [
            {id: 4, label: 'Option 4'},
            {id: 5, label: 'Option 5'},
            {id: 6, label: 'Option 6'},
        ]
    },
]
export const MCQS = ({onChange = (data) => {}, data}) => {
    const [customised, setCustomised] = useState(false)
    const [options, setOptions] = useState([])
    const [inputValue, setInputValue] = useState('');
    const builtInOptionIdRef = useRef(null)

    useEffect(() => {
        data?.customised && setCustomised(data.customised);
        data?.options && setOptions(data.options);
        if(data?.id){
            let _data = builtInOptions.find(item => item.id === data?.id)
            builtInOptionIdRef.current = _data
        }
    }, [data]);

    const handleAddOption = () => {
        if (inputValue.trim()) {
            const newOption = {
                id: Date.now(), // Using timestamp as unique ID
                label: inputValue.trim()
            };
            setOptions([...options, newOption]);
            setInputValue('');
            onChange(
                {
                    customised,
                    options: [...options, newOption]
                }
            )
        }
    };

    const handleDeleteOption = (id) => {
        let newData= options.filter(option => option.id !== id)
        setOptions(newData);
        onChange(
            {
                customised,
                options: newData
            }
        )
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleAddOption();
        }
    };

    return (
        <Box margin="normal">
            <FormControlLabel
                sx={{float: 'right'}}
                control={
                    <Switch
                        label="Customised"
                        checked={customised}
                        onChange={(e) => {
                            setOptions([])
                            setCustomised(e.target.checked)
                        }}/>}
            />
            {customised ?
                <>
                    <Autocomplete
                        readOnly
                        multiple
                        disableClearable
                        popupIcon={
                            options.length ?
                                <CloseIcon onClick={() => {
                                    setOptions([])
                                    onChange({
                                        customised,
                                        options: []
                                    })
                                }}/> :
                                null
                        }
                        options={[]}
                        value={options}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Options"
                                variant="outlined"
                            />
                        )}
                        renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                                <Chip
                                    {...getTagProps({index})}
                                    key={option.id}
                                    label={option.label}
                                    sx={{m: 0.5}}
                                    onDelete={() => handleDeleteOption(option.id)}
                                />
                            ))
                        }
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        sx={{mb: 2}}
                    />

                    <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                        <TextField
                            fullWidth
                            label="Add New Option"
                            variant="outlined"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Enter option and press Add"
                            InputProps={{
                                endAdornment: (
                                    <IconButton
                                        color="primary"
                                        onClick={handleAddOption}
                                        disabled={!inputValue?.trim()}
                                    >
                                        <AddCircleIcon fontSize="large"/>
                                    </IconButton>
                                )
                            }}
                        />

                    </Box>
                </>

                :
                <Autocomplete
                    options={builtInOptions}
                    getOptionLabel={(option) => option.title}
                    value={builtInOptionIdRef.current}
                    onChange={(event, newValue) => {
                        onChange({
                            id: newValue.id,
                            customised,
                            options: newValue.options
                        })
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            fullWidth
                            variant="outlined"
                            label="Selete Options"/>
                    )}
                    renderOption={(props, item) => {
                        const {key, ...otherProps} = props;
                        return (
                            <Box
                                key={key}
                                component={ListItem}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    flex: 1,
                                    padding: 1,
                                    borderBottom: '1px solid',
                                    marginBottom: 2
                                }}
                                {...otherProps}
                            >
                                {item.options.map((i) => (
                                    <Chip
                                        key={i.id}
                                        label={i.label}
                                        sx={{m: 0.5}}
                                    />
                                ))}
                            </Box>
                        );
                    }}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                />}
        </Box>
    );
};

export default MCQS;

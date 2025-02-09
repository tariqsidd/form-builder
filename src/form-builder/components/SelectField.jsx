// SelectField.jsx - New component
import { MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useEffect, useState } from 'react';

const SelectField = ({ _value, _onChange, label, options, ...props }) => {
    const [value, setValue] = useState('');

    useEffect(() => {
        setValue(_value);
    }, [_value]);

    return (
        <FormControl fullWidth margin="normal">
            <InputLabel>{label}</InputLabel>
            <Select
                {...props}
                value={value}
                label={label}
                onChange={(e) => {
                    setValue(e.target.value);
                    _onChange(e.target.value);
                }}
            >
                {options?.map((option) => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default SelectField;

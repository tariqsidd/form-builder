// CheckboxField.jsx - New component
import { FormControlLabel, Checkbox as MuiCheckbox } from '@mui/material';
import { useEffect, useState } from 'react';

const CheckboxField = ({ _checked, _onChange, label, ...props }) => {
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        setChecked(_checked);
    }, [_checked]);

    return (
        <FormControlLabel
            control={
                <MuiCheckbox
                    {...props}
                    checked={checked}
                    onChange={(e) => {
                        setChecked(e.target.checked);
                        _onChange(e.target.checked);
                    }}
                />
            }
            label={label}
        />
    );
};

export default CheckboxField;

import TextField from "./TextField";
import SelectField from "./SelectField";
import CheckboxField from "./CheckboxField";

export const fieldRenderers = {
    text: ({ name, label, placeholder, value, onChange }) => (
        <TextField
            label={label}
            placeholder={placeholder}
            _value={value || ""}
            _onChange={(value) => onChange(name, value)}
            fullWidth
            margin="normal"
        />
    ),
    select: ({ name, label, options, value, onChange }) => (
        <SelectField
            label={label}
            options={options}
            _value={value || ""}
            _onChange={(value) => onChange(name, value)}
            fullWidth
            margin="normal"
        />
    ),
    checkbox: ({ name, label, checked, onChange }) => (
        <CheckboxField
            label={label}
            _checked={!!checked}
            _onChange={(checked) => onChange(name, checked)}
        />
    ),
    // Add more field types here
};

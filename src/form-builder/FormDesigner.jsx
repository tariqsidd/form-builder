// FormDesigner.jsx - New component for visual form building
import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, TextField as MuiTextField, MenuItem, Grid, IconButton, Paper, Typography } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import FormBuilder from "./";

const initialField = {
    type: 'text',
    name: '',
    label: '',
    placeholder: '',
    options: [],
    gridProps: { xs: 12 },
    question: '',
};

const fieldTypes = [
    { value: 'text', label: 'Text Input' },
    { value: 'select', label: 'Dropdown' },
    { value: 'checkbox', label: 'Checkbox' },
];

const FormDesigner = ({ onSave }) => {
    const [schema, setSchema] = useState({ fields: [] });
    const [editingField, setEditingField] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const validateField = (field) => {
        if (!field.name) return 'Name is required';
        if (!field.type) return 'Type is required';
        if (schema.fields.some(f => f.name === field.name && f !== editingField))
            return 'Field name must be unique';
        return null;
    };

    const handleSaveField = () => {
        const error = validateField(editingField);
        if (error) return alert(error);

        setSchema(prev => ({
            ...prev,
            fields: editingField.index !== undefined ?
                prev.fields.map((f, i) => i === editingField.index ? editingField : f) :
                [...prev.fields, editingField]
        }));
        setIsDialogOpen(false);
    };

    return (
        <Grid container spacing={3} sx={{ p: 3 }}>
            <Grid item xs={4}>
                <Paper sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        Form Builder
                    </Typography>
                    <Button
                        variant="contained"
                        fullWidth
                        onClick={() => {
                            setEditingField({ ...initialField });
                            setIsDialogOpen(true);
                        }}
                    >
                        Add Field
                    </Button>

                    {schema.fields.map((field, index) => (
                        <Paper key={index} sx={{ p: 2, mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                            <div>
                                <Typography>{field.label || field.name}</Typography>
                                <Typography variant="caption">{field.type}</Typography>
                            </div>
                            <div>
                                <IconButton onClick={() => {
                                    setEditingField({ ...field, index });
                                    setIsDialogOpen(true);
                                }}>
                                    <Edit fontSize="small" />
                                </IconButton>
                                <IconButton onClick={() => setSchema(prev => ({
                                    ...prev,
                                    fields: prev.fields.filter((_, i) => i !== index)
                                }))}>
                                    <Delete fontSize="small" />
                                </IconButton>
                            </div>
                        </Paper>
                    ))}
                </Paper>
            </Grid>

            <Grid item xs={8}>
                <Paper sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        Form Preview
                    </Typography>
                    <FormBuilder
                        schema={schema}
                        formData={{}}
                        onFieldChange={() => {}}
                    />
                </Paper>
            </Grid>

            <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} fullWidth>
                <DialogTitle>{editingField?.index !== undefined ? 'Edit Field' : 'Add Field'}</DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
                    <MuiTextField
                        select
                        label="Field Type"
                        value={editingField?.type || 'text'}
                        onChange={(e) => setEditingField(prev => ({ ...prev, type: e.target.value }))}
                    >
                        {fieldTypes.map((type) => (
                            <MenuItem key={type.value} value={type.value}>
                                {type.label}
                            </MenuItem>
                        ))}
                    </MuiTextField>

                    <MuiTextField
                        label="Technical Name"
                        value={editingField?.name || ''}
                        onChange={(e) => setEditingField(prev => ({ ...prev, name: e.target.value }))}
                        helperText="Must be unique"
                    />

                    <MuiTextField
                        label="Display Label"
                        value={editingField?.label || ''}
                        onChange={(e) => setEditingField(prev => ({ ...prev, label: e.target.value }))}
                    />

                    {editingField?.type === 'text' && (
                        <MuiTextField
                            label="Placeholder"
                            value={editingField?.placeholder || ''}
                            onChange={(e) => setEditingField(prev => ({ ...prev, placeholder: e.target.value }))}
                        />
                    )}

                    {editingField?.type === 'select' && (
                        <MuiTextField
                            label="Options (comma-separated)"
                            value={editingField?.options?.join(', ') || ''}
                            onChange={(e) => setEditingField(prev => ({
                                ...prev,
                                options: e.target.value.split(',').map(o => o.trim())
                            }))}
                        />
                    )}

                    <Button
                        variant="contained"
                        onClick={handleSaveField}
                        sx={{ mt: 2 }}
                    >
                        Save Field
                    </Button>
                </DialogContent>
            </Dialog>
        </Grid>
    );
};

export default FormDesigner;

import React from 'react';
import {IconButton, DialogTitle} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {ModalRef} from "./index";

const  BaseTemplate = ({title='', children, actions})=> {
    return (
        <>
            <DialogTitle color="primary" sx={{fontSize: '24px', fontWeight: '700'}} id="customized-dialog-title">
                {title}
                <IconButton
                    aria-label="close"
                    onClick={ModalRef.handleClose}
                    sx={(theme) => ({
                        position: 'absolute',
                        right: 8,
                        color: theme.palette.grey[500],
                    })}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
                {children}
        </>
    );
}

export default BaseTemplate;

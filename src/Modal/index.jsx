import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import {useEffect, useState} from "react";
import BaseTemplate from "./BaseTemplate";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export let ModalRef = {};

const Modal = () => {
    const [open, setOpen] = React.useState(false);
    const [content, setContent] = useState(null);
    const [template, setTemplate] = useState('base');
    const [title, setTitle] = useState('');
    const [size, setSize] = useState('xs');
    const [props, setProps] = useState({});

    const handleClickOpen = (options) => {
        setContent(options.render());
        options?.template && setTemplate(options.template)
        options?.modalTitle && setTitle(options.modalTitle)
        options?.size && setSize(options.size)
        options?.props && setProps(options.props)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        template !== 'base' && setTemplate('base')
        setContent(null)
    };

    useEffect(() => {
        ModalRef = {handleClickOpen, handleClose};
        return () => {
            ModalRef = {};
        };
    }, []);

    const renderContent = (temp) => {
        switch (temp) {
            case 'base':
                return(
                    <BaseTemplate title={title} style={{ overflow: 'hidden' }}>
                        {content}
                    </BaseTemplate>
                )
            default:
                return(
                    <BaseTemplate title={title} style={{ overflow: 'hidden' }}>
                        {content}
                    </BaseTemplate>
                )
        }
    }


    return (
        <Dialog
            {...props}
            fullWidth={true}
            maxWidth={size}
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description">
            {renderContent(template)}
        </Dialog>
    );
}

export default Modal;

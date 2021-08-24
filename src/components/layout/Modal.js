import React from 'react';
import { Dialog, Typography, DialogTitle, DialogContent, DialogActions, Button} from '@material-ui/core';
import PropTypes from 'prop-types';

const Modal = ({displayModal, toggleModalDisplay}) => {
    return (
        <Dialog onClose={toggleModalDisplay} aria-labelledby="customized-dialog-title" open={displayModal}>
            <DialogTitle onClose={toggleModalDisplay}>
                About COVID-19 Tracker App
            </DialogTitle>
            <DialogContent dividers>
                <Typography variant="body2" color="secondary"><strong>Developed by Ahmed Faraz</strong></Typography>
                <Typography variant="body1">Track COVID-19 situation globally or country wise</Typography>
                <Typography variant="h4" color="primary">TECH USED</Typography>
                <ul style={{padding: '0 10px'}}>
                    <li><small>Custom CSS Modules</small></li>
                    <li><small>Material UI</small></li>
                    <li><small>REST APIs (Covid APIs global based + individual country based)</small></li>
                    <li><small>NPM Packages: axios | material-ui | chart.js | react-chartjs-2 | react-countup | classnames</small></li>
                    <li><small>Context APIs</small></li>
                    <li><small>GitHub</small></li>
                    <li><small>GitHub Actions</small></li>
                    <li><small>Surge</small></li>
                </ul>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={toggleModalDisplay} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}

Modal.propTypes = {
    displayModal: PropTypes.bool.isRequired,
    toggleModalDisplay: PropTypes.func.isRequired,
}

export default Modal;
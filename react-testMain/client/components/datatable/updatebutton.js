import React, { Component } from 'react';
import PropTypes, { any } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import {Button, Glyphicon}  from 'react-bootstrap';
import SaveIcon from '@material-ui/icons/Save';

const styles = theme => ({
    UpdateButton: {
    },
    button: {
        margin: theme.spacing.unit,
        fontSize: 12
    },
});


class UpdateButton extends React.Component {

    constructor() {
        super();

        this.updateData = this.updateData.bind(this);
    }

    /**
     * Update user
     */
    updateData() {
        axios.post(
            '/api/updateKData',
            JSON.stringify(this.props.row),
            {headers: { 'Content-Type': 'application/json' }}
        )
        .then( res => {
            this.props.reloadData();
        })
        .catch( err => {
            console.log(err)
        });
    }

    render(){
        const { classes } = this.props;

        return(
            <div className="UpdateButton">
                 <Button
                    size="medium"
                    className={classes.button}
                    variant="contained"
                    onClick={(event) => this.updateData()}>
                    <Glyphicon glyph="glyphicon glyphicon-save" />
                    Save
                </Button>
            </div>
        );
    }
}

UpdateButton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UpdateButton);

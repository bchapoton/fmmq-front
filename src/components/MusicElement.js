import React from 'react';
import {makeStyles} from "@material-ui/styles";
import {Paper} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import clsx from 'clsx'
import PropTypes from "prop-types";
import {blueGrey} from "@material-ui/core/colors";

function MusicElement(props) {
    const {value, label, icon, color} = props;
    const useStyles = makeStyles({
        root: {
            display: 'flex',
            alignItems: 'center',
            padding: '5px',
            maxWidth: '300px',
            backgroundColor: blueGrey[800],
            color: blueGrey[400]
        },
        iconContainer: {
            margin: '5px'
        },
        found: {
            backgroundColor: color[700],
            color: color[100],
        }
    });

    const classes = useStyles();

    return (
        <Paper className={clsx(classes.root, value ? classes.found : '')}>
            {icon}
            <Typography>{value ? value : `${label} ?`}</Typography>
        </Paper>
    );
}

MusicElement.propTypes = {
    value: PropTypes.string,
    label: PropTypes.string.isRequired,
    icon: PropTypes.any.isRequired,
    color: PropTypes.any.isRequired
};

MusicElement.defaultProps = {};

export default MusicElement;

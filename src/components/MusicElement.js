import React from 'react';
import {makeStyles} from "@mui/styles";
import {Paper} from "@mui/material";
import Typography from "@mui/material/Typography";
import clsx from 'clsx'
import PropTypes from "prop-types";
import {blueGrey} from "@mui/material/colors";

function MusicElement(props) {
    const {value, label, icon, color} = props;
    const useStyles = makeStyles({
        root: {
            display: 'flex',
            alignItems: 'center',
            padding: '5px',
            minWidth: '300px',
            backgroundColor: blueGrey[800],
            color: blueGrey[400],
            borderWidth: '1px',
            borderColor: blueGrey[800],
            borderStyle: 'solid'
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

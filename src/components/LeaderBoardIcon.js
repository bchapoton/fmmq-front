import React from 'react';
import { makeStyles } from '@mui/styles';
import { Paper, Tooltip } from '@mui/material';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

function LeaderBoardIcon(props) {
    const { value, icon, color, helperText } = props;
    const useStyles = makeStyles({
        root: {
            display: 'flex',
            alignItems: 'center',
            padding: '3px',
            maxWidth: '60px',
        },
        iconContainer: {
            display: 'flex',
            alignItems: 'center',
            color: 'white',
            backgroundColor: color,
        },
        scoreContainer: {
            width: '40px',
            textAlign: 'center',
        },
    });

    const classes = useStyles();

    return (
        <Tooltip title={`${value} ${helperText}`}>
            <Paper className={classes.root}>
                <Paper className={classes.iconContainer}>{icon}</Paper>
                <Typography className={classes.scoreContainer}>{value}</Typography>
            </Paper>
        </Tooltip>
    );
}

LeaderBoardIcon.propTypes = {
    value: PropTypes.number,
    icon: PropTypes.any.isRequired,
    color: PropTypes.any.isRequired,
    helperText: PropTypes.any.isRequired,
};

LeaderBoardIcon.defaultProps = {
    value: 0,
};

export default LeaderBoardIcon;

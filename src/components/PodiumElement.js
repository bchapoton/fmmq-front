import React from 'react';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { red, yellow } from '@mui/material/colors';

const useStyles = makeStyles({
    root: {
        padding: '1rem',
        margin: '1rem 0',
        width: '100%',
    },
    subContainer: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    first: {
        width: '90%',
        fontSize: '30px',
        backgroundColor: yellow[800],
        color: red[900],
    },
    second: {
        width: '70%',
        fontSize: '25px',
        backgroundColor: yellow[600],
        color: red[700],
    },
    third: {
        width: '50%',
        fontSize: '20px',
        backgroundColor: yellow[400],
        color: red[500],
    },
});

function PodiumElement(props) {
    const classes = useStyles();
    const { score, nickname, position } = props;

    let elementClass;
    if (position === 1) {
        elementClass = classes.first;
    } else if (position === 2) {
        elementClass = classes.second;
    } else if (position === 3) {
        elementClass = classes.third;
    }

    if (!elementClass) {
        return null;
    }

    return (
        <div className={clsx(classes.root, elementClass)}>
            <div className={classes.subContainer}>
                <span>{position}.</span>
                <span>{nickname}</span>
                <span>{score}pts</span>
            </div>
        </div>
    );
}

PodiumElement.propTypes = {
    score: PropTypes.number.isRequired,
    nickname: PropTypes.string.isRequired,
    position: PropTypes.number.isRequired,
};

export default PodiumElement;

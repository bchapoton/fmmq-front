import React from 'react';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';

export default function ButtonContainer(props) {
    const { children, hidden, justifyContent } = props;

    const useStyles = makeStyles({
        buttonContainer: {
            display: 'flex',
            justifyContent: justifyContent,
            margin: '10px 5px',
        },
    });

    const classes = useStyles();
    return (
        <div className={classes.buttonContainer} hidden={hidden}>
            {children}
        </div>
    );
}

ButtonContainer.propTypes = {
    hidden: PropTypes.bool,
    justifyContent: PropTypes.oneOf(['flex-end', 'flex-start', 'space-around', 'space-between']),
};

ButtonContainer.defaultProps = {
    hidden: false,
    justifyContent: 'flex-end',
};

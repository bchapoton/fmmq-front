import React, {useEffect, useState} from 'react'
import PropTypes from "prop-types";
import LeaderBoardIcon from "./LeaderBoardIcon";
import Paper from "@mui/material/Paper";
import {makeStyles} from "@mui/material/styles";
import {deepOrange, lightGreen, red} from "@mui/material/colors";
import clsx from "clsx";

const useStyle = makeStyles({
    root: {
        padding: '5px',
        borderWidth: '1px'
    },
    nice: {
        borderColor: lightGreen[900],
        color: lightGreen[900],
        backgroundColor: lightGreen[200]
    },
    notBad: {
        borderColor: deepOrange[900],
        color: deepOrange[900],
        backgroundColor: deepOrange[100]
    },
    bad: {
        borderColor: red[900],
        color: red[900],
        backgroundColor: red[200]
    }
});

function EventMessageFeedback(props) {
    const {payload} = props;
    const classes = useStyle();
    const [values, setValues] = useState();

    useEffect(() => {
        setValues(payload);
    }, [payload]);

    useEffect(() => {
        let timeoutRef;
        if (values && values.message && values.level) {
            timeoutRef = setTimeout(() => {
                setValues(null);
            }, 3000);
        }

        return () => {
            if (timeoutRef) {
                clearTimeout(timeoutRef);
            }
        }
    }, [values]);

    if (values && values.message && values.level) {
        let className = null;
        if (values.level === 'nice') {
            className = classes.nice;
        } else if (values.level === 'not-bad') {
            className = classes.notBad;
        } else if (values.level === 'bad') {
            className = classes.bad;
        }
        return (<Paper className={clsx(classes.root, className)} elevation={2}>{values.message}</Paper>);
    }

    return null;
}

EventMessageFeedback.propTypes = {
    payload: PropTypes.object
};

LeaderBoardIcon.defaultProps = {
    payload: null
};

export default EventMessageFeedback;
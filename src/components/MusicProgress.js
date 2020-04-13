import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/styles";
import {blueGrey} from "@material-ui/core/colors";
import {LinearProgress} from "@material-ui/core";
import PropTypes from "prop-types";

const useStyles = makeStyles({
    root: {},
    container: {},
    gameContainer: {
        backgroundColor: blueGrey[500],
        padding: '10px'
    }
});

const animationStepDuration = 250; // each step take 250ms for fluid animation

/**
 *
 * @param props duration in milliseconds
 * @return {*}
 * @constructor
 */
function MusicProgress(props) {
    const {duration, started, animationEnded} = props;
    const classes = useStyles();
    const [startedInternal, setStartedInternal] = useState(started);
    const [completed, setCompleted] = useState(0);
    const maxCompleted = Math.round(duration / animationStepDuration);
    console.log("rerender " + started);
    console.log("rerender " + startedInternal);

    useEffect(() => {
        setStartedInternal(started);
        setCompleted(0);
    }, [started]);

    useEffect(() => {
        let timer;

        function progress() {
            console.log('onprogress');
            setCompleted(oldCompleted => {
                console.log(oldCompleted);
                console.log(maxCompleted);
                if (oldCompleted < maxCompleted) {
                    return oldCompleted + 1;
                } else {
                    if (timer) {
                        clearInterval(timer);
                        setCompleted(0);
                        setStartedInternal(false);
                        if(animationEnded) {
                            animationEnded();
                        }
                    }
                }
            });
        }

        if(startedInternal)
            timer = setInterval(progress, animationStepDuration);

        return () => {
            if (timer)
                clearInterval(timer);
        };
    }, [startedInternal, setStartedInternal, animationStepDuration, setCompleted]);

    const normalise = value => (value) * 100 / maxCompleted; // scale the completed value on range 0-100, 100 is the completion status

    if(!startedInternal) {
        return null;
    }

    return (
        <LinearProgress variant="determinate" value={normalise(completed)}/>
    );
}


MusicProgress.propTypes = {
    started: PropTypes.bool.isRequired,
    duration: PropTypes.number,
    animationEnded: PropTypes.func
};

MusicProgress.defaultProps = {
    duration: 30000
};

export default MusicProgress;

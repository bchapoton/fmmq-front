import React, {useEffect, useState} from 'react';
import {LinearProgress} from "@material-ui/core";
import PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core/styles";
import {indigo} from "@material-ui/core/colors";
import config from "../config/NetworkConfig";

const animationStepDuration = 250; // each step take 250ms for fluid animation

const useStyle = makeStyles({
    container: {
        height: '55px'
    },
    text: {
        color: indigo[500],
        fontWeight: 'bold',
        margin: '5px 0',
    },
});

/**
 *
 * @param props duration in milliseconds
 * @return {*}
 * @constructor
 */
function MusicProgress(props) {
    const {duration, started, animationEnded, text, musicUrl} = props;
    const [startedInternal, setStartedInternal] = useState(started);
    const [completed, setCompleted] = useState(0);
    const [audioObject, setAudioObject] = useState(new Audio());
    const maxCompleted = Math.round(duration / animationStepDuration);
    const classes = useStyle();

    HTMLAudioElement.prototype.stop = function () {
        this.pause();
        this.currentTime = 0.0;
    };

    useEffect(() => {
        if (audioObject) {
            audioObject.preload = 'auto';
        }

        return () => {
            if(audioObject) {
                audioObject.stop();
            }
        }
    }, [audioObject]);

    useEffect(() => {
        if (audioObject) {
            audioObject.stop();
            if (musicUrl) {
                audioObject.src = config.MusicServerBaseUrl + musicUrl;
            }
        }
    }, [musicUrl, audioObject]);

    useEffect(() => {
        if (audioObject) {
            if (started) {
                audioObject.play();
            } else {
                audioObject.stop();
            }
        }
        setStartedInternal(started);
        setCompleted(0);
    }, [started, audioObject]);

    useEffect(() => {
        let timer;

        function progress() {
            setCompleted(oldCompleted => {
                if (oldCompleted < maxCompleted) {
                    return oldCompleted + 1;
                } else {
                    if (timer) {
                        clearInterval(timer);
                        setCompleted(0);
                        setStartedInternal(false);
                        if (audioObject) {
                            audioObject.stop();
                        }
                        if (animationEnded) {
                            animationEnded();
                        }
                    }
                }
            });
        }

        if (startedInternal)
            timer = setInterval(progress, animationStepDuration);

        return () => {
            if (timer)
                clearInterval(timer);
        };
    }, [startedInternal,
        setStartedInternal,
        setCompleted,
        animationEnded,
        maxCompleted]);

    const normalise = value => (value) * 100 / maxCompleted; // scale the completed value on range 0-100, 100 is the completion status

    if (!startedInternal) {
        return <div className={classes.container}>&nbsp;</div>;
    }

    return (
        <div className={classes.container}>
            <LinearProgress variant="determinate" value={normalise(completed)}/>
            <div className={classes.text}>{text}</div>
        </div>
    );
}

MusicProgress.propTypes = {
    started: PropTypes.bool.isRequired,
    musicUrl: PropTypes.string.isRequired,
    text: PropTypes.string,
    duration: PropTypes.number,
    animationEnded: PropTypes.func
};

MusicProgress.defaultProps = {
    duration: 30000,
    text: ''
};

export default MusicProgress;

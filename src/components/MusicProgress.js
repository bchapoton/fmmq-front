import React, {useEffect, useState} from 'react';
import {LinearProgress} from "@mui/material";
import PropTypes from "prop-types";
import {makeStyles} from "@mui/styles";
import {indigo} from "@mui/material/colors";
import config from "../config/NetworkConfig";
import NavigatorMusicPermissionModal from "./NavigatorMusicPermissionModal";

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
    const {duration, started, animationEnded, text, musicUrl, startPosition} = props;
    const [audioObject, setAudioObject] = useState(new Audio());
    const [startedInternal, setStartedInternal] = useState(started);
    const [completed, setCompleted] = useState(0);
    const maxCompleted = Math.round(duration / animationStepDuration);
    const [displayPermissionModal, setDisplayPermissionModal] = useState(false);
    const classes = useStyle();

    HTMLAudioElement.prototype.stop = function () {
        this.pause();
        this.currentTime = 0.0;
    };

    HTMLAudioElement.prototype.wrappedPlay = function () {
        this.play().catch(error => {
            console.log(error.name);
            if(error && error.name && error.name.toLowerCase() === 'NotAllowedError'.toLowerCase()) {
                setDisplayPermissionModal(true);
            }
        });
    };

    useEffect(() => {
        if (audioObject) {
            audioObject.preload = 'auto';
        }

        return () => {
            if (audioObject) {
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
                audioObject.currentTime = getStartPositionInSeconds(startPosition);
                audioObject.wrappedPlay();
            } else {
                audioObject.stop();
            }
        }
        setCompleted(scaleCompletedValue(startPosition, animationStepDuration));
        setStartedInternal(started);
    }, [started, startPosition, audioObject]);

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

    if (!startedInternal) {
        return <div className={classes.container}>&nbsp;</div>;
    }

    return (
        <React.Fragment>
            <div className={classes.container}>
                <LinearProgress variant="determinate" value={normalize(completed, maxCompleted)}/>
                <div className={classes.text}>{text}</div>
            </div>
            <NavigatorMusicPermissionModal open={displayPermissionModal}
                                           onClose={() => setDisplayPermissionModal(false)}/>
        </React.Fragment>
    );
}

/**
 * scale the completed value on range 0-100, 100 is the completion status
 *
 * @param {number} value current position
 * @param {number} maxCompleted max completed real value
 * @return {number} the completed value on range 0-100
 */
function normalize(value, maxCompleted) {
    if (value)
        return (value) * 100 / maxCompleted;
    else return 0;
}

/**
 * Scale the duration according to the animation step duration
 * Define the completed range
 *
 * @param {number} duration
 * @param {number} animationStepDuration
 */
function scaleCompletedValue(duration, animationStepDuration) {
    return Math.round(duration / animationStepDuration);
}

function getStartPositionInSeconds(value) {
    if (value) {
        return value / 1000;
    }
    return 0;
}

MusicProgress.propTypes = {
    started: PropTypes.bool.isRequired,
    startPosition: PropTypes.number,
    musicUrl: PropTypes.string,
    text: PropTypes.string,
    duration: PropTypes.number,
    animationEnded: PropTypes.func
};

MusicProgress.defaultProps = {
    startPosition: 0,
    duration: 30000,
    text: ''
};

export default MusicProgress;

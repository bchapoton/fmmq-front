import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/styles";
import {blueGrey} from "@material-ui/core/colors";
import {LinearProgress} from "@material-ui/core";

const useStyles = makeStyles({
    root: {},
    container: {},
    gameContainer: {
        backgroundColor: blueGrey[500],
        padding: '10px'
    }
});

function MusicProgress() {
    const classes = useStyles();
    const [completed, setCompleted] = useState(0);
    const maxCompleted = 120;

    useEffect(() => {
        function progress() {
            console.log('onprogress');
            setCompleted(oldCompleted => {
                console.log(oldCompleted);
                if (oldCompleted < maxCompleted) {
                    return oldCompleted + 1;
                } else {
                    return 0;
                }
            });
        }

        const timer = setInterval(progress, 250);
        return () => {
            clearInterval(timer);
        };
    }, []);
    console.log('rerender');
    const normalise = value => (value) * 100 / maxCompleted;

    return (
        <LinearProgress variant="determinate" value={normalise(completed)}/>
    );
}

export default MusicProgress;

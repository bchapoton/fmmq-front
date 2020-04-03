import React, {useEffect} from 'react';
import {makeStyles} from "@material-ui/styles";
import {Link} from "react-router-dom";

const useStyles = makeStyles({
    root: {},
    container: {}
});

function Home() {
    const classes = useStyles();

    useEffect(() => {
        /*
        let audioElement = document.getElementById('test');
        audioElement.play();
        setTimeout(() => audioElement.stop(), 1000);
        //audioElement.stop();
        let audioElementSrc = document.getElementById('src');

         */

        HTMLAudioElement.prototype.stop = function () {
            this.pause();
            this.currentTime = 0.0;
        }

        let audio = new Audio();
        audio.preload = 'auto';
        audio.src = 'http://localhost:3000/assets/test.mp3';
        audio.play();
        setTimeout(() => {
            audio.stop();
            audio.src = 'http://localhost:3000/assets/test2.mp3';
            audio.play();
            setTimeout(() => audio.stop(), 10000);
        }, 10000);

    }, []);

    return (
        <div className={classes.root}>
            Welcome home
            <ul>
                <li>
                    <Link to='/play/1'>Jouer</Link>
                </li>
            </ul>

            <div>
                <h1>Test</h1>
            </div>
        </div>
    );
}

export default Home;

import React from 'react';
import {makeStyles} from "@material-ui/styles";
import {Paper, Tooltip} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import clsx from 'clsx'
import PropTypes from "prop-types";
import AlbumIcon from '@material-ui/icons/Album';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        alignItems: 'center'
    }
});

function CurrentGamePreviousMusic(props) {
    const {values} = props;
    const classes = useStyles();

    if(!values || values.length === 0) {
        return null;
    }

    return (
        <div className={clsx(classes.root)}>
            {values.map((item, i) => {
                return (<div key={`${i}-${item.artist}`}>
                    <Tooltip
                    title={(<React.Fragment>
                        <Typography>{item.artist}</Typography>
                        <Typography>{item.title}</Typography>
                    </React.Fragment>)}
                >
                    <Paper>
                        <AlbumIcon/>
                    </Paper>
                </Tooltip>
                </div>)
            })}
        </div>
    );
}

CurrentGamePreviousMusic.propTypes = {
    values: PropTypes.array
};

CurrentGamePreviousMusic.defaultProps = {
    values: []
};

export default CurrentGamePreviousMusic;

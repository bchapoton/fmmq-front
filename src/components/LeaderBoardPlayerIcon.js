import React from 'react';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import { lightGreen, yellow } from '@mui/material/colors';
import PersonIcon from '@mui/icons-material/Person';
import MicIcon from '@mui/icons-material/Mic';
import StarIcon from '@mui/icons-material/Star';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import Badge from '@mui/material/Badge';

function LeaderBoardPlayerIcon(props) {
    const { icon, color } = props;
    const useStyles = makeStyles({
        iconContainer: {
            display: 'flex',
            alignItems: 'center',
            margin: '0 1px',
            width: '1.25rem',
            color: 'white',
            backgroundColor: color,
        },
    });

    const classes = useStyles();

    return <span className={classes.iconContainer}>{icon}</span>;
}

LeaderBoardPlayerIcon.propTypes = {
    icon: PropTypes.any.isRequired,
    color: PropTypes.any.isRequired,
};

LeaderBoardPlayerIcon.defaultProps = {};

export function PlayerIconArtistFound() {
    return <LeaderBoardPlayerIcon icon={<PersonIcon fontSize="small" />} color={lightGreen['A700']} />;
}

export function PlayerIconTitleFound() {
    return <LeaderBoardPlayerIcon icon={<MicIcon fontSize="small" />} color={lightGreen['A700']} />;
}

export function PlayerIconBothFound() {
    return <LeaderBoardPlayerIcon icon={<StarIcon fontSize="small" />} color={yellow[700]} />;
}

export function PlayerIconTrophy(props) {
    const { position } = props;

    return (
        <Badge
            badgeContent={position}
            color="secondary"
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
        >
            <LeaderBoardPlayerIcon icon={<EmojiEventsIcon fontSize="small" />} color={yellow[700]} />
        </Badge>
    );
}

PlayerIconTrophy.propTypes = {
    position: PropTypes.number.isRequired,
};

export function PlayerIconFirstFound() {
    return <PlayerIconTrophy position={1} />;
}

export function PlayerIconSecondFound() {
    return <PlayerIconTrophy position={2} />;
}

export function PlayerIconThirdFound() {
    return <PlayerIconTrophy position={3} />;
}

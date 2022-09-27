import React from 'react';
import {makeStyles} from "@mui/styles";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import {Link, useNavigate} from "react-router-dom";
import {ROUTE_TIPEEE} from "../router/routes";
import {red} from "@mui/material/colors";

const useStyles = makeStyles({
    root: {
        padding: '1rem'
    },
    tipeeContainer: {
        display: 'flex',
        alignItems: 'center',
        marginTop: '5px'
    },
    paperTipeeLogo: {
        fontFamily: 'ChunkFiveRegular',
        fontSize: '14px',
        color: '#fff',
        backgroundColor: '#d64758',
        border: '1px solid #d13245',
        borderRadius: '2px',
        padding: '0 15px',
        verticalAlign: 'top',
        lineHeight: '21px',
        cursor: 'pointer'
    },
    paperTipeeBacker: {
        background: '#fff',
        border: '1px solid #c1c1c1',
        lineHeight: '20px',
        marginLeft: '6px',
        minWidth: '15px',
        padding: '0 5px',
        textAlign: 'center',
        whiteSpace: 'nowrap',
        borderRadius: '2px',
        display: 'inline-block',
        fontSize: '11px',
    },
    link: {
        '&:hover': {
            color: red[800]
        },
        textDecoration: 'none',
        color: 'inherit',
        fontWeight: 'bold'
    }
});

function Tipeee() {
    const classes = useStyles();
    const navigate = useNavigate();
    return (
        <Paper className={classes.root}>
            <Typography variant='h6'>Soutenez le projet</Typography>
            <Typography variant='body2'>
                Vous pouvez soutenir l’équipe bénévole de FMMQ via <Link to={ROUTE_TIPEEE}
                                                                         className={classes.link}>tipeee.com/FMMQ</Link>
            </Typography>
            <div className={classes.tipeeContainer}>
                <span
                    className={classes.paperTipeeLogo}
                    onClick={e => navigate(ROUTE_TIPEEE)}
                >
                    Tip!
                </span>
                <Paper component='span' className={classes.paperTipeeBacker}>
                    {Math.round(Math.random() * (7000 - 3) + 3)}
                </Paper>
            </div>
        </Paper>
    );
}

export default Tipeee;

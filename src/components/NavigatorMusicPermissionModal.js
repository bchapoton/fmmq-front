import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@mui/styles';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import theme from "../layout/MUITheme";
import {DialogActions, DialogContent} from "@mui/material";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Link from "@mui/material/Link";

const emails = ['username@gmail.com', 'user02@gmail.com'];
const useStyles = makeStyles({
    heading: {
        fontWeight: 'bold',
        fontSize: theme.typography.pxToRem(20)
    },
    expansionPanelHeading: {
        fontWeight: 'bold',
        fontSize: theme.typography.pxToRem(15)
    },
    expansionPanelDetails: {
        flexDirection: 'column'
    },
    permissionsImage: {
        width: '90%',
        margin: '5px 5%'
    }
});

export default function NavigatorMusicPermissionModal(props) {
    const classes = useStyles();
    const {onClose, open} = props;

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog
            onClose={handleClose}
            aria-labelledby="navigator-need-music-permission"
            open={open}
        >
            <DialogTitle
                id="navigator-need-music-permission"
            >
                <Typography className={classes.heading}>
                    Le navigateur a besoin d'une permission pour jouer les musiques
                </Typography>
            </DialogTitle>
            <DialogContent>
                <div>Pour pouvoir jouer il faut autoriser le site à jouer des sons en arrière plan pour ce site.</div>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={classes.expansionPanelHeading}>
                            J'ai Firefox (<Link href='https://www.mozilla.org/fr/firefox/new/' target='_blank'>si je ne
                            l'ai pas je devrais</Link>)
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails className={classes.expansionPanelDetails}>
                        <div>Dans la barre d'adresse mettre le paramètre <b>Lire automatiquement des médias</b> à <b>Autoriser
                            l'audio et la vidéo</b></div>
                        <img
                            className={classes.permissionsImage}
                            alt='Réglage permissions de son pour firefox'
                            src='/assets/img/permissions/firefox_sound_permission_first.png'
                        />
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography className={classes.expansionPanelHeading}>
                            J'ai Chrome
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails className={classes.expansionPanelDetails}>
                        <div>Dans la barre d'adresse</div>
                        <img
                            className={classes.permissionsImage}
                            alt='Réglage permissions de son pour chrome première étape'
                            src='/assets/img/permissions/chrome_sound_permission_first.png'
                        />
                        <div>Dans le panneau de configuration du site, trouver le paramètre <b>Son</b> et le
                            mettre <b>Autoriser</b></div>
                        <img
                            className={classes.permissionsImage}
                            alt='Réglage permissions de son pour chrome seconde étape'
                            src='/assets/img/permissions/chrome_sound_permission_second.png'
                        />
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography className={classes.expansionPanelHeading}>
                            J'ai un autre navigateur
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            <Link
                                href={'https://duckduckgo.com/?q=' + encodeURI('[Remplacer ici le nom de mon navigateur]') + '+autoriser+la+lecture+automatique+des+sons+sur+'}
                                target='_blank'
                            >
                                C'est par là
                            </Link>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => onClose()}
                >
                    J'ai compris
                </Button>
            </DialogActions>
        </Dialog>
    );
}

NavigatorMusicPermissionModal.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func.isRequired
};

NavigatorMusicPermissionModal.defaultProps = {
    open: false
};
import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import theme from "../layout/MUITheme";
import {DialogActions, DialogContent} from "@material-ui/core";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Link from "@material-ui/core/Link";

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
                <ExpansionPanel>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={classes.expansionPanelHeading}>
                            J'ai Firefox (<Link href='https://www.mozilla.org/fr/firefox/new/' target='_blank'>si je ne
                            l'ai pas je devrais</Link>)
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={classes.expansionPanelDetails}>
                        <div>Dans la barre d'adresse mettre le paramètre <b>Lire automatiquement des médias</b> à <b>Autoriser
                            l'audio et la vidéo</b></div>
                        <img
                            className={classes.permissionsImage}
                            alt='Réglage permissions de son pour firefox'
                            src='/assets/img/permissions/firefox_sound_permission_first.png'
                        />
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography className={classes.expansionPanelHeading}>
                            J'ai Chrome
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={classes.expansionPanelDetails}>
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
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography className={classes.expansionPanelHeading}>
                            J'ai un autre navigateur
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                            <Link
                                href={'https://duckduckgo.com/?q=' + encodeURI('[Remplacer ici le nom de mon navigateur]') + '+autoriser+la+lecture+automatique+des+sons+sur+'}
                                target='_blank'
                            >
                                C'est par là
                            </Link>
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
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
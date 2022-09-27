import React from 'react';
import Title from '../layout/Title';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

export default function Rules() {
    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Title>Les règles</Title>
            </AccordionSummary>
            <AccordionDetails>
                <div>
                    Une partie c'est en 15 extraits piochés au hasard. Tu as 30 secondes pour découvrir le titre et
                    l'artiste diffusés.
                    <br />
                    <br />
                    Tu gagnes 1 point si tu trouves l'artiste ou le titre.
                    <br />
                    Tu gagnes 2 points si tu trouves l'artiste et le titre.
                    <br />
                    <br />
                    Les trois premiers joueurs les plus rapides à trouver l'artiste et le titre gagnent une coupe. La
                    première place te fait gagner 3 points bonus, la deuxième 2 points bonus et la troisième 1 point
                    bonus.
                    <br />
                    <br />
                    Tu fais un combo lorsque tu enchaînes deux sans faute. Un combo te fait gagner 1 point
                    supplémentaire.
                </div>
            </AccordionDetails>
        </Accordion>
    );
}
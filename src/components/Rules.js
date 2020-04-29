import React from 'react';
import Title from "../layout/Title";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";

export default function Rules() {
    return (
        <ExpansionPanel>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon/>}
            >
                <Title>Les règles</Title>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <div>
                    Une partie c'est en 15 extraits piochés au hasard. Tu as 30 secondes pour découvrir le
                    titre et l'artiste diffusés.<br/>
                    <br/>
                    Tu gagnes 1 point si tu trouves l'artiste ou le titre.<br/>
                    Tu gagnes 2 points si tu trouves l'artiste et le titre.<br/>
                    <br/>
                    Les trois premiers joueurs les plus rapides à trouver l'artiste et le titre gagnent une
                    coupe. La première place te fait gagner 3 points bonus, la deuxième 2 points bonus et la
                    troisième 1 point bonus.<br/>
                    <br/>
                    Tu fais un combo lorsque tu enchaînes deux sans faute. Un combo te fait gagner 1 point
                    supplémentaire.
                </div>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
}
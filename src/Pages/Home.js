import React from 'react';
import {makeStyles} from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import {Card} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Title from "../layout/Title";

const useStyles = makeStyles({
    root: {
        padding: '2rem'
    }
});

function Home() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container>
                <Grid item xs={6}>
                    <Card elevation={3}>
                        <CardContent>
                            <Title>Les règles</Title>
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
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6}>
                </Grid>
            </Grid>
        </div>
    );
}

export default Home;

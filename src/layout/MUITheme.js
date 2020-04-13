import {grey} from "@material-ui/core/colors";
import {createMuiTheme} from "@material-ui/core";

const theme = createMuiTheme({
    typography: {
        fontFamily: [
            'pt_sansregular',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif'
        ].join(','),
    },
    overrides: {
        'MuiInputBase-root': {
            color: grey[400]
        }
    }
});

export default theme;
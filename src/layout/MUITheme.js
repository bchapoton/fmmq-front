import {grey} from "@mui/material/colors";
import {createTheme} from "@mui/material/styles";

const theme = createTheme({
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
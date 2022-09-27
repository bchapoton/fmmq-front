import {grey} from "@mui/material/colors";
import {adaptV4Theme, createTheme} from "@mui/material/styles";

const theme = createTheme(adaptV4Theme({
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
}));

export default theme;
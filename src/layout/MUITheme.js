import {grey} from "@material-ui/core/colors";
import {createMuiTheme} from "@material-ui/core";

export default createMuiTheme({
    overrides: {
        'MuiInputBase-root': {
                color: grey[400]
        }
    }
});
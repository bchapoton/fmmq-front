import React, {useState} from 'react'
import Grid from "@material-ui/core/Grid";
import SubMenu from "../../layout/SubMenu";
import {getAdminMenu} from "../../layout/menus/FMMQMenus";
import {makeStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import clsx from "clsx";

const useStyle = makeStyles({
    root: {
        display: 'flex',
        height: '100%'
    },
    menuContainer: {
        flex: '0 0 250px',
        backgroundColor: 'white',
        borderRight: '1px solid grey'
    },
    contentContainer: {
        flex: '1',
        padding: '10px'
    },
    transTest: {
        display: 'none'
    },
    test: {
        position: 'relative'
    },
    button: {
        position: 'absolute',
        left: '0',
        top: '0'
    },
    buttonTest: {
        left: '260px',
    }
});

function CommonsMenuPageWrapper(props) {
    const {children, menuArray} = props;
    const classes = useStyle();
    const [test, setTest] = useState(false);
    return (
        <div className={classes.test}>
        <div className={classes.root}>
            <div className={clsx(classes.menuContainer, test ? classes.transTest: null)}>
                <SubMenu values={menuArray}/>
            </div>
            <div className={classes.contentContainer}>
                {children}
            </div>
        </div>
            <Button className={clsx(classes.button, !test ? classes.buttonTest : null)} onClick={() => setTest(!test)}>test</Button>
        </div>
    )
}

CommonsMenuPageWrapper.propTypes = {
    menuArray: PropTypes.array,
};

CommonsMenuPageWrapper.defaultProps = {};

export default CommonsMenuPageWrapper;
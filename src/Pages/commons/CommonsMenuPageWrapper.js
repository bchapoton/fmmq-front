import React, { useState } from 'react';
import SubMenu from '../../layout/SubMenu';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import clsx from 'clsx';

const useStyle = makeStyles({
    root: {
        display: 'flex',
        height: '100%',
    },
    menuContainer: {
        flex: '0 0 250px',
        backgroundColor: 'white',
        borderRight: '1px solid grey',
    },
    contentContainer: {
        flex: '1',
        padding: '10px',
    },
    transTest: {
        display: 'none',
    },
    test: {
        position: 'relative',
    },
    button: {
        position: 'absolute',
        left: '0',
        top: '0',
    },
    buttonTest: {
        left: '260px',
    },
});

function CommonsMenuPageWrapper(props) {
    const { children, menuArray } = props;
    const classes = useStyle();
    const [test, setTest] = useState(false);
    return (
        <div className={classes.test}>
            <div className={classes.root}>
                <div className={clsx(classes.menuContainer, test ? classes.transTest : null)}>
                    <SubMenu values={menuArray} />
                </div>
                <div className={classes.contentContainer}>{children}</div>
            </div>
            <Button className={clsx(classes.button, !test ? classes.buttonTest : null)} onClick={() => setTest(!test)}>
                test
            </Button>
        </div>
    );
}

CommonsMenuPageWrapper.propTypes = {
    menuArray: PropTypes.array,
};

CommonsMenuPageWrapper.defaultProps = {};

export default CommonsMenuPageWrapper;

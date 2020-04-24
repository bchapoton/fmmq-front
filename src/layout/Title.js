import React from 'react';
import {makeStyles} from "@material-ui/styles";
import {orange} from "@material-ui/core/colors";
import PropTypes from "prop-types";

function Title(props) {
    const {color, children} = props;

    const classes = makeStyles({
        title: {
            fontFamily: 'ChunkFiveRegular',
            color: color[500],
            fontSize: '1.5rem',
        }
    })();

    return (<h3 className={classes.title}>{children}</h3>);
}


Title.propTypes = {
    color: PropTypes.any
};


Title.defaultProps = {
    color: orange
};

export default Title;

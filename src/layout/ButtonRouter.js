import React from 'react'
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import history from "./utils/history";

function ButtonRouter(props) {
    const {to} = props;
    return (<Button
        variant='contained'
        color='primary'
        {...props}
        onClick={(e) => {
            e.preventDefault();
            history.push(to);
        }}
    />);
}


ButtonRouter.propTypes = {
    to: PropTypes.string.isRequired
};

export default ButtonRouter;
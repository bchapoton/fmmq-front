import React from 'react'
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function ButtonRouter(props) {
    const {to} = props;
    const navigate = useNavigate();
    return (<Button
        variant='contained'
        color='primary'
        {...props}
        onClick={(e) => {
            e.preventDefault();
            navigate(to);
        }}
    />);
}


ButtonRouter.propTypes = {
    to: PropTypes.string.isRequired
};

export default ButtonRouter;
import React, {useEffect} from 'react'
import PropTypes from "prop-types";
import LocalLoader from "../../layout/LocalLoader";
import {makeStyles} from "@mui/styles";
import {useDispatch} from "react-redux";
import {hideLoader, showLoader} from "../../store/actions/loader.action";

const useStyle = makeStyles({
    loaderContainer: {
        height: '200px'
    }
});

function AdminLoadingErrorDisplay(props) {
    const {loading, error, children} = props;
    const classes = useStyle();
    const dispatch = useDispatch();

    useEffect(() => {
        if(loading) {
            dispatch(showLoader());
        } else {
            dispatch(hideLoader());
        }
    }, [loading]);

    if (loading) {
        return (
            <div className={classes.loaderContainer}>
                <LocalLoader/>
            </div>
        );
    }

    if (error) {
        console.log('error' + error );
        return (<span>error</span>);
    }

    return children;
}

AdminLoadingErrorDisplay.propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.any
};

AdminLoadingErrorDisplay.defaultProps = {
    loading: true,
    error: null
};

export default AdminLoadingErrorDisplay;
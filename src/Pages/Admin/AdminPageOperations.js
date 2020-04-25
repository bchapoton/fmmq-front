import React, {useState} from 'react'
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import {useDispatch} from "react-redux";
import {hideLoader, showLoader} from "../../store/actions/loader.action";
import PropTypes from "prop-types";
import JSONPretty from "react-json-pretty";
import JSONPrettyMon from "react-json-pretty/themes/monikai.css";

const useStyle = makeStyles({
    root: {
        padding: '1rem'
    },
    operatorContainer: {
        display: 'flex',
        justifyContent: 'space-between'
    }
});

function AdminPageOperations(props) {
    const classes = useStyle();
    const {operations} = props;
    const dispatch = useDispatch();
    const [operationResult, setOperationResult] = useState();

    if (operations.length === 0) {
        return null;
    }

    /**
     * operation model
     * {
     *     axiosPromise: postReSanitizeAllDB,
     *     label: '',
     * }
     */

    return (
        <div className={classes.root}>
            <h2>Opérations</h2>
            <div className={classes.operatorContainer}>
                {operations.map(operation => {
                    return (
                        <Button
                            key={operation.label}
                            variant='contained'
                            color='primary'
                            onClick={() => {
                                dispatch(showLoader());
                                operation.axiosPromise()
                                    .then(response => {
                                        setOperationResult((
                                            <React.Fragment>
                                                <h4>Opération terminée</h4>
                                                <div>
                                                    <JSONPretty data={response.data} theme={JSONPrettyMon}/>
                                                </div>
                                            </React.Fragment>
                                        ));
                                    })
                                    .catch(error => {
                                        setOperationResult((
                                            <React.Fragment>
                                                <h4>Error occured</h4>
                                                <div>{error.message}</div>
                                            </React.Fragment>
                                        ));
                                    })
                                    .then(() => {
                                        dispatch(hideLoader());
                                    });
                            }}
                        >
                            {operation.label}
                        </Button>
                    );
                })}
            </div>
            {operationResult ?
                (<div>
                    <Button onClick={() => setOperationResult(null)}>clear</Button>
                    {operationResult}
                </div>)
                : null}

        </div>
    );
}

AdminPageOperations.propTypes = {
    operations: PropTypes.array
};

AdminPageOperations.defaultProps = {
    operations: []
};

export default AdminPageOperations;
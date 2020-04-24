import React, {useEffect, useState} from 'react'
import {makeStyles} from "@material-ui/core/styles";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Paper from "@material-ui/core/Paper";
import TableBody from "@material-ui/core/TableBody";
import PropTypes from "prop-types";
import ButtonRouter from "../../layout/ButtonRouter";
import {valueConverter} from "./AdminValueConverter";
import AdminLoadingErrorDisplay from "./AdminLoadingErrorDisplay";


const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    header: {
        fontWeight: 'bold'
    }
});

const pagerInitialState = '0-5';

function AdminTable(props) {
    const classes = useStyles();
    const {headers, actions, getValuesCallback} = props;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [rows, setRows] = useState([]);
    const [pager, setPager] = useState(pagerInitialState);

    const loadData = (pager) => {
        if (getValuesCallback) {
            setError(null);
            setLoading(true);
            getValuesCallback(pager)
                .then(response => {
                    setRows(response.data);
                })
                .catch(error => {
                    setError(error);
                })
                .then(() => setLoading(false));
        }
    };

    useEffect(() => {
        console.log('initial load')
        loadData(pagerInitialState);
    }, []);
    /*
        useEffect(() => {
            console.log('pager load')
            loadData(pager);
        }, [loadData, pager]);
    */


    if (loading || error) {
        return (<AdminLoadingErrorDisplay loading={loading} error={error}/>);
    }

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        {headers.map(header => {
                            return (
                                <TableCell key={`header-${header.id}`}><span
                                    className={classes.header}>{header.label}</span></TableCell>
                            );
                        })}
                        {actions.map(action => {
                            return (
                                <TableCell key={`action-${action.label}`}>&nbsp;</TableCell>
                            );
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => {
                        const idHeader = findIdHeader(headers);
                        const idValue = row[idHeader];
                        const rowKey = `row-${idValue}`;
                        return (
                            <TableRow key={rowKey}>
                                {headers.map((header, index) => {
                                    const value = row[header.id];
                                    const cellKey = `${rowKey}-cell-${value}-${index}`;

                                    return (
                                        <TableCell key={cellKey}>{valueConverter(header, value)}</TableCell>
                                    );
                                })}
                                {actions.map(action => {
                                    return (
                                        <TableCell key={`${rowKey}-action-${action.id}`}>
                                            <ButtonRouter to={generateActionUrl(action.url, idValue)}>
                                                {action.label}
                                            </ButtonRouter>
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

function findIdHeader(headers) {
    for (let index in headers) {
        if (headers[index].isId) {
            return headers[index].id;
        }
    }
    throw 'Table header need and id column !';
}

function generateActionUrl(url, objectId) {
    return url.replace(':id', objectId);
}

AdminTable.propTypes = {
    headers: PropTypes.array.isRequired,
    actions: PropTypes.array,
    getValuesCallback: PropTypes.func.isRequired
};

AdminTable.defaultProps = {
    actions: []
};

export default AdminTable;
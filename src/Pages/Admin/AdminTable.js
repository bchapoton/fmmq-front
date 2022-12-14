import React, { useCallback, useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import TableBody from '@mui/material/TableBody';
import PropTypes from 'prop-types';
import ButtonRouter from '../../layout/ButtonRouter';
import { valueConverter } from './AdminValueConverter';
import AdminLoadingErrorDisplay from './AdminLoadingErrorDisplay';
import AdminPager from './AdminPager';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '../../store/actions/loader.action';
import DeleteIcon from '@mui/icons-material/Delete';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    header: {
        fontWeight: 'bold',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        margin: '5px 0',
    },
});

const pagerSize = 20;
const pagerInitialState = '0-' + pagerSize;

function AdminTable(props) {
    const classes = useStyles();
    const { headers, actions, getValuesCallback, countCallback, deleteCallback } = props;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [rows, setRows] = useState([]);
    const [fullSize, setFullSize] = useState(-1);
    const [currentDataSize, setCurrentDataSize] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [pager, setPager] = useState(pagerInitialState);
    const [deleteMessage, setDeleteMessage] = useState();
    const dispatch = useDispatch();

    const loadData = useCallback(
        (pager) => {
            console.log('pager to load : ' + pager);
            if (getValuesCallback) {
                setError(null);
                setLoading(true);
                getValuesCallback(pager)
                    .then((response) => {
                        setRows(response.data);
                        setCurrentDataSize(response.data.length);
                    })
                    .catch((error) => {
                        setError(error);
                    })
                    .then(() => setLoading(false));
            }
        },
        [getValuesCallback],
    );

    useEffect(() => {
        loadData(pagerInitialState);
        countCallback()
            .then((response) => {
                setFullSize(response.data.count);
            })
            .catch((error) => {
                console.log("can't count full size object : " + error.message);
            });
    }, [countCallback, loadData]);

    return (
        <AdminLoadingErrorDisplay loading={loading} error={error}>
            <div>{deleteMessage}</div>
            <AdminPager
                loadData={loadData}
                setPager={setPager}
                currentDataSize={currentDataSize}
                fullSize={fullSize}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                pagerSize={pagerSize}
            />
            <TableContainer component={Paper}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            {headers.map((header) => {
                                return (
                                    <TableCell key={`header-${header.id}`}>
                                        <span className={classes.header}>{header.label}</span>
                                    </TableCell>
                                );
                            })}
                            {actions.map((action) => {
                                return <TableCell key={`action-${action.label}`}>&nbsp;</TableCell>;
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

                                        return <TableCell key={cellKey}>{valueConverter(header, value)}</TableCell>;
                                    })}
                                    {actions.map((action) => {
                                        return (
                                            <TableCell key={`${rowKey}-action-${action.id}`}>
                                                <ButtonRouter
                                                    variant="outlined"
                                                    to={generateActionUrl(action.url, idValue)}
                                                >
                                                    {action.label}
                                                </ButtonRouter>
                                            </TableCell>
                                        );
                                    })}
                                    {deleteCallback ? (
                                        <TableCell key={`${rowKey}-deleteAction`}>
                                            <Button
                                                variant="outlined"
                                                onClick={() => {
                                                    dispatch(showLoader());
                                                    deleteCallback(idValue)
                                                        .then((response) => {
                                                            setDeleteMessage(<span>Element supprim??</span>);
                                                            loadData(pager);
                                                        })
                                                        .catch((error) => {
                                                            setDeleteMessage(
                                                                <span>L'??lement n'a pas pu ??tre supprim??</span>,
                                                            );
                                                        })
                                                        .then(() => {
                                                            dispatch(hideLoader());
                                                            setTimeout(() => setDeleteMessage(null), 3000);
                                                        });
                                                }}
                                            >
                                                <DeleteIcon />
                                            </Button>
                                        </TableCell>
                                    ) : null}
                                </TableRow>
                            );
                        })}
                        {rows.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={headers.length + actions.length} align="center">
                                    Aucune donn??e
                                </TableCell>
                            </TableRow>
                        ) : null}
                    </TableBody>
                </Table>
            </TableContainer>
            <AdminPager
                loadData={loadData}
                setPager={setPager}
                currentDataSize={currentDataSize}
                fullSize={fullSize}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                pagerSize={pagerSize}
            />
        </AdminLoadingErrorDisplay>
    );
}

function findIdHeader(headers) {
    for (let index in headers) {
        if (headers[index].isId) {
            return headers[index].id;
        }
    }
    throw new Error('Table header need and id column !');
}

function generateActionUrl(url, objectId) {
    return url.replace(':id', objectId);
}

AdminTable.propTypes = {
    headers: PropTypes.array.isRequired,
    actions: PropTypes.array,
    getValuesCallback: PropTypes.func.isRequired,
    countCallback: PropTypes.func.isRequired,
    deleteCallback: PropTypes.func,
};

AdminTable.defaultProps = {
    actions: [],
    deleteCallback: null,
};

export default AdminTable;

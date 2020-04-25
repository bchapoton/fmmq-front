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
import Button from "@material-ui/core/Button";


const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    header: {
        fontWeight: 'bold'
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        margin: '5px 0'
    }
});

const pagerSize = 5;
const pagerInitialState = '0-' + pagerSize;

function AdminPager(props) {
    const classes = useStyles();
    const {loadData, currentDataSize, fullSize, setPager, currentPage, setCurrentPage} = props;

    return (
            <div className={classes.buttonContainer}>
                <Button
                    disabled={currentPage === 0}
                    onClick={() => {
                        const newPage = currentPage - 1;
                        setCurrentPage(newPage);
                        const nextPager = `${newPage * pagerSize}-${pagerSize}`;
                        setPager(nextPager);
                        loadData(nextPager);
                    }}
                >
                    previous
                </Button>
                <span>&nbsp;page {currentPage + 1}&nbsp;/&nbsp;Documents {currentPage * pagerSize} à {(currentPage * pagerSize) + currentDataSize}&nbsp;sur&nbsp;{fullSize === -1 ? 'N/A' : fullSize}&nbsp;documents&nbsp;</span>
                <Button
                    disabled={currentDataSize < pagerSize}
                    onClick={() => {
                        const newPage = currentPage + 1;
                        setCurrentPage(newPage);
                        const nextPager = `${newPage * pagerSize}-${pagerSize}`;
                        setPager(nextPager);
                        loadData(nextPager);
                    }}
                >
                    next
                </Button>
            </div>
    )
}


AdminPager.propTypes = {
    loadData: PropTypes.func.isRequired,
    setPager: PropTypes.func.isRequired,
    setCurrentPage: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired,
    currentDataSize: PropTypes.number.isRequired,
    fullSize: PropTypes.number,
};

AdminPager.defaultProps = {
};

export default AdminPager;
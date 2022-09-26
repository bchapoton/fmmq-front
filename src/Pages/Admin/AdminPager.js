import React from 'react'
import {makeStyles} from "@mui/material/styles";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";


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

function AdminPager(props) {
    const classes = useStyles();
    const {loadData, currentDataSize, fullSize, setPager, currentPage, setCurrentPage, pagerSize} = props;

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
    pagerSize: PropTypes.number.isRequired,
};

AdminPager.defaultProps = {
};

export default AdminPager;
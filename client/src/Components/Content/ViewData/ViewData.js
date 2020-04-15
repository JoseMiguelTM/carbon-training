import React, {useEffect} from 'react';
import axios from 'axios';
import {DataTableSkeleton, Pagination} from 'carbon-components-react';
import TableData from './TableData';


const headers = [
    {
        key: 'FIRSTNAME',
        header: 'First Name'
    },
    {
        key: "LASTNAME",
        header: "Last Name"
    },
    {
        key: "W3ID",
        header: "w3id"
    },
    {
        key: "BUSINESSUNIT",
        header: "Business Unit"
    },
    {
        key: "TECHNOLOGIES",
        header: "Known Technologies"
    },
];

const ViewData = () => {
    const [loading, setLoading] = React.useState(false);
    const [rows, setRows] = React.useState([]);
    const [currentPageSize, setCurrentPageSize] = React.useState(10);
    const [firstRowIndex, setFirstRowIndex] = React.useState(0);

    useEffect(() => {
        axios.post('http://localhost:8080/viewUsers')
        .then(res => {
            //setRows(res.data.data);
            let dataChanged = res.data.data;
            dataChanged.forEach(user => {
                user.id = user.ID.toString();
                delete user.ID;
            });
            setRows(dataChanged);
            setLoading(false);
        })
        .catch(
            function(error) {
                console.log('error: ', error);
            }
        )
    }, []);

    if(loading) {
        return <div className = "bx--grid bx--grid--full-width bx--grid--no-gutter">
            <div className = "bx--row dataTable">
                <div className = "bx--col-lg-16">
                    <DataTableSkeleton
                        columnCount = {6}
                        rowCount = {10}
                        headers = {headers}
                    />
                </div>
            </div>
        </div>
    }
    else {
        return <div className = "bx--grid bx--grid--full-width bx--grid--no-gutter">
            <div className = "bx--row dataTable">
                <div className = "bx--col-lg-16">
                    <TableData
                        headers = {headers}
                        rowData = {rows.slice(
                            firstRowIndex,
                            firstRowIndex + currentPageSize
                        )}
                    />
                    <Pagination
                        totalItems = {rows.length}
                        backwardText = "Previous Page"
                        forwardText = "Next Page"
                        pageSize = {10}
                        pageSizes = {[5, 10]}
                        itemsPerPageText = "Items per page"
                        onChange = {({page, pageSize}) => {
                            if(pageSize !== currentPageSize) {
                                setCurrentPageSize(pageSize);
                            }
                            setFirstRowIndex(pageSize * (page - 1));
                        }}
                    />
                </div>
            </div>
        </div>
    }
}

export default ViewData;
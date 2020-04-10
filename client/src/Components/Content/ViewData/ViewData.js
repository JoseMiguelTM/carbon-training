import React, {useEffect} from 'react';
import axios from 'axios';
import {DataTableSkeleton, Pagination} from 'carbon-components-react';


const headers = [
    {
        key: 'firstName',
        header: 'First Name'
    },
    {
        key: "lastName",
        header: "Last Name"
    },
    {
        key: "w3id",
        header: "w3id"
    },
    {
        key: "businessUnit",
        header: "Business Unit"
    },
    {
        key: "technologies",
        header: "Known Technologies"
    },
]

const ViewData = () => {
    const [loading, setLoading] = React.useState(true);
    const [rows, setRows] = React.useState([]);
    const [currentPageSize, setCurrentPageSize] = React.useState(10);
    const [firstRowIndex, setFirstRowIndex] = React.useState(0);

    useEffect(() => {
        axios.post('http://localhost:3001/viewUsers')
        .then(res => {
            setRows(res.data.data);
            setLoading(false);
        })
        .catch(
            function(error) {
                console.log('error: ', error);
            }
        )
    }, []);

    if(loading) {
        return <div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <DataTableSkeleton
                columnCount = {4}
                rowCount = {10}
                headers = {headers}
            />
            {console.log(rows)}
        </div>
    }
    else {
        return <div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            Loaded!
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
    }
}

export default ViewData;
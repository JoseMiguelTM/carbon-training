import React from 'react';
import {
    DataTable,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableExpandHeader,
    TableHeader,
    TableBody,
    TableExpandRow,
    TableCell,
    TableExpandedRow,
    OverflowMenu,
    OverflowMenuItem,
} from 'carbon-components-react';

const TableData = ({headers, rowData}) => {
    return <div>
        <DataTable
            rows = {rowData}
            headers = {headers}
            render = {({
                rows, 
                headers, 
                getHeaderProps, 
                getRowProps,
                getTableProps
            }) => (
                <TableContainer
                    title = "Users"
                    description = "Users on DB2 Database"
                    {...getTableProps}
                >
                    <Table>
                        <TableHead>
                            <TableRow>
                                {headers.map(header => (
                                    <TableHeader key = {header.key}>
                                        {header.header}
                                    </TableHeader>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map(row => (
                                <TableRow key = {row.id}>
                                    {row.cells.map(cell => (
                                        <TableCell key = {cell.id}>
                                            {cell.value} 
                                        </TableCell>
                                    ))}
                                    <TableCell style = {{whiteSpace: "nowrap"}}>
                                        <OverflowMenu flipped>
                                            <OverflowMenuItem itemText = "Modify"/>
                                            <OverflowMenuItem isDelete itemText = "Delete"/>
                                        </OverflowMenu>
                                    </TableCell>
                                </TableRow> 
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        />
    </div>
}

export default TableData;
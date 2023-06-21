"use client"

import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {Shipment} from "@/models/shipment";
import {useState} from "react";
import {Box} from "@mui/system";
import ShipmentDetails from "@/app/ShipmentDetails";

interface ShipmentTableProps {
    data: Shipment[]
}

export default function ShipmentsTable({data}: ShipmentTableProps) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(15)
    const [rows, setRows] = useState<Shipment[]>([...data])

    const handleChangePage = (e: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(e.target.value, 10))
        setPage(0)
    }

    const handleDelete = (orderNo: string) => {
        console.log("deleing")
        setRows(rows.filter(row => row.orderNo !== orderNo))
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}}
                       aria-label="shipment table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ORDERNO</TableCell>
                            <TableCell>DELIVERYDATE</TableCell>
                            <TableCell>CUSTOMER</TableCell>
                            <TableCell>TRACKINGNO</TableCell>
                            <TableCell>STATUS</TableCell>
                            <TableCell>CONSIGNEE</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0 ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) :
                            rows).map((row) => (
                            <TableRow
                                key={row.orderNo}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th"
                                           scope="row">
                                    {row.orderNo}
                                </TableCell>
                                <TableCell>{row.date}</TableCell>
                                <TableCell>{row.customer}</TableCell>
                                <TableCell>{row.trackingNo}</TableCell>
                                <TableCell>{row.status}</TableCell>
                                <TableCell>{row.consignee}</TableCell>
                                <TableCell>
                                    <Box sx={{display: "flex", gap: "1em"}}>
                                        <ShipmentDetails row={row}
                                                         rows={rows}
                                                         setRows={setRows}/>
                                        <Button variant="contained"
                                                color="error"
                                                onClick={() => handleDelete(row.orderNo)}><DeleteIcon/></Button>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination rowsPerPageOptions={[5, 15, 25, {label: "all", value: -1}]}
                                             rowsPerPage={rowsPerPage}
                                             page={page}
                                             count={rows.length}
                                             onPageChange={handleChangePage}
                                             onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>

        </>
    )
}
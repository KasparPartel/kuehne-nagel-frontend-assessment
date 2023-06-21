import {Button, Card, Grid, Modal, TextField, Typography, Stack} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import {SetStateAction, useEffect, useState} from "react";
import Article from "@mui/icons-material/Article";
import {Shipment} from "@/models/shipment";
import CloseIcon from '@mui/icons-material/Close';

interface ShipmentDetailsProps {
    row: Shipment
    rows: Shipment[]
    setRows: React.Dispatch<SetStateAction<Shipment[]>>
}

export default function ShipmentDetails({row, rows, setRows}: ShipmentDetailsProps) {
    const [open, setOpen] = useState(false);
    const [disabled, setDisabled] = useState(true)
    const [inputs, setInputs] = useState<Shipment>({...row})
    const [isUpdated, setIsUpdated] = useState(false)

    useEffect(() => {
        const checkForUpdates = () => {
            for (const k of Object.keys(inputs)) {
                if (row[k as keyof Shipment] != inputs[k as keyof Shipment]) {
                    setIsUpdated(true)
                    return
                }
            }
            setIsUpdated(false)
        }

        checkForUpdates()
    }, [inputs, row])

    const handleToggleEditable = () => {
        setDisabled(!disabled)
    }

    const handleOpenDetails = () => {
        setOpen(true)
    }

    const handleCloseDetails = (event: object, reason: string) => {
        setOpen(false)
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target
        setInputs(prevState => ({...prevState, [name]: value}))
    }

    const handleSubmit = () => {
        const updatedIndex = rows.findIndex(shipment => shipment.orderNo === inputs.orderNo)
        const updatedRows = [...rows]

        if (updatedIndex !== -1) {
            updatedRows[updatedIndex] = {...inputs}
            setRows(updatedRows)
        }
    }

    return (
        <>
            <Button variant="contained"
                    onClick={handleOpenDetails}><Article/></Button>
            <Modal sx={{p: 5}}
                   open={open}
                   onClose={handleCloseDetails}>
                <Card sx={{p: 2}}>
                    <Stack direction="row"
                           justifyContent="space-between"
                           alignItems="center">
                        <Typography component="h1"
                                    gutterBottom>SHIPMENT DETAILS</Typography>
                        <IconButton aria-label="close"
                                    onClick={() => setOpen(false)}><CloseIcon/></IconButton>
                    </Stack>
                    <Grid container
                          spacing={2}
                          p={2}>
                        <Grid item
                              xs={12}>
                            <Button onClick={handleToggleEditable}>Edit</Button>
                        </Grid>
                        <Grid item
                              xs={12}
                              md={6}>
                            <TextField id="input_orderNo"
                                       name="orderNo"
                                       label="orderNo"
                                       variant="filled"
                                       value={inputs.orderNo}
                                       onChange={handleInputChange}
                                       disabled={disabled}
                                       fullWidth/>
                        </Grid>
                        <Grid item
                              xs={12}
                              md={6}>
                            <TextField id="input_date"
                                       name="date"
                                       label="date"
                                       variant="filled"
                                       value={inputs.date}
                                       onChange={handleInputChange}
                                       disabled={disabled}
                                       fullWidth/>
                        </Grid>
                        <Grid item
                              xs={12}
                              md={6}>
                            <TextField id="input_customer"
                                       name="customer"
                                       label="customer"
                                       variant="filled"
                                       value={inputs.customer}
                                       onChange={handleInputChange}
                                       disabled={disabled}
                                       fullWidth/>
                        </Grid>
                        <Grid item
                              xs={12}
                              md={6}>
                            <TextField id="input_trackingNo"
                                       name="trackingNo"
                                       label="trackingNo"
                                       variant="filled"
                                       value={inputs.trackingNo}
                                       onChange={handleInputChange}
                                       disabled={disabled}
                                       fullWidth/>
                        </Grid>
                        <Grid item
                              xs={12}
                              md={6}>
                            <TextField id="input_consignee"
                                       name="consignee"
                                       label="consignee"
                                       variant="filled"
                                       value={inputs.consignee}
                                       onChange={handleInputChange}
                                       disabled={disabled}
                                       fullWidth/>
                        </Grid>
                        <Grid item
                              xs={12}
                              md={6}>
                            <TextField id="input_status"
                                       name="status"
                                       label="status"
                                       variant="filled"
                                       value={inputs.status}
                                       onChange={handleInputChange}
                                       disabled={disabled}
                                       fullWidth/>
                        </Grid>
                        <Grid item>
                            <Button variant="contained"
                                    disabled={disabled || !isUpdated}
                                    onClick={handleSubmit}>Update</Button>
                        </Grid>
                    </Grid>
                </Card>
            </Modal>
        </>
    )
}
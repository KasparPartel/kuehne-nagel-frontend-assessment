import {Shipment} from "@/models/shipment";
import {createSlice} from "@reduxjs/toolkit";

const initialState: { shipments: Shipment[] } = {
    shipments: []
}

export const shipmentsSlice = createSlice({
    name: "shipments", initialState, reducers: {
        removeShipment: (state, action) => {
            state.shipments = state.shipments.filter(
                shipment => shipment.orderNo !== action.payload.orderNo
            );
        },
        addShipments: (state, action) => {
            state.shipments = [...state.shipments, action.payload]
        }
    }
})

export const {removeShipment, addShipments} = shipmentsSlice.actions

export default shipmentsSlice.reducer
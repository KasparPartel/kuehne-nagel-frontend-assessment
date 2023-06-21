import styles from './page.module.css'
import {Shipment} from "@/models/shipment";
import ShipmentsTable from "@/app/ShipmentsTable";
import {useDispatch} from "react-redux";
import {addShipments} from "@/redux/slices/shipmentSlice";

const fetchData = async () => {
    const res = await fetch("http://localhost:3000/api/shipments", {
        method: "GET"
    })
    const data: ResponseObject<Shipment[]> = await res.json()
    return data.data
}

export default async function Home() {
    const data = await fetchData()

    return (
        <main className={styles.main}>
            <ShipmentsTable data={data}/>
        </main>
    );
}

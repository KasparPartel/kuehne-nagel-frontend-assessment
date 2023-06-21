import {NextResponse} from "next/server";
import * as fs from "fs";
import {Shipment} from "@/models/shipment";

export async function GET() {
    const buffer = fs.readFileSync("./public/Shipments.txt")

    const data: Shipment[] = JSON.parse(buffer.toString().trim())

    return NextResponse.json({data})
}
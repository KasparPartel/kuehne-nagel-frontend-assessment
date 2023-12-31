import './globals.css'
import {Inter} from 'next/font/google'
import StoreProvider from "@/app/StoreProvider";

const inter = Inter({subsets: ['latin']})

export const metadata = {
    title: 'Shipments table',
    description: 'Generated by create next app',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <StoreProvider>
            {children}
        </StoreProvider>
        </body>
        </html>
    )
}

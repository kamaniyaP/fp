import React, { useEffect } from "react"
import Navbar from "../components/Navbar"
import Head from 'next/head'
import { useRouter } from "next/router"
import Search from "../components/Search"

function SearchPage() {
    const router = useRouter()
    useEffect(() => {
        let __email = localStorage.getItem('user_mail')
        if (__email == undefined) {
            router.back()
            return
        }
    }, [])
    return (
        <div>
            <Head>
                <title>Home Page</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navbar />
            <Search />
        </div>
    )
}
export default SearchPage
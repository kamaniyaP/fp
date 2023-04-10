import Navbar from "../components/Navbar"
import Main from "../components/Main"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect } from "react"

const HomePage = () => {
    const router = useRouter()
    useEffect(() => {
        let __email = localStorage.getItem('user_mail')
        if (__email != undefined) {
            router.reload
            return
        }
        else {
            router.replace('/')
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

            <Main />
        </div>
    )
}


export default HomePage

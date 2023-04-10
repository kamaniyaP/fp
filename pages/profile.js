import React, { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import Head from 'next/head'
import { postData } from "../lib/request"
import QuestionsList from "../components/QuestionList"
import { useRouter } from "next/router"

function Profile() {
    const router = useRouter()
    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [rating, setRating] = useState(0)
    const [show, setShow] = useState(false)
    const Id = { id: id };
    const [questions, setQuestions] = useState([])
    const query = () => {
        setShow(!show)
        postData('/api/getQuestions', Id).then(data => {
            setQuestions(data.data)
        })
        console.log(questions)
    }
    useEffect(() => {
        let __email = localStorage.getItem('user_mail')
        if (__email != undefined) {
            router.reload
            setId(localStorage.getItem('user_id'))
            setName(localStorage.getItem('user_name'))
            setEmail(__email)
            if (localStorage.getItem('user_rating') !== 'null') {
                setRating(localStorage.getItem('user_rating'))
            }
        } else {
            router.replace('/')
            return
        }

    }, [])
    return (
        <div>
            <Head>
                <title>Profile</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar />

            <div className="flex text-justify justify-center">
                <div className="bg-white rounded-2xl shadow-2xl m-60">
                    <div className="flex flex-col items-center justify-center mt-10 ">
                        <div className="grid grid-cols-2">
                            <div className="justify-self-end ">
                                <div className="font-bold text-xl">User Id :</div>
                                <div className="font-bold text-xl"> Name :</div>
                                <div className="font-bold text-xl">Email Id :</div>
                                <div className="font-bold text-xl">Rating :</div>
                            </div>
                            <div className="justify-self-start">
                                <div className="font-bold text-xl ml-2 mr-4">{id}</div>
                                <div className="font-bold text-xl ml-2 mr-4">{name}</div>
                                <div className="font-bold text-xl ml-2 mr-4">{email}</div>
                                <div className="font-bold text-xl ml-2 mr-4">{rating}</div>
                            </div>
                        </div>
                        <button className="border-2 border-blue-500  text-blue-500 rounded-full px-12 py-2 inline-block font-semibold hover:bg-blue-500 hover:text-white my-2" onClick={query}>Your Questions</button>
                        <QuestionsList questions={questions} isVisible={show} />
                    </div>
                </div>
            </div>
        </div>

    )
}




export default Profile
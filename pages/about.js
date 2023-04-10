import React, { useEffect } from "react"
import Navbar from "../components/Navbar"
import Head from "next/head"
import { useRouter } from "next/router"



function About() {
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
                <title>About</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar />

            <div className="flex font-bold text-2xl py-40 justify-center items-center">
                About QAStream
            </div>
            <div class="max-w-md mx-auto font-bold bg-white rounded-xl shadow-md overflow-hidden md:max-w-4xl -mt-40 py-10">
                <div class="md:flex">
                    <div class="md:shrink-0">
                        <img class="h-48 w-full object-cover md:h-full md:w-72" src="https://media.istockphoto.com/id/1337475990/photo/q-and-a-question-and-answer-shot-form-on-wooden-block.jpg?s=612x612&w=0&k=20&c=LrALcokTfC-1-1SD3WM1rgVYFIFu4TL7u47xlEeh2VQ=" alt="qastream" />
                    </div>
                    <div class="p-8">
                        <p class="mt-2 text-slate-500">
                            QAStream is a question-and-answer platform that allows users to ask and answer questions on a wide range of topics.
                            It is a reliable and secure platform.

                            This provides users with the ability to  view questions that have been previously answered.
                            It also ensures the safety and privacy of users by using secure authentication methods.
                            It enable users to collaborate with each other on topics of mutual interest.
                        </p>
                    </div>
                </div>
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <div class="max-w-md mx-auto font-bold bg-white rounded-xl shadow-md overflow-hidden md:max-w-4xl -mt-40 py-10">
                <div class="md:flex">

                    <div class="p-8">
                        <p class="mt-2 text-slate-500">
                            Once the users login, home page is displayed. To add a question click on the Add a question button and type the question and
                            then post it. Users can get their list of posted questions in the profile section.
                            To view the answers click on Show answers and then the answers are displayed. The profile section also
                            displays user data.
                        </p>
                    </div>
                    <div class="md:shrink-0">
                        <img class="h-48 w-full object-cover md:h-full md:w-72" src="https://tse3.mm.bing.net/th?id=OIP.56dLBMncWASTue_0TCYoJAHaFt&pid=Api&P=0" alt="qastream" />
                    </div>
                </div>
            </div>
        </div>


    )
}


export default About
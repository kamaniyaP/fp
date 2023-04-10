import exp from "constants";
import React, { Fragment, useState } from "react";
import Link from "next/link";
import Search from "./Search";
import Modal from "./Modal";
import { useRouter } from "next/router"

function Navbar() {
    const router = useRouter()
    const logout = async () => {
        try {
            localStorage.clear()
            router.push('/')
        } catch (e) {
            alert(e)
        }
    }
    const [showModal, setShowModal] = useState(false);
    return (
        <Fragment>
            <div>
                <nav className="shadow-sm fixed w-full z-10">
                    <div className="w-full bg-sky-900">
                        <div className="flex items-center h-20 w-full">
                            <div className="flex items items-center mx-60 justify-between w-full">
                                <div className="flex justify-center items-center flex-shrink-0">
                                    <h1 className="font-bold text-xl text-blue-500 cursor-pointer">
                                        QAStream
                                    </h1>
                                </div>
                                <div className="ml-10 flex items-baseline space-x-4">

                                    <a onClick={() => router.push('/homepage')} className="font-semibold text-blue-500 px-7 py-2 text-md hover:font-black ">
                                        Home
                                    </a>
                                    <a onClick={() => router.push('/about')} className="font-semibold text-blue-500 px-9 py-2 text-md hover:font-black ">
                                        About
                                    </a>
                                    <a onClick={() => router.push('/profile')} className="font-semibold text-blue-500 px-5 py-2 text-md hover:font-black ">
                                        Profile
                                    </a>
                                    <a onClick={() => router.push('/searchpage')} className="font-semibold text-blue-500 px-5 py-2 text-md hover:font-black ">
                                        Search
                                    </a>
                                    {/* <Search /> */}
                                    <div className="px-10">
                                        <button className="border-2 border-blue-500  text-blue-500 rounded-full  px-12 py-2 inline-block font-semibold hover:bg-blue-500 hover:text-white"
                                            onClick={() =>
                                                setShowModal(true)}>
                                            Add a question

                                        </button>
                                    </div>
                                    <button onClick={logout} className="border-2 border-blue-500  text-blue-500 rounded-full px-12 py-2 inline-block font-semibold hover:bg-blue-500 hover:text-white">
                                        Logout
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </nav>

            </div>

            <Modal isVisible={showModal} onClose={() => setShowModal(false)} />
        </Fragment>

    )
}

export default Navbar
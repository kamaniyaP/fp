import React, { useEffect, useState } from "react"
import { postData } from "../lib/request"
import QuestionsList from "./QuestionList"
function Main() {
    const [questions, setQuestions] = useState([])
    const [perform, setPerform] = useState(true)
    useEffect(() => {
        if (perform) {
            postData('/api/getQuestions').then(data => {
                setQuestions(data.data)
            })
            setPerform(false)
        }
    }, [])
    return (
        <div>
            <div className="bg-[length:1600px_500px] 
    
                        bg-[url('../images/10.jpg')] bg-no-repeat ">

                <div className=" ml-60 py-40">
                    <br />
                    <br />
                    <br />
                    <br />
                    <br /><p className="font-bold text-2xl -mt-20">ASK.. <br /> ANSWER..<br /> REPEAT..<br /></p>

                </div>
            </div>
            <div className="flex text-justify justify-center">
                <div className="bg-white rounded-2xl shadow-2xl">
                    <div className="flex flex-col items-center justify-center mt-10 ml-60 mr-64">
                        <QuestionsList questions={questions} isVisible={true} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main
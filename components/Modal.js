import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { VscCircleFilled } from 'react-icons/Vsc';
import { postData } from "../lib/request";

const Modal = ({ isVisible, onClose }) => {
    if (!isVisible) return null;
    const initialValues = { textarea: "" };
    const [textValues, setTextValues] = useState(initialValues);
    const [textErrors, setTextErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const handleChange = (event) => {
        const { name, value } = event.target;
        setTextValues({ ...textValues, [name]: value });
        console.log(textValues.textarea);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        setTextErrors(validate(textValues));
        setIsSubmit(true);
    };
    useEffect(() => {
        //console.log(textErrors);
        if (Object.keys(textErrors).length === 0 && isSubmit) {
            console.log(textValues.textarea);
            textValues.id = localStorage.getItem("user_id")
            postData('/api/addQuestion', textValues).then(data => {
                setTextErrors({ ...textErrors, textarea: "Posted!!" })
            })
        }
    }, [textErrors]);
    const validate = (values) => {
        const errors = {};
        if (!values.textarea) {
            errors.textarea = "The text field is empty!";
        }
        return errors;
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm
        flex justify-center items-center">
            <div className="w-[600px] flex flex-col">
                <button className="text-white text-xl place-self-end"
                    onClick={() => onClose()}>X</button>
                <div className="bg-white p-2 rounded">
                    <div className="p-6">
                        <h3 className="text-xl font-semibold text-blue-500 mb-5
                        flex justify-center items-center">
                            Add Question
                        </h3>
                        <div className="bg-blue-200 text-blue-600 p-5">
                            <p className="font-bold">Tips on getting good answers quickly</p>
                            Make sure your question has not been asked already<br />
                            Keep your question short and to the point<br />
                            Double-check grammar and spelling
                        </div>
                        <div className="p-5 "><br />
                            <textarea name="textarea" placeholder="Start typing your question"
                                className=" block w-full" value={textValues.textarea} onChange={handleChange} />
                        </div>
                        <div className="text-red-500">{textErrors.textarea}</div>
                        <div className="flex justify-center items-center">
                            <a onClick={handleSubmit} className="border-2 border-blue-500  text-blue-500 rounded-full px-12 py-2 
                            font-semibold hover:bg-blue-500 hover:text-white">Add question</a>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Modal


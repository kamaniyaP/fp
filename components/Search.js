import React, { useState } from "react";
import { useEffect, useRef } from "react";
import { postData } from "../lib/request";
import { useRouter } from "next/router";
import path from "path";
import QuestionsList from "./QuestionList";


const Search = () => {
    const router = useRouter()
    const [show, setShow] = useState(false)
    const initialValues = { value: "" };
    const [query, setQuery] = useState(initialValues);
    const [results, setResults] = useState([]);
    const clickPoint = useRef();
    const handleFocus = () => {
        clickPoint.current.style.display = "none";
    };

    const handleBlur = () => {
        clickPoint.current.style.display = "block";
    };
    const handleSearch = () => {
        setShow(true)
        postData('/api/search', query).then(data => {
            setResults(data.data)
            console.log(data)
        })
        //router.push({ path: '/searchpage.js', query: { results } })
    }
    const handleChange = (event) => {

        const { name, value } = event.target;
        setQuery({ ...query, [name]: value });
        //console.log(formValues);
    }

    return (
        <div>
            <div className="flex text-justify justify-center">
                <div className="bg-white rounded-2xl shadow-2xl m-20">
                    <div className="flex items-center justify-center mt-10 ml-60 mr-64">
                        <div className="absolute top-3 left-3 items-center" ref={clickPoint}>
                            <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                        </div>
                        <input
                            type="text"
                            name="value"
                            className="block p-2 pl-10 w-70 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:pl-3"
                            placeholder="Search Here..."
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            value={query.value}
                            onChange={handleChange}></input>
                        <button onClick={handleSearch}>Search</button>
                        <QuestionsList questions={results} isVisible={show} />
                    </div>
                </div>
            </div>
        </div>
        // <div className="items-center px-4 flex justify-center" >
        //     <form onSubmit={handleSearch}>
        //         <div className="flex flex-row relative mr-3">
        //             <div className="absolute top-3 left-3 items-center" ref={clickPoint}>
        //                 <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
        //             </div>
        //             <input
        //                 type="text"
        //                 name="value"
        //                 className="block p-2 pl-10 w-70 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:pl-3"
        //                 placeholder="Search Here..."
        //                 onFocus={handleFocus}
        //                 onBlur={handleBlur}
        //                 value={query.value}
        //                 onChange={handleChange}></input>
        //             <button>Search</button>
        //         </div>
        //     </form>
        //     <QuestionsList questions={results} isVisible={true} />
        // </div>
    );
}

export default Search
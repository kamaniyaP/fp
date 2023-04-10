
import Head from 'next/head'
import Image from 'next/image'
import { FaRegEnvelope, FaRegUser, FaUser } from 'react-icons/fa';
import { MdLockOutline } from 'react-icons/md';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { postData } from '../lib/request';
import { useRouter } from "next/router";

const Signup = () => {
  const router = useRouter()
  const initialValues = { userid: "", username: "", email: "", password: "" }
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false)
  const handleChange = (event) => {

    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
    //console.log(formValues);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true)

  }
  useEffect(() => {
    //console.log(formErrors)
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      //console.log(formValues)
      postData('/api/signup', formValues).then(data => {
        console.log(data);
        if (data.status === "success") {
          localStorage.setItem("user_data", JSON.stringify(data.data));
          router.push('/homepage')
        } else {
          alert(data.message)
        }
      })
    }
  }, [formErrors])
  const validate = (values) => {
    const errors = {}
    const reg = /^[A-Za-z0-9_-]*$/;
    if (!values.userid) {
      errors.userid = "User Id is required!"
    } else if (!reg.test(values.userid)) {
      errors.userid = "This is not a valid id format!"
    }

    if (!values.username) {
      errors.username = "Username is required!"
    }
    const regex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;

    if (!values.email) {
      errors.email = "Email is required!"
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid Email format!"
    }
    if (!values.password) {
      errors.password = "Password is required!"
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters!"
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceeed more than 10 characters!"
    }
    return errors;

  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2 bg-gray-100">
      <Head>
        <title>Sign Up</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <div className="bg-white rounded-2xl shadow-2xl flex w-1/3 max-w-4xl">
          <div className="p-5">



            <form onSubmit={handleSubmit}>
              <div className="text-left font-bold text-blue-500">QAStream</div>
              <div className="py-10">
                <h2 className="text-3xl font-bold text-blue-500 mb-2 px-40">Register </h2>
                <div className="border-2 w-20 border-blue-500 inline-block mb-2"></div>

                <div className="flex flex-col items-center py-5">
                  <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                    <FaUser className="text-gray-400 m-2" />
                    <input type="text" name="userid" placeholder="Userid" className="bg-gray-100 outline-none flex-1" value={formValues.userid} onChange={handleChange}></input>
                  </div>
                  <p className='text-red-500'>{formErrors.userid}</p>
                  <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                    <FaRegUser className="text-gray-400 m-2" />

                    <input type="text" name="username" placeholder="Username" className="bg-gray-100 outline-none flex-1" value={formValues.username} onChange={handleChange}></input>
                  </div>
                  <p className='text-red-500'>{formErrors.username}</p>
                  <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                    <FaRegEnvelope className="text-gray-400 m-2" />
                    <input type="email" name="email" placeholder="Email" className="bg-gray-100 outline-none flex-1" value={formValues.email} onChange={handleChange}></input><br /><br />
                  </div>
                  <p className='text-red-500'>{formErrors.email}</p>
                  <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                    <MdLockOutline className="text-gray-400 m-2" />
                    <input type="password" name="password" placeholder="Password" className="bg-gray-100 outline-none flex-1" value={formValues.password} onChange={handleChange}></input>
                  </div>
                  <p className='text-red-500'>{formErrors.password}</p>

                  <button className="border-2 border-blue-500  text-blue-500 rounded-full px-12 py-2 inline-block font-semibold hover:bg-blue-500 hover:text-white">Sign up</button>

                </div>
              </div>
            </form>
          </div>

        </div>
      </main>


    </div>
  )
}

export default Signup
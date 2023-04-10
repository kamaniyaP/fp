import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { FaRegEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import Link from "next/link";
import { useState, useEffect } from "react";
import { postData } from '../lib/request';
import { useRouter } from "next/router";


const Home: NextPage = () => {
  const router = useRouter()
  useEffect(() => {
    let __email = localStorage.getItem('user_mail')
    if (__email != undefined) {
      router.push('/homepage')
      return
    }
  }, [])
  const initialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
    console.log(formValues);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };
  useEffect(() => {
    console.log(formErrors);
    //console.log(Date.now().toString())
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
      postData('/api/login', formValues).then(data => {
        console.log(data);
        if (data.status === "success") {
          localStorage.setItem("user_id", data.data.user_id);
          localStorage.setItem("user_name", data.data.user_name);
          localStorage.setItem("user_mail", data.data.user_mail);
          localStorage.setItem("user_rating", data.data.user_rating);
          router.push('/homepage')
        }
        else if (data.status === "error") {
          alert("Incorrect Email or Password")
        }
        else {
          alert("User doesn't exist")
        }
      })
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    const regex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid Email format!";
    }
    if (!values.password) {
      errors.password = "Password is required!";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters!";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceeed more than 10 characters!";
    }
    return errors;
  };

  return (


    <div className="flex min-h-screen flex-col items-center justify-center py-2 bg-gray-100
    bg-[url('../images/8.jpg')] bg-no-repeat bg-cover">
      <Head>
        <title>QAStream</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <div className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
          <div className="w-3/5 p-5">
            <form onSubmit={handleSubmit}>
              <div className="text-left font-bold text-blue-500">QAStream</div>
              <div className="py-10">
                <h2 className="text-3xl font-bold text-blue-500 mb-2">
                  Sign in to Account
                </h2>
                <div className="border-2 w-20 border-blue-500 inline-block mb-2"></div>
                <p>If you have an existing account , Sign in here</p>
                <div className="flex flex-col items-center py-5">
                  <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                    <FaRegEnvelope className="text-gray-400 m-2" />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="bg-gray-100 outline-none flex-1"
                      value={formValues.email}
                      onChange={handleChange}
                    ></input>
                    <br />
                    <br />
                  </div>
                  <p className="text-red-500">{formErrors.email}</p>
                  <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                    <MdLockOutline className="text-gray-400 m-2" />
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      className="bg-gray-100 outline-none flex-1"
                      value={formValues.password}
                      onChange={handleChange}
                    ></input>
                    <br />
                    <br />
                  </div>
                  <p className="text-red-500">{formErrors.password}</p>

                  <button className="border-2 border-blue-500  text-blue-500 rounded-full px-12 py-2 inline-block font-semibold hover:bg-blue-500 hover:text-white">
                    Sign In
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="w-2/5 bg-blue-500 text-white rounded-tr-2xl rounded-br-2xl py-36 px-12">
            <h2 className="text-3xl font-bold mb-2">Hello!</h2>
            <div className="border-2 w-10 border-white inline-block mb-2"></div>
            <p className="mb-10">
              Fill up personal information and start journey with us!
            </p>
            <a
              href="signup"
              className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-blue-500">
              Sign Up
            </a>
          </div>
        </div>
      </main>
    </div>




  );


};

export default Home;


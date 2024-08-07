import { useState } from "react"
import React from "react"
import { makePostRequest } from "../../utils/network"
import { setCredentials } from '../../utils/credentials'
import { endPoints } from '../../utils/endPoints'
import FormInputs from "../common/FormInput"
import Link from "next/link"
import { useCommonContext } from "../../Contexts/CommonContexts"
import { useSearchParams } from "next/navigation"



export default function LoginForm() {
    const {submissionError}=useCommonContext()
    const params=useSearchParams()
    const [submissionStatus, setSubmissionStatus] = useState({
        isLoading: false,
        isLoginSuccess: false,
        server_response:''
    })
    let reason=params.get('redirect_reason')
    

    const [loginData, setLoginData] = useState({
        contact_number: '',
        password: ''
    })


    const { contact_number, password } = loginData


    const inputItems = [
        {
            label: 'Phone:',
            inputName: 'contact_number',
            inputType: 'tel',
            placeholderValue: 'Enter your phone',
            storeName: contact_number
        },
        {
            label: 'Password:',
            inputName: 'password',
            inputType: 'password',
            placeholderValue: 'Enter your password',
            storeName: password
        }
    ]


    function onLoginDataChange(e) {
        setLoginData({ ...loginData, [e.target.name]: e.target.value })

    }

    function isFormValid() {
        return Object.keys(loginData).every(key => loginData[key].trim().length >= 8)
    }


    async function loginUser(e) {
        e.preventDefault()
        let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${endPoints.LOGIN}`
        if (isFormValid()) {
            const body = {
                contact: `${contact_number.slice(0, 3) == '+88' ? contact_number : '+88' + String(contact_number)}`,
                password: password
            }
            try{
                setSubmissionStatus({ ...submissionStatus, isLoading: true })
                const request = await makePostRequest(url, body)
                if (request.status == 201 || request.status==200) {
                    setLoginData({
                        contact_number: '',
                        password: ''
                    })
                    setCredentials(request.server_response?.token)
                    setSubmissionStatus({ isLoading: false, isLoginSuccess: true,server_response:request.server_response?.msg })
                    setTimeout(() => {
                        return window.location.href = '/'
                    }, 1200)
                }
                else{
                    setSubmissionStatus({ isLoading: false, isLoginSuccess: false,server_response:request.server_response })
                }
            }
            catch(error){
             setSubmissionStatus({ ...submissionStatus, isLoading: false,server_response:error.message })  
            }
          
        }
    }



    return (
        <div className="mx-auto block w-[90%] lg:w-1/2  bg-gray-700  select-none shadow-md border border-gray-600 rounded-md text-slate-100 py-8 md:py-12">
            <form onSubmit={ loginUser }>
                <h1 className="w-full block text-center semibold text-2xl lg:text-3xl">User Login</h1>
                <p className='text-green-600 text-center text-xl my-4'>{submissionStatus.server_response}</p>
                
                { submissionStatus.isLoginSuccess && <p className='text-green-600 text-center text-xl my-4'>Redirecting...</p> }
                {(reason !=null && !submissionStatus.isLoginSuccess) &&  <p className='text-red-600 text-center text-xl my-4'>{reason}</p>}
                <div className="w-[90%] lg:w-4/5 mx-auto">
                    <FormInputs formInputs={ inputItems } onChangeHandler={ onLoginDataChange } />
                </div>

                <button type='submit' disabled={ !isFormValid() || submissionStatus.isLoading } className={ `mx-auto block px-2 text-xl py-1 ${isFormValid() ? 'bg-green-600' : 'bg-green-200 text-slate-400'} my-3 rounded-sm` }>{ submissionStatus.isLoading ? 'Loging in..' : 'Login' }</button>
            </form>
            <div className="mt-5">
                <h4 className="text-center text-sm">Don't have an account ?</h4>
                <Link href={ '/register' } className="text-center block mx-auto text-green-500">Register Now</Link>
            </div>
        </div>


    )
}
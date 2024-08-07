'use client'

import React, { useEffect, useState } from 'react'
import { blood_choices } from '../home-component/Search'
import { useCommonContext } from '../../Contexts/CommonContexts'
import { makePostRequest } from '../.././utils/network'
import FormInputs from '../common/FormInput'
import TermsNConditions from '../common/TermsNConditions'
import { endPoints } from '../../utils/endPoints'
import { useSearchContext } from '../../Contexts/SearchListContext'
import { usePathname, useRouter } from 'next/navigation'


export default function RegistrationForm() {
    const { allDistrict,setSelectedDist} = useCommonContext()
    const {allUpazila}=useSearchContext()
    const [isTermsAccepted,setIsTermsAccepted]=useState(false)
    const pathName=usePathname()
    const {replace}=useRouter()

    const [regiStatus, setRegiStatus] = useState({
        isRegistrationSuccess: false,
        isLoading: false,
        serverMsg:''
    })

    const date = new Date()
    let month = date.getMonth()
    let currentDate = date.getDate()
    let today = date.getFullYear() + '-' + `${month >= 10 ? month : '0' + month}` + '-' + `${currentDate >= 10 ? currentDate : '0' + currentDate}`


    const [registrationData, setRegistrationData] = useState({
        name: '',
        contact_number: '+88',
        email: '',
        district: 'Dhaka',
        upazila: allUpazila?.[0],
        blood_id: blood_choices[0].id,
        last_donate: today,
        password: '',
        confirm_password: ''
    })


    const { name, contact_number, email, district, upazila, blood_id, last_donate, password, confirm_password } = registrationData

    const formInputs = [
        {
            label: 'Name',
            inputType: 'text',
            inputName: 'name',
            placeholderValue: 'Enter your name',
            storeName: name,
        },
        {
            label: 'Phone Number',
            inputType: 'tel',
            inputName: 'contact_number',
            placeholderValue: 'Enter your phone',
            storeName: contact_number,
        },
        {
            label: 'Email',
            inputType: 'email',
            inputName: 'email',
            placeholderValue: 'Enter your email',
            storeName: email,
        },
        {
            label: 'District',
            inputType: 'select',
            inputName: 'district',
            data: allDistrict,
            storeName: district,
        },
        {
            label: 'Thana/Upazila',
            inputType: 'select',
            inputName: 'upazila',
            data: allUpazila,
            storeName: upazila,
        },
        {
            label: 'Blood Group',
            inputType: 'select',
            inputName: 'blood_id',
            data: blood_choices,
            storeName: blood_id,
        },
        {
            label: 'Last Donate',
            inputType: 'date',
            inputName: 'last_donate',
            storeName: last_donate,
        },
        {
            label: 'Password',
            inputType: 'password',
            inputName: 'password',
            placeholderValue: 'Type password',
            storeName: password,
        },
        {
            label: 'Confirm Password',
            inputType: 'password',
            inputName: 'confirm_password',
            placeholderValue: 'Re-type password',
            storeName: confirm_password,
        }
    ]


    function onRegistrationDataChange(e) {
        if (e.target.name == 'contact_number' && e.target.value.length < 3) {
            alert('Phone number must include +88')
        }
        else {
            setRegistrationData({ ...registrationData, [e.target.name]: e.target.value })
        }

    }


    function isFormValid() {
        if (password == confirm_password && password.length >=8 && contact_number?.length >= 11) {
            return Object.keys(registrationData).every(key => registrationData[key] != '') && isTermsAccepted
        }
        else {
            return false
        }
    }

    async function saveData(e) {
        e.preventDefault()
        let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${endPoints.REGISTER_USER}`
        if (isFormValid()) {
            try{
                setRegiStatus({ ...regiStatus, isLoading: true })
                const request = await makePostRequest(url, registrationData)
                if (request.status == 201) {
                    setRegistrationData({
                        name: '',
                        contact_number: '',
                        email: '',
                        district: 'Dhaka',
                        upazila: '',
                        blood_id: '',
                        last_donate: today,
                        password: '',
                        confirm_password: ''
                    })
    
    
                    setRegiStatus({ isLoading: false, isRegistrationSuccess: true, serverMsg: request.server_response?.msg })
    
                    setTimeout(() => {
                        return window.location.href = '/login'
                    }, 1200)
    
                }
                else {
                    setRegiStatus({ ...regiStatus, isLoading: false, serverMsg: request?.server_response })
    
                }
            }
            catch(error){
                setRegiStatus({ ...regiStatus, isLoading: false, serverMsg: 'Connnection Problem. Check Your Internet Connection.' })
            }
           
        }
        else {
            setUserMsg('Password and Confirm Password is not same.')
        }
    }


    useEffect(() => {
        if(district !=''){
            replace(`${pathName}?selectedDistrict=${district}`)
        }
        else{
            replace(pathName)
        }
        
    }, [district])

 


    return (
       
            <form className="block w-[90%] lg:w-1/2 mx-auto text-slate-100  bg-gray-700  p-4 lg:p-12 rounded-md shadow-md border border-gray-600 select-none" onSubmit={ saveData }>
                <h1 className="w-full block text-center my-5 text-2xl">Blood Donar Registration</h1>
                <p className='text-green-600 text-center text-xl my-4'>{regiStatus.serverMsg}</p>
                { regiStatus.isRegistrationSuccess && <p className='text-green-600 text-center text-xl my-4'>Redirecting...</p> }
                <FormInputs formInputs={ formInputs } onChangeHandler={ onRegistrationDataChange } />
                <TermsNConditions termValidateReciever={setIsTermsAccepted}/>
                <button type='submit' disabled={ !isFormValid() || regiStatus.isLoading } className={ `mx-auto block my-2 px-2 text-xl py-1 ${isFormValid() ? 'bg-red-700' : 'bg-red-300'} my-3 rounded-sm` }>{ regiStatus.isLoading ? 'Saving records...' : 'Register' }</button>
            </form>
      
    )
}
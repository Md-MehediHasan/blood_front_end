'use client'

import { useEffect, useState } from "react"
import { useCommonContext } from "../../Contexts/CommonContexts"
import FormInputs from "../common/FormInput"
import { makePostRequest } from "../../utils/network"
import { endPoints } from "../../utils/endPoints"
import { usePathname, useRouter } from "next/navigation"
import { useSearchContext } from "../../Contexts/SearchListContext"

export default function UpdateMyProfile({authenticatedUser}){

    const {allDistrict, setSelectedDist} = useCommonContext()
    const {allUpazila}=useSearchContext()
    const [submissionStatus, setSubmissionStatus] = useState({
        isLoading: false,
        server_response:''
    })
    const pathName=usePathname()
    const {replace}=useRouter()

    const [userUpdateData, setUserUpdateData] = useState({
        contact: authenticatedUser.contact,
        name: authenticatedUser.name,
        email: authenticatedUser.email,
        district: authenticatedUser.donar_info.district,
        upazila: authenticatedUser.donar_info.upazila,
        last_donate: authenticatedUser.donar_info.last_donate,
        old_password: '',
        new_password: ''
    })


    const {name,contact,email,district,upazila,last_donate,old_password,new_password}=userUpdateData

   function onUserUpdateDataChange(e){
    setUserUpdateData({...userUpdateData,[e.target.name]:e.target.value})
   }


    const formInputs=[
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
            inputName: 'contact',
            placeholderValue: 'Enter your phone',
            storeName: contact,
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
            label: 'Upazila',
            inputType: 'select',
            inputName: 'upazila',
            data: allUpazila,
            storeName: upazila,
        },
        {
            label: 'Last Donate',
            inputType: 'date',
            inputName: 'last_donate',
            storeName: last_donate,
        },
        {
            label: 'Old Password',
            inputType: 'password',
            inputName: 'old_password',
            placeholderValue: 'Type password',
            storeName: old_password,
        },
        {
            label: 'New Password',
            inputType: 'password',
            inputName: 'new_password',
            placeholderValue: 'Re-type password',
            storeName: new_password,
        }
    ]

    function isFormValid(){
       return Object.keys(userUpdateData).every(key=>userUpdateData[key] !='')
    }

    async function updateData(e){
      e.preventDefault()
      let url=`${process.env.NEXT_PUBLIC_BACKEND_URL}/${endPoints.UPDATE_USER}`
      setSubmissionStatus({...submissionStatus,isLoading:true})
      const request =await makePostRequest(url,userUpdateData)
      if(request.status==200){
       setUserUpdateData({
        contact:'',
        name:'',
        email:'',
        district:allDistrict[0].district,
        upazila:allUpazila[0],
        last_donate:'',
        old_password:'',
        new_password:''
       })
       setSubmissionStatus({isLoading:false,server_response:request.server_response?.msg})
      }
      else if(request.status !=200){
        setSubmissionStatus({isLoading:false,server_response:request.server_response})
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


    return(
        <div className="w-full px-auto ">
            <form className="mx-auto block w-4/5 lg:w-2/3 my-2  select-none bg-gray-700 text-gray-200 p-5 border border-stone-500 rounded-md " onSubmit={updateData}>
                <h1 className="w-full block text-center my-5 text-2xl">Profile Update</h1>
                <p className='text-green-600 text-center text-xl my-4'>{submissionStatus.server_response }</p>
                 <FormInputs formInputs={formInputs} onChangeHandler={onUserUpdateDataChange}/>
                <button type='submit' disabled={ !isFormValid() ||submissionStatus.isLoading } className={ `mx-auto block px-2 text-xl py-1 ${isFormValid() ? 'bg-green-700' : 'bg-green-200 text-gray-600'} my-3 rounded-sm` }>{ submissionStatus.isLoading ? 'Updating Records' : 'Update' }</button>
            </form>
        </div>
    )
}
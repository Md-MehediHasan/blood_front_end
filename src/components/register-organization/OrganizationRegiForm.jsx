'use client'
import { useContext, useState } from "react"
import FormInputs from "../common/FormInput"
import TermsNConditions from '../../components/common/TermsNConditions'
import { makePostRequest } from "../../utils/network"
import { endPoints } from "../../utils/endPoints"
import { useCommonContext } from "../../Contexts/CommonContexts"



const formInitState={
    organization_name:'',
    district:'',
    establishing_year:'',
    logo:null
}

export default function OrganizationRegiForm(){
    const [isTermAccepted,setIsTermAccepted]=useState(false)
    const {allDistrict}=useCommonContext()
    const [submissionStatus,setSubmissionStatus]=useState({
        isLoading:false,
        userMsg:''
    })
    const [organizationData,setOrganizationData]=useState(formInitState)
    const {organization_name,district,establishing_year,logo}=organizationData
    const formInputs=[
        {
            label: 'Organization Name',
            inputType: 'text',
            inputName: 'organization_name',
            placeholderValue: 'Organization name',
            storeName:organization_name,
        },
      
        {
            label: 'Working Area',
            inputType: 'select',
            inputName: 'district',
            data: allDistrict,
            storeName: district,
        },
       
        {
            label: 'Establishing Year',
            inputType: 'date',
            inputName: 'establishing_year',
            storeName: establishing_year,
        },
    ]

    function onOrganizationDataChange(e){
          setOrganizationData({
            ...organizationData,[e.target.name]:e.target.value
          })
    }

    function isFormValid(){
        return Object.keys(organizationData).every(key=>organizationData[key] !=''||null) && isTermAccepted
    }

    function handleFileUpload(e){
        setOrganizationData({...organizationData,logo:e.target.files[0]})
    }

    async function saveOrganizationData(e) {
        e.preventDefault()
        const formData = new FormData()
        for (let key in organizationData) {
            formData.append(key, organizationData[key])
        }
        let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${endPoints.REGISTER_ORG}`
        setSubmissionStatus({
            ...submissionStatus, isLoading: true
        })
        let request = await makePostRequest(url, formData, true)
        if (request.status == 201) {
            setOrganizationData(formInitState)
            setSubmissionStatus({
                isLoading: false,
                userMsg: request.server_response?.msg
            })
        }
        else if (request.status != 201){
            setSubmissionStatus({
                isLoading: false,
                userMsg: request.server_response
            })
        }
    }
   
    return(
        <form className="w-[90% ] lg:w-1/2 my-8 block mx-auto bg-gray-700  select-none p-4 md:p-8 shadow-lg border border-gray-600 rounded-lg" onSubmit={saveOrganizationData}>
            <h1 className="text-center text-3xl my-5 text-slate-100">Organization Registration</h1>
             <p className="my-5 text-center text-xl text-green-400">
                {submissionStatus.userMsg}
             </p>
            <div className=" mx-auto text-slate-100">
             <FormInputs formInputs={formInputs} onChangeHandler={onOrganizationDataChange}/>
             <div className="flex  items-center w-full  text-md lg:text-xl px-2 py-2  my-2 space-x-1 lg:space-x-2 rounded-md shadow-lg border border-gray-600">
                <label htmlFor="logo" className="w-2/5 md:w-1/3 cursor-pointer">Logo</label>
                <input  type="file" onChange={handleFileUpload} accept=".jpg,.png,.jpeg,.bmp" name="" id="logo" className="px-2 w-3/5 md:w-2/3 py-2  rounded-md outline-none  bg-gray-800"/>
                    
             </div>
             <TermsNConditions termValidateReciever={setIsTermAccepted}/>
            </div>
            <button disabled={!isFormValid()||submissionStatus.isLoading} className={`mx-auto block my-5 px-4 py-2 rounded-sm ${isFormValid()? 'bg-green-600 hover:bg-green-700':'bg-green-200 text-stone-600'} transition-all duration-500 ease-in-ease-out `}>{submissionStatus.isLoading ?'Saving...':'Register'}</button>
        </form>
    )
}
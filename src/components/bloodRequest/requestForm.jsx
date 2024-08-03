'use client'
import { useEffect, useState } from "react"
import { blood_choices } from "../home-component/Search"
import FormInputs from "../common/FormInput"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { makePostRequest } from "../../utils/network"
import { endPoints } from "../../utils/endPoints"

export  function RequestBlood({allDistrict,allOrganizations}){
     
    const initialFormData={
        district:allDistrict[0].district,
        hospital_location:'',
        organization_name:allOrganizations?.[0]?.organization_name,
        blood_id:blood_choices[0].id,
        detailmsg:''
    }
    const [requestData,setRequestData]=useState(initialFormData)
    const {district,hospital_location,blood_id,organization_name,detailmsg}=requestData
    const formInputs=[
        {
            label: 'Area',
            inputType: 'select',
            inputName: 'district',
            data: allDistrict,
            storeName:district,
        },
        {
            label: 'Hospital Location',
            inputType: 'text',
            inputName: 'hospital_location',
            placeholderValue:'Type exact location',
            storeName: hospital_location,
        },
        {
            label: 'Blood Group',
            inputType: 'select',
            inputName: 'blood_id',
            data: blood_choices,
            storeName: blood_id
        },
       
        {
            label: 'Select Organization',
            inputType: 'select',
            inputName: 'organization_name',
            data:allOrganizations,
            storeName: organization_name,
        },
        {
            label: 'Write your message',
            inputType: 'textarea',
            inputName: 'detailmsg',
            placeholderValue:'write about patient condition',
            storeName: detailmsg,
        },
    ]

    const [submissionStatus,setSubmissionStatus]=useState({
        isLoading:false,userMsg:''
    })

    let searchParams=useSearchParams()
    let pathName=usePathname()
    const {replace}=useRouter()

    function onRequestDataChange(e){
        setRequestData({...requestData,[e.target.name]:e.target.value})
    }


    function setQueryArea(districtArea){
        const params= new URLSearchParams(searchParams)
          if(districtArea !='' || districtArea !=undefined){
            params.set('area',districtArea)
            return replace(`${pathName}?${params.toString()}`)
          }
          else{
            return pathName
          }
    }


    function isFormValid(){
        return Object.keys(requestData).every(key=>requestData[key] !='')
    }



    async function requestedDataSubmit(e){
        e.preventDefault()
        let url=`${process.env.NEXT_PUBLIC_BACKEND_URL}/${endPoints.CREATE_MESSAGE}`
        setSubmissionStatus({...submissionStatus,isLoading:true})
        let request =await makePostRequest(url,requestData)
        if(request.status ==201){
            setSubmissionStatus({
                isLoading:false,
                userMsg:request.server_response?.msg
            })
            setRequestData(initialFormData)
        }
        else if(request.status !=201){
            setSubmissionStatus({
                isLoading:false,
                userMsg:request.server_response
            })
        }

    }

    useEffect(()=>{
       if(district !=''){
        setQueryArea(district)
       }
             
    },[district])

     useEffect(()=>{
        setRequestData({...requestData,organization_name:allOrganizations?.[0]?.organization_name})
     },[allOrganizations])

    

    return(
        <div className="w-[95%] lg:w-[50%] p-5 my-5 lg:my-16 mx-auto bg-gray-700 shadow-lg border border-gray-600 rounded-lg">
                <h1 className="text-center text-green-500  text-2xl my-8">Send A Blood Request</h1>
                <p className="text-center text-green-400">{submissionStatus.userMsg}</p>
                <form onSubmit={requestedDataSubmit}>
                  <FormInputs formInputs={formInputs} onChangeHandler={onRequestDataChange} />
                  <button disabled={!isFormValid()||submissionStatus.isLoading} className={`px-5 py-2 text-center block mx-auto ${isFormValid()?'bg-green-600':'bg-green-300'} `}>{submissionStatus.isLoading?'Sending Message':'Send Message'}</button>
                </form>
              
        </div>
    )
}
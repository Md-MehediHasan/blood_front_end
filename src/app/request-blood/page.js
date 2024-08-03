import { Fragment } from "react"
import Menubar from "../../components/dashboard/Menubar"
import { getAllDistricts } from "../../backendRequests/getRequests"
import getAllOrganizations from "../../backendRequests/getRequests"
import {RequestBlood} from '../../components/bloodRequest/requestForm'




export default async function BloodRequest({searchParams}){
    const districts= await getAllDistricts()
    let allOrganizations;
    let area = searchParams['area']
    if(area !=''|| area !== undefined){
       allOrganizations = await getAllOrganizations(area)
    }
    return(
     
        <div className='block min-h-screen text-slate-200 '>
           <RequestBlood allDistrict={districts} allOrganizations={allOrganizations}/>
        </div>
  
    )
}
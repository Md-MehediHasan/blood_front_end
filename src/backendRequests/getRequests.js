
import {GetRequest} from '../utils/network'
import { endPoints } from '../utils/endPoints'

export  async function getDonarList(blood_id,district,upazila,donar_type) {
    let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${endPoints.FIND_DONAR}/?blood_id=${blood_id}&donar_type=${donar_type}${district !=undefined?`&district=${district}` : ''}${upazila != undefined?`&upazila=${upazila}` : ''}`
    try{
        let res = await GetRequest(url)
        const data = await res.json()
        return data
    }
    catch(err){
        throw new Error(err)
    }  
}

export async function getAuthenticatedUser(){
    let url=`${process.env.NEXT_PUBLIC_BACKEND_URL}/${endPoints.GET_AUTHENTICATED_USER}`
    try{
        const res =await GetRequest(url)
        const data = await res.json()
        return data
    }
    catch(error){
        throw new Error(error)
    }
 
}


export async function getMyOrganizations(){
    let url=`${process.env.NEXT_PUBLIC_BACKEND_URL}/${endPoints.MY_ORGANIZATIONS}`
    try{
        const res =await GetRequest(url)
       const data = await res.json()
    return data
    }
    catch(error){
        throw new Error(error)
    }   
}

export default async function getAllOrganizations(area){
    if(area !=undefined){
        let url=`${process.env.NEXT_PUBLIC_BACKEND_URL}/${endPoints.ALL_ORGANIZATIONS}?area=${area}`
    try{
        const res =await GetRequest(url)
    const data = await res.json()
    return data
    }
    catch(error){
        throw new Error(error)
    }  
    } 
}

export async function getAllDistricts() {
    let url = `https://bdapis.com/api/v1.2/districts`
    const res = await GetRequest(url)
    const data = await res.json()
    return data?.data
}

export async function getAllUpazilas(district){
    let url=`https://bdapis.com/api/v1.2/district/${district}`
    try{
        const res= await GetRequest(url)
            const data = await res.json()
            return data.data.upazillas
       
    }
    catch(error){
        throw new Error(error)
    }
   
}

export async function getConversations(){
    let url=`${process.env.NEXT_PUBLIC_BACKEND_URL}/${endPoints.GET_CONVERSATION}`
    try {
        const res= await GetRequest(url)
        if(res.status==200){
            const data = await res.json()
            return data
        }
        else{
            return res
        }
    }
    catch(e){
        throw new Error('Something error happened in server')
    }
}
export async function getMessagesByConversationId(chat_id){
    let url=`${process.env.NEXT_PUBLIC_BACKEND_URL}/${endPoints.GET_MESSAGES}?chat_id=${chat_id}`
    try {
        const res= await GetRequest(url)
        if(res.status==200){
            const data = await res.json()
            return data
        }
        else{
            return res
        }
    }
    catch(e){
        throw new Error('Something error happened in server')
    }
}
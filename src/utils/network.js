
import { getCredentials } from "./credentials"

export async function GetRequest(url) {
    let headers;
    let token = await getCredentials('token') || null
    if (token !== null) {
        headers = {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }
    }
    else {
        headers = {
            'Content-Type': 'application/json',
        }
    }

    const request = await fetch(url, {
        headers: headers
    }, { caches: 'no-cache' })
    return request
}

export async function makePostRequest(url, data, isFileUpload) {
    let headers;
    let token = await getCredentials('token')
    if (token) {
        headers = {
            'Authorization': `Token ${token}`
        }
        if(!isFileUpload){
            headers['Content-type']='application/json'
        }
    }
    else {
        headers = {
            'Content-type': 'application/json',
        }
    }
    let request = await fetch(url, {
        method: 'POST',
        body: isFileUpload? data:JSON.stringify(data),
        headers: headers
    })

    let server_response = await request?.json()
    return (
        {
            status: request.status,
            server_response: server_response
        }
    )
}

export default async function getExternalAPIRequest(url){
    const request = await fetch(url, {
    }, { caches:'no-cache'})
    return request
}
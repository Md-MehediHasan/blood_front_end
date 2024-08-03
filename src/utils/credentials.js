'use server'
import {cookies} from 'next/headers'
   export async function setCredentials(token){
     cookies().set({
      name:'token',
      value:token,
      httpOnly:true,
      path:'/'
     })
   }

   export async function getCredentials(name){
      let cookieName = cookies().get(name)
      return cookieName?.value
   }
   export async function removeCredentitals (){
    return cookies().delete('token')
   }



import { Inter } from "next/font/google";
import "./globals.css";
import SearchContextProvider from '../Contexts/SearchListContext'
import CommonContextProvider from '../Contexts/CommonContexts'
import MainLayout from "../components/common/MainLayout";
import {cookies} from 'next/headers'
import { getAllDistricts } from "../backendRequests/getRequests";
import { getAuthenticatedUser } from "../backendRequests/getRequests";
import localFont from 'next/font/local'



const myFont = localFont({
  src: [
    {
      path: './myfonts/PotroSansBangla-Regular.ttf',
      weight: '200'
    },
   
  ],
  variable: '--font-custom'
})

export const metadata = {
  title: "EBB",
  description: "জরুরী সময়ে আপনার এলাকায় রক্ত অনুসন্ধানে সহায়তা করুন । আমাদের এপ্লিকেশন আপনাকে সহজেই একটি রক্তদাতা খুঁজে পাওয়ার সুযোগ দেয়, যাতে আপনি এবং আপনার পরিবার জন্য সঠিক সময়ে রক্ত পাওয়ার সিদ্ধান্ত নিতে পারেন।",
  keywords:'blood,required,emergency,quotarefrombd,badhon blood,A+ blood,A- blood,B+ blood , B- Blood,AB+ blood,AB- blood,O+ blood,O- blood'
};

export default async function RootLayout({ 
  children
}) {
  let authenticatedUser
   const allDistricts= await getAllDistricts()
   const cookieStore=cookies()
   let token=cookieStore?.get('token')
   if(token){
    authenticatedUser= await getAuthenticatedUser()
   }
  
  

  return (
    <html lang="en">
      <body className={myFont.className}>
        <CommonContextProvider token={token} districts={allDistricts} authenticatedUser={authenticatedUser}>  
            <MainLayout>
             {children}
            </MainLayout>
        </CommonContextProvider>
        </body>
    </html>
  );
}

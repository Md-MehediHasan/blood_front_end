'use client'
import { useCommonContext } from "../../Contexts/CommonContexts"
import { useSearchContext } from "../../Contexts/SearchListContext"
import React, { useEffect } from "react"
import { redirect, usePathname, useRouter } from "next/navigation"




export default function SearchResultList({donarList}) {
    const {allDistrict,setSelectedDist,authenticatedUser}=useCommonContext()
    const { isSearched,  district, upazila, onChangQueryData,allUpazila} = useSearchContext()
    const {replace}=useRouter()
    let pathName=usePathname()
   

    function callDonar(donar) {
        if (donar.is_capable && authenticatedUser?.name) {
            return window.open(`tel:${donar.phone_number}`)
        }
        else if(!donar.is_capable && authenticatedUser?.name) {
            return alert('Sorry this donar is not capable. Please try another donar.')
        }
        else{
            window.location.href=`/login?redirect_reason=${'You must login before call to any donar'}`
        }
    }
   



    return (
        <div className="w-full block  select-none mt-2">
            {
                isSearched && <div className="">
                    <div className="grid  p-3 bg-gray-800 border-b border-gray-600 w-full md:w-3/4 mx-auto text-sm md:text-xl grid-cols-3 justify-self-center text-center lg:grid-cols-3 items-center gap-3 mt-2 border border-gray-600 rounded-t-md shadow-md ">
                        <li className="text-semibold text-slate-100 list-none bold col-span-1 lg:col-span-1 ">আরো ফিল্টার করুনঃ</li>
                        <li className="flex text-center text-slate-100 col-span-2 lg:col-span-1">
                            <span className="block  bg-gray-800 px-2">District:</span>
                            <select className="outline-none  bg-gray-800 rounded-sm ring-1 ring-gray-600 " name="district" value={ district } onChange={ (e) => onChangQueryData(e) }>
                                <option disabled className="text-stone-500">Select District</option>
                                { allDistrict.map((distr,index) => (
                                    <option key={ index } className="" value={ distr.district }>{ distr.district }</option>
                                )) }
                            </select>
                        </li>
                        <li className="flex text-center text-slate-100 ">
                            <span className="block bg-gray-800 px-2">Upazila</span>
                            <select className="outline-none bg-gray-800 ring-1 ring-gray-600 rounded-sm" name="upazila" value={ upazila } onChange={ (e) => onChangQueryData(e) }>
                                <option disabled >Select Upazila</option>
                                { allUpazila?.map((upazila,index) => (
                                    <option key={index} value={ upazila }>{ upazila }</option>
                                )) }
                            </select>
                        </li>
                    </div>
                    {
                        donarList?.length > 0 ? <ul className="pb-2 lg:pb-5 bg-gray-800  rounded-sm h-auto w-full mx-auto lg:w-3/4">
                            <h2 className="text-center py-2 text-2xl border-b text-slate-100 border-gray-600">অনুসন্ধানের ফলাফল</h2>
                            { donarList.map(donar => (
                                <li key={donar.phone_number} className="shadow-md my-2 w-[95%] lg:w-2/3 mx-auto text-slate-100 rounded-sm border  border-gray-600">
                                    <span className="flex items-center space-x-3 bg-gray-700 justify-around p-2">
                                        <span className="block text-md lg:text-2xl">{ donar.name }</span>
                                        <span className={ `${donar.is_capable ? 'bg-green-600' : 'bg-red-600'} p-1 text-white rounded-sm text-sm` }>{ donar.is_capable ? 'Capable' : 'Not Capable' }</span>
                                        <span className="block text-xl lg:text-xl"><button className="px-5 py-1 rounded-md bg-green-500 text-white" onClick={ () => callDonar(donar) }>Call</button></span>
                                    </span>
                                    <span className="block lg:flex items-center justify-around lg:space p-2 rounded-sm">
                                        <span className="block text-md lg:text-xl">Blood Group:{ donar.group }</span>
                                        <span className="block lg:hidden text-md lg:text-xl">Last Donate:{ donar.last_donate }</span>
                                        <span className="block text-sm lg:text-xl">Location:{ donar.upazila },{ donar.district }</span>

                                    </span>
                                </li>
                            )) }
                        </ul> : <h2 className="text-center my-12">দুঃখিত, আপনার অনুসন্ধানের সাথে কোন তথ্যের মিল পাওয়া যায়নি</h2>
                    }

                </div>
            }
        </div>
    )
}
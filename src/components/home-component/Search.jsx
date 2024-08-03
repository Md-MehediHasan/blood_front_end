'use client'

import { useEffect, useState } from "react"
import { useSearchContext } from '../../Contexts/SearchListContext'
import { GetRequest } from "../../utils/network"
import { endPoints } from '../../utils/endPoints'
import { usePathname, useSearchParams,useRouter  } from "next/navigation"

export const blood_choices = [
    {
        id: 1,
       blood_id: 'A+',
    },
    {
        id: 2,
       blood_id: 'A-',
    },
    {
        id: 3,
        blood_id: 'B+',
    },
    {
        id: 4,
        blood_id: 'B-',
    },
    {
        id: 5,
        blood_id: 'AB+'
    },
    {
        id: 6,
        blood_id: 'AB-'
    },
    {
        id: 7,
       blood_id: 'O+'
    },
    {
        id: 8,
       blood_id: 'O-'
    }
]

export default function Search({donarType}) {
    const searchParams=useSearchParams()
    const pathName=usePathname()
    const {replace}=useRouter()
    const params = new URLSearchParams(searchParams)
    const {
        isSearched,
        setIsSearched,
        blood_id,
        district,
        upazila,
        onChangQueryData } = useSearchContext()

    async function searchBlood() {
        setIsSearched(true)
            params.set('blood_group', blood_id)
            params.set('donar_type',donarType)
            params.set('selectedDistrict','Dhaka')
            if (district != '') {
                params.set('selectedDistrict',district)
            }
            if (upazila != '') {
                params.set('district', district)
                params.set('upazila', upazila)
            }
            else {
                params.delete('district')
                params.delete('upazila')
            }
            return replace(`${pathName}?${params.toString()}`);
    }

 

  useEffect(()=>{
     searchBlood()
  },[upazila,district])

 
  

 

    return (
        <div className="mx-auto space-y-2 text-xl select-none">
            <div className="flex items-center space-x-1 justify-center text-slate-100 text-sm md:text-xl px-2 py-1 bg-gray-800 border border-gray-600 rounded-md" onSubmit={ searchBlood }>
                <div className="">Select Blood Group:</div>
                <select className="bg-gray-800 ring-1 ring-gray-600  rounded-md" name="blood_id" value={ blood_id } onChange={ (e) => onChangQueryData(e) }>
                    { blood_choices.map(item => (
                        <option key={ item.id } className="text-sm" value={ item.id }>{ item.blood_id }</option>
                    )) }
                </select>

            </div>
            <button type="submit" onClick={ searchBlood } className="text-white block mx-auto bg-red-800 rounded-sm p-1">Search</button>
        </div>

    )
}
'use client'

import { createContext, useContext, useEffect, useState } from "react"
import { useCommonContext } from "./CommonContexts"

const SearchContext=createContext()

export default function SearchContextProvider({children,upazilas}){
    const {allDistrict}=useCommonContext()
    const [searchResult,setSearchResult]=useState([])
    const [allUpazila,setAllUpazila]=useState(upazilas||[])
    const [queryData,setQueryData]=useState({
        blood_id:1,
        district:'Dhaka',
        upazila:''
    })
    const [isSearched,setIsSearched]=useState(false)

    const {blood_id,district,upazila}=queryData

    function onChangQueryData(e){
        setQueryData({...queryData,[e.target.name]:e.target.value})
    }
   

const dhakaCityThanas=[
    'Adabar Thana',
    'Badda Thana',
    'Bangsal Thana',
    'Bimanbandar Thana',
    'Cantonment Thana',
    'Chowkbazar Thana',
    'Darus Salam Thana',
    'Demra Thana',
    'Dhakshinkhan Thana',
    'Dhanmondi Thana',
    'Gendaria Thana',
    'Gulshan Thana',
    'Hatirjheel Thana',
    'Hazaribag Thana',
    'Jatrabari Thana',
    'Kadamtali Thana',
    'Kafrul Thana',
    'Kalabagan Thana',
    'Kamrangirchar Thana',
    'Khilgaon Thana',
    'Khilket Thana',
    'Kotwali Thana',
    'Lalbagh Thana',
    'Mirpur Model Thana',
    'Mohammadpur Thana',
    'Motijheel Thana',
    'Mugda',
    'New Market Thana',
    'Pallabi Thana',
    'Paltan',
    'Ramna Thana',
    'Rampura Thana',
    'Sabujbagh Thana',
     'Shah Ali Thana',
     'Shahbag',
     'Sheer-e-Bangla Nagar',
     'Shyampur Thana',
     'Sutrapur Thana',
     'Tejgaon industrial Area Thana',
     'Tejgaon Thana',
     'Turag Thana',
     'Uttar Khan Thana',
     'Vatara Thana',
     'Wari Thana'
]

    useEffect(()=>{
        if(district=='Dhaka'){
           setAllUpazila([...allUpazila,...dhakaCityThanas])
        }
    },[district])



    return(
       <SearchContext.Provider value={{searchResult,setSearchResult,isSearched,setIsSearched,queryData,setQueryData,blood_id,district,upazila,onChangQueryData,allUpazila}}>
          {children}
       </SearchContext.Provider>
    )
}

export function useSearchContext(){
    return useContext(SearchContext)
}
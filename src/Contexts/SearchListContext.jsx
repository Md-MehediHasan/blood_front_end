'use client'

import { createContext, useContext, useState } from "react"
import { useCommonContext } from "./CommonContexts"

const SearchContext=createContext()

export default function SearchContextProvider({children,allUpazila}){
    const {allDistrict}=useCommonContext()
    const [searchResult,setSearchResult]=useState([])
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



    return(
       <SearchContext.Provider value={{searchResult,setSearchResult,isSearched,setIsSearched,queryData,setQueryData,blood_id,district,upazila,onChangQueryData,allUpazila}}>
          {children}
       </SearchContext.Provider>
    )
}

export function useSearchContext(){
    return useContext(SearchContext)
}
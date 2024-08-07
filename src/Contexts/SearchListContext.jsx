'use client'

import { usePathname, useRouter } from "next/navigation"
import { createContext, useContext, useEffect, useState } from "react"

const SearchContext=createContext()

export default function SearchContextProvider({children,allUpazila}){
    const [searchResult,setSearchResult]=useState([])
    const [queryData,setQueryData]=useState({
        blood_id:1,
        district:'',
        upazila:''
    })
    const [isSearching,setIsSearching]=useState(false)

    const {blood_id,district,upazila}=queryData
    const pathName=usePathname()
    const {replace}=useRouter()
 
    function onChangQueryData(e){
        setQueryData({...queryData,[e.target.name]:e.target.value})
    }



    useEffect(()=>{
        if(district !=''){
               replace(`${pathName}?selectedDistrict=${district.split(' ').join('_')}`)
        }
        else{
            replace(`${pathName}?selectedDistrict=Barguna`)
        }
     
    },[district])



    return(
       <SearchContext.Provider value={{searchResult,setSearchResult,isSearching,setIsSearching,queryData,setQueryData,blood_id,district,upazila,onChangQueryData,allUpazila}}>
          {children}
       </SearchContext.Provider>
    )
}

export function useSearchContext(){
    return useContext(SearchContext)
}
'use client'

import { createContext, useContext, useEffect, useState } from 'react'











const CommonContext = createContext()

export default function CommonContextProvider({ children, token, districts,authenticatedUser}) {
  const [isSticky, setIsSticky] = useState(true)
  const [scrollHeight, setScrollHeight] = useState(0)
  const [isAuthenticated, setIsAuthenticated] = useState(authenticatedUser?.name ? true : false)
  const [allDistrict, setAllDistrict] = useState(districts)
  const [submissionError,setSubmissionError]=useState('')
  
  useEffect(()=>{
      setSubmissionError('')
  },[])


  return (
          <CommonContext.Provider value={{
            isSticky,
            setIsSticky,
            scrollHeight,
            setScrollHeight,
            isAuthenticated,
            setIsAuthenticated,
            allDistrict,
            authenticatedUser,
            submissionError,setSubmissionError
          }}>

           { children }

          </CommonContext.Provider>
  )
}

export function useCommonContext() {
  return useContext(CommonContext)
}
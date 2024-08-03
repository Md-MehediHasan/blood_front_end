'use client'

import { createContext, useContext, useEffect, useState } from 'react'











const CommonContext = createContext()

export default function CommonContextProvider({ children, token, districts,authenticatedUser}) {
  const [isSticky, setIsSticky] = useState(true)
  const [scrollHeight, setScrollHeight] = useState(0)
  const [isAuthenticated, setIsAuthenticated] = useState(authenticatedUser?.name ? true : false)
  const [allDistrict, setAllDistrict] = useState(districts)
  const [selectedDist, setSelectedDist] = useState(districts[0].district.toLowerCase())
  const [redirectMsg, setRedirectMsg] = useState('')
  


  return (
          <CommonContext.Provider value={{
            isSticky,
            setIsSticky,
            scrollHeight,
            setScrollHeight,
            isAuthenticated,
            setIsAuthenticated,
            allDistrict,
            setSelectedDist,
            redirectMsg,
            setRedirectMsg,
            authenticatedUser
          }}>

           { children }

          </CommonContext.Provider>
  )
}

export function useCommonContext() {
  return useContext(CommonContext)
}
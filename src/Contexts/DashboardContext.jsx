'use client'

import { createContext, useContext, useState } from "react"

const DashboardContext=createContext()

export default function DashboarContextProvider({children}){
    const [activatedMenu,setActivatedMenu]=useState(1)
    return(
        <DashboardContext.Provider value={{activatedMenu,setActivatedMenu}}>
            {children}
        </DashboardContext.Provider>
    )
}

export function useDashboardContext(){
    return useContext(DashboardContext)
}
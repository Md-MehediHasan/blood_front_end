'use client'
import { Fragment } from "react"
import Link from "next/link"

export default  function ManageOrganization({myOrganizations}){

    return(
      <Fragment>
        <div className="bg-stone-800 p-2 select-none">
          <h1 className="text-4xl my-2 text-slate-100">Your Organizations</h1>
          {myOrganizations.length>=1?<div className="block lg:grid grid-cols-2 text-slate-400">
            { myOrganizations.map(org => (
              <Link href={`/dashboard/${org.organization_name}`} className="p-4 my-3 block bg-stone-700 w-[90%] lg:w-[75%]  mx-auto cursor-pointer shadow-lg border-stone-500 rounded">
                <div className="flex items-center text-center space-y-5 h-16 space-x-5">
                  <img src={ org.logo } className="block h-full rounded-lg" /> <span className="block text-xl"> { org.organization_name }</span>
                </div>
                <hr className="block w-full border-b border-stone-400 my-1"/>
                <div className="flex items-center   space-x-4 mt-2  text-sm">
                  <span className="block">Established: { org.establishing_year } </span><span className="block">Working City:{ org.working_area }</span>
                </div> 
              </Link>
            )) }
          </div>
          :<h2 className="text-center my-8 text-slate-300">You have no organization to show</h2>
          }
        </div>
      </Fragment>
      
    )
}
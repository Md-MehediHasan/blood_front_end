'use client'

import { useDashboardContext } from "../../Contexts/DashboardContext"
import MyProfile from './MyProfile'
import UpdateMyProfile from './UpdateMyProfile'
import ManageOrganization from './ManageOrganization'
import MyMessages from './MyMessages'
import { Fragment } from "react"
import { useCommonContext } from "../../Contexts/CommonContexts"


export default function DashDetails({myOrganizations,allConversations,messages}){
   
    const {activatedMenu}=useDashboardContext()
    const {authenticatedUser}=useCommonContext()
    const components=[
        {
            id: 1,
            component:<MyProfile authenticatedUser={authenticatedUser}/>
        },
        {
            id: 2,
            component:<UpdateMyProfile authenticatedUser={authenticatedUser}/>
        },
        {
            id: 3,
            component:<ManageOrganization myOrganizations={myOrganizations}/>,
          
        },
        {
            id: 4,
            component:<MyMessages allConversations={allConversations} messages={messages}/>
          
        }
    ]

    return(
        <div className='col-span-2 lg:col-span-3 select-none text-center'>
           {components.filter(item=>item.id==activatedMenu).map(compo=>(
            <Fragment key={compo.id}>
                {compo.component}
            </Fragment>
           ))}
        </div>
    )
}
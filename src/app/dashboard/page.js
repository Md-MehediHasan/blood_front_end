import { Fragment } from 'react'
import { getAllDistricts, getAuthenticatedUser, getConversations, getMessagesByConversationId, getMyOrganizations } from '../../backendRequests/getRequests'
import Menubar from '../../components/dashboard/Menubar'
import DashboardContextProvider from '../../Contexts/DashboardContext'
import SearchContextProvider from '../../Contexts/SearchListContext'
import DashDetails from '../../components/dashboard/DashDetails'
import { getAllUpazilas } from '../../backendRequests/getRequests'

export default async function Dashboard({ searchParams}) {
    let messages
    let chat_id= searchParams['chat_id']
    const authenticatedUser= await getAuthenticatedUser()
    const myOrganizations = await getMyOrganizations()
    const allConversations=await getConversations()
    if(chat_id){
        messages = await getMessagesByConversationId(chat_id)
    }
    let upazilaByDistrictName
    let selectedDistrict=searchParams['selectedDistrict']
    if(selectedDistrict){
        upazilaByDistrictName= await getAllUpazilas(selectedDistrict)
      }
   
    return (
        <SearchContextProvider allUpazila={upazilaByDistrictName}>
            <DashboardContextProvider>
            <div className='block lg:grid grid-cols-4'>
                <Fragment>
                    <Menubar authenticatedUser={authenticatedUser}/>
                </Fragment>
                <Fragment>
                    <DashDetails
                        authenticatedUser={ authenticatedUser }
                        myOrganizations={ myOrganizations }
                        allConversations={ allConversations }
                        messages={ messages } />
                </Fragment>
            </div>
        </DashboardContextProvider>
        </SearchContextProvider>
        

    )
}
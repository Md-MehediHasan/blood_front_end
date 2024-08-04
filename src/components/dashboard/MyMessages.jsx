'use client'
import { faCheck, faClose } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { endPoints } from "../../utils/endPoints"
import { makePostRequest } from "../../utils/network"

export default function MyMessages({allConversations,messages}){
    const [selectedChatPerson,setSeletectedChatPerson]=useState({})
    const [message,setMessage]=useState('')
    const [submissionStatus,setSubmissionStatus]=useState({
        isLoading:false
    })
    const pathName=usePathname()
    const {replace}=useRouter()
    const searchParams=useSearchParams()
    let chat_id=searchParams.get('chat_id')
    const router=useRouter()
    function chatOpener(item){
        setSeletectedChatPerson(item.starter)
        replace(`${pathName}?chat_id=${item.uid}`)
    }
    function chatHiddener(){
        replace(pathName)
    }


  async function sendMessage(e){
            e.preventDefault()
            let url=`${process.env.NEXT_PUBLIC_BACKEND_URL}/${endPoints.SEND_MESSAGES}`
            const data={
                'chat_id':chat_id,
                'message':message
            }
            setSubmissionStatus({...submissionStatus,isLoading:true})
            const request = await makePostRequest(url,data)
            if(request.status ==201){
                setMessage('')
                setSubmissionStatus({...submissionStatus,isLoading:false})
                router.refresh()
            }
            if(request.status !==201){
                setSubmissionStatus({...submissionStatus,isLoading:false})
            }
  }

  setTimeout(()=>{
      router.refresh()
  },60000)





    return(
        <div className="grid grid-cols-6 h-screen">
            <ul className="col-span-6 lg:col-span-2 bg-gray-800 py-8 px-2 h-screen">
                <h1 className="text-center text-2xl text-slate-300" >My Conversations</h1>
                {allConversations.map(item=>(
                    <li key={item.uid} onClick={()=>chatOpener(item)} className="pl-2 py-2 my-5  shadow-lg  bg-gray-700 flex items-center w-[80%] mx-auto lg:w-[full] relative rounded-md"><span className="block">{item.starter.name}</span> {item.unread_number>0 && 
                        <span className="px-2 text-white rounded-full bg-red-700 absolute right-2">{item.unread_number}</span>}</li>
                ))}
            </ul>
            <div className={`col-span-6 lg:col-span-4 ${chat_id ==null ?'hidden':'block'} lg:block bg-gray-700 lg:relative` }>
              {chat_id ==null && <h3 className="text-lg my-4">click any conversation to open</h3>}
              {chat_id && <div className="w-[100%] lg:w-[98%] absolute lg:relative mx-auto my-2 h-[98vh] relative rounded-md border border-gray-500 ">
                        <div className="sticky flex items-center w-full col-span-4 py-8 h-auto bg-gray-800 rounded-t-md">
                            <div className="absolute left-4">
                                <span className="block text-white">{selectedChatPerson.name}</span>
                                <span className="block text-sm">{selectedChatPerson.phone_number},{selectedChatPerson.group}</span>
                            </div>
                            <div className="absolute right-4 px-2 py-1 bg-gray-700 rounded-lg hover:bg-gray-600 duration-300 ease-in-ease-out cursor-pointer text-slate-200" onClick={chatHiddener}>
                               <FontAwesomeIcon icon={faClose}/>
                            </div>
                        </div>
                        <div className="relative h-[75vh] overflow-y-scroll">
                            {messages !=undefined &&
                            <ul className="block">
                                {messages.map((item,index)=>(
                                  <div className="relative  block w-full">
                                        <li key={ index } className={ `w-[40%]  ${item.is_sender ? 'translate-x-96' : 'translate-x-4'}` }>
                                            <div className="w-[80%]">
                                                <i className="block text-sm text-left">{ item.sender.name }</i>
                                                <p className="text-left p-2 pb-8 bg-gray-800 relative">{ item.message }
                                                    <span className={ `absolute text-sm -space-x-1 right-2 bottom-0 ${item.is_seen_by_all ? 'text-green-500' : 'text-gray-900'}` }>
                                                        <FontAwesomeIcon icon={ faCheck } /><FontAwesomeIcon className="mt-2" icon={ faCheck } />
                                                    </span>
                                                </p>
                                            </div>
                                        </li>
                                  </div>
                                  
                                ))}
                            </ul>
                            }
                        </div>
                        <form className="absolute bottom-0 w-full flex rounded-b-md items-center px-4 py-2 bg-gray-800" onSubmit={sendMessage}>
                            <div className="w-[90%] flex items-center">
                                <textarea className="block w-full h-auto min-h-1 items-justify py-2  px-8 no-scrollbar resize-none outline-none border border-gray-700 shadow-md bg-gray-700 rounded-full" type="text" placeholder="Type Your message here" rows={1} value={message} onChange={(e)=>setMessage(e.target.value)}></textarea>
                            </div>
                            <div className="w-[10%] m-1">
                                <button disabled={submissionStatus.isLoading} className="px-4 py-2 bg-green-500 rounded-md">{submissionStatus.isLoading?'Sending':'Send'}</button>
                            </div>
                        </form>
                </div>
                }
            </div>
        </div>
    )
}

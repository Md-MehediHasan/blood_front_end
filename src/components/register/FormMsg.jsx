'use-client'
import {useCommonContext} from '../../Contexts/CommonContexts'

export default function FormMsg(){
    const {userMsg,setUserMsg}=useCommonContext()
    return(
       <b className='text-center'>{userMsg}</b>
    )
}
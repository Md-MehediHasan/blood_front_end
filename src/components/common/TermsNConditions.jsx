'use client'
import { Fragment, useState } from "react";
export default function TermsNConditions({termValidateReciever}){
    const [isTermsOpened,setIsTermsOpened]=useState(false)
  
    function ToggleTermsNConditions(){
        setIsTermsOpened(prev=>!prev)
    }
    
    function onTermsChange(e){
        termValidateReciever(e.target.checked)
    }

    return(
        <Fragment>
             <div className="flex items-center  mx-auto my-3">
                    <input onChange={onTermsChange} type="checkbox" name="" id="terms" className="w-[10%] checked:bg-green-400 lg:w-[5%]"/>
                    <label >I have read and accept <span  className="text-green-400 cursor-pointer" onClick={ToggleTermsNConditions}>terms & conditions</span></label>
             </div>
             <div className={`w-full ${isTermsOpened?'visible':'hidden'} transition-all duration-300 ease-in-ease-out bg-gray-800 text-slate-300 px-4 py-2 shadow-lg border border-gray-600 rounded-lg`}>
            <h3 className="text-center text-xl text-green-400">Terms & Conditions</h3>
            <p className="text-sm my-2">Welcome to our blood donation app. By using this app, you agree to the following terms. We only collect data to help with blood donations and ensure your information is protected. The app is designed to make it easy for people to find blood donors. There are two types of donors: public donors, who are available to donate blood to anyone in need if they meet the app’s requirements, and organizational donors, who are linked to specific organizations and are not shown in the main search results. You can find organizational donors through their organization’s dashboard, where they are managed by the organization’s manager. Anyone who signs up through the "Register Me" link will be considered a public donor. Organizational managers need to add their donors through the dashboard and must include at least 10 public donors in their list. By using this app, you accept these terms. If you have questions or need more information, please contact our support team. Thank you for your support in saving lives.
                <span className="px-3 block py-1 list-none  cursor-pointer my-3 w-1/4 mx-auto py-1 text-center bg-green-600" onClick={ToggleTermsNConditions}>Hide</span>
            </p>
          </div>
        </Fragment>
        
    )
}
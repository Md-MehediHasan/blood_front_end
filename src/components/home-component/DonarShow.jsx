'use client'
import { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDroplet,faCalendar,faLocationDot,faPhone } from "@fortawesome/free-solid-svg-icons";
import { useSearchContext } from "../../Contexts/SearchListContext";
import { useCommonContext } from "../../Contexts/CommonContexts";
import NotFound from "@/not-found";


export default  function ShowDonar() {
    const {searchResult}=useSearchContext()
    const {authenticatedUser,submissionError}=useCommonContext()
    console.log(submissionError)

    function callDonar(donar) {
        if (donar.is_capable && authenticatedUser?.name) {
            return window.open(`tel:${donar.phone_number}`)
        }
        else if(!donar.is_capable && authenticatedUser?.name) {
            return alert('Sorry this donar is not capable. Please try another donar.')
        }
        else{
            window.location.href=`/login?redirect_reason=${'You must login before call to any donar'}`
        }
    }

    return(
        <Fragment>
            {
                searchResult?.length > 0 ? <ul className="pb-2 lg:pb-5 bg-gray-800 select-none  rounded-sm h-auto w-full mx-auto lg:w-4/5">
                    <h2 className="grid grid-cols-6 py-2  relative text-sm lg:text-2xl border-b text-slate-100 border-gray-600">
                        <span className="block mx-auto col-span-3">অনুসন্ধানের ফলাফল</span>
                        <div className="absolute left-1/2 h-[90%] top-[2px] w-[2px] bg-slate-500"></div>
                        <span className="block mx-auto col-span-3">ফলাফল সংখ্যাঃ { searchResult?.length }</span></h2>
                    { searchResult?.map(donar => (
                        <li key={ donar.phone_number } className="shadow-md my-2 w-[95%] lg:w-2/3 mx-auto text-slate-100 rounded-sm border  border-gray-600">
                            <span className="flex items-center space-x-3 bg-gray-700 justify-around p-2">
                                <span className="block text-md lg:text-2xl">{ donar.name }</span>
                                <span className={ `${donar.is_capable ? 'bg-green-600' : 'bg-red-600'} p-1 text-white rounded-sm text-sm` }>{ donar.is_capable ? 'Capable' : 'Not Capable' }</span>
                                <span className="block text-xl lg:text-xl">
                                <button className={ `px-5 py-1 rounded-md ${donar.is_capable ? 'bg-green-600' : 'bg-red-600'} text-white` } onClick={ () => callDonar(donar) }><FontAwesomeIcon icon={ faPhone } /></button>
                                </span>
                            </span>
                            <span className="block lg:flex items-center justify-around lg:space p-2 rounded-sm">
                                <span className="block text-md lg:text-xl"><FontAwesomeIcon icon={ faDroplet } className="mr-2 text-red-600 " />Blood Group:{ donar.group }</span>
                                <span className="block lg:hidden text-md lg:text-xl"><FontAwesomeIcon icon={ faCalendar } className="mr-2 text-red-500" />Last Donate:{ donar.last_donate }</span>
                                <span className="block text-sm lg:text-xl"><FontAwesomeIcon className="mr-2 text-green-400" icon={ faLocationDot } />{ donar.upazila },{ donar.district }</span>

                            </span>
                        </li>
                    )) }
                </ul> :
                    <div className="block mx-auto mt-8">
                   
                        {submissionError ==''?
                            <Fragment><span className="block mx-auto"><img src="/search_fail.svg" className="block text-white mx-auto h-20 w-auto" /></span>
                                <h2 className="text-center text-slate-300"> দুঃখিত,আপনার অনুসন্ধানের সাথে কোন তথ্যের মিল পাওয়া যায়নি </h2>
                            </Fragment>:<NotFound error={submissionError}/>

                    }
                    </div>
            }
        </Fragment>
       
    )
}
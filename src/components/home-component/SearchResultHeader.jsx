'use client'

import {useCommonContext} from '../../Contexts/CommonContexts'
import {useSearchContext} from '../../Contexts/SearchListContext'

export default function SearchHeader(){
    const {allDistrict}=useCommonContext()
    const { district, upazila, onChangQueryData,allUpazila} = useSearchContext()
    return(
        <div className="grid grid-cols-12   bg-gray-800 border-b border-gray-600 w-full lg:w-4/5 mx-auto text-md md:text-xl  items-center place-items-center gap-3 space-x-5 mt-2 rounded-t-md shadow-md p-2">
            <li className=" text-slate-100  list-none bold  col-span-2 "><img src='/funnel.svg' className="h-8" /></li>
            <li className="flex  text-slate-100  col-span-10 lg:col-span-5">
                <span className="block  px-2">District</span>
                <select className="outline-none text-sm   bg-gray-800 rounded-sm border border-gray-600 " name="district" value={ district } onChange={ (e) => onChangQueryData(e) }>
                    <option disabled className="text-slate-200">Select District</option>
                    { allDistrict.map((distr, index) => (
                        <option key={ index } className="" value={ distr.district }>{ distr.district }</option>
                    )) }
                </select>
            </li>
            <li className="flex text-center text-slate-100 col-span-12 lg:col-span-5 justify-center  ">
                <span className="block bg-gray-800 px-2">Upazila/Thana</span>
                <select className="outline-none bg-gray-800 text-sm border border-gray-600 rounded-sm" name="upazila" value={ upazila } onChange={ (e) => onChangQueryData(e) }>
                    <option disabled >Select Upazila</option>
                    { allUpazila?.map((upazila, index) => (
                        <option key={ index } value={ upazila }>{ upazila }</option>
                    )) }
                </select>
            </li>
        </div>
    )
}
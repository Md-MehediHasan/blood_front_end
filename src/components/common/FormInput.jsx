'use client'
import { Fragment } from "react"
import React from "react"
export default function FormInputs({ formInputs,onChangeHandler }) {
    return (
        <Fragment>
            { formInputs.map(input => (
                <div key={ input.label } className="flex  items-center w-full  text-md lg:text-xl px-2 py-2  my-2 space-x-1 lg:space-x-2 rounded-md shadow-lg border border-gray-600">
                    <label className="w-[35%] md:w-1/3 px-2 lg:px-5 cursor-pointer" htmlFor={ input.inputName }>{ input.label }</label>
                    {( input.inputType == 'text' || input.inputType == 'password' ||  input.inputType == 'email' ||  input.inputType == 'date' || input.inputType == 'tel') &&
                        <input type={ input.inputType } name={ input.inputName } id={ input.inputName } value={ input.storeName } onChange={ onChangeHandler } className="px-2 w-3/4 lg:w-2/3 py-2 placeholder:text-slate-400 rounded-md outline-none  bg-gray-800 " placeholder={ input.placeholderValue } required />
                    }
                    { input.inputType == 'select' &&
                        <select name={ input.inputName } id={ input.inputName } value={ input.storeName } onChange={ onChangeHandler } className=" px-2 w-[65%] md:w-2/3 py-2  rounded-md outline-none  bg-gray-800 " required>
                            {input?.data?.map(item => (
                                <option key={ item.id } value={ input.label == 'Blood Group' ?item?.id:  input.inputName =='upazila'?    item : item[input.inputName]} className="block w-1/4">{input.inputName =='upazila'? item: item[input.inputName] }</option>
                            ))}
                        </select>
                    }
                    {input.inputType =='textarea' &&
                    <textarea name={input.inputName} id={input.label} value={input.storeName} onChange={onChangeHandler} placeholder={input.placeholderValue} className="px-2 w-3/4 lg:w-2/3 py-2 placeholder:text-slate-400 rounded-md outline-none  bg-gray-800 min-h-20 resize-none" rows={3}></textarea>
                    }
                     
                </div>
            )) }
        </Fragment>
    )
}
'use client'

import { Fragment, useEffect, useState } from 'react'
import { useCommonContext } from '../../Contexts/CommonContexts'
import { useDashboardContext } from '../../Contexts/DashboardContext'
import { ArrowLeft, ArrowRightLeft } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
export default function Menubar({ authenticatedUser }) {
    const { activatedMenu, setActivatedMenu } = useDashboardContext()
    const [isDashMenuOpen, setIsDashMenuOpen] = useState(true)
    const pathName=usePathname()
    const {replace}=useRouter()

    const profileMenus = [
        {
            id: 1,
            title: 'My Profile'
        },
        {
            id: 2,
            title: 'Update Profile'
        },
        {
            id: 3,
            title: 'Manage Organizations'
        },
        {
            id: 4,
            title: 'My Messages'
        }
    ]

    function makeMenuActivated(id) {
        return setActivatedMenu(id)
    }
    function ToggleDashMenu(){
        setIsDashMenuOpen(prev=>!prev)
    }

    useEffect(()=>{
       replace(`${pathName}`)
    },[activatedMenu])

    return (
        <div className='col-span-2 select-none lg:col-span-1 min-h-screen  top-0 left-0 px-4 absolute bg-gray-800 lg:relative border-r border-gray-600 shadow-lg'>
            <ul className=''>
                <button className='text-green-500 block lg:hidden absolute top-2 right-0' onClick={ToggleDashMenu}><ArrowLeft className={`${isDashMenuOpen?'rotate-0':'rotate-180 '} transition-transform duration-500 ease-in-ease-out`}/></button>
                { isDashMenuOpen &&
                    <div className='my-12 lg:my-2'>
                           <h2 className='text-3xl my-3 text-slate-100 text-center'>Dashboard Menu</h2>
                        <li className='px-4 py-4 cursor-pointer text-slate-100  text-xl lg:text-2xl text-center bg-gray-600 duration-400 ease-in-ease-out border border-stone-600 shadow-lg rounded-md'>{ authenticatedUser?.name }</li>
                        { profileMenus.map(menu => (
                            <li key={ menu.id } onClick={ () => makeMenuActivated(menu.id) } className={ `px-4 my-1 py-2 text-slate-100 text-xl hover:bg-gray-600 ${activatedMenu == menu.id ? 'bg-gray-600' : ''} duration-400 ease-in-ease-out cursor-pointer text-center border border-stone-600 shadow-lg rounded-md` }>{ menu.title }</li>
                        ))
                        }
                    </div>
                }
            </ul>
        </div>

    )
}
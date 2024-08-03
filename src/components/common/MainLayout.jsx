'use client'
import Link from "next/link"
import React, { Fragment, useEffect, useState } from "react"
import {useCommonContext} from '../../Contexts/CommonContexts'
import { removeCredentitals } from "../../utils/credentials"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from "@fortawesome/free-solid-svg-icons"



export default function MainLayout({children}){
    const [isMobileMenuOpened, setIsMobileMenuOpend] = useState(false)
    const { isSticky, setIsSticky, scrollHeight, setScrollHeight, userMsg, setUserMsg, isAuthenticated, setIsAuthenticated } = useCommonContext()

    const menus = [
        {
            id: 1,
            title: `${isAuthenticated ? 'My dashbaord' : 'Register Me'}`,
            href: `${isAuthenticated ? '/dashboard' : '/register'}`,
            bangla: `${isAuthenticated ? 'আমার ড্যাশবোর্ড' : ' আমার নিবন্ধন'}`
        },
        {
            id: 2,
            title: 'Request to Organization',
            href: '/request-blood',
            bangla: 'সংস্থার কাছে অনুরোধ'
        },
        {
            id: 3,
            title: 'Register Organization',
            href: '/register-organization',
            bangla: 'সংস্থার নিবন্ধন'
        },
        {
            id: 4,
            title: `${isAuthenticated ? 'Logout' : 'Login'}`,
            href: `${isAuthenticated ? '' : '/login'}`,
            bangla: `${isAuthenticated ? 'লগআউট' : '/লগইন'}`
        }
    ]

    function mobileMenuToggle(){
        setIsMobileMenuOpend(prev=>!prev)
    }
    function handleScroll(e){
        setScrollHeight(e.target.scrollTop)
    }

    useEffect(() => {
        const menubar = document.querySelector('.menubar')
        const rect = menubar.getBoundingClientRect()
        let height = rect.height
        if (height - scrollHeight <=-30) {
            setIsSticky(true)
        }
        if (height - scrollHeight >= 0) {
            setIsSticky(false)
        }

    }, [scrollHeight])

    useEffect(() => {
        const body = document.querySelector('body')

        body.addEventListener('scroll', handleScroll)
        return () => {
            body.removeEventListener('scroll', handleScroll)
        }
    }, [])


    async function logout() {
        await removeCredentitals().then(() => window.location.href = '/').then(() => setIsAuthenticated(false))

    }



    return(
        <main className="overscroll-contain">
            <nav className={ `flex min-w-screen ${isSticky ? 'sticky-nav' : ''} z-30 bg-red-600 menubar border-box overflow-x-hidden select-none min-h-12 items-center` }>
                <ul className="relative grid grid-cols-2 lg:grid-cols-5  items-center  justify-center w-full justify-self-around">
                    <li className="text-semibold text-2xl hidden lg:block text-center text-white"><Link href='/'>Emergency Blood BD</Link></li>
                    <li className="text-semibold text-4xl text-left ml-3 block lg:hidden text-white"><Link href='/'>EBB</Link></li>
                    {
                        menus.map(menu => (
                            <Link href={ menu.href } onClick={ menu.title == 'Logout' ? logout : '' } className="hidden lg:block text-center cursor-pointer" key={ React.useId() }>{ menu.title }</Link>
                        ))
                    }
                    <li className="cursor-pointer select-none flex items-center block lg:hidden p-2 bg-white rounded-full absolute right-8" onClick={ mobileMenuToggle }> <FontAwesomeIcon icon={ faHouse } /> </li>
                </ul>
            </nav>
            <section className={!isSticky?'relative':''}>
                {/* Mobile Menus */ }
                <div className={ `block lg:hidden bg-gray-700 absolute transition-all max-w-screen overflow-hidden z-50 duration-500 ease-in-ease-out ${isMobileMenuOpened ? 'translate-x-0' : 'translate-x-96'} ${isSticky ? 'top-12' : 'top-0'} right-0 h-full ` }>
                    {
                        menus.map(menu => (
                            <Link href={ menu.href } onClick={ menu.title == 'Logout' ? logout : '' } key={ menu.id } className="cursor-pointer w-[95%] mx-auto block bg-gray-800 shadow-md mt-1  px-5 py-2 rounded-md">{ menu.title }</Link>
                        ))
                    }
                </div>
                {/* Children from all routes */ }
                <section className="h-screen lg:h-auto overflow-auto lg:overflow-hidden bg-gray-700">
                    { children }
                </section>
            </section>
        </main>
      
    )
}
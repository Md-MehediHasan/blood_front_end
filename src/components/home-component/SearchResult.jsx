'use client'

import SearchHeader from './SearchResultHeader'
import DonarShow from './DonarShow'
import { useSearchContext } from '../../Contexts/SearchListContext'
import Searching from './Searching'
import { useCommonContext } from '../../Contexts/CommonContexts'
import NotFound from  '../../app/not-found'


export default function SearchResult() {
    const {isSearching}=useSearchContext()
    return (
       
        <div className="mx-auto max-w-screen w-full mx-auto overflow-hidden">
             <SearchHeader />
             {isSearching ?<Searching/>: <DonarShow/>}
            
             
        </div>
    )
}
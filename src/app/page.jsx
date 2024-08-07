import Image from "next/image";
import Search from '../components/home-component/Search'
import SearchResult from '../components/home-component/SearchResult'
import { getAllUpazilas, getAuthenticatedUser, getDonarList } from "../backendRequests/getRequests";
import SearchContextProvider from "../Contexts/SearchListContext";



export default async function Home({searchParams}) {
  const params=searchParams
  let upazilaByDistrictName
  let selectedDistrict=params['selectedDistrict']?.split('_').join(' ')
  if(selectedDistrict !=undefined){
    upazilaByDistrictName= await getAllUpazilas(selectedDistrict)
  }

 

  return (
    <SearchContextProvider allUpazila={upazilaByDistrictName} selectedDistrict={selectedDistrict}  >
          <main className='py-12  lg:py-16 min-h-screen h-auto'>
          <section>
          <h2 className="text-center mb-5 text-2xl  lg:text-3xl text-slate-100 font-bolder">জরুরী রক্ত খুজুন</h2>
          <div className="flex justify-center">
            <Search donarType={ 'public_donar' } />
          </div>
          <div className="flex justify-center w-full">
               <SearchResult /> 
          </div>
      </section>
    </main>
    </SearchContextProvider>
   
  );
}

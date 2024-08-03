import Image from "next/image";
import Search from '../components/home-component/Search'
import SearchResultList from '../components/home-component/SearchResult'
import { getAllUpazilas, getAuthenticatedUser, getDonarList } from "../backendRequests/getRequests";
import SearchContextProvider from "../Contexts/SearchListContext";


export default async function Home({searchParams}) {
  const params=searchParams
  let donars, upazilaByDistrictName
  let blood_id=params['blood_group']
  let district=params['district'] 
  let selectedDistrict=params['selectedDistrict']
  let upazila=params['upazila']
  let donar_type=params['donar_type']
  if(blood_id){
    donars= await getDonarList(blood_id,district,upazila,donar_type)
  }
  if(selectedDistrict){
    upazilaByDistrictName= await getAllUpazilas(selectedDistrict)
  }
  
 
 


  return (
    <SearchContextProvider allUpazila={upazilaByDistrictName}>
          <main className='py-12 pb-48  lg:py-16 min-h-screen h-auto'>
          <section>
          <h2 className="text-center my-3 text-xl lg:text-3xl">জরুরী রক্ত খুজুন</h2>
          <div className="flex justify-center">
            <Search donarType={ 'public_donar' } />
          </div>
          <div className="flex justify-center w-full">
            <SearchResultList donarList={ donars } />
          </div>
      </section>
    </main>
    </SearchContextProvider>
   
  );
}

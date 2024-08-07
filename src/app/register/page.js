import RegistrationForm from '../../components/register/RegistrationForm'
import SearchContextProvider from '../../Contexts/SearchListContext'
import { getAllUpazilas } from '../../backendRequests/getRequests'

export default async function Register({searchParams}){
    let upazilaByDistrictName
    let selectedDistrict=searchParams['selectedDistrict']
    if(selectedDistrict){
        upazilaByDistrictName= await getAllUpazilas(selectedDistrict)
      }
    return(
        <SearchContextProvider allUpazila={upazilaByDistrictName}>
            <main className='py-12 pb-48  lg:py-16'>
                <section>
                    <RegistrationForm />
                </section>
            </main>
        </SearchContextProvider>
        
    )
}
import RegistrationForm from '../../components/register/RegistrationForm'

export default async function Register(){
    return(
        <main className='py-12 pb-48  lg:py-16'>
           <section>
              <RegistrationForm />
           </section>
        </main>
    )
}
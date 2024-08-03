import OrganizationRegiForm from '../../components/register-organization/OrganizationRegiForm'

export default async function RegisterOrganization(){
    return(
        <main className='py-12 pb-48  lg:py-16'>
           <section>
            <OrganizationRegiForm/>
           </section>
        </main>
    )
}
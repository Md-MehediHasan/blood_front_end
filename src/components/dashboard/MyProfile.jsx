
export default function MyProfile({authenticatedUser}){
    return(
        <div className="w-4/5 text-slate-200 mx-auto">
             <h1 className="text-stone-800 text-4xl my-4">Profile Information</h1>
            <div className="shadow-lg border border-stone-6 my-4 rounded-lg">
              <h2 className="text-2xl text-bolder px-12 lg:px-3 text-left bg-stone-800 rounded-t-lg p-3">Blood Info</h2>
              <div className="block lg:grid grid-cols-2 my-5 px-4 lg:grid-cols-3 mx-12 mx-auto ">
                <li className="list-none text-left">Blood Group: {authenticatedUser?.donar_info?.group}</li><li className="list-none text-left">Last Donate: {authenticatedUser?.donar_info?.last_donate}</li><li className="list-none text-left"> Capability: {authenticatedUser?.donar_info?.is_capable ?'capable':'Not capable'}</li>
              </div>
            </div>
            <div className="shadow-lg border border-stone-6  my-4  rounded-lg">
              <h2 className="text-2xl text-bolder px-12 lg:px-3 text-left bg-stone-800 rounded-t-lg p-3">Basic Info</h2>
              <div className="block lg:grid grid-cols-2 my-5 px-4 lg:grid-cols-3 mx-12 mx-auto ">
                <li className="list-none text-left">Name: {authenticatedUser?.name}</li>
                <li className="list-none text-left">Email: {authenticatedUser?.email}</li>
                <li className="list-none text-left">Phone: {authenticatedUser?.contact}</li>
              </div>
            </div>
            <div className="shadow-lg border border-stone-6 my-4 rounded-lg">
              <h2 className="text-2xl text-bolder px-12 lg:px-3 text-left bg-stone-800 rounded-t-lg p-3">Location Info</h2>
              <div className="block lg:grid grid-cols-2 my-5 px-4 lg:grid-cols-3 mx-12 mx-auto ">
                <li className="list-none text-left">District: {authenticatedUser?.donar_info?.district}</li><li className="list-none text-left">Upazila: {authenticatedUser?.donar_info?.upazila}</li>
              </div>
            </div>
        </div>
    )
}
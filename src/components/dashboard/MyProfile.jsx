import { faCalendar, faCheck, faCity, faDroplet, faEnvelope, faHouse, faLocationDot, faPhone, faUser, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function MyProfile({authenticatedUser}){
    return(
        <div className="w-4/5 text-slate-200 mx-auto">
             <h1 className="text-gray-200 text-4xl my-4">Profile Information</h1>
            <div className="shadow-lg border border-stone-6 my-4 rounded-lg">
              <h2 className="text-2xl text-bolder px-12 lg:px-3 text-left bg-gray-800 rounded-t-lg p-3"><FontAwesomeIcon className="text-red-500" icon={faDroplet}/> Blood Info</h2>
              <div className="block lg:grid grid-cols-2 my-5 px-4 lg:grid-cols-3 mx-12 mx-auto ">
                <li className="list-none text-left"><FontAwesomeIcon icon={faDroplet} className="text-red-500"/> Blood Group: {authenticatedUser?.donar_info?.group}</li><li className="list-none text-left"> <FontAwesomeIcon icon={faCalendar} className="text-green-500"/> Last Donate: {authenticatedUser?.donar_info?.last_donate}</li><li className="list-none text-left"> <FontAwesomeIcon className={authenticatedUser?.donar_info?.is_capable ?'text-green-500':'text-red-500'} icon={authenticatedUser?.donar_info?.is_capable ?faCheck:faXmark}/> Capability: {authenticatedUser?.donar_info?.is_capable ?'capable':'Not capable'}</li>
              </div>
            </div>
            <div className="shadow-lg border border-stone-6  my-4  rounded-lg">
              <h2 className="text-2xl text-bolder px-12 lg:px-3 text-left bg-gray-800 rounded-t-lg p-3"><FontAwesomeIcon className="text-orange-400" icon={faUser}/> User Info</h2>
              <div className="block lg:grid grid-cols-2 my-5 px-4 lg:grid-cols-3 mx-12 mx-auto ">
                <li className="list-none text-left"><FontAwesomeIcon className="text-orange-400" icon={faUser}/> Name: {authenticatedUser?.name}</li>
                <li className="list-none text-left"><FontAwesomeIcon icon={faEnvelope} className="text-red-600"/> Email: {authenticatedUser?.email}</li>
                <li className="list-none text-left"><FontAwesomeIcon className="text-green-400" icon={faPhone}/> Phone: {authenticatedUser?.contact}</li>
              </div>
            </div>
            <div className="shadow-lg border border-stone-6 my-4 rounded-lg">
              <h2 className="text-2xl text-bolder px-12 lg:px-3 text-left bg-gray-800 rounded-t-lg p-3"><FontAwesomeIcon className="text-green-500" icon={faLocationDot}/> Location Info</h2>
              <div className="block lg:grid grid-cols-2 my-5 px-4 lg:grid-cols-3 mx-12 mx-auto ">
                <li className="list-none text-left"><FontAwesomeIcon className="text-green-600" icon={faCity}/> District: {authenticatedUser?.donar_info?.district}</li><li className="list-none text-left"><FontAwesomeIcon className="text-red-600" icon={faHouse}/> Upazila: {authenticatedUser?.donar_info?.upazila}</li>
              </div>
            </div>
        </div>
    )
}
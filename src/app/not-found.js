import { Fragment } from "react";

export default function NotFound({error,reset}){
    
    return (
        <Fragment>
            { error ?<h2 className="text-center text-2xl text-gray-300">{error}</h2>:<div className="text-center text-gray-300">Something went wrong</div>           
        }
        </Fragment>
       
    )
}
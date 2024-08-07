'use client' // Error components must be Client Components
 
import { useEffect } from 'react'
 
export default function Error({ error, reset,statusCode}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.log(error)
  }, [error])

  return (
    <div className='h-screen max-w-screen bg-gray-600 flex items-center justify-center select-none'>
      <div className='mx-auto'>
        <h2 className='text-center my-3 text-3xl'>{ error.message }</h2>
        <button className={`block mx-auto px-2 py-1 ${navigator.onLine?'bg-green-500':'bg-red-500'} text-gray-300 rounded-sm shadow-sm`} onClick={ () => reset() }>
          Try again
        </button>
      </div>
    
    </div>
  )
}
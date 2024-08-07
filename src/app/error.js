'use client' // Error components must be Client Components
 

 
export default function Error({ error, reset,statusCode}) {
  

  return (
    <div className='h-screen max-w-screen bg-gray-600 flex items-center justify-center select-none'>
      <div className='mx-auto'>
        <h2 className='text-center my-3 text-3xl'>{ error.message }</h2>
        <button className={`block mx-auto px-2 py-1 'bg-red-500' text-gray-300 rounded-sm shadow-sm`} onClick={ () => reset() }>
          Try again
        </button>
      </div>
    
    </div>
  )
}
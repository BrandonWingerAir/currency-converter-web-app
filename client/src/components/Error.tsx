const Error = ({message}: {message: string}) => {
  return (
    <div className='flex bg-gray-100 w-[65vw]'>
        <div className="bg-white rounded-lg shadow-md text-center w-full pt-5 px-3">
            <h2 className="text-3xl font-bold text-red-600 mb-4">
                An error occurred, pleasy try again or contact support!
            </h2>
            <p className="text-gray-800 mb-6">
                {message}
            </p>
        </div>
    </div>
  )
}

export default Error
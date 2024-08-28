import React from 'react'

const CardList = ({children}) => {
  return (
    <div className="bg-gradient-to-r from-[#5eb9d4] to-[#93def5] shadow-lg shadow-gray-300 text-white mb-8 mx-28 py-6 px-4 rounded-xl ">
        {children}
    </div>
  )
}

export default CardList;
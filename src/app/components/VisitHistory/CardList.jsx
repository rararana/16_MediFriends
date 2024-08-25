import React from 'react'

const CardList = ({children}) => {
  return (
    <div className="bg-gradient-to-br from-stone-300 to-stone-100 shadow-stone-300 shadow-md text-slate-900 text-xs mb-3 mx-3 p-3 rounded-xl ">
        {children}
    </div>
  )
}

export default CardList;
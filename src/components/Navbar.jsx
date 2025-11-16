import React from 'react'

const nav = () => {
  return (
    <nav className='flex justify-between bg-slate-800 text-white py-2'>
      <div className='logo'>
        <span className='font-bold text-2xl mx-8'>Your Task</span>
       </div>
       <ul className='flex gap-10 mx-9'>
        <li className='cursor-pointer hover:font-extrabold transition-all text-lg font-bold'>Home</li>
        <li className='cursor-pointer hover:font-extrabold transition-all text-lg font-bold'>Tasks</li>
       </ul>
    </nav>
  )
}

export default nav
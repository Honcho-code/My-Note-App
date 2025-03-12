import { faClose, faNavicon } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { Link } from 'react-router-dom'
const Navbar = ({ darkMode, setDardkMode, showModal, setShowModal }) => {
    const [navOpen, setNavOpen] = useState(false)

    const handleToggleDarkMode = ()=>{
        setDardkMode(!darkMode)
        setNavOpen(false)
     }
     const addTaskMobile = ()=>{
        setShowModal(true)
        setNavOpen(false)
     }

  return (
    <div className={`p-4 md:px-6 ${darkMode ?  'bg-zinc-900 text-gray-100 border-b-2 border-zinc-800' : 'bg-white text-zinc-900 border-b-2 border-zinc-100'}`}>
        <div className='flex justify-between items-center'>
            <div className="flex items-center gap-3">
                <img src="./images/logo.svg" width={40} height={40} alt="nav-logo" className='bg-black border rounded'/>
                <h2 className='text-xl md:text-xl font-bold md:font-bold'>Short Note</h2>
            </div>
            <div >
                <ul className='hidden md:flex gap-5 items-center'>
                    <li className='cursor-pointer font-medium' ><Link to={"/"}>Home</Link></li>
                    <li className='cursor-pointer font-medium' ><Link to={"/history"}>History</Link></li>
                    <li className='cursor-pointer font-medium' onClick={()=>setShowModal(true)}>Add Note</li>
                    <li className={`${darkMode ? 'bg-white text-zinc-900' : 'bg-zinc-900 text-white'} px-3 py-2 rounded cursor-pointer`} onClick={()=>setDardkMode(!darkMode)}>{darkMode ? "LightMode" : "DarkMode"}</li>
                </ul>
                <div className={`block md:hidden px-3 py-2 rounded text-xl ${darkMode ? 'bg-zinc-800' : 'bg-zinc-100'}`} onClick={()=>setNavOpen(!navOpen)}>
                    {navOpen ? <FontAwesomeIcon icon={faClose}/> : <FontAwesomeIcon icon={faNavicon}/>}
                </div>
            </div>
        </div>
        {navOpen ? <div className='mt-5'>
            <ul className='flex flex-col gap-5 items-center'>
                    <li className='cursor-pointer font-medium' onClick={()=>setNavOpen(false)}><Link to={"/"}>Home</Link></li>
                    <li className='cursor-pointer font-medium' onClick={()=>setNavOpen(false)}><Link to={"/history"}>History</Link></li>
                    <li className='cursor-pointer font-medium' onClick={addTaskMobile}>Add Note</li>
                    <li className={`${darkMode ? 'bg-white text-zinc-900' : 'bg-zinc-900 text-white'} px-3 py-2 rounded cursor-pointer`} onClick={handleToggleDarkMode}>{darkMode ? "LightMode" : "DarkMode"}</li>
                </ul>
        </div> : ''}
    </div>
  )
}

export default Navbar
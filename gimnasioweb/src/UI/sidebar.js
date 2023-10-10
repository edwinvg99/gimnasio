import React from 'react';
import { NavLink } from 'react-router-dom';
import '../css/sidebar.css'

const Sidebar = () => {
  return ( 
    <div  className="md:w-5/5 xl:w-5/5 bg-gray-800 rounded-md h-full ">
      <div className="p-6">
        <div  id='sidebar'  className="text-5xl font-extrabold text-center mb-10  border-bottom-width: 10px  border-b-4 border-b-violet-900">
            <span className="mb-10 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 " >
                MuscleCraft 
            </span>
        </div>
        <nav id="nav" className="mt-5 flex flex-row justify-around " >
          <NavLink className="text-xl p-1 text-gray-400 auto  hover:text-white hover:border-b-2 border-purple-900 hover:-translate-y-1 hover:scale-110 duration-300"  end to="/">Información del GYM</NavLink>
          <NavLink className="text-xl	p-1 text-gray-400 auto  hover:text-white hover:border-b-2 border-purple-900 hover:-translate-y-1 hover:scale-110 duration-300" end to="/User">Registrar Usuario</NavLink>
          <NavLink className="text-xl p-1 text-gray-400 auto  hover:text-white hover:border-b-2 border-purple-900 hover:-translate-y-1 hover:scale-110 duration-300" end to="/training">Registrar Entrenamiento</NavLink>
          <NavLink className="text-xl p-1 text-gray-400 auto  hover:text-white hover:border-b-2 border-purple-900 hover:-translate-y-1 hover:scale-110 duration-300"  end to="/schedules">Ver Horarios para entrenar</NavLink>


        </nav>
      </div>
    </div>
  );
} 

export default Sidebar;

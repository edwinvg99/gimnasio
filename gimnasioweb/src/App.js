import React from "react";
import { Routes, Route } from "react-router";
import firebase, {FirebaseContext } from './firebase';
import './css/main.css';
import Training from "./components/training";
import User from "./components/User";
import Schedules from "./components/schedules"
import Main from "./components/main"
import UserList from './components/UserList'
import TrainingList from './components/TrainingList'
import Sidebar from './UI/sidebar'


function App() {
  return (
    <FirebaseContext.Provider
      value={{firebase}}
    >
      <div className="flex flex-col min-h-screen bg-slate-800">

        <Sidebar />
      
        <Routes >
          <Route path="/" element={<Main />} />
          <Route path="/User" element={<User />} />
          <Route path="/training" element={<Training />} />
          <Route path="/schedules" element={<Schedules />} />
          <Route path="/UserList" element={<UserList />} />
          <Route path="/trainingList" element={<TrainingList />} />
        </Routes>
      
        <footer id="footer" className="bg-gray-900 text-white p-4 text-center ">
          Edwin Velasquez y Mariana Ospina
        </footer>
      </div>
    </FirebaseContext.Provider>
  );
}

export default App;

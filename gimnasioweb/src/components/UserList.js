import React, { useContext, useEffect, useState } from "react";
import { FirebaseContext } from '../firebase';
import '../css/UserList.css';
import { useNavigate } from 'react-router-dom';

const UserList = () => {
    const navigate = useNavigate();
    const { firebase } = useContext(FirebaseContext);
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersCollection = await firebase.db.collection('users').get();
                const users = usersCollection.docs.map((doc) => doc.data());
                setUserList(users);
            } catch (error) {
                console.error('Error al obtener la lista de usuarios:', error);
            }
        };

        fetchUsers();
    }, [firebase]);


    return (
        <div id="MainList" className="bg-white p-4">

            <h1 id="title" className="text-4xl font-bold text-gray-800 mb-4 text-center">Lista de Usuarios Registrados</h1>

            <div className="bg-red-000 w-full flex flex-wrap ">

                <ul id="luMain" className="w-full flex flex-wrap ">
                    {userList.map((user, index) => (
                        <li id="liMain" className="bg-white rounded-lg shadow-md p-4 mb-4 w-1/5 h-auto m-5" key={index}>
                            <strong className="text-lg text-violet-800">Nombre: {user.user}</strong>
                            <p>Cédula: {user.id}</p>
                            <p>Usuario: {user.userName}</p>
                            <p>Email: {user.email}</p>
                            <button onClick={() => { navigate('/asignar-entrenamiento') }} className="bg-violet-800 text-white px-4 py-2 rounded mt-4 hover:bg-violet-600 hover:scale-105 transition duration-300">
                                Asignar rutina
                            </button>

                           
                        </li>
                    ))}
                </ul>
                
            </div>
            <button id="ButtonExit" onClick={() => { navigate('/User') }} className="bg-violet-800 text-white px-4 py-2 rounded mt-4 hover:bg-violet-600 hover:scale-105 transition duration-300">
                Volver
            </button>
        </div>
    );
};

export default UserList;

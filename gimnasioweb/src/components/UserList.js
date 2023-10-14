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
                const users = usersCollection.docs.map((doc) => ({
                    ...doc.data(),
                    isLocked: false, 
                }));
                setUserList(users);
            } catch (error) {
                console.error('Error al obtener la lista de usuarios:', error);
            }
        };

        fetchUsers();
    }, [firebase]);

    const manejoBloqueo = async (userID) => {
        const userToUpdate = userList.find((user) => user.id === userID);
    
        if (!userToUpdate) {
            console.error(`No se encontró un usuario con ID ${userID}`);
            return;
        }
    
        const newIsBlocked = !userToUpdate.isLocked;
    
        try {
            await firebase.db.collection('users').doc(userID).update({
                isLocked: newIsBlocked
            });
    
            // Actualizar el estado local
            const updatedUserList = userList.map((user) => {
                if (user.id === userID) {
                    return {
                        ...user,
                        isLocked: newIsBlocked
                    };
                }
                return user;
            }
            );
    
            setUserList(updatedUserList);
        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
        }
    }
    
    
    
    return (
        <div id="MainList" className="bg-white p-4">
            <h1 id="title" className="text-4xl font-bold text-gray-800 mb-4 text-center">Lista de Usuarios Registrados</h1>
            <div className="bg-red-000 w-full flex flex-wrap ">
                <ul id="luMain" className="w-full flex flex-wrap ">
                    {userList.map((user) => (
                        <li
                            id="liMain"
                            className="bg-white rounded-lg shadow-md p-4 mb-4 w-1/5 h-auto m-5"
                            key={user.id}
                            style={{
                                backgroundColor: user.isLocked ? 'gray' : 'white',
                                color: user.isLocked ? 'white' : 'black',
                            }}
                        >
                            <strong className="text-lg text-violet-800">Nombre: {user.user}</strong>
                            <p>Cédula: {user.id}</p>
                            <p>Usuario: {user.userName}</p>
                            <p>Email: {user.email}</p>
                            <p>Estado: {user.state ? 'Bloquear' : 'Desbloquear'}</p>

                            <button
                                onClick={() => {
                                    user.isLocked = !user.isLocked; // Cambiar el estado de bloqueo del usuario
                                    
                                    setUserList([...userList]); // Actualizar la lista de usuarios
                                }}
                                className=" m-1 bg-violet-800 text-white px-4 py-2 rounded mt-4 hover:bg-violet-600 hover:scale-105 transition duration-300"
                            >
                                {user.isLocked ? 'Desbloquear' : 'Bloquear'}
                            </button>


                            <button
                                onClick={() => {
                                    navigate('/TrainingList');
                                }}
                                className="m-1 bg-violet-800 text-white px-4 py-2 rounded mt-4 hover:bg-violet-600 hover:scale-105 transition duration-300"
                            >
                                Asignar rutina
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <button
                id="ButtonExit"
                onClick={() => {
                    navigate('/User');
                }}
                className="bg-violet-800 text-white px-4 py-2 rounded mt-4 hover:bg-violet-600 hover:scale-105 transition duration-300"
            >
                Volver
            </button>
        </div>
    );
};

export default UserList;

import React, { useContext, useEffect, useState } from "react";
import { FirebaseContext } from '../firebase';
import { useNavigate } from 'react-router-dom';

const TrainingList = () => {
    const navigate = useNavigate();
    const { firebase } = useContext(FirebaseContext);
    const [trainingList, setTrainingList] = useState([]);

    useEffect(() => {
        const fetchTrainings = async () => {
            try {
                const trainingsCollection = await firebase.db.collection('training').get();
                const trainings = trainingsCollection.docs.map((doc) => doc.data());
                setTrainingList(trainings);
            } catch (error) {
                console.error('Error al obtener la lista de entrenamientos:', error);
            }
        };

        fetchTrainings();
    }, [firebase]);

    return (
        <div id="MainList" className="bg-white p-4 justify-center text-center">
            <h1 id="title" className="text-4xl font-bold text-gray-800 mb-4 text-center">Lista de Entrenamientos Registrados</h1>
                <div className="w-full flex flex-wrap justify-center">
                    {trainingList.map((training, index) => (
                        <div 
                            className="rounded-lg shadow-md p-4 mb-4 w-2/5 h-auto m-5 bg-slate-500"
                            key={index}
                        >
                            <strong className="text-lg text-black bg-slate-500 ">Propósito: {training.purpose}</strong>
                            <p className=" bg-slate-400">Descripción: {training.description}</p>
                            <p className=" bg-slate-300">Categoría: {training.category}</p>
                            <p className=" bg-slate-200">Horario: {training.hours}</p>
                            <p className=" bg-slate-200">Maximo de personas: {training.maxUsers}</p>
    
                        </div>
                    ))}
                </div>
                <button
                    id="ButtonExit"
                    onClick={() => {
                        navigate('/userList');
                    }}
                    className="bg-violet-800 text-white px-4 py-2 rounded mt-4 hover:bg-violet-600 hover:scale-105 transition duration-300"
                >
                    Volver
                </button>
        </div>
    );
};

export default TrainingList;

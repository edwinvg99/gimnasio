import React, { useState } from "react";
import { FixedSizeList as List } from "react-window";

const TrainingList = ({ trainings }) => {
  const [trainingData, setTrainingData] = useState(trainings);

  const clearTrainings = () => {
    setTrainingData([]);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-center">Lista de Entrenamientos</h2>
      {trainingData.length > 0 ? (
        <div>
          <button onClick={clearTrainings} className="bg-red-500 text-white rounded p-2 mb-4">
            Borrar Todos
          </button>
          <List
            height={400}
            itemCount={trainingData.length}
            itemSize={100}
            width={"100%"}
          >
            {({ index, style }) => (
              <div style={style} key={index} className="bg-white p-4 rounded mb-4 shadow-md">
                <h3 className="text-lg font-bold">{trainingData[index].purpose}</h3>
                <p className="text-gray-600">{trainingData[index].category.label}</p>
                <p>{trainingData[index].description}</p>
              </div>
            )}
          </List>
        </div>
      ) : (
        <p>No hay entrenamientos registrados.</p>
      )}
    </div>
  );
}

export default TrainingList;

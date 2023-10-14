import React, { useContext, useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FirebaseContext } from "../firebase";
import { useNavigate } from "react-router-dom";

const Training = () => {  
  const navigate = useNavigate();
  const { firebase } = useContext(FirebaseContext);

  const [trainingCounter, setTrainingCounter] = useState(0);

  useEffect(() => {
    // Consulta el valor actual de trainingCounter en Firestore
    const counterRef = firebase.db.collection("counters").doc("trainingCounter");

    counterRef.get().then((doc) => {
      if (doc.exists) {
        const counterValue = doc.data().value;
        setTrainingCounter(counterValue);
      } else {
        // El contador no existe, crea el documento con valor inicial 1
        counterRef.set({ value: 1 });
        setTrainingCounter(1);
      }
    });
  }, [firebase]);

  const formik = useFormik({
    initialValues: {
      purpose: "",
      description: "",
      category: "",
      hours: "",
      maxUsers: "",
    },
    validationSchema: Yup.object({
      purpose: Yup.string()
        .min(10, "Ingresa el propósito del entrenamiento")
        .required("Este campo es obligatorio")
        .matches(/^[a-zA-Z\s]+$/, "Solo se permiten letras en este campo"),

      description: Yup.string()
        .min(10, "Ingresa una descripción válida del ejercicio")
        .matches(/^[a-zA-Z\s.,]+$/, "Solo se permiten letras en este campo")
        .required("Este campo es obligatorio"),

      category: Yup.string().required("Este campo es obligatorio"),

      hours: Yup.string().required("Este campo es obligatorio"),

      maxUsers: Yup.number()
        .integer("Ingresa un número entero")
        .required("Este campo es obligatorio"),
    }),
    onSubmit: async (training) => {
      try {
        // Utiliza el valor de trainingCounter como ID para el nuevo entrenamiento
        const newTrainingId = trainingCounter;

        // Agrega el campo 'id' al objeto training antes de guardarlo en la base de datos
        training.id = newTrainingId;
        await firebase.db.collection("training").doc(newTrainingId.toString()).set(training);

        // Incrementa el contador en Firestore para el siguiente entrenamiento
        await firebase.db.collection("counters").doc("trainingCounter").set({
          value: newTrainingId + 1,
        });

          navigate("/training");
          window.alert("Entrenamiento Registrado");
      } catch (e) {
        console.log(e);
      }
    },
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div id="trainMain" className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center text-violet-800">
          Registrar Entrenamiento
        </h1>

       
        <form  onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600  ">Propósito del Entrenamiento</label>
              <input
                className="w-full border-2 border-gray-500 rounded p-2"
                id="purpose"
                type="text"
                placeholder="Ingresa el Propósito del entrenamiento"
                value={formik.values.purpose}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
              {formik.touched.purpose && formik.errors.purpose ?(
                  <div>
                    <p className=" text-red-500 flex  justify-center  -mt-3 mb-4"  >{formik.errors.purpose}</p>
                  </div>
                ):null}

          <div className="mb-4">
            <label className="block text-gray-600  ">Maximo de personas</label>
              <input
                className="w-full border-2 border-gray-500 rounded p-2"
                id="maxUsers"
                type="number"
                placeholder="Ingresa el Propósito del entrenamiento"
                value={formik.values.maxUsers}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
              {formik.touched.maxUsers && formik.errors.maxUsers ?(
                  <div>
                    <p className=" text-red-500 flex  justify-center  -mt-3 mb-4"  >{formik.errors.maxUsers}</p>
                  </div>
                ):null}




          <div className="mb-4">
            <label className="block text-gray-600">Descripción del Entrenamiento</label>
              <textarea
                className="w-full border-2 border-gray-500 rounded p-2"
                id="description"
                placeholder="Ingresa la Descripción del entrenamiento"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
              {formik.touched.description && formik.errors.description ?(
                    <div>
                      <p className=" text-red-500 flex  justify-center  -mt-3 mb-4"  >{formik.errors.description}</p>
                    </div>
                  ):null}

          <div className="mb-4">
            <label className="block text-gray-600">Categoría del Gimnasio</label>
              <select
                className="w-full border-2 border-gray-500 rounded p-2"
                id="category"
                value={formik.values.category}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">Selecciona una categoría</option>
                <option value="Cardiovascular">Cardiovascular</option>
                <option value="pesas">Levantamiento de pesas</option>
                <option value="Flexibilidad">Flexibilidad</option>
                <option value="Funcional">Entrenamiento funcional</option>
                <option value="Grupales">Clases grupales</option>
                <option value="Deportes">Deportes</option>
              </select>
          </div>

            {formik.touched.category && formik.errors.category ?(
                  <div>
                    <p className=" text-red-500 flex  justify-center  -mt-3 mb-4"  >{formik.errors.category}</p>
                  </div>
                ):null}

          <div className="mb-4">
            <label className="block text-gray-600">Horario de entrenamiento</label>
              <select
                className="w-full border-2 border-gray-500 rounded p-2"
                id="hours"
                value={formik.values.hours}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">Selecciona una categoría</option>
                <option value="12-2">12-2</option>
                <option value="2-4">2-4</option>
                <option value="4-6">4-6</option>
                <option value="6-8">6-8</option>
            
            
              </select>
            </div>

            {formik.touched.hours && formik.errors.hours ?(
                  <div>
                    <p className=" text-red-500 flex  justify-center  -mt-3 mb-4"  >{formik.errors.hours}</p>
                  </div>
                ):null}
                
          <div className="text-center">
            <input
              className="px-4 py-2 bg-violet-800 text-white rounded cursor-pointer  hover:-translate-y-1 hover:scale-90 duration-300"
              type="submit"
              value="Registrar"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Training;

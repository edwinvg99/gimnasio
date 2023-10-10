import React, { useContext } from "react";
import {useFormik} from 'formik'
import * as Yup from 'yup'
import '../css/user.css'
import {FirebaseContext} from '../firebase'
import {useNavigate} from 'react-router-dom'


const User = () => {
  const navigate = useNavigate();
  const {firebase} = useContext(FirebaseContext)

  //validar los campos o inicializarlos con formik

  const formik = useFormik ({
    initialValues:{
      user:'',
      id:'',
      userName:'',
      email:'',
      password:'',
      state: true
    },
    validationSchema: Yup.object({
      user: Yup.string()
          
          .min(3,'El nombre debe de tener minimo 3 caracteres')
          .matches(/^[a-zA-Z]+$/, 'Solo se permiten letras en este campo')
          .required('El nombre es obligatorio'),

      id:   Yup.number()
          .min(3,'La cedula debe ser de minimo 3 numeros')
          .required('La cedula es obligatoria'),

      userName: Yup.string()
      
          .min(3,'El usuario debe de tener minimo 3 caracteres')
          .required('El usuario es obligatorio'),

      email: Yup.string()
          .required('el correo es obligatorio'),

      password: Yup.string()
          .min(8, 'La contraseña debe tener al menos 8 caracteres')
          .matches(/[A-Z]/, 'Debe contener al menos una letra mayúscula')
          .matches(/[a-z]/, 'Debe contener al menos una letra minúscula')
          .matches(/[0-9]/, 'Debe contener al menos un número')
          .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Puede contener caracteres especiales')
          .required('La contraseña es obligatoria'),
    }),

    onSubmit: async (user) => {
      try {  // Verificar si el nombre de usuario ya existe
        const userNameQuery = await firebase.db
          .collection('users')
          .where('userName', '==', user.userName)
          .get();
        
        // Verificar si el correo electrónico ya existe
        const emailQuery = await firebase.db
          .collection('users')
          .where('email', '==', user.email)
          .get();
        
            
          if (!userNameQuery.empty) {
            window.alert('El nombre de usuario ya está en uso.');
          } else if (!emailQuery.empty) {
            window.alert('El correo electrónico ya está en uso.');
          } else {
            // Si no hay duplicados, agrega el usuario a la base de datos
            await firebase.db.collection('users').add(user);
            //navigate('/');
            window.alert('Usuario registrado');
          }
      } catch (e) {
        console.log(e)
      }
    }
  })


  return (
    <div  className="flex justify-center items-center min-h-screen bg-white">
      <div id="userMain" className="w-full max-w-md p-6  rounded-lg shadow-lg ">

        <form  onSubmit={formik.handleSubmit}>
          <h1 className="text-2xl font-bold mb-4 text-center text-violet-800">Registrar Usuario</h1>

          <div className="mb-4">
            <label className="block text-gray-600 ">Nombre Completo</label>
            <input
              className="w-full border-2 border-gray-500 rounded p-2"
              id="user"
              type="text"
              placeholder="Ingresa el Nombre Completo"
              value={formik.values.user}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
            {formik.touched.user && formik.errors.user ?(
              <div>
                <p className=" text-red-500 flex  justify-center  -mt-3 mb-4"  >{formik.errors.user}</p>
              </div>
            ):null}

          <div className="mb-4">
            <label className="block text-gray-600">Cedula</label>
            <input
              className="w-full border-2 border-gray-500 rounded p-2"
              id="id"
              type="number"
              placeholder="Ingresa la cedula"
              value={formik.values.id}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.touched.id && formik.errors.id ?(
              <div>
                <p className=" text-red-500 flex  justify-center  -mt-3 mb-4" >{formik.errors.id}</p>
              </div>
            ):null}


          <div className="mb-4">
            <label className="block text-gray-600">Nombre de Usuario</label>
            <input
              className="w-full border-2 border-gray-500 rounded p-2"
              id="userName"
              type="text"
              placeholder="Ingresa el nombre de Usuario"
              value={formik.values.userName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
            {formik.touched.userName && formik.errors.userName ?(
                <div>
                  <p className=" text-red-500 flex  justify-center  -mt-3 mb-4" >{formik.errors.userName}</p>
                </div>
              ):null}

          <div className="mb-4">
            <label className="block text-gray-600">Email</label>
            <input
              className="w-full border-2 border-gray-500 rounded p-2"
              id="email"
              type="email"
              placeholder="Ingresa el Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
            {formik.touched.email && formik.errors.email ?(
                  <div>
                    <p className=" text-red-500 flex  justify-center  -mt-3 mb-4" >{formik.errors.email}</p>
                  </div>
                ):null}


          <div className="mb-4">
            <label className="block text-gray-600">Contraseña</label>
            <input
              className="w-full border-2 border-gray-500 rounded p-2"
              id="password"
              type="password"
              placeholder="Ingresa la contraseña"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
            {formik.touched.password && formik.errors.password ?(
                    <div>
                      <p className=" text-red-500 flex  justify-center  -mt-3 mb-4" >{formik.errors.password}</p>
                    </div>
                  ):null}
          

          <div className="text-center flex flex-col p-1" >
            <input
              className="px-4 py-2 bg-violet-800 text-white rounded cursor-pointer  hover:-translate-y-1 hover:scale-90 duration-300 mb-2"
              type="submit"
              value="Registrar"
            />
              <button onClick={()=>{navigate('/UserList')}}               className="px-4 py-2 bg-violet-800 text-white rounded cursor-pointer  hover:-translate-y-1 hover:scale-90 duration-300"
 >
                  Lista usuarios
              </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default User;

import React from "react";
import '../css/card.css'


const Card = (props)=>{
    return(
       <div id="card"  className="    hover:-translate-y-2 hover:scale-15 duration-300">
          <img id="imgCard" src={props.imagenURL} alt={props.titulo} ></img>
          <h1 id="titulo" className=" font-semibold ">{props.titulo}</h1>
          <p className=" text-justify p-5">{props.descripcion}</p>
       </div>
    );
}

export default Card;

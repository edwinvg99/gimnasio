import React from "react";
import '../css/card.css'


const Card = (props)=>{
    return(
       <div id="card"  className="    hover:-translate-y-2 hover:scale-15 duration-300">
          <img id="imgCard" src={props.imageURL} alt={props.title} ></img>
          <h1 id="title" className=" font-semibold ">{props.title}</h1>
          <p className=" text-justify p-5">{props.description}</p>
       </div>
    );
}

export default Card;

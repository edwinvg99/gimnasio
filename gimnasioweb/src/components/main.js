import React from "react";
import '../css/main2.css'
import Card from "./card";
import machine1 from '../image/machin1.jpg';
import machine2 from '../image/machin3.jpg';
import machine3 from '../image/machin4.jpg';
import machine4 from '../image/machin5.jpg';


const Main = () => {
  return (

  <div className=" ">

      <div id="section1" className="flex flex-1   bg-white ">
        <div id="divRigth" className="w-1/4" ></div> 
          <div id="divRigthBanner" className="w-3/4 " ></div>
      </div>

      <div  id="section2" className="flex flex-1 w-full h-full  bg-white ">
          <div id="divLeft" className="w-4/4  " >

            <h1  id="shadow" className="  text-black">¡TRANSFORMA TU CUERPO, TRANSFORMA TU VIDA!</h1>
            <div id="cardSectiones" className="w-full   flex flex-wrap p-10 justify-around " >

              <Card title="Banco multifuncional"   description="Ofrece la versatilidad de realizar una amplia variedad de ejercicios de fuerza, lo que puede contribuir a mejorar la fuerza, resistencia y tonificación muscular de manera efectiva y conveniente."   imageURL={machine1} ></Card>
              <Card title="Banco inclinado"    description="Ofrece la versatilidad de realizar una amplia variedad de ejercicios de fuerza, lo que puede contribuir a mejorar la fuerza, resistencia y tonificación muscular de manera efectiva y conveniente."    imageURL={machine2}></Card>
              <Card title="Banco multifuncional"   description="Ofrece la versatilidad de realizar una amplia variedad de ejercicios de fuerza, lo que puede contribuir a mejorar la fuerza, resistencia y tonificación muscular de manera efectiva y conveniente."   imageURL={machine3}></Card>
              <Card title="Banco inclinado "   description="Ofrece la versatilidad de realizar una amplia variedad de ejercicios de fuerza, lo que puede contribuir a mejorar la fuerza, resistencia y tonificación muscular de manera efectiva y conveniente."   imageURL={machine4}></Card>

              
            </div>
        </div>
      </div>

  </div>
  );
};

export default Main;

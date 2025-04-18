import React from "react";
import thankyou from "../../assets/thankyou.gif";
import QR from "../../assets/qr.jpg";
import { Link } from "react-router-dom";
import Video from "../../assets/videoplayback.mp4"
import "./Bhaichai.css";
function Baychai() {
  return (
    <>
      <span className="dot"></span>
      <span
        className="dot"
        style={{ position: "absolute", left: "0%", top: "0px" }}
      ></span>
      <center>
        {" "}
        <h1> !Thank you bhai !</h1>
        <h3>Niche QR diya bhae :: Chai or Biscuit ka bandobast Karne ke liye :: </h3>
        <h4>Take the ScreenShot and Go On PaymentApp 😅</h4>
        <div className="imgChai">
          
          <img src={QR} alt="NotLoad" width={400} height={400
          }/>

          <img src={thankyou} alt="" style={{marginTop:"20px"}} width={400} height={400
          } />
        </div>
        <Link to={"/"} className="homebutton">Home</Link>
      
      <video
        autoPlay
        loop
        
        playsInline
        style={{ width: "50%", height: "auto",marginTop:"10px" }}
      >
        <source src={Video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
   </center>
    </>
  );
}

export default Baychai;

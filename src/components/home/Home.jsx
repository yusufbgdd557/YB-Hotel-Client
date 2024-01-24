// import React, { useContext } from "react"
// import MainHeader from "../layout/MainHeader"
// import HotelService from "../common/HotelService"
// import Parallax from "../common/Parallax"
// import RoomCarousel from "../common/RoomCarousel"
// import RoomSearch from "../common/RoomSearch"
// import { useLocation } from "react-router-dom"

// const Home = () => {
// 	const location = useLocation()

// 	const message = location.state && location.state.message
// 	const currentUser = localStorage.getItem("userId")
// 	return (
// 		<section>
// 			{message && <p className="text-warning px-5">{message}</p>}
// 			{currentUser && (
// 				<h6 className="text-success text-center"> You are logged-In as {currentUser}</h6>
// 			)}
// 			<MainHeader />
// 			<div className="container">
// 				<RoomSearch />
// 				<RoomCarousel />
// 				<Parallax />
// 				<RoomCarousel />
// 				<HotelService />
// 				<Parallax />
// 				<RoomCarousel />
// 			</div>
// 		</section>
// 	)
// }

// export default Home

// import React, { useContext, useState, useEffect } from "react";
// import MainHeader from "../layout/MainHeader";
// import HotelService from "../common/HotelService";
// import Parallax from "../common/Parallax";
// import RoomCarousel from "../common/RoomCarousel";
// import RoomSearch from "../common/RoomSearch";
// import { useLocation } from "react-router-dom";

// const Home = () => {
//   const location = useLocation();

//   const [message, setMessage] = useState(
//     location.state && location.state.message
//   );
//   const currentUser = localStorage.getItem("userId");

//   useEffect(() => {
//     if (message) {
//       // Set a timeout to hide the message after 3 seconds
//       const timeoutId = setTimeout(() => setMessage(''), 3000);

//       // Clear the timeout when the component is unmounted or when message changes
//       return () => clearTimeout(timeoutId);
//     }
//   }, [message]);

//   return (
//     <section>
//       {message && <p className="text-warning px-5">{message}</p>}
//       {currentUser && (
//         <h6 className="text-success text-center"> You are logged-In as {currentUser}</h6>
//       )}
//       <MainHeader />
//       <div className="container">
//         <RoomSearch />
//         <RoomCarousel />
//         <Parallax />
//         <RoomCarousel />
//         <HotelService />
//         <Parallax />
//         <RoomCarousel />
//       </div>
//     </section>
//   );
// };

// export default Home;

import React, { useContext, useState, useEffect } from "react";
import MainHeader from "../layout/MainHeader";
import HotelService from "../common/HotelService";
import Parallax from "../common/Parallax";
import RoomCarousel from "../common/RoomCarousel";
import RoomSearch from "../common/RoomSearch";

const Home = () => {
  return (
    <section>
      <MainHeader />
      <div className="container">
        <RoomSearch />
        <RoomCarousel />
        <Parallax />
        <RoomCarousel />
        <HotelService />
        <Parallax />
        <RoomCarousel />
      </div>
    </section>
  );
};

export default Home;

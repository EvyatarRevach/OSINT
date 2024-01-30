// import React, { useState, useEffect } from "react";
// import { fromLonLat } from "ol/proj";
// import { Coordinate } from "ol/coordinate";
// import { Point } from "ol/geom";
// import "ol/ol.css";

// import { RMap, ROSM, RLayerVector, RFeature, ROverlay, RStyle } from "rlayers";
// import locationIcon from "../../public/location_on_FILL0_wght400_GRAD0_opsz24.svg";
// import { useQuery } from "@apollo/client";
// import { getNews } from "../functions/getData";

// const Overlays: React.FC = () => {
//   const { loading, data } = useQuery(getNews);
//   const [showEventIcons, setShowEventIcons] = useState(false);

//   useEffect(() => {
//     if (data) {
//       setShowEventIcons(true);
//     }
//   }, [data]);

//   const handleButtonClick = () => {
//     setShowEventIcons(true);
//   };

//   const handleEventClick = (e: any) => {
//     const target = e.target;

//     if (target && target.getGeometry) {
//       const geometry = target.getGeometry();

//       if (geometry) {
//         e.map.getView().fit(geometry.getExtent(), {
//           duration: 250,
//           maxZoom: 15,
//         });
//       }
//     }
//   };

//   return (
//     <div>
//       <button onClick={handleButtonClick}>Show Event Icons</button>

//       <RMap
//         initial={{ center: fromLonLat([35.0, 31.5]), zoom: 8 }}
//       >
//         <ROSM />
//         {showEventIcons && (
//           <RLayerVector zIndex={10}>
//             <RStyle.RStyle>
//               <RStyle.RIcon src={locationIcon} anchor={[0.5, 0.8]} />
//             </RStyle.RStyle>
//             {data &&
//               data.getDetailsWithPosts.map((event: Coordinate, index: number) => (
//                 <RFeature
//                   key={index}
//                   geometry={new Point(fromLonLat(event))}
//                   onClick={(e) => {
//                     const target = e.target;

//                     if (target && target.getGeometry) {
//                       const geometry = target.getGeometry();

//                       if (geometry) {
//                         e.map.getView().fit(geometry.getExtent(), {
//                           duration: 250,
//                           maxZoom: 15,
//                         });
//                       }
//                     }
//                   }}
//                 >
//                   <ROverlay className="example-overlay">
//                     Event {index + 1}
//                     <br />
//                     <em>&#11017; click to zoom</em>
//                   </ROverlay>
//                 </RFeature>
//               ))}
//           </RLayerVector>
//         )}
//       </RMap>
//     </div>
//   );
// };

// export default Overlays;

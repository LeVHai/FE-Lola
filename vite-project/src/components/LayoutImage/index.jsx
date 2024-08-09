// import { Image } from 'antd';
// import React from 'react'
// import './style.scss'
// const LayoutImage = ({image}) => {
//     const displayImages = Array.isArray(image) ? image.slice(0, 5) : [];
//     let containerClass = "image-container";
//     if (displayImages.length === 1) {
//       containerClass += " single-image";
//     } else if (displayImages.length === 2) {
//       containerClass += " double-image";
//     } else if (displayImages.length === 3) {
//       containerClass += " triple-image";
//     } else if (displayImages.length ===4) {
//       containerClass += " quadruple-image";

//     } else if (displayImages.length ===5) {
//       containerClass += " mega-image";
//     }
//   return (
//    <div className='layout-image'>
//      <div className={containerClass}  style={{maxHeight:"20rem"}}>
//     <Image.PreviewGroup>
//       {image.map((img, index) => (
//         <div
//           key={index}
//           className={
//             image.length === 3
//               ? `image${index + 1} image-wrapper`
//               : "image-wrapper"
//           }
//         >
//           <Image
//             height="100%"
//             width="100%"
//             src={img?.url ?img.url : img}
//             className="image-box"
//           />
//         </div>
//       ))}
//     </Image.PreviewGroup>
//   </div>
//    </div>
//   )
// }

// export default LayoutImage
import { Image } from "antd";
import React, { useState } from "react";
import "./style.scss";

const LayoutImage = ({ image ,height = 25}) => {
  const displayImages = Array.isArray(image) ? image.slice(0, 5) : [];

  let containerClass = "image-container";
  if (displayImages.length === 1) {
    containerClass += " single-image";
  } else if (displayImages.length === 2) {
    containerClass += " double-image";
  } else if (displayImages.length === 3) {
    containerClass += " triple-image";
  } else if (displayImages.length === 4) {
    containerClass += " quadruple-image";
  } else if (displayImages.length === 5) {
    containerClass += " mega-image";
  }

  return (
    <div className="layout-image" style={{maxHeight:`${height}rem`}}>
      <div className={containerClass}>
        <Image.PreviewGroup>
          {image.length <= 4 &&
            image.map((img, index) => (
              <div
                key={index}
                className={
                  image.length === 3
                    ? `image${index + 1} image-wrapper`
                    : "image-wrapper"
                }
              >
                <Image
                  height="100%"
                  width="100%"
                  src={img?.url ? img.url : img}
                  className="image-box"
                />
              </div>
            ))}
          {image.length > 4 &&
            image.map((img, index) =>(
                <div key={index} className={index >= 4 ? "hidden" : "image-wrapper"}>
                  {index === 3 && (
                    <div className="show-more">+{image.length - 4}</div>
                  )}
                  <Image style={{objectFit:"cover"}} width={"100%"} height={"100%"} src={img?.url ? img.url : img} className="image-box" />
                </div>
              )
            )}
        </Image.PreviewGroup>
        {/* {additionalImages && (
          <div className="more-images-indicator">
            +{image.length - 4} more
          </div>
        )} */}
      </div>
    </div>
  );
};

export default LayoutImage;

// import { Carousel } from "react-carousel-minimal";

// function App() {
//   const data = [
//     {
//       image:
//         "https://images.unsplash.com/photo-1559225306-3f60aa7b39a3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
//       caption: "Sharing is way caring!",
//     },
//     {
//       image:
//         "https://images.unsplash.com/photo-1608342381036-15657da6bf58?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
//       caption: "The more we share the more we get!",
//     },
//     {
//       image:
//         "https://images.unsplash.com/photo-1582578598774-a377d4b32223?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
//       caption: "Help each other grow!",
//     },
//     {
//       image:
//         "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
//       caption: "Your happiness in other's happiness!",
//     },
//     {
//       image:
//         "https://images.unsplash.com/photo-1518398046578-8cca57782e17?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
//       caption: "Help the one who needs!",
//     },
//   ];

//   const captionStyle = {
//     fontSize: "2em",
//     fontWeight: "bold",
//   };

//   return (
//     <div>
//       <Carousel
//         data={data}
//         time={5000}
//         width="100vw"
//         height="60vh"
//         captionStyle={captionStyle}
//         radius="0px"
//         captionPosition="bottom"
//         automatic={true}
//         dots={true}
//         pauseIconColor="white"
//         pauseIconSize="40px"
//         slideBackgroundColor="darkgrey"
//         slideImageFit="cover"
//         thumbnails={false}
//         thumbnailWidth="100px"
//         style={{
//           textAlign: "center",
//           maxWidth: "100vw",
//           maxHeight: "100vh",
//           margin: "auto",
//         }}
//       />
//     </div>
//   );
// }

// export default App;

import { useState, useEffect } from "react";
import { Carousel } from "react-carousel-minimal";
import AxiosInstance, { host } from "../AxiosInstance";

function CarouselSlider() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AxiosInstance.get("carousel/1/detail/").then((resp) => {
      let imgs = resp.data.carousel_images;
      let img_data = imgs.map((img) => {
        return {
          image: host + img.image,
          caption: img.caption,
        };
      });
      setData(img_data);
      setLoading(false);
    });
  }, []);

  const captionStyle = {
    fontSize: "2em",
    fontWeight: "bold",
  };

  return loading ? (
    ""
  ) : (
    <div>
      <Carousel
        data={data}
        time={5000}
        width="100vw"
        height="60vh"
        captionStyle={captionStyle}
        radius="0px"
        captionPosition="bottom"
        automatic={true}
        dots={true}
        pauseIconColor="white"
        pauseIconSize="40px"
        slideBackgroundColor="darkgrey"
        slideImageFit="cover"
        thumbnails={false}
        thumbnailWidth="100px"
        style={{
          textAlign: "center",
          maxWidth: "100vw",
          maxHeight: "100vh",
          margin: "auto",
        }}
      />
    </div>
  );
}

export default CarouselSlider;

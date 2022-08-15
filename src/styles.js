import bgimage from "./assets/img/image.jpg";
export const box1 = {
  backgroundImage: `url(${bgimage})`,
  height: "100vh",

  /* Center and scale the image nicely */
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};

export const box2 = {
  backgroundColor: "rgba(0, 0, 0, 0.4)",
  padding: {
    xs: "200px 40px",
    sm: "200px 125px",
    md: "200px 250px",
    lg: "200px 300px",
    xl: "200px 500px",
  },
  height: "100vh",
};

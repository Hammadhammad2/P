import axios from "axios";
import { API_KEY } from "../../utils/Constants";

export const getweather = (city) => {
  console.log(city);
  return new Promise((resolve, reject) => {
    axios
      .get("https://api.openweathermap.org/data/2.5/weather", {
        params: {
          lat: city.lat,
          lon: city.lon,
          appid: API_KEY,
        },
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((res) => {
        console.log(res);
        reject(res.response.data.message);
      });
  });
};

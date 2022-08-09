import instance from "../../config/axios";

export const getCitiesRequest = (delayValue, inputValue) => {
  return new Promise((resolve, reject) => {
    if (delayValue !== "" && !inputValue.includes(",")) {
      instance
        .get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${delayValue}.json?limit=5&proximity=ip&types=place%2Cpostcode&language=en&access_token=pk.eyJ1Ijoic2VkaWw0MDk4NyIsImEiOiJjbDVvMmQ4MWEwODd1M2NwZG56OHd0dnA1In0.mC9I7MCmfuu02D9snGFrmw`
        )
        .then((res) => {
          resolve(res.data.features);
        })
        .catch((res) => {
          reject(res.response.data.message);
        });
    }
  });
};


import * as Yup from "yup";
export const modalInitialValues = {
  label: "",
  placeId: "",
  lat: "",
  lon: "",
};


export const CitySchema = Yup.object().shape({
  cities: Yup.array().of(
    Yup.object().shape({
  label: Yup.string().required("Required"),
  lat:  Yup.string().required("Required"),
  lon:  Yup.string().required("Required"),  
  placeId: Yup.string().required("Required"),
    })
  ),
});



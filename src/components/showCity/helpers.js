import * as Yup from "yup";
export const SignUpInitialValues = {
  label: "",
  placeId: "",
  lat: "",
  lon: "",
};

export const SignUpSchema = Yup.object().shape({
  label: Yup.string().required("Please Enter City Name"),
  lat: Yup.number("Please Enter LATITUDE")
    .required("Please Enter LATITUDE ")
    .positive("Please enter Positive digits only"),
  lon: Yup.number("Please Enter LATITUDE")
    .required("Please Enter LATITUDE ")
    .positive("Please enter Positive digits only"),
  placeId: Yup.string().required("Please Enter PLACEID"),
});

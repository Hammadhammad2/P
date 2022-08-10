import * as Yup from "yup";
export const SignUpInitialValues = {
  name: "",
  email: "",
  phoneno: "",
  password: "",
  confirmpassword: "",
};
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const SignUpSchema = Yup.object().shape({
  name: Yup.string().required("Please Enter your name"),
  phoneno: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("A phone number is required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Please Enter your Email"),
  password: Yup.string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  confirmpassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Password must match")
    .required("Provide confirm password"),
});

import * as Yup from "yup";
export const SignUpInitialValues = {
  name: "",
  email: "",
  phoneno: "",
  password: "",
  confirmpassword: "",
};

export const SignUpSchema = Yup.object().shape({
  name: Yup.string().required("Please Enter your name"),
  phoneno: Yup.number("Please Enter digits only")
    .required("Please Enter your Phone no")
    .positive("Please enter Positive digits only")
    .integer("Enter Integer only"),
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

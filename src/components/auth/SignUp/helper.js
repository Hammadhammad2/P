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
  phoneno: Yup.number()
    .typeError("That doesn't look like a phone number")
    .positive("A phone number can't start with a minus")
    .integer("A phone number can't include a decimal point")
    .min(8)
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

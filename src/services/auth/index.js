import instance from "../../config/axios";

export const AuthSignUp = (user) => {
  return new Promise((resolve, reject) => {
    instance
      .post("/SignUp", user)
      .then((res) => {
        resolve(res.data);
      })
      .catch((res) => {
        reject(res.response.data.message);
        console.log(res.response.data.message);
      });
  });
};

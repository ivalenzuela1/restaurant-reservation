import axios from "axios";
import { useContext } from "react";
import { AuthenticationContext } from "../app/context/AuthContext";

const useAuth = () => {
  const { setAuthState } = useContext(AuthenticationContext);
  const signin = async (
    {
      email,
      password,
    }: {
      email: string;
      password: string;
    },
    handleClose: () => void
  ) => {
    setAuthState({
      data: null,
      error: null,
      loading: true,
    });
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/signin",
        {
          email,
          password,
        }
      );

      setAuthState({
        data: response.data,
        error: null,
        loading: false,
      });

      // sign in successful, close dialog
      handleClose();
    } catch (e: any) {
      console.log(e);
      setAuthState({
        data: null,
        error: e.response.data,
        loading: false,
      });
    }
  };
  const signup = async (inputs: AuthInputs, handleClose: () => void) => {
    const { firstName, lastName, phone, city, email, password } = inputs;
    setAuthState({
      data: null,
      error: null,
      loading: true,
    });
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/signup",
        {
          firstName,
          lastName,
          phone,
          city,
          email,
          password,
        }
      );

      setAuthState({
        data: response.data,
        error: null,
        loading: false,
      });

      // sign in successful, close dialog
      handleClose();
    } catch (e: any) {
      console.log(e);
      setAuthState({
        data: null,
        error: e.response.data,
        loading: false,
      });
    }
  };

  return {
    signin,
    signup,
  };
};

export default useAuth;

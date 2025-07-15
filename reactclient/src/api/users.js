const { axiosInstance } = require("./index");

//register user
export const RegisterUser = async (userData) => {
  try {
    const response = await axiosInstance.post("/api/users/register", userData);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const LoginUser = async (userData) => {
  try {
    const response = await axiosInstance.post("/api/users/login", userData);
    return response.data;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};

export const GetCurrentUser = async () => {
  try {
    const response = await axiosInstance.get("/api/users/current");
    return response.data;
  } catch (error) {
    console.error("Error fetching current user:", error);
    throw error;
  }
};

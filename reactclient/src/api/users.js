const {axiosInstance} = require('./index'); 

//register user
export const RegisterUser = async (userData) => {
    try {
        const response = await axiosInstance.post('/api/users/register', userData);
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};
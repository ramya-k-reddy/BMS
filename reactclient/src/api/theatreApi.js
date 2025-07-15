import { axiosInstance } from ".";

export const addTheatre = async (payload) => {
    try {
        const response = await axiosInstance.post("/api/theatres/add-theatre", payload);
                return response.data;
    }
    catch (error) {
        console.error("Error adding theatre:", error);
    }
};

export const getAllTheatresForAdmin = async () => {
    try {
        const response = await axiosInstance.get("/api/theatres/get-all-theatres");
        return response.data;
    } catch (error) {
        console.error("Error fetching theatres:", error);
    }
};

export const getTheatreByOwner = async (ownerId) => {

    try {
        const response = await axiosInstance.get(`/api/theatres/get-theatre-by-owner/${ownerId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching theatres by owner:", error);
    }
};

export const deleteTheatre = async (theatreId) => {
    try {
        const response = await axiosInstance.delete(`/api/theatres/delete-theatre/${theatreId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting theatre:", error);
    }
}

export const updateTheatre = async (theatreId, payload) => {
    try {
        const response = await axiosInstance.put(`/api/theatres/update-theatre/${theatreId}`, payload);
        return response.data;
    } catch (error) {
        console.error("Error updating theatre:", error);
    }
}





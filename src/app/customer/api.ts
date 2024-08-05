import axios from 'axios';
import {IDataType} from "@/app/customer/interface";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    },
});

export const getCustomers = async () => {
    try {
        const response = await axiosInstance("/customers");
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const createCustomer = async (data: IDataType) => {
    try {
        const response = await axiosInstance.post("/customers", data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};


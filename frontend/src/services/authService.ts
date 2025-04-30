import { apiRequest, ENDPOINTS } from './api';

// User authentication
export const userSignup = async (userData: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}) => {
  return apiRequest(ENDPOINTS.USER_SIGNUP, 'POST', userData);
};

export const userSignin = async (credentials: {
  email: string;
  password: string;
}) => {
  return apiRequest(ENDPOINTS.USER_SIGNIN, 'POST', credentials);
};

// Admin authentication
export const adminSignup = async (adminData: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}) => {
  return apiRequest(ENDPOINTS.ADMIN_SIGNUP, 'POST', adminData);
};

export const adminSignin = async (credentials: {
  email: string;
  password: string;
}) => {
  return apiRequest(ENDPOINTS.ADMIN_SIGNIN, 'POST', credentials);
};
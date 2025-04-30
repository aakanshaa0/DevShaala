import { apiRequest, ENDPOINTS } from './api';

// Get all courses (public preview)
export const getAllCourses = async () => {
  return apiRequest(ENDPOINTS.COURSES_PREVIEW);
};

// Get admin's courses
export const getAdminCourses = async (token: string) => {
  return apiRequest(ENDPOINTS.ADMIN_COURSES, 'GET', null, token);
};

// Create a new course
export const createCourse = async (
  courseData: {
    title: string;
    description: string;
    imageUrl: string;
    price: number;
  },
  token: string
) => {
  return apiRequest(ENDPOINTS.CREATE_COURSE, 'POST', courseData, token);
};

// Update an existing course
export const updateCourse = async (
  courseData: {
    courseId: string;
    title?: string;
    description?: string;
    imageUrl?: string;
    price?: number;
  },
  token: string
) => {
  return apiRequest(ENDPOINTS.UPDATE_COURSE, 'PUT', courseData, token);
};

// Purchase a course
export const purchaseCourse = async (courseId: string, token: string) => {
  return apiRequest(ENDPOINTS.PURCHASE_COURSE, 'POST', { courseId }, token);
};

// Get user's purchased courses
export const getUserPurchases = async (token: string) => {
  return apiRequest(ENDPOINTS.USER_PURCHASES, 'GET', null, token);
};
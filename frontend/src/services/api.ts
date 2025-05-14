// Base URL for all API requests
const API_URL = 'http://localhost:3000';

// Define all API endpoints used in the application
const ENDPOINTS = {
  // Admin-specific endpoints
  ADMIN_SIGNUP: `${API_URL}/admin/signup`,      // Create new admin account
  ADMIN_SIGNIN: `${API_URL}/admin/signin`,      // Admin login
  CREATE_COURSE: `${API_URL}/admin/course`,     // Create new course
  UPDATE_COURSE: `${API_URL}/admin/course`,     // Update existing course
  ADMIN_COURSES: `${API_URL}/admin/course/bulk`, // Get all courses for admin
  
  // User-specific endpoints
  USER_SIGNUP: `${API_URL}/user/signup`,        // Create new user account
  USER_SIGNIN: `${API_URL}/user/signin`,        // User login
  USER_PURCHASES: `${API_URL}/user/purchases`,  // Get user's purchased courses
  
  // Course-related endpoints
  COURSES_PREVIEW: `${API_URL}/course/preview`, // Get course preview data
  PURCHASE_COURSE: `${API_URL}/course/purchase`, // Purchase a course
};

/**
 * Helper function to make API requests
 * @param endpoint - The API endpoint to call
 * @param method - HTTP method (GET, POST, PUT, DELETE)
 * @param data - Request body data (for POST/PUT requests)
 * @param token - Authentication token (if user is logged in)
 * @returns Promise with the API response
 */
export const apiRequest = async (
  endpoint: string,
  method: string = 'GET',
  data: any = null,
  token: string | null = null
) => {
  // Set up request headers
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  // Add authentication token if provided
  if (token) {
    headers['token'] = token;
  }

  // Configure request options
  const options: RequestInit = {
    method,
    headers,
    body: data ? JSON.stringify(data) : null,
  };

  try {
    // Make the API request
    const response = await fetch(endpoint, options);
    const result = await response.json();
    
    // Handle error responses
    if (!response.ok) {
      throw new Error(result.message || 'Something went wrong');
    }
    
    return result;
  } catch (error) {
    // Handle and format errors
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Unknown error occurred');
  }
};

// Export the endpoints for use in other components
export { ENDPOINTS };
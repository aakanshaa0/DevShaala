const API_URL = 'http://localhost:3000';

// API Endpoints
const ENDPOINTS = {
  // Admin endpoints
  ADMIN_SIGNUP: `${API_URL}/admin/signup`,
  ADMIN_SIGNIN: `${API_URL}/admin/signin`,
  CREATE_COURSE: `${API_URL}/admin/course`,
  UPDATE_COURSE: `${API_URL}/admin/course`,
  ADMIN_COURSES: `${API_URL}/admin/course/bulk`,
  
  // User endpoints
  USER_SIGNUP: `${API_URL}/user/signup`,
  USER_SIGNIN: `${API_URL}/user/signin`,
  USER_PURCHASES: `${API_URL}/user/purchases`,
  
  // Course endpoints
  COURSES_PREVIEW: `${API_URL}/course/preview`,
  PURCHASE_COURSE: `${API_URL}/course/purchase`,
};

// Helper function for making API requests
export const apiRequest = async (
  endpoint: string,
  method: string = 'GET',
  data: any = null,
  token: string | null = null
) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['token'] = token;
  }

  const options: RequestInit = {
    method,
    headers,
    body: data ? JSON.stringify(data) : null,
  };

  try {
    const response = await fetch(endpoint, options);
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || 'Something went wrong');
    }
    
    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Unknown error occurred');
  }
};

export { ENDPOINTS };
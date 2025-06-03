const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8000/api/v1"
    : "https://talentnest-backend.fly.dev/api/v1";

export const ADMIN_API_END_POINT = `${BASE_URL}/admin`;
export const JOB_API_END_POINT = `${BASE_URL}/job`;
export const BLOG_API_END_POINT = `${BASE_URL}/blog`;
export const APPLICATION_API_END_POINT = `${BASE_URL}/applicants`;

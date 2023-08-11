const BASE_URL = window.origin

export const AuthUrls = {
    LOGIN: BASE_URL + '/login',
    REGISTER: BASE_URL + "/register",
}

export const AdminUrls = {
    DASHBOARD: BASE_URL + '/dashboard',
    CATEGORIES: BASE_URL + "/categories",
    QUESTIONS: BASE_URL + "/questions",
    USERS: BASE_URL + "/users",
}

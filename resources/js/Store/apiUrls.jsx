export const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
}

const BASE_URL = window.origin + '/api/v1'

export const apiUrls = {
    auth: {
        register: BASE_URL + '/register',
        login: BASE_URL + '/login',
        logout: BASE_URL + '/logout',
    },
    summaries: BASE_URL + '/summaries',
    updateProfile: BASE_URL + '/update-profile',
    categories: {
        index: BASE_URL + '/categories',
        show: BASE_URL + '/categories/:id',
    },
    users: {
        index: BASE_URL + '/users',
        show: BASE_URL + '/users/:id',
    },
    questions: {
        index: BASE_URL + '/questions',
        show: BASE_URL + '/questions/:id',
    },
    examinations: {
        index: BASE_URL + '/examinations',
        results: BASE_URL + '/examinations/result',
    },
}

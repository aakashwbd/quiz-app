import { apiUrls, headers } from "../apiUrls"

export const fetchQuestions = async ({ page = 1, offset = 10 }) => {
    let res = await fetch(apiUrls.questions.index + `?page=${page}&offset=${offset}`, {
        method: 'GET',
        headers: {
            ...headers,
        },
    })
    return res.json()
}

export const storeQuestion = async (data = null) => {
    let res = await fetch(apiUrls.questions.index, {
        method: 'POST',
        headers: {
            ...headers,
        },
        body: JSON.stringify(data)
    })
    return res.json()
}

export const updateQuestion = async (data = null) => {
    let res = await fetch(apiUrls.questions.show.replace(":id", data.id), {
        method: 'PATCH',
        headers: {
            ...headers,
        },
        body: JSON.stringify(data)
    })
    return res.json()
}

export const fetchQuestion = async (id = null) => {
    let res = await fetch(apiUrls.questions.show.replace(':id', id), {
        method: 'GET',
        headers: {
            ...headers,
        },
    })
    return res.json()
}

export const fetchQuestionByCategoryid = async (id = null) => {
    let res = await fetch(apiUrls.questions.show.replace(':id', id), {
        method: 'GET',
        headers: {
            ...headers,
        },
    })
    return res.json()
}

export const deleteQuestion = async (id = null) => {
    let res = await fetch(apiUrls.questions.show.replace(":id", id), {
        method: 'DELETE',
        headers: {
            ...headers,
        },
    })
    return res.json()
}

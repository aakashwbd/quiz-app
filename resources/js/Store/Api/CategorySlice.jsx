import { apiUrls, headers } from "../apiUrls"

export const fetchCategories = async ({ page = 1, offset = 10 }) => {
    let res = await fetch(apiUrls.categories.index + `?page=${page}&offset=${offset}`, {
        method: 'GET',
        headers: {
            ...headers,
        },
    })
    return res.json()
}

export const storeCategory = async (data = null) => {
    let res = await fetch(apiUrls.categories.index, {
        method: 'POST',
        headers: {
            ...headers,
        },
        body: JSON.stringify(data)
    })
    return res.json()
}

export const updateCategory = async (data = null) => {
    let res = await fetch(apiUrls.categories.show.replace(":id", data.id), {
        method: 'PATCH',
        headers: {
            ...headers,
        },
        body: JSON.stringify(data)
    })
    return res.json()
}

export const fetchCategory = async (id = null) => {
    let res = await fetch(apiUrls.categories.show.replace(':id', id), {
        method: 'GET',
        headers: {
            ...headers,
        },
    })
    return res.json()
}

export const deleteCategory = async (id = null) => {
    let res = await fetch(apiUrls.categories.show.replace(":id", id), {
        method: 'DELETE',
        headers: {
            ...headers,
        },
    })
    return res.json()
}

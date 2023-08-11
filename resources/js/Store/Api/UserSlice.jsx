import { apiUrls, headers } from "../apiUrls"

export const fetchUsers = async ({ page = 1, offset = 10 }) => {
    let res = await fetch(apiUrls.users.index + `?page=${page}&offset=${offset}`, {
        method: 'GET',
        headers: {
            ...headers,
        },
    })
    return res.json()
}

export const storeUser = async (data = null) => {
    let res = await fetch(apiUrls.users.index, {
        method: 'POST',
        headers: {
            ...headers,
        },
        body: JSON.stringify(data)
    })
    return res.json()
}

export const updateUser = async (data = null) => {
    let res = await fetch(apiUrls.users.show.replace(":id", data.id), {
        method: 'PATCH',
        headers: {
            ...headers,
        },
        body: JSON.stringify(data)
    })
    return res.json()
}
export const updateProfile = async (data = null) => {
    let res = await fetch(apiUrls.updateProfile, {
        method: 'PATCH',
        headers: {
            ...headers,
        },
        body: JSON.stringify(data)
    })
    return res.json()
}

export const fetchUser = async (id = null) => {
    let res = await fetch(apiUrls.users.show.replace(':id', id), {
        method: 'GET',
        headers: {
            ...headers,
        },
    })
    return res.json()
}

export const deleteUser = async (id = null) => {
    let res = await fetch(apiUrls.users.show.replace(":id", id), {
        method: 'DELETE',
        headers: {
            ...headers,
        },
    })
    return res.json()
}

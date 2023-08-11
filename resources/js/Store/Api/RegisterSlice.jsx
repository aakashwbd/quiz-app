import { apiUrls, headers } from "../apiUrls"

export const register = async (data = null) => {
    let res = await fetch(apiUrls.auth.register, {
        method: 'POST',
        headers: {
            ...headers,
        },
        body: JSON.stringify(data)
    })
    return res.json()
}

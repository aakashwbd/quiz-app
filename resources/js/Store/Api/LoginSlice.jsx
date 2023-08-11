import { apiUrls, headers } from "../apiUrls"
import Cookies from 'js-cookie'
export const login = async (data = null) => {
    let res = await fetch(apiUrls.auth.login, {
        method:'POST',
        headers: headers,
        body: JSON.stringify(data)
    })
    return res.json()
}


export const logout = async () => {
    let res = await fetch(apiUrls.auth.logout, {
        method:'POST',
        headers: {
            ...headers,
            Authorization: JSON.parse(Cookies.get('authToken'))
        },
    })
    return res.json()
}

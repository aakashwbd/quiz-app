import { apiUrls, headers } from "../apiUrls"
import Cookies from 'js-cookie'

export const storeExamination = async (data = null) => {
    let res = await fetch(apiUrls.examinations.index, {
        method: 'POST',
        headers: {
            ...headers,
            Authorization: JSON.parse(Cookies.get('authToken'))
        },
        body: JSON.stringify(data)
    })
    return res.json()
}



export const fetchResults = async ({ exam_id, user_id }) => {
    let res = await fetch(apiUrls.examinations.results + `?exam_id=${exam_id}&user_id=${user_id}`, {
        method: 'GET',
        headers: {
            ...headers,
        },
    })
    return res.json()
}

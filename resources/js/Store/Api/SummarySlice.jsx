import { apiUrls, headers } from "../apiUrls"

export const fetchSummary = async () => {
    let res = await fetch(apiUrls.summaries, {
        method: 'GET',
        headers: {
            ...headers,
        },
    })
    return res.json()
}

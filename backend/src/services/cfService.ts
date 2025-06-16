import axios from "axios"

export async function fetchUserRating(handle: string) {
    const url = `https://codeforces.com/api/user.rating?handle=${handle}`
    const res = await axios.get(url)
    if (res.data.status !== "OK") throw new Error("Failed to fetch rating")
    return res.data.result   //array of contest rating history
}

export async function fetchUserSubmissions(handle: string) {
    const url = `https://codeforces.com/api/user.status?handle=${handle}`
    const res = await axios.get(url)
    if (res.data.status !== "OK") throw new Error("Failed to fetch submissions")
    return res.data.result  //array of submissions
}
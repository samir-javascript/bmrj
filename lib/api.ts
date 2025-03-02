import { fetchHandler } from "./handlers/fetch"

const API_BASE_URL = 'http://localhost:3000/api'
export const api = {
    users: {
        getByEmail: (email:string) => fetchHandler(`${API_BASE_URL}/users/emailProvider`, {
             method: "POST",
             body: JSON.stringify(email)
        })
    }
}
import {API} from "../backend";

export const getPrevResults = (userId, token) => {
    return fetch(`${API}/results/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          }
    })
    .then((res) => {
        return res.json()
    })
    .catch((err) => console.log(err))
}
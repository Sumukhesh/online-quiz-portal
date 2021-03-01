import {API} from "../backend";

export const  getQuizById = (userId, difficultyLevel, token) => {
    return fetch(`${API}/quiz/${userId}/${difficultyLevel}`, {
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

export const getResultByQuizId = (userId, quizId, token, userResponses) => {
    return fetch(`${API}/quiz/${userId}/${quizId}`,{
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userResponses)
            })
    .then((res) => {
        return res.json()
    })
    .catch((err) => console.log(err))
}
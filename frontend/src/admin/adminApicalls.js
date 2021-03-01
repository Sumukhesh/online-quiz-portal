import {API} from '../backend'
export const createAQuiz = (userId, token, quiz) => {
    return fetch(`${API}/quiz/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: quiz
    })
    .then((res) => res.json())
    .catch((err) => console.log(err))
}

export const getAllQuizzes = (userId, token) => {
    return fetch(`${API}/quizes/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    })
    .then((res) => res.json())
    .catch((err) => console.log(err))
}

const URL = 'http://localhost:8000/api'

export const register = (data) => {
    return fetch(`${URL}/user/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
}

export const login = (data) => {
    return fetch(`${URL}/user/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
}

export const getUser = (data) => {
    return fetch(`${URL}/user/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `${localStorage.getItem('token')}`
        },
        body: JSON.stringify(data),
    })
}
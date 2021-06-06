
const saveToken = (token) => {
    sessionStorage["token"] = token
}

const getToken = () => {
    return sessionStorage["token"]
}

export {
    getToken,
    saveToken
}
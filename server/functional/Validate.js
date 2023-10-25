
const checkName = (username) => {
    const r = /^[a-z][^\W_]{4,14}$/
    return r.test(username)
}

const checkPass = (password) => {
    const r = /^(?=[^a-z]*[a-z])(?=\D*\d)[^:&.~\s]{5,20}$/
    return r.test(password)
}

const checkEmail = (email) => {
    const r = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/
    return r.test(email)
}

export {checkName, checkPass, checkEmail}
import { v4 } from "uuid";

export const loginUserInput = (email, password) => ({
    clientMutationId: v4(),
    username: email,
    password
})

export const refreshJwtAuthTokenInput = jwtRefreshToken => ({
    clientMutationId: v4(),
    jwtRefreshToken
})

export const registerUserInput = (username, email, password,gender) => ({
    clientMutationId: v4(),
    username,
    email,
    password,
    gender
})

export const registerCustomerMetaInput = (username, email, password, gender, lang) => {

    return {
        clientMutationId: v4(),
        username,
        email,
        password,
        metaData: [
            { key: "gender", value: gender },
            { key: "lang", value: lang }
        ],
    }
}

export const verifyCustomerInput = (id, code) => {
    return {
        clientMutationId: v4(),
        id,
        code
    }
}

export const resendCodeInput = (id) => {
    return {
        clientMutationId: v4(),
        id,
    }
}
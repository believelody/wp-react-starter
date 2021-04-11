import { useMutation } from '@apollo/client'
import React, { useState, useContext, useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { refreshJwtAuthTokenInput } from '../graphql/inputs/user.input'
import { REFRESH_TOKEN_MUTATION } from '../graphql/mutations/auth/refreshToken.mutation'

export const INITIAL_CHECKOUT = {
    cart: null,
    shipping: null,
    billing: null,
    isBillingSameAsShipping: true,
    payment: { id: "stripe" },
}

export const INITIAL_AUTH = {
    isLogged: false,
    isGuest: false,
    isGuestEdited: true,
    user: null,
    guest: null,
    token: null,
    refreshToken: null
}

export const AppContext = React.createContext()


export const AppProvider = props => {
    const history = useHistory()
    const [checkout, setCheckout] = useState(INITIAL_CHECKOUT)
    const [auth, setAuth] = useState(INITIAL_AUTH)
    const [modal, setModal] = useState(null)
    const [toast, setToast] = useState(null)
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState(null)

    const updateCheckout = data => {
        setCheckout(prevState => {
            const newState = { ...prevState, ...data }
            localStorage.setItem("woo-checkout", JSON.stringify(newState))
            return newState
        })
    }

    const updateAuth = data => {
        setAuth(prevState => {
            const newState = { ...prevState, ...data }
            localStorage.setItem("woo-auth", JSON.stringify(newState))
            return newState
        })
    }

    const logout = () => {
        localStorage.removeItem("woo-auth")
        setAuth(INITIAL_AUTH)
        history.replace("/")
    }

    // const [refreshJwtAuthToken, { data }] = useMutation(REFRESH_TOKEN_MUTATION, {
    //     variables: {
    //         input: refreshJwtAuthTokenInput(auth.refreshToken)
    //     },
    //     onError: error => console.log(JSON.stringify(error))
    // })

    // const refreshAuth = useCallback(error => {
    //     if (error.message === "Expired token" || error?.debugMessage?.includes("invalid-jwt")) {
    //         console.log(error);
    //         refreshJwtAuthToken()
    //         if (data) {
    //             updateAuth({ token: data?.refreshJwtAuthToken.authToken })
    //             return true
    //         }
    //         return false
    //     }
    //     console.log("test");
    // }, [data, refreshJwtAuthToken])
    
    useEffect(() => {
        if (JSON.stringify(INITIAL_CHECKOUT) !== localStorage.getItem("woo-checkout") && !checkout.cart && !checkout.billing && !checkout.shipping && localStorage.getItem("woo-checkout")) {
                setCheckout(JSON.parse(localStorage.getItem("woo-checkout")))
            }
    }, [checkout])

    useEffect(() => {
        if (localStorage.getItem("woo-auth")) {
            let {user, token} = JSON.parse(localStorage.getItem("woo-auth"))
            if (auth?.user !== user && auth?.token !== token) {
                setAuth(JSON.parse(localStorage.getItem("woo-auth")))
            }
        }
    }, [auth])

    return (
        <AppContext.Provider
            value={{
                contextAuth: [auth, {updateAuth, logout}],
                contextModal: [modal, setModal],
                contextToast: [toast, setToast],
                contextLoading: [loading, setLoading],
                contextError: [errors, setErrors],
                contextCheckout: [checkout, updateCheckout]
            }}
        >
            {props.children}
        </AppContext.Provider>
    )
}

export const useContextApp = () => useContext(AppContext)
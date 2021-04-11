import { useCallback, useEffect, useState } from "react"

export const useFormValidation = formRef => {
    const [errors, setErrors] = useState({})
    const isFormValid = !Object.values(errors).some(error => error?.length)

    const updateErrors = useCallback(newError => {
        setErrors(prevState => ({ ...prevState, ...newError }))
    }, [])

    const handleInputTarget = useCallback(target => {
        console.log(target)
        let isValid = target.checkValidity()
        if (isValid) {
            if (errors?.hasOwnProperty(target.name)) {
                setErrors(prevState => ({...prevState, [target.name]: []}))
            }
        }
        else {
            let invalids = []
            for (let key in target.validity) {
                if (target.validity[key] && !target.validity.valid) {
                    invalids.push(key)
                }
            }
            updateErrors({
                [target.name]: invalids
            })
        }
    }, [errors, updateErrors])

    useEffect(() => {
        if (!errors && formRef?.current.elements) {
            const { elements } = formRef.current
            for (let element of elements) {
                if (element.tagName === "INPUT") {
                    handleInputTarget(element)
                }
            }
        }
    }, [errors, formRef, handleInputTarget])

    console.log(errors)

    return [{ errors, isFormValid }, {handleInputTarget, updateErrors, setErrors }]
}
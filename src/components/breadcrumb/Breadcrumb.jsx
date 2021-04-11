import React from 'react'
import { Link, useHistory } from 'react-router-dom'

export const setBreadcrumbs = (url, translate, updateKey = null) => {
    let tab = []
    let splits = url.split("/").slice(1)
    // const history = useHistory()

    splits.forEach((split) => {
        tab.push({
            key: tab.length ? tab.map(item => item.key).join(".").concat(`.${split}`) : split,
            path: tab.map(item => item.path).join("/").concat(`/${split}`),
            name: updateKey?.slug && split === updateKey?.slug ? updateKey?.name : translate(`routes.${split}`)
        })
    })
    return tab
}

const Breadcrumb = ({ objSlugs }) => {
    const lastSlug = objSlugs.pop()
    return (
        <section className="p-3 bg-light border">
            <ul className="d-flex">
                {
                    objSlugs
                        .map(objSlug => (
                            <li key={objSlug.key}>
                                <Link to={objSlug.path}>
                                    {objSlug.name}
                                </Link>
                                <span className="mx-2">{">"}</span>
                            </li>
                        ))
                        .concat(<li key={lastSlug.key}>{lastSlug.name}</li>)
                }
            </ul>
        </section>
    )
}

export default Breadcrumb

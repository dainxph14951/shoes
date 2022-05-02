import React from 'react'
import { Navigate } from 'react-router-dom'

type Props = {
    children: JSX.Element
}

const Checked = (props: Props) => {
const id = JSON.parse(localStorage.getItem("user") as any).user.id
if (id == "1") {
    return props.children
} else {
    return <Navigate to={'/'} />
}
}

export default Checked
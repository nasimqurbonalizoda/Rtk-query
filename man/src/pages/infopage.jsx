import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const API = "http://37.27.29.18:8001/api/categories"

const Infopage = () => {
    const { id } = useParams()
    const [Loading, setloading] = useState(true)
    const [data, setdata] = useState(null)
    const navigate = useNavigate()

    async function getuser() {
        try {
            let res = await fetch(`${API}/${id}`)
            let data = await res.json()
            setdata(data.data)
        } catch (error) {
            console.error(error);
        } finally {
            setloading(false)
        }

    }
    useEffect(() => {
        getuser()
    }, [])

    if (Loading) {
        return null
    }

    return (
        <div>
            <h1>{data?.name}</h1>
            <button onClick={()=> navigate(-1)}>go back</button>
        </div>
    )
}

export default Infopage

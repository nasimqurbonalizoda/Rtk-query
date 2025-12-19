import React, { useState } from 'react'
import { useAddpokemonMutation, useDeletepokemonMutation, useEditpokemonMutation, useGetuserpokemonQuery, } from '../services/rokemon'
import { useNavigate } from 'react-router-dom'

const RtkCategori = () => {
    const navigate=useNavigate()
    const { data, error, isLoading } = useGetuserpokemonQuery()
    const [deleted] = useDeletepokemonMutation()
    const [edituser] = useEditpokemonMutation()
    const [adduser] = useAddpokemonMutation()
    //   const [chexbox] = useChexboxpokemonMutation()

    const [editname, setEditname] = useState("")
    const [editdesc, setEditdesc] = useState("")
    const [editidx, setEditidx] = useState(null)
    const [editmodal, setEditmodal] = useState(false)
    const [addname, setAddname] = useState("")
    const [adddesc, setAdddesc] = useState("")
    const [addmodal, setAddmodal] = useState(false)
    const [search, setSearch] = useState("")
    const [filtered, setFiltered] = useState("all")
    console.log(data);

    function openemodal(el) {
        setEditdesc(el.description)
        setEditname(el.name)
        setEditidx(el.id)
        setEditmodal(true)
    }

    const editeded = () => {
        let edited = {
            id: editidx,
            name: editname,
            description: editdesc,
        }
        edituser(edited)
        setEditmodal(false)
    }


    function addtodo() {
        let neuser = {
            name: addname
        }
        adduser(neuser)
        setAddmodal(false)
    }


    return (
        <div>
            <button onClick={() => setAddmodal(true)}>adduser</button>
            <input type="search" placeholder='search..' value={search} onChange={(el) => setSearch(el.target.value)} />
            <select value={filtered} onChange={(el) => setFiltered(el.target.value)}>
                <option value="all">All</option>
                <option value="true">Active</option>
                <option value="false">Inactive</option>
            </select>
            {
                addmodal && (
                    <dialog open>
                        <input type="text" value={addname} onChange={(el) => setAddname(el.target.value)} />
                        <input type="text" value={adddesc} onChange={(el) => setAdddesc(el.target.value)} />
                        <button onClick={addtodo}>add</button>
                        <button onClick={() => setAddmodal(false)}>cancel</button>
                    </dialog>
                )
            }
            {
                editmodal && (
                    <dialog open>
                        <input type="text" value={editname} onChange={(el) => setEditname(el.target.value)} />
                        <input type="text" value={editdesc} onChange={(el) => setEditdesc(el.target.value)} />
                        <button onClick={editeded}>edit</button>
                        <button onClick={() => setEditmodal(false)}>cancel</button>
                    </dialog>
                )
            }
            {error ? (
                <>Oh no, there was an error</>
            ) : isLoading ? (
                <>Loading...</>
            ) : data ? (
                <>
                    {data?.data
                        ?.filter((el) => {
                            if (filtered === "all") return true
                            if (filtered === "true") return el.isCompleted === true
                            if (filtered === "false") return el.isCompleted === false
                            return true
                        })
                        ?.filter((el) => el.name.toLowerCase().includes(search.toLowerCase()))
                        ?.map((el) => {
                            return (
                                <div key={el.id} >
                                    <h1>{el.name}</h1>
                                    <h1>{el.description}</h1>
                                    <h1 style={{ color: el.isCompleted ? "green" : "red" }}>{el.isCompleted ? "active" : "inactive"}</h1>
                                    <button onClick={() => deleted(el.id)}>delete</button>
                                    <button onClick={() => openemodal(el)}>edit</button>
                                    <button onClick={()=> navigate(`/infopage/${el.id}`)}>info</button>
                                    <hr />
                                </div>
                            )
                        })}

                </>
            ) : null}
        </div>
    )
}

export default RtkCategori


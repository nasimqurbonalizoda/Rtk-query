import React, { useState } from 'react'
import { useAddpokemonMutation, useChexboxpokemonMutation, useDeleteimgpokemonMutation, useDeletepokemonMutation, useEditpokemonMutation, useGetPokemonByNameQuery } from '../services/pokeman'
import { useNavigate } from 'react-router-dom'

const RtkTodos = () => {
  const { data, error, isLoading } = useGetPokemonByNameQuery()
  const [deleted] = useDeletepokemonMutation()
  const [edituser] = useEditpokemonMutation()
  const [adduser] = useAddpokemonMutation()
  const [chexbox] = useChexboxpokemonMutation()
  const [deleteimg] = useDeleteimgpokemonMutation()
  const navigate=useNavigate()

  const [editname, setEditname] = useState("")
  const [editdesc, setEditdesc] = useState("")
  const [editidx, setEditidx] = useState(null)
  const [editmodal, setEditmodal] = useState(false)
  const [addname, setAddname] = useState("")
  const [adddesc, setAdddesc] = useState("")
  const [addimg, setAddimg] = useState(null)
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
    const formdata = new FormData()
    formdata.append("Name", addname)
    formdata.append("Description", adddesc)
    formdata.append("Images", addimg)
    adduser(formdata)
    setAddmodal(false)
  }


  return (
    <div>
      <button onClick={() => setAddmodal(true)}>adduser</button>
      <input type="search"placeholder='search..' value={search} onChange={(el)=> setSearch(el.target.value)} />
      <select value={filtered} onChange={(el)=> setFiltered(el.target.value)}>
        <option value="all">All</option>
        <option value="true">Active</option>
        <option value="false">Inactive</option>
      </select>
      {
        addmodal && (
          <dialog open>
            <input type="text" value={addname} onChange={(el) => setAddname(el.target.value)} />
            <input type="text" value={adddesc} onChange={(el) => setAdddesc(el.target.value)} />
            <input type="file" onChange={(el) => setAddimg(el.target.files[0])} />
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
          {data.data
          .filter((el)=>{
            if(filtered==="all")return true
            if(filtered==="true")return el.isCompleted===true
            if(filtered==="false")return el.isCompleted===false
            return true
          })
          .filter((el)=>el.name.toLowerCase().includes(search.toLowerCase()))
          .map((el) => {
            return (
              <div key={el.id} >
                <h1>{el.name}</h1>
                <h1>{el.description}</h1>
                <h1 style={{ color: el.isCompleted ? "green" : "red" }}>{el.isCompleted ? "active" : "inactive"}</h1>
                {
                  el.images.map((ele) => {
                    return (
                      <div key={ele.id} >
                        <img src={`http://37.27.29.18:8001/images/${ele.imageName}`} alt="" width={200} height={200} />
                        <button onClick={() => deleteimg(ele.id)}>deletimg</button>
                      </div>
                    )
                  })
                }
                <button onClick={() => deleted(el.id)}>delete</button>
                <button onClick={() => openemodal(el)}>edit</button>
                <input type="checkbox" checked={el.isCompleted} onChange={() =>
                    chexbox({ id: el.id, isCompleted: !el.isCompleted })}/>
                    <button onClick={()=> navigate(`/infobyid/${el.id}`)}>info</button>
                <hr />
              </div>
            )
          })}

        </>
      ) : null}
    </div>
  )
}

export default RtkTodos


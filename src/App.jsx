import { useState,useEffect } from 'react'
import Navbar from './components/navbar.jsx'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';
import Footer from './components/Footer.jsx';


const App = () => {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showfinished, setshowfinished] = useState(true)
  const [isEdit, setIsEdit] = useState(false)
  const [editId, setEditId] = useState(null)
  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])
  

 const saveToLS = (first) => { localStorage.setItem ("todos", JSON.stringify(todos))
 }
  const togglefinished = (e) => {
    setshowfinished(!showfinished)
  }
  const handleEdit = (e, id) => {
    let t = todos.find(item => item.id === id)

    setTodo(t.todo)
    setIsEdit(true)
    setEditId(id)
    saveToLS()
  }
  const handleUpdate = () => {
    let updatedTodos = todos.map(item => {
      if (item.id === editId) {
        return { ...item, todo }
      }
      return item
      
    })

    setTodos(updatedTodos)
    setTodo("")
    setIsEdit(false)
    setEditId(null)
    saveToLS()
  }

  const handleDelete = (e, id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this todo?");

    if (confirmDelete) {
      let newTodos = todos.filter(item => item.id !== id);
      setTodos(newTodos);
      saveToLS()
    }
  }

  const handleAdd = () => {
    if (!todo.trim()) return;
    setTodos([...todos, { id: uuidv4(), todo, iscompleted: false }])
    setTodo("")
    saveToLS()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => item.id === id)
    let newTodos = [...todos];
    newTodos[index].iscompleted = !newTodos[index].iscompleted;
    setTodos(newTodos)
    saveToLS()
  }

  return (
    <>
      <Navbar />
      <div className='mx-3 md:container md:mx-auto my-5 p-5 rounded-xl bg-violet-300 min-h-[80vh] md:w-1/2'>
      <h1 className='font-bold text-center text-2xl'>Your Daily Life Task In One Place</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className='text-xl font-bold '>Add a Todo</h2>
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className='w-full bg-white rounded-full px-5 py-1 '
          />
          {isEdit ? (
            <button onClick={handleUpdate}
              className='bg-green-700 hover:bg-green-900 p-2 py-1 cursor-pointer font-bold text-white rounded-xl'>
              Update
            </button>
          ) : (
            <button onClick={handleAdd}
              className='bg-violet-700 hover:bg-amber-950 p-2 py-1 cursor-pointer font-bold text-white rounded-xl'>
              Save
            </button>
          )}

        </div>
        <input onChange={togglefinished} type="checkbox" className="scale-150" checked={showfinished}/> <span className='font-bold text-xl'>Show Finished Tasks</span>

        <h2 className='text-lg font-bold'>Your todos</h2>
        <div className="todos">

          {todos.length === 0 && (
            <p className='my-5'>No todos available. Please add some tasks.</p>
          )}

          {todos.map(item => (
         (showfinished || !item.iscompleted) && <div
              key={item.id}
              className="todo flex justify-between md:w-[50%]  my-3 bg-black text-white p-3 rounded-md"
            >
              <div className='flex gap-5'>
                <input
                  name={item.id}
                  onChange={handleCheckbox}
                  type="checkbox"
                  checked={item.iscompleted}
                />
                <div className={item.iscompleted ? "line-through" : ""}>
                  {item.todo}
                </div>
              </div>

              <div className="buttons flex h-full">
                <button
                  onClick={(e) => handleEdit(e, item.id)}
                  className='bg-green-700 hover:bg-black-950 p-2 py-1 cursor-pointer font-bold text-white rounded-md mx-1'
                >
                  <FaEdit />
                </button>

                <button
                  onClick={(e) => handleDelete(e, item.id)}
                  className='bg-red-800 hover:bg-black-950 p-2 py-1 cursor-pointer font-bold text-white rounded-md mx-1'
                >
                 <MdDelete />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default App

import { mongo } from "mongoose"


const Todo = ({ id, title, description , isCompleted , mongoId , deleteTodo ,completeTodo}) => {
  return (
    <>
      <tr className=" text-slate-700 border-b">
        <td  className="px-6 py-4 font-medium">
          {id + 1}
        </td>
        <td className="px-6 py-4">
          {title}
        </td>
        <td className="px-6 py-4">
          {description}
        </td>
        <td className="px-6 py-4">
          {isCompleted ? "Completed" : "Pending"}
        </td>
        <td className="px-6 py-4 gap-3">
          <button  onClick={()=>completeTodo(mongoId)}  className="font-medium bg-green-400 text-white mr-2 rounded-md px-2 py-1 ">Done</button>
          <button onClick={()=>deleteTodo(mongoId)}  className="font-medium bg-red-600 text-white rounded-md ml-1 px-2 py-1" >Delete</button>
        </td>
      </tr>
    </>

  )
}

export default Todo

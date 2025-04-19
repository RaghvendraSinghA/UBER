import './List.css'
import axios from 'axios'
import {toast} from 'react-toastify'
import {useState,useEffect} from 'react'

const List = ()=>{
    const url='http://localhost:4000'
    const [list,setList]=useState([])

    const fetchList=async()=>{
        const response=await axios.get(`${url}/api/food/list`)
        console.log(response)
        if(response.data.success){
            setList(response.data.data)
        }else{
            toast.error("Error")
        }
    }
    useEffect(()=>{
        fetchList()
    },[])
    const removeFood=async(id)=>{
        const response=await axios.post(`${url}/api/food/remove`,{id:id})
        await fetchList() //hide this line and see magic,new updated list will be not rendered
        if(response.data.success){
            toast.success(response.data.message)
        }else{
            toast.error("Error")
        }
    }


    return(
    <div className="list add flex-col">
        <p>All food list</p>
        <div className="list-table">
            <div className="list-table-format title">
                <b>Image</b>
                <b>name</b>
                <b>Category</b>
                <b>Price</b>
                <b>Action</b>
            </div>
            {list.map((item,index)=>{
                return(
                    <div key={index} className='list-table-format'>
                            <img src={`${url}/images/`+item.image} alt="" />
                            <p>{item.name}</p>
                            <p>{item.category}</p>
                            <p>4{item.price}</p>
                            <p onClick={(e)=>removeFood(item._id)} className="cursor">x</p>
                    </div>
                )
            })}
        </div>

    </div>)
}

export default List
import React, { useContext, useState } from 'react'
import { Appcontext } from '../../context/AppContext'
import { useNavigate } from 'react-router-dom';

const Create = () => {

    const [formData,setFormData] =useState({
        title:'',
        body:''
    })

    const {token,user} = useContext(Appcontext);
    const[errors, setErrors]= useState()
    const handleChange= (e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})

    }
    const navigate = useNavigate();
    const handleCreate= async(e)=>{
        e.preventDefault();

        const res = await fetch('api/posts',{
            method:'post',
            headers:{
                Authorization:`Bearer ${token}`,
            },
            body:JSON.stringify(formData),

        })

        const data = await res.json();
        console.log("post",data)
        console.log("user",user)
        console.log("token",)
        if(data.errors){
            setErrors(data.errors)
        }
        else{
            navigate('/');
        }

    }
  return (
    <>
          <h1 className="title">Create a new post</h1>

          <form onSubmit={handleCreate} className="w-1/2 mx-auto space-y-6">
              <div>
                  <input
                      type="text"
                      name='title'
                      placeholder="Post Title"
                      value={formData.title}
                      onChange={handleChange}
                  />
              </div>

              <div>
                  <textarea
                      rows="6"
                      name='body'
                      placeholder="Post Content"
                      value={formData.body}

                      onChange={handleChange}
                  ></textarea>
              </div>

              <button className="primary-btn">Create</button>
          </form>


    </>
  )
}

export default Create
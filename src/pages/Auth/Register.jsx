import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Appcontext } from '../../context/AppContext';

const Register = () => {


    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    })
    const {setToken} = useContext(Appcontext);

    const [errors,setError]= useState({})

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })

    }

    const handleRegister = async (e) => {
        e.preventDefault();
       
       

        const res = await fetch('api/register', {
            method: 'post',
            body: JSON.stringify(formData)
        })
        const data = await res.json();
        if (data.errors){
            setError(data.errors)
        }
        else{
            localStorage.setItem('token',data.token);
            setToken(data.token);
            navigate('/');
            
        }


    }


    return (
        <>
            <h1 className='title' >Register to your account</h1>
            <form onSubmit={handleRegister} className='w-1/2 mx-auto space-y-6'>
                <div>
                    <input type='text' placeholder='Name' name='name' value={formData.name} onChange={handleChange}  />
                    {errors.name&& <p className='error'>{errors.name[0]}</p>}
                </div>
                <div>
                    <input type='email' placeholder='email' name='email' value={formData.email} onChange={handleChange} />
                    {errors.email && <p className='error'>{errors.email[0]}</p>}
                </div>
                <div>
                    <input type='password' placeholder='password' name='password' value={formData.password} onChange={handleChange} />
                    {errors.password && <p className='error'>{errors.password[0]}</p>}
                </div>
                <div>
                    <input type='password' placeholder='confirm password' name='password_confirmation' value={formData.confirm_password} onChange={handleChange}  />
                    {errors.password_confirmation && <p className='error'>{errors.password_confirmation[0]}</p>}
                </div>
                <button className='primary-btn'>Register</button>

            </form>



        </>
    )
}

export default Register


import React, { useContext, useState } from 'react'
import { Appcontext } from '../../context/AppContext'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const {setToken} = useContext(Appcontext);
    const [errors, setErrors]= useState({});
    const navigate = useNavigate();


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleLogin = async (e) => {
        e.preventDefault();
        const res = await fetch('api/login',{
            method:'post',
            body:JSON.stringify(formData)

        })

        const data = await res.json();
        if (data.errors){
            setErrors(data.errors);
        }
        else{
            localStorage.setItem('token',data.token);
            setToken(data.token);
            // setUser(data);
            navigate("/");
        }


    }
    return (
        <>
            <h1 className='title'>Log in to your account</h1>
            <>
                <form onSubmit={handleLogin} className='w-1/2 mx-auto space-y-6'>

                    <div>
                        <input type='email' placeholder='email' name='email' value={formData.email} onChange={handleChange} />
                        {errors.email && <p className='error'>{errors.email[0]}</p>}
                    </div>
                    <div>
                        <input type='password' placeholder='password' name='password' value={formData.password} onChange={handleChange} />
                        {errors.password && <p className='error'>{errors.password[0]}</p>}
                    </div>

                    <button className='primary-btn'>Login</button>

                </form>



            </>


        </>
    )
}

export default Login



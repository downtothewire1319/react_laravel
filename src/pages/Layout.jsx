import React, { useContext } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { Appcontext } from '../context/AppContext'

const Layout = () => {

    const { token, setToken, user, setUser } = useContext(Appcontext);
    const navigate = useNavigate();
    

    const handleLogout = async (e)=>
    {
        e.preventDefault();
        const res = await fetch('/api/logout',{
            method:'post',
            headers:{
                Authorization:`Bearer ${token}`,
            },

        });

        if(res.ok){
            setUser(null);
            setToken(null);
            localStorage.removeItem('token');
            navigate('/');
        }

    }

    return (
        <>
            <header>
            
                <nav >
                    <Link to='/' className="nav-link" > Home </Link>

                    {user ? (<div className="flex items-center space-x-4">
                        <p className="text-slate-400 text-xs">Welcome back {user.name}</p>
                        <Link to="/create" className="nav-link">
                            New Post
                        </Link>
                        <form onSubmit={handleLogout}>
                            <button className="nav-link">Logout</button>
                        </form>
                    </div>): (

                        <div className = 'space-x-4'>

                           <Link to = '/login' className = "nav-link text-red-400"> Login </Link>


                           <Link to='/register' className='nav-link'> Register </Link>


                       </div>
                    )}



                 </nav >
             
            </header >
    <main>
        <Outlet />
    </main>


        </>
    )
}

export default Layout
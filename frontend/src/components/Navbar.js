
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react'
import jwt_decode from "jwt-decode";


const Navbar = () => {
    const [rol, setRol] = useState('');
    const [token, setToken] = useState('');
    const history = useHistory();

    useEffect(() => {
        refreshToken();  
    }, []);


    const Logout = async () => {
        try {
            await axios.delete(process.env.REACT_APP_URL+':5000/logout');
            history.push("/");
        } catch (error) {
            console.log(error);
        }
    }


    const refreshToken = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_URL+':5000/token');
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setRol(decoded.rol);
            console.log(decoded);

        } catch (error) {
            if (error.response) {
                history.push("/");
            }
        }
    }

    return (
        <nav className="navbar is-light" role="navigation" aria-label="main navigation">
            <div className="container">
                <div className="navbar-brand">
                    <a className="navbar-item" href="https://concordato-aureo.weebly.com/">
                        <img src="https://concordato-aureo.weebly.com/uploads/1/1/5/7/115790487/cocordato_1.png" width="112" height="28" alt="logo" />
                    </a>

                    <a href="/" role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                        <a href="/dashboard" className="navbar-item">
                            Inicio
                        </a>
                        {(rol=="postulante")? 
                        <div> </div>
                        :
                        <a href="/crear" className="navbar-item">
                            Crear Ficha
                        </a>}
                    </div>

                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                <button onClick={Logout} className="button is-light">
                                    Log Out
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
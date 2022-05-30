/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useHistory } from 'react-router-dom';

const Dashboard = () => {
    const [name, setName] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [users, setUsers] = useState([]);
    const [personajes, setPersonaje] = useState([]);
    const [rol, setRol] = useState('');
    const [id, setId] = useState('');
    const history = useHistory();

    useEffect(() => {
        refreshToken();
        getUsers();
      
    }, []);

    const refreshToken = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_URL+':5000/token');
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setName(decoded.name);
            setId(decoded.userId);
            setRol(decoded.rol);
            setExpire(decoded.exp);
            getcharacter(decoded.userId,decoded.rol);
        } catch (error) {
            if (error.response) {
                history.push("/");
            }
        }
    }

    const axiosJWT = axios.create();

    axiosJWT.interceptors.request.use(async (config) => {
        const currentDate = new Date();
        if (expire * 1000 < currentDate.getTime()) {
            const response = await axios.get(process.env.REACT_APP_URL+':5000/token');
            config.headers.Authorization = `Bearer ${response.data.accessToken}`;
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setName(decoded.name);
            setId(decoded.userId);
            setRol(decoded.rol);
            setExpire(decoded.exp);
            
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    const getUsers = async () => {
        const response = await axiosJWT.get(process.env.REACT_APP_URL+':5000/users', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setUsers(response.data);
    }
   
    const getcharacter= async (entradaId,entradaRol) => {
        console.log("entrada")
         console.log(entradaRol)
         var idfinal=entradaId
        //nota quitar id quemado
        if(entradaRol=='admin'){
        idfinal='todos'
        }
        console.log(idfinal)
        const response = await axiosJWT.get(process.env.REACT_APP_URL+':5000/user?id='+idfinal, { 
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setPersonaje(response.data);

     }
 

    return (
        <div className="container mt-5">
            <h1>Bienvenido: {name}</h1>
          {  (rol=="postulante")? 
            <div>
                <h1 style={{ color: 'red' }}>tu cuenta aun no ha sido aceptada, pidele a un GM que te acepte, brindandole tu correo de contacto</h1>
            </div>
            :
            <div>

            </div>}
            {
                (rol=="admin")? 
                <table className="table is-striped is-fullwidth">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                        </tr>
                    ))}

                </tbody>
                </table>
             : <h1></h1>
            }
           {(personajes!=null)? 
            <table className="table is-striped is-fullwidth">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nombre</th>
                    </tr>
                </thead>
                <tbody>
                {personajes.map((personaje, index) => (
                        <tr key={personaje.id}>
                            <td>{index + 1}</td>
                            <td>{personaje.name}</td>
                            <td><a href={'/personaje/'+personaje.id}>Ver perfil</a></td>
                            
                        </tr>
                    ))}
                </tbody>
            </table>
            :<div class="loader"></div>
         } 
        </div>

        
    )
   
}

export default Dashboard
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useHistory,  BrowserRouter, Switch, Route, useParams  } from 'react-router-dom';

const Dashboard = () => {
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const history = useHistory();
    const [name, setName] = useState('');
    const [rol, setRol] = useState('');
    const [calculado, setCalculados] = useState('');
    const [primhabs, setPrim] = useState([]);
    const [secunhabs, setSecun] = useState([]);
    const [tercehabs, setTerce] = useState([]);
    const [RazaName, setPersonajeRazaName] = useState('');
    const [id, setId] = useState('');
    const { idpersonaje } = useParams();
    const [personajes, setPersonaje] = useState([]);
    const [estados, setEstados] = useState([]);

    useEffect(() => {
        refreshToken();
        getcharacter();
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

   

    const getcharacter= async () => {

        //nota quitar id quemado
        const response = await axiosJWT.get(process.env.REACT_APP_URL+':5000/personaje?id='+idpersonaje, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response.data)
        setPersonaje(response.data.users);
        setEstados(response.data.estados)
        setPersonajeRazaName(response.data.users.raza);

        const primario = [];
        const secundario = [];
        const terciario = [];

        response.data.PrimHab.forEach(elementp => {
            primario.push({
                id: elementp.hab_prim.id,
                name: elementp.hab_prim.name,
                valor: elementp.valor,
            });
          });



        response.data.SecunHab.forEach(elements => {
            secundario.push({
                id: elements.hab_secun.id,
                id_prim: elements.hab_secun.id_hab_prim,
                name: elements.hab_secun.name,
                valor: elements.valor,
            });
            });

        response.data.TerceHab.forEach(elementt => {
                terciario.push({
                    id: elementt.hab_terc.id,
                    id_secun: elementt.hab_terc.id_hab_secun,
                    name: elementt.hab_terc.name,
                    valor: elementt.valor,
                });
                });   

        setCalculados(response.data.datoscalculados)
        
        setPrim(primario)
        setSecun(secundario)
        setTerce(terciario)


        console.log("get charactesssrss" + id)
        console.log(idpersonaje)
        console.log(terciario)
    }
 
//nota: ocultar el codigo
    return (
        <div className="container mt-5">
            <h1>Bienvenido: {name}</h1>

           {(personajes!=null)? 
            <table className="table is-striped is-fullwidth">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Raza</th>
                    </tr>
                </thead>
                <tbody>
                        <tr key={personajes.id}>
                            <td>{personajes.name}</td>
                            <td>{RazaName.raza_name}</td>                                      
                        </tr>
                </tbody>

 <span><br></br><br></br><br></br></span>              
                <th color="black" >ESTADOS:</th>
                <tbody>
                {estados.map((estado, index) => (
                        <tr key={estado.titulo}>
                            <td><b>{estado.titulo}</b></td>
                            <td>{estado.texto}</td>
                            <td><i>{estado.efecto}</i></td>
                        </tr>
                    ))}
                </tbody>


<span><br></br><br></br><br></br></span>
                <thead>
                    <tr>
                        <th>Salud</th>
                        <th>Maná</th>
                        <th>Comunión</th>
                        <th>Regen. Salud</th>
                        <th>Regen. Maná</th>
                        <th>Regen. Comunión</th>
                        <th>Daño Fuerza</th>
                        <th>Daño Destreza</th>
                        <th>Poder Mágico</th>
                        <th>Poder Espiritual </th>
                    </tr>
                </thead>
                <tbody>
                        <tr key={personajes.id}>
                            <td>{calculado.Salud}</td>  
                            <td>{calculado.Mana}</td>
                            <td>{calculado.Comunion}</td>        
                            <td>{calculado.RegenSalud}</td>
                            <td>{calculado.RegenMana}</td>  
                            <td>{calculado.RegenComunion}</td>
                            <td>{calculado.DanoFuerza}</td>  
                            <td>{calculado.DanoDestreza}</td>
                            <td>{calculado.PoderMagico}</td>  
                            <td>{calculado.PoderEspiritual}</td>                          
                        </tr>
                </tbody>
                <thead>
                    <tr>
                        <th>fuerza</th>
                        <th>agilidad</th>
                        <th>destreza</th>
                        <th>constitucion</th>
                        <th>intelecto</th>
                        <th>sabiduria</th>
                        <th>espiritu</th>
                        <th>poder</th>
                        <th>belleza</th>
                        <th>frialdad</th>
                    </tr>
                </thead>
                <tbody>
                        <tr key={personajes.id}>
                            <td>{RazaName.fuerza + personajes.fuerza} </td>
                            <td>{RazaName.agilidad +personajes.agilidad}</td>      
                            <td>{RazaName.destreza +personajes.destreza}</td>
                            <td>{RazaName.constitucion +personajes.constitucion}</td>      
                            <td>{RazaName.intelecto +personajes.intelecto}</td>
                            <td>{RazaName.sabiduria +personajes.sabiduria}</td>      
                            <td>{RazaName.espiritu +personajes.espiritu}</td>
                            <td>{RazaName.poder +personajes.poder}</td>      
                            <td>{RazaName.belleza +personajes.belleza}</td>
                            <td>{RazaName.frialdad +personajes.frialdad}</td>                                      
                        </tr>
                </tbody>

              
                <th color="black" >HABILIDADES:</th>


                <thead>
                    <tr>
                        <th>Valor</th>
                        <th>Habilidad</th>
                    </tr>
                </thead>
                <tbody>
                {primhabs.map((estado, index) => (
                        <tr key={estado.id}>
                            <td><b>{Math.floor(estado.valor/3)}</b> (<i>{estado.valor}</i>)</td>
                            <td>{estado.name}</td>
                            <td>
                                <tbody>
                                    {secunhabs.map((estados, index) => (
                                        estados.id_prim==estado.id?
                                            <tr key={estados.id}>
                                                <td><b>{Math.floor(estados.valor/2)}</b> (<i>{estados.valor}</i>)</td>
                                                <td>{estados.name}</td>
                                                <td>
                                                    
                                                        <tbody>
                                                            {tercehabs.map((estadot, index) => (
                                                                estadot.id_secun==estados.id?
                                                                    <tr key={estadot.id}>
                                                                         <td><b>{Math.floor(estadot.valor/1)}</b> (<i>{estadot.valor}</i>)</td>
                                                                        <td>{estadot.name}</td>
                                                                    </tr>
                                                                    : <tr key={estadot.id}>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                    
                                                    
                                                    </td>
                                            </tr>
                                            : <tr key={estados.id}>
                                             </tr>
                                        ))}
                                    </tbody>
                                </td>
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
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
                hidetext: elementp.hab_prim.hidetext,
            });
          });



        response.data.SecunHab.forEach(elements => {
            secundario.push({
                id: elements.hab_secun.id,
                id_prim: elements.hab_secun.id_hab_prim,
                name: elements.hab_secun.name,
                valor: elements.valor,
                hidetext: elements.hab_secun.hidetext,
            });
            });

        response.data.TerceHab.forEach(elementt => {
                terciario.push({
                    id: elementt.hab_terc.id,
                    id_secun: elementt.hab_terc.id_hab_secun,
                    name: elementt.hab_terc.name,
                    valor: elementt.valor,
                    hidetext: elementt.hab_terc.hidetext,
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

    const myStylecenter = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      };
 
//nota: ocultar el codigo
    return (
        (rol=="postulante")? 
        <div>
            <h1 style={{ color: 'red' }}>tu cuenta aun no ha sido aceptada, pidele a un GM que te acepte, brindandole tu correo de contacto</h1>
        </div>
        :
        <div className="container mt-5"style={{
        
          width: '50%',
        }}>

            <h1>Bienvenido: {name}</h1>

            <br></br>

           {(personajes!=null)? 
           <div >
            <div style={myStylecenter}>

                <table>

                    <tbody>
                            <tr key={personajes.id}>
                                <td style={{ width: '500px' }}>
                                            <h1 style={{ color: 'black', fontSize:"30px"}}>
                                            {personajes.name}
                                            </h1>
                                            <td style={{ width: '50px' }}> </td>
                                            <td> <div style={{ color: 'grey' }}>
                                                {RazaName.raza_name}
                                            </div></td>

                                            <br></br>
                                            <br></br>

                                            
                                            
                                            <div style={{ fontSize:"15px", fontWeight : "bold"}}>
                                            Vida, Mana Y Comunión:
                                            </div>
                                            <table>
                                                <tr>
                                                    <td style={{ width: '33%' , fontSize:"12px"}}>
                                                        Salud : {calculado.Salud}
                                                    </td>

                                                    <td style={{ width: '33%' , fontSize:"12px" }}>
                                                        Maná : {calculado.Mana}
                                                    </td>
                                                        
                                                    <td style={{ width: '33%' , fontSize:"12px" }}>
                                                        Comunión : {calculado.Comunion}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{ width: '33%' , fontSize:"12px" }}>
                                                        Regen. Salud : {calculado.RegenSalud}
                                                    </td>

                                                    <td style={{ width: '33%' , fontSize:"12px" }}>
                                                        Regen. Maná : {calculado.RegenMana}
                                                    </td>
                                                        
                                                    <td style={{ width: '33%' , fontSize:"12px" }}>
                                                        Regen. Comunión : {calculado.RegenComunion}
                                                    </td>
                                                </tr>
                                            

                                            </table>
                                            <br></br>

                                            <div style={{ fontSize:"15px", fontWeight : "bold"}}>
                                            Daño y Poder:
                                            </div>
                                            <table style={{ width: '100%' , fontSize:"12px" }}>
                                                    <tr>
                                                    <td style={{ width: '60%' , fontSize:"12px" }}>
                                                    Daño Fuerza: {calculado.DanoFuerza}
                                                    </td>

                                                    <td style={{ width: '60%' , fontSize:"12px" }}>
                                                    Poder Mágico : {calculado.PoderMagico}
                                                    </td>
                                                    

                                                

                                                    </tr>
                                                
                                                        
                                                    <tr>
                                                    <td style={{ width: '60%' , fontSize:"12px" }}>
                                                    Daño Destreza: {calculado.DanoDestreza}
                                                    </td>

                                                    <td style={{ width: '60%' , fontSize:"12px" }}>
                                                    Poder Espiritual  : {calculado.PoderEspiritual}
                                                    </td>

                                                    </tr>


                                            </table>
                                            <br></br>

                                            <div style={{ fontSize:"15px", fontWeight : "bold"}}>
                                            Estadisticas Base:
                                            </div>
                                            <table style={{ width: '100%' , fontSize:"12px" }}>

                                                    <tr style={{ height: '25px'}}>
                                                        <td style={{ width: '24%' , fontSize:"12px" }}>
                                                            <td style={{ width: '200px' , fontSize:"12px" }}>
                                                                Fuerza : 
                                                            </td>
                                                            <td style={{ width: '30%' , fontSize:"12px" }}>
                                                                {RazaName.fuerza + personajes.fuerza}
                                                            </td>
                                                        
                                                        </td>

                                                        <td style={{ width: '24%' , fontSize:"12px" }}>
                                                            <td style={{ width: '200px' , fontSize:"12px" }}>
                                                                Agilidad : 
                                                            </td>
                                                            <td style={{ width: '30%' , fontSize:"12px" }}>
                                                                {RazaName.agilidad + personajes.agilidad}
                                                            </td>

                                                        </td>

                                                        <td style={{ width: '24%' , fontSize:"12px" }}>
                                                            <td style={{ width: '200px' , fontSize:"12px" }}>
                                                                Destreza : 
                                                            </td>
                                                            <td style={{ width: '30%' , fontSize:"12px" }}>
                                                                {RazaName.destreza + personajes.destreza}
                                                            </td>
                                                        </td>

                                                        <td style={{ width: '24%' , fontSize:"12px" }}>
                                                            <td style={{ width: '200px' , fontSize:"12px" }}>
                                                                Constitucion : 
                                                            </td>
                                                            <td style={{ width: '30%' , fontSize:"12px" }}>
                                                                {RazaName.constitucion + personajes.constitucion}
                                                            </td>
                                                        </td>                               

                                                    </tr>
                                                
                                                        
                                                    <tr style={{ height: '25px'}}>
                                                        <td style={{ width: '24%' , fontSize:"12px" }}>
                                                            <td style={{ width: '200px' , fontSize:"12px" }}>
                                                                Intelecto : 
                                                            </td>
                                                            <td style={{ width: '30%' , fontSize:"12px" }}>
                                                                {RazaName.intelecto + personajes.intelecto}
                                                            </td>
                                                        </td>

                                                        <td style={{ width: '24%' , fontSize:"12px" }}>
                                                            <td style={{ width: '200px' , fontSize:"12px" }}>
                                                                Sabiduria : 
                                                            </td>
                                                            <td style={{ width: '30%' , fontSize:"12px" }}>
                                                                {RazaName.sabiduria + personajes.sabiduria}
                                                            </td>
                                                        </td>

                                                        <td style={{ width: '24%' , fontSize:"12px" }}>
                                                            <td style={{ width: '200px' , fontSize:"12px" }}>
                                                                Espiritu : 
                                                            </td>
                                                            <td style={{ width: '30%' , fontSize:"12px" }}>
                                                                {RazaName.espiritu + personajes.espiritu}
                                                            </td>
                                                        </td>

                                                        <td style={{ width: '24%' , fontSize:"12px" }}>
                                                            <td style={{ width: '200px' , fontSize:"12px" }}>
                                                                Poder : 
                                                            </td>
                                                            <td style={{ width: '30%' , fontSize:"12px" }}>
                                                                {RazaName.poder + personajes.poder}
                                                            </td>
                                                    </td>

                                                    </tr>
                                                        <tr style={{ height: '25px'}}>
                                                        <td style={{ width: '24%' , fontSize:"12px" }}>
                                                            <td style={{ width: '200px' , fontSize:"12px" }}>
                                                                Belleza : 
                                                            </td>
                                                            <td style={{ width: '30%' , fontSize:"12px" }}>
                                                                {RazaName.belleza + personajes.belleza}
                                                            </td>
                                                        </td>

                                                        <td style={{ width: '24%' , fontSize:"12px" }}>
                                                        <td style={{ width: '200px' , fontSize:"12px" }}>
                                                                Frialdad : 
                                                            </td>
                                                            <td style={{ width: '30%' , fontSize:"12px" }}>
                                                                {RazaName.frialdad + personajes.frialdad}
                                                            </td>
                                                        </td>
                                                    </tr>


                                            </table>

                                            <br></br>

                                    </td>

                                <td> 
                                    <br></br>
                                    <br></br>
                                    <div style={{ width:"246px", height: "354px "}}>
                                    <img src={personajes.urlimg} alt={personajes.urlimg} />
                                    </div>
                                     </td>                                    
                            </tr>
                    </tbody>

                <span><br></br><br></br><br></br></span>          

                
                </table>

            </div>


            <div style={myStylecenter}>
                <div style={{ fontSize:"20px", fontWeight : "bold"}}>
                ESTADOS
                </div>
            
            </div>
            <br></br>
           



            <div style={myStylecenter}>   
            <table border="1" style={{ width: '70%' }}>


                    <thead>
                        <tr>
                            <th>Titulo</th>
                            <th>Texto</th>
                            <th>Efecto</th>
                        </tr>
                    </thead>
                    <tbody>
                    {estados.map((estado, index) => (
                            <tr key={estado.titulo}>
                                <td><b>{estado.titulo}</b></td>
                                <td>{estado.texto}</td>
                                <td><i>{estado.efecto}</i></td>
                            </tr>
                        ))}
                    </tbody>
                    </table>
            

            </div>

         


         
            

            
            <span><br></br><br></br><br></br></span>

            <div style={myStylecenter}>
                <div style={{ fontSize:"20px", fontWeight : "bold"}}>
                HABILIDADES
                </div>
            
            </div>

            <br></br>

            <div style={myStylecenter}>
            <table border="1" style={{ width: '800px' }}>
                <tbody>
                {primhabs.map((estado, index) => (
                        <tr key={estado.id}>
                            <td style={{ width: '250px' }}><abbr title={estado.hidetext}>{estado.name}</abbr>: <b>{Math.floor(estado.valor/3)}</b></td>
                            <td>
                            <table border="1" style={{ width: '550px' }}>
                            <tbody >
                                    {secunhabs.map((estados, index) => (
                                        estados.id_prim==estado.id?
                                            <tr key={estados.id}>
                                                <td style={{ width: '300px' }}><abbr title={estados.hidetext}>{estados.name}</abbr>: <b>{Math.floor(estados.valor/2)}</b></td>
                                                <td>
                                                <table border="1" style={{ width: '250px' }}>
                                                        <tbody>
                                                            {tercehabs.map((estadot, index) => (
                                                                estadot.id_secun==estados.id?
                                                                    <tr key={estadot.id}>
                                                                        <td><abbr title={estadot.hidetext}>{estadot.name}</abbr> : <b>{Math.floor(estadot.valor/1)}</b></td>
                                                                    </tr>
                                                                    : <tr key={estadot.id}>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                    
                                                </table>   
                                                    </td>
                                            </tr>
                                            : <tr key={estados.id}>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                
                                </td>
                        </tr>
                    ))}
                </tbody>

            </table>

            </div>
        

  

            <br></br>
            </div>
            :<div class="loader"></div>
         } 
        </div>

        
    )
   
}

export default Dashboard
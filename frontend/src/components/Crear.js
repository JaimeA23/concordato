/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useHistory , useParams} from 'react-router-dom';

import Select from 'react-select'

const Crear = () => {
   
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

  const [razaselect, setRaza] = useState([]);
  const [razabasic, setRazabasic] = useState([]);
  const [options, setOptions] = useState([]);
  const [pcaracteristicas, setCaracteristicas] = useState(6);
  const [patributos, setAtributos] = useState(30);
  const [textoadvertencia, setAdvertencia] = useState("debes usar todos los puntos disponibles");

  const [ficha, setficha] = useState([]);


  const [disable, setDisable] = React.useState(false);


  useEffect(() => {
      refreshToken();
      getcharacter();
  }, []);



  const razaname = [
    { value: 'agilidad', label: 'Agilidad' },
    { value: 'belleza', label: 'belleza' },
    { value: 'constitucion', label: 'constitucion' },
    { value: 'destreza', label: 'destreza' },
    { value: 'espiritu', label: 'espiritu' },
    { value: 'frialdad', label: 'frialdad' },
    { value: 'intelecto', label: 'intelecto' },
    { value: 'fuerza', label: 'fuerza' },
    { value: 'poder', label: 'poder' },
    { value: 'sabiduria', label: 'sabiduria' }

  ]




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
    const [values, setValues] = React.useState({
        name: "",
        password: "",
      });
      const [gender, setGender] = useState("");



      const getcharacter= async () => {

        //nota quitar id quemado
        const response = await axiosJWT.get(process.env.REACT_APP_URL+':5000/crear?id=1', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const razasoption=[]

        response.data.razas.forEach(elementp => {
          console.log(elementp)

          razasoption.push({
            value: elementp.raza_name,
            label: elementp.raza_name,
            id: elementp.id,
            ragilidad: elementp.agilidad,
            rbelleza: elementp.belleza,
            rconstitucion: elementp.constitucion,
            rdestreza: elementp.destreza,
            respiritu: elementp.espiritu,
            rfrialdad: elementp.frialdad,
            rfuerza: elementp.fuerza,
            rintelecto: elementp.intelecto,
            rpoder: elementp.poder,
            rsabiduria: elementp.sabiduria,
        });

          
        });

        const primario = [];
        const secundario = [];
        const terciario = [];

        response.data.hab1.forEach(elementp => {
            primario.push({
                id: elementp.id,
                name: elementp.name,
                valor: 0,
            });
          });



        response.data.hab2.forEach(elements => {
            secundario.push({
                id: elements.id,
                id_prim: elements.id_hab_prim,
                name: elements.name,
                valor: 0,
            });
            });

        response.data.hab3.forEach(elementt => {
                terciario.push({
                    id: elementt.id,
                    id_secun: elementt.id_hab_secun,
                    name: elementt.name,
                    valor: 0,
                });
                });   





        setPrim(primario)
        setSecun(secundario)
        setTerce(terciario)

        setOptions(razasoption)

        console.log("terciario")
        console.log(terciario)
       
      }




      function handleChange2(evt) {

       console.log("SSDSADASD");
       console.log(values.name);
        const { target } = evt;
        const { name, value } = target;
        setGender(evt.target.value);
        
 
        const newValues = {
          ...values,
          [name]: value,
        };
        // Sincroniza el estado de nuevo
        setValues(newValues);
        

   
      }









      function enviar() {
        console.log("enviando")
        
        
        if(pcaracteristicas==0 && patributos==0 &&values.name!=""){

          setAdvertencia("enviando....")
               
        var    agilidad= 0
        var    belleza= 0
        var    constitucion= 0
        var    destreza= 0
        var    espiritu= 0
        var    frialdad= 0
        var    fuerza= 0
        var    intelecto= 0
        var    poder= 0
        var    sabiduria= 0

        var terhab =[]
        var secunhab =[]
        var primhab =[]
            
        razaselect.forEach(elementt => {


          if(elementt.value=='agilidad'){

            agilidad = elementt.uservalor;

          }
          if(elementt.value=='belleza'){

            belleza = elementt.uservalor;

          }
          if(elementt.value=='constitucion'){

            constitucion = elementt.uservalor;

          }
          if(elementt.value=='destreza'){

            destreza = elementt.uservalor;

          }
          if(elementt.value=='espiritu'){

            espiritu = elementt.uservalor;

          }
          if(elementt.value=='frialdad'){

            frialdad = elementt.uservalor;

          }
          if(elementt.value=='fuerza'){

            fuerza = elementt.uservalor;

          }
          if(elementt.value=='intelecto'){

            intelecto = elementt.uservalor;

          }
          if(elementt.value=='poder'){

            poder = elementt.uservalor;

          }
          if(elementt.value=='sabiduria'){

            sabiduria = elementt.uservalor;

          }

        
          }); 

          var Ficha = 
            { 
              user_id: id,
              name: values.name, 
              raza_id: razabasic.raza_id,
              agilidad: agilidad,
              belleza: belleza,
              constitucion: constitucion,
              destreza: destreza,
              espiritu: espiritu,
              frialdad: frialdad,
              fuerza: fuerza,
              intelecto: intelecto,
              poder: poder,
              sabiduria: sabiduria,
            }


            tercehabs.forEach(elementter => {


              if(elementter.valor!=0){

                terhab.push(
                  {
                    id: elementter.id,
                    id_secun: elementter.id_secun,
                    name: elementter.name,
                    valor: elementter.valor,
                  });


            
              }

              
      
              
            });     
 
            secunhabs.forEach(elementsecun => {


              
              if(elementsecun.valor!=0) {

                secunhab.push(
                  {
                    id: elementsecun.id,
                    id_secun: elementsecun.id_secun,
                    name: elementsecun.name,
                    valor: elementsecun.valor,
                  });


              }
              
              
      
              
            });  

            primhabs.forEach(elementprim => {


              
              if(elementprim.valor!=0) {

                primhab.push(
                  {
                    id: elementprim.id,
                    id_secun: elementprim.id_secun,
                    name: elementprim.name,
                    valor: elementprim.valor,
                  });


              }
              
              
      
              
            });  


        



          console.log(Ficha)
          console.log(primhab)
          console.log(secunhab)
          console.log(terhab)
          console.log(tercehabs)


   

          setDisable(true)
                  axios.post(process.env.REACT_APP_URL+':5000/crearpersonaje',{Ficha,primhab,secunhab,terhab }, {
                    headers: {
                      Authorization: `Bearer ${token}`
                    }
                })
                .then(response => {
                  console.log("response")
                    console.log(response)
                    history.push("/dashboard");
                })
                .catch((error) => {
                  console.log("error")
                  console.log(error)
                });

 


          console.log("enviando..........")
        }
        else{
          
          if(name==""){
            setAdvertencia("el nombre no puede quedar vacio")
          }

        setAdvertencia("usa todos los puntos")

        console.log(values.name)
 


        }

         
      }










      function handleChange(evt) {
        /*
          evt.target es el elemento que ejecuto el evento
          name identifica el input y value describe el valor actual
      
       console.log("SSDSADASD");
       console.log(values.name);
        const { target } = evt;
        const { name, value } = target;
        setGender(evt.target.value);
        
 
        const newValues = {
          ...values,
          [name]: value,
        };
        // Sincroniza el estado de nuevo
        setValues(newValues);
        */
        var razaoption=[]
        var razaoptionbasic=[]

        
        options.forEach(elementp => {
         
          if(elementp.value==evt.target.value){

            razaoption= [
              { value: 'fuerza', label: 'fuerza' , valor: elementp.rfuerza, uservalor:0},
              { value: 'agilidad', label: 'Agilidad' , valor: elementp.ragilidad, uservalor:0},
              { value: 'destreza', label: 'destreza', valor: elementp.rdestreza, uservalor:0},
              { value: 'constitucion', label: 'constitucion' , valor: elementp.rconstitucion, uservalor:0},
              { value: 'intelecto', label: 'intelecto', valor: elementp.rintelecto, uservalor:0},
              { value: 'sabiduria', label: 'sabiduria', valor: elementp.rsabiduria, uservalor:0},
              { value: 'espiritu', label: 'espiritu', valor: elementp.respiritu, uservalor:0},
              { value: 'poder', label: 'poder', valor: elementp.rpoder, uservalor:0},
              { value: 'frialdad', label: 'frialdad', valor: elementp.rfrialdad, uservalor:0},
              { value: 'belleza', label: 'belleza', valor: elementp.rbelleza, uservalor:0},
          
            ]


            razaoptionbasic = {raza_id: elementp.id}


          }
       

          
        });

        


        setRaza(razaoption)
        setRazabasic(razaoptionbasic)




      }

      function resta(atributo) {

        if(atributo.uservalor>-2){
          atributo.uservalor = atributo.uservalor-1;

          var razaoption=[]
    
          razaselect.forEach(elementp => {
    
            razaoption.push(
              {
                 value: elementp.value, 
                 label: elementp.label , 
                 valor: elementp.valor, 
                 uservalor:elementp.uservalor
              });
              });
    
          setRaza(razaoption)
          calcularpuntos()
        }

     
      
      }
      function suma(atributo) {

        if(atributo.uservalor<2&&pcaracteristicas>0){
          atributo.uservalor = atributo.uservalor+1;

          var razaoption=[]
    
          razaselect.forEach(elementp => {
    
            razaoption.push(
              {
                 value: elementp.value, 
                 label: elementp.label , 
                 valor: elementp.valor, 
                 uservalor:elementp.uservalor
              });
              });
    
          setRaza(razaoption)
          calcularpuntos()

        }

      
      }
      function calcularpuntos(){

        var restados=0;
        var sumados =0;
        var puntos = 6;

        razaselect.forEach(elementp => {
  
         if(elementp.uservalor<0){
           restados=restados+elementp.uservalor
         }
         else if (elementp.uservalor>0){
          sumados=sumados+elementp.uservalor
         }


            });

      console.log(sumados);
      console.log(restados);


      if(restados<-5){
        puntos=8;
       }
       else if(restados<-2){
        puntos=7;
      }

      puntos=puntos-sumados

      console.log("puntos")
      console.log(puntos)
      setCaracteristicas(puntos);

      }
      function Calcularpuntosatributos(){

            var sumados =0;
            var puntos = 30;

            primhabs.forEach(elementp => {

              sumados=sumados+elementp.valor
      

                });
            secunhabs.forEach(elementp => {

              sumados=sumados+elementp.valor
      

                });
            tercehabs.forEach(elementp => {

              sumados=sumados+elementp.valor
      

                });

          console.log(sumados);

          puntos=puntos-sumados

          console.log("puntos")
          console.log(puntos)
          setAtributos(puntos);
      }
      function Calcularpuntosatributosdelete(entrada,entrada2,tipo){


        var sumados =0;
        var puntos = 30;

        primhabs.forEach(elementp => {

          sumados=sumados+elementp.valor
  

            });


        if(tipo=="primario"){

              
              entrada.forEach(elementp => {
      
                sumados=sumados+elementp.valor
        
      
                  });  
              
                  entrada2.forEach(elementp => {

                sumados=sumados+elementp.valor
        
      
                  });


            console.log("calculado primario")
        }

        if(tipo=="secundario"){


          secunhabs.forEach(elementp => {

            sumados=sumados+elementp.valor
    
  
              });
          entrada.forEach(elementp => {
  
            sumados=sumados+elementp.valor
    
  
              });


        }


      puntos=puntos-sumados
      setAtributos(puntos);

      }
      function Estabilizadoratributos(atributo,tipo){

        if(tipo=="primario"){
          console.log("inprimario")
          var atributooption=[]
          var atributooptionextra=[]

          tercehabs.forEach(elementt2 => {

            atributooptionextra.push(
              {
                id: elementt2.id,
                id_secun: elementt2.id_secun,
                name: elementt2.name,
                valor: elementt2.valor,
              });
            
    
            
          });
    
          secunhabs.forEach(elements => {

            if(elements.id_prim==atributo.id){
              atributooption.push(
                {
                  id: elements.id,
                  id_prim: elements.id_prim,
                  name: elements.name,
                  valor: 0,
                });
                atributooptionextra.forEach(elementt => {


                        if(elementt.id_secun==elements.id_prim){
                            elementt.valor=0;
    
                        }

                
                        
                      });
                
            }
            else {
              atributooption.push(
                {
                id: elements.id,
                id_prim: elements.id_prim,
                name: elements.name,
                valor: elements.valor,
                });
             
            }
    
            
          });
          setSecun(atributooption)
          setTerce(atributooptionextra)
          Calcularpuntosatributosdelete(atributooption,atributooptionextra, "primario");

        }
        if(tipo=="secundario"){
          var atributooption=[]
    
          tercehabs.forEach(elementt => {

            if(elementt.id_secun==atributo.id){
              atributooption.push(
                {
                  id: elementt.id,
                  id_secun: elementt.id_secun,
                  name: elementt.name,
                  valor: 0,
                });
            }
            else {
              atributooption.push(
                {
                  id: elementt.id,
                  id_secun: elementt.id_secun,
                  name: elementt.name,
                  valor: elementt.valor,
                });
            }
    
            
          });

          setTerce(atributooption)
          Calcularpuntosatributosdelete(atributooption,null,"secundario");
        }


        

      }
      function sumaAtributo(atributo) {

        if(atributo.valor<6 && patributos>2){
          atributo.valor = atributo.valor+3;

          var atributooption=[]
    
          primhabs.forEach(elementp => {
    
            atributooption.push(
              {
                id: elementp.id,
                name: elementp.name,
                valor: elementp.valor,
              });
          });
          setPrim(atributooption)
          Calcularpuntosatributos();

        }
       
       }
      function restaAtributo(atributo) {

        if(atributo.valor>2){
          atributo.valor = atributo.valor-3;

          var atributooption=[]
    
          primhabs.forEach(elementp => {
    
            atributooption.push(
              {
                id: elementp.id,
                name: elementp.name,
                valor: elementp.valor,
              });
          });
          setPrim(atributooption)
          
          Estabilizadoratributos(atributo,"primario");
          
        }

     
      
      }
      function sumaAtributo2(atributo1,atributo) {


        if(((atributo1.valor>3 && atributo.valor<8)|| (atributo1.valor>0 && atributo.valor<4)) && patributos>1){
          console.log("if atributo2 suma")
          atributo.valor = atributo.valor+2;

          var atributooption=[]
    
          secunhabs.forEach(elements => {
    
            atributooption.push(
              {
                id: elements.id,
                id_prim: elements.id_prim,
                name: elements.name,
                valor: elements.valor,
              });
          });
          setSecun(atributooption)
          Calcularpuntosatributos();

        }
      
      }
      function restaAtributo2(atributo1,atributo) {

        if(atributo.valor>1){

          atributo.valor = atributo.valor-2;

          var atributooption=[]
    
          secunhabs.forEach(elements => {
    
            atributooption.push(
              {
                id: elements.id,
                id_prim: elements.id_prim,
                name: elements.name,
                valor: elements.valor,
              });
          });
          setSecun(atributooption)
        
          Estabilizadoratributos(atributo,"secundario");

        }

     
      
      }
      function sumaAtributo3(atributo2,atributo) {

        if( atributo.valor<atributo2.valor && patributos>0){

          
          atributo.valor = atributo.valor+1;

          var atributooption=[]
    
          tercehabs.forEach(elementt => {
    
            atributooption.push(
              {
                id: elementt.id,
                id_secun: elementt.id_secun,
                name: elementt.name,
                valor: elementt.valor,
              });
          });
          setTerce(atributooption)
          Calcularpuntosatributos();

        }
       



       }
       function restaAtributo3(atributo2,atributo) 
       {
 
      
         if(atributo.valor>0){

          atributo.valor = atributo.valor-1;

          var atributooption=[]
    
          tercehabs.forEach(elementt => {
    
            atributooption.push(
              {
                id: elementt.id,
                id_secun: elementt.id_secun,
                name: elementt.name,
                valor: elementt.valor,
              });
          });
          setTerce(atributooption)
          Calcularpuntosatributos();

        }
 
      
       
       }






 


      return (
        (rol!="postulante")? 
        <div>

            <div>
            <h1 style={{ color: 'red' }}>{textoadvertencia}</h1>

              
              </div>

              <button  disabled={disable}
                 className="btn btn-info btn-sm"
                 onClick={() => enviar()}>
                 crear
                </button>


            <form onSubmit={handleChange2}>
                <label htmlFor="email">Nombre </label>
                <input
                  id="name"
                  name="name"
                  type="name"
                  value={values.name}
                  onChange={handleChange2}
                />
            <div className="App">
              
           
    </div>
    

            </form>

            <div className="select-container">
            <select onChange={handleChange}>
              {options.map((option) => (
                <option value={option.value}>{option.label}</option>
              ))}
            </select>
            </div>

            <div>

              Puntos disponibles = {pcaracteristicas}
            </div>

            <div>


                 <table className="table table-dark table-striped table-hover table-bordered">
                      <thead>
                          <tr>
                              <th style={{ width: 100 }}>Caracteristica</th>
                              <th style={{ width: 150 }}>Puntos Racial</th>
                              <th style={{ width: 150 }}>Puntos usuario</th>
                              <th style={{ width: 150 }}>Puntos Totales</th>
                              <th style={{ width: 150 }}>Acciones</th>
                          </tr>
                      </thead>
                      <tbody>
                      {razaselect.map((raza, index) => (
                        <tr key={raza.value}>

                       
                                   <td>{raza.label}</td>
                                    <td>{raza.valor} </td>
                                    <td>{raza.uservalor}</td>
                                    <td>= {raza.valor + raza.uservalor}</td>
                                    <td>
                                        <button 
                                            className="btn btn-info btn-sm"
                                            onClick={() => resta(raza)}
                                            >
                                            -
                                        </button>
                                        &nbsp;
                                        <button 
                                            className="btn btn-info btn-sm"
                                            onClick={() => suma(raza)}
                                            >
                                            +
                                        </button>
                                        
                                    </td>
                                    </tr>
                                    ))}
                      </tbody>
                  </table>


            </div>




            <th color="black" >ATRIBUTOS: {patributos}</th>
            <p color="black" >valor principal=3</p>
            <p color="black" >valor secundaria=2</p>
            <p color="black" >valor terciaria=1</p>
            <table border="1">
              
                    <thead>
                        <tr>
                            <th>Valor</th>
                            <th>Habilidad</th>
                        </tr>
                    </thead>
                    <tbody>
                    {primhabs.map((estado, index) => (
                            <tr key={estado.id}>
                                <td>
                                <td><b>{Math.floor(estado.valor/3)}</b> (<i>{estado.valor}</i>)</td>
                                <td>{estado.name}</td>
                                <td>
                                        <button 
                                            className="btn btn-info btn-sm"
                                            onClick={() => restaAtributo(estado)}
                                            >
                                            -
                                        </button>
                                        &nbsp;
                                        <button 
                                            className="btn btn-info btn-sm"
                                            onClick={() => sumaAtributo(estado)}
                                            >
                                            +
                                        </button>
                                        
                                    </td>
                                </td>

                                <td>
                                <table border="1">
                                       <tbody>
                                        {secunhabs.map((estados, index) => (
                                            estados.id_prim==estado.id?
                                                <tr key={estados.id}>
                                                    <td>
                                                    <td><b>{Math.floor(estados.valor/2)}</b> (<i>{estados.valor}</i>)</td>
                                                    <td>{estados.name}</td>
                                                    <td>
                                                            <button 
                                                                className="btn btn-info btn-sm"
                                                                onClick={() => restaAtributo2(estado,estados)}
                                                                >
                                                                -
                                                            </button>
                                                            &nbsp;
                                                            <button 
                                                                className="btn btn-info btn-sm"
                                                                onClick={() => sumaAtributo2(estado,estados)}
                                                                >
                                                                +
                                                            </button>
                                                            
                                                        </td>
                                                    </td>
                                                    <td>
                                                    <table border="1">
                                                            <tbody>
                                                                {tercehabs.map((estadot, index) => (
                                                                    estadot.id_secun==estados.id?
                                                                        <tr key={estadot.id}>
                                                                            <td>
                                                                            <td><b>{Math.floor(estadot.valor/1)}</b> (<i>{estadot.valor}</i>)</td>
                                                                            <td>{estadot.name}</td>
                                                                            <td>
                                                                                <button 
                                                                                    className="btn btn-info btn-sm"
                                                                                    onClick={() => restaAtributo3(estados,estadot)}
                                                                                    >
                                                                                    -
                                                                                </button>
                                                                                &nbsp;
                                                                                <button 
                                                                                    className="btn btn-info btn-sm"
                                                                                    onClick={() => sumaAtributo3(estados,estadot)}
                                                                                    >
                                                                                    +
                                                                                </button>
                                                                                
                                                                            </td>
                                                                            </td>
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

                    <h1 style={{ color: 'red' }}>si la habilidad artistica o profesion de tu personaje no se encuentra en este listado, por favor indicarle al GM para su correspondiente creacion</h1>


        </div>
       : <div>
         <h1 style={{ color: 'red' }}>no tienes permisos, pidele a un GM que te lo habilite, brindandole tu correo de contacto</h1>
       </div>

        

        
      );

   
}

export default Crear
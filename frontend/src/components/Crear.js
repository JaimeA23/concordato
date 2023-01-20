/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useHistory , useParams} from 'react-router-dom';

import Select from 'react-select'

const Crear = () => {
  const puntosbasicos=5;
   
  const [token, setToken] = useState('');
  const [cntPersonajesValido, setCntPersonajesValido] = useState('');
  const [cantidadfichasusadas, setCntdFichas] = useState('');
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
  const [pcaracteristicas, setCaracteristicas] = useState(puntosbasicos);
  const [patributos, setAtributos] = useState(30);
  const [textoadvertencia, setAdvertencia] = useState("debes usar todos los puntos disponibles");

  const [ficha, setficha] = useState([]);


  const [disable, setDisable] = React.useState(false);
  const [pagnumber, setpage] = React.useState(1);

  const [Raceoriginalvalue, setRace] = React.useState("");





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



  const getcharacters= async (entradaId,entradaRol) => {

     var idfinal=entradaId

    if(entradaRol=='admin'){
    idfinal='todos'
    }
    console.log(idfinal)
    const response = await axiosJWT.get(process.env.REACT_APP_URL+':5000/user?id='+idfinal, { 
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    setCntdFichas(response.data.length);


 }


  const refreshToken = async () => {
      try {
          const response = await axios.get(process.env.REACT_APP_URL+':5000/token');
          setToken(response.data.accessToken);
          const decoded = jwt_decode(response.data.accessToken);
          setName(decoded.name);
          setId(decoded.userId);
          setRol(decoded.rol);
          setExpire(decoded.exp);
          setCntPersonajesValido(decoded.cntpersonajes);
          getcharacters(decoded.userId,decoded.rol);
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
          setCntPersonajesValido(decoded.cntpersonajes);
      }
      return config;
  }, (error) => {
      return Promise.reject(error);
  });
    const [values, setValues] = React.useState({
        name: "",
        urlimg: "",
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

          if(razasoption.length==0){

            razasoption.push({
              value: "Selecciona Raza",
              label: "Selecciona Raza",
              id: "Selecciona Raza",
              ragilidad: 0,
              rbelleza: 0,
              rconstitucion: 0,
              rdestreza: 0,
              respiritu: 0,
              rfrialdad: 0,
              rfuerza: 0,
              rintelecto: 0,
              rpoder: 0,
              rsabiduria: 0,
          });

          }

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
                hidetext: elementp.hidetext,
                valor: 0,
            });
          });



        response.data.hab2.forEach(elements => {
            secundario.push({
                id: elements.id,
                id_prim: elements.id_hab_prim,
                name: elements.name,
                hidetext: elements.hidetext,
                valor: 0,
            });
            });

        response.data.hab3.forEach(elementt => {
                terciario.push({
                    id: elementt.id,
                    id_secun: elementt.id_hab_secun,
                    name: elementt.name,
                    hidetext: elementt.hidetext,
                    valor: 0,
                });
                });   





        setPrim(primario)
        setSecun(secundario)
        setTerce(terciario)

        setOptions(razasoption)

        console.log("primario")
        console.log(primario)
       
      }
      function handleChange2(evt) {

       console.log("SSDSADASD");
       console.log(values.name);
       console.log(values.urlimg);
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

      
      function nextPage() {
        console.log("cambiando pagina")
        
        
        if(pcaracteristicas==0  &&values.name!=""&&values.urlimg!=""){

          setpage(2);

        }
        else{
          
          if(name==""){
            setAdvertencia("el nombre no puede quedar vacio")
          }

        setAdvertencia("usa todos los puntos")
 
        }

         
      }
      
      function enviar() {
        console.log("enviando")
        
        
        if(pcaracteristicas==0 && patributos==0 &&values.name!=""&&values.urlimg!=""){

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
              urlimg: values.urlimg, 
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
       

        if(evt.target.value!="Selecciona Raza"){

          

        setRace(evt.target.value)

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

            setCaracteristicas((puntosbasicos));


            razaoptionbasic = {raza_id: elementp.id}


          }
       

          
        });

        


        setRaza(razaoption)
        setRazabasic(razaoptionbasic)

          

        }
        else{
          evt.target.value=Raceoriginalvalue

        }
        



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
        }
        else if(atributo.uservalor<0&&pcaracteristicas==0){


          var restados=0;
          var sumados =0;
  
          razaselect.forEach(elementp => {
    
           if(elementp.uservalor<0){
             restados=restados+elementp.uservalor
           }
           else if (elementp.uservalor>0){
            sumados=sumados+elementp.uservalor
           }  
              });

          if(sumados<(puntosbasicos+1)){
            atributo.uservalor = atributo.uservalor+1;
          }
          else if(sumados==(puntosbasicos+1)&&restados<-(puntosbasicos-3)){
            atributo.uservalor = atributo.uservalor+1;
          }
          else if(sumados==(puntosbasicos+2)&&restados<-puntosbasicos){
            atributo.uservalor = atributo.uservalor+1;
          }


        }

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
      function calcularpuntos(){

        var restados=0;
        var sumados =0;
        var puntos = (puntosbasicos);

        razaselect.forEach(elementp => {
  
         if(elementp.uservalor<0){
           restados=restados+elementp.uservalor
         }
         else if (elementp.uservalor>0){
          sumados=sumados+elementp.uservalor
         }


            });

      console.log("sumados" + sumados);
      console.log("restados" + restados);


      if(restados<-5){
        puntos=(puntosbasicos+2);
       }
       else if(restados<-2){
        puntos=(puntosbasicos+1);
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
                hidetext: elementp.hidetext,
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
                hidetext: elementp.hidetext,
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
                hidetext: elements.hidetext,
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
                hidetext: elements.hidetext,
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
                hidetext: elementt.hidetext,
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
                hidetext: elementt.hidetext,
              });
          });
          setTerce(atributooption)
          Calcularpuntosatributos();

        }
 
      
       
       }


       const myStyle = {
        color: "white",
        backgroundColor: "DodgerBlue",
        padding: "10px",
        fontFamily: "Arial"
      };

     //  <h1 style={myStyle}>Hello Style!</h1>

     const LineGruesa = ({ color }) => (
      <hr
          style={{
              color: color,
              backgroundColor: color,
              height: 5,
              width: '800px'
          }}
      />
  );


 // cantidadfichasusadas
//  cntPersonajesValido
console.log("cntPersonajesValido");
console.log(cntPersonajesValido);
console.log(cantidadfichasusadas);
console.log(cantidadfichasusadas<cntPersonajesValido);

console.log("pagnumber");
console.log(pagnumber);

      return (
        (rol!="postulante" && pagnumber==1 && (cantidadfichasusadas<cntPersonajesValido))? 
        <div className="container mt-5" style={{
        
          width: '50%',
        }}>

            <div>
            <h1 style={{ color: 'red' }}>{textoadvertencia}</h1>

              
              </div>

              <br></br>
              
              <table style={{ width:"100% "}}>
                  <tbody>
                      <tr>
                          <td>


                            <form onSubmit={handleChange2}>
                              <label htmlFor="email">Nombre </label>
                              <input
                                id="name"
                                name="name"
                                type="name"
                                value={values.name}
                                onChange={handleChange2}
                              />
                               <br></br>
                               <label htmlFor="email">Url de Imagen</label>
                              <input
                                id="urlimg"
                                name="urlimg"
                                type="urlimg"
                                value={values.urlimg}
                                onChange={handleChange2}
                              />
                                <div className="App">
                                </div>
                               

                            </form>

                            


                                <br></br>

                                <div className="select-container">
                                <select onChange={handleChange}>
                                  {options.map((option) => (
                                    <option value={option.value}>{option.label}</option>
                                  ))}
                                </select>
                                </div>  

                                <br></br>
                                <br></br>

                                <div>

                                  Puntos disponibles = {pcaracteristicas}
                                </div>
                            


                          </td>
                          <td>
                          <br></br>


                              <button  disabled={disable}
                              className="btn btn-info btn-sm"
                              onClick={() => nextPage()}>
                              Siguiente
                              </button>
                            

                          </td>
                      </tr>
                  </tbody>
              </table>

          

          


            <br></br>

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
            <br></br>
            <br></br>
        </div>
       : (rol!="postulante" && pagnumber==2 && (cantidadfichasusadas<cntPersonajesValido))? <div className="container mt-5" style={{width: '50%',}}>

          <div>
          <h1 style={{ color: 'red' }}>{textoadvertencia}</h1>
          </div>



          <table style={{ width:"100% "}}>
                  <tbody>
                      <tr>
                          <td>
                          <br></br>
                          <br></br>


                          <th color="black" >ATRIBUTOS: {patributos}</th>
                          <br></br>
                              <p color="black" >Valor por  atributo principal=3</p>
                          <br></br>
                              <p color="black" >Valor por  atributo secundario=2</p>
                          <br></br>
                              <p color="black" >Valor por  atributo terciario=1</p>

                          <br></br>
                                                
                          </td>
                          <td>
                          <br></br>
                          <br></br>
                          <br></br>
                          <br></br>
                          <br></br>


                          <button  disabled={disable}
                              className="btn btn-info btn-sm"
                              onClick={() => enviar()}>
                              Enviar
                          </button>
                            

                          </td>
                      </tr>
                  </tbody>
              </table>

        

            <LineGruesa color="black" />

          <table border="1" style={{ width:"800px"}}>
            

                  <tbody>
                  {primhabs.map((estado, index) => (
                          <tr key={estado.id}>
                              <td >
                              <td style={{ width:"35px"}}><b>{Math.floor(estado.valor/3)}</b> (<i>{estado.valor}</i>)</td>
                              <td style={{ width:"170px"}}> <abbr title={estado.hidetext}>{estado.name}</abbr>. </td>
                              <td  style={{ width:"45px"}}  >
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
                                                  <td style={{ width:"250px"}}>
                                                  <td style={{ width:"50px"}}><b>{Math.floor(estados.valor/2)}</b> (<i>{estados.valor}</i>)</td>
                                                  <td style={{ width:"150px"}}> <abbr title={estados.hidetext}>{estados.name}</abbr>.</td>
                                                  <td style={{ width:"50px"}}>
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
                                                  <table border="1" style={{ width:"300px"}}>
                                                          <tbody>
                                                              {tercehabs.map((estadot, index) => (
                                                                  estadot.id_secun==estados.id?
                                                                      <tr key={estadot.id}>
                                                                          <td>
                                                                          <td style={{ width:"50px"}}><b>{Math.floor(estadot.valor/1)}</b> (<i>{estadot.valor}</i>)</td>
                                                                          <td style={{ width:"200px"}}> <abbr title={estadot.hidetext}>{estadot.name}</abbr>.</td>
                                                                          <td  style={{ width:"50px"}}>
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

                  <br></br>

                  <h1 style={{ color: 'red',width: '100%'}}>si la habilidad artistica o profesion de tu personaje no se encuentra en este listado, por favor indicarle al GM para su correspondiente creacion</h1>
            <br></br>
            <br></br>  
          </div>

        :(rol!="postulante" && (cantidadfichasusadas>=cntPersonajesValido))? <div>
        <h1 style={{ color: 'red' }}>ya has creado la maxima cantidad de personajes</h1>
        </div>

        :<div>
         <h1 style={{ color: 'red' }}>no tienes permisos, pidele a un GM que te lo habilite, brindandole tu correo de contacto</h1>
       </div>

        

        
      );

   
}

export default Crear
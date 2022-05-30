import Users from "../models/UserModel.js";
import Personaje from "../models/PersonajeModel.js";
import Raza from "../models/RazaModel.js";
import HabPrim from "../models/HabPrimModel.js";
import HabSecun from "../models/HabSecunModel.js";
import HabTerce from "../models/HabTerceModel.js";
import Estados from "../models/EstadosModel.js";
import PerHabPrim from "../models/PerHabPrimModel.js";
import PerHabSecun from "../models/PerHabSecunModel.js";
import PerHabTerce from "../models/PerHabTerceModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
 

export const getdatescreate= async(req, res) => {
    try {
        const razas = await Raza.findAll({
           
        });
        const hab1 = await HabPrim.findAll({
           
        });
        const hab2 = await HabSecun.findAll({
           
        });
        const hab3 = await HabTerce.findAll({
           
        });


        res.json({razas,hab1,hab2,hab3});
    } catch (error) {
        console.log(error);
    }
}



const organizarhabilidades= (PrimHab,SecunHab,TerceHab) => {
 
    var habilidades = {
        habilidadesprim: [],
      }
  
    PrimHab.forEach(elementp => {
        console.log(" prim valor");
        console.log(elementp.valor);
        console.log(" prim prim id");
        console.log(elementp.hab_prim.id);
        console.log(" prim prim name");
        console.log(elementp.hab_prim.name);
        
        habilidades.push({HabPrimName: elementp.hab_prim.name});
 
       // console.log(element);

            SecunHab.forEach(elements => {
                if(elements.hab_secun.id_hab_prim==elementp.hab_prim.id){
                    console.log("secun valor");
                    console.log(elements.valor);
                    console.log("secun hab secun id");
                    console.log(elements.hab_secun.id);
                    console.log("secun hab secun id_hab_prim");
                    console.log(elements.hab_secun.id_hab_prim);
                    console.log("secun hab secun name");
                    console.log(elements.hab_secun.name);

                }
                });
        
      });
    
  return habilidades
}


 

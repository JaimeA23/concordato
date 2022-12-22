import Users from "../models/UserModel.js";
import Personaje from "../models/PersonajeModel.js";
import Raza from "../models/RazaModel.js";
import Estados from "../models/EstadosModel.js";
import PerHabPrim from "../models/PerHabPrimModel.js";
import PerHabSecun from "../models/PerHabSecunModel.js";
import PerHabTerce from "../models/PerHabTerceModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
 
export const getUsers = async(req, res) => {
    try {
        const users = await Users.findAll({
            attributes:['id','name','email','rol']
        });
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}

export const getUser = async(req, res) => {
    if(req.query.id=="todos"){
        try {
            const users = await Personaje.findAll({
                attributes:['id','name','user_id'],
            });
            res.json(users);
        } catch (error) {
            console.log(error);
        }
    }
    else{
        try {
            const users = await Personaje.findAll({
                attributes:['id','name','user_id'],
                where: {
                    user_id: req.query.id
                   }
            });
            res.json(users);
        } catch (error) {
            console.log(error);
        }
    }
   
}
export const getpersonaje= async(req, res) => {
    try {
        const users = await Personaje.findOne({
            attributes:[
            'id',
            'user_id',
            'name',
            'raza_id',
            'puntos_carac_extras',
            'puntos_hab_extras',
            'fuerza',
            'agilidad',
            'destreza',
            'constitucion',
            'intelecto',
            'sabiduria',
            'espiritu',
            'poder',
            'belleza',
            'frialdad'],
            include: [
                {
                    association: Personaje.Users
                },
                {
                    association: Personaje.Raza
                }
            ],
            where: {
                id: req.query.id
               }
        });
        const estados = await Estados.findAll({
            attributes:['id','id_personaje','titulo','texto',
            'efecto'],
            where: {
                id_personaje: req.query.id
               }
        });
        const PrimHab = await PerHabPrim.findAll({
            attributes:['id','personaje_id','hab_id','valor'],
            include: [
                {
                    association: PerHabPrim.HabPrim
                }
            ],
            where: {
                personaje_id: req.query.id
               }
        });
        const SecunHab = await PerHabSecun.findAll({
            attributes:['id','personaje_id','hab_id','valor'],
            include: [
                {
                    association: PerHabSecun.HabSecun
                }
            ],
            where: {
                personaje_id: req.query.id
               }
        });
        const TerceHab = await PerHabTerce.findAll({
            attributes:['id','personaje_id','hab_id','valor'],
            include: [
                {
                    association: PerHabTerce.HabTerce
                }
            ],
            where: {
                personaje_id: req.query.id
               }
        });
      const datoscalculados=calculardatos(users);
    // nota se debe calcular aqui  const habilidades=organizarhabilidades(PrimHab,SecunHab,TerceHab);
        res.json({users,estados,datoscalculados,PrimHab,SecunHab,TerceHab});
    } catch (error) {
        console.log(error);
    }
}
export const Crearpersonaje= async(req, res) => {



    console.log("req.body")
    console.log(req.body.secunhab)
    console.log(req.body.terhab)

    const newpersonaje =  await Personaje.create({
        user_id: req.body.Ficha.user_id,
        name:req.body.Ficha.name,
        raza_id:req.body.Ficha.raza_id,
        puntos_carac_extras:0,
        puntos_hab_extras:0,
        fuerza:req.body.Ficha.fuerza,
        agilidad:req.body.Ficha.agilidad,
        destreza:req.body.Ficha.destreza,
        constitucion:req.body.Ficha.constitucion,
        intelecto:req.body.Ficha.intelecto,
        sabiduria:req.body.Ficha.sabiduria,
        espiritu:req.body.Ficha.espiritu,
        poder:req.body.Ficha.poder,
        belleza:req.body.Ficha.belleza,
        frialdad:req.body.Ficha.frialdad,
    });

    req.body.primhab.forEach(elementp => {


      
        PerHabPrim.create({
            personaje_id:newpersonaje.id,
            hab_id:elementp.id,
            valor:elementp.valor,
        });


    });


    req.body.secunhab.forEach(elements => {


      
        PerHabSecun.create({
            personaje_id:newpersonaje.id,
            hab_id:elements.id,
            valor:elements.valor,
        });


    });

    req.body.terhab.forEach(elements => {


      
        PerHabTerce.create({
            personaje_id:newpersonaje.id,
            hab_id:elements.id,
            valor:elements.valor,
        });


    });



    res.json({msg: "Registration Successful"});



  
}

const calculardatos= (users) => {
    const razaid=users.raza.id
    const vida=((users.raza.constitucion + users.constitucion) * 4) + (users.raza.fuerza + users.fuerza)
    const DanoFuerzapre=((users.raza.fuerza + users.fuerza)*0.75 + ((users.raza.destreza + users.destreza)*0.24)*((users.raza.fuerza + users.fuerza)*0.2) + (users.raza.agilidad + users.agilidad)*0.17).toFixed()*1+users.raza.bon_fuerza
    var datoscalculados={}

    var mana =((users.raza.intelecto + users.intelecto) * 13) +((users.raza.sabiduria + users.sabiduria) * 5);
    var comunion=((users.raza.espiritu + users.espiritu) * 5) +((users.raza.sabiduria + users.sabiduria) * 2); 

    var danoDestreza=((((((((((users.raza.frialdad + users.frialdad)*0.7)+((((users.raza.intelecto + users.intelecto)*1.5)+(users.raza.sabiduria + users.sabiduria))*0.3)+(((users.raza.agilidad + users.agilidad)*3)*0.5)*2+((users.raza.destreza + users.destreza)*1.5))))-((users.raza.constitucion + users.constitucion)*0.4))*0.4)-3.1)*0.8)+users.raza.bon_destreza).toFixed()*1;


    var regenSalud=Math.ceil(vida*0.1);

    var regenMana=((((users.raza.agilidad + users.agilidad)-(users.raza.constitucion + users.constitucion)*0.5-(users.raza.fuerza + users.fuerza)*0.09)*0.33)+(((users.raza.intelecto + users.intelecto)+(users.raza.sabiduria + users.sabiduria))*0.33)*((users.raza.frialdad + users.frialdad)/3)).toFixed()*1+(users.raza.destreza + users.destreza);

    var regenComunion=(users.raza.constitucion + users.constitucion)+(users.raza.poder + users.poder)+(users.raza.espiritu + users.espiritu);

    var poderMagico=((users.raza.poder + users.poder)*0.4+(0.6*(((users.raza.intelecto + users.intelecto)*0.6+(users.raza.sabiduria + users.sabiduria)*0.4)+((users.raza.frialdad + users.frialdad)*0.75+(users.raza.espiritu + users.espiritu)*0.25)+((users.raza.destreza + users.destreza)*0.75+(users.raza.agilidad + users.agilidad)*0.25)+((users.raza.constitucion + users.constitucion)*0.07)))).toFixed()*1;

    var poderEspiritual=(((((users.raza.constitucion + users.constitucion)+(((users.raza.agilidad + users.agilidad)+(users.raza.fuerza + users.fuerza))*0.3)+((users.raza.poder + users.poder)*0.3))*0.4)+(((users.raza.espiritu + users.espiritu)+(((users.raza.sabiduria + users.sabiduria)+(users.raza.frialdad + users.frialdad))*0.3))*0.6))+users.raza.bon_espiritu).toFixed()*1;



    if(razaid==2){

        regenMana=((((((users.raza.agilidad + users.agilidad)-(users.raza.constitucion + users.constitucion)*0.5-(users.raza.fuerza + users.fuerza)*0.09)*0.33)+(((users.raza.intelecto + users.intelecto)+(users.raza.sabiduria + users.sabiduria))*0.33)*((users.raza.frialdad + users.frialdad)/3))+(users.raza.destreza + users.destreza))/1.4).toFixed()*1;

    }

    if(razaid==6){

        regenSalud= Math.ceil((vida*0.1)*2);
    }


    datoscalculados={
        Salud: vida,
        Mana:mana,
        Comunion: comunion,
       
        DanoFuerza:DanoFuerzapre,
        DanoDestreza:danoDestreza,

        
        RegenSalud:regenSalud,
        RegenMana:  regenMana,          
        RegenComunion:regenComunion,

        PoderMagico: poderMagico,
        PoderEspiritual:poderEspiritual,            
        }

    
  return datoscalculados
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


 
export const Register = async(req, res) => {
    const { name, email, password, confPassword } = req.body;
    if(password !== confPassword) return res.status(400).json({msg: "Password and Confirm Password do not match"});
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await Users.create({
            name: name,
            email: email,
            password: hashPassword
        });
        res.json({msg: "Registration Successful"});
    } catch (error) {
        console.log(error);
    }
}
 
export const Login = async(req, res) => {
    try {
        const user = await Users.findAll({
            where:{
                email: req.body.email
            }
        });
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if(!match) return res.status(400).json({msg: "Wrong Password"});
        const userId = user[0].id;
        const name = user[0].name;
        const email = user[0].email;
        const accessToken = jwt.sign({userId, name, email}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '15s'
        });
        const refreshToken = jwt.sign({userId, name, email}, process.env.REFRESH_TOKEN_SECRET,{
            expiresIn: '1d'
        });
        await Users.update({refresh_token: refreshToken},{
            where:{
                id: userId
            }
        });
        res.cookie('refreshToken', refreshToken,{
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        res.json({ accessToken });
    } catch (error) {
        res.status(404).json({msg:"Email not found"});
    }
}
 
export const Logout = async(req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204);
    const user = await Users.findAll({
        where:{
            refresh_token: refreshToken
        }
    });
    if(!user[0]) return res.sendStatus(204);
    const userId = user[0].id;
    await Users.update({refresh_token: null},{
        where:{
            id: userId
        }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}
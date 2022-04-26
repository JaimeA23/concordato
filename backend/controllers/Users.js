import Users from "../models/UserModel.js";
import Personaje from "../models/PersonajeModel.js";
import Raza from "../models/RazaModel.js";
import Estados from "../models/EstadosModel.js";
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
            attributes:['id','user_id','name','raza_id',
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
      const datoscalculados=calculardatos(users);
        res.json({users,estados,datoscalculados});
    } catch (error) {
        console.log(error);
    }
}

const calculardatos= (users) => {
    const razaid=users.raza.id
    const vida=((users.raza.constitucion + users.constitucion) * 4) + (users.raza.fuerza + users.fuerza)
    const DanoFuerzapre=((users.raza.fuerza + users.fuerza)*0.75 + ((users.raza.destreza + users.destreza)*0.24)*((users.raza.fuerza + users.fuerza)*0.2) + (users.raza.agilidad + users.agilidad)*0.17).toFixed()*1+users.raza.bon_fuerza
    var datoscalculados={}
    if(razaid==2){

         datoscalculados={
            Salud: vida,
            Mana:((users.raza.intelecto + users.intelecto) * 13) +((users.raza.sabiduria + users.sabiduria) * 5),
            Comunion: ((users.raza.espiritu + users.espiritu) * 5) +((users.raza.sabiduria + users.sabiduria) * 2),
           
            DanoFuerza:DanoFuerzapre,
            DanoDestreza:((((((((((users.raza.frialdad + users.frialdad)*0.7)+((((users.raza.intelecto + users.intelecto)*1.5)+(users.raza.sabiduria + users.sabiduria))*0.3)+(((users.raza.agilidad + users.agilidad)*3)*0.5)*2+((users.raza.destreza + users.destreza)*1.5))))-((users.raza.constitucion + users.constitucion)*0.4))*0.4)-3.1)*0.8)+users.raza.bon_destreza).toFixed()*1,

            
            RegenSalud:Math.ceil(vida*0.1),
            RegenMana:((((((users.raza.agilidad + users.agilidad)-(users.raza.constitucion + users.constitucion)*0.5-(users.raza.fuerza + users.fuerza)*0.09)*0.33)+(((users.raza.intelecto + users.intelecto)+(users.raza.sabiduria + users.sabiduria))*0.33)*((users.raza.frialdad + users.frialdad)/3))+(users.raza.destreza + users.destreza))/1.4).toFixed()*1 ,
            RegenComunion:(users.raza.constitucion + users.constitucion)+(users.raza.poder + users.poder)+(users.raza.espiritu + users.espiritu),

            PoderMagico:((users.raza.poder + users.poder)*0.4+(0.6*(((users.raza.intelecto + users.intelecto)*0.6+(users.raza.sabiduria + users.sabiduria)*0.4)+((users.raza.frialdad + users.frialdad)*0.75+(users.raza.espiritu + users.espiritu)*0.25)+((users.raza.destreza + users.destreza)*0.75+(users.raza.agilidad + users.agilidad)*0.25)+((users.raza.constitucion + users.constitucion)*0.07)))).toFixed()*1,
            PoderEspiritual:(((((users.raza.constitucion + users.constitucion)+(((users.raza.agilidad + users.agilidad)+(users.raza.fuerza + users.fuerza))*0.3)+((users.raza.poder + users.poder)*0.3))*0.4)+(((users.raza.espiritu + users.espiritu)+(((users.raza.sabiduria + users.sabiduria)+(users.raza.frialdad + users.frialdad))*0.3))*0.6))+users.raza.bon_espiritu).toFixed()*1,
         
            
    }

    }
    else if(razaid==6){

         datoscalculados={
            Salud: vida,
            Mana:((users.raza.intelecto + users.intelecto) * 13) +((users.raza.sabiduria + users.sabiduria) * 5),
            Comunion: ((users.raza.espiritu + users.espiritu) * 5) +((users.raza.sabiduria + users.sabiduria) * 2),
           
            DanoFuerza:DanoFuerzapre,
            DanoDestreza:((((((((((users.raza.frialdad + users.frialdad)*0.7)+((((users.raza.intelecto + users.intelecto)*1.5)+(users.raza.sabiduria + users.sabiduria))*0.3)+(((users.raza.agilidad + users.agilidad)*3)*0.5)*2+((users.raza.destreza + users.destreza)*1.5))))-((users.raza.constitucion + users.constitucion)*0.4))*0.4)-3.1)*0.8)+users.raza.bon_destreza).toFixed()*1,

            
            RegenSalud:Math.ceil((vida*0.1)*2),
            RegenMana:((((users.raza.agilidad + users.agilidad)-(users.raza.constitucion + users.constitucion)*0.5-(users.raza.fuerza + users.fuerza)*0.09)*0.33)+(((users.raza.intelecto + users.intelecto)+(users.raza.sabiduria + users.sabiduria))*0.33)*((users.raza.frialdad + users.frialdad)/3)).toFixed()*1+(users.raza.destreza + users.destreza),
            RegenComunion:(users.raza.constitucion + users.constitucion)+(users.raza.poder + users.poder)+(users.raza.espiritu + users.espiritu),
            
            PoderMagico:((users.raza.poder + users.poder)*0.4+(0.6*(((users.raza.intelecto + users.intelecto)*0.6+(users.raza.sabiduria + users.sabiduria)*0.4)+((users.raza.frialdad + users.frialdad)*0.75+(users.raza.espiritu + users.espiritu)*0.25)+((users.raza.destreza + users.destreza)*0.75+(users.raza.agilidad + users.agilidad)*0.25)+((users.raza.constitucion + users.constitucion)*0.07)))).toFixed()*1,
            PoderEspiritual:(((((users.raza.constitucion + users.constitucion)+(((users.raza.agilidad + users.agilidad)+(users.raza.fuerza + users.fuerza))*0.3)+((users.raza.poder + users.poder)*0.3))*0.4)+(((users.raza.espiritu + users.espiritu)+(((users.raza.sabiduria + users.sabiduria)+(users.raza.frialdad + users.frialdad))*0.3))*0.6))+users.raza.bon_espiritu).toFixed()*1,
         
            
    }


    }
    else {
         datoscalculados={
            Salud: vida,
            Mana:((users.raza.intelecto + users.intelecto) * 13) +((users.raza.sabiduria + users.sabiduria) * 5),
            Comunion: ((users.raza.espiritu + users.espiritu) * 5) +((users.raza.sabiduria + users.sabiduria) * 2),
           
            DanoFuerza:DanoFuerzapre,
            DanoDestreza:((((((((((users.raza.frialdad + users.frialdad)*0.7)+((((users.raza.intelecto + users.intelecto)*1.5)+(users.raza.sabiduria + users.sabiduria))*0.3)+(((users.raza.agilidad + users.agilidad)*3)*0.5)*2+((users.raza.destreza + users.destreza)*1.5))))-((users.raza.constitucion + users.constitucion)*0.4))*0.4)-3.1)*0.8)+users.raza.bon_destreza).toFixed()*1,

            
            RegenSalud:Math.ceil(vida*0.1),
            RegenMana:((((users.raza.agilidad + users.agilidad)-(users.raza.constitucion + users.constitucion)*0.5-(users.raza.fuerza + users.fuerza)*0.09)*0.33)+(((users.raza.intelecto + users.intelecto)+(users.raza.sabiduria + users.sabiduria))*0.33)*((users.raza.frialdad + users.frialdad)/3)).toFixed()*1+(users.raza.destreza + users.destreza),
            RegenComunion:(users.raza.constitucion + users.constitucion)+(users.raza.poder + users.poder)+(users.raza.espiritu + users.espiritu),
            
            PoderMagico:((users.raza.poder + users.poder)*0.4+(0.6*(((users.raza.intelecto + users.intelecto)*0.6+(users.raza.sabiduria + users.sabiduria)*0.4)+((users.raza.frialdad + users.frialdad)*0.75+(users.raza.espiritu + users.espiritu)*0.25)+((users.raza.destreza + users.destreza)*0.75+(users.raza.agilidad + users.agilidad)*0.25)+((users.raza.constitucion + users.constitucion)*0.07)))).toFixed()*1,
            PoderEspiritual:(((((users.raza.constitucion + users.constitucion)+(((users.raza.agilidad + users.agilidad)+(users.raza.fuerza + users.fuerza))*0.3)+((users.raza.poder + users.poder)*0.3))*0.4)+(((users.raza.espiritu + users.espiritu)+(((users.raza.sabiduria + users.sabiduria)+(users.raza.frialdad + users.frialdad))*0.3))*0.6))+users.raza.bon_espiritu).toFixed()*1,
         
            
    }
    }
    
  return datoscalculados
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
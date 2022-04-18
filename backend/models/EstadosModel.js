

import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Personajes from "../models/PersonajeModel.js";

const { DataTypes } = Sequelize;
 
const Estados = db.define('estados',{
    id_personaje:{
        type: DataTypes.STRING
    },
    titulo:{
        type: DataTypes.STRING
    },
    texto:{
        type: DataTypes.STRING
    },
    efecto:{
        type: DataTypes.STRING
    }
    
},{
    
});
 
(async () => {
    await db.sync();
})();

export default Estados;


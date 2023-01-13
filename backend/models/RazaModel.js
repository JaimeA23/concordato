import { Sequelize } from "sequelize";
import db from "../config/Database.js";
 
const { DataTypes } = Sequelize;
 
const Raza = db.define('razas',{
    raza_name:{
        type: DataTypes.STRING
    },
    fuerza:{
        type: DataTypes.STRING
    },
    agilidad:{
        type: DataTypes.STRING
    },
    destreza:{
        type: DataTypes.STRING
    },
    constitucion:{
        type: DataTypes.STRING
    },
    intelecto:{
        type: DataTypes.STRING
    },
    sabiduria:{
        type: DataTypes.STRING
    },
    espiritu:{
        type: DataTypes.STRING
    },
    poder:{
        type: DataTypes.STRING
    },
    belleza:{
        type: DataTypes.STRING
    },
    frialdad:{
        type: DataTypes.STRING
    },
    bon_fuerza:{
        type: DataTypes.STRING
    },
    bon_destreza:{
        type: DataTypes.STRING
    },
    bon_espiritu:{
        type: DataTypes.STRING
    },
    bon_mana:{
        type: DataTypes.STRING
    },
    bon_salud:{
        type: DataTypes.STRING
    },
    bon_com:{
        type: DataTypes.STRING
    }

},{
    
});
 
(async () => {
    await db.sync();
})();
 
export default Raza;
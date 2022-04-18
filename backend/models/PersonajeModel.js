

import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "../models/UserModel.js";
import Raza from "../models/RazaModel.js";
const { DataTypes } = Sequelize;
 
const Personajes = db.define('personajes',{
    user_id:{
        type: DataTypes.STRING
    },
    name:{
        type: DataTypes.STRING
    },
    raza_id:{
        type: DataTypes.STRING
    },
    puntos_carac_extras:{
        type: DataTypes.STRING
    },
    puntos_hab_extras:{
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
    }
},{
    
});
 
(async () => {
    await db.sync();
})();
Personajes.Users = Personajes.belongsTo(Users,{ foreignKey: "user_id" });
Personajes.Raza = Personajes.belongsTo(Raza,{ foreignKey: "raza_id" });
export default Personajes;


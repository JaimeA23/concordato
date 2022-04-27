

import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import HabPrim from "../models/HabPrimModel.js";

const { DataTypes } = Sequelize;
 
const PerHabPrim = db.define('pers_hab_prims',{
    personaje_id:{
        type: DataTypes.STRING
    },
    hab_id:{
        type: DataTypes.STRING
    },
    valor:{
        type: DataTypes.STRING
    }    
},{
    
});
 
(async () => {
    await db.sync();
})();
PerHabPrim.HabPrim = PerHabPrim.belongsTo(HabPrim,{ foreignKey: "hab_id" });
export default PerHabPrim;


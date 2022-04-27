

import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import HabTerce from "../models/HabTerceModel.js";

const { DataTypes } = Sequelize;
 
const PerHabTerce = db.define('pers_hab_ters',{
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
PerHabTerce.HabTerce = PerHabTerce.belongsTo(HabTerce,{ foreignKey: "hab_id" });
export default PerHabTerce;


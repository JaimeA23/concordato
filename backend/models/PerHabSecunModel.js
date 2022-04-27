

import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import HabSecun from "../models/HabSecunModel.js";

const { DataTypes } = Sequelize;
 
const PerHabSecun = db.define('pers_hab_secuns',{
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
PerHabSecun.HabSecun = PerHabSecun.belongsTo(HabSecun,{ foreignKey: "hab_id" });
export default PerHabSecun;


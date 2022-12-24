import { Sequelize } from "sequelize";
import db from "../config/Database.js";
 
const { DataTypes } = Sequelize;
 
const HabTerce = db.define('hab_tercs',{
    id_hab_secun:{
        type: DataTypes.STRING
    },
    name:{
        type: DataTypes.STRING
    },
    hidetext:{
        type: DataTypes.STRING
    }
},{
    
});
 
(async () => {
    await db.sync();
})();
 
export default HabTerce;
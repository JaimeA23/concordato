import { Sequelize } from "sequelize";
import db from "../config/Database.js";
 
const { DataTypes } = Sequelize;
 
const HabSecun = db.define('hab_secuns',{
    id_hab_prim:{
        type: DataTypes.STRING
    },
    name:{
        type: DataTypes.STRING
    }
},{
    
});
 
(async () => {
    await db.sync();
})();
 
export default HabSecun;
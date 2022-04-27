import { Sequelize } from "sequelize";
import db from "../config/Database.js";
 
const { DataTypes } = Sequelize;
 
const HabPrim = db.define('hab_prims',{
    name:{
        type: DataTypes.STRING
    }
},{
    
});
 
(async () => {
    await db.sync();
})();
 
export default HabPrim;
import { Sequelize } from "sequelize";
 
const db = new Sequelize('Concordato', 'admin', 'Hipopotamos', {
    host: "database-1.ch3uvomhff65.us-east-2.rds.amazonaws.com",
    dialect: "mysql"
});
 
export default db;
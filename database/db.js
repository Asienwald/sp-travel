const mysql = require("mysql2");

const dbconnect = {
    getConnection: ()=>{
        const conn = mysql.createPool({
            host:"localhost",
            port: 3306,
            user: "pikachu",
            password: "password",
            database: "friendbook"
        }).promise();
        return conn;
        
       
    }
}

module.exports = dbconnect;
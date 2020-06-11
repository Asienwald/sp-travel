const mysql = require("mysql2");

// const dbconnect = {
//     getConnection: ()=>{
//         const conn = mysql.createPool({
//             host:"localhost",
//             port: 3306,
//             user: "pikachu",
//             password: "password",
//             database: "sptravel"
//         }).promise();
//         return conn;
//     }
// }
const dbconnect = {
    getConnection: ()=>{
        const conn = mysql.createPool({
            host:"localhost",
            port: 3306,
            user: "root",
            password: "frickFrack28!",
            database: "sptravel"
        }).promise();
        return conn;
    }
}

module.exports = dbconnect;
/*
Class: DISM/FT/2A/02
Group:
Members:
1. Loh Kar Wei 1904204
2. Jess Kwek 1928934
*/

const mysql = require("mysql2");

const dbconnect = {
    getConnection: ()=>{
        const conn = mysql.createPool({
            host:"localhost",
            port: 3306,
            user: "pikachu",
            password: "password",
            database: "SPTRAVEL"
        }).promise();
        return conn;
    }
}
// const dbconnect = {
//     getConnection: ()=>{
//         const conn = mysql.createPool({
//             host:"localhost",
//             port: 3306,
//             user: "root",
//             password: "frickFrack28!",
//             database: "sptravel"
//         }).promise();
//         return conn;
//     }
// }

module.exports = dbconnect;
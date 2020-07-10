const db = require("../database/db");
// const crypto = require("crypto");
const bcrypt = require("bcrypt");

const dbConn = db.getConnection()


const generate_hash_password = async (password, salt = null) => {
    if (salt == null) salt = await bcrypt.genSalt(8);
    const hash = await bcrypt.hash(password, salt);
    return [hash, salt];
}




const get_users = async () => {
    const sql = "SELECT userid, username, profile_pic_url, created_at FROM users";
    [results, fields] = await dbConn.query(sql);
    return results
}

const add_users = async (username, email, profile_pic_url, password,admin=false) => {
    const role = admin? "admin":"user";
    const sql = "INSERT INTO users(username, email, profile_pic_url, password, salt, role) values(?, ?, ?, ?, ?, ?)"
    const [hash, salt] = await generate_hash_password(password);
    [results, fields] = await dbConn.query(sql, [username, email, `${profile_pic_url}.png`, hash, salt,role]);
    return results.insertId
}

const get_users_by_id = async (userID) => {
    const sql = "SELECT userid, username, profile_pic_url,role created_at FROM users where userid = ?";
    [results, fields] = await dbConn.query(sql, [userID]);
    return results
}

const update_users = async (userID, username, email, profile_pic_url, password) => {
    const sql = "UPDATE users set username = ?, email = ? , profile_pic_url = ?, password = ?, salt = ? where userID = ?"
    const [hash, salt] = await generate_hash_password(password);
    [results, fields] = await dbConn.query(sql, [username, email, profile_pic_url, hash, salt, userID]);
    return null

}

const login_user = async (email, password) => {
    const [results, fields] = await dbConn.query("select password, salt, userid, role,username from users where email = ?", [email]);
    if (results.length == 0) throw new Error("no such user");
    else {
        const hash = results[0]["password"];
        const salt = results[0]["salt"];    
        console.log(results);
        const given_hash = await generate_hash_password(password, salt);

        const match = (hash == given_hash[0]) ? true : false;
        if (match) return {"message":`Login Successful, welcome user ${results[0].username}`,"user":{"userid":results[0].userid,"role":results[0].role}};
        else throw new Error("Wrong password");
    }
}

module.exports = {
    get_users: get_users,
    add_users: add_users,
    get_users_by_id: get_users_by_id,
    update_users: update_users,
    login_user: login_user
}
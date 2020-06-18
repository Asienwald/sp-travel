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

const add_users = async (username, email, profile_pic_url, password) => {
    const sql = "INSERT INTO users(username, email, profile_pic_url, password, salt) values(?,?,?, ? ,?)"
    const [hash, salt] = await generate_hash_password(password);
    [results, fields] = await dbConn.query(sql, [username, email, `${profile_pic_url}.png`, hash, salt]);
    return results.insertId

}

const get_users_by_id = async (userID) => {
    const sql = "SELECT userid, username, profile_pic_url, created_at FROM users where userid=?";
    [results, fields] = await dbConn.query(sql, [userID]);
    return results
}

const update_users = async (userID, username, email, profile_pic_url, password) => {
    const sql = "UPDATE users set username=?, email=? , profile_pic_url=?, password = ?, salt = ? where userID=?"
    const [hash, salt] = await generate_hash_password(password);
    [results, fields] = await dbConn.query(sql, [username, email, profile_pic_url, hash, salt, userID]);
    return null

}

const login_user = async (username, password) => {
    const [results, fields] = await dbConn.query("select password, salt from users where username = ?", [username]);
    if (results.length == 0) throw new Error("no such user");
    else {
        const hash = results[0]["password"];
        const salt = results[0]["salt"];    

        const given_hash = await generate_hash_password(password, salt);

        const match = (hash == given_hash[0]) ? true : false;
        if (match) return `Login Successful, welcome user ${username}`;
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
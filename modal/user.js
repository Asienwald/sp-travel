const db = require("../database/db");

const dbConn = db.getConnection()

const get_users = async () => {
    const sql = "SELECT * FROM users";
    [results, fields] = await dbConn.query(sql);
    return results
}

const add_users = async (username, email, profile_pic_url) => {
    const sql = "INSERT INTO users(username, email, profile_pic_url) values(?,?,?)"
    [results, fields] = await dbConn.query(sql, [username, email, profile_pic_url]);
    return results.insertID

}

const get_users_by_id = async (userID) => {
    const sql = "SELECT * FROM users where userid=?";
    [results, fields] = await dbConn.query(sql, [userID]);
    return results
}

const update_users = async (userID,username, email, profile_pic_url) => {
    const sql = "UPDATE users set username=?, email=? , profile_pic_url=? where userID=?"
    [results, fields] = await dbConn.query(sql, [userID,username, email, profile_pic_url]);
    return null

}

module.exports = {
    get_users: get_users,
    add_users: add_users,
    get_users_by_id: get_users_by_id,
    update_users: update_users
}
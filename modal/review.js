const db = require("../database/db");
const userDB = require("./user");
const dbConn = db.getConnection();

const create_review = async(uid, tid, content, rating) => {
    const user = await userDB.get_users_by_id(uid);
    const username = user[0].username
    const sql = "insert into reviews (fk_travel_id, content, rating, fk_username) values (?, ?, ?, ?);";
    [results, fields] = await dbConn.query(sql, [tid, content, rating, username]);
    return results.insertId;
}

const get_review = async(tid) => {
    const sql = "select * from reviews where fk_travel_id = ?;";
    const [results, fields] = await dbConn.query(sql, [tid]);
    return results;
}

module.exports = {
    create_review: create_review,
    get_review: get_review
}
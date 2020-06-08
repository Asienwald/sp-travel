const db = require("../database/db");
const dbConn = db.getConnection();

const create_review = async(uid, tid, content, rating) => {
    const sql = "insert into reviews (fk_travel_id, content, rating, fk_username) values (?, ?, ?, ?);";
    [results, fields] = await dbConn.query(sql, [tid, content, rating, uid]);
    return results.insertID;
}

const get_review = async(tid) => {
    const sql = "select * from reviews where fk_travel_id = ?;";
    [results, fields] = await dbConn,query(sql, [tid]);
    return results;
}

module.exports = {
    create_review: create_review,
    get_review: get_review
}
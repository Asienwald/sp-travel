const db = require("../database/db");
const dbConn = db.getConnection();

const create_review = async(uid, tid, content, rating) => {
    const sql = "insert into reviews (travel_id, content, rating, user_id) values (?, ?, ?, ?);";
    [results, fields] = await dbConn.query(sql, [tid, content, rating, uid]);
    return results.insertId;
}

const get_review = async(tid) => {
    const sql = "select reviews.travel_id, reviews.content, reviews.rating, users.username, users.profile_pic_url, reviews.created_at from reviews inner join users on reviews.user_id = users.userid where reviews.travel_id = ?;";
    const [results, fields] = await dbConn.query(sql, [tid]);
    console.log(results);
    return results;
}

module.exports = {
    create_review: create_review,
    get_review: get_review
}
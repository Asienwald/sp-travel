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

const get_travel_listings = async () => {
    const sql = "SELECT * FROM travel_listings";
    [results, fields] = await dbConn.query(sql);
    return results
}

const add_users = async (title, description, image,price,country,travel_period) => {
    const sql = "INSERT INTO travel_listings(title, description, image,price,country,travel_period) values(?,?,?,?,?,?)"
    [results, fields] = await dbConn.query(sql, [title, description, image,price,country,travel_period]);
    return results.insertID

}
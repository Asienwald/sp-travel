const db = require("../database/db");

const dbConn = db.getConnection()

const get_travel_listings = async () => {
    const sql = "SELECT * FROM travel_listings";
    [results, fields] = await dbConn.query(sql);
    return results
}

const add_travel_listings = async (title, description, image,price,country,travel_period) => {
    const sql = "INSERT INTO travel_listings(title, description, image,price,country,travel_period) values(?,?,?,?,?,?)"
    [results, fields] = await dbConn.query(sql, [title, description, image,price,country,travel_period]);
    return results.insertID

}

module.exports = {
    get_travel_listings = get_travel_listings,
    add_travel_listings = add_travel_listings
}
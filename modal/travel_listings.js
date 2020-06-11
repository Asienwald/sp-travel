const db = require("../database/db");

const dbConn = db.getConnection()

const get_travel_listings = async () => {
    const sql = "SELECT * FROM travel_listings";
    const [results, fields] = await dbConn.query(sql);
    return results
}

<<<<<<< Updated upstream
const add_travel_listings = async (title, description, image, price, country, travel_period) => {
    const sql = "INSERT INTO travel_listings(title, description, image_url, price,country,travel_period) values(?,?,?,?,?,?)"
    const [results, fields] = await dbConn.query(sql, [title, description, image, price, country, travel_period]);
=======
const add_travel_listings = async (title, description, image_url, price, country, travel_period) => {
    const sql = "INSERT INTO travel_listings(title, description, image_url ,price,country,travel_period) values(?,?,?,?,?,?)"
    const [results, fields] = await dbConn.query(sql, [title, description, image_url, price, country, travel_period]);
>>>>>>> Stashed changes
    return results.insertId

}

const delete_travel_listing = async (id) => {
    const sql = "delete from travel_listings where travel_id = ?"
    const [results, fields] = await dbConn.query(sql, [id]);
    return results.affectedRows;
}

const update_travel_listing = async (title, description, image_url, price, country, travel_period,travel_id) => {
    const sql = "update travel_listings set title=?, description=?, image_url=?, price=?, country=?, travel_period=? where travel_id=?;"
    const [results, fields] = await dbConn.query(sql, [title, description, image_url, price, country, travel_period,travel_id]);
    return results.affectedRows;
}

const get_initinerary = async (travel_id) => {
    const sql = "select * from itinerary where fk_travel_id = ?;";
    const [results, fields] = await dbConn.query(sql, [travel_id]);
    return results;
}

const create_itinerary = async (travel_id, day, activity) => {
    const sql = "insert into itinerary (fk_travel_id, day, activity) values (?, ?, ?);";
    const [results, fields] = await dbConn.query(sql, [travel_id, day, activity]);
    return results.insertId;
}


module.exports = {
    get_travel_listings: get_travel_listings,
    add_travel_listings: add_travel_listings,
    delete_travel_listing: delete_travel_listing,
    update_travel_listing: update_travel_listing,
    get_initinerary: get_initinerary,
    create_itinerary: create_itinerary
}
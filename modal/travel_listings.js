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

const delete_travel_listing = async(id) => {
    const sql = "delete from travel_listing where travel_id = ?"
    [results, fields] = await dbConn.query(sql, [id]);
    return results.affectedRows;
}

const update_travel_listing = async(title, description, image, price, country, travel_period) => {
    const sql = "update travel_listing set (title, description, image, price, country, travel_period) values (?, ?, ?, ?, ?, ?);"
    [results, fields] = await dbConn.query(sql, [title, description, image, price, country, travel_period]);
    return results.affectRows;
}

const get_initinerary = async(travel_id) => {
    const sql = "select * from itinerary where fk_travel_id = ?;";
    [results, fields] = await dbConn.query(sql, [travel_id]);
    return results;
}

const create_itinerary = async(travel_id, day, activity) => {
    const sql = "insert into itinerary (day, activity, fk_travel_id) values (?, ?, ?);";
    [results, fields] = await dbConn.query(sql, [travel_id, day, activity]);
    return results.insertID;
}


module.exports = {
    get_travel_listings: get_travel_listings,
    add_travel_listings: add_travel_listings,
    delete_travel_listing: delete_travel_listing,
    update_travel_listing: update_travel_listing,
    get_initinerary: get_initinerary,
    create_itinerary: create_itinerary
}
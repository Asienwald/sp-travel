const db = require("../database/db");

const dbConn = db.getConnection()

const get_travel_listings = async () => {
    const sql = "SELECT * FROM travel_listings";
    const [results, fields] = await dbConn.query(sql);
    return results
}

const get_travel_listings_by_id = async (id) => {
    const sql = "SELECT * FROM travel_listings where travel_id=? ";
    const [results, fields] = await dbConn.query(sql,[id]);
    return results
}

const filter_travel_listings = async(country, dateFrom, dateTo, minPrice, maxPrice) => {
    let sql = "select * from travel_listings where ", conditions = [], values = [];
    console.log(dateFrom);
    if(country != ""){
        conditions.push("country like ? ");
        values.push(`%${country}%`);
    }
    if(dateFrom != ""){
        conditions.push("date_from >= ? ");
        values.push(dateFrom);
    }
    if(dateTo != ""){
        conditions.push("date_to <= ? ");
        values.push(dateTo);
    }
    if(minPrice != ""){
        conditions.push("price >= ? ");
        values.push(minPrice);
    }
    if(maxPrice != ""){
        conditions.push("price <= ? ");
        values.push(maxPrice);
    }
    if(conditions.length == 0){
        sql = sql.replace(" where ", "");
        console.log(sql);
    }else{
        // console.log(conditions);
        conditions = conditions.join("and ");
        sql = sql + conditions;
        // console.log(sql);
        // console.log(values);
    }
    
    const [results, fields] =  await dbConn.query(sql, values);
    console.log(results);
    return results;
}

const add_travel_listings = async (title, description, image_url, price, country, date_from, date_to) => {
    const sql = "INSERT INTO travel_listings(title, description, image_url ,price, country, date_from, date_to) values(?,?,?,?,?,?,?)"
    const [results, fields] = await dbConn.query(sql, [title, description, image_url, price, country, date_from, date_to]);
    return results.insertId

}

const delete_travel_listing = async (id) => {
    const sql = "delete from travel_listings where travel_id = ?"
    const [results, fields] = await dbConn.query(sql, [id]);
    return results.affectedRows;
}

const update_travel_listing = async (title, description, price, country, date_from, date_to, travel_id, image_url="") => {
    const sql = image_url != "" ? "update travel_listings set title=?, description=?, image_url=?, price=?, country=?, date_from=?, date_to=? where travel_id=?;" :  "update travel_listings set title=?, description=?, price=?, country=?, date_from=?, date_to=? where travel_id=?;" 
    console.log(date_from);
    const [results, fields] = await dbConn.query(sql, image_url != "" ? [title, description, image_url, price, country, date_from, date_to,travel_id] :  [title, description, price, country, date_from, date_to,travel_id] );
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

const delete_itinerary = async(it_id) => {
    const sql = "delete from itinerary where itinerary_id = ?";
    const [result, field] = await dbConn.query(sql, [it_id]);
    return result.affectedRows;
}


module.exports = {
    get_travel_listings: get_travel_listings,
    get_travel_listings_by_id: get_travel_listings_by_id,
    filter_travel_listings: filter_travel_listings,
    add_travel_listings: add_travel_listings,
    delete_travel_listing: delete_travel_listing,
    update_travel_listing: update_travel_listing,
    get_initinerary: get_initinerary,
    create_itinerary: create_itinerary,
    delete_itinerary: delete_itinerary
}
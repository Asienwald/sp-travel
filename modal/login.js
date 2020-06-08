const crypto = require("crypto");

// generate 16 bit salt
const generateSalt = () => {
    return crypto.randomBytes(16).toString("hex").slice(0, 16);
}

console.log(generateSalt());
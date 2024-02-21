import mysql2 from "mysql2"

const connection = mysql2.createConnection({
    hostname: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "crud"
})

connection.connect((err) => {
    if (err) {
        console.log("ERROR: ", err.message);
    } else {
        console.log("connection created with MySQL successfully!!!")
    }
})

export default connection
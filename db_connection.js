import mysql2 from "mysql2"

const connection = mysql2.createConnection({
    hostname: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "mysql_crud"
})


export default connection
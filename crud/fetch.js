import express, { Router } from "express";
import connection from "../db_connection.js"





//routing

export const router = Router()

router.get("/", (req, res) => {
    connection.query("SELECT * FROM EMPLOYEES",
        (err, array, fields) => {
            res.send(array);
        })
})

router.post("/", (req, res) => {
    // const { E_ID, E_NAME, E_SALARY } = req.body
    console.log(req.body, "22")

    connection.query("INSERT INTO EMPLOYEES VALUES (req.body)",
        (err, result) => {
            if (err) {
                res.send({
                    "INSERT": "FAIL",
                    error: err.message
                })
            } else {
                res.send({
                    "INSERT": "SUCCESS",
                    data: result
                })
            }
        })
})

router.patch("/", (req, res) => {

    console.log(req.body, "41")
    connection.query("UPDATE EMPLOYEES SET (req.body)",
        (err, result) => {
            if (result) {
                res.send({
                    UPDATE: "SUCCESS",
                    RESULT: result,
                })
            } else {
                res.send({
                    UPDATE: "FAILED",
                    ERROR: err.message
                })
            }
        })
})


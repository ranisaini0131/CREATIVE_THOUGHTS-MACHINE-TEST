import connection from "../../db_connection.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


// Signup endpoint
const signupUser = async (req, res) => {
    const { username, email, password } = req.body;

    // Simple email validation
    if (!/^\S+@\S+\.\S+$/.test(email)) {
        return res.status(400).json({ error: 'Invalid email address' });
    }

    // Check if the email already exists
    connection.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) {
            throw err;
        }

        if (results.length > 0) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        //password hashing
        const hashedPassword = await bcrypt.hash(password, 10)


        // Insert new user into the database
        connection.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword], (err, result) => {
            if (err) {
                throw err;
            }
            console.log('User registered');
            res.status(200).json({
                status: "sucess",
                message: 'User registered successfully',
                user: username
            });
        });
    });
};

const loginUser = (req, res) => {
    const { email, password } = req.body;
    console.log(req.body)

    if (email && password) {
        connection.query('SELECT * FROM users WHERE email = ? ', [email], async (error, results) => {

            console.log(results, "50")
            if (error) {
                throw error;
            }

            if (results.length > 0) {
                const hashedPassword = results[0].password;
                const passwordMatch = await bcrypt.compare(password, hashedPassword);

                console.log(process.env.securitykey)
                if (passwordMatch) {
                    const token = jwt.sign(
                        {
                            id: results.id
                        },
                        process.env.securitykey,
                        {
                            expiresIn: "1h"
                        }
                    )

                    res.status(200).json({
                        status: "sucess",
                        message: 'User login successfully',
                        token: token
                    });
                } else {
                    res.status(500).json({
                        status: "failed",
                        message: 'Password incorrect'
                    });
                }


            } else {
                res.status(500).json({
                    status: "failed",
                    message: 'Invalid credentials'
                });
            }
        })
    } else {
        res.status(500).json({
            status: "failed",
            message: 'Email or password not valid'
        });
    }
}

export {
    signupUser,
    loginUser
}
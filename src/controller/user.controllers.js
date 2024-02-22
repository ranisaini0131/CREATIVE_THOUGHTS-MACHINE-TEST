import jwt from "jsonwebtoken"

// Signup endpoint
const signupUser = async (req, res) => {
    const { username, email, password } = req.body;

    // Simple email validation
    if (!/^\S+@\S+\.\S+$/.test(email)) {
        return res.status(400).json({ error: 'Invalid email address' });
    }

    // Check if the email already exists
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) {
            throw err;
        }

        if (results.length > 0) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        //password hashing
        const hashedPassword = await bcrypt.hash(password, 10)


        // Insert new user into the database
        db.query('INSERT INTO users (username, email, hashedpassword) VALUES (?, ?, ?)', [username, email, hashedPassword], (err, result) => {
            if (err) {
                throw err;
            }
            console.log('User registered');
            res.status(200).json({
                status: "sucess",
                message: 'User registered successfully'
            });
        });
    });
};

const loginUser = (req, res) => {
    const { email, password } = req.body;

    // Check if user exists with provided email and password
    db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], async (err, results) => {
        if (err) {
            throw err;
        }

        if (results.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const hashedPassword = results[0].password
        const verifyPassword = await bcrypt.compare(password, hashedPassword)

        if (verifyPassword) {
            //generate token
            const token = jwt.sign(
                {
                    user: user,
                    passowrd: req.body.passowrd
                },
                process.env.securitykey,
                {
                    expiresIn: "1h"
                }
            )
        }

        // User found, return success response
        console.log('User logged in');
        res.status(200).json({
            status: "success",
            message: 'Login successful',
            token: token

        });
    });
}


export {
    signupUser,
    loginUser
}
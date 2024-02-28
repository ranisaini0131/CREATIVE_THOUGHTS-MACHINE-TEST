import connection from "../../db_connection.js";

const addToCart = (req, res) => {
    const { userId, productId, quantity } = req.body;

    const sql = 'INSERT INTO cart (userId, productId, quantity) VALUES (?, ?, ?)';
    connection.query(sql, [userId, productId, quantity], (err, result) => {
        if (err) {
            console.error('Error adding to cart: ', err);
            res.status(500).json({ error: 'Error adding to cart' });
            return;
        }
        res.json({
            message: 'Added to cart successfully',
            cart: result
        });
    });
};

export default addToCart
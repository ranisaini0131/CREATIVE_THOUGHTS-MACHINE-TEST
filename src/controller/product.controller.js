import connection from "../../db_connection.js";

// Create a new product
const createProduct = async (req, res) => {
    const { name, quantity, price } = req.body;
    const images = req.files?.map(file => file.filename).join(',');

    connection.query('INSERT INTO products (name, quantity, image, price) VALUES (?, ?, ?, ?)', [name, quantity, images, price], (err, result) => {
        if (err) {
            throw err;
        }
        console.log('Product added');
        res.status(200).json({
            message: 'Product added successfully',
            newProduct: result
        });
    });
};

// Read all products
const getAllProducts = (req, res) => {
    connection.query('SELECT * FROM products', (err, results) => {
        if (err) {
            throw err;
        }
        res.status(200).json(results);
    });
};

// Update product by id
const updateProduct = (req, res) => {
    const { name, quantity, price } = req.body;
    const productId = req.params.id;

    connection.query('UPDATE products SET name = ?, quantity = ?, price = ? WHERE id = ?', [name, quantity, price, productId], (err, result) => {
        if (err) {
            throw err;
        }
        console.log('Product updated');
        res.status(200).json({
            message: 'Product updated successfully',
            updateProduct: result
        });
    });
};

// Delete product by id
const deleteProduct = (req, res) => {
    const productId = req.params.id;

    connection.query('DELETE FROM products WHERE id = ?', [productId], (err, result) => {
        if (err) {
            throw err;
        }
        console.log('Product deleted');
        res.status(200).json({
            message: 'Product deleted successfully',
            deleteProduct: result
        });
    });
};

export {
    createProduct,
    getAllProducts,
    updateProduct,
    deleteProduct

}

const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const mysql = require('mysql')
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


//connect to database(MySQL)
const db = mysql.createConnection({
    user: 'root',
    password: 'LM+j99u2nGgExV',
    host: '127.0.0.1',
    database: 'property'
});

//for localhost
/*
const db = mysql.createConnection({
    user: 'root',
    password: '',
    host: 'localhost',
    database: 'test'
});
*/

const port  = process.env.PORT || 3000

//home page fetch all product list
app.get('/', (req, res) => {
    db.query('SELECT * FROM product ORDER BY sale_date ASC', (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.send(result)
        }
    })
})

//get product by id
app.get('/detail/:id', (req, res) => {
    const id = req.params.id
    db.query("SELECT * FROM product WHERE id = ?", id, (err, result) => {
        if(err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
})

//add new product
app.post('/add', (req, res) => {
    const name = req.body.name
    const price = req.body.price
    const sale_price = req.body.sale_price
    const sales_count = req.body.sales_count
    const sale_date = req.body.sale_date

    db.query("INSERT INTO product (name, price, sale_price,  sales_count, sale_date) VALUES(?,?,?,?,?)",
    [name, price, sale_price, sales_count, sale_date], (err, result, field) => {
        if(err) {
            console.log(err);
        } else {
            res.send({data: result,
            message: "added"})
        }
    })
})

//update product
app.put('/update/:id', (req, res) => {
    const id = req.params.id;
    const name = req.body.name
    const price = req.body.price
    const sale_price = req.body.sale_price
    const sales_count = req.body.sales_count
    const sale_date = req.body.sale_date

    db.query('UPDATE Product SET name = ?, price = ?, sale_price = ?, sales_count = ?,sale_date = ? WHERE id = ?',
    [name, price, sale_price, sales_count, sale_date, id], (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.send({
                data: result,
                message: "update product successfully"
            })
            res.status(200)
        }
    } )
})

//delete product
app.delete('/delete/:id', (req, res) => {
    const id = req.params.id
    db.query("DELETE FROM product WHERE id = ?" , id, (err, result) => {
        if(err) {
            console.log(err);
        } else {
            res.send({
                data: result,
                message: "delete product successfully"
            })
        }
    })
})



//server running on port 3001
app.listen(port, () => {
    console.log('server is running on port '+ port);
})


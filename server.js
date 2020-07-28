

const mysql=require('mysql');
const express=require('express');
const bodyparser=require('body-parser');

var app=express();

app.use(bodyparser.json());

var mysqlConnection=mysql.createConnection({

    host:"localhost",
    user: 'root',
    password: 'root',
    database: 'notes',
    multipleStatements: true

});
mysqlConnection.connect((err)=>{
    if(!err){
        console.log("Connected to nodes database");
    }
    else{
        console.log(err);
    }
}

);
const port = process.env.PORT || 8080;



app.listen(port, () => console.log(`Listening on port ${port}..`));


app.post('/app/user', (req, res) => {
    let user = req.body;
    var sql = "INSERT INTO users values (default,?,?)";
    mysqlConnection.query(sql, [user.username,user.password], (err, rows, fields) => {
    if (!err){
        res.send("Account created - Your ID:"+rows.insertId.toString());
        
}
    else
    res.send(err);
})
});

app.post('/app/user/auth', (req, res) => {
    let user = req.body;
    var sql = "SELECT * from users where username= ? and password= ? ";
    mysqlConnection.query(sql, [user.username,user.password], (err, rows, fields) => {
    if (!err){
        res.send("Success - Id:"+rows[0].userId);
    }
    else
    res.send(err);
})
});

app.get('/app/sites/list/:id' , (req, res) => {
    mysqlConnection.query('SELECT * FROM user_notes WHERE userId = ?',[req.params.id], (err, rows, fields) => {
    if (!err)
    res.send(rows);
    else
    console.log(err);
    })
    } );
    


app.post('/app/sites/:id', (req, res) => {
        let user = req.body;
        var sql = "INSERT INTO user_notes values (?,?)";
        mysqlConnection.query(sql, [req.params.id,user.notes], (err, rows, fields) => {
        if (!err){
            res.send("success");
        }
        else
        console.log(err);
    })
    });
//import mysql2 pakage so node.js can talk to mysql
const mysql=require('mysql2');

const db=mysql.createConnection({ //create connection object containing the database info
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME
})

db.connect((err)=>{  
    if(err){
        console.log('Database connection failed:',err);
    }else{
        console.log('Database connected successfully');
    }
});

module.exports=db; //uper const db me jo info hy woh export krdi with ther file and they will require



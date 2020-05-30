const express=require('express');
const bodyParser=require('body-parser');
const bcrypt=require('bcrypt-node');
const app=express();
const cors=require('cors');
const knex=require('knex');
const register= require('./Controller/register');
const login=require('./Controller/login');
const profile= require('./Controller/profile');
const image=require('./Controller/image');
app.use(bodyParser.json());
app.use(cors());
const db=knex({
    client: 'pg',
    connection: {
    host : '127.0.0.1',
    user : 'rajeevkumarsingh',
    password : '',
    database : 'face_react'
}
})
app.get('/',(req,res)=>{res.json(db.user[0])})
app.post('/login',(req,res)=>{login.loginHandel(req,res,db,bcrypt)})
app.post('/register',(req,res)=>{register.registerHandel(req,res,db,bcrypt)})
app.get('/profile/:id',(req,res)=>{profile.profileHandel(req,res,db)})
app.put('/image',(req,res)=>{image.imageHandel(req,res,db)})
app.post('/imageUrl',(req,res)=>{image.imageUrlHandelApi(req,res)})
app.listen(5000,()=>{
    console.log("Server hearing on PORT 5000");
})

























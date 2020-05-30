const registerHandel=(req,res,db,bcrypt)=>{

    const {name,email,password}=req.body;
    if(!name || !email || !password){
        return res.status(400).json("Incorrect input for registration ")
    }
    const hash = bcrypt.hashSync(password);
    db.transaction(trx=>{
        trx.insert({
            email:email,
            hash:hash
        })
        .into('login')
        .returning('email')
        .then(loginEmail=>{
            return trx('users')
            .returning('*')
            .insert({
                name:name,
                email:loginEmail[0],
                joined:new Date()
            })
            .then(user=>{
                // console.log(user);
                // console.log(user[0]);
                res.json(user[0]);
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err=>res.status(400).json("Try next time !.."));
    }
    module.exports={
    registerHandel
    }
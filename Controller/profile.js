const profileHandel=(req,res)=>{
  const {id}=req.params;
  db.select('*').from('users').where({id})
  .then(user=>{
      if(user.length){
      res.json(user[0]); 
      }else {
      res.json("Not found !")
      }
      
  })
  .catch(err=>res.status(400).json(err))
  
}
module.exports={
  profileHandel
}
const express = require('express');
const auth_lib = require('./auth_lib');
const email_lib = require('./email');
var router = express.Router();

router.get('/reg',function(req,res){
  res.render('reg',{
    error:'',
    username:'',
    password:'',
    uerror:'',
    perror:'',
  })
})

router.post('/reg',function(req,res){
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  console.log(req.body)
    auth_lib.createUser(username,password,email).spread(function(user,created){
      if(created){
        email_lib(user,function(){
          res.send("Cannot send email")
        },function(){
          res.render('success',{user})
        })
      }else{
        if(username == user.username){
          res.render('reg',{
            error:'The username has been userd',
            uerror:'Please choose another name!'
          })
        }else if(email==user.email){
          res.render('reg',{
            error:'The email has been userd',
            eerror:'Please choose another email!'
          })
        }
      }
    });
})

router.get('/active/:code',function(req,res){
  auth_lib.activeUser(req.params.code).then(
    user => user?user.update({
      active:true,
      activeCode:null
    }):null
  ).then(
    user => res.render('success',{user})
  )
})

module.exports = router

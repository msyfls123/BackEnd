const express = require('express');
const auth_lib = require('./auth_lib');
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
  console.log(req.body)
  auth_lib.createUser(username,password).spread(function(user,created){
    if(created){
      res.render('success',{user})
    }else{
      res.render('reg',{
        error:'The username has been userd',
        uerror:'Please choose another name!'
      })
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

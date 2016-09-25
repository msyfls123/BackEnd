var nodemailer = require('nodemailer');

var transport = nodemailer.createTransport({
    host: "smtp.qq.com",
    port: 465, // port for secure SMTP
    auth: {
        user: "745784917@qq.com",
        pass: "msyfls789abc"
    }
});

// transport.sendMail({
//     from : "745784917@qq.com",
//     to : "745784917@qq.com",
//     subject: "邮件主题",
//     generateTextFromHTML : true,
//     html : "这是封测试邮件"
// }, function(error, response){
//     if(error){
//         console.log(error);
//     }else{
//         console.log("Message sent: " + response.response);
//     }
// });

// create template based sender function
var sendPwdReset = transport.templateSender({
    subject: 'Active your account for {{username}}!',
    text: 'Hello, {{username}}, Please go here to active your account: {{ activeUrl }}',
    html: '<b>Hello, <strong>{{username}}</strong>, Please go here to active your account: <a href="{{ activeUrl }}">{{ activeUrl }}</a></p>'
}, {
  from : "745784917@qq.com",
  sender : "Kimi-blabla"
});

// use template based sender to send a message
module.exports = function(user,fn1,fn2){
  sendPwdReset({
        to: user.email,
    }, {
        username: user.username,
        activeUrl: 'http://127.0.0.1:4200/user/active/'+user.activeCode
    }, function(err, info){
        if(err){
          console.log(err)
            fn1(err)
        }else{
            fn2()
        }
    }
  );
}

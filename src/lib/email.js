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
    subject: 'Password reset for {{username}}!',
    text: 'Hello, {{username}}, Please go here to reset your password: {{ reset }}',
    html: '<b>Hello, <strong>{{username}}</strong>, Please <a href="{{ reset }}">go here to reset your password</a>: {{ reset }}</p>'
}, {
  from : "745784917@qq.com",
  sender : "Kimi-blabla"
});

// use template based sender to send a message
sendPwdReset({
    to: '745784917@qq.com',
}, {
    username: 'Node Mailer',
    reset: 'https://www.example.com/reset?token=unique-single-use-token'
}, function(err, info){
    if(err){
        console.log('Error');
    }else{
        console.log('Password reset sent');
    }
});

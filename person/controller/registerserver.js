const mysql = require('mysql');
const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    database:'test'
});
let resultDate = {
    success:true,
    data:{}
};
function handleError(){
    connection.connect((err)=>{
        if(err){
            console.log('error when connecting to db:', err);
            setTimeout(handleError , 2000);
        }
        console.log(err);
    });
}
handleError();
function addUser(req,res) {
    connection.query('SELECT * from user where account='+req.body.account,function (error, results, fields) {
        if(error){
            throw error;
        }else{
            console.log('注册');
            console.log(results[0]);
            if(!results[0]){
                addSql(req,res);
            }else{
                //用户已经注册过了
                resultDate.data.result = false;
                resultDate.data.remork = '该用户已注册';
                res.status(200);
                res.send(resultDate);
            }

        }
    });
}

function addSql(req,res){
    let question = req.body.qustion || null;
    let answer = req.body.answer || null;
    if(question!==null&&answer!==null){
        question = '"'+question+'"';
        answer = '"'+answer +'"';
    }
    console.log(question,answer);
    connection.query('INSERT INTO user (account,password,question,answer) VALUES ('+req.body.account+','+req.body.paress+','+question+','+answer+')',function (error, results, fields) {
        if(error){
            throw error;
        }else{
            console.log('插入数据');
            console.log(results[0]);
            resultDate.data.result = true;
            resultDate.data.remork = '用户注册成功';
            res.status(200);
            res.send(resultDate);
        }
    });
}

module.exports = addUser;
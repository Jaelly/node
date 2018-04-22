const mysql = require('mysql');
const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    database:'test'
});
let resultDate = {
    success:true,
    data:{

    }
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
function selectUser(req,res) {
    connection.query('SELECT * from user where account='+req.body.account,function (error, results, fields) {
        if(error){
            throw error;
        }else{
            console.log(results[0]);
            if(results[0] && results[0].password === req.body.paress){
                resultDate.data.remork = '登陆成功';
                resultDate.data.result = true;

                resultDate.data.message=results[0];
            }else{
                resultDate.data.remork = '密码错误';
                resultDate.data.result = false;
            };
            res.status(200);
            res.send(resultDate);
        }
    });
    // connection.end(function (err) {
    //     console.log(err);
    //     console.log('关闭数据库');
    // })
}

module.exports = selectUser;
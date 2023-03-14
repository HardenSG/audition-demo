const http = require('http')

const server = http.Server()



server.on('request', (req, res) => {
    console.log('user-agent --> ', req.headers['user-agent']);
    //// 跨域
    res.writeHead(200, {
        'Access-Control-Allow-Origin': 'http://localhost:5173',
        'Access-Control-Allow-Methods': 'POST, PUT',
        'Access-Control-Allow-Headers': 'authorization',
        'Access-Control-Allow-Credentials': true,
        'Content-Type': 'text/plain',
        'Content-Length': 10,
        'Set-Cookie': 'SSID=Ap4GTEq; Expires=Mon Mar 13 2023 08:28:09 GMT;HttpOnly'
    });

    res.write("helloworld");
    res.end()


    //// 不定长包体
    // res.setHeader('Content-Type', 'text/html; charset=utf8')
    // res.setHeader('Transfer-Encoding', 'chunked')
    // res.write('<p>你好啊</p>')
    // setTimeout(() => {
    //     res.write('<p>你好啊</p>')
    //     res.write('<p>你好啊</p>')
    //     res.write('<p>你好啊</p>')
    //     res.write('<p>你好啊</p>')
    //     res.end()
    // }, 1000);


    console.log(req.query);
})

server.listen(8080, () => {
    console.log('已启动！');
})
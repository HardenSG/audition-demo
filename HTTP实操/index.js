const http = require('http')

const server = http.Server()

server.on('request', (req, res) => {
    console.log('user-agent --> ', req.headers['user-agent']);
    //// 定长包体
    // res.setHeader('Content-Type', 'text/plain');
    // res.setHeader('Content-Length', 10);
    // res.write("helloworld");
    // res.end()


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
})

server.listen(8080, () => {
    console.log('已启动！');
})
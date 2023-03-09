const express = require("express");
const bodyParse = require("body-parser");
const uploader = require("express-fileupload");
const { extname, resolve } = require('path')
const { existsSync, writeFile, appendFile } = require('fs')

const { ALLOWED_TYPE } = require("./src/utils");
const server = express();

server.use(bodyParse.urlencoded({ extended: true }));
server.use(bodyParse.json());
server.use(uploader());
server.use('/file', express.static('./file'))

//// 除了使用cors手动配置跨域
server.all("*", (req, res, next) => {
  res.header("Access-Control-Allow-origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, HEAD");
  next();
});

server.post("/uploadFile", (req, res) => {
  const { name, type, size, currentSize, fileName } = req.body;
  const { file } = req.files;

  if (!file) {
    res.status(400).json({
      code: 1001,
      msg: "no files received",
    });
    return;
  }

  //// 检查类型
  if (!ALLOWED_TYPE.includes(type)) {
    res.status(400).json({
      code: 1002,
      msg: "file type error",
    });
    return;
  }

  //// extname是用来取出后缀名的
  const filename = fileName + extname(name) 
  const filePath =  'file/' + filename

  //// 如果文件上传的size不为零则代表文件已经开始上传了
  //// 向文件的地址插入数据
  if(currentSize !== '0') {
    if(!existsSync(filePath)) {
        res.status(410).json({
            code: 1003,
            msg: '文件已被永久删除'
        })

        return 
    }

    appendFile(filePath, file.data, (err) => {
        if(err) {
            res.status(400).json({
                code: 1004,
                msg: 'write file failed'
            })

            return
        }
        res.status(200).json({
            code: 0,
            msg: 'append file success',
            path: `http://localhost:8080/${filePath}`
        })
    })

    return
  }

  //// 文件还不存在创建并写入
  writeFile(filePath, file.data, (err) => {
    if(err) {
        res.status(400).json({
            code: 1004,
            msg: 'write file failed'
        })

        return
    }
    res.status(200).json({
        code: 0,
        msg: 'write file success',
        path: `http://localhost:8080/${filePath}`
    })
  })
});


server.listen(8080, () => {
  console.log("端口监听中....");
});

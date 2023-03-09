import CryptoJS from 'crypto-js'

const secret = '这是一个切片上传的DEMO'
export const buildFileName = (date) => {
    const MD5SECRET = CryptoJS.MD5(secret).toString()
    const fileName = CryptoJS.HmacSHA1(date, MD5SECRET).toString()
    return fileName
}

export const UPLOAD_INFO = {
    EMPTY_FILE: '请先选择文件后再点击上传！',
    INVALID_TYPE: '选择的类型不是系统所支持的内容！',
    UPLOAD_FAILED: '上传失败！',
    UPLOAD_SUCCESS: '上传成功！'
}

export const ALLOWED_TYPE = [
    'video/mp4',
    'audio/mp3'
]

export const CHUNK_SIZE = 64 * 1024

const BASE_URL = 'http://localhost:8080/'
export const API = {
    UPLOAD_FILE: `${BASE_URL}uploadFile`
}
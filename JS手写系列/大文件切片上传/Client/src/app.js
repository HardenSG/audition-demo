import {
  buildFileName,
  UPLOAD_INFO,
  ALLOWED_TYPE,
  CHUNK_SIZE,
  API,
} from "./utils.js";
import axios from "axios";

const setInfo = (dom) => (info) => {
  dom.innerText = info;
};

const setProgress = (dom) => (v) => {
  dom.value = v;
};

(() => {
  const oProgress = document.querySelector("#uploadProgress");
  const oFile = document.querySelector("#uploadFile");
  const oInfo = document.querySelector("#uploadInfo");
  const oBtn = document.querySelector("#uploadBtn");
  const setSpanInfo = setInfo(oInfo);
  const setOProgress = setProgress(oProgress);
  let currentSize = 0

  const init = () => {
    bindEvent();
  };

  const bindEvent = () => {
    oBtn.addEventListener("click", uploadFile, false);
  };

  async function uploadFile() {
    setOProgress(0)
    const {
      files: [FILE],
    } = oFile;

    if (!FILE) return setSpanInfo(UPLOAD_INFO.EMPTY_FILE);
    if (!ALLOWED_TYPE.includes(FILE.type))
      return setSpanInfo(UPLOAD_INFO.INVALID_TYPE);

    const { name, type, size } = FILE;
    const fileName = buildFileName(new Date()) + "_" + name;
    let uploadRes = null;

    oProgress.max = size;
    setSpanInfo("");

    while (currentSize < size) {
      const fileChunk = FILE.slice(currentSize, currentSize + CHUNK_SIZE);

      const formData = createFormData({
        name,
        type,
        size,
        currentSize,
        fileName,
        file: fileChunk,
      });

      try {
        uploadRes = await axios.post(API.UPLOAD_FILE, formData);
      } catch (error) {
        setSpanInfo(UPLOAD_INFO.UPLOAD_FAILED);
        return;
      }

      currentSize += fileChunk.size
      setOProgress(currentSize);
    }


    setSpanInfo(UPLOAD_INFO.UPLOAD_SUCCESS);
    createVideo(uploadRes.data.path)
    oFile.value = null;
  }

  function createFormData({ name, type, size, currentSize, fileName, file }) {
    const fd = new FormData();
    console.log(file);
    fd.append("name", name);
    fd.append("type", type);
    fd.append("size", size);
    fd.append("currentSize", currentSize);
    fd.append("fileName", fileName);
    fd.append("file", file);
    return fd;
  }

  function createVideo(src) {
    const video = document.createElement('video')
    video.controls = true
    video.width = '500'
    video.src = src
    document.body.appendChild(video)
  }

  init();
})();

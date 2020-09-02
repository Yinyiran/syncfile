<template>
  <div class="sync-file">
    <button @click="openDir">选择上传文件</button>
    <span class="up-tip">选择文件后会立即上传</span>
    <p v-if="filePath">{{filePath}}</p>
  </div>
</template>

<script>
  const Chokidar = require("chokidar");
  const { BrowserWindow, dialog } = require("electron").remote;
  const fs = require("fs");
  const Path = require("path");
  const FormData = require("form-data");
  const Request = require("request");

  import Axios from "axios";

  export default {
    name: "App",
    data() {
      return {
        filePath: "",
      };
    },
    mounted() {},
    methods: {
      // 上传文件
      async uploadFile(paths) {
        const form = new FormData();
        form.append("first", 3);
        form.append("first1", 3);
        paths.forEach((path, index) => {
          form.append(`file_${index}`, fs.createReadStream(path));
        });
        Axios({
          method: "post",
          url: "/api/uploadFile",
          data: form,
          headers: {
            "Content-Type": `multipart/form-data`,
            ...form.getHeaders(),
          },
        });
      },
      openDir() {
        let res = dialog.showOpenDialogSync({
          properties: ["openFile", "multiSelections"],
        });
        if (res) {
          this.filePath = res;
          this.uploadFile(res);
        }
      },
    },
  };
</script>

<style>
  .sync-file {
    margin: 30px;
  }
  .up-tip {
    font-size: 12px;
    margin-left: 10px;
    color: #999;
  }
</style>
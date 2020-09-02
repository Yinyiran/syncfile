'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async uploadFile() {
    const { ctx } = this;

    // stream 多文件
    const parts = ctx.multipart();
    let files2 = [];
    let part;
    while ((part = await parts()) != null) {
      if (part.length) {
        // 这是 busboy 的字段
        console.log('field: ' + part[0]);
        console.log('value: ' + part[1]);
        console.log('valueTruncated: ' + part[2]);
        console.log('fieldnameTruncated: ' + part[3]);
      } else {
        // 这时是用户没有选择文件就点击了上传(part 是 file stream，但是 part.filename 为空)
        // 需要做出处理，例如给出错误提示消息
        if (!part.filename) throw "上传参数不对";

        // // part 是上传的文件流
        // console.log('field: ' + part.fieldname);
        // console.log('filename: ' + part.filename);
        // console.log('encoding: ' + part.encoding);
        // console.log('mime: ' + part.mime);
        // 文件处理，上传到云存储等等
        try {
          // result = await ctx.oss.put('egg-multipart-test/' + part.filename, part);
          const filename = part.filename.toLowerCase();
          const target = path.join(this.config.baseDir, 'file', filename);
          const writeStream = fs.createWriteStream(target);
          await pump(part, writeStream);
          files2.push(filename);
        } catch (err) {
          // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
          await sendToWormhole(part);
          throw err;
        }
      }
      return files2;
    }
    ctx.body = 'hi, egg';
  }
}

module.exports = HomeController;

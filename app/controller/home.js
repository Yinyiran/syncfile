'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async uploadFile() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
}

module.exports = HomeController;
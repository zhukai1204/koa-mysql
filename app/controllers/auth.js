const request = require('request');
import superagent from 'superagent';
const xiaoMi = async (ctx, next) => {
  let url = `https://account.xiaomi.com/pass/serviceLoginAuth2?_dc=${Date.now()}`
  ctx.body = 'xiaoMi';
};

export default {
  xiaoMi
};

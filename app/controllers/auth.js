const request = require('request');
import superagent from 'superagent';
import querystring from 'querystring';
import URL from 'url';

const getInfo = (url, cookies)=>{
  if(cookies) request.cookie(cookies)
  return new Promise((resolve, reject) => {
    let j = request.jar();
    request.get({url:url, jar: j},(err, httpResponse, body)=>{
      if(err){
        resolve(false)
      }else{
        resolve({cookie:j.getCookies(url),cookieString:j.getCookieString(url), body:body});
      }
    })
  });
}

const post = (url, formData={}, cookies)=>{
  return new Promise((resolve, reject) => {
    if(cookies) request.cookie(cookies)
    let j = request.jar();
    request.post({url:url, form: formData, jar: j}, (err, httpResponse, body)=>{
      if (err) {
        resolve(false);
      }else{
        resolve({
          cookies:j.getCookies(url),
          cookieString:j.getCookieString(url),
          body:body
        });
      }
    });
  });
}

const superagentPost = (url, data, cookies)=>{
  return new Promise((resolve, reject) => {
    superagent
    .post(url)
    .send(data) // sends a JSON post body
    .set('Content-type', 'application/x-www-form-urlencoded')
    .set('Cookie', cookies)
    .type('form')
    .end(res => {
      resolve(res);
    })
  });
}


const xiaoMi = async (ctx, next) => {
  let info = await getInfo('https://account.xiaomi.com');
  let formData = {
    _json:true,
    callback:"https://account.xiaomi.com/sts?sign=ZvAtJIzsDsFe60LdaPa76nNNP58%3D&followup=https%3A%2F%2Faccount.xiaomi.com%2Fpass%2Fauth%2Fsecurity%2Fhome&sid=passport",
    sid:"passport",
    qs:"%3Fcallback%3Dhttps%253A%252F%252Faccount.xiaomi.com%252Fsts%253Fsign%253DZvAtJIzsDsFe60LdaPa76nNNP58%25253D%2526followup%253Dhttps%25253A%25252F%25252Faccount.xiaomi.com%25252Fpass%25252Fauth%25252Fsecurity%25252Fhome%2526sid%253Dpassport%26sid%3Dpassport",
    "_sign":"2&V1_passport&JO7oplyppgkN/TiDH69nleQr10g=",
    serviceParam :'{"checkSafePhone":false}',
    user:'17761305960',
    hash:'9D059542DC5D9BE18DBC52976082A221'
  }
  let url = `https://account.xiaomi.com/pass/serviceLoginAuth2?_dc=${Date.now()}`;
  let result = await post(url, formData, info['cookieString']);
  let userinfo = await getInfo('https://account.xiaomi.com/pass/auth/services/home?cUserId=ovMr52WrWLLSQln-rSicqIZryig&userId=292420413', result['cookieString']);
  ctx.body = userinfo;
};

export default {
  xiaoMi
};

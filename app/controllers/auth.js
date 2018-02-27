const request = require('request');
import superagent from 'superagent';
import querystring from 'querystring';
import URL from 'url';

const getInfo = (url)=>{
  return new Promise((resolve, reject) => {
    superagent.get(url).end((err, res)=>{
      if(err){
        resolve(false)
      }else{
        resolve(res);
      }
    })
  });
}

const post = (url, formData)=>{
  return new Promise((resolve, reject) => {
    request.post({url:url, form: formData}, function optionalCallback(err, httpResponse, body) {
      if (err) {
        resolve(false);
      }else{
        resolve(body);
      }
      console.log('Upload successful!  Server responded with:', body);
    });
  });
}

const xiaoMi = async (ctx, next) => {
  let info = await getInfo('https://account.xiaomi.com');
  let secInfo = await getInfo(info['redirects'][1]);
  let {query} = URL.parse(info['redirects'][1]);
  let {callback, sid} = querystring.parse(query);
  /*let formData = {
    _json:true,
    callback:callback,
    sid:sid
  };*/
  let formData = {
    _json:true,
    callback:"https://account.xiaomi.com/sts?sign=ZvAtJIzsDsFe60LdaPa76nNNP58%3D&followup=https%3A%2F%2Faccount.xiaomi.com%2Fpass%2Fauth%2Fsecurity%2Fhome&sid=passport",
    sid:"passport",
    qs:"%3Fcallback%3Dhttps%253A%252F%252Faccount.xiaomi.com%252Fsts%253Fsign%253DZvAtJIzsDsFe60LdaPa76nNNP58%25253D%2526followup%253Dhttps%25253A%25252F%25252Faccount.xiaomi.com%25252Fpass%25252Fauth%25252Fsecurity%25252Fhome%2526sid%253Dpassport%26sid%3Dpassport",
    "_sign":"2&V1_passport&JO7oplyppgkN/TiDH69nleQr10g=",
    serviceParam :'{"checkSafePhone":false}',
    user:'13438393804',
    hash:'8B5832D68C10DDE33503B3E386F2B113'
  }
  let url = `https://account.xiaomi.com/pass/serviceLoginAuth2?_dc=${Date.now()}`;
  let result = await post(url, formData);

  ctx.body = result;
};

export default {
  xiaoMi
};

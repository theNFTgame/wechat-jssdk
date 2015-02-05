# wechat-jssdk
A tool build on wechat jssdk share api

## depend on AMD moudle
run it

```
require.config({
  baseUrl: 'js',
  paths: {
    jquery: 'jquery.min',
    sha1: 'sha1',
    jssdk: 'jweixin-1.0.0',
    wechat: 'wechat.min'
  },
  shim: {
    wechat: {
      deps: ['jquery', 'sha1', 'jssdk']
    }
  }
});
require(['wechat', 'jssdk'], function (wechat, wx) {
  var link = '../wechat/test',//获取jsapi_ticket接口
    a = 'wxf8b4f85f3a794e77';//appId
  $.when(wechat.getTicket(link)).done(function (d) {
    var j = d.ticket,
      n = wechat.randomWord(),//nonceStr有一个非必须参数len->随机字符串长度
      t = wechat.timeStamp(),//timestamp当前时间
      u = window.location.href,//url
      s = wechat.string1(j, n, t, u);//signature
    console.log(j, n, t, u, s);
    wechat.config(a, t, n, s);
    wx.ready(function () {
      wechat.shareQQ();
      wechat.shareTimeline();
      wechat.shareAppMessage();
      wechat.shareWeibo();
    });
  });
});

```
### debug
---
add Querystring `debug=true` to the location href url 
(function (w, $, jsSHA, wx) {
  function Wechat() {};
  Wechat.prototype = {
    constructor: this,
    getTicket: function (url) {
      var d = $.Deferred();
      $.ajax({
        type: 'GET',
        url: url,
        success: function (data) {
          d.resolve(data);
        }
      });
      return d.promise();
    },
    randomWord: function (len) {
      var str = '',
        range,
        i = 0,
        o,
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
      range = (len && typeof len === 'number') ? len : (Math.round(Math.random() * (32 - 8)) + 8);
      for (; i < range; i++) {
        o = Math.round(Math.random() * (arr.length - 1));
        str += arr[o];
      }
      return str;
    },
    timeStamp: function () {
      var t = +new Date();
      return parseInt(t / 1000, 10);
    },
    string1: function (j, n, t, u) {
      var o = 'jsapi_ticket=' + j + '&noncestr=' + n + '&timestamp=' + t + '&url=' + u,
        e = decodeURIComponent(o).split('#')[0],
        s = new jsSHA(e, "TEXT"),
        t = s.getHash("SHA-1", "HEX");
      return t;
    },
    config: function (a, t, n, s) {
      wx.config({
        debug: false,
        appId: a,
        timestamp: t,
        nonceStr: n,
        signature: s,
        jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'hideMenuItems', 'showMenuItems', 'hideAllNonBaseMenuItem', 'showAllNonBaseMenuItem', 'translateVoice', 'startRecord', 'stopRecord', 'onRecordEnd', 'playVoice', 'pauseVoice', 'stopVoice', 'uploadVoice', 'downloadVoice', 'chooseImage', 'previewImage', 'uploadImage', 'downloadImage', 'getNetworkType', 'openLocation', 'getLocation', 'hideOptionMenu', 'showOptionMenu', 'closeWindow', 'scanQRCode', 'chooseWXPay', 'openProductSpecificView', 'addCard', 'chooseCard', 'openCard']
      });
    },
    shareData: function () {
      var qs = function (o) {
        return document.querySelector(o);
      };
      var sd = {
        title: qs('#fenxiang_title').innerHTML,
        desc: qs('#fenxiang_desc').innerHTML,
        link: qs('#fenxiang_link').innerHTML,
        imgUrl: qs('#fenxiang_img').innerHTML
      };
      return sd;
    },
    shareQQ: function () {
      wx.onMenuShareQQ(this.shareData());
    },
    shareTimeline: function () {
      wx.onMenuShareTimeline(this.shareData());
    },
    shareAppMessage: function () {
      wx.onMenuShareAppMessage(this.shareData());
    },
    shareWeibo: function () {
      wx.onMenuShareWeibo(this.shareData());
    },
    debug: function () {
      var urlQ = function (s) {
        var sUrl = window.location.search.substr(1);
        var r = sUrl.match(new RegExp("(^|&)" + s + "=([^&]*)(&|$)"));
        return (r === null ? null : decodeURI(r[2]));
      };
      return urlQ('debug') ? true : false;
    }
  };
  var wechat = new Wechat();
  w.wechat = wechat;
})(window, jQuery, jsSHA, wx);
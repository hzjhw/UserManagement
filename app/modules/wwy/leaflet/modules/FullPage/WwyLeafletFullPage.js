/**
 * @description WwyLeafletFullPage
 * @class WwyLeafletFullPage
 * @author yongjin<zjut_wyj@163.com> 2015/3/16
 */
define('WwyLeafletFullPage', ['FullPage', 'Zepto'], function (require, exports, module) {
  var WwyLeafletFullPage, FullPage, Zepto;

  FullPage = require('FullPage');
  Zepto = require('Zepto');

  WwyLeafletFullPage = function (options) {
    options = options || {};
    var runPage;
    runPage = new FullPage({
      id: options.id || 'pageContain',                            // id of contain
      slideTime: options.time || 800,                               // time of slide
      continuous: false,
      effect: {                                     // slide effect
        transform: {
          translate: options.translate || 'X',					   // 'X'|'Y'|'XY'|'none'
          scale: [1, 1],					   // [scalefrom, scaleto]
          rotate: [0, 0]					   // [rotatefrom, rotateto]
        },
        opacity: [0, 1]                           // [opacityfrom, opacityto]
      },
      mode: 'touch',               // mode of fullpage
      easing: [0, .93, .39, .98],                                // easing('ease','ease-in','ease-in-out' or use cubic-bezier like [.33, 1.81, 1, 1] )
      callback: function (index, thisPage) {     // callback when pageChange
      }
    });
  }

  module.exports = WwyLeafletFullPage;
});
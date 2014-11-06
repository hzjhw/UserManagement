/**
 * @description seajs_guide
 * @namespace seajs_guide
 * @author yongjin on 2014/11/4
 */
//以前载入插件，通过载入的先后顺序实现依赖
<script src="jquery.min.js"></script>
<script src="jquery.cookie.js"></script>

//使用sea.js，要将cookie插件制作成模块：
define(function(require, exports, module){
    return function($){
        // 放置插件的源代码
    }
});

//在其他模块里使用该插件的方法：
define(function(require, exports, module){
    //先要载入jQuery的模块
    var $ = require('jquery');
    //然后将jQuery对象传给插件模块
    require('./cookie')($);
    //开始使用 $.cookie方法
});


if (typeof define === 'function' && define.cmd){
    define(function(require, exports, module){
        module.exports = factory();
    });
}
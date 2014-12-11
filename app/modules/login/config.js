/**
 * @description config
 * @namespace config
 * @author yongjin<zjut_wyj@163.com> 2014/12/11
 */
/**
 * 模块
 * */
app.addModule('LoginModel', 'models/LoginModel.js');
app.addModule('Login', 'modules/login/controllers/Login.js');
/**
 * 路由
 * */
app.addRoute('login', function(){
  seajs.use(['jquery', 'Login'], function (jquery, Login) {
    app.addView('login', new Login);
  });
});

/**
 * 模板
 * */
app.addTemplate('template/login', function (require, exports, module) {
  module.exports = require('modules/login/login.html');
});

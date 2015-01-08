/**
 * @description main
 * @namespace main
 * @author yongjin<zjut_wyj@163.com> 2015/1/7
 */
app.addModule('LoginModel', 'modules/member/management/login/controllers/LoginModel.js');
app.addModule('Login', 'modules/member/management/login/controllers/Login.js');

app.addTemplate('template/login', function(require, exports, module){
  module.exports = require('modules/member/management/login/views/login.html');
});
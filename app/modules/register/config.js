/**
 * @description config
 * @namespace config
 * @author yongjin<zjut_wyj@163.com> 2014/12/11
 */

/**
 * 模块
 * */
app.addModule('RegisterModel', 'models/RegisterModel.js');
app.addModule('Register', 'modules/register/controllers/Register.js');

/**
 * 路由
 * */

 app.addRoute('register', function(){
  seajs.use(['jquery', 'Register'], function (jquery, Register) {
    app.addView('register', new Register);
  });
});

/**
 * 模板
 * */
app.addTemplate('template/register', function (require, exports, module) {
  module.exports = require('modules/register/register.html');
});
app.addTemplate('template/register_detail', function (require, exports, module) {
  module.exports = require('modules/register/views/register_detail.html');
});


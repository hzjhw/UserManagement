/**
 * @description main
 * @namespace main
 * @author yongjin<zjut_wyj@163.com> 2015/1/7
 */
app.addModule('MemberLeftInfo', 'modules/member/management/userinfo/controllers/MemberLeftInfo.js');
app.addModule('MemberModel', 'modules/member/management/userinfo/models/MemberModel.js');
app.addModule('MemberInfo', 'modules/member/management/userinfo/controllers/MemberInfo.js');
app.addTemplate('template/member_left_info', function (require, exports, module) {
  module.exports = require('modules/member/management/userinfo/views/member_left_info.html');
});
app.addTemplate('template/member_info', function(require, exports, module){
  module.exports = require('modules/member/management/userinfo/views/member_info.html');
});
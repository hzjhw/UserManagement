/**
 * @description main
 * @namespace main
 * @author yongjin<zjut_wyj@163.com> 2015/1/7
 */

app.addRoute('userinfo', function () {
  seajs.use(['MemberDetail'], function (MemberDetail) {
    app.addPanel('main', {
      el: '#main',
      template: '<div class="main-inner"></div>'
    }).addView('memberDetail', new MemberDetail({
      el: '.main-inner',
      viewId: 'memberDetail'
    }));
  });
});

app.addModule('MemberLeftInfo', 'modules/member/management/userinfo/controllers/MemberLeftInfo.js');
app.addModule('MemberModel', 'modules/member/management/userinfo/models/MemberModel.js');
app.addModule('MemberDetailModel', 'modules/member/management/userinfo/models/MemberDetailModel.js');
app.addModule('MemberInfo', 'modules/member/management/userinfo/controllers/MemberInfo.js');
app.addModule('MemberDetail', 'modules/member/management/userinfo/controllers/MemberDetail.js');
app.addTemplate('template/member_left_info', function (require, exports, module) {
  module.exports = require('modules/member/management/userinfo/views/member_left_info.html');
});
app.addTemplate('template/member_info', function (require, exports, module) {
  module.exports = require('modules/member/management/userinfo/views/member_info.html');
});
app.addTemplate('template/member_detail', function (require, exports, module) {
  module.exports = require('modules/member/management/userinfo/views/member_detail.html');
});
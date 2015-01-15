/**
 * @description main
 * @class main
 * @author yongjin<zjut_wyj@163.com> 2015/1/15
 */
app.addTemplate('template/user_detail', function (require, exports, module) {
  module.exports = require('modules/enterprise/views/user_detail.html');
});
app.addModule('UserDetail', 'modules/enterprise/controllers/UserDetail.js');

app.addModule('EnterpriseModel', 'models/EnterpriseModel.js');
app.addModule('EnterpriseDetail', 'modules/enterprise/controllers/EnterpriseDetail.js');

app.addTemplate('template/enterprise_detail', function (require, exports, module) {
  module.exports = require('modules/enterprise/views/enterprise_detail.html');
});

app.addRoute('user', function () {
  seajs.use(['UserDetail'], function (UserDetail) {
    app.addPanel('main', {
      el: '#jhw-main',
      template: '<div class="jhw-main-inner"></div>'
    }).addView('userDetail', new UserDetail({
      el: '.jhw-main-inner',
      viewId: 'userDetail'
    }));
  });
});

app.addRoute('enterprise', function () {
  seajs.use(['EnterpriseDetail'], function (EnterpriseDetail) {
    app.addPanel('main', {
      el: '#jhw-main',
      template: '<div class="jhw-main-inner"></div>'
    }).addView('enterpriseDetail', new EnterpriseDetail({
      el: '.jhw-main-inner',
      viewId: 'enterpriseDetail'
    }));
  });
});
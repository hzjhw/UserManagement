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
      template: '<div class="jhw-panel"></div>'
    }).addView('userDetail', new UserDetail({
      el: '.jhw-panel',
      viewId: 'userDetail'
    }));
  });
});

app.addRoute('enterprise', function () {
  seajs.use(['EnterpriseDetail'], function (EnterpriseDetail) {
    app.addPanel('main', {
      el: '#jhw-main',
      template: '<div class="jhw-panel"></div>'
    }).addView('enterpriseDetail', new EnterpriseDetail({
      el: '.jhw-panel',
      viewId: 'enterpriseDetail'
    }));
  });
});

app.addRoute('technical', function () {
  seajs.use(['TechnicalDetail'], function (TechnicalDetail) {
    app.addPanel('main', {
      el: '#jhw-main',
      template: '<div class="jhw-panel"></div>'
    }).addView('technicalDetail', new TechnicalDetail({
      el: '.jhw-panel',
      viewId: 'technicalDetail'
    }));
  });
});
app.addModule('TechnicalModel', 'models/TechnicalModel.js');
app.addModule('TechnicalDetail', 'modules/enterprise/controllers/TechnicalDetail.js');
app.addTemplate('template/technical_detail', function (require, exports, module) {
  module.exports = require('modules/enterprise/views/technical_detail.html');
});
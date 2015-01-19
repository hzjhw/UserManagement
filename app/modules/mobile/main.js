/**
 * @description mian
 * @class mian
 * @author yongjin<zjut_wyj@163.com> 2015/1/17
 */
app.addModule('MobileNavModel', 'models/MobileNavModel.js');
app.addModule('SeoMobileModel', 'models/SeoMobileModel.js');
app.addModule('MobileNavList', 'modules/mobile/controllers/MobileNavList.js');
app.addTemplate('template/mobile_nav_list', function (require, exports, module) {
  module.exports = require('modules/mobile/views/mobile_nav_list.html');
});
app.addTemplate('template/mobile_nav_item', function (require, exports, module) {
  module.exports = require('modules/mobile/views/mobile_nav_item.html');
});
app.addRoute('mobile', function () {
  seajs.use('MobileNavList', function (MobileNavList) {
    app.addPanel('main', {
      el: '#jhw-main',
      template: '<div class="jhw-panel"></div>'
    }).addView('mobileNavList', new MobileNavList({
      el: '.jhw-panel',
      viewId: 'mobileNavList'
    }));
  });
});
app.addRoute('userdefined_mobile', function () {
  seajs.use(['UserdefinedMobileList'], function (UserdefinedMobileList) {
    app.addPanel('main', {
      el: '#jhw-main',
      template: '<div class="jhw-main-inner"></div>'
    }).addView('userdefinedMobileList', new UserdefinedMobileList({
      el: '.jhw-main-inner',
      data: { page: null }
    }));
  });
});
app.addTemplate('mobile_nav_detail', function (require, exports, module) {
  module.exprots = require('modules/mobile/views/mobile_nav_detail.html');
});

app.addRoute('userdefined_mobile', function () {
  seajs.use(['UserdefinedMobileList'], function (UserdefinedMobileList) {
    app.addPanel('main', {
      el: '#jhw-main',
      template: '<div class="jhw-panel"></div>'
    }).addView('UserdefinedMobileList', new UserdefinedMobileList({
      el: '.jhw-panel',
      viewId: 'UserdefinedMobileList'
    }));
  });
});
app.addRoute('userdefined_mobile/:id', function (id) {
  seajs.use(['UserdefinedMobileList'], function (UserdefinedMobileList) {
    app.addPanel('main', {
      el: '#jhw-main',
      template: '<div class="jhw-panel"></div>'
    }).addView('UserdefinedMobileList', new UserdefinedMobileList({
      el: '.jhw-panel',
      viewId: 'UserdefinedMobileList',
      data: { page: id }
    }));
  });
});
app.addModule('UserdefinedMobileModel', 'models/UserdefinedMobileModel.js');
app.addModule('MobileNavDetail', 'modules/mobile/controllers/MobileNavDetail.js');
app.addModule('UserdefinedMobileList', 'modules/mobile/controllers/UserdefinedMobileList.js');
app.addModule('UserdefinedMobileDetail', 'modules/mobile/controllers/UserdefinedMobileDetail.js');
app.addTemplate('template/userdefined_mobile_item', function (require, exports, module) {
  module.exports = require('modules/mobile/views/userdefined__mobile_item.html');
});
app.addTemplate('template/userdefined_mobile_list', function (require, exports, module) {
  module.exports = require('modules/mobile/views/userdefined_mobile_list.html');
});
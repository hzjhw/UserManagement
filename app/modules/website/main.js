/**
 * @description main
 * @namespace main
 * @author yongjin<zjut_wyj@163.com> 2014/12/26
 */
app.addRoute('static', function () {
  seajs.use(['jquery', 'NavigateList'], function (jquery, NavigateList) {
    app.addPanel('main', {
      el: '#jhw-main',
      template: '<div class="jhw-main-inner"></div>'
    }).addView('navigateList', new NavigateList({
      el: '.jhw-main-inner'
    }));
  });
});
app.addRoute('userdefined/:id', function (id) {
  seajs.use(['UserdefinedList'], function (UserdefinedList) {
    app.addPanel('main', {
      el: '#jhw-main',
      template: '<div class="jwh-main-inner"></div>'
    }).addView('userdefineLIst', new UserdefinedList({
      el: '.jhw-main-inner',
      data: { page: id }
    }));
  });
});
app.addRoute('userdefined', function () {
  seajs.use(['UserdefinedList'], function (UserdefinedList) {
    app.addPanel('main', {
      el: '#jhw-main',
      template: '<div class="jhw-main-inner"></div>'
    }).addView('userdefinedLIst', new UserdefinedList({
      el: '.jhw-main-inner',
      data: { page: null }
    }));
  });
});

app.addModule('NavigateList', 'modules/website/controllers/NavigateList.js');
app.addModule('NavigateModel', 'models/NavigateModel.js');
app.addModule('NavigateDetail', 'modules/website/controllers/NavigateDetail.js');
app.addModule('UserdefinedList', 'modules/website/controllers/UserdefinedList.js');
app.addModule('UserdefinedModel', 'models/UserdefinedModel.js');
app.addModule('UserdefinedDetail', 'modules/website/controllers/UserdefinedDetail.js');

app.addTemplate('template/navigate_list', function (require, exports, module) {
  module.exports = require('modules/website/views/navigate_list.html');
});

app.addTemplate('template/navigate_item', function (require, exports, module) {
  module.exports = require('modules/website/views/navigate_item.html');
});
app.addTemplate('template/userdefined_list', function (require, exports, module) {
  module.exports = require('modules/website/views/userdefined_list.html');
});
app.addTemplate('template/userdefined_item', function (require, exports, module) {
  module.exports = require('modules/website/views/userdefined_item.html');
});
app.addTemplate('template/website_static', function (require, exports, module) {
  module.exports = require('modules/website/views/website_static.html');
});

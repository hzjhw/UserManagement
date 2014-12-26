/**
 * @description main
 * @namespace main
 * @author yongjin<zjut_wyj@163.com> 2014/12/26
 */
app.addModule('NavigateList', 'modules/website/controllers/NavigateList.js');
app.addModule('NavigateModel', 'models/NavigateModel.js');
app.addModule('NavigateDetail', 'modules/website/controllers/NavigateDetail.js');
app.addModule('UserdefinedList', 'modules/website/controllers/UserdefinedList.js');
app.addModule('UserdefinedModel', 'models/UserdefinedModel.js');

app.addTemplate('template/navigate_list', function(require, exports, module){
  module.exports = require('modules/website/views/navigate_list.html');
});

app.addTemplate('template/navigate_item', function(require, exports, module){
  module.exports = require('modules/website/views/navigate_item.html');
});
app.addTemplate('template/userdefined_list', function(require, exports, module){
  module.exports = require('modules/website/views/userdefined_list.html');
});
app.addTemplate('template/userdefined_item', function(require, exports, module){
  module.exports = require('modules/website/views/userdefined_item.html');
});

app.addRoute('static', function(){
  seajs.use(['jquery', 'NavigateList'], function (jquery, NavigateList) {
    app.addView('navigateList', new NavigateList({
      viewId: 'navigateList'
    }));
  });
});
app.addRoute('userdefined/:id', function(id){
  seajs.use(['UserdefinedList'], function(UserdefinedList){
    app.addView('userdefinedList', new UserdefinedList({
      viewId: 'userdefinedList',
      data: {
        page: id
      }
    }));
  });
});
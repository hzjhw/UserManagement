/**
 * @description config
 * @namespace config
 * @author yongjin<zjut_wyj@163.com> 2014/12/11
 */
app.addRoute('attributes', function () {
  seajs.use(['jquery', 'AttributesList'], function (jquery, AttributesList) {
    app.addPanel('main', {
      el: '#jhw-main',
      template: '<div class="jhw-main-inner"></div>'
    }).addView('attributes', new AttributesList({
      el: '.jhw-main-inner'
    }));
  });
});
app.addModule('AttributesDetail', 'modules/attributes/controllers/AttributesDetail.js');
app.addModule('AttributesList', 'modules/attributes/controllers/AttributesList.js');
app.addModule('AttributesModel', 'models/AttributesModel.js');
app.addTemplate('template/attributes_item', function (require, exports, module) {
  module.exports = require('modules/attributes/views/attributes_item.html');
});
app.addTemplate('template/attributes_list', function (require, exports, module) {
  module.exports = require('modules/attributes/views/attributes_list.html');
});

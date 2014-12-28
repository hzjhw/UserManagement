/**
 * @description config
 * @namespace config
 * @author yongjin<zjut_wyj@163.com> 2014/12/11
 */
app.addRoute('attributes', function () {
  seajs.use(['jquery', 'BaseView', 'AttributesList', 'template/attributes_panel'],
    function (jquery, BaseView, AttributesList, template) {
      var AttributesPanel = BaseView.extend({
        initialize: function () {
          this._initialize({
            template: template
          });
        },
        render: function () {
          this._render();
        }
      });
      app.addPanel('attributes', new AttributesPanel({
        el: '#jhw-main'
      })).on('after', function () {
        app.addView('attributes', new AttributesList({
          el: '.jhw-main-inner'
        }));
      }).render();
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
app.addTemplate('template/attributes_panel', function (require, exports, module) {
  module.exports = require('modules/attributes/views/attributes_panel.html');
});
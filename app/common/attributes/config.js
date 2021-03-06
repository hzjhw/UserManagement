/**
 * @description config
 * @namespace config
 * @author yongjin<zjut_wyj@163.com> 2014/12/11
 */

app.addModule('AttributesAdd', 'common/attributes/controllers/AttributesAdd.js');
app.addModule('AttributesShow', 'common/attributes/controllers/AttributesShow.js');

app.addTemplate('template/attributes_option_template', function (require, exports, module) {
  module.exports = require('common/attributes/views/attributes_option_template.html');
});
app.addTemplate('template/attributes_option_item', function (require, exports, module) {
  module.exports = require('common/attributes/views/attributes_option_item.html');
});
app.addTemplate('template/attributes_show_item', function (require, exports, module) {
  module.exports = require('common/attributes/views/attributes_show_item.html');
});

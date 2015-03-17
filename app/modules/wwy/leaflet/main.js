/**
 * @description main
 * @class main
 * @author yongjin<zjut_wyj@163.com> 2015/3/13
 */
app.addModule('WwyLeafletDetail', 'modules/wwy/leaflet/controllers/WwyLeafletDetail.js');
app.addModule('WwyLeafletPre', 'modules/wwy/leaflet/controllers/WwyLeafletPre.js');
app.addTemplate('template/wwy_leaflet_detail', function (require, exports, module) {
  module.exports = require('modules/wwy/leaflet/views/wwy_leaflet_detail.html');
});
app.addTemplate('template/wwy_leaflet_pre', function (require, exprots, module) {
  module.exports = require('modules/wwy/leaflet/views/wwy_leaflet_pre.html');
});
app.addTemplate('template/wwy_leaflet_index', function (require, exports, module) {
  module.exports = require('modules/wwy/leaflet/website/index.html');
});

function leafletDetail(id) {
  seajs.use(['WwyLeafletDetail'], function (WwyLeafletDetail) {
    app.addPanel('main', {
      el: '#jhw-main',
      template: '<div class="jhw-panel"></div>'
    }).addView('wwyLeafletDetail', new WwyLeafletDetail({
      el: '.jhw-panel',
      viewId: 'wwyLeafletDetail',
      id: id
    }));
  });
}
app.addRoute('wwy_leaflet/:id', function (id) {
  debugger
  leafletDetail(id);
});
app.addRoute('wwy_leaflet_add', function () {
  debugger
  leafletDetail();
});

app.addModule('WwyLeafletPage', 'modules/wwy/leaflet/controllers/WwyLeafletPage.js');
app.addModule('WwyLeafletCanvas', 'modules/wwy/leaflet/controllers/WwyLeafletCanvas.js');
app.addModule('WwyLeafletTool', 'modules/wwy/leaflet/controllers/WwyLeafletTool.js');
app.addModule('WwyLeafletPageModel', 'models/WwyLeafletPageModel.js');
app.addTemplate('template/wwy_leaflet_pages_list', function(require, exports, module){
  module.exports = require('modules/wwy/leaflet/views/wwy_leaflet_pages_list.html');
});
app.addTemplate('template/wwy_leaflet_pages_item', function(require, exports, module){
  module.exports = require('modules/wwy/leaflet/views/wwy_leaflet_pages_item.html');
});
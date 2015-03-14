/**
 * @description main
 * @class main
 * @author yongjin<zjut_wyj@163.com> 2015/3/13
 */
app.addModule('LeafletDetail', 'modules/wwy/leaflet/controllers/LeafletDetail.js');
app.addModule('LeafletPre', 'modules/wwy/leaflet/controllers/LeafletPre.js');
app.addTemplate('template/leaflet_detail', function (require, exports, module) {
  module.exports = require('modules/wwy/leaflet/views/leaflet_detail.html');
});
app.addTemplate('template/leaflet_pre', function (require, exprots, module) {
  module.exports = require('modules/wwy/leaflet/views/leaflet_pre.html');
});

app.addRoute('leaflet', function(){
  seajs.use(['LeafletList'], function(LeafletList){
    app.addPanel('main', {
      el: '#jhw-main',
      template: '<div class="jhw-panel"></div>'
    }).addView('leafletList', new LeafletList({
      el: '.jhw-panel',
      viewId: 'leafletList'
    }));
  });
});
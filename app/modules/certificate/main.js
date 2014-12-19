/**
 * @description config
 * @namespace config
 * @author wxw<zjut_wyj@163.com> 2014/12/15
 */
/**
 * 模块
 * */
app.addModule('CertificateModel', 'models/CertificateModel.js');
app.addModule('CertificateList', 'modules/certificate/controllers/CertificateList.js');
app.addModule('CertificateDetail', 'modules/certificate/controllers/CertificateDetail.js');

/**
 * 路由
 * */
app.addRoute('certificate', function(){
  seajs.use(['jquery', 'CertificateList'], function (jquery, CertificateList) {
    app.addView('certificateList', new CertificateList());
  });
});

/**
 * 模板
 * */
app.addTemplate('template/certificate_item', function (require, exports, module) {
  module.exports = require('modules/certificate/views/certificate_item.html');
});
app.addTemplate('template/certificate_list', function (require, exports, module) {
  module.exports = require('modules/certificate/views/certificate_list.html');
});
app.addTemplate('template/certificate_detail', function (require, exports, module) {
  module.exports = require('modules/certificate/views/certificate_detail.html');
});
app.addTemplate('template/certificate_transfer', function(require, exports, module){
  module.exports = require('modules/certificate/views/certificate_transfer.html');
});
app.addTemplate('template/certificate_sort', function(require, exports, module){
  module.exports = require('modules/certificate/views/certificate_sort.html');
});
app.addTemplate('template/certificate_search', function (require, exports, module) {
  module.exports = require('modules/certificate/views/certificate_search.html');
});
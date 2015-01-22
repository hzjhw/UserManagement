/**
 * @description main
 * @namespace main
 * @author yongjin<zjut_wyj@163.com> 2014/12/26
 */
app.addModule('SeoDetail', 'common/seo/SeoDetail.js');
app.addModule('SeoModel', 'models/SeoModel.js');
app.addModule('SeoMobileDetail', 'common/seo/SeoMobileDetail.js');
app.addModule('SeoMobileModel', 'models/SeoMobileModel.js');
app.addTemplate('template/seo_panel', function(require, exports, module){
  module.exports = require('common/seo/seo_panel.html')
});
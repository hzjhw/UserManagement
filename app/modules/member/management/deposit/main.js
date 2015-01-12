/**
 * @description main
 * @namespace main
 * @author wxw <zjut_wyj@163.com> 2015/1/12
 */
app.addRoute('deposit', function () {
  seajs.use(['jquery', 'DepositList'], function (jquery, DepositList) {
    app.addPanel('main', {
      el: '#main',
      template: '<div class="main-inner"></div>'
    }).addView('depositList', new DepositList({
      el: '.main-inner',
      viewId: 'orderList',
      data: app.getData('user'),
      page: parseInt(Est.cookie('orderList_page')) || 1,
      pageSize: parseInt(Est.cookie('orderList_pageSize')) || 10,
      pagination: true
    }));
    app.getView('breadcrumb').reload('预存款记录'+'<span class="red">'+'[预存款余额：￥'+app.getData('user')['deposit']+'元]'+'</span>');
  });
});

app.addModule('DepositModel', 'modules/member/management/deposit/controllers/DepositModel.js');
app.addModule('DepositList', 'modules/member/management/deposit/controllers/DepositList.js');
app.addTemplate('template/deposit_list', function (require, exports, module) {
  module.exports = require('modules/member/management/deposit/views/deposit_list.html');
});
app.addTemplate('template/deposit_item', function (require, exports, module) {
  module.exports = require('modules/member/management/deposit/views/deposit_item.html');
});
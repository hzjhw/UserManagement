/**
 * @description const
 * @namespace const
 * @author yongjin<zjut_wyj@163.com> 2014/12/18
 */
/**
 * 全局常量
 * */
var CONST = {
  HOST: 'http://jihui88.com/member',
  API: 'http://jihui88.com/rest/api',
  DOMAIN: 'http://jihui88.com',
  PIC_URL: 'http://192.168.1.99:8111',
  SEP: '/',
  PIC_NONE: 'upload/u/u4/user02/picture/2014/12/20/11efc2a1-27b1-4ba3-be8e-8f91dc1f256c.jpg',
  ENTER_KEY: 13,
  COLLAPSE_SPEED: 50,
  ENTER_KEY: 13
}
window.CONST = CONST;

/**
 * 视图管理容器
 * */
if (typeof app === 'undefined') {
  app = new Application(CONST);
}
// 是否登录可见
app.addData('loginViewList', [
  {text: '访问者可见', value: '0'},
  {text: '登录后可见', value: '1'}
]);
// 广告产品
app.addData('adsList', [
  {text: '广告产品', value: ''},
  {text: '是', value: '1'},
  {text: '否', value: '0'}
]);
// 重量单位
app.addData('weightUnit',  [
  {text: '克', value: 'g'},
  {text: '千克', value: 'kg'},
  {text: '吨', value: 't'}
]);
// 配送方式
app.addData('deliveryMethod', [
  {text: '先付款后发货', value: 'deliveryAgainstPayment'},
  {text: '货到付款', value: 'cashOnDelivery'}
]);
// 支付方式
app.addData('paymentType', [
  { text: '预存款支付', value: 'deposit' },
  { text: '在线充值', value: 'recharge' },
  { text: '线下支付', value: 'offline' },
  { text: '在线支付', value: 'online' }
]);
// 证书类型
app.addData('certificateList', [
  {text: '基本证书', value: '01'},
  {text: '一般证书', value: '02'},
  {text: '税务证书', value: '03'},
  {text: '荣誉证书', value: '04'},
  {text: '其它证书', value: '05'}
]);
// 新闻类型
app.addData('newsType', [
  {text: '全部', value: ''},
  {text: '图片新闻', value: '01'},
  {text: '一般新闻', value: '02'},
  {text: '置顶新闻', value: '03'},
  {text: '滚动新闻', value: '04'}
]);
// 新闻状态
app.addData('newsState', [
  {text: '全部', value: ''},
  {text: '显示', value: '01'},
  {text: '隐藏', value: '02'},
  {text: '审核中', value: '03'},
  {text: '通过审核', value: '04'}
]);
// 属性类型
app.addData('attributeType', [
  {text: '文本', value: 'text'},
  {text: '数字', value: 'number'},
  {text: '字母', value: 'alphaint'},
  {text: '单选项', value: 'select'},
  {text: '多选项', value: 'checkbox'},
  {text: '日期', value: 'date'}
]);
window.app = app;
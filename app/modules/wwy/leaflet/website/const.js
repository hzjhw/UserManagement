/**
 * @description 全局常量
 * @namespace const
 * @author yongjin<zjut_wyj@163.com> 2015/2/3
 */
/**
 * 全局常量
 * */
var CONST = {
  HOST: 'http://m.331.11door.com',
  API: 'http://m.331.11door.com',
  DOMAIN: 'http://m.331.11door.com',
  PIC_URL: 'http://331.11door.com',
  SEP: '/',
  PIC_NONE: 'upload/u/u4/user02/picture/2014/12/20/11efc2a1-27b1-4ba3-be8e-8f91dc1f256c.jpg',
  DELIVERY_URL: 'http://api.ickd.cn/?id=108377&secret=1d323e291b7778da812664d0386f7b11&type=json&ord=desc&encode=utf8&ver=2',
  ENTER_KEY: 13,
  COLLAPSE_SPEED: 50,
  ENTER_KEY: 13,
  SUBMIT_TIP: '提交中...<span style="color:orange;font-size: 12px;">[提交后无反馈信息?请检查每个标签页中是否有红色错误提示]</span>'
}
window.CONST = CONST;

/**
 * 应用程序创建
 * */
if (typeof App === 'undefined') {
  App = new Application(CONST);
  window.App = App;
}
App.addStatus('useStatus', [
  {text: '待审核', value: '03', html: '<span class="h">等待厂家审核</span>'},
  {text: '未通过', value: '02', html: '<span class="h">审核未通过</span>'},
  {text: '已通过', value: '01', html: '<span class="l">已审核通过</span>'}
]);
App.addStatus('resultStatus', [
  {text: '待审核', value: '03', html: '<span>厂家未审核</span>'},
  {text: '未通过', value: '02', html: '<span>审核未通过</span>'},
  {text: '已通过', value: '01', html: '<span class="yes">厂家审核通过</span>'}
]);
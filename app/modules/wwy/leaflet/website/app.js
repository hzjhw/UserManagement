/**
 * @description 应用程序创建
 * @class app
 * @author yongjin<zjut_wyj@163.com> 2015/2/5
 */
/**
 * 应用程序创建
 * */
if (typeof app === 'undefined') {
  app = new Application(CONST);
}
// 审核状态
app.addStatus('state', [
  {text: '已审核 ', value: '01', html: '<span style="color: green;">已审核</span>'},
  {text: '已审核 ', value: '00', html: '<span style="color: red;">未审核</span>'}
]);
window.app = app;

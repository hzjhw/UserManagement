/**
 * @description 全局常量
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
  DOMAIN_WQT: 'jihui88.com', // 微请帖
  PIC_URL: 'http://192.168.1.99:8111',
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
if (typeof app === 'undefined') {
  app = new Application(CONST);
}
// 是否登录可见
app.addStatus('loginViewList', [
  {text: '访问者可见', value: '0'},
  {text: '登录后可见', value: '1'}
]);
// 广告产品
app.addStatus('adsList', [
  {text: '广告产品', value: ''},
  {text: '是', value: '1'},
  {text: '否', value: '0'}
]);
// 重量单位
app.addStatus('weightUnit', [
  {text: '克', value: 'g'},
  {text: '千克', value: 'kg'},
  {text: '吨', value: 't'}
]);
// 配送方式
app.addStatus('deliveryMethod', [
  {text: '先付款后发货', value: 'deliveryAgainstPayment'},
  {text: '货到付款', value: 'cashOnDelivery'}
]);
// 支付方式(管理员自己设置的支付方式)
app.addStatus('paymentType', [
  { text: '预存款支付', value: 'deposit' },
  { text: '在线充值', value: 'recharge' },
  { text: '线下支付', value: 'offline' },
  { text: '在线支付', value: 'online' }
]);
// 支付配置类型(管理员跟银行的关系)
app.addStatus('paymentConfigType', [
  {text: '预存款', value: 'deposit'},
  {text: '线下支付', value: 'offline'},
  {text: '支付宝', value: 'alipay'}
]);
// 证书类型
app.addStatus('certType', [
  {text: '请选择分类', value: ''},
  {text: '基本证书', value: '01'},
  {text: '一般证书', value: '02'},
  {text: '税务证书', value: '03'},
  {text: '荣誉证书', value: '04'},
  {text: '其它证书', value: '05'}
]);
// 新闻类型
app.addStatus('ImageNews', [
  {text: '全部', value: ''},
  {text: '是', value: '01'},
  {text: '否', value: '02'}
]);
app.addStatus('RollingNews', [
  {text: '全部', value: ''},
  {text: '是', value: '01'},
  {text: '否', value: '02'}
]);
app.addStatus('TopNews', [
  {text: '全部', value: ''},
  {text: '是', value: '01'},
  {text: '否', value: '02'}
]);
// 新闻状态
app.addStatus('newsState', [
  {text: '全部', value: ''},
  {text: '显示', value: '01'},
  {text: '隐藏', value: '02'}
]);
// 属性类型
app.addStatus('attributeType', [
  {text: '文本', value: 'text'},
  {text: '数字', value: 'number'},
  {text: '字母', value: 'alphaint'},
  {text: '单选项', value: 'select'},
  {text: '多选项', value: 'checkbox'},
  {text: '日期', value: 'date'}
]);
// 付款状态
app.addStatus('paymentStatus', [
  {text: '请选择', value: '', html: '-'},
  {text: '未支付', value: 'unpaid', html: '<span style="color: red;">未支付</span>'},
  {text: '部分支付', value: 'partPayment', html: '<span style="color: orange;">部分支付</span>'},
  {text: '已支付', value: 'paid', html: '<span style="color: green;">已支付</span>'},
  {text: '部分退款', value: 'partRefund', html: '<span style="color: orange;">部分退款</span>'},
  {text: '全额退款', value: 'refunded', html: '<span style="color: #000000;">全额退款</span>'}
]);

// 配送状态
app.addStatus('shippingStatus', [
  {text: '请选择', value: '', html: '-'},
  {text: '未发货', value: 'unshipped', html: '<span style="color: red;">未发货</span>'},
  {text: '部分发贫', value: 'partShipped', html: '<span style="color: orange;">部分发贫</span>'},
  {text: '已发货', value: 'shipped', html: '<span style="color: green;">已发货</span>'},
  {text: '部分退货', value: 'partReshiped', html: '<span style="color: black;">已发货</span>'},
  {text: '已退货', value: 'reshiped', html: '<span style="color: black;">已退货</span>'}
]);

// 订单状态
app.addStatus('orderStatus', [
  {text: '请选择', value: '', html: '-'},
  {text: '未处理', value: 'unprocessed', html: '<span style="color: red;">未处理</span>'},
  {text: '已处理', value: 'processed', html: '<span style="color: green;">已处理</span>'},
  {text: '已支付', value: 'completed', html: '<span style="color: #239AFF;">已支付</span>'},
  {text: '已作废', value: 'invalid', html: '<span style="color: gray;">已作废</span>'}
]);
// 订单日志状态
app.addStatus('orderLogType', [
  {text: '请选择', value: '', html: '-'},
  {text: '订单创建', value: 'create'},
  {text: '订单修改', value: 'modify'},
  {text: '订单支付', value: 'payment'},
  {text: '订单退款', value: 'refund'},
  {text: '订单发货', value: 'shipping'},
  {text: '订单退货', value: 'reship'},
  {text: '订单完成', value: 'completed'},
  {text: '订单作废', value: 'invlid'}
]);
// 审核状态
app.addStatus('state', [
  {text: '已审核 ', value: '01', html: '<span style="color: green;">已审核</span>'},
  {text: '已审核 ', value: '00', html: '<span style="color: red;">未审核</span>'}
]);
// 经营模式
app.addStatus('businessType', [
  {text: '生产加工', value: '00'},
  {text: '经营批发', value: '01'},
  {text: '招商代理', value: '02'},
  {text: '商业服务', value: '03'},
  {text: '以上都不是', value: '04'}
]);

// 企业类型
app.addStatus('enterpriseType', [
  {text: '个人用户', value: '00'},
  {text: '企业单位', value: '01'},
  {text: '个体经营', value: '02'},
  {text: '事业单位或者团体', value: '03'}
]);

// 充值方式
app.addStatus('depositType', [
  {text: '会员充值', value: 'memberRecharge'},
  {text: '会员支付', value: 'memberPayment'},
  {text: '后台代支付', value: 'adminRecharge'},
  {text: '后台代扣费', value: 'adminChargeback'},
  {text: '后台代充值', value: 'adminPayment'},
  {text: '后台退款', value: 'adminRefund'}
]);

window.app = app;

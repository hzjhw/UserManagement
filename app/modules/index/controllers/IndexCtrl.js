/**
 * @description 首页
 * @namespace IndexCtrl
 * @author yongjin on 2014/10/31
 */
seajs.use(['jquery', 'TopView', 'LeftView'], function(jquery, TopView, LeftView){
    new TopView();
    new LeftView();
});
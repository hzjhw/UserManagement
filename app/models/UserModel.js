/**
 * @description 用户模型类
 * @namespace AbcUser
 * @author yongjin on 2014/10/31
 */
define(function(require, exports, module){
    var AbcUser = Backbone.Model.extend({
        defaults: {
            username: "",
            password: "",
            valCode: 0
        },
        url: "http://jihui88.com/rest/api/profile"
    });
    module.exports = AbcUser;
});
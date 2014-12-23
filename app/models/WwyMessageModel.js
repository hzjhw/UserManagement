/**
 * @description 微网页模型类
 * @namespace wwyModel
 * @author yongjin on 2014/10/31
 */
define('WwyMessageModel', ['jquery', 'BaseModel'],
    function (require, exports, module) {
        var WwyMessageModel, BaseModel;

        BaseModel = require('BaseModel');

        WwyMessageModel = BaseModel.extend({
            defaults: Est.extend({
                msgId: "",
                wwyId: "",
                title: "",
                mobile: "",
                entName: "",
                job: "",
                phone: "",
                content: "",
                email: "",
                name: "",
                state: "",
                openid: "",
                fromMobile: "",
                msgctrl:"",
                addTime: new Date().getTime()
            }, BaseModel.prototype.defaults),
            baseId: 'msgId',
            baseUrl: CONST.API + '/wwy/message/detail',
            initialize: function () {
                this._initialize();
            }
        });
        module.exports = WwyMessageModel;
    });
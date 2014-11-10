/**
 * @description BaseModel
 * @namespace BaseModel
 * @author yongjin on 2014/11/10
 */


define('BaseModel', ['jquery', 'underscore', 'backbone', 'dialog'],
    function (require, exports, module) {

        var Backbone, dialog, BaseModel;

        Backbone = require('backbone');
        dialog = require('dialog');

        BaseModel = Backbone.Model.extend({

            baseId: '',

            url: function () {
                var base = this.baseUrl;
                if (this.isNew() && !this.id) return base;
                return base + (base.charAt(base.length - 1) == '/' ? '' : '/') + this.id;
            },

            parse: function (response, options) {
                var ctx = this;
                if (response.msg) {
                    var buttons = [];
                    if (response.success){
                        buttons.push({ value: '继续添加', callback: function () {
                            ctx.set('id', null);
                        }});
                        buttons.push({ value: '确定', callback: function () {
                            if (typeof window.detailDialog != 'undefined'){
                                window.detailDialog.close(); // 关键性语句
                            }
                            this.close();
                        }, autofocus: true });
                    } else{
                        buttons.push({ value: '确定', callback: function () {
                            this.close();
                        }, autofocus: true });
                    }
                    dialog({
                        title: '提示：',
                        content: response.msg,
                        width: 250,
                        button: buttons
                    }).show();
                }
                if (response.attributes) {
                    response = response.attributes.data;
                }
                response.id = response[ctx.baseId];
                return response;
            },
            saveField: function (keyValue, callback, ctx, async) {
                var wait = async || true;
                ctx.model.set(keyValue);
                ctx.model.save(null, {
                    wait: wait,
                    success: function (model, result) {
                        if (typeof callback != 'undefined') {
                            callback.call(ctx, model, result);
                        }
                    }
                });
            }
        });

        module.exports = BaseModel;
    });
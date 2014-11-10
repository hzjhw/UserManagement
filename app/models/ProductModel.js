/**
 * @description 产品模型类
 * @namespace ProductModel
 * @author yongjin on 2014/10/31
 */
define('ProductModel', ['jquery', 'underscore', 'backbone', 'dialog'],
    function (require, exports, module) {

        var Backbone, dialog;
        Backbone = require('backbone');
        dialog = require('dialog');

        var ProductModel = Backbone.Model.extend({
            defaults: {
                name: '',
                type: 'NM',
                price: 0,
                sort: 1,
                prodtype: '',
                photo2: [
                    {
                        id: 'Attach_0000000000000000000011057',
                        src: 'upload/g/g2/ggggfj/picture/2014/09/01/0ec83b22-7bed-4ed1-9a96-e4456aa94a51.jpg'
                    }
                ],
                photoId: 'Attach_0000000000000000000011056',
                photo: 'upload/g/g2/ggggfj/picture/2014/09/01/01bcc9d6-4790-403f-a546-eb97fc3aee31.jpg'
            },

            events: {
            },

            url: function () {
                var base = 'http://jihui88.com/rest/api/product/detail';
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
                            if (typeof window.detailDialog != 'undefined')
                                window.detailDialog.close();
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
                response.id = response.productId;
                return response;
            },

            validate: function (attributes) {
                if (!attributes.sort || attributes.sort < 0) {
                    return "sort不能为空";
                }
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
            },

            initialize: function () {
                console.log('ProductModel.initialize [add to collection]');
                /* this.on('change', function () {
                 console.log('new model:' + JSON.stringify(this.attributes));
                 });*/
            },

            setName: function () {
                this.model.set('name', $("#model-name").val());
            }

        });
        module.exports = ProductModel;
    });
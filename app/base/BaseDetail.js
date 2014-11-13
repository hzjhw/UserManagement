/**
 * @description BaseDetail
 * @namespace BaseDetail
 * @author yongjin on 2014/11/12
 */

define('BaseDetail', ['jquery', 'underscore', 'backbone', 'Est'],
    function (require, exports, module) {
        var BaseDetail, Backbone, Est;

        Backbone = require('backbone');
        Est = require('Est');

        BaseDetail = Backbone.View.extend({
            initModel: function (model, ctx) {
                ctx.passId = Est.getUrlParam('id', window.location.href);
                if (!Est.isEmpty(this.passId)) {
                    ctx.model = new model();
                    ctx.model.set('id', ctx.passId);
                    ctx.model.fetch().done(function () {
                        ctx.render().resetIframe();
                    });
                } else {
                    ctx.passId = new Date().getTime();
                    ctx.model = new model();
                    ctx.render().resetIframe();
                }
            },
            saveItem: function (callback, context) {
                console.log('BaseDetail.saveItem');
                this.model.save(null, {
                    wait: true,
                    success: function (response) {
                        console.log('BaseDetail.saveSuccess');
                        if (top) {
                            top.model = response.attributes;
                        }
                        if (callback && typeof callback === 'function')
                            callback.call(context, response);
                    }
                });
            },

            getProductCategory: function(options){
                return new Est.promise(function(topResolve, topReject){
                    options.select = options ? options.select ? true : false : false;
                    options.extend = options ? options.extend ? true : false : false;
                    var getCategory = function(){
                        return new Est.promise(function(resolve, reject){
                            $.ajax({
                                type: 'post',
                                url: 'http://jihui88.com/rest/api/category/product?pageSize=1000',
                                data: {
                                    _method: 'GET'
                                },
                                success: function (result) {
                                    resolve(result);
                                }
                            });
                        });
                    }
                    getCategory().then(function(result){
                        if (result.attributes) {
                            result.attributes.data = Est.bulidTreeNode(result.attributes.data, 'grade', '01', {
                                categoryId: 'categoryId',// 分类ＩＤ
                                belongId: 'belongId',// 父类ＩＤ
                                childTag: 'cates', // 子分类集的字段名称
                                sortBy: 'sort', // 按某个字段排序
                                callback: function (item) {
                                    item.text = item.name;
                                    item.value = item.categoryId
                                }
                            });
                            if (options.select){
                                result.attributes.data = Est.bulidSelectNode(result.attributes.data, 1, {
                                    name: 'text'
                                })
                            }
                            if (options.extend){
                                result.attributes.data = Est.extendTree(result.attributes.data);
                            }
                        } else{
                            result.attributes.data = [];
                        }
                        result.attributes.data.unshift({text: '请选择分类', value: '0'});
                        topResolve(result.attributes.data);
                    });
                });
            },

            initSelect: function (options) {
                return new Est.promise(function(resove, reject){
                    var container = {};
                    var target = options.target || '#category';
                    var render = options.render || '#s1';
                    var itemId = options.itemId || 'categoryId';
                    var width = options.width || '150';
                    var items = options.items || [];
                    BUI.use('bui/select', function (Select) {
                        container[render] = new Select.Select({
                            render: render,
                            valueField: target,
                            width: width,
                            items: items
                        });
                        container[render].render();
                        container[render].on('change', function (ev) {
                            $(target).val(Est.trim(ev.item[itemId]));
                            resove(ev.item[itemId]);
                        });
                    })
                });

            },

            reset: function () {
                this.model.set(this.model.defaults);
            },
            resetIframe: function () {
                try{
                    window.detailDialog.height($(document).height());
                } catch(e){
                    console.error('【error】: BaseDetail.resetIframe' + e);
                }
            },
            remove: function () {
                console.log('BaseDetail.remove');
                this.model.destroy();
                this.model = null;
                return this;
            },
            close: function () {
                console.log('BaseDetail.close');
                this.undelegateEvents();
                this.stopListening();
                this.off();
            }
        });

        module.exports = BaseDetail;

    });
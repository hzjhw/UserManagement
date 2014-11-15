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
            /**
             * 初始化模型类 将自动判断是否有ID传递进来，
             * 若存在则从服务器端获取详细内容
             *
             * @method [initialize] - initModel
             * @param model
             * @param ctx
             * @author wyj on 14.11.15
             */
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
            /**
             * form包装器， 传递表单选择器
             *
             * @method [render] - form
             * @param {String} formSelector 选择器
             * @returns {BaseDetail}
             * @author wyj on 14.11.15
             */
            form: function(formSelector){
                this.formSelector = formSelector;
                return this;
            },
            /**
             * 启用表单验证
             *
             * @method [render] - validate
             * @returns {BaseDetail}
             * @author wyj 14.11.15
             */
            validate: function(){
                BUI.use('bui/form', function (Form) {
                    new Form.Form({
                        srcNode: this.fromId
                    }).render();
                }); return this;
            },
            /**
             * 绑定提交按钮
             *
             * @method [render] - init
             * @param callback
             * @author wyj 14.11.15
             */
            init: function(callback){
                var ctx = this;
                $('#submit', this.el).on('click', function () {
                    $("input, textarea", $(ctx.formSelector)).each(function () {
                        var name, val, pass; name = $(this).attr('name');
                        if (!Est.isEmpty(name)){
                            switch (this.type){
                                case 'radio':
                                    val = $(this).is(":checked") ? $(this).val() : pass = true; break;
                                default :
                                    val = $(this).val();break;
                            }
                            if (!pass){
                                ctx.model.set(name, val);
                            }
                        }
                    });
                    if (typeof callback !== 'undefined')
                        callback.call(ctx);
                    ctx.saveItem(function () {
                    });
                });
            },
            /**
             * 保存表单
             * @method [render] - saveItem
             * @param callback
             * @param context
             * @author wyj 14.11.15
             */
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
            /**
             * 获取产品分类
             *
             * @method [render] - getProductCategory
             * @param options select 转换成select形式，extend 转换成列表形式
             * @returns {ln.promise}
             * @author wyj 14.11.15
             */
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
            /**
             * 重置表单
             */
            reset: function () {
                this.model.set(this.model.defaults);
            },
            /**
             * 重置对话框高度
             */
            resetIframe: function () {
                try{
                    window.detailDialog.height($(document).height());
                } catch(e){
                    console.error('【error】: BaseDetail.resetIframe' + e);
                }
            },
            /**
             * 移除模型类
             *
             * @returns {BaseDetail}
             */
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
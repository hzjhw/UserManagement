/**
 * @description artDialog_guide
 * @namespace artDialog_guide
 * @author yongjin on 2014/11/6
 */
var d = dialog({
    title: '修改产品',
    content: document.getElementById("product-add-inner")
});
d.addEventListener('close', function () {
    if (!this.returnValue.length < 1) {
        console.log(this.returnValue);
    }
});
d.show();



seajs.use(['dialog-plus'], function (dialog) {
    window.dialog = dialog;

    window.detailDialog = dialog({
        id: 'product-edit-dialog',
        title: '产品修改',
        width: 800,
        url: 'http://jihui88.com/member/modules/product/product_detail.html?id=' + ctx.model.id ,
        button: [{
            value: '保存',
            callback: function () {
                this.iframeNode.contentWindow.$("#product-submit").click();
                this.close();
                //ctx.model.set(window.model);
                return false;
            },
            autofocus: true
        },{
            value: '重置',
            callback: function () {
                this.iframeNode.contentWindow.$("#product-reset").click();
                return false;
            }
        },{ value: '关闭' } ],
        onshow: function () {
        },
        oniframeload: function () {
            this.iframeNode.contentWindow.detailDialog = window.detailDialog;
        },
        onclose: function () {
            ctx.model.set(window.model);
            window.model = null;
            if (this.returnValue) {
                $('#value').html(this.returnValue);
            }
            //this.remove();
            console.log('onclose');
        },
        onremove: function () {
            console.log('onremove');
        }
    });
    window.detailDialog.showModal();
});

/**
 * @description bui_dialog
 * @namespace bui_dialog
 * @author yongjin on 2014/11/6
 */
BUI.use(['bui/overlay','bui/form'],function(Overlay,Form){

    var form = new Form.HForm({
        srcNode : '#form'
    }).render();

    var dialog = new Overlay.Dialog({
        title:'产品修改',
        width:800,
        height:400,
        contentId:'dialog-container',
        success:function () {
            productDetail.saveItem();
            this.close();
        }
    });
    dialog.show();
});
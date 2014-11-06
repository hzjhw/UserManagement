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
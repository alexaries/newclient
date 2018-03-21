/**
 * Created by Administrator on 14-4-25.
 * 小提示 －1句话（显示3s消失）
 */
var LittleNoticeNode = cc.Node.extend({
    mType:0,//0 普通 1 vip
    mMsg:"",//提示信息
    init:function () {
        var bRet = false;
        if (this._super()) {
            var winsize = cc.director.getWinSize();

            var size_notice = cc.size(600,70);
            var  bgimg = null;
            bgimg =createSysPanel(size_notice);

            this.addChild(bgimg);
            this.setContentSize(bgimg.getContentSize());
            var size = this.getContentSize();

            //提示
            this.mMsg = "";
            var pMsgLabel = cc.LabelTTF.create(this.mMsg,sGameData.mFontname, 24,//字体  ，字体大小
                cc.size(580,0),  //设置文本的宽高
                cc.TEXT_ALIGNMENT_CENTER,//水平居右对齐
                cc.VERTICAL_TEXT_ALIGNMENT_CENTER);//垂直对齐
            //pMsgLabel.setPosition(cc.p(0,size.height*0.1));
            pMsgLabel.setTag(8002);
            this.addChild(pMsgLabel,1);
            bRet = true;
        }
        return bRet;
    },
    //显示通知
    showMsg:function(msg){
        this.mMsg = msg;
        var pMsgLabel = this.getChildByTag(8002);
        if(pMsgLabel){
            pMsgLabel.setString(this.mMsg);
        }
    }
});
LittleNoticeNode.create = function (type) {
    var sg = new LittleNoticeNode();
    if (sg) {
        sg.mType = type
        sg.init()
        return sg;
    }
    return null;
};
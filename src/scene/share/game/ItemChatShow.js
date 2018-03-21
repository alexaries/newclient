/**
 * Created by apple on 15-12-9.
 */


//自己发的在右
//别人发的在左，带用户名
var ItemChatShow = cc.Node.extend({
    mIndex:0, //
    mMsg:null,
    mIsSelected:false,
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();
            var thewidth = 670 ;
            var itemsize = cc.size(thewidth,120);
            if(this.mMsg!=null){
                var twidth = 520;
                //根据文字 计算出 宽度
                // xxxx
                var type = 0;
                if(this.mMsg.fromId == sGameData.mUser.id){
                    type = 1;
                }
                if(sGameData.mIsTestNoNet){
                    if(this.mMsg.fromId%4==0){
                        type = 1;
                    }
                }


                //别人发的
                if(type ==0){
                    var msglabel = cc.LabelTTF.create(this.mMsg.name+"："+this.mMsg.content, sGameData.mFontname, 24,//字体  ，字体大小
                        cc.size(twidth,0),  //设置文本的宽高
                        cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);//垂直对齐
                    msglabel.setAnchorPoint(cc.p(0,1));
                    msglabel.setTag(8002);
                    msglabel.setColor(cc.color(0,0,0));
                    this.addChild(msglabel,2);
                    itemsize.height = msglabel.getContentSize().height+50;
                    msglabel.setPosition(cc.p(35, itemsize.height*0.99-30));

                    var time1 = getLocalTime_hm(this.mMsg.createTime);
                    var timelabel = cc.LabelTTF.create(time1, sGameData.mFontname, 20,//字体  ，字体大小
                        cc.size(272,35),  //设置文本的宽高
                        cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);//垂直对齐
                    timelabel.setAnchorPoint(cc.p(0.5,1));
                    timelabel.setPosition(cc.p(itemsize.width/2, itemsize.height*0.99+5));
                    timelabel.setTag(8001);
                    this.addChild(timelabel,1);
                    timelabel.setColor(cc.color(0,0,0));


                    var bgsize = cc.size(twidth+35,msglabel.getContentSize().height+25)
                    var btnframe = createMsgBG(bgsize,0);
                    btnframe.setPosition(cc.p(20, itemsize.height*0.99-25+5));
                    this.addChild(btnframe);
                    this.setContentSize(cc.size(itemsize.width,msglabel.getContentSize().height+50));
                }else{//自己发的
                    twidth = 515
                    var msglabel = cc.LabelTTF.create(this.mMsg.content, sGameData.mFontname, 24,//字体  ，字体大小
                        cc.size(twidth,0),  //设置文本的宽高
                        cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);//垂直对齐
                    msglabel.setAnchorPoint(cc.p(1,1));
                    msglabel.setTag(8002);
                    msglabel.setColor(cc.color(0,0,0));
                    this.addChild(msglabel,2);
                    itemsize.height = msglabel.getContentSize().height+50;
                    msglabel.setPosition(cc.p(itemsize.width - 61, itemsize.height*0.99-30));

                    var time1 = getLocalTime_hm(this.mMsg.createTime);
                    var timelabel = cc.LabelTTF.create(time1, sGameData.mFontname, 20,//字体  ，字体大小
                        cc.size(272,35),  //设置文本的宽高
                        cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);//垂直对齐
                    timelabel.setAnchorPoint(cc.p(0.5,1));
                    timelabel.setPosition(cc.p(itemsize.width/2, itemsize.height*0.99+9));
                    timelabel.setTag(8001);
                    this.addChild(timelabel,1);
                    timelabel.setColor(cc.color(0,0,0));

                    var bgsize = cc.size(twidth+35,msglabel.getContentSize().height+30)
                    var btnframe = createMsgBG(bgsize,1);
                    btnframe.setPosition(cc.p(itemsize.width - 43, itemsize.height*0.99-25+10));
                    this.addChild(btnframe);
                    this.setContentSize(cc.size(itemsize.width,msglabel.getContentSize().height+50));
                }
            }
            bRet = true;
        }
        return bRet;
    },
    //更新显示物品的信息
    updateInfo:function()
    {
        var timelabel = this.getChildByTag(8001);
        if(timelabel){
            timelabel.setString(this.mMsg.createTime);
        }
        var msglabel = this.getChildByTag(8002);
        if(msglabel){
            msglabel.setString(this.mMsg.content);
        }
    }
});
ItemChatShow.create = function (cMsg) {
    var sg = new ItemChatShow();
    if (sg ) {
        sg.mMsg = cMsg;
        sg.init()
        return sg;
    }
    return null;
};

/**
 * Created by apple on 15-4-2.
 */
var ItemWorldChat = cc.TableViewCell.extend({
    mIndex:0,//索引
    mMsg:null,//消息
    mMsgLabel:null,//消息显示
    mIsSelected:false,//是否选中
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();


            var tempW = (size.width - 960)*0.2;
            var rwidth = 360+tempW;
            var size_panel = cc.size(rwidth*2-20,440);
            var size_panel_inner = cc.size(size_panel.width-45, 395);

            var itemsize = cc.size(size_panel_inner.width*0.99,60)
            this.setContentSize(itemsize);

            //var sprite =  createHallListbg(itemsize)
            ////sprite.setContentSize(ccsize)
            //sprite.setAnchorPoint(cc.p(0, 0));
            //sprite.setPosition(cc.p(0, 0));
            //sprite.setTag(9001);
            //this.addChild(sprite,1);

            var twidth = itemsize.width - 2;
            var msg = this.mMsg.msg+ " ("+getLocalTime_hm(this.mMsg.time)+")"
            var blockSize = cc.size(twidth, 65);
            var msglabel = cc.LabelTTF.create(msg, sGameData.mFontname,22, blockSize, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            msglabel.attr({
                x : 10,
                y : 30 ,
                anchorX:0,
                anchorY:0.5
            });
            this.addChild(msglabel, 5);
            this.mMsgLabel = msglabel;
            if(checkMsgIsSys(this.mMsg.msg)){
                msglabel.setColor(cc.color(255,255,255))
            }else{
                msglabel.setColor(cc.color(255,255,255))
            }

            

            //xxx
            bRet = true;
        }
        return bRet;
    },
    //更新显示消息的信息
    updateInfo:function()
    {
        var msg = this.mMsg.msg+ " ("+getLocalTime_hm(this.mMsg.time)+")"
        this.mMsgLabel.setString(msg);
        if(checkMsgIsSys(this.mMsg.msg)){
            this.mMsgLabel.setColor(cc.color(77,184,73))
        }else{
            this.mMsgLabel.setColor(cc.color(255,255,255))
        }
    },
    //选中
    choose:function()
    {
        this.mIsSelected = true;
        var sprite1 = this.getChildByTag(9001);
        if(sprite1){
            sprite1.setColor(cc.color(220, 220, 220));
        }
    },
    //取消选中
    unchoose:function()
    {
        this.mIsSelected = false;
        var sprite1 = this.getChildByTag(9001);
        if(sprite1){
            sprite1.setColor(cc.color(255, 255, 255));
        }
    }

});
ItemWorldChat.create = function (amsg,index) {
    var sg = new ItemWorldChat();
    if (sg ) {
        sg.mMsg = amsg;
        sg.mIndex = index;
        sg.init()
        return sg;
    }
    return null;
};

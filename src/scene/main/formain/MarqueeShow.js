/**
 * Created by Administrator on 14-6-5.
 * 主界面 跑马灯
 */
var MarqueeShow = cc.Node.extend({
    mMsgLabel:null,//消息
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();
            //xxx

            var tempW = (size.width - 960)*0.5;
            var rwidth = 320+tempW;

            var itemsize = cc.size(820+tempW,42)

            var bgSprite = cc.Scale9Sprite.create();
            bgSprite.initWithSpriteFrameName("main_notify_bg.png")
            bgSprite.setContentSize(itemsize)
            bgSprite.attr({
                anchorX: 1,
                anchorY: 1
            });
            this.addChild(bgSprite);
            this.setContentSize(bgSprite.getContentSize());

            var iconsprite = cc.Sprite.create("#main_notify_icon.png");
            this.addChild(iconsprite);
            iconsprite.setAnchorPoint(cc.p(0.5,0.5));
            iconsprite.setPosition(cc.p(-itemsize.width+35,-18-3));


            if(sGameData.mAppCanShowWorldMsg){
                var iconsprite = cc.Sprite.create("#main_notify_icon_input.png")
                this.addChild(iconsprite)
                iconsprite.setPosition(cc.p(-36,-20))
                iconsprite.setScale(0.6);
            }


            var node = cc.Node.create();
            node.setContentSize(cc.size(itemsize.width-20,68));

            var stencil = this.shape()

            var clipingnode = cc.ClippingNode.create();
            clipingnode.setContentSize(itemsize)
            clipingnode.setStencil(stencil);
            clipingnode.addChild(node);
            //clipingnode.setAlphaThreshold(1);
            this.addChild(clipingnode)
            //clipingnode.setInverted(true);

            var msg = sResWord.w_tip_welcome;
            var idlabel = cc.LabelTTF.create(msg,"STHeiti" , 24);//sGameData.mFontname
            idlabel.setAnchorPoint(cc.p(1,0.5))
            idlabel.setPosition(cc.p(-15,-20))
            node.addChild(idlabel,2);

//            var idlabel = ccui.Text.create();
//            idlabel.attr({
//                string: msg,
//                font: "24 STHeiti-Medium",
//                x: -15,
//                y: -34,
//                anchorX:1
//            });
//            node.addChild(idlabel,2);

            this.mMsgLabel = idlabel;

            this.showMsg();

            bRet = true;
        }
        return bRet;
    },
    //显示消息 （main 跑马灯：优先显示新消息，没新消息显示系统消息）
    showMsg:function(){
        if(!sGameData.mDefaultScrollMsg||sGameData.mDefaultScrollMsg.length ==0){
            var dmsg = sResWord.w_tip_welcome;
            if(!sGameData.mAppIsSubmitToAppStore){
                var dmsg1 = getGameSysConfig("default_scroll_msg")
                if(dmsg1&&dmsg1.length > 0){
                    dmsg = dmsg1;
                }
            }
            sGameData.mDefaultScrollMsg = dmsg
        }
        var msg = sGameData.mDefaultScrollMsg

        if(sGameData.mScrollMsgs_new.length > 0){
            var aMsg = sGameData.mScrollMsgs_new[0];
            sGameData.mScrollMsgs_new.splice(0,1)
            msg = aMsg.msg
        }else{
            // if(sGameData.mShowScrollNotifyId < sGameData.mScrollMsgs_sys.length){
            //     var aMsg = sGameData.mScrollMsgs_sys[sGameData.mShowScrollNotifyId];
            //     msg = aMsg.msg
            //     sGameData.mShowScrollNotifyId++;
            //     if(sGameData.mShowScrollNotifyId >= sGameData.mScrollMsgs_sys.length){
            //         sGameData.mShowScrollNotifyId = 0;
            //     }
            // }
        }
        var msglabel = this.mMsgLabel
        if(msglabel){
            msglabel.setString(msg);
            var size = cc.director.getWinSize();
            var tempW = (size.width - 960)*0.2;
            var rwidth = 320+tempW;
            var itemsize = cc.size(rwidth*2-20-tempW,68)

            var tsize = msglabel.getContentSize()
            var p1 = cc.p(0+tsize.width,-20);
            msglabel.setPosition(p1)
            var p2 = cc.p(-itemsize.width,-20)
            var time = (itemsize.width+tsize.width)/50.0
            var move1anim = cc.MoveTo.create(time, p2)  //17s
            var callback = cc.CallFunc.create(this.msgMoveEnd,this);
            var seq =cc.Sequence.create(move1anim,callback);
            msglabel.runAction(seq)
        }
    },
    //消息移动结束
    msgMoveEnd:function(){
        this.showMsg();
    },
    //消息显示的区域，超出不显示 （android 要 单独 设置 gl）
    shape:function () {
        var tw = 0;
        if(sGameData.mAppCanShowWorldMsg){
            tw  = -50;
        }

        var shape = cc.DrawNode.create();
        var triangle = [cc.p(-this.width+65, -this.height+10),cc.p(-this.width+65, -10), cc.p(-15+tw, -10), cc.p(-15+tw, -this.height+10)];
        var green = cc.color(0, 0, 0, 255);
        shape.drawPoly(triangle, green, 3, green);
        return shape;
    }
});
MarqueeShow.create = function () {
    var sg = new MarqueeShow();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

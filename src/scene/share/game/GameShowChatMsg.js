/**
 * Created by apple on 15-12-9.
 */
//显示 某人 说的话
var GameShowChatMsg = cc.Node.extend({
    mPos:[],//坐标
    mLabels:[],//文字显示
    mBGImgs:[],//背景
    mGameType:0,// 显示类型 1dzpk 2zjh 3dn 4ddz 5scmj 6gymj
    mShowType:[],
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();

            if(this.mGameType == 1) {
                this.mPos = [[size.width/2 - 47,size.height/2 - 174],
                    [size.width/2 - 237,size.height/2 - 174],
                    [size.width/2 - 411,size.height/2 - 64],
                    [size.width/2 - 380,size.height/2 + 142],
                    [size.width/2 - 196,size.height/2 + 230],
                    [size.width/2 + 196,size.height/2 + 230],
                    [size.width/2 + 380,size.height/2 + 142],
                    [size.width/2 + 403,size.height/2 - 64],
                    [size.width/2 +234,size.height/2 - 174]];
            }else if(this.mGameType == 2) {
                this.mPos = [[size.width/2 - 107,size.height/2 - 154],
                    [size.width/2 + 407,size.height/2 - 54],
                    [size.width/2 + 280,size.height/2 + 230],
                    [size.width/2 - 280,size.height/2 + 230],
                    [size.width/2 - 407,size.height/2 - 54]];
            }else if(this.mGameType == 3) {
                this.mPos = [[size.width/2 - 107,size.height/2 - 154],
                    [size.width/2 + 407,size.height/2 - 54],
                    [size.width/2 + 407,size.height/2 + 160],
                    [size.width/2 - 407,size.height/2 + 160],
                    [size.width/2 - 407,size.height/2 - 54]];
            }else if(this.mGameType == 4||this.mGameType == 7) {
                this.mPos = [[150,250],[size.width - 150,size.height - 150],[150,size.height - 150]];
            }else if(this.mGameType == 5) {
                this.mPos = [[46,196],
                    [size.width-46,size.height/2+50],
                    [size.width/2-287,size.height-46],
                    [46,size.height/2+50]];
            }else if(this.mGameType == 6) {
                this.mPos = [[46,196],
                    [size.width-46,size.height/2+50],
                    [size.width/2-287,size.height-46],
                    [46,size.height/2+50]];
            }

            var tempY_a = 0;//android 文字 偏移
            if(sGameData.mCocosVerCode >= 30100){
                if(cc.sys.os == cc.sys.OS_ANDROID){
                    tempY_a = 10;
                }else if(cc.sys.os == cc.sys.OS_IOS){
                    tempY_a = 8;
                }
            }else {
                if (cc.sys.os == cc.sys.OS_ANDROID) {
                    tempY_a = 2;
                }
            }

            for(var i=0;i<sGameData.mCurrLayer.MAX_PLAYERNUM;i++){
                var pos = this.getPos(i);
                var type = 0;
                if(this.mGameType == 1){//dzpk 顺时针
                    if(i>4){
                        type = 1;
                    }
                }else if(this.mGameType == 3||this.mGameType == 2){//zjh dn
                    if(i==1||i==2){
                        type = 1;
                    }
                }else if(this.mGameType == 4||this.mGameType == 7){//ddz
                    if(i==1){
                        type = 1;
                    }
                }else if(this.mGameType == 5||this.mGameType == 6){//scmj gymj
                    if(i==1){
                        type = 1;
                    }
                }
                this.mShowType[i] = type;
                var btnframe = createMsgBG(cc.size(200,30+50),type);
                if(type == 1){
                    btnframe.setAnchorPoint(cc.p(1,0.5));
                }else{
                    btnframe.setAnchorPoint(cc.p(0,0.5));
                }
                btnframe.setPosition(pos);
                this.addChild(btnframe);
                btnframe.setVisible(false);
                this.mBGImgs[i] = btnframe

                var msglabel = cc.LabelTTF.create("", sGameData.mFontname, 24);
                if(type!=1){
                    msglabel.setPosition(cc.p(pos.x+25,pos.y+tempY_a));
                    msglabel.setAnchorPoint(cc.p(0,0.5));
                }else{
                    msglabel.setPosition(cc.p(pos.x-25,pos.y+tempY_a));
                    msglabel.setAnchorPoint(cc.p(1,0.5));
                }
                msglabel.setColor(cc.color(0,0,0));
                this.addChild(msglabel);
                msglabel.setVisible(false);
                this.mLabels[i] = msglabel
            }

            //xxx
            bRet = true;
        }
        return bRet;
    },
    //获取位置
    getPos:function(seat){
        var size = cc.director.getWinSize();
        var pos = cc.p(0,0)
        pos.x = this.mPos[seat][0];
        pos.y = this.mPos[seat][1];
        return pos;
    },
    //显示某位置聊天消息
    showMsg:function(seat,msg){
        log("show chat"+seat+msg);
        var label = this.mLabels[seat];
        if(label){
            label.setVisible(true);
            label.setString(msg);
            var ss = label.getContentSize()
            log("ss=="+ss.width+"|"+ss.height);
            var btnframe = this.mBGImgs[seat];
            btnframe.setVisible(true);
            //btnframe.setContentSize(cc.size(ss.width+50,ss.height+40));
            changeMsgBG(btnframe,cc.size(ss.width+50,ss.height+40),this.mShowType[seat]);
            var showEnd = function(){
                label.setVisible(false);
                btnframe.setVisible(false);
            }
            var delay = cc.DelayTime.create(1);
            var callback = cc.CallFunc.create(showEnd, this);
            var actions2 = cc.Sequence.create(delay,callback);
            label.runAction(actions2)
        }
    },
    //清除聊天消息
    cleanChat:function(seat){
        var opimg = this.mLabels[seat];
        opimg.setVisible(false);
        var bgimg = this.mBGImgs[seat];
        bgimg.setVisible(false);
    }

});
GameShowChatMsg.create = function (gametype) {
    var sg = new GameShowChatMsg();
    if (sg) {
        sg.mGameType = gametype;
        sg.init()
        return sg;
    }
    return null;
};

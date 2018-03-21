/**
 * Created by apple on 15-12-8.
 */
//选择表情
var GameChatFace = cc.Node.extend({
    mIndex:0, //某位置
    mFaceShows:[],//表情集合
    mGameType:0,// 显示类型 1dzpk 2zjh 3dn 4ddz 5scmj 6gymj 7ddzmathc
    init:function () {
        var bRet = false;
        if (this._super()) {
            var winsize = cc.director.getWinSize();

            var size_notice = cc.size(710,410);
            var  bgimg = createSysPanel(size_notice);
            this.addChild(bgimg);
            this.setContentSize(bgimg.getContentSize());
            var size = this.getContentSize();



            //添加按钮 tab1

            var tab02sprite = ButtoSpritenWithSpriteInner("#ui_panel_tabl_nor.png","#w_c_face1.png",cc.p(0.5,0.5),0);
            var tab02sprite1 = ButtoSpritenWithSpriteInner("#ui_panel_tabl_sel.png","#w_c_face2.png",cc.p(0.5,0.5),0);
            var tab02sprite2 = ButtoSpritenWithSpriteInner("#ui_panel_tabl_sel.png","#w_c_face2.png",cc.p(0.5,0.5),0);
            var tab02Item = cc.MenuItemSprite.create(
                tab02sprite,
                tab02sprite1,
                tab02sprite2,
                this.clickTab2,this);
            tab02Item.setAnchorPoint(cc.p(1,0));
            tab02Item.setPosition(cc.p(-size_notice.width*0.5-1,65));
            tab02Item.setScale(0.6);
            tab02Item.setEnabled(false);
            this.mTab2Item = tab02Item


            var tab01sprite = ButtoSpritenWithSpriteInner("#ui_panel_tabl_nor.png","#w_c_cy1.png",cc.p(0.5,0.5),0);
            var tab01sprite1 = ButtoSpritenWithSpriteInner("#ui_panel_tabl_sel.png","#w_c_cy2.png",cc.p(0.5,0.5),0);
            var tab01sprite2 =  ButtoSpritenWithSpriteInner("#ui_panel_tabl_sel.png","#w_c_cy2.png",cc.p(0.5,0.5),0);
            var tab01Item = cc.MenuItemSprite.create(
                tab01sprite,
                tab01sprite1,
                tab01sprite2,
                this.clickTab1,this);
            tab01Item.setAnchorPoint(cc.p(1,0.5));
            tab01Item.setPosition(cc.p(-size_notice.width*0.5+1,0));
            tab01Item.setScale(0.6);
            this.mTab1Item = tab01Item
            tab01Item.setVisible(false);

            var tab03sprite = ButtoSpritenWithSpriteInner("#ui_panel_tabl_nor.png","#w_c_chat1.png",cc.p(0.5,0.5),0);
            var tab03sprite1 = ButtoSpritenWithSpriteInner("#ui_panel_tabl_sel.png","#w_c_chat2.png",cc.p(0.5,0.5),0);
            var tab03sprite2 =  ButtoSpritenWithSpriteInner("#ui_panel_tabl_sel.png","#w_c_chat2.png",cc.p(0.5,0.5),0);
            var tab03Item = cc.MenuItemSprite.create(
                tab03sprite,
                tab03sprite1,
                tab03sprite2,
                this.clickTab3,this);
            tab03Item.setAnchorPoint(cc.p(1,1));
            tab03Item.setPosition(cc.p(-size_notice.width*0.5+1,-65));
            tab03Item.setScale(0.6);
            this.mTab3Item = tab03Item
            tab03Item.setVisible(false);


            var menu = cc.Menu.create(tab01Item,tab02Item,tab03Item);//tab2Item
            menu.x = 0;
            menu.y = 0;
            this.addChild(menu, 1);

            this.mFaceShows = [];

            for(var i=0;i<25;i++){
                var item = ItemFace.create(i+1);
                this.addChild(item,1)
                item.setPosition(cc.p(-300+(i%7)*100,150-100*Math.floor(i/7)));
                this.mFaceShows.push(item);
            }



            bRet = true;
        }
        return bRet;
    },
    clickTab2:function(){
        log("clickTab2")
        if(this.mGameType>0) {
            sGameData.mCurrLayer.buttonClicked();
        }
    },
    //切换到聊天语句
    clickTab1:function(){
        log("clickTab1")
        playClickSound();
        if(this.mGameType>0){

            sGameData.mCurrLayer.op_showGameChatMsg();
        }

    },
    clickTab3:function(){
        log("clickTab3")
        playClickSound();
        sGameData.mCurrLayer.op_showGameChatInput();
    },


    //检测点击表情
    checkClickFace:function(pos){
        var index = this.checkFace(pos);
        log("checkClickFace=="+index);
        if(index > -1){
            this.setVisible(false);
            var seat = randomInt(3)
            //sGameData.mDDZLayer.startShowFace(seat,index);
            var canSend = false;

            if(this.mGameType == 1) { //显示类型 1dzpk 2zjh 3dn 4ddz 5scmj 6gymj
                if(sGameData.mDZPKLayer.mMyState == MYSTATE_SITDOWN){
                    canSend = true;
                }
            }else if(this.mGameType == 2) {
                if(sGameData.mZJHLayer.mMyState == MYSTATE_SITDOWN){
                    canSend = true;
                }
            }else if(this.mGameType == 3) {
                if(sGameData.mDNLayer.mMyState == MYSTATE_SITDOWN){
                    canSend = true;
                }
            }else if(this.mGameType == 4) {
                if(sGameData.mDDZLayer.mIsInGame == true){
                    canSend = true;
                }
            }else if(this.mGameType == 5) {
                if(sGameData.mMJLayer.mMyState == MYSTATE_SITDOWN){
                    canSend = true;
                }
            }else if(this.mGameType == 6) {
                if(sGameData.mGYMJLayer.mMyState == MYSTATE_SITDOWN){
                    canSend = true;
                }
            }else if(this.mGameType == 7) {
                if(sGameData.mDDZLayer.mIsInGame == true){
                    canSend = true;
                }
            }

            if(canSend){
                var now  = (new Date()).getTime();
                if(now - sGameData.mChatTime < sGameData.mChatDurTime*1000){
                    var durtime = sGameData.mChatDurTime;
                    var word = sResWord.w_tip_interative_s1+durtime+sResWord.w_tip_interative_s2;
                    showLittleNotice(word)
                    return;
                }
                sGameData.mChatTime = (new Date()).getTime();

                if(this.mGameType == 1) { //显示类型 1dzpk 2zjh 3dn 4ddz 5scmj 6gymj
                    sGameNetData.mDZPKNet.sendDZPKChat(5,index,"",0);
                }else if(this.mGameType == 2) {
                    sGameNetData.mZJHNet.sendZJHChat(5,index,"",0);
                }else if(this.mGameType == 3) {
                    sGameNetData.mDNNet.sendDNChat(5,index,"",0);
                }else if(this.mGameType == 4) {
                    sGameData.mDDZLayer.sendChatCmd(5,index,"",0);
                }else if(this.mGameType == 5) {
                    sGameNetData.mMJNet.sendMJChat(5,index,"",0);
                }else if(this.mGameType == 6) {
                    sGameNetData.mGYMJNet.sendGYMJChat(5,index,"",0);
                }else if(this.mGameType == 7) {
                    sGameNetData.mDDZMatchNet.sendDDZMatchChat(5,index,"",0);
                }
            }
        }
    },
    //检测点击表情
    checkFace:function(pos){
        //log("checkClickInteratve=="+pos.x+"|"+pos.y)
        var pos1 = cc.p(pos.x-this.x,pos.y-this.y)
        //log("pos1=="+pos1.x+"|"+pos1.y)
        var index = -1;
        for(var i = 0;i<this.mFaceShows.length;i++){
            var itemshow = this.mFaceShows[i];
            if(itemshow.checkClick(pos1)){
                index = i
                break;
            }
        }
        return index;
    }

});
GameChatFace.create = function (gametype) {
    var sg = new GameChatFace();
    if (sg) {
        sg.mGameType = gametype;
        sg.init()
        return sg;
    }
    return null;
};

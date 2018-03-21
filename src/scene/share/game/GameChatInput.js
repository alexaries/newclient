/**
 * Created by apple on 15-12-9.
 */
//选择表情
var GameChatInput = cc.Node.extend({
    mIndex:0, //某位置
    mFaceShows:[],//表情集合
    mGameType:0,// 显示类型 1dzpk 2zjh 3dn 4ddz 5scmj 6gymj 7ddzmathc
    mScrollView:null,
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
            tab02Item.setPosition(cc.p(-size_notice.width*0.5+1,65));
            tab02Item.setScale(0.6);

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

            var tab03sprite = ButtoSpritenWithSpriteInner("#ui_panel_tabl_nor.png","#w_c_chat1.png",cc.p(0.5,0.5),0);
            var tab03sprite1 = ButtoSpritenWithSpriteInner("#ui_panel_tabl_sel.png","#w_c_chat2.png",cc.p(0.5,0.5),0);
            var tab03sprite2 =  ButtoSpritenWithSpriteInner("#ui_panel_tabl_sel.png","#w_c_chat2.png",cc.p(0.5,0.5),0);
            var tab03Item = cc.MenuItemSprite.create(
                tab03sprite,
                tab03sprite1,
                tab03sprite2,
                this.clickTab3,this);
            tab03Item.setAnchorPoint(cc.p(1,1));
            tab03Item.setPosition(cc.p(-size_notice.width*0.5-1,-65));
            tab03Item.setScale(0.6);
            tab03Item.setEnabled(false);
            this.mTab3Item = tab03Item

            var sendsprite = ButtonSpriteWithWordInner("#g_btn_blue.png",sResWord.w_send,cc.p(0.5,0.5),24,0);
            var sendsprite1 = ButtonSpriteWithWordInner("#g_btn_blue.png",sResWord.w_send,cc.p(0.5,0.5),24,1);
            var sendsprite2 =  ButtonSpriteWithWordInner("#g_btn_blue.png",sResWord.w_send,cc.p(0.5,0.5),24,0);
            var sendItem = cc.MenuItemSprite.create(
                sendsprite,
                sendsprite1,
                sendsprite2,
                this.clickSend,this);
            sendItem.setAnchorPoint(cc.p(0.5,0.5));
            sendItem.setPosition(cc.p(260,155));
            this.mSendItem = sendItem


            var menu = cc.Menu.create(tab01Item,tab02Item,tab03Item,sendItem);//tab2Item
            menu.x = 0;
            menu.y = 0;
            this.addChild(menu, 1);


            // top
            var size_nick_area = cc.size(500, 55);
            var s9sprite = cc.Scale9Sprite.create();
            s9sprite.initWithSpriteFrameName("chat_msg_bg.png");
            var aEditBox_search = null;
            if(sGameData.mCocosVerCode >=30100){
                aEditBox_search = new cc.EditBox(size_nick_area,s9sprite);
            }else{
                aEditBox_search = cc.EditBox.create(size_nick_area,s9sprite);
            }
            aEditBox_search.setInputMode(cc.EDITBOX_INPUT_MODE_SINGLELINE)
            aEditBox_search.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
            aEditBox_search.setAnchorPoint(cc.p(0.5,0.5));
            aEditBox_search.setPosition(cc.p(-75,155));
            aEditBox_search.setTag(7558);
            aEditBox_search.setString("");
            //aEditBox_search.setFontColor(cc.color(0,0,0));
            aEditBox_search.setFontSize(32);
            this.addChild(aEditBox_search,6);
            this.mEditbox_search = aEditBox_search;

            this.initShowMsgs();

            bRet = true;
        }
        return bRet;
    },
    clickTab2:function(){
        log("clickTab2")
        if(this.mGameType>0) {
            sGameData.mCurrLayer.op_showGameChatFace();
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
    },
    initShowMsgs:function(){
        var tsize = cc.size(645,295);
        var size_notice = cc.size(710,410);
        var point_msg_table = cc.p((-size_notice.width)/2+30,(-size_notice.height)/2+25);


        var size_inner = cc.size(645,296);
        var msgbgimg = createSysPanel_yellow(size_inner)
        msgbgimg.setAnchorPoint(cc.p(0,0));
        msgbgimg.setPosition(point_msg_table);
        this.addChild(msgbgimg);





        // CCScrollView
        var scrollview  = cc.ScrollView.create(tsize);
        var layer =  cc.Layer.create();//cc.LayerColor.create(cc.color(111,170,26,255));//
        var h = 15*30;
        layer.setContentSize(cc.size(tsize.width, h));

        var msglabel = cc.LabelTTF.create("abcdj", sGameData.mFontname, 24);
        msglabel.setAnchorPoint(cc.p(0,0));
        msglabel.setColor(cc.color(0,0,0));
        layer.addChild(msglabel,2);

        layer.setPosition(cc.p(0,0));
        scrollview.setPosition(point_msg_table);//CCPointZero
        scrollview.setContentOffset(cc.p(0,0));
        scrollview.setContentSize(cc.size(tsize.width, h));//设置内容的宽高
        scrollview.setViewSize(cc.size(tsize.width, tsize.height));//设置显示区域的宽高
        scrollview.setContainer(layer);
        scrollview.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
        scrollview.setTag(7777);
        scrollview.setDelegate(this);
        this.addChild(scrollview,3);
        this.mScrollView = scrollview;

        var scrollheight = this.mScrollView.getContentSize().height;
        var scrollViewHeight = tsize.height;
        if(scrollheight>scrollViewHeight){
            var barsize = cc.size(4,295);
            var scroolbar = ScrollBar.create(barsize);
            scroolbar.setPosition(cc.p(size_notice.width/2-11,size_notice.height*0.5-90));
            this.addChild(scroolbar,5,16888);
        }

        this.updateMsg();
    },
    //显示table的滚动条
    checkTableScrollBar:function(){
        var size = cc.director.getWinSize();
        var tsize = cc.size(850,325);
        if(this.mScrollView){
            var tableheight = this.mScrollView.getContentSize().height;
            var tableViewHeight = tsize.height
            var minOffset = tableViewHeight-tableheight;
            var value = 0;//(tableViewHeight/tableheight);
            value = (this.mScrollView.getContentOffset().y-minOffset)/(0-minOffset);
            var tableslider = this.getChildByTag(16888);
            if(tableslider){
                tableslider.setPercent(value);
            }
        }
    },


    clickSend:function(){
        log("clickSend")
        playClickSound();
        var value =this.mEditbox_search.getString();
        if(value.length >0){

            if(sGameData.mAppCanChat){
                var msg =  value;
                //type 1 常用聊天 2交互 3聊天 4私聊 5表情
                if(this.mGameType == 1) { //显示类型 1dzpk 2zjh 3dn 4ddz 5scmj 6gymj
                    sGameNetData.mDZPKNet.sendDZPKChat(3,0,msg,0);
                }else if(this.mGameType == 2) {
                    sGameNetData.mZJHNet.sendZJHChat(3,0,msg,0);
                }else if(this.mGameType == 3) {
                    sGameNetData.mDNNet.sendDNChat(3,0,msg,0);
                }else if(this.mGameType == 4) {
                    sGameData.mDDZLayer.sendChatCmd(3,0,msg,0);
                }else if(this.mGameType == 5) {
                    sGameNetData.mMJNet.sendMJChat(3,0,msg,0);
                }else if(this.mGameType == 6) {
                    sGameNetData.mGYMJNet.sendGYMJChat(3,0,msg,0);
                }else if(this.mGameType == 7) {
                    sGameNetData.mDDZMatchNet.sendDDZMatchChat(3,0,msg,0);
                }
            }

            this.mEditbox_search.setString("");
            this.setVisible(false);
        }
    },
    updateMsg:function(){
        log("updateMsg==");
        if(sGameData.mChatMsgList == null){
            sGameData.mChatMsgList = [];
        }
        var chats = sGameData.mChatMsgList;
        sGameData.mShowChatList = chats;
        this.setMsgList();
    },
    setMsgList:function(){
        var layer = this.mScrollView.getContainer();
        if(layer){
            layer.removeAllChildren();
            var h = 0;
            var len = sGameData.mShowChatList.length
            for(var i=len-1;i>=0;i--){
                var m = sGameData.mShowChatList[i]
                var item = ItemChatShow.create(m)
                item.setPosition(cc.p(0,h));
                layer.addChild(item);
                h += item.getContentSize().height;
            }
            this.mScrollView.setContentOffset(cc.p(0,0));
            this.mScrollView.setContentSize(cc.size(850,h));
        }
    },

    scrollViewDidScroll:function (view) {
        this.checkTableScrollBar();
    },
    scrollViewDidZoom:function (view) {
    }




});
GameChatInput.create = function (gametype) {
    var sg = new GameChatInput();
    if (sg) {
        sg.mGameType = gametype;
        sg.init()
        return sg;
    }
    return null;
};

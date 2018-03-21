/**
 * Created by Administrator on 14-5-30.
 */
//消息详情面板
var MsgInfoPanel = cc.Layer.extend({  //BaseGameLayer  cc.Layer
    mMsg:null,//消息
    mMsgLabel:null,//消息显示
    mAcceptBtn:null,//接受按钮
    mRejectBtn:null,//拒绝按钮
    mKitShows:[],//附件显示
    mKitBG:null,//附件背景
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();

            sGameData.mMsgInfoPanel = this;

            log("MsgInfoPanel start");



            var colorlayer = cc.LayerColor.create(cc.color(0,0,0,80))
            colorlayer.setPosition(cc.p(0,50))
            this.addChild(colorlayer);
            var size_panel = cc.size(800, 465); //800 463  680, 385
            var size_panel_inner = cc.size(796, 310);//650 230
            var point_btn_buycash = cc.p(0,-0.36);
            var point_panel_close = cc.p(4,-4);//边线的高度


            var  bgimg = createSysPanel(size_panel);
            bgimg.setPosition(cc.p(size.width/2,size.height/2));
            this.addChild(bgimg);
            this.setContentSize(bgimg.getContentSize());
            var csize = this.getContentSize();

            var innerimg = createSysPanel_yellow_zj(size_panel_inner);
            innerimg.setPosition(cc.p(size.width/2,size.height/2+20));
            this.addChild(innerimg);


            var tipLabel = cc.LabelTTF.create(sResWord.w_msg_info, sGameData.mFontname, 28,
                cc.size(500,40),  //设置文本的宽高
                cc.TEXT_ALIGNMENT_LEFT,
                cc.VERTICAL_TEXT_ALIGNMENT_CENTER);//垂直对齐
            tipLabel.setPosition(cc.p(size.width/2-innerimg.width/2+20,size.height/2+csize.height*0.42));
            tipLabel.setAnchorPoint(cc.p(0,0.5));
            this.addChild(tipLabel);


            var timeLabel = cc.LabelTTF.create("", sGameData.mFontname, 20);//
            timeLabel.setPosition(cc.p(size.width/2+innerimg.width/2-62,size.height/2+csize.height*0.42));
            timeLabel.setAnchorPoint(cc.p(1,0.5));
            this.addChild(timeLabel);
            timeLabel.setTag(8002);


            var tsize = cc.size(760,300);
            var point_msg_table = cc.p((size.width-size_panel_inner.width)/2+15,(size.height/2+20-size_panel_inner.height/2));

            // CCScrollView
            var scrollview  = cc.ScrollView.create(tsize);
            var layer = cc.Layer.create();
            var h = 15*30;

            layer.setPosition(cc.p(0,0));
            var blockSize = cc.size(740, 0);
            var msglabel = cc.LabelTTF.create("", sGameData.mFontname,24, blockSize, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_TOP);
            msglabel.attr({
                x :15,
                y : 0,
                anchorX:0,
                anchorY:0
            });
            layer.addChild(msglabel, 5);
            msglabel.setTag(8001);
            msglabel.setColor(cc.color(60,60,60));
            this.mMsgLabel = msglabel;
            var contentsize = msglabel.getContentSize();
            layer.setContentSize(contentsize);


            scrollview.setPosition(point_msg_table);//CCPointZero
            scrollview.setContentOffset(cc.p(0,0));
            scrollview.setContentSize(contentsize);//设置内容的宽高
            scrollview.setViewSize(cc.size(tsize.width, tsize.height));//设置显示区域的宽高
            scrollview.setContainer(layer);
            scrollview.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
            scrollview.setTag(7777);
            scrollview.setDelegate(this);
            this.addChild(scrollview,3);
            this.mScrollView = scrollview;

            var scrollheight = this.mScrollView.getContentSize().height;
            var scrollViewHeight = tsize.height;

            var barsize = cc.size(4,222);
            var scroolbar = ScrollBar.create(barsize);
            scroolbar.setPosition(cc.p(size.width/2+size_panel_inner.width/2,point_msg_table.y+tsize.height));
            this.addChild(scroolbar,5,16888);
            if(scrollheight>scrollViewHeight){
                scroolbar.setVisible(true)
            }else{
                scroolbar.setVisible(false)
            }


            //添加按钮 关闭
            var closesprite = cc.Sprite.create("#g_close_btn.png");
            var closesprite1 = cc.Sprite.create("#g_close_btn.png");
            var closesprite2 = cc.Sprite.create("#g_close_btn.png");
            closesprite1.setColor(cc.color(200, 200, 200));
            var closeItem = cc.MenuItemSprite.create(
                closesprite,
                closesprite1,
                closesprite2,
                this.clickToClose,this);
            closeItem.setAnchorPoint(cc.p(1,1));
            closeItem.setPosition(cc.p(size.width/2+csize.width/2-8,size.height/2+csize.height/2-6));



            var close1sprite = ButtonSpriteWithWordInner("#btn_blue_2.png",sResWord.w_close, cc.p(0.5,0.5), 32,0);
            var close1sprite1 = ButtonSpriteWithWordInner("#btn_blue_2.png",sResWord.w_close, cc.p(0.5,0.5), 32,1);
            var close1sprite2 = ButtonSpriteWithWordInner("#btn_blue_2.png",sResWord.w_close, cc.p(0.5,0.5), 32,0);

            var close1Item = cc.MenuItemSprite.create(
                close1sprite,
                close1sprite1,
                close1sprite2,
                this.clickToClose,this);
            close1Item.setPosition(cc.p(size.width/2+225,size.height/2+csize.height*point_btn_buycash.y));
            close1Item.setScale(0.6);

            var delsprite = ButtonSpriteWithWordInner("#btn_blue_2.png",sResWord.w_del, cc.p(0.5,0.5), 32,0);
            var delsprite1 = ButtonSpriteWithWordInner("#btn_blue_2.png",sResWord.w_del, cc.p(0.5,0.5), 32,1);
            var delsprite2 = ButtonSpriteWithWordInner("#btn_blue_2.png",sResWord.w_del, cc.p(0.5,0.5), 32,0);

            var delItem = cc.MenuItemSprite.create(
                delsprite,
                delsprite1,
                delsprite2,
                this.clickDel,this);
            delItem.setPosition(cc.p(size.width/2+75,size.height/2+csize.height*point_btn_buycash.y));
            delItem.setScale(0.6);

            var rejectsprite = ButtonSpriteWithWordInner("#btn_blue_2.png",sResWord.w_reject, cc.p(0.5,0.5), 32,0);
            var rejectsprite1 = ButtonSpriteWithWordInner("#btn_blue_2.png",sResWord.w_reject, cc.p(0.5,0.5), 32,1);
            var rejectsprite2 = ButtonSpriteWithWordInner("#btn_blue_2.png",sResWord.w_reject, cc.p(0.5,0.5), 32,0);
            var rejectItem = cc.MenuItemSprite.create(
                rejectsprite,
                rejectsprite1,
                rejectsprite2,
                this.clickReject,this);
            rejectItem.setPosition(cc.p(size.width/2-75,size.height/2+csize.height*point_btn_buycash.y));
            rejectItem.setScale(0.6);
            this.mRejectBtn = rejectItem;

            var acceptsprite = ButtonSpriteWithWordInner("#btn_blue_2.png",sResWord.w_agree, cc.p(0.5,0.5), 32,0);
            var acceptsprite1 = ButtonSpriteWithWordInner("#btn_blue_2.png",sResWord.w_agree, cc.p(0.5,0.5), 32,1);
            var acceptsprite2 = ButtonSpriteWithWordInner("#btn_blue_2.png",sResWord.w_agree, cc.p(0.5,0.5), 32,0);
            var acceptItem = cc.MenuItemSprite.create(
                acceptsprite,
                acceptsprite1,
                acceptsprite2,
                this.clickAccept,this);
            acceptItem.setPosition(cc.p(size.width/2-225,size.height/2+csize.height*point_btn_buycash.y));
            acceptItem.setScale(0.6);
            this.mAcceptBtn = acceptItem;



            var menu = cc.Menu.create(closeItem,close1Item,delItem,acceptItem,rejectItem);
            menu.x = 0;
            menu.y = 0;
            this.addChild(menu, 1);

            var kitbg = cc.Scale9Sprite.create();
            kitbg.initWithSpriteFrameName("mask.png");
            kitbg.setContentSize(cc.size(size_panel_inner.width,95));
            kitbg.attr({
                x: size.width/2,
                y: size.height/2-87
            });
            this.addChild(kitbg,1);

            //var kitbg = cc.Sprite.create("#topbar_bg.png")
            //this.addChild(kitbg,5)
            //kitbg.setScaleY(95/48)
            //kitbg.setScaleX(size_panel_inner.width/50)
            //kitbg.setPosition(cc.p(size.width/2,size.height/2-83));
            //kitbg.setVisible(false);
            this.mKitBG = kitbg

            this.mKitShows = [];
            for(var i=0;i<7;i++){
                var kitshow = KitShow.create();
                this.addChild(kitshow,5)
                var size = cc.director.getWinSize();
                kitshow.setPosition(cc.p(size.width/2-272+91*i,size.height/2-87));
                kitshow.setVisible(false);
                this.mKitShows.push(kitshow)
            }

            bRet = true;
        }
        return bRet;
    },
    //退出时执行
    onExit:function(){
        this._super();
        sGameData.mMsgInfoPanel = null;
    },
    //删除消息
    clickDel:function(){
        log("clickDel--")
        playClickSound();
        if(!sGameData.mIsSendingData) {
            sGameData.mIsSendingData = true
            sGameData.mGameNet.sendMsgDel(this.mMsg.id);
        }
        sGameData.mMsgLayer.showMsgInfo(false);
    },
    //接受附件
    clickAccept:function(){
        log("clickAccept--")
        playClickSound();
        if(!sGameData.mIsSendingData) {
            sGameData.mIsSendingData = true
            sGameData.mGameNet.sendUserMsgKitProc(this.mMsg.id, 1)
        }
    },
    //拒绝附件
    clickReject:function(){
        log("clickReject--")
        playClickSound();
        if(!sGameData.mIsSendingData) {
            sGameData.mIsSendingData = true
            sGameData.mGameNet.sendUserMsgKitProc(this.mMsg.id, 0)
        }
    },
    //关闭
    clickToClose:function(){
        log("clickToClose--")
        playClickSound();
        sGameData.mMsgLayer.showMsgInfo(false);
    },
    //设置消息
    setValue:function(aMsg){
        this.mMsg = aMsg;
        //log("new Msg = "+this.mMsg.id)
        if(this.mMsg.kits ==null){
            this.mMsg.kits = analyseKitData(this.mMsg.kitdata)
        }
        this.updateInfo();
    },
    //更新显示
    updateInfo:function(){
        if(this.mMsgLabel){
            this.mMsgLabel.setString(this.mMsg.content)
        }
        var timelabel = this.getChildByTag(8002)
        if(timelabel){
            var time1 = getLocalTime(this.mMsg.createTime);
            timelabel.setString(time1)
        }

        var kitheight = 0;
        if(this.mMsg.kits.length >0){
            kitheight = 95
            this.mKitBG.setVisible(true);
        }else{
            this.mKitBG.setVisible(false);
        }
        this.mMsgLabel.y = kitheight;
        var asize = this.mMsgLabel.getContentSize()
        var contentsize = cc.size(asize.width,asize.height+kitheight)
        var layer = this.mScrollView.getContainer()
        layer.setContentSize(contentsize);
        this.mScrollView.setContentSize(contentsize);
        var tsize = cc.size(760,300);
        this.mScrollView.setContentOffset(cc.p(0,tsize.height-contentsize.height));

        //普通消息 没附件 或者已经处理过的不显示
        if((this.mMsg.type != USER_MSG_INVITE_FRIEND&&this.mMsg.kits.length==0)||(this.mMsg.kitTime!=null&&this.mMsg.kitTime!=0)){
            this.mAcceptBtn.setVisible(false);
            this.mRejectBtn.setVisible(false);
        }else{
            this.mAcceptBtn.setVisible(true);
            this.mRejectBtn.setVisible(true);
        }
        if(this.mMsg.type == USER_MSG_INVITE_FRIEND){
            this.changeButtonWord(this.mAcceptBtn,sResWord.w_agree)
            this.changeButtonWord(this.mRejectBtn,sResWord.w_reject)
        }else{
            this.changeButtonWord(this.mAcceptBtn,sResWord.w_lingqu)
            this.changeButtonWord(this.mRejectBtn,sResWord.w_tuihui)
        }

        var showslen = this.mKitShows.length;
        for(var i=0;i<showslen;i++){
            var kitsshow = this.mKitShows[i];
            if(this.mMsg.kitTime==null||this.mMsg.kitTime==0){//没有处理的显示附件
                if(i<this.mMsg.kits.length){
                    var kit = this.mMsg.kits[i];
                    kitsshow.setKit(kit);
                    kitsshow.setVisible(true);
                }else{
                    kitsshow.setVisible(false);
                }
            }else{
                kitsshow.setVisible(false);
            }
        }


    },
    //滚动接口
    scrollViewDidScroll:function (view) {
        this.checkTableScrollBar();
    },
    scrollViewDidZoom:function (view) {
    },
    //显示table的滚动条
    checkTableScrollBar:function(){
        var size = cc.director.getWinSize();
        var tsize = cc.size(760,300);
        if(this.mScrollView){
            var tableheight = this.mScrollView.getContentSize().height;
            var tableViewHeight = tsize.height
            var minOffset = tableViewHeight-tableheight;
            var value = 0;//(tableViewHeight/tableheight);
            value = (this.mScrollView.getContentOffset().y-minOffset)/(0-minOffset);
            var tableslider = this.getChildByTag(16888);
            if(tableslider){
                if(tableheight>tableViewHeight){
                    tableslider.setVisible(true)
                }else{
                    tableslider.setVisible(false)
                }
                tableslider.setPercent(value);
            }
        }
    },
    //改变按钮状态 type 0 可用 1不可用
    changeButtonWord:function(btn,word){
        var buttonItem = btn;
        if(buttonItem){
            var normal = buttonItem.getNormalImage();
            if(normal){
                var title = normal.getChildByTag(8001);
                if(title){
                    title.setString(word);
                }
            }
            var sel = buttonItem.getSelectedImage();
            if(sel){
                var title = sel.getChildByTag(8001);
                if(title){
                    title.setString(word);
                }
            }
        }
    }



});

MsgInfoPanel.create = function () {
    var sg = new MsgInfoPanel();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};
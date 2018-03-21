/**
 * Created by Administrator on 14-4-24.
 */

var DDZMatchNoticeLayer = cc.Layer.extend({
    mIndex:0, //某位置
    mName:"",
    mMsg:"",
    mType:0, //0正常模式  3提示 确定 取消
    mFrom:0, //mType 3时有用  1退出提示
    mData:null,//传递来的数据
    mOkItem:null,
    mNoItem:null,
    _listener:null,
    mMsgLabel:null,
    init:function () {
        var bRet = false;
        if (this._super()) {
            var winsize = cc.director.getWinSize();

            var colorlayer = cc.LayerColor.create(cc.color(0,0,0,80))
            colorlayer.setPosition(cc.p(-winsize.width/2,-winsize.height/2));
            this.addChild(colorlayer);

            var size_notice = cc.size(556,336);
            var  bgimg = cc.Sprite.create("#match_notice_bg.png");

            this.addChild(bgimg);
            this.setContentSize(bgimg.getContentSize());
            var size = this.getContentSize();


            //提示
            this.mName = sResWord.w_notice;
            var pNameLabel = cc.LabelTTF.create(this.mName,sGameData.mFontname, 28,//字体  ，字体大小
                cc.size(430,35),  //设置文本的宽高
                cc.TEXT_ALIGNMENT_CENTER,//水平居右对齐
                cc.VERTICAL_TEXT_ALIGNMENT_CENTER);//垂直对齐
            pNameLabel.setPosition(cc.p(0,size.height*0.38-5));
            pNameLabel.setTag(8001);
            this.addChild(pNameLabel,1);

            var vsize = cc.size(550,188)
            var scrollview = cc.ScrollView.create(vsize);
            var layer = cc.Layer.create();

            //提示
            this.mMsg = "notice!!!";
            var pMsgLabel = cc.LabelTTF.create(this.mMsg,sGameData.mFontname, 24,//字体  ，字体大小
                cc.size(550,0),  //设置文本的宽高
                cc.TEXT_ALIGNMENT_CENTER,//水平居右对齐
                cc.VERTICAL_TEXT_ALIGNMENT_CENTER);//垂直对齐

            pMsgLabel.setTag(8002);
            pMsgLabel.setAnchorPoint(cc.p(0,1));
            layer.addChild(pMsgLabel,1);
            this.mMsgLabel = pMsgLabel;

            var csize = pMsgLabel.getContentSize();
            pMsgLabel.setPosition(cc.p(0,csize.height));
            layer.setContentSize(csize);
            scrollview.setContentSize(csize);
            scrollview.setViewSize(vsize);
            scrollview.setContainer(layer);
            scrollview.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
            scrollview.setDelegate(this);
            scrollview.setPosition(cc.p(-vsize.width/2,-98));

            this.addChild(scrollview,8);
            scrollview.setTag(7888)
            this.mScrollView = scrollview
            if(csize.height > 188){
                scrollview.setContentOffset(cc.p(0,188-csize.height));
            }else{
                scrollview.setContentOffset(cc.p(0,(188/2-csize.height/2)));
            }



            //添加 
            var okSprite = ButtonSpriteWithWordInner("#game_blueBtn.png",sResWord.w_ok,cc.p(0.5,0.5),28);
            var okSprite1 = ButtonSpriteWithWordInner("#game_blueBtn.png",sResWord.w_ok,cc.p(0.5,0.5),28,1);
            var okSprite2 = ButtonSpriteWithWordInner("#game_blueBtn.png",sResWord.w_ok,cc.p(0.5,0.5),28);
            var okItem = cc.MenuItemSprite.create(
                okSprite,
                okSprite1,
                okSprite2,
                this.clickOK,this);
            okItem.setPosition(cc.p(0, -size.height*0.3-25));//设定位置
            if(this.mType == 1){
                okItem.setVisible(false);
            }
            this.mOkItem = okItem

            //添加
            var cancelSprite = ButtonSpriteWithWordInner("#game_blueBtn.png",sResWord.w_no,cc.p(0.5,0.5),28);
            var cancelSprite1 = ButtonSpriteWithWordInner("#game_blueBtn.png",sResWord.w_no,cc.p(0.5,0.5),28,1);
            var cancelSprite2 = ButtonSpriteWithWordInner("#game_blueBtn.png",sResWord.w_no,cc.p(0.5,0.5),28);
            var cancelItem = cc.MenuItemSprite.create(
                cancelSprite,
                cancelSprite1,
                cancelSprite2,
                this.clickNO,this);
            cancelItem.setPosition(cc.p(size.width*0.2, -size.height*0.3-25));//设定位置
            cancelItem.setVisible(false);
            this.mNoItem = cancelItem

            var menu = cc.Menu.create(okItem,cancelItem);
            menu.x = 0;
            menu.y = 0;
            this.addChild(menu, 1);
            //xxx
            bRet = true;
        }
        return bRet;
    },
    onEnter:function(){
        this._super();
        log("on enter notice")

    },
    onExit:function(){

        this._super();
        log("on exit notice")
    },
    removeListeners:function(){
        //cc.eventManager.removeListener(this._listener);
        cc.eventManager.removeListeners(this);
    },

    onTouchBegan_g:function(pos){
        //log("onTouchBegan--")

    },
    onTouchMoved_g:function(pos){

    },
    onTouchEnded_g:function(pos){
        //log("onTouchEnded--")

    },



    /**
     * 显示通知
     * @param type 0普通 1 3提示 确定 取消
     * @param from type=3有效  1添加好友
     */
    showNotice:function(name,msg,type,from,data){
        this.mName = name;
        this.mMsg = msg;
        this.mType = type;
        this.mFrom = from;
        this.mData = data
        var pNameLabel = this.getChildByTag(8001);
        if(pNameLabel){
            pNameLabel.setString(this.mName);
        }
        var pMsgLabel = this.mMsgLabel;
        if(pMsgLabel){
            pMsgLabel.setString(this.mMsg);
            var csize = pMsgLabel.getContentSize();
            var layer = this.mScrollView.getContainer();
            layer.setContentSize(csize);
            this.mScrollView.setContentSize(csize);
            pMsgLabel.setPosition(cc.p(0,csize.height));
            if(csize.height > 188){
                this.mScrollView.setContentOffset(cc.p(0,188-csize.height));
            }else{
                //pMsgLabel.setPosition(cc.p(0,188/2+csize.height/2));
                this.mScrollView.setContentOffset(cc.p(0,(188/2-csize.height/2)));
            }
        }
        this.showButton();
        setClickSwallows(this);
    },

    clickOK:function(){
        log("clickOK--"+this.mType+"="+this.mFrom)
        playClickSound();
        this.setVisible(false);
        this.removeListeners();
        sGameData.mIsShowNoticeing = false;
        if(this.mType == 3){
            if(this.mFrom == 1){
                if(sGameData.mCurrLayer== sGameData.mDDZLayer){
                    sGameData.mDDZLayer.op_do_tuisai();
                }
            }
        }
    },
    clickNO:function(){
        log("clickNO--")
        playClickSound();
        this.setVisible(false);
        this.removeListeners();
        sGameData.mIsShowNoticeing = false;

    },
    showButton:function(){
        var size = this.getContentSize();
        if(this.mType == 1){
            this.mOkItem.setVisible(false);
        }else{
            this.mOkItem.setVisible(true);
            if(this.mType == 0||this.mType == 4||this.mType == 5){
                this.mOkItem.setPosition(cc.p(0, -size.height*0.3-25));//设定位置
            }else{
                this.mOkItem.setPosition(cc.p(-size.width*0.2, -size.height*0.3-25));//设定位置
            }
        }
        if(this.mType == 0||this.mType == 1||this.mType == 4||this.mType == 5){
            this.mNoItem.setVisible(false);
        }else{
            this.mNoItem.setVisible(true);
        }
    }

});
DDZMatchNoticeLayer.create = function () {
    var sg = new DDZMatchNoticeLayer();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

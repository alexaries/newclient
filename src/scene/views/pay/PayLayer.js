/**
 * Created by mac_apple on 16/2/19.   //lladd 
 */

var PayLayer = BasePanelLayer.extend({  //BaseGameLayer  cc.Layer
    mPanelNode:null,
    mEditBox_cash:null,
    mTopTab:null,
    mBottomTab:null,
    mQQButton:null,
    mJDButton:null,
    mYLButton:null,
    mZFBButton:null,
    mIconSprite:null,
    PayChannelButtons:[],
    mTip:null,
    init:function () {
        var bRet = false;
        if (this._super()) {
            sGameData.mPayLayer = this;
            sGameData.mCurrLayer = this;

            log("PayLayer start");

            sGameData.mUILayer.showView(1);

            var size = cc.director.getWinSize();
            var paneltopPosY = 150;
            var size_panel = cc.size(size.width*0.96,(size.height - paneltopPosY)*0.97);
            var size_panel_inner = cc.size(size.width*0.92,size_panel.height*0.85);
            var point_panel_close = cc.p(4,-4);//边线的高度
            var size_tab_size = cc.size(300,49);


            log("size_panel_inner=="+size_panel_inner.width+"|"+size_panel_inner.height);

            


            this.mTitle = sResWord.w_bank_savecash;
            this.mBottonBarSize = cc.size(size.width,60);
            this.mPanelInnerSize = cc.size(size.width-40,300);
            this.mTopShowType = 10; //0 显示title 1显示tab（title） 2子界面自己显示  ,,10 新topbg
            this.mBottomShowType = 4; //0显示半透明背景； 1显示(bar,content) 2单panel 3大小panel
            this.showBaseView();
            this.showCash();

            var csize = cc.size(size.width-20,size.height-92-20);

            var titleSprite = cc.Sprite.create("#w_title_pay.png");
            this.addChild(titleSprite,3);
            titleSprite.setPosition(cc.p(size.width/2,size.height-45));


            var panelnode = cc.Node.create();
            this.addChild(panelnode,5);
            panelnode.setPosition(cc.p(size.width/2,size.height/2-50));
            this.mPanelNode = panelnode;

            //840,440
            var panelsize = cc.size(800,417);
            var panelbg = createSysPanel_black(panelsize);
            this.mPanelNode.addChild(panelbg);
            //panelbg.setPosition(cc.p(size.width/2,size.height/2-50));

            var leftbg = cc.Sprite.create("#panel_cash_bg.png");
            this.mPanelNode.addChild(leftbg,1);
            leftbg.setPosition(cc.p(-240,0));



            //支付确认按钮
            var oksprite = cc.Sprite.create("#btn_p_pay.png")
            var oksprite1 = cc.Sprite.create("#btn_p_pay.png")
            oksprite1.setColor(cc.color(200,200,200));
            var oksprite2 = cc.Sprite.create("#btn_p_pay.png")
            var okItem = cc.MenuItemSprite.create(
                oksprite,
                oksprite1,
                oksprite2,
                this.clickStartPay,this);
            okItem.setAnchorPoint(cc.p(0.5,0.5));
            okItem.setPosition(cc.p(288,-150));



            //支付渠道按钮
            this.addPayChannelButton(sResWord.w_card_pay_btn_zfb,PAY_CHANNEL_ALIPAY,1);//支付宝
            this.addPayChannelButton(sResWord.w_card_pay_btn_wx,PAY_CHANNEL_WXPAY,0);
            this.addPayChannelButton(sResWord.w_card_pay_btn_qq,PAY_CHANNEL_QQ,0);//qq
            this.addPayChannelButton(sResWord.w_card_pay_btn_jd,PAY_CHANNEL_JD,0);//京东
            this.addPayChannelButton(sResWord.w_card_pay_btn_yl,PAY_CHANNEL_UPMP,0);//银联
            //this.addPayChannelButton(sResWord.w_card_pay_btn_yl1,PAY_CHANNEL_UPMP1,0);//银联1


            //充值金额输入框
            var inputsprite = cc.Sprite.create("#panel_cash_input_bg1.png")
            this.mPanelNode.addChild(inputsprite,2);
            inputsprite.setPosition(cc.p(160,-80));
            // top
            var size_nick_area = cc.size(240, 50);
            var s9sprite = createPanel(size_nick_area,"blank.png");

            var aEditBox_cash = null;
            if(sGameData.mCocosVerCode >=30100){
                aEditBox_cash = new cc.EditBox(size_nick_area,s9sprite);
            }else{
                aEditBox_cash = cc.EditBox.create(size_nick_area,s9sprite);
            }
            aEditBox_cash.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC)//EDITBOX_INPUT_MODE_SINGLELINE
            aEditBox_cash.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
            aEditBox_cash.setAnchorPoint(cc.p(0,0.5));
            aEditBox_cash.setPosition(cc.p(0,-80));
            aEditBox_cash.setMaxLength(12);
            //aEditBox_cash.setReturnType(kKeyboardReturnTypeDone);
            aEditBox_cash.setDelegate(this);
            aEditBox_cash.setTag(7558);
            aEditBox_cash.setString("");
            aEditBox_cash.setFontColor(cc.color(230,230,230));
            aEditBox_cash.setPlaceHolder(sResWord.w_pay_tip_paynum);
            aEditBox_cash.setPlaceholderFont(sGameData.mFontname,24);
            aEditBox_cash.setPlaceholderFontColor(cc.color(180,180,180));
            aEditBox_cash.setFontSize(32);
            this.mPanelNode.addChild(aEditBox_cash,15);
            this.mEditBox_cash = aEditBox_cash;

            //提现按钮
            var wordstr5 = sResWord.w_tihuo_btn_str;
            var tihuosprite = ButtonSpriteWithWordInner("#task_t_bg.png",wordstr5,cc.p(0.5,0.5),24,3,cc.color(253,166,43));
            var tihuosprite1 = ButtonSpriteWithWordInner("#task_t_bg.png",wordstr5,cc.p(0.5,0.5),24,1,cc.color(253,166,43));
            var tihuosprite2 = ButtonSpriteWithWordInner("#task_t_bg.png",wordstr5,cc.p(0.5,0.5),24,3,cc.color(253,166,43));

            var tihuoItem = cc.MenuItemSprite.create(
                tihuosprite,
                tihuosprite1,
                tihuosprite2,
                this.showDelivery,this);
            tihuoItem.setAnchorPoint(cc.p(0.5,0.5));
            tihuoItem.setPosition(cc.p(-238,-165));
            tihuoItem.setVisible(0);
            tihuoItem.setScale(1.1);

            //添加按钮到菜单
            if(sGameData.mAppUseJiaDuoPay){
                 // var menu = cc.Menu.create(okItem,tihuoItem);
                 log("暂时无api支付渠道");
            }else{
                 var menu = cc.Menu.create(okItem,tihuoItem);
                 for(var i = 0 ;i<this.PayChannelButtons.length;i++){
                    menu.addChild(this.PayChannelButtons[i]);
                 }
            }
            menu.x = 0;
            menu.y = 0;
            this.mPanelNode.addChild(menu, 10);

            this.showLeftView();
            // this.showRightView();

            bRet = true;
        }
        return bRet;
    },


    onExit:function(){
        this._super();
        sGameData.mPayLayer = null;

    },
    showLeftView:function(){

        var tiplabel = cc.LabelTTF.create(sResWord.w_pay_curruser, sGameData.mFontname, 24);
        tiplabel.attr({
            x:-238,
            y:140,
            anchorX: 0.5,
            anchorY: 0.5
        });
        this.mPanelNode.addChild(tiplabel,10);
        tiplabel.setColor(cc.color(60,60,60));


        var cashbg = cc.Sprite.create("#panel_cash_input_bg.png")
        this.mPanelNode.addChild(cashbg,5);
        cashbg.setPosition(cc.p(-238,70));

        //var headbg = cc.Sprite.create("#headbg_s.png")
        //this.mPanelNode.addChild(headbg,5);
        //headbg.setPosition(cc.p(-329,70));
        //headbg.setScale(1.2);

        //var avatarimg = cc.Sprite.create("#main_player_avatar.png");
        //avatarimg.attr({
        //    x:-329,
        //    y:20
        //});
        //this.mPanelNode.addChild(avatarimg,8);
        //avatarimg.setTag(9900);
        //avatarimg.setScaleX(40/avatarimg.width);
        //avatarimg.setScaleY(40/avatarimg.height);


        var head = BaseCircleHead.create(26);
        head.attr({
            x:-329,
            y:70
        });
        this.mPanelNode.addChild(head,8);


        var userstr = "ID : "+sGameData.mUser.id;
        var cashlabel = cc.LabelTTF.create(userstr, sGameData.mFontname, 24);
        cashlabel.attr({
            x:-218,
            y:70,
            anchorX: 0.5,
            anchorY: 0.5
        });
        this.mPanelNode.addChild(cashlabel,10);
        cashlabel.setColor(cc.color(60,60,60));



        var tip0label = cc.LabelTTF.create(sResWord.w_notice+":", sGameData.mFontname, 20);
        tip0label.attr({
            x:-362,
            y:-40 + 30,
            anchorX: 0,
            anchorY: 0.5
        });
        this.mPanelNode.addChild(tip0label,10);
        tip0label.setColor(cc.color(60,60,60));

        var tip1label = cc.LabelTTF.create(sResWord.w_pay_alipay_tip, sGameData.mFontname, 20,//字体  ，字体大小
            cc.size(255,0),  //设置文本的宽高
            cc.TEXT_ALIGNMENT_LEFT,//水平居右对齐
            cc.VERTICAL_TEXT_ALIGNMENT_TOP);
        tip1label.attr({
            x:-238,
            y:-60 + 30,
            anchorX: 0.5,
            anchorY: 1
        });
        this.mPanelNode.addChild(tip1label,10);
        tip1label.setColor(cc.color(60,60,60));
        this.mTip = tip1label
        //this.loadImg();

    },
    
    //添加支付渠道按钮
    /*
    * wordstr 按钮文字
    * PayChannel 渠道常量
    * isdefault 是否默认按钮（后面的默认会覆盖前面的默认值）默认为否
    * canuse 是否可以用 默认1
    * callback 默认clickPayChannelButton
    */
    addPayChannelButton:function(wordstr,channel,isdefault,canuse,callback){
            //默认参数
            if(!wordstr){
                log("按钮名字不能为空");
            }
            if(!channel){
                log("渠道号不能为空");
            }
            canuse = canuse||1;
            isdefault =isdefault||0;
            callback=callback||this.clickPayChannelButton;
            log(canuse);
            log(isdefault);
            log(callback);
            
            //设置按钮样式
            var cardPaysprite = ButtonSpriteWithWordInner("#task_t_bg.png",wordstr,cc.p(0.5,0.5),24,3,cc.color(253,166,43));
            var cardPaysprite1 = ButtonSpriteWithWordInner("#task_t_bg.png",wordstr,cc.p(0.5,0.5),24,1,cc.color(253,200,160));
            var cardPaysprite2 = ButtonSpriteWithWordInner("#task_t_bg.png",wordstr,cc.p(0.5,0.5),24,2,cc.color(253,166,43));

            var ChannelButton = cc.MenuItemSprite.create(
                cardPaysprite,
                cardPaysprite1,
                cardPaysprite2,
                callback,this);
            ChannelButton.setAnchorPoint(cc.p(0.5,0.5));
            ChannelButton.setTag(channel);
            //设置按钮位置
            var len = this.PayChannelButtons.length+1;
            if(len%2){
                var x=60;
            }else{
                var x=260;
            }
            var y = 190-(Math.ceil(len/2)*60);
            ChannelButton.setPosition(cc.p(x,y));

            //判断按钮是否可用
            if(!canuse){
                ChannelButton.setEnabled(false);
                this.PayChannelButtons.push(ChannelButton);//添加到支付按钮列表
                return;
            }
            //判单是否默认按钮改变样式
            if(isdefault){
                //去掉其他按钮到选中样式
                for(var i=0;i<this.PayChannelButtons.length;i++){
                    this.PayChannelButtons[i].setScale(1);
                    this.PayChannelButtons[i].unselected();
                }
                //添加按钮到选中样式
                ChannelButton.setScale(1.2);
                ChannelButton.selected();
                //修改渠道选中值
                sGameData.mCurrPayType = channel;
            }else{
                ChannelButton.setScale(1);
            }
            this.PayChannelButtons.push(ChannelButton);//添加到支付按钮列表
    },

    //支付按钮点击事件
    clickPayChannelButton:function(ChannelButton){
        log("click");
        if(!checkButtonEnable()){
            return;
        }
        playClickSound();
        var Channel = ChannelButton.getTag();
        sGameData.mCurrPayType = Channel;
         if(sGameData.mCurrPayType == PAY_CHANNEL_WXPAY) {
         var mTipstr = sResWord.w_pay_wx_tip;
         }else if(sGameData.mCurrPayType == PAY_CHANNEL_QQ){
         var mTipstr = sResWord.w_pay_qq_tip;
         }else if(sGameData.mCurrPayType == PAY_CHANNEL_ALIPAY){
         var mTipstr = sResWord.w_pay_alipay_tip;
         }else if(sGameData.mCurrPayType == PAY_CHANNEL_UPMP){
         var mTipstr = sResWord.w_pay_yl_tip;
         }else if(sGameData.mCurrPayType == PAY_CHANNEL_UPMP1){
         var mTipstr = sResWord.w_pay_yl1_tip;
         }else if(sGameData.mCurrPayType == PAY_CHANNEL_JD){
         var mTipstr = sResWord.w_pay_jd_tip;
         }
        this.mTip.setString(mTipstr);
        for(var i=0;i<this.PayChannelButtons.length;i++){
            this.PayChannelButtons[i].unselected();
            this.PayChannelButtons[i].setScale(1);
        }
        ChannelButton.selected();
        ChannelButton.setScale(1.2)
        log(sGameData.mCurrPayType);
    },

 
    clickStartPay:function(){
        if(!checkButtonEnable()){
            return;
        }
        playClickSound();
        if(!sGameData.mCurrPayType){
            showLittleNotice(sResWord.w_tip_input_check_paytype);
            return;
        }

        var cashnum = this.mEditBox_cash.getString();
        if(cashnum!=null&& cashnum.length > 0 && checkNumber(cashnum)&&Number(cashnum)>=10) {
        //if(cashnum!=null&& cashnum.length > 0) {
                                    
            //showLittleNotice(sResWord.w_notopen);

            //add by tony 添加佳都支付
            if(sGameData.mAppUseJiaDuoPay && sGameData.mCurrPayType == PAY_CHANNEL_ALIPAY){
                                  log("sGameData mAppUseJiaDuoPay");
                var data = {};
                var currentTime = new Date().format("yyyyMMddhhmmss");
                var paramsObj={};
                paramsObj.apiName = encodeURIComponent("api_union_000017");
                //paramsObj.merId = encodeURIComponent("PAYSID90000000008");
                paramsObj.merId = encodeURIComponent("PAYSID10000000001");
                paramsObj.accountNo = encodeURIComponent(sGameData.mUser.id + "");
                paramsObj.actionFlag = encodeURIComponent("01");
                paramsObj.txnTime = encodeURIComponent(currentTime);
                paramsObj.orderId = encodeURIComponent(currentTime+sGameData.mUser.id);
                paramsObj.goodsName = encodeURIComponent("recharge");
                paramsObj.txnAmt = encodeURIComponent((cashnum*100)+"");
                //paramsObj.txnAmt = encodeURIComponent(10+"");
                paramsObj.channelNo = encodeURIComponent("02");
                paramsObj.merType = encodeURIComponent("1");
                paramsObj.remarkUrl = encodeURIComponent("http://qppay.1000gk.com:80/wap/payReturn.go");
                //paramsObj.key="857e6g8y51b5k365f7v954s50u24h14w";

                paramsObj.key="997j6g8u52b0j365g6v954w51u24h14y";

                var pArr = ["apiName","merId","accountNo","actionFlag","txnTime","orderId","goodsName","txnAmt","channelNo","merType","remarkUrl"];

                var paramsKeys = pArr.sort();

                var aparams = "";
                for(var i = 0;i< paramsKeys.length; i++){
                    aparams = aparams + paramsKeys[i] + "=" + paramsObj[paramsKeys[i]] + "&";
                }
                aparams = aparams + "key="+paramsObj.key;

                var signStr = sha256_digest(aparams);

                //发送时不用编码
                var paramsObj2={};
                paramsObj2.apiName = "api_union_000017";

                paramsObj2.merId = "PAYSID10000000001";
                paramsObj2.accountNo = sGameData.mUser.id + "";
                paramsObj2.actionFlag = "01";
                paramsObj2.txnTime = currentTime;
                paramsObj2.orderId =currentTime+sGameData.mUser.id;
                paramsObj2.goodsName = "recharge";
                paramsObj2.txnAmt = (cashnum*100)+"";
                //paramsObj2.txnAmt = 10+"";
                paramsObj2.channelNo = "02";
                paramsObj2.merType = "1";
                paramsObj2.remarkUrl = "http://qppay.1000gk.com:80/wap/payReturn.go";
                //paramsObj2.key="857e6g8y51b5k365f7v954s50u24h14w";
                paramsObj2.key="997j6g8u52b0j365g6v954w51u24h14y";

                var aparams2 = "";
                for(var i = 0;i< paramsKeys.length; i++){
                    aparams2 = aparams2 + paramsKeys[i] + "=" + paramsObj2[paramsKeys[i]] + "&";
                }
                aparams2 = aparams2 + "key="+paramsObj.key;

                var parmasCpp = aparams2+"&"+"sign="+signStr;

                CallCpp.doSomeString(17,"jiaDuALiPay",sGameData.mJiaDuZhiFuUrl,"post",parmasCpp,"");

                showPayWait(true);
                return;
            }else if(sGameData.mAppUseJiaDuoPay && sGameData.mCurrPayType == PAY_CHANNEL_WXPAY){
                var data = {};
                var currentTime = new Date().format("yyyyMMddhhmmss");
                var paramsObj={};
                paramsObj.apiName = encodeURIComponent("api_union_000015");
                paramsObj.merId = encodeURIComponent("PAYSID10000000001");
                paramsObj.channelNo = encodeURIComponent("01");
                paramsObj.accountNo = encodeURIComponent("1234567890");
                paramsObj.actionFlag = encodeURIComponent("01");
                paramsObj.txnTime = encodeURIComponent(currentTime);
                paramsObj.orderId = encodeURIComponent(currentTime+sGameData.mUser.id);
                paramsObj.goodsName = encodeURIComponent("abc");
                paramsObj.txnAmt = encodeURIComponent((cashnum*100)+"");
                //paramsObj.txnAmt = encodeURIComponent(10+"");
                paramsObj.merType = encodeURIComponent("1");
                paramsObj.remarkUrl = encodeURIComponent("http://qppay.1000gk.com:80/wap/payReturn.go");
                paramsObj.key="997j6g8u52b0j365g6v954w51u24h14y";

                var pArr = ["apiName","merId","accountNo","actionFlag","txnTime","orderId","goodsName","txnAmt","merType","remarkUrl","channelNo"];

                var paramsKeys = pArr.sort();

                var aparams = "";
                for(var i = 0;i< paramsKeys.length; i++){
                    aparams = aparams + paramsKeys[i] + "=" + paramsObj[paramsKeys[i]] + "&";
                }
                aparams = aparams + "key="+paramsObj.key;

                var signStr = sha256_digest(aparams);

                //发送时不用编码
                var paramsObj2={};
                paramsObj2.apiName = "api_union_000015";
                paramsObj2.merId = "PAYSID10000000001";
                paramsObj2.accountNo = "1234567890";
                paramsObj2.actionFlag = "01";
                paramsObj2.txnTime = currentTime;
                paramsObj2.orderId =currentTime+sGameData.mUser.id;
                paramsObj2.goodsName = "abc";
                paramsObj2.txnAmt = (cashnum*100)+"",
                //paramsObj2.txnAmt = 10+"",
                    paramsObj2.channelNo = "01";
                paramsObj2.merType = "1";
                paramsObj2.remarkUrl = "http://qppay.1000gk.com:80/wap/payReturn.go";
                paramsObj2.key="997j6g8u52b0j365g6v954w51u24h14y";

                var aparams2 = "";
                for(var i = 0;i< paramsKeys.length; i++){
                    aparams2 = aparams2 + paramsKeys[i] + "=" + paramsObj2[paramsKeys[i]] + "&";
                }
                aparams2 = aparams2 + "key="+paramsObj2.key;

                var parmasCpp = aparams2+"&"+"sign="+signStr;

                CallCpp.doSomeString(17,"jiaDuWXPay",sGameData.mJiaDuZhiFuUrl,"post",parmasCpp,"");

                showPayWait(true);
                return;
            }
            //end



            if(sGameData.mAppUsejubaoSdkPay){
                var remark = sGameData.mUser.id + "_1_0";
                CallCpp.doSomeString(501,cashnum + "","金币充值",remark);
                                     return;
            }
                                     
            //html5 支付
            if(sGameData.mAppUseH5Pay){
                var data = {};
                data.userId = sGameData.mUser.id
                data.payAmount = cashnum*100
                if(sGameData.mCurrPayType == PAY_CHANNEL_WXPAY) {
                    data.payType = "weixin";
                }else if(sGameData.mCurrPayType == PAY_CHANNEL_QQ){
                        data.payType = "qqh5";
                }else if(sGameData.mCurrPayType == PAY_CHANNEL_ALIPAY){
                    data.payType = "alipay";
                }else if(sGameData.mCurrPayType == PAY_CHANNEL_UPMP){
                    data.payType = "ylh5";
                 }else if(sGameData.mCurrPayType == PAY_CHANNEL_UPMP1){
                 data.payType = "ylh5_1";
                 }else if(sGameData.mCurrPayType == PAY_CHANNEL_JD){
                    data.payType = "jdh5";
                }
                showWebviewFullScreen(88,data);
                return;
            }

            var aliUseType = 1;// 1只使用支付宝 2只使用汇付宝 3同时使用2个
            var taliUseType = Number(getGameSysConfig("alipay_use_type"));
            if(taliUseType > 0){
                aliUseType = taliUseType;
            }

            var rand = randomInt(100);
            var useAli = false;
            if(rand%2 ==0){
                useAli = true;
            }
            if(aliUseType == 1){
                useAli = true;
            }else if(aliUseType == 2){
                useAli = false;
            }

            log("sGameData.mCurrPayType=="+sGameData.mCurrPayType+"|||useAli="+useAli)
            if(sGameData.mCurrPayType == PAY_CHANNEL_ALIPAY&&useAli){
                //支付宝 单独处理
                var payagent = PAY_ALIPAY
                var paychannelID = PAY_CHANNEL_ALIPAY;
                sGameData.mGameNet.sendReqPayV2(paychannelID,cashnum);
                showLittleNotice(sResWord.w_tip_pay_waiting,0,3);
            }else{
                var payagent = PAY_HEEPAY
                var paychannelID = getPayChannelId(payagent);
                sGameData.mPayAgent = payagent;
                var paytype = 22;
                if(sGameData.mCurrPayType == PAY_CHANNEL_WXPAY){
                    paytype = 30;
                }
                sGameData.mGameNet.sendReqHeePay(paytype,cashnum*100);
                showLittleNotice(sResWord.w_tip_pay_waiting,0,3);
            }
        }else{
            showLittleNotice(sResWord.w_tip_input_check_paynum);
        }


    },
                                     
    clickCardPay:function(){
        sGameData.mCurrPayType = PAY_CHANNEL_QQ;
        if(!checkButtonEnable()){
            return;
        }
        playClickSound();
        this.mTopTab.unselected();
        this.mBottomTab.unselected();
        this.mQQButton.setScale(1.5);
           //var data = {};
           //data.userId = sGameData.mUser.id;
           //showWebviewFullScreen(89,data);
    },

    showDelivery:function(state){
        var setl = this.getChildByTag(6666);
        if(!setl){
            setl = DeliveryPanel.create();
            if(setl){
                this.addChild(setl,50,6666);
                setl.setPosition(cc.p(0,-50));
            }
        }
        if(setl){
            setl.setVisible(state);
            if(state){
                setl.startShow();
            }else{
                setl.stopShow();
            }
        }
    },
                                    
    updateCashInfo:function(){

        this.mSoftcashshow.setValue(3,formatcash(sGameData.mUser.softCash),1,1);

    }




});

PayLayer.create = function () {
    var sg = new PayLayer();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

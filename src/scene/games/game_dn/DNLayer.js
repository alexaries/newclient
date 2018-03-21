/**
 * Created by Administrator on 14-5-16.
 * 斗牛
 */

var DNLayer = BaseGameLayer.extend({  //BaseGameLayer  cc.Layer

    //所有保存数据的用chair来保存 --（牌值数据，坐下，投注，牌型）
    mMyState:0,//我的状态 0未坐下 1已坐下
    mMyChairId:-1,//我的椅子号

    mPGameStateChair:[],//是否分牌 0 1
    mCardTypesChair: [0,0,0,0,0,0],//牌型
    mPlayerBetValueChair: [0,0,0,0,0,0],//各家投注值

    mPlayerCardValueArrayChair:[],//各家牌值

    mPlayerFenCardValueArray:[],//自己分牌 结果

    mMeHasFenpai:false,//我是否分牌

    mHasUseTool:false,
    mIsFenpaiing:false,//正在分牌

    mHasInitGameState:false,//是否已经初始化游戏状态

    mPlayerCardShowArray:[],//各家牌 显示集合
    mBetNumShowsArray:[],//投注值显示
    mChairShowArray:[],//椅子显示

    mQiangzChair:[0,0,0,0,0],//是否抢庄
    mHasQiangz:false,//是否已抢庄

    mTempCoinsArray:[],//临时筹码显示集合
    mScoreData:[],//得分数据

    mMinBet:10,//最小下注
    mZhuangNeedBei:200,//抢庄需要的最小投注倍数 15*4*3 4*5*10

    mZhuangChairId:0,//庄椅子号
    mZhuangSeatId:0,//庄座位号

    mFapaiChair: 0,//发牌座位号
    mFapaiNum: 0,//发牌张数  0-4
    mHasShowTishi:false,//本局游戏是否进行了提示
    mHasNiu : false,//本局游戏是否有牛

    mMaxBetMultiple: 1,//允许最大投注倍数
    mBetValueArray :[1,2,5,8,10,15],//投注倍数,4,5

    mShowingTopMenu:false,//是否在显示topmenu

    mShowZhuangImg:false,//是否显示 庄家 图片
    mShowBetTipImg:false,//是否显示 下注提示图片
    mHasQiz:false,//是否已经弃庄
    mOtherInGame:false,//别人在游戏中
    mIsShowQiangzBtn:false,//是否在显示抢庄按钮
    mIsShowBetBtn:false,//是否在显示投注按钮
    mIsShowPlayBtn:false,//是否在显示分牌按钮
    mIsShowGoonBtn:false,//是否在显示继续按钮

    mCardTypeView:null, // 牌形显示
    mTopMenuView:null,//  topmenu
    mSettingView:null,//    设置
    mShowOPView:null,////显示操作
    mShowTipView:null,//提示 请下注 等待闲家下注 3准备 4抢庄 等
    mShowClock:null,//时钟
    mShowOpTalkView:null,//说 操作
    mBetBtnBg:null,// 投注按钮背景
    mBetMenu:null,//投注按钮
    mShowCalculate:null,//显示记点器
    mShowQiangzView:null,//显示抢庄标示 （一闪一闪）
    mZhuangSprite:null,//庄图片
    mShowWinLose:null,//显示输赢
    mShowMaskView:null,//遮罩
    mMissionView:null,//任务
    mBasePointView:null,//单注显示
    mShowTalkView:null,// 选择聊天语句界面
    mChatFaceView:null,//表情选择
    mChatInputView:null,//输入聊天
    mShowFace:null,//显示表情
    mChatView:null,//显示 聊天

    mMeokSprite:null,


    mDNLogic:null,//逻辑

    mOPMenu:null,//操作按钮

    mIsCheckCanChangeTableing:false,//要是1个人在桌子上10s 显示换桌
    mStartTimeCheckCanChangeTable:0,//


    //按钮tag
    ButtonID_FENPAi:10001,//分牌
    ButtonID_WUNIU:10002,//分牌



    ButtonID_QIANGZ:10003,//抢庄
    ButtonID_BUQIANG:10004,//不抢

    ButtonID_QIANGZ_1_BEI:50001,//抢庄1倍
    ButtonID_QIANGZ_2_BEI:50002,//抢庄2倍
    ButtonID_QIANGZ_4_BEI:50003,//抢庄4倍

    ButtonID_QIZ:10005,//弃庄

    ButtonID_SUANPAI:10007,//算牌

    ButtonID_JX:10016,//继续
    ButtonID_FH:10017,//返回
    ButtonID_HZ:10025,//换桌

    ButtonID_Bet1:20001,
    ButtonID_Bet2:20002,
    ButtonID_Bet3:20003,
    ButtonID_Bet4: 20004,
    ButtonID_Bet5: 20005,
    ButtonID_Bet6: 20006,

    ButtonID_MISSION: 40002,
    ButtonID_CHAT: 40001,
    ButtonID_FACE: 40003,

    self :null,
    //初始化
    init:function () {
        var bRet = false;
        if (this._super()) {

            sGameData.mDNLayer = this;
            sGameData.mCurrLayer = this;
            cc.log("DNLayer start");

            this.mSitDownNoWait = true;//是否直接坐下
            this.MAX_PLAYERNUM = 5;// 设置游戏的最大玩家数

            self =this;
            bRet = true;
        }
        return bRet;
    },
    onEnter:function(){
        this._super();
        this.scheduleOnce(this.initInSecondFrame,0.05);
    },
    //退出时执行
    onExit:function(){
        this._super();
        this.removeListeners();
        sGameData.mDNLayer = null;
    },
    //移出监听
    removeListeners:function(){
        if( 'touches' in cc.sys.capabilities ){
            cc.eventManager.removeListeners(this);
        }else if ('mouse' in cc.sys.capabilities ){
            cc.eventManager.removeListeners(this);
        }
    },
    //更新 时钟
    update:function(){
        if(this.mIsCheckCanChangeTableing){
            var now = (new Date()).getTime();
            if(now - this.mStartTimeCheckCanChangeTable > sGameData.mShowChangeTableBtnTime * 1000){
                this.mIsCheckCanChangeTableing = false;
                if(this.mPlayerList.length == 1){
                    this.VisibleChangeTableButton(true);
                }
            }
        }

    },
    //第2帧初始化
    initInSecondFrame:function(){
        var size = cc.director.getWinSize();

        if(sGameData.operateTimeVector == null){
            sGameData.operateTimeVector = setOperateTimeArr(cc.p(-3,-3),cc.p(120+3,168+3),6,10);
            cc.log("v.length=="+sGameData.operateTimeVector.length)
        }
        if(sGameData.mCurrTable!=null){
            this.mMinBet = sGameData.mCurrTable.minBet;
        }else{
            cc.log("error:no mCurrTable info");
        }

        this.mOPBtnSize = cc.size(120,50);

        for(var i = 0;i<this.MAX_PLAYERNUM;i++){
            this.mChairSitDown[i] = 0;
        }
        this.mPlayerList = [];

        this.mDNLogic = new DNLogic();
        this.mDNLogic.init();

        //ui 按钮
        var gameui = DNGameUI.create();
        this.addChild(gameui,55);
        this.mGameUI = gameui;

        //牌类型
        var showCardView = DNShowCardType.create();
        this.addChild(showCardView,58);
        this.mCardTypeView = showCardView
        //操作显示
        var showop = DNShowOP.create();
        this.addChild(showop,80);
        this.mShowOPView = showop
        //提示
        var showtip = DNShowTip.create();
        showtip.setPosition(cc.p(size.width / 2,size.height / 2));
        this.addChild(showtip,40);
        this.mShowTipView = showtip
        //显示单注
        var showbasepoint = DNShowBasePoint.create();
        showbasepoint.setPosition(cc.p(size.width/2,size.height*0.90-33));
        this.addChild(showbasepoint,1);
        this.mBasePointView = showbasepoint;
        //得分
        var showScore = DNScore.create();
        this.addChild(showScore,60);
        showScore.setVisible(false);
        this.mScoreView = showScore;
        //操作显示聊天形式
        var showOpTalk = DNShowOpTalk.create();
        this.addChild(showOpTalk,40);
        //showOpTalk.setVisible(false);
        this.mShowOpTalkView = showOpTalk

        //遮罩 得分时显示
        var colorlayer = cc.LayerColor.create(cc.color(0,0,0,80))
        this.addChild(colorlayer,50);
        this.mShowMaskView = colorlayer;
        colorlayer.setVisible(false);

        //投注背景
        var tbgSprite = cc.Sprite.create("#dn_multipleBar.png");
        this.addChild(tbgSprite,55);
        tbgSprite.setPosition(cc.p(size.width*0.5,300));
        this.mBetBtnBg = tbgSprite;
        tbgSprite.setOpacity(180);
        tbgSprite.setVisible(false);

        //算牌器
        var showcalculate = DNNiuCalculate.create();
        this.addChild(showcalculate,58);
        showcalculate.setPosition(cc.p(size.width*0.5,286));
        this.mShowCalculate = showcalculate;
        showcalculate.setVisible(false);

        //要抢庄动画显示
        var showqiangz = DNShowQiangz.create();
        this.addChild(showqiangz,35);
        this.mShowQiangzView = showqiangz;
        //时钟
        var clock = DNClock.create();
        clock.x = size.width / 2;
        clock.y = size.height / 2+140;
        this.addChild(clock,48);
        clock.setVisible(false);
        this.mShowClock = clock;
        //设置
        var setting =GameSetting.create();
        setting.x = size.width / 2;
        setting.y = size.height / 2;
        this.addChild(setting,155);
        setting.setVisible(false);
        this.mSettingView = setting;

        //选择聊天语句
        var talk = GameChatMsg.create(3);
        talk.x = size.width / 2;
        talk.y = size.height / 2;
        this.addChild(talk,200);
        talk.setVisible(false);
        this.mShowTalkView = talk;

        //选择聊天语句
        var face = GameChatFace.create(3);
        face.x = size.width / 2;
        face.y = size.height / 2;
        this.addChild(face,200);
        face.setVisible(false);
        this.mChatFaceView = face;

        var chatinput = GameChatInput.create(3);
        chatinput.x = size.width / 2;
        chatinput.y = size.height / 2;
        this.addChild(chatinput,200);
        chatinput.setVisible(false);
        this.mChatInputView = chatinput;

        //显示表情
        var showface = GameShowChatFace.create(3);
        this.addChild(showface,93);
        this.mShowFace = showface;

        //显示聊天语句
        var chat = GameShowChatMsg.create(3);
        this.addChild(chat,95);
        this.mChatView = chat;
        //庄
        var zhuangSprite = cc.Sprite.create("#dn_bank.png")
        zhuangSprite.setPosition(cc.p(size.width*0.5,300));
        this.addChild(zhuangSprite,30);
        this.mZhuangSprite = zhuangSprite;
        zhuangSprite.setVisible(false);
        //显示输赢
        var showwinlose = DNShowWinLose.create();
        this.addChild(showwinlose,58);
        this.mShowWinLose = showwinlose;
        showwinlose.setVisible(false);

        //我点继续后
        var meokSprite = cc.Sprite.create(res.g_ok_png);
        meokSprite.setPosition(cc.p(size.width / 2 +85, 315));
        this.addChild(meokSprite,65);
        meokSprite.setVisible(false);
        this.mMeokSprite = meokSprite


        //斗牛进去 把之前存的指令丢掉
        sGameData.mDNGameScene.cleanCommands();
        this.mShowTipView.showTip(8);

        this.initButtons();

        dealClickTouch(this);
        this.initGameData();

        this.initTables();
        if(sGameData.mIsTestNoNet){
            this.initTestData();
        }

        showUILoadWait(false);

        //进入游戏前，发的进入桌子指令
        if(sGameData.mEnterTableData&&sGameData.mEnterTableData.length>0) {
            this.handleEnterTableData();
            this.initGameScene();
            sGameData.mEnterTableData = null;
            sGameData.mGameNet.sendReqPropsNum(BOTS_PROPS);
        }
        this.playBGMusic();

        this.mHasInitView = true;
    },
    handleEnterTableDataInGame:function(){
        cc.log("--handleEnterTableDataInGame==="+this.mBaseChairId)
        var lastBaseChairId = this.mBaseChairId
        this.reInitDataUI();
        for (var i = 0; i < this.MAX_PLAYERNUM; i++) {
            var chairshow = this.mChairShowArray[i]
            if(chairshow){
                chairshow.setVisible(true)
            }
        }
        for (var i = 0; i < this.MAX_PLAYERNUM; i++) {
            this.showPlayerByChair(i, 1, null,0);
        }
        this.mPlayerList = [];
        this.initGameData_sys();

        this.handleEnterTableData();
        this.initGameScene();
        if(lastBaseChairId!=this.mBaseChairId){
            this.baseChairChange();
        }
        sGameData.mEnterTableData = null;
        sGameData.mGameNet.sendReqPropsNum(BOTS_PROPS);
    },
    initGameData_sys:function(){
        for (var i = 0; i < this.MAX_PLAYERNUM; i++) {
            this.mChairSitDown[i] = 0;
        }
    },
    //初始化游戏数据
    initGameData:function(){
        this.mPlayerFenCardValueArray = [];
        this.mPlayerCardShowArray = [];
        this.mPlayerCardValueArrayChair = [];
        for(var i = 0;i<this.MAX_PLAYERNUM;i++){
            this.mPlayerCardShowArray[i] = [];
            this.mPlayerCardValueArrayChair[i] = [];
            this.mPGameStateChair[i] = 0
            this.mPlayerBetValueChair[i] = 0;
            this.mCardTypesChair = -1;
            this.mFapaiStateChair[i] = 0;
        }
        this.mTempCoinsArray = [];
        this.mHasShowTishi = false;
        this.mMeHasFenpai = false;
        this.mHasInitGameState = false;
        this.mIsFenpaiing = false;
        this.mHasUseTool = false;
    },

    /**
     * 初始化玩家 头像
     */
    initUserHead:function(theShowUserHead){
        cc.log("initUserHead_Basic="+this.MAX_PLAYERNUM);
        this.mUserHeadsArray = [];
        for(var i=0;i<this.MAX_PLAYERNUM;i++){
            var aUserHead = theShowUserHead.create();
            aUserHead.setChair(i);
            if(!sGameData.mIsTestNoNet){
                aUserHead.setVisible(false);
            }
            aUserHead.setXY();
            this.addChild(aUserHead,5);
            this.mUserHeadsArray.push(aUserHead);
        }
    },
    //重置数据
    reInitDataUI:function(){
        cc.log("reInitDataUI");
        this.cleanShowObject();
        this.initGameData();
        this.mCardTypeView.cleanAll()
        this.mShowOPView.cleanAll();
        this.mShowTipView.showTip(0);
        for(var i=0;i<this.MAX_PLAYERNUM;i++){
            this.showBetNum(i,0);
        }
        this.VisibleBetButton(false);
        this.VisiblePlayButton(false);
        this.VisibleQZButton(false);
        this.VisibleContinueButton(false);
        this.closeClock();
        this.mScoreView.setVisible(false)
        this.mScoreView.cleanAll();
        this.mShowCalculate.setVisible(false);
        //this.mShowQiangzView.cleanAll();
        this.mShowWinLose.setVisible(false);
        this.mShowWinLose.stopAnim();
        this.mShowMaskView.setVisible(false);
    },
    //显示桌子
    initTables:function(){
        var size = cc.director.getWinSize();
        //var desk = cc.Sprite.create("#game_table_bg_vip.png");
        //desk.setPosition(cc.p(size.width/2, size.height/2 + 30));
        //this.addChild(desk,1);


        this.initUserHead(DNUserHead);
        this.mBetNumShowsArray = [];
        this.mChairShowArray = [];
        for(var i=0;i<this.MAX_PLAYERNUM;i++){
            //this.initChair(i)
            this.initBetNumShow(i);
        }
    },
    //初始化椅子
    initChair:function(seat){

        //var chairShow = DNChairShow.create(seat)
        //chairShow.setXY();
        //this.addChild(chairShow);
        //this.mChairShowArray.push(chairShow);

    },
    //初始化投注显示
    initBetNumShow:function(seat){
        var size = cc.director.getWinSize();
        var betshow = DNBetNumShow.create(seat);
        if(betshow){
            betshow.setVisible(false);
            this.addChild(betshow,10);
            betshow.setXY();
            this.mBetNumShowsArray[seat] = betshow;
        }
    },
    //test 数据
    initTestData:function(){
        cc.log("initTestData--")
        var tcardIndex = 0;
        var testcards = getTestCards(1);

        var seatsitdown_t = [1,1,1,1,1,1];
        var ingame_t = [1,1,1,1,1,1];

        sGameData.mUser.chairId = 0;
        this.mMyChairId = sGameData.mUser.chairId;

        this.mZhuangChairId = 1;
        this.mZhuangSeatId = 3;


        for(var i=0;i<this.MAX_PLAYERNUM;i++){
            this.mChairSitDown[i] = seatsitdown_t[i]
            this.mIsInGameChair[i] = ingame_t[i];
            this.mFapaiStateChair[i] = ingame_t[i];

            this.mPlayerCardValueArrayChair[i][0] = testcards[tcardIndex];
            tcardIndex++;
            this.mPlayerCardValueArrayChair[i][1] = testcards[tcardIndex];
            tcardIndex++;
            this.mPlayerCardValueArrayChair[i][2] = testcards[tcardIndex];
            tcardIndex++;
            this.mPlayerCardValueArrayChair[i][3] = testcards[tcardIndex];
            tcardIndex++;
            this.mPlayerCardValueArrayChair[i][4] = testcards[tcardIndex];
            tcardIndex++;

            var testp = getTestPlayerById(i+1);
            testp.chairId = i;
            this.addPlayer(testp);

        }
    },
    //处理 进入桌子 数据
    handleEnterTableData:function(){
        cc.log("handleEnterTableData--");
        if(sGameData.mIsTestNoNet){
            return;
        }
        var netdata = sGameData.mEnterTableData
        this.mGameNo = netdata[2];
        this.mGameState = netdata[3];
        this.mZhuangChairId = netdata[4];
        if(this.mGameState != DN_NONE_STATE){
            this.mIsInGame = true;
            this.showZhuang(this.mZhuangChairId);
        }else{
            this.mShowTipView.showTip(0);
        }
        this.mMyState = MYSTATE_STAND;
        sGameData.mMeStandUp = true;
        cc.log("mGameState=="+this.mGameState)
        cc.log("mZhuangChairId=="+this.mZhuangChairId)
        var gameplayers = netdata[5];

        for(var i=0;i<gameplayers.length;i++){
            var gp = gameplayers[i];
            var player = gp.player;
            if(player.id == sGameData.mUser.id){

                if(sGameData.mEnterTableRandom){
                    cc.log("random sit-----")
                    var myChairId = netdata[6];
                    if (myChairId!=null&&myChairId >-1) {
                        this.mMyChairId = myChairId;
                        player.chairId = myChairId
                    }
                    var tableId = netdata[7];
                    var table = getDataById(sGameData.mShowTablesList,tableId);
                    if(table){
                        sGameData.mCurrTable = table;
                        this.mMinBet = sGameData.mCurrTable.minBet;
                        this.mBasePointView.showAllBet();
                    }
                }

                sGameData.mUser.chairId = player.chairId;
                this.mMyChairId = player.chairId;

                if(player.chairId > -1){
                    this.mMyState = MYSTATE_SITDOWN;
                    this.mBaseChairId = sGameData.mUser.chairId;
                    sGameData.mMeStandUp = false;
                    break;
                }


            }
        }

        cc.log("this.mMyChairId=="+this.mMyChairId);
        cc.log("player len--"+gameplayers.length);
        for(var i=0;i<gameplayers.length;i++){
            var gp = gameplayers[i];
            var player = gp.player;
            cc.log("player ="+player.userName+" |"+player.id+"|"+player.nickName+" c="+player.chairId+" gp state="+gp.state);
            var aPlayer = this.getPlayerByIdx(player.id);
            if(!aPlayer){
                this.addPlayer(player);
            }else{
                aPlayer.chairId = player.chairId;
            }
            if(player.chairId!=-1){
                cc.log("p=="+player.id+"|"+player.chairId+"|"+gp.state);
                this.mChairSitDown[player.chairId] = SITDOWN_YES;
                if(gp.state == P_GAME_STATE){
                    this.mIsInGameChair[player.chairId] = ISINGAME_YSE;
                    this.mPGameStateChair[player.chairId] = PGAMESTATE_INGAME;
                }else{
                    this.mIsInGameChair[player.chairId] = ISINGAME_NO;
                }
                this.playerEnterChair(player);
                var chairId = player.chairId;
                var seat = this.getPlayerSeatByChairId(chairId);
                player.state = gp.state;

                if(this.mGameState != DN_NONE_STATE){
                    this.mGameUI.setInviteBtnDisable();
                }

                if(this.mGameState == DN_NONE_STATE){
                    if(this.mMyState == MYSTATE_SITDOWN&&player.state == P_SITDOWN_STATE&&player.id == sGameData.mUser.id){
                        sGameNetData.mDNNet.sendDNContinue();
                    }
                }else if(this.mGameState == DN_HOLD_BANK_STATE){
                    if(gp.selectBank==0){//抢庄 没操作  ////0:还没有进行抢庄操作，1:不抢，2:抢庄
                        if(player.chairId == this.mMyChairId&&gp.state == P_GAME_STATE){
                            this.showClock(0);
                            if(sGameData.mUser.softCash >= this.mMinBet*this.mZhuangNeedBei){ //3*4*15
                                this.mShowTipView.showTip(5);
                                this.VisibleQZButton(true);
                            }else{
                                this.mShowTipView.showTip(6);
                                sGameNetData.mDNNet.sendDNQiangZhuang(1)
                                this.mShowClock.mSeat = 1;
                            }
                        }
                    }
                }else if(this.mGameState == DN_BET_STATE){
                    if(gp.bet<=0){ //没下注
                        if(player.chairId == this.mMyChairId &&gp.state == P_GAME_STATE){
                            if(this.mZhuangChairId != this.mMyChairId){
                                this.mShowTipView.showTip(1);
                                this.VisibleBetButton(true);
                                this.showClock(0);
                                this.mShowTipView.showTip(1);
                            }else{
                                this.mShowTipView.showTip(2);
                                this.mShowTipView.showTip(2);
                                this.showClock(1);
                            }
                        }
                    }else {//下注了
                        cc.log("s:"+chairId+" b:"+gp.bet);
                        this.mPlayerBetValueChair[chairId] = gp.bet;

                        if(gp.bet/this.mMinBet > this.mMaxBetMultiple){
                            this.mMaxBetMultiple = gp.bet/this.mMinBet;
                        }
                    }
                }else if(this.mGameState == DN_SPLIT_CARD_STATE){
                    if(gp.state == P_GAME_STATE){
                        this.mPlayerBetValueChair[chairId] = gp.bet;
                        this.mIsFenpaiing = true;

                        this.showBetNum(player.chairId,this.mPlayerBetValueChair[chairId]);
                        cc.log("gp1.cards=="+gp.cards)
                        cc.log("gp1.fencards=="+gp.fencards)
                        if(gp.cards.length > 0){
                            this.mPlayerCardValueArrayChair[chairId] = gp.cards;
                            this.showCardForInit(seat,1);
                        }else{
                            this.showCardForInit(seat);
                        }
                        if(gp.fencards.length > 0){
                            this.mPlayerCardValueArrayChair[chairId] = gp.fencards;
                            this.showFenpaiResult(chairId,false);
                            var cardType = this.mDNLogic.getCardType(gp.fencards);
                            this.mCardTypeView.showTypeImage(seat,cardType);
                            this.mCardTypesChair[chairId] = cardType;
                            this.mPGameStateChair[chairId] = PGAMESTATE_OVERGAME;
                            this.mShowTipView.showTip(8);
                            if(chairId == this.mMyChairId){
                                this.mMeHasFenpai = true;
                            }
                        }

                        if(gp.fencards.length == 0&&chairId==this.mMyChairId){
                            this.VisiblePlayButton(true,false);
                            this.showClock(0);
                            this.mShowTipView.showTip(7);
                            this.mShowCalculate.setVisible(true);
                        }
                    }
                }
            }
        }

        this.showChangeTableBtn(1);

        //if(this.mIsInGameChair){
        //    this.mShowTipView.showTip(8);
        //}

    },
    //初始化游戏场景
    initGameScene:function(){
        if(sGameData.mIsTestNoNet){
            for (var i = 0; i < this.mPlayerList.length; i++) {
                var p = this.mPlayerList[i];
                cc.log("pid--=" + p.id + "|" + p.chairId);
                if (p.chairId != -1) {
                    this.playerEnterChair(p);
                }
            }
        }
    },
    showChangeTableBtn:function(type){

        if(type == 1){
            this.VisibleChangeTableButton(true,1);
        }else{
            this.VisibleChangeTableButton(true);
            this.mMeokSprite.setVisible(true);
        }
        //this.mIsCheckCanChangeTableing = true;
        //this.mStartTimeCheckCanChangeTable = (new Date()).getTime();

    },

    //把玩家放入某椅子
    playerEnterChair:function( p){
        this.showPlayerByChair(p.chairId,0,p,0);
    },
    //按钮响应
    op_t_fapai:function(){
        this.buttonClicked();
        this.mIsInGame = true
        this.reInitDataUI();
        this.initTestData();
        this.showZhuang(this.mZhuangChairId);
        for(var i=0;i<this.MAX_PLAYERNUM;i++){
            this.startBetAnim(i,this.mMinBet);
            this.showBetNum(i,this.mMinBet);
        }
        this.mIsFapaiing = false;
        this.fapaiStart();
    },

    op_t_test1:function(){
        this.buttonClicked();
        for(var i=0;i<this.MAX_PLAYERNUM;i++){
            var num = randomInt(300);
            this.startBetAnim(i,num);
        }
    },
    op_t_test:function(){
        this.buttonClicked();

        this.mQiangzChair = [1,1,1,1,1];

        var cards = [5,8,9,4,7];
        cards = this.mDNLogic.checkHasNiu(cards);
        var type = this.mDNLogic.getCardType(cards);
        cc.log("type=="+type);
        for(var i=0;i<this.MAX_PLAYERNUM;i++){

            var seat = this.getPlayerSeatByChairId(i)
            var r = this.mDNLogic.checkHasNiu(this.mPlayerCardValueArrayChair[i]);
            var type = 0 ;
            if(r.length == 5 ){
                type = this.mDNLogic.getCardType(r);
                this.mPlayerCardValueArrayChair[i] = r;
            }
            this.showFenpaiResult(i);

            var types = [10,11,12,13,14];
            var ttype =  types[randomInt(5)];

            //this.mCardTypeView.showTypeImage(i,ttype,true)
            //this.mShowOPView.showOPImage(i,11);

            this.mShowOPView.showOPImage(i,12);
//            if(this.mQiangzChair[i]==1){
//                this.mShowQiangzView.showAnim(i);
//            }

            //this.showBetNum(i,this.mMinBet);
        }
        var seat = randomInt(5);
        var num = randomInt(300);
        //this.showCoinBackAnim(seat,num);

        var chatId = randomInt(3);
        var msg = this.mDNLogic.mTalkMsg[0][chatId];
        //this.mChatView.showMsg(seat, msg)


        this.startShowFace(seat,0);

        this.showBetBackAnim(seat);
        //this.VisibleQZButton(true);
        //this.VisibleBetButton(true);
        var tip = randomInt(9);
        this.mShowTipView.showTip(tip);
        //this.VisibleContinueButton(true);

        //var p = getTestPlayerById(1);
        //p.chairId = 0;
        //this.showPlayerByChair(0,0,p)

        //this.VisibleQZButton(true);
        //var cards = [9,4,7];
        //this.mShowCalculate.setValue(cards)


//        this.mShowWinLose.setVisible(true);
//        this.mShowWinLose.showResult(randomInt(2)+1);

        showTopMsg("abcdddd!test"+randomInt(10000))


        //this.showQiangzAnim(seat);

//        this.mScoreView.setVisible(true);
//        this.mScoreView.showAnim();

        var tar = randomInt(4)+1;
        var index = randomInt(8)
        var size = cc.director.getWinSize();
        var pos0 = cc.p(size.width/2 - 107,size.height/2 - 160)
        var pos1 = cc.p(size.width/2 + 407,size.height/2 - 54)
        var pos2 = cc.p(size.width/2 + 407,size.height/2 + 200)
        var pos3 = cc.p(size.width/2 - 407,size.height/2 + 200)
        var pos4 = cc.p(size.width/2 - 407,size.height/2 - 54)
        var pos =  [pos0,pos1,pos2,pos3,pos4];

        //showInterative(0,tar,index,pos,this);

    },

    //下注
    op_bet1:function(){
        this.op_bet(1);
    },
    op_bet2:function(){
        this.op_bet(2);
    },
    op_bet3:function(){
        this.op_bet(3);
    },
    op_bet4:function(){
        this.op_bet(4);
    },
    op_bet5:function(){
        this.op_bet(5);
    },
    op_bet6:function(){
        this.op_bet(6);
    },

    //操作 继续
    op_continue: function () {
        cc.log("op_continue");
        this.buttonClicked();
        playClickSound();
        this.reInitDataUI();
        if (sGameData.mDNLayer.mMyState==1) {
            sGameNetData.mDNNet.sendDNContinue();
        }
        this.showChangeTableBtn();
        this.mMeokSprite.setVisible(true);

    },
    op_changetable:function(){
        cc.log("op_changetable");
        this.buttonClicked();
        playClickSound();
        if(this.mIsFapaiing){
            sGameData.mIsGameShowAniming = false;
            this.mIsFapaiing = false;
        }

        this.VisibleContinueButton(false);
        this.reInitDataUI();

        sGameNetData.mDNNet.sendDNExitTable();
        sGameNetData.mDNNet.sendDNRandomEnterTable(-1)
        sGameData.mChangeTableByRandom = true;
        sGameData.mIsSendingData = true;
    },

    //下注
    op_bet:function(index){
        this.buttonClicked();
        playClickSound();
        cc.log("op_bet="+index)
        var value = this.mBetValueArray[index-1];
        sGameNetData.mDNNet.sendDNBet(value);
        this.VisibleBetButton(false);

        this.mShowClock.closeSound();
        this.mShowClock.mSeat = 1;
    },
    //分牌
    op_fenpai:function(){
        this.buttonClicked();
        playClickSound();
        cc.log("op_fenpai-");
        this.doCheckFenpai();
        if(this.mPlayerFenCardValueArray.length == 5){
            this.mPlayerCardValueArrayChair[this.mMyChairId] = this.mPlayerFenCardValueArray;
            //this.showFenpaiResult(this.mMyChairId);

            //var type = this.mDNLogic.getCardType(this.mPlayerCardValueArrayChair[this.mMyChairId]);//mApp.randRange(0,14);
            //this.mCardTypeView.showTypeImage(0,type);

            sGameNetData.mDNNet.sendDNFenpai(this.mPlayerFenCardValueArray);
            //this.mMeHasFenpai = true;
            this.VisiblePlayButton(false,true);
            this.mShowClock.closeSound();
            this.mShowClock.mSeat = 1;
            this.mShowCalculate.setVisible(false);
            this.mShowCalculate.setValue([]);
            this.mShowTipView.showTip(8);
        }
    },
    //无牛
    op_wuniu:function(){
        this.buttonClicked();
        playClickSound();
        cc.log("op_wuniu-");
        this.mPlayerFenCardValueArray = this.mPlayerCardValueArrayChair[this.mMyChairId]

        //this.showFenpaiResult(this.mMyChairId);
        //this.mCardTypeView.showTypeImage(0,0);

        sGameNetData.mDNNet.sendDNFenpai(this.mPlayerFenCardValueArray);
        //this.mMeHasFenpai = true;
        this.VisiblePlayButton(false,true);
        this.mShowClock.closeSound();
        this.mShowClock.mSeat = 1;
        this.mShowCalculate.setVisible(false);
        this.mShowCalculate.setValue([]);
        this.mShowTipView.showTip(8);
    },
    op_suanpai:function(){
        this.buttonClicked();
        playClickSound();
        cc.log("op_suanpai-");
        //var mychair = this.mMyChairId
        //if (mychair != -1 && this.mIsInGameChair[mychair] == 1
        //    && this.mPGameStateChair[mychair] == PGAMESTATE_INGAME
        //    && this.mIsFenpaiing) {
        //    if (sGameData.mUser.dnbotnum > 0) {
        //        if (!this.mHasUseTool) {
        //            this.mHasUseTool = true;
        //            sGameNetData.mDNNet.sendDNUseToolsBots();
        //            //this.mGameUI.setCanUseTools(false);
        //        }
        //    }else{
        //        showLittleNotice(sResWord.w_dn_donothastool);
        //    }
        //} else {
        //    showLittleNotice(sResWord.w_dn_cannotusetool);
        //}
        var cards = this.mDNLogic.checkHasNiu(this.mPlayerCardValueArrayChair[this.mMyChairId]);
        if(cards.length == 5 ){
            this.mPlayerCardValueArrayChair[this.mMyChairId] = cards;
        }else{
            cards = this.mPlayerCardValueArrayChair[this.mMyChairId];
        }
        sGameNetData.mDNNet.sendDNFenpai(cards);
        this.VisiblePlayButton(false,true);
        this.mShowClock.closeSound();
        this.mShowClock.mSeat = 1;
        this.mShowCalculate.setVisible(false);
        this.mShowCalculate.setValue([]);
        this.mShowTipView.showTip(8);

    },
    //抢庄
    op_qiangz:function(){  //不抢庄：1 , 抢庄：2
        this.buttonClicked();
        playClickSound();
        cc.log("op_qiangz-");
        this.VisibleQZButton(false);
        sGameNetData.mDNNet.sendDNQiangZhuang(2)
        this.mShowClock.closeSound();
        this.mShowClock.mSeat = 1;
        this.mShowTipView.showTip(4);
    },

    op_qiangz_x1:function(){
        this.buttonClicked();
        playClickSound();
        cc.log("op_qiangz-");
        this.VisibleQZButton(false);
        sGameNetData.mDNNet.sendDNQiangZhuang(2)
        this.mShowClock.closeSound();
        this.mShowClock.mSeat = 1;
        this.mShowTipView.showTip(4);
    },

    op_qiangz_x2:function(){
        this.buttonClicked();
        playClickSound();
        cc.log("op_qiangz-");
        this.VisibleQZButton(false);
        sGameNetData.mDNNet.sendDNQiangZhuang(3)
        this.mShowClock.closeSound();
        this.mShowClock.mSeat = 1;
        this.mShowTipView.showTip(4);
    },

    op_qiangz_x4:function(){
        this.buttonClicked();
        playClickSound();
        cc.log("op_qiangz-");
        this.VisibleQZButton(false);
        sGameNetData.mDNNet.sendDNQiangZhuang(4)
        this.mShowClock.closeSound();
        this.mShowClock.mSeat = 1;
        this.mShowTipView.showTip(4);
    },



    //不抢庄
    op_buqiangz:function(){
        this.buttonClicked();
        playClickSound();
        cc.log("op_buqiangz-");
        this.VisibleQZButton(false);
        sGameNetData.mDNNet.sendDNQiangZhuang(1)
        this.mShowClock.closeSound();
        this.mShowClock.mSeat = 1;
    },
    //弃庄
    op_qizhuang:function(){
        this.buttonClicked();
        playClickSound();
        cc.log("op_qizhuang-");
//        this.VisibleQizButton(false);
//        sGameNetData.mDNNet.sendDNQiangZhuang()
    },
    //显示菜单
    op_showmenu:function(){
        this.buttonClicked();
        playClickSound();
        this.showTopMenuPanel(true);
    },
    //返回大厅
    op_quitgame_view:function(){
        this.buttonClicked();
        cc.log("op_quitgame_view");
        if(!sGameData.mIsTestNoNet){
            if(!sGameData.mIsSendingData){
                if(sGameData.mUseRandomSit){
                    sGameNetData.mDNNet.sendDNExitRoom();
                }else{
                    sGameNetData.mDNNet.sendDNExitTable();
                }
                sGameData.mIsSendingData = true;
            }
        }else{
            this.gotoMain();
        }
    },
    //站起
    op_standup_view:function(){
        this.buttonClicked();
        cc.log("op_stand_view");
        if(!sGameData.mIsTestNoNet){
            if(!sGameData.mIsSendingData){
                sGameNetData.mDNNet.sendDNStandUp();
                sGameData.mIsSendingData = true;
            }
        }
    },
    //显示任务
    op_showmission:function(){
        this.buttonClicked();
        playClickSound();
        cc.log("op_showmission");
//        if (!sGameData.mIsTestNoNet) {
//            if(!sGameData.mIsSendingData) {
//                sGameData.mIsSendingData = true
//                sGameData.mGameNet.sendTaskList(1, sGameData.mCurrRoom.roomId);
//            }
//        }else {
//            this.showMission();
//        }
    },
    //显示关闭 聊天选择界面
    op_showGameChatMsg:function(){
        this.buttonClicked();
        playClickSound();
        cc.log("op_showGameChatMsg");

        var tars = [this.mChatFaceView,this.mShowTalkView,this.mChatInputView]
        this.op_showGameChatView(tars,1);

    },
    op_showGameChatInput:function(){
        this.buttonClicked();
        playClickSound();
        cc.log("op_showGameChatInput");
        var tars = [this.mChatFaceView,this.mShowTalkView,this.mChatInputView]
        this.op_showGameChatView(tars,2);
    },
    //操作 显示 选择聊天表情界面
    op_showGameChatFace:function(){
        this.buttonClicked();
        playClickSound();
        cc.log("op_showGameChatFace");
        var tars = [this.mChatFaceView,this.mShowTalkView,this.mChatInputView]
        this.op_showGameChatView(tars,0);
    },
    //显示设置
    showSetting:function(){
        if(this.mSettingView.visible){
            this.mSettingView.setVisible(false);
        }else{
            this.mSettingView.setVisible(true);
        }
    },
    //显示庄
    showZhuang:function(chairId){

        for(var i=0;i<this.mUserHeadsArray.length;i++){
            var uh = this.mUserHeadsArray[i];
            if(i == chairId){
                uh.showZhuang(1);
            }else{
                uh.showZhuang(0);
            }
        }
    },
    //显示时钟
    showClock:function(seat,type){
        if(type == null){
            type = 0;
        }
        if(this.mShowClock){
            this.mShowClock.setVisible(true);
            this.mShowClock.setCountDown(seat,type);
            var size = cc.director.getWinSize();
            this.mShowClock.y = size.height / 2+140;
        }
    },
    //关闭时钟
    closeClock:function(){
        this.mShowClock.closeClock();
    },
    //时钟到时间
    clockTimeOver:function()
    {
        cc.log("clockTimeover :");
    },
    /**
     * 开始发牌
     */
    fapaiStart:function()
    {
        if(this.mIsFapaiing) return;
        sGameData.mIsGameShowAniming = true;
        this.mIsFapaiing = true;
        this.mFapaiNum = 0;
        this.mFapaiChair = this.mZhuangChairId;

        this.fapaiSeat();
    },

    /**
     * 给某个位置发牌
     */
    fapaiSeat:function(){
        if(sGameData.mIsGameSitDownAniming){
            cc.log("mIsGameSitDownAniming=")
            return;
        }
        var seat= 0;
        seat = this.getPlayerSeatByChairId(this.mFapaiChair);
        cc.log("fapaiSeat="+seat+"-"+this.mFapaiNum);

        var size = cc.director.getWinSize();

        var card = DNCard.create();
        card.mIndex = this.mFapaiNum;
        card.mSeat = seat;
        card.setPosition(cc.p(size.width / 2,size.height -150));
        this.addChild(card,5+this.mFapaiNum);
        this.mPlayerCardShowArray[seat].push(card);
        if(seat!=0){
            card.setScale(0.35);
        }else{
            card.setScale(0.5);
        }

        var toXY = this.getCardPos(seat,this.mFapaiNum)

        var moveanim = cc.MoveTo.create(0.15,toXY);
        var callback = cc.CallFunc.create(this.onFapaiOver, this);
        var actions = cc.Sequence.create(moveanim,callback);
        card.runAction(actions);
    },

    /**
     * 给某个位置发牌结束
     */
    onFapaiOver:function(target){

        var tnum=0;
        var num = 0;
        var lastChair = this.mFapaiChair;
        while(this.mFapaiChair < this.MAX_PLAYERNUM){
            this.mFapaiChair++;//下一个位置
            num++;
            if(this.mFapaiChair >= this.MAX_PLAYERNUM) this.mFapaiChair = 0;
            if(this.mFapaiStateChair[this.mFapaiChair]==1) break;
            if(num > 25){
                cc.log("fapai error")
                this.mFapaiNum = 5;
                break;
            }
        }
        if(lastChair == this.mFapaiChair){//同一位置
            this.mFapaiNum ++;
            cc.log("error::table has one player");
            sGameData.mIsGameShowAniming = false;
            this.mIsFapaiing = false;
            return;
        }
        if(this.mFapaiChair == this.mZhuangChairId){
            this.mFapaiNum ++;
            cc.log("mFapaiNum=="+this.mFapaiNum+"--"+this.mFapaiChair);
        }

        if(this.mFapaiNum >=5){
            //this.fapaiEnd();
            this.fapaiEndAnim();
        }else {
            this.fapaiSeat();
        }
    },
    //发牌结束动画 （收一起再散开）
    fapaiEndAnim:function(){
        cc.log("fapaiEndAnim--")
        if(this.mIsInGameChair[this.mMyChairId]==ISINGAME_YSE){
            for(var i=0;i<this.mPlayerCardShowArray[0].length;i++){
                var cardshow = this.mPlayerCardShowArray[0][i];
                var topos = this.getCardPos(0,0);
                var moveAnim = cc.MoveTo.create(0.4,topos);
                var setValue = function(tar,index){
                    tar.setCardValue(this.mPlayerCardValueArrayChair[this.mMyChairId][index])
                }
                var callback1 = cc.CallFunc.create(setValue, this,i);
                var topos1 = this.getCardPos(0,i);
                var moveAnim1 = cc.MoveTo.create(0.4,topos1);
                var callback2 = cc.CallFunc.create(this.fapaiEnd, this);
                var seq = null;
                if(i==0){
                    seq = cc.Sequence.create(moveAnim,callback1,moveAnim1,callback2);
                }else{
                    seq = cc.Sequence.create(moveAnim,callback1,moveAnim1);
                }
                cardshow.runAction(seq);
                //cardshow.mDisable = false;
            }
        }else{
            this.fapaiEnd();
        }
    },

    /**
     * 发牌过程结束
     */
    fapaiEnd:function(){
        sGameData.mIsGameShowAniming = false;
        this.mIsFapaiing = false;


        for(var i=0;i<this.mPlayerCardShowArray[0].length;i++){
            var cardshow = this.mPlayerCardShowArray[0][i];
            cardshow.mDisable = false;
        }
        this.mIsFenpaiing = true;
        if(this.mIsInGameChair[this.mMyChairId]==ISINGAME_YSE){
            this.VisiblePlayButton(true,false);
            this.mShowTipView.showTip(7);
            this.showClock(0);
            this.mShowCalculate.setVisible(true);
        }else{
            this.showClock(1);
        }
        cc.log("fapaiEnd---");
    },
    //获取牌坐标
    getCardPos:function(seat,index){
        var size = cc.director.getWinSize();
        var pos0 = cc.p(size.width/2 + 8-40,size.height/2 - 234)
        var pos1 = cc.p(size.width/2 + 237-25,size.height/2 - 50)
        var pos2 = cc.p(size.width/2 + 237-25,size.height/2 + 150-35)
        var pos3 = cc.p(size.width/2 - 300-30,size.height/2 + 150-35)
        var pos4 = cc.p(size.width/2 - 300-30,size.height/2 - 50)
        var faXY =  [pos0,pos1,pos2,pos3,pos4];
        var pos = cc.p(faXY[seat].x,faXY[seat].y)//this.getCardPos(seat,0,1);
        if(seat == 0){
            pos.x =  pos.x + 70*index;
        }else{
            pos.x =  pos.x + 15*index;
        }
        return pos;
    },
    //显示抢庄动画
    showQiangzAnim:function(zchair){
        //var
        cc.log("showQiangzAnim=="+zchair);
        sGameData.mIsGameShowAniming = true;

        var size = cc.director.getWinSize();
        var pos0 = cc.p(size.width/2 + 8,size.height/2 - 104)
        var pos1 = cc.p(size.width/2 + 230,size.height/2 - 0)
        var pos2 = cc.p(size.width/2 + 230,size.height/2 + 90)
        var pos3 = cc.p(size.width/2 - 230,size.height/2 + 90)
        var pos4 = cc.p(size.width/2 - 230,size.height/2 - 0)
        var faXY =  [pos0,pos1,pos2,pos3,pos4];
        var pos = faXY[0];
        this.mZhuangSprite.setVisible(true);
        this.mZhuangSprite.stopAllActions();
        //cc.log("aaaa==="+pos.x+"=="+pos.y);
        var isfrist = true;
        var zseat = this.getPlayerSeatByChairId(zchair)
        var poses = [];
        for(var i = 0;i<this.MAX_PLAYERNUM;i++){
            if(this.mQiangzChair[i]==1){
                var seat = this.getPlayerSeatByChairId(i)
                var pos = faXY[seat];
                poses.push(pos)
                if(isfrist){
                    isfrist = false;
                    var tpos = pos;
                    this.mZhuangSprite.setPosition(pos);
                }
            }
        }

        for(var i = 0;i<this.MAX_PLAYERNUM;i++){
            if(this.mQiangzChair[i]==1&&i<=zchair){
                var seat = this.getPlayerSeatByChairId(i)
                var pos = faXY[seat];
                poses.push(pos)
            }
        }
        var userhead = this.mUserHeadsArray[zchair];
        if (userhead) {
            var pos = userhead.getSeatXY(zseat);
            poses.push(pos)
        }
        cc.log("poses len=="+poses.length);

        var anims = [];
        for(var i=0;i<poses.length;i++){
            var pos = poses[i]
            cc.log("aaaa"+i+"==="+pos.x+"=="+pos.y);
            var moveanim = cc.MoveTo.create(0.3,pos);
            anims.push(moveanim);
        }
        var callback = cc.CallFunc.create(this.showQiangzAnimEnd, this);
        anims.push(callback);
        var seq = cc.Sequence.create(anims);
        this.mZhuangSprite.runAction(seq);
    },
    //抢庄动画结束
    showQiangzAnimEnd:function(){
        cc.log("showQiangzAnimEnd");
        sGameData.mIsGameShowAniming = false;
        this.mZhuangSprite.setVisible(false);
        this.showZhuang(this.mZhuangChairId);
        this.mQiangzChair = [0,0,0,0,0];
        this.mShowQiangzView.cleanAll();
        this.showClock(1);
        if(this.mZhuangChairId != this.mMyChairId){
            if(this.mIsInGameChair[this.mMyChairId]==1 && this.mMyChairId > -1){
                this.VisibleBetButton(true);
                this.mShowTipView.showTip(1);
                this.showClock(0);
            }
        }else{
            this.mShowTipView.showTip(2);
        }
    },

    /**
     * 分牌
     */
    doCheckFenpai:function(){

        var aNiuArray = [];
        var aNumArray = [];

        for(var i = 0;i<this.mPlayerCardShowArray[0].length;i++){
            var aCard = this.mPlayerCardShowArray[0][i];
            if(aCard.mChoosed){
                aNiuArray.push(aCard.mCardValue);
            }else{
                aNumArray.push(aCard.mCardValue);
            }
        }
        if(aNiuArray.length == 3&&aNumArray.length == 2){
            this.mPlayerFenCardValueArray = [aNiuArray[0],aNiuArray[1],aNiuArray[2],aNumArray[0],aNumArray[1]];
            cc.log("fenpai==="+this.mPlayerFenCardValueArray.toString());
        }else{
            if(this.mHasShowTishi&&!this.mHasNiu){
                this.mPlayerFenCardValueArray = this.mPlayerCardValueArrayChair[this.mMyChairId];
                cc.log("fenpai===none niu ");
            }else{
                cc.log("fenpai  ---error");
                cc.log("请选择3张牌");
            }
        }

    },

    //显示某位置 投注额
    showBetNum:function(chair,num){
        var seat = this.getPlayerSeatByChairId(chair)
        var betshow = this.mBetNumShowsArray[seat];
        var bnum = Math.floor(num/this.mMinBet+0.5);
        betshow.setBetNum(bnum);
    },

    //显示或隐藏某玩家 state 0显示 1隐藏  showanim显示动画： 0不显示 ,1显示
    showPlayerByChair: function (chairId, state, p,showanim) {
        if(showanim == null){
            showanim = 1;
        }
        cc.log("showPlayerByChair=="+chairId+"|"+state+"|"+showanim)
        var userhead = this.mUserHeadsArray[chairId];
        if (userhead) {
            if(showanim==1){
                sGameData.mIsGameSitDownAnimNum++;
                sGameData.mIsGameSitDownAniming = true;
            }
            if (state == 0) {
                userhead.setPlayer(p);
                userhead.setVisible(true);
                var seat = this.getPlayerSeatByChairId(chairId);
                cc.log("show userhead"+chairId+"|"+seat)

                this.mSexArray[p.chairId] = p.sex;
                if (seat == 0) {
                    this.mScoreNameArray[p.chairId] = p.nickName;
                } else {
                    if (sGameData.mIsUseTrueNick) {
                        this.mScoreNameArray[p.chairId] = p.nickName;
                    } else {
                        this.mScoreNameArray[p.chairId] = "玩家" + (p.chairId + 1);
                    }
                }
                if(showanim==1){
                    cc.log("showanim"+showanim)
                    userhead.stopAllActions();
                    if(cc.sys.isNative){
                        if(sGameData.mCocosVerCode >= 30100){ //js-v3.1
                            userhead.setRotationY(-90.0);
                        }else{
                            userhead.setRotationSkewY(-90.0);
                        }
                    }else{
                        userhead.setRotationY(-90.0);
                    }
                    var rotateBy = cc.RotateBy.create(0.2, 0.0, 90.0); //CCMoveBy::create(3, ccp(130,0));
                    var callback = cc.CallFunc.create(this.showPlayerByChairOver1, this);
                    var seq = cc.Sequence.create(rotateBy,callback);
                    userhead.runAction(seq);
                    if(this.mMyChairId != userhead.mChairIdx){
                        userhead.setSeatXY(seat);
                    }
                }else{
                    if(cc.sys.isNative){
                        if(sGameData.mCocosVerCode >= 30100){ //js-v3.1
                            userhead.setRotationY(0);
                        }else{
                            userhead.setRotationSkewY(0);
                        }
                    }else{
                        userhead.setRotationY(0);
                    }
                    userhead.setSeatXY(seat);
                }
            } else {
                userhead.setPlayer(null);
                if(showanim==1){
                    userhead.stopAllActions();
                    var rotateBy = cc.RotateBy.create(0.2, 0.0, -90.0); //CCMoveBy::create(3, ccp(130,0));
                    var callback = cc.CallFunc.create(this.showPlayerByChairOver, this);
                    var seq = cc.Sequence.create(rotateBy,callback);
                    userhead.runAction(seq);
                }else{
                    userhead.setVisible(false);
                }
            }
        }
        var seat = this.getPlayerSeatByChairId(chairId);
        var chairshow = this.mChairShowArray[seat]
        if (chairshow) {
            if (state == 0) {
                chairshow.setVisible(false)
            } else {
                chairshow.setVisible(true)
            }
        }
    },
    //坐下时
    showPlayerByChairOver1:function(userhead){
        //需要重新 调整 玩家位置
        sGameData.mIsGameSitDownAnimNum--;
        if(sGameData.mIsGameSitDownAnimNum == 0){
            sGameData.mIsGameSitDownAniming = false;
        }

        if(this.mMyChairId == userhead.mChairIdx){
            this.baseChairChange();
        }
    },
    //站起时
    showPlayerByChairOver:function(userhead){
        userhead.setVisible(false);
        sGameData.mIsGameSitDownAnimNum--;
        if(sGameData.mIsGameSitDownAnimNum == 0){
            sGameData.mIsGameSitDownAniming = false;
        }

    },

    //调整位置 （基准椅子号改变时）
    baseChairChange: function () {
        cc.log("baseChairChange()----");
        sGameData.mIsGameSitDownAniming = true;
        for (var i = 0; i < this.MAX_PLAYERNUM; i++) {
            this.cleanPlayerCard(i);
            this.showBetNum(i,0);
            var chairshow = this.mChairShowArray[i]
            if(chairshow){
                chairshow.setVisible(true)
            }
        }
        this.mCardTypeView.cleanAll()
        this.mShowOPView.cleanAll();
        this.mShowQiangzView.cleanAll();
        this.showZhuang(-1);
        if(this.mIsInGame){
            this.showZhuang(this.mZhuangChairId);
        }
        this.mChangeNum = 0;

        for (var i = 0; i < this.MAX_PLAYERNUM; i++) {
            var userhead = this.mUserHeadsArray[i];
            if (userhead) {
                userhead.stopAllActions();
                var seat = this.getPlayerSeatByChairId(i);
                var pos = userhead.getSeatXY(seat);
                var moveanim = cc.MoveTo.create(0.3,pos);
                var callback = cc.CallFunc.create(this.baseChairChangeOver, this);
                var actions = cc.Sequence.create(moveanim,callback);
                this.mChangeNum++;
                userhead.runAction(actions);
            }
        }
    },
    //调整位置 结束
    baseChairChangeOver:function(){
        this.mChangeNum--;
        if(this.mChangeNum == 0){
            cc.log("baseChairChangeOver-")
            for (var i = 0; i < this.mPlayerList.length; i++) {
                var p = this.mPlayerList[i];
                if (p.chairId != -1) {
                    var seat = this.getPlayerSeatByChairId(p.chairId);
                    var chairshow = this.mChairShowArray[seat]
                    if(chairshow){
                        chairshow.setVisible(false)
                    }
                    if(this.mQiangzChair[p.chairId] == 1){
                        this.mShowQiangzView.showAnim(seat);
                    }
                    if(this.mIsInGame) {
                        if (this.mIsInGameChair[p.chairId] == ISINGAME_YSE) {
                            if(this.mGameState == DN_SPLIT_CARD_STATE){
                                this.showCardForInit(seat);
                            }

                            if (this.mPGameStateChair[p.chairId] == 1) {
                                this.showFenpaiResult(p.chairId);
                                var cardType = this.mCardTypesChair[p.chairId];
                                if(cardType > -1){
                                    this.mCardTypeView.showTypeImage(seat, cardType);
                                }
                            }

                            if (this.mPlayerBetValueChair[p.chairId] > 0) {
                                this.showBetNum(p.chairId, this.mPlayerBetValueChair[p.chairId]);
                            }
                        }
                    }
                }
            }
            sGameData.mIsGameSitDownAniming = false;
            if(this.mIsFapaiing){
                this.mIsFapaiing = false;
                sGameData.mIsGameShowAniming = false;
            }
            sGameData.mIsGameShowAniming = false;
        }
    },


    //初始化时显示牌
    showCardForInit:function(seat,type){
        for(var  i = 0;i<5;i++){
            var card = DNCard.create();
            card.mIndex = i;
            card.mSeat = seat;
            var pos = this.getCardPos(seat,i);
            card.setPosition(pos)
            this.addChild(card,5+i);
            this.mPlayerCardShowArray[seat].push(card);
            if(seat!=0){
                card.setScale(0.35);
            }else{
                card.setScale(0.5);
            }
            if(type == 1){
                var chair = this.getPlayerChairIdBySeat(seat)
                var cardValue = this.mPlayerCardValueArrayChair[chair][i];
                card.setCardValue(cardValue);
                card.mDisable = false;
            }
        }
    },
    //显示分牌动画  （收1起再散开）
    showFenpaiAnim:function(chairId){
        cc.log("showFenpaiAnim--")
        var seat = this.getPlayerSeatByChairId(chairId)
        for(var i=0;i<this.mPlayerCardShowArray[seat].length;i++){
            var cardshow = this.mPlayerCardShowArray[seat][i];
            var topos = this.getCardPos(seat,0);
            var moveAnim = cc.MoveTo.create(0.3,topos);
            var setValue = function(tar,index){
                tar.setCardValue(this.mPlayerCardValueArrayChair[chairId][index])
            }
            var callback1 = cc.CallFunc.create(setValue, this,i);
            var topos1 = this.getFenCardPos(seat,i);
            //cc.log("topos="+i+"="+topos.x+"|"+topos.y)
            //cc.log("topos1="+i+"="+topos1.x+"|"+topos1.y)
            var moveAnim1 = cc.MoveTo.create(0.3,topos1);
            //var callback2 = cc.CallFunc.create(this.fapaiEnd, this);
            var seq = null;
            seq = cc.Sequence.create(moveAnim,callback1,moveAnim1);
            cardshow.stopAllActions();
            cardshow.runAction(seq);
            cardshow.unchoose();
            cardshow.mDisable = true;
            cardshow.mIsFen = true;
            this.reorderChild(cardshow,51+i);
            //cardshow.mDisable = false;
        }

    },

    /**
     * 显示分牌结果
     */
    showFenpaiResult:function(chairId){
        this.showFenpaiAnim(chairId);
//        var seat = this.getPlayerSeatByChairId(chairId)
//        if(this.mChairSitDown[chairId]==1){
//            for(var k=0;k<this.mPlayerCardShowArray[seat].length;k++){
//                var aCard = this.mPlayerCardShowArray[seat][k];
//                aCard.setCardValue(this.mPlayerCardValueArrayChair[chairId][k]);
//                aCard.unchoose();
//                aCard.mDisable = true;
//                aCard.mIsFen = true;
//                var pos = this.getFenCardPos(seat,k);
//                aCard.setPosition(pos);
//            }
//        }
    },
    //获取分牌时位置
    getFenCardPos:function(seat,index){
        var size = cc.director.getWinSize();
        var pos0 = cc.p(size.width/2 + 8-40,size.height/2 - 234)
        var pos1 = cc.p(size.width/2 + 237-25-43,size.height/2 - 50)
        var pos2 = cc.p(size.width/2 + 237-25-43,size.height/2 + 150-35)
        var pos3 = cc.p(size.width/2 - 300-30,size.height/2 + 150-35)
        var pos4 = cc.p(size.width/2 - 300-30,size.height/2 - 50)
        var faXY =  [pos0,pos1,pos2,pos3,pos4];
        var pos = cc.p(faXY[seat].x,faXY[seat].y)//this.getCardPos(seat,0,1);
        var tempX = 0;
        if((seat == 0)&&index > 2){
            tempX = 50
        }else if((seat == 3||seat == 4)&&index >2){
            tempX = 20
        }else if((seat == 1||seat == 2)&&index < 3){
            tempX = -20
        }

        if(seat == 0){
            pos.x =  pos.x + 35*index+tempX;
        }else{
            pos.x =  pos.x + 25*index+tempX;
        }
        return pos;
    },

    /**
     * 开始投注动画
     */
    startBetAnim:function(seat,num){
        num = formatcash(num);
        cc.log("startBetAnim ---s:"+seat+" bet:"+num)
        if(num > 0){
            SoundManager.playSound(res.desk_post_bet_mp3);
        }


        var coinValue = 0;
        var len = DN_COINVALUE.length;
        while(num > 0){
            coinValue = 0;
            for(var i=len-1;i>-1;i--){
                var value = DN_COINVALUE[i];
                if(num/value >=1){
                    coinValue = value;
                    num = num-value;
                    break;
                }
            }
            if(coinValue==0){
                break;
            }
            var aCoin = DNCoin.create();
            aCoin.setBetValue(coinValue);
            //cc.log("coin---"+coinValue);
            aCoin.setXY(seat);
            this.addChild(aCoin,6);
            //aCoin.setLocalZOrder(this.mTempCoinsArray.length);
            this.mTempCoinsArray.push(aCoin);
            var size = cc.director.getWinSize();
            var topos = cc.p(size.width/2-100+randomInt(200),size.height/2+70-70+randomInt(140));
            var duration = 0.3 + 0.3*Math.random()
            var moveanim = cc.MoveTo.create(duration,topos);
            var callback = cc.CallFunc.create(this.onBetOver, this);
            var actions = cc.Sequence.create(moveanim,callback);
            aCoin.runAction(actions);
        }
    },
    /**
     * 投注动画结束
     */
    onBetOver:function(aCoin){

    },

    /**
     * 回收n 筹码到某位置
     */
    showCoinBackAnim:function(seat,num){
        cc.log("showCoinBackAnim ---s:"+seat+" bet:"+num   +" len:"+this.mTempCoinsArray.length)
        SoundManager.playSound(res.desk_move_chips_mp3);
        var aCoinBet = null;
        var pos = -1;

        var size = cc.director.getWinSize();
        var pos0 = cc.p(size.width/2 - 107,size.height/2 - 154)
        var pos1 = cc.p(size.width/2 + 407,size.height/2 - 54)
        var pos2 = cc.p(size.width/2 + 407,size.height/2 + 160)
        var pos3 = cc.p(size.width/2 - 407,size.height/2 + 160)
        var pos4 = cc.p(size.width/2 - 407,size.height/2 - 54)
        var pos =  [pos0,pos1,pos2,pos3,pos4];
        var toPos = cc.p(pos[seat].x,pos[seat].y);

        while(num > 0){
            pos = -1;
            for(var i = 0;i<this.mTempCoinsArray.length;i++){
                aCoinBet = this.mTempCoinsArray[i];
                if(num >= aCoinBet.mCoinValue){
                    pos = i;
                    num = num - aCoinBet.mCoinValue;
                    break;
                }
            }
            if(pos!=-1){
                this.mTempCoinsArray.splice(pos,1);
                var moveanim = cc.MoveTo.create(0.3,toPos);
                var callback = cc.CallFunc.create(this.onCoinBackOver, this);
                var actions = cc.Sequence.create(moveanim,callback);
                aCoinBet.runAction(actions);
            }else{
                break;
            }
        }

    },
    /**
     * 筹码到某位置 结束
     */
    onCoinBackOver:function(aCoin){
        this.removeChild(aCoin);
    },

    /**
     * 回收筹码到某位置
     */
    showBetBackAnim:function(seat){
        cc.log("showBetBackAnim=="+seat +" len:"+this.mTempCoinsArray.length);
        SoundManager.playSound(res.desk_move_chips_mp3);
        var size = cc.director.getWinSize();
        var pos0 = cc.p(size.width/2 - 107,size.height/2 - 154)
        var pos1 = cc.p(size.width/2 + 407,size.height/2 - 54)
        var pos2 = cc.p(size.width/2 + 407,size.height/2 + 160)
        var pos3 = cc.p(size.width/2 - 407,size.height/2 + 160)
        var pos4 = cc.p(size.width/2 - 407,size.height/2 - 54)
        var pos =  [pos0,pos1,pos2,pos3,pos4];
        var toPos = cc.p(pos[seat].x,pos[seat].y);

        for(var i=0;i<this.mTempCoinsArray.length;i++){
            var aCoin = this.mTempCoinsArray[i];
            var moveanim = cc.MoveTo.create(0.3,toPos);
            var callback = cc.CallFunc.create(this.onBetBackOver, this);
            var actions = cc.Sequence.create(moveanim,callback);
            aCoin.runAction(actions);
        }
    },
    /**
     * 回收结束清除
     */
    onBetBackOver:function(){
        this.cleanCoins();
    },

    /**
     * 获取选择的 牌数
     */
    getChooseCardNum:function(){
        var num = 0;
        for(var i = 0;i<this.mPlayerCardShowArray[0].length;i++){
            var aCard = this.mPlayerCardShowArray[0][i];
            if(aCard.mChoosed){
                num++;
            }
        }
        return num;
    },
    //获取选取的牌的值
    getChooseCardValues:function(){
        var value = [];
        for(var i = 0;i<this.mPlayerCardShowArray[0].length;i++){
            var aCard = this.mPlayerCardShowArray[0][i];
            if(aCard.mChoosed){
                var num = this.mDNLogic.getCardPoint(aCard.mCardValue);
                value.push(num)
            }
        }
        return value;
    },
    //显示任务
    showTasks:function(){
        cc.log("showTasks---")
        var len = sGameData.mShowTaskList.length
        if(len){
            this.showMission();
        }else{
            showLittleNotice(sResWord.w_no_mission);
        }
    },
    //选中 某条聊天 语句
    startShowPlayerTalk:function(index){
        cc.log("startShowPlayerTalk="+index)
        this.mShowTalkView.setVisible(false);
        var sex = sGameData.mUser.sex;
        var msg = this.mDNLogic.mTalkMsg[sex][index];
        if(this.mMyState == MYSTATE_SITDOWN){
            var now  = (new Date()).getTime();
            if(now - sGameData.mChatTime < sGameData.mChatDurTime*1000){
                var durtime = sGameData.mChatDurTime;
                var word = sResWord.w_tip_interative_s1+durtime+sResWord.w_tip_interative_s2;
                showLittleNotice(word)
                return;
            }
            sGameData.mChatTime = (new Date()).getTime();
            sGameNetData.mDNNet.sendDNChat(1,index,"",0);
        }
    },
    //显示表情
    startShowFace:function(seat,index){
        cc.log("startShowFace="+seat+"|"+index)
        this.mShowFace.showFaceImage(seat,index);
    },
    //显示任务
    showMission:function(state){

    },
    //显示任务时 改变某些按钮状态
    setMissionButtonState:function(state){
        var pmenu = this.getChildByTag(17001);
        if(pmenu){
            var missionitem = pmenu.getChildByTag(this.ButtonID_MISSION)
            if(missionitem){
                missionitem.setEnabled(state)
            }
        }
    },
    //显示菜单
    showTopMenuPanel:function(state){
        var size = cc.director.getWinSize();
        var size_top_menu_panel = cc.size(260,280);
        if(sGameData.mUseRandomSit) {
            size_top_menu_panel = cc.size(260,210);
        }
        var toppanel = this.getChildByTag(5557);
        if(!toppanel&&state){
            toppanel = DNTopMenuPanel.create();
            if(toppanel){
                toppanel.setPosition(cc.p(size.width*0.98-size_top_menu_panel.width/2,
                        size.height - size_top_menu_panel.height/2));
                this.addChild(toppanel,99,5557);
                this.mTopMenuView = toppanel;
            }
        }
        if(toppanel){
            toppanel.setVisible(true);
            toppanel.stopAllActions();
            toppanel.resetValue();
            this.mShowingTopMenu = state;
            if(state){
                toppanel.setPosition(cc.p(size.width*0.98-size_top_menu_panel.width/2,
                        size.height + size_top_menu_panel.height/2));
                var to = cc.p(size.width*0.98-size_top_menu_panel.width/2,
                        size.height - size_top_menu_panel.height/2);
                var move = cc.MoveTo.create(0.5, to);
                toppanel.runAction(move);
            }else{
                toppanel.setPosition(cc.p(size.width*0.98-size_top_menu_panel.width/2,
                        size.height - size_top_menu_panel.height/2));
                var to = cc.p(size.width*0.98-size_top_menu_panel.width/2,
                        size.height + size_top_menu_panel.height/2+10);
                var move = cc.MoveTo.create(0.5, to);
                toppanel.runAction(move);
            }
        }
    },

    /**
     * 清除显示对象
     */
    cleanShowObject:function()
    {
        for(var i=0;i<this.MAX_PLAYERNUM;i++){
            this.cleanPlayerCard(i);
        }
        this.cleanCoins();
    },

    /**
     * 清除 投注 筹码
     */
    cleanCoins:function()
    {
        while(this.mTempCoinsArray.length>0){
            var coin = this.mTempCoinsArray.shift()
            coin.stopAllActions();
            this.removeChild(coin);
        }
    },

    /**
     * 按座位号清掉 手里牌
     */
    cleanPlayerCard:function(seat)
    {
        while(this.mPlayerCardShowArray[seat].length>0){
            var card = this.mPlayerCardShowArray[seat].shift()
            this.removeChild(card);
        }
    },

    //初始化按钮
    initButtons:function(){
        var size = cc.director.getWinSize();
        if(sGameData.mIsTestNoNet){
            //btntag,x,y,img,overimg,disimg ,word,func,point,fontsize
            var testBtnData = [[0,size.width -10,size.height - 250,res.button2_png,res.button2_1_png,res.button2_png,"clean",this.reInitDataUI,cc.p(0.5,0.5),24],
                [0,size.width -10,size.height - 300,res.button2_png,res.button2_1_png,res.button2_png,"fapai",this.op_t_fapai,cc.p(0.5,0.5),24],
                [0,size.width -10,size.height - 350,res.button2_png,res.button2_1_png,res.button2_png,"chupai",this.op_t_test1,cc.p(0.5,0.5),24],
                [0,size.width -10,size.height - 400,res.button2_png,res.button2_1_png,res.button2_png,"test",this.op_t_test,cc.p(0.5,0.5),24]
            ];
            this.createWordBtnMenu(testBtnData,this);
        }



//        var opBtnData = [[this.ButtonID_FENPAi,size.width/2-100,35,sResWord.w_dn_fenpai,this.op_fenpai],
//                        [this.ButtonID_TISHI,size.width/2+100,35,sResWord.w_dn_tishi,this.op_tishi],
//                        [this.ButtonID_QIANGZ,size.width/2-100,35,sResWord.w_dn_qiangzhuang,this.op_qiangz],
//                        [this.ButtonID_BUQIANG,size.width/2+100,35,sResWord.w_dn_buqiang,this.op_buqiangz],
//                        [this.ButtonID_QIZ,size.width-100,35,sResWord.w_dn_qizhuang,this.op_qizhuang],
//                        [this.ButtonID_Bet1,size.width/2-150,35,sResWord.w_dn_1bei,this.op_bet1],
//                        [this.ButtonID_Bet2,size.width/2,35,sResWord.w_dn_2bei,this.op_bet2],
//                        [this.ButtonID_Bet3,size.width/2+150,35,sResWord.w_dn_3bei,this.op_bet3],
//                        [this.ButtonID_JX, size.width / 2, 350, sResWord.w_continue, this.op_continue]
//        ];
//        this.mOPMenu = this.createOPMenu(opBtnData,this,1);




        var opBtnData1 = [[this.ButtonID_JX,size.width / 2+100,315,"#dn_readyBtn.png","","","",this.op_continue,cc.p(0,0),24],
            [this.ButtonID_HZ,size.width / 2-100,315,res.dn_btn_changetable_png,"","","",this.op_changetable,cc.p(0,0),24],
            [this.ButtonID_BUQIANG,size.width/2-300,315,"#dn_noSelBankBtn.png","","#dn_noSelBankBtn_disable.png","",this.op_buqiangz,cc.p(0,0),24],

            [this.ButtonID_QIANGZ_1_BEI,size.width/2-100,315,"#dn_selBankBtn.png","","","",this.op_qiangz_x1,cc.p(0,0),24],
            [this.ButtonID_QIANGZ_2_BEI,size.width/2+100,315,"#dn_selBankBtn.png","","","",this.op_qiangz_x2,cc.p(0,0),24],
            [this.ButtonID_QIANGZ_4_BEI,size.width/2+300,315,"#dn_selBankBtn.png","","","",this.op_qiangz_x4,cc.p(0,0),24],

            [this.ButtonID_FENPAi,size.width/2-100,45,"#dn_showCardBtn.png","","","",this.op_fenpai,cc.p(0,0),24],
            [this.ButtonID_WUNIU,size.width/2+100,45,"#dn_noNiuBtn.png","","","",this.op_wuniu,cc.p(0,0),24],
            [this.ButtonID_SUANPAI,size.width/2+300,45,"#dn_botsBtn.png","","",sResWord.w_auto,this.op_suanpai,cc.p(0.3,0.5),32]
        ];
        this.mOPMenu = this.createWordBtnMenu(opBtnData1,this,false);
        //this.mOPMenu.setVisible(false);
        var pBetMenu = cc.Menu.create();
        pBetMenu.x = 0;
        pBetMenu.y = 0;
        this.addChild(pBetMenu, 97);

        var betnums = this.mBetValueArray;
        var callbacks = [this.op_bet1,this.op_bet2,this.op_bet3,this.op_bet4,this.op_bet5,this.op_bet6]
        var tags = [this.ButtonID_Bet1,this.ButtonID_Bet2,this.ButtonID_Bet3,this.ButtonID_Bet4,this.ButtonID_Bet5,this.ButtonID_Bet6]
        for(var i = 0;i<6;i++){
            var num = betnums[i];
            var callback = callbacks[i];
            var tag = tags[i];
            var sprite1 = this.createBetBtnSprite(0,num);
            var sprite2 = this.createBetBtnSprite(2,num);
            sprite2.setColor(cc.color(200,200,200));
            var sprite3 = this.createBetBtnSprite(1,num);
            var btnItem = cc.MenuItemSprite.create(
                sprite1,
                sprite2,
                sprite3,
                callback,this);
            btnItem.setPosition(cc.p(size.width*0.5-225+90*i,300));
            pBetMenu.addChild(btnItem);
            btnItem.setTag(tag)
        }
        pBetMenu.setVisible(false);
        this.mBetMenu = pBetMenu;



        var size_top_menu = cc.size(120,50);
        var menuSprite = createMenuButton(sResWord.w_top_menu,size_top_menu,0,1);
        var menuSprite1 = createMenuButton(sResWord.w_top_menu,size_top_menu,1,1);
        var menuSprite2 = createMenuButton(sResWord.w_top_menu,size_top_menu,0,1);
        var menuItem = cc.MenuItemSprite.create(
            menuSprite,
            menuSprite1,
            menuSprite2,
            this.op_showmenu,this);
        menuItem.setAnchorPoint(cc.p(1,1));
        menuItem.setPosition(cc.p(size.width*0.99,size.height));
        menuItem.setVisible(false);


        var faceSprite = ButtoSpritenWithSpriteInner("#game_panel_icon_bg.png", "#game_panel_face.png",cc.p(0.5,0.5), 0);
        var faceSprite1 = ButtoSpritenWithSpriteInner("#game_panel_icon_bg.png", "#game_panel_face.png",cc.p(0.5,0.5),1);
        var faceSprite2 = ButtoSpritenWithSpriteInner("#game_panel_icon_bg.png", "#game_panel_face.png",cc.p(0.5,0.5), 0);
        var faceItem = cc.MenuItemSprite.create(
            faceSprite,
            faceSprite1,
            faceSprite2,
            this.op_showGameChatFace,this);
        faceItem.setAnchorPoint(cc.p(0,0.5));
        faceItem.setPosition( cc.p(1,size.height*0.2));
        //chatItem.setVisible(false)
        faceItem.setTag(this.ButtonID_FACE);
        faceItem.setVisible(false);

        var pTopMenu = cc.Menu.create(menuItem,faceItem);
        pTopMenu.x = 0;
        pTopMenu.y = 0;
        this.addChild(pTopMenu, 1);
        pTopMenu.setTag(17001);




    },
    //创建投注 按钮 图片
    createBetBtnSprite:function(type,num){
        var bgname = "#dn_multipleBtn.png"
        if(type == 1){
            bgname = "#dn_multipleBtnDisable.png"
        }
        var bgSprite = cc.Sprite.create(bgname);
        var numshow = ShowNum.create();
        if(type == 1){
            numshow.setValue(10,num,3,1);
        }else{
            numshow.setValue(5,num,3,1,type);
        }
        numshow.setPosition(cc.p(22,32));
        if(num > 9){
            numshow.setScale(0.95);
        }
        bgSprite.addChild(numshow)

        return bgSprite;
    },
    //显示 分牌 无牛
    VisiblePlayButton:function(state,enable){
        if(enable ==null){
            enable = true;
        }
        if(this.mOPMenu){
            this.setOPBtnVisible(this.ButtonID_FENPAi,state,enable);
            this.setOPBtnVisible(this.ButtonID_WUNIU,state);
            this.setOPBtnVisible(this.ButtonID_SUANPAI,state);
        }
        if(state){
            var r = this.mDNLogic.checkHasNiu(this.mPlayerCardValueArrayChair[this.mMyChairId]);
            if(r.length == 5 ){
                cc.log("本局游戏 有牛");
                this.mHasNiu = true;
                this.setOPBtnVisible(this.ButtonID_WUNIU,state,false);
            }else{
                cc.log("本局游戏 无牛");
                this.mHasNiu = false;
                this.setOPBtnVisible(this.ButtonID_WUNIU,state,true);
            }
        }
    },
    /**
     * 显示隐藏  抢庄 、不抢 按钮
     */
    VisibleQZButton:function(state)
    {
        if(this.mOPMenu){
            //this.setOPBtnVisible(this.ButtonID_QIANGZ,state);
            this.setOPBtnVisible(this.ButtonID_BUQIANG,state);
            this.setOPBtnVisible(this.ButtonID_QIANGZ_1_BEI,state);
            this.setOPBtnVisible(this.ButtonID_QIANGZ_2_BEI,state);
            this.setOPBtnVisible(this.ButtonID_QIANGZ_4_BEI,state);
        }
    },
    /**
     * 显示隐藏  弃庄 按钮
     */
    VisibleQizButton:function(state)
    {
        if(this.mOPMenu){
            this.setOPBtnVisible(this.ButtonID_QIZ,state);
        }
    },
    //显示投注按钮
    VisibleBetButton:function(state){

        this.mBetMenu.setVisible(state);
        this.mBetBtnBg.setVisible(state);

        cc.log("VisibleBetButton="+state+this.mMaxBetMultiple);

        var tags = [this.ButtonID_Bet1,this.ButtonID_Bet2,this.ButtonID_Bet3,this.ButtonID_Bet4,this.ButtonID_Bet5,this.ButtonID_Bet6]
        for(var i = 0;i<6;i++){
            var tag = tags[i];
            if(this.mMaxBetMultiple >= this.mBetValueArray[i]){
                this.setBetBtnVisible(tag,state,true);
            }else{
                this.setBetBtnVisible(tag,state,false);
            }
        }
    },
    //显示继续按钮
    VisibleContinueButton: function (state) {
        var size = cc.director.getWinSize();
        this.mIsShowContinueBtn = state;
        if (this.mOPMenu) {
            this.setOPBtnVisible(this.ButtonID_JX, state);
            this.setOPBtnVisible(this.ButtonID_HZ, state);
            if(state){
                this.setOPBtnPos(this.ButtonID_JX,cc.p(size.width/2+100, 315))
                this.setOPBtnPos(this.ButtonID_HZ,cc.p(size.width/2-100, 315))
            }
        }
        this.mMeokSprite.setVisible(false);

    },
    VisibleChangeTableButton: function (state,type) {
        var size = cc.director.getWinSize();
        this.mIsShowContinueBtn = state;
        if (this.mOPMenu) {
            this.setOPBtnVisible(this.ButtonID_JX, false);
            this.setOPBtnVisible(this.ButtonID_HZ, state);
            if(state){
                if(type == 1){
                    this.setOPBtnPos(this.ButtonID_HZ,cc.p(size.width/2, 315))
                }else{
                    this.setOPBtnPos(this.ButtonID_HZ,cc.p(size.width/2-100, 315))
                }

            }
        }
    },

    //设置 某 操作按钮 是否显示
    setOPBtnVisible:function(tag,state,enable){
        if(enable ==null){
            enable = true;
        }
        var opbtn = this.mOPMenu.getChildByTag(tag);
        if(opbtn){
            opbtn.setVisible(state);
            opbtn.setEnabled(enable)
        }
    },
    //设置 某 操作按钮 是否显示
    setOPBtnPos: function (tag, pos) {
        var opbtn = this.mOPMenu.getChildByTag(tag);
        if (opbtn) {
            opbtn.setPosition(pos);
        }
    },



    //改变操作按钮的文字
    changeOpButton:function(tag,word){
        var pOperateMenu = this.mOPMenu;
        if(pOperateMenu){
            var buttonItem = pOperateMenu.getChildByTag(tag);
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

    },


    //设置 某 投注按钮 是否显示
    setBetBtnVisible:function(tag,state,enable){
        if(enable ==null){
            enable = true;
        }
        var opbtn = this.mBetMenu.getChildByTag(tag);
        if(opbtn){
            opbtn.setVisible(state);
            opbtn.setEnabled(enable)
        }
    },
    //接收网络数据
    //坐下
    noticeDNSitDown:function(netdata){
        cc.log("noticeDNSitDown")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            var chairId =  netdata[2]
            sGameData.mUser.chairId = chairId;
            this.mMyChairId = chairId;
            this.mBaseChairId = chairId;

            var p = this.getPlayerByIdx(sGameData.mUser.id);
            p.chairId = chairId;

            this.showPlayerByChair(chairId, 0,sGameData.mUser);
            this.mMyState = MYSTATE_SITDOWN;
            this.mChairSitDown[chairId] = SITDOWN_YES;

            sGameData.mMeStandUp = false;

            //需要重新 调整 玩家位置
            //this.baseChairChange();
        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg,1);
        }
    },
    //站起
    noticeDNStandUp:function(netdata){
        cc.log("noticeDNStandUp")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            this.showPlayerByChair(sGameData.mUser.chairId, 1, null);
            this.mChairSitDown[sGameData.mUser.chairId] = SITDOWN_NO;
            sGameData.mUser.chairId = -1;
            this.mMyChairId = -1
            this.mMyState = MYSTATE_STAND;
            sGameData.mMeStandUp = true;

            var p = this.getPlayerByIdx(sGameData.mUser.id);
            p.chairId = -1;

            this.VisibleContinueButton(false);
        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg,1);
        }
    },
    //玩家数据变化
    noticeDNNoticePlayerDataChange:function(netdata){
        cc.log("noticeDNNoticePlayerDataChange")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            var type = netdata[2];
            var player = netdata[3];
            cc.log("type="+type+"="+player.id)
            var p = this.getPlayer(player.id);
            if(type == SCORE_INFO_CHANGE){
                if(p){
                    p.xp = player.xp;
                    p.level = player.level;
                    p.softCash = player.softCash;
                    if(p.chairId!=-1){
                        this.updateGameCash(p.chairId, p.softCash, 1);
                    }
                    if(player.id == sGameData.mUser.id){
                        sGameData.mUser.softCash = p.softCash;
                        sGameData.mUser.xp = p.xp;
                        sGameData.mUser.level = p.level;
                    }
                }
            }else if(type==ENTER_ROOM_CHANGE||type==BASIC_INFO_CHANGE||type==ENTER_TABLE_CHANGE){
                if(type==ENTER_TABLE_CHANGE){
                    if(!p){
                        this.addPlayer(player);
                    }
                    p = player;
                    if(!p.chairId){
                        p.chairId = -1;
                    }
                }
            }else if(type==SITDOWN_CHANGE){
                if(p){
                    p.chairId = player.chairId;
                    cc.log("sit==="+p.chairId+"|"+p.userName);
                    this.mChairSitDown[p.chairId] = SITDOWN_YES;
                    this.showPlayerByChair(p.chairId, 0, p);
                    if (player.id == sGameData.mUser.id) {
                        sGameData.mUser.chairId = player.chairId;
                        this.mMyChairId = player.chairId;
                        this.mMyState = MYSTATE_SITDOWN;
                        this.mBaseChairId = sGameData.mUser.chairId;
                        //this.baseChairChange();
                    }
                }
            }else if(type==STANDUP_CHANGE || type==EXIT_ROOM_CHANGE || type==EXIT_TABLE_CHANGE){
                if(p){
                    if(type!=STANDUP_CHANGE){
                        this.removePlayer(p.id);
                    }
                    if(p.chairId != -1){
                        this.showPlayerByChair(p.chairId, 1, null);
                        this.mChairSitDown[p.chairId] = SITDOWN_NO;
                        p.chairId = -1;
                    }
                }
                if(player.id == sGameData.mUser.id){
                    this.mMyState = MYSTATE_STAND;
                    sGameData.mUser.chairId = -1;
                    this.mMyChairId = -1;
                    sGameData.mMeStandUp = true;
                    this.VisibleContinueButton(false);
                }
                if(this.mPlayerList.length == 1){
                    this.mGameUI.setInviteBtnEnable();
                }
            } else if (type == NOTIFY_READY) {
                if (p) {
                    var seat = this.getPlayerSeatByChairId(p.chairId)
                    this.mShowOPView.showOPImage(seat,12);
                    //SoundManager.playSound(res.zjh_readybtn_mp3);
                }
            }
        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg,1);
        }
    },
    //发牌
    noticeDNSendCard:function(netdata){
        cc.log("noticeDNSendCard")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            var cards = netdata[2];
            cc.log("cards=="+cards);
            this.mPlayerCardValueArrayChair[this.mMyChairId] = cards;


            this.initGameState();

            this.mGameState = DN_SPLIT_CARD_STATE

            if(cards.length == 0) {
                this.mFapaiStateChair[this.mMyChairId] = ISINGAME_NO;
            }
            for(var i=0;i<this.MAX_PLAYERNUM;i++){
                if(i!=this.mZhuangChairId){
                    if(this.mPlayerBetValueChair[i] == 0){
                        this.mFapaiStateChair[i] = ISINGAME_NO;
                    }
                }
            }



            this.mShowOPView.cleanAll();

            for(var i=0;i<this.MAX_PLAYERNUM;i++){
                this.cleanPlayerCard(i);
            }
            this.mIsFapaiing = false;
            this.VisibleBetButton(false);
            this.closeClock();
            this.mShowTipView.showTip(0);
            this.fapaiStart();

        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg,1);
        }
    },
    //获取抢庄玩家数量
    getQiangzPNum:function(){
        var num = 0;
        for(var i=0;i<this.MAX_PLAYERNUM;i++){
            if(this.mQiangzChair[i]==1){
                num++;
            }
        }
        return num;
    },
    //初始化游戏状态
    initGameState:function(){
        if(!this.mHasInitGameState){
            this.mHasInitGameState = true;
            cc.log("initGameState-----")
            for (var i = 0; i < this.MAX_PLAYERNUM; i++) {
                if (this.mChairSitDown[i] == SITDOWN_YES) {
                    this.mIsInGameChair[i] = ISINGAME_YSE;
                    this.mPGameStateChair[i] = PGAMESTATE_INGAME;
                    this.mFapaiStateChair[i] = 1;
                } else {
                    this.mIsInGameChair[i] = ISINGAME_NO;
                    this.mPGameStateChair[i] = PGAMESTATE_OVERGAME;
                    this.mFapaiStateChair[i] = 0;
                }
            }
        }
    },
    //通知开始投注
    noticeDNNoticeBet:function(netdata){
        cc.log("noticeDNNoticeBet")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            var gameNo = netdata[2];
            var bankChairId = netdata[3];
            var bankMultiple = netdata[4];
            var ingame = netdata[5];  //0 1
            this.mZhuangChairId = bankChairId;
            this.mZhuangSeatId = this.getPlayerSeatByChairId(bankChairId);
            this.mMaxBetMultiple = bankMultiple; //庄家能接受的最大投注

            this.mGameState = DN_BET_STATE

            var maxbet = Math.floor(sGameData.mUser.softCash/10/this.mMinBet); //闲家能接受的最大投注
            if(this.mMaxBetMultiple > maxbet){
                this.mMaxBetMultiple = maxbet;
            }

            this.VisibleContinueButton(false);
            this.mIsCheckCanChangeTableing = false;

            this.mGameUI.setInviteBtnDisable();
            cc.log("-----game start-----"+ingame)

            this.mIsInGame = true;

            this.mShowOPView.cleanAll();
            this.showZhuang(-1);
            this.reInitDataUI();
            this.initGameState();
            if(ingame == 0&&this.mMyChairId > -1){
                this.mIsInGameChair[this.mMyChairId] = 0;
            }

            cc.log(" zzz seat"+this.mZhuangSeatId+" c:"+this.mZhuangChairId +" maxb:"+this.mMaxBetMultiple);

            this.VisibleQZButton(false);

            var showqiangzanim = false;
            if(this.mHasQiangz) {
                cc.log("mHasQiangz-----")
                this.mHasQiangz = false;
                var num = this.getQiangzPNum();
                cc.log("num=="+num)
                if (num != 1) {
                    if (num == 0) {
                        for (var i = 0; i < this.MAX_PLAYERNUM; i++) {
                            if (this.mQiangzChair[i] == 2) {
                                this.mQiangzChair[i] = 1;
                            }
                        }
                    }
                    showqiangzanim = true;
                }
            }
            cc.log("showqiangzanim=="+showqiangzanim)
            if(showqiangzanim){
                this.showQiangzAnim(this.mZhuangChairId);
            }else{
                this.mQiangzChair = [0,0,0,0,0];
                this.mShowQiangzView.cleanAll();
                this.showZhuang(this.mZhuangChairId);
                this.showClock(1);
                if(this.mZhuangChairId != this.mMyChairId){
                    if(this.mIsInGameChair[this.mMyChairId]==1 && this.mMyChairId > -1){
                        this.VisibleBetButton(true);
                        this.mShowTipView.showTip(1);
                        this.showClock(0);
                    }
                }else{
                    this.mShowTipView.showTip(2);

                }

            }


        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg,1);
        }
    },
    //投注
    noticeDNBet:function(netdata){
        cc.log("noticeDNBet")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            var chairId = netdata[2];
            var bet = netdata[3];
            var seat = this.getPlayerSeatByChairId(chairId);
            cc.log("chairId=="+chairId+"  bet:"+bet +" s:"+seat);
            //
            this.mPlayerBetValueChair[chairId] = bet*this.mMinBet;
            this.startBetAnim(seat,bet*this.mMinBet);
            this.showBetNum(chairId,bet*this.mMinBet);
            //this.showSeatBet(seat,bet*this.mMinBet);
            this.playMulitySound(chairId,bet);



            if(chairId == this.mMyChairId){
                this.VisibleBetButton(false);
            }
            var index = bet-1
            if(index > -1 && index<5){
                this.mShowOPView.showOPImage(seat,index);
            }
        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg,1);
        }
    },
    //分牌
    noticeDNFenpai:function(netdata){
        cc.log("noticeDNFenpai")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            var chairId = netdata[2];
            var cards = netdata[3];
            var cardType = netdata[4];
            var seat = this.getPlayerSeatByChairId(chairId);

            cc.log("s:"+seat+" c:"+chairId+" cardType="+cardType+" ||"+cards);

            this.mPlayerCardValueArrayChair[chairId] = cards;

            //var type = this.mDNLogic.getCardType(cards);
            this.mCardTypeView.showTypeImage(seat,cardType,true);
            this.mPGameStateChair[chairId] = 1
            this.mCardTypesChair[chairId] = cardType;
            //this.playFapaiSound();

            sGameData.mIsGameShowAniming = true;

            if(this.mMyChairId!=chairId){
                this.showFenpaiResult(chairId);
            }else{
                if(!this.mMeHasFenpai){
                    this.mMeHasFenpai = true;
                    this.showFenpaiResult(chairId);
                }else{
                    this.showFenpaiResult(chairId);
                }
            }

            this.playCardTypeSound(chairId,cardType)

            if(chairId == this.mMyChairId){
                this.VisiblePlayButton(false,false);
                //this.mShowTipView.showTip(0);
            }

            var isShowAnim = false;
            if(cardType > 9){
                isShowAnim = true;
            }
            //分牌结束 到 游戏结束 间隔个时间
            if(!isShowAnim){
                var callback = cc.CallFunc.create(this.showFenpaiEnd, this);
                var delay = cc.DelayTime.create(0.7)
                var actions = cc.Sequence.create(delay,callback);
                this.runAction(actions);
            }

        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg,1);
        }
    },
    //分牌结束
    showFenpaiEnd:function(){
        sGameData.mIsGameShowAniming = false;
    },
    //抢庄
    noticeDNQiangzhuang:function(netdata){
        cc.log("noticeDNQiangzhuang")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){

            var chairId = netdata[2];
            var holdType = netdata[3]; //抢庄的类型不抢庄：1 , 抢庄：2

            this.mHasQiangz = true;

            this.playCallSound(chairId,holdType);

            var seat = this.getPlayerSeatByChairId(chairId);
            cc.log(" seat "+seat+" c:"+chairId+"--"+holdType);
            //this.showGameLog(this.mScoreNameArray[seat]+" 操作 "+type);
            if(holdType == 2){
                this.mShowOPView.showOPImage(seat,10);
                this.mShowOpTalkView.showOPImage(seat,10);
                this.mQiangzChair[chairId] = 1;
                this.mShowQiangzView.showAnim(seat);
            }else{
                this.mShowOPView.showOPImage(seat,11);
                this.mShowOpTalkView.showOPImage(seat,11);
                this.mQiangzChair[chairId] = 2;
            }

        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg,1);
        }
    },
    //通知开始抢庄
    noticeDNNoticeQiangzhuang:function(netdata){
        cc.log("noticeDNNoticeQiangzhuang")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){

            this.mGameUI.setInviteBtnDisable();
            this.VisibleContinueButton(false);
            this.mIsCheckCanChangeTableing = false;

            this.mQiangzChair = [0,0,0,0,0];
            this.showZhuang(-1);
            this.reInitDataUI();

            this.initGameState();

            this.mIsInGame = true;
            this.mGameState = DN_HOLD_BANK_STATE

            if(this.mChairSitDown[this.mMyChairId]==1&&this.mMyChairId >-1){
                //if(sGameData.mUser.softCash >= this.mMinBet*this.mZhuangNeedBei){ //10*4
                    this.mShowTipView.showTip(5);
                    this.VisibleQZButton(true);
                //}else{
                    //this.mShowTipView.showTip(6);
                    //sGameNetData.mDNNet.sendDNQiangZhuang(1)
                    //this.mShowClock.mSeat = 1;
                //}
                this.showClock(0);
            }
        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg,1);
        }
    },
    //更新筹码数量（type： 0加减； 1重置）
    updateGameCash:function(chairId,cash,type){
        cc.log("updateGameCash=="+chairId+"|"+cash+"|"+type)
        if(chairId == -1)return;
        var userhead = this.mUserHeadsArray[chairId];
        if(userhead){
            if(userhead.mShowPlayer){
                var player = this.getPlayer(userhead.mShowPlayer.id) ;
                if(player){
                    cc.log("update1")
                    if(type == 0){
                        player.softCash += cash;
                    }else if(type == 1){
                        player.softCash = cash;
                    }
                    if(player.id == sGameData.mUser.id){
                        sGameData.mUser.softCash = player.softCash
                    }
                    userhead.mShowPlayer.softCash = player.softCash;
                    userhead.updateCashInfo();
                }
            }
        }
    },
    //更新玩家筹码
    updateShowPlayerCash:function(){
        for(var i=0;i<this.MAX_PLAYERNUM;i++){
            var aHead1 = this.mUserHeadsArray[i];
            if(aHead1!=null){
                aHead1.updateCashInfo();
            }
        }
    },
    //游戏结束
    noticeDNGameOver:function(netdata){
        cc.log("noticeDNGameOver")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            cc.log("游戏结束");
            var sdata = netdata[2];
            var aScoresArray = [];
            var winList = [];

            this.mIsInGame = false;
            this.mIsGameOver = true;
            this.mIsFenpaiing = false;
            this.mShowTipView.showTip(0);

            this.mGameState = DN_NONE_STATE


            var meresult = 0;//0  1win 2lose

            for(var i = 0;i<sdata.length;i++){
                var scored = sdata[i]
                var c = scored.chairId
                var score = scored.currScore
                cc.log("c=="+i+"--|"+score);
                var seat = this.getPlayerSeatByChairId(c);
                cc.log(this.mScoreNameArray[c]+" 得分："+score);
                var isZhuang = this.mZhuangSeatId==seat?1:0;
                var cards = this.mPlayerCardValueArrayChair[scored.chairId];
                if(seat == 0){
                    aScoresArray.unshift([this.mScoreNameArray[c],score,this.mCardTypesChair[scored.chairId],isZhuang,cards]);
                }else{
                    aScoresArray.push([this.mScoreNameArray[c],score,this.mCardTypesChair[scored.chairId],isZhuang,cards]);
                }

                if(score < 0){ //输了
                    this.startBetAnim(seat,-score - this.mPlayerBetValueChair[scored.chairId]);
                }else if(score > 0){
                    winList.push([seat,score]);
                }

                var player = this.getPlayerByChairId(c)
                if(player){
                    player.softCash += score;
                    if(player.id == sGameData.mUser.id&&this.mMyChairId!=-1){
                        sGameData.mUser.softCash += score
                        if(score > 0){
                            meresult = 1;
                        }else{
                            meresult = 2;
                        }
                    }
                }
            }
            this.updateShowPlayerCash();
            this.mScoreData = [winList,aScoresArray]

            this.mScoreView.setVisible(true)
            this.mScoreView.setValue(sdata);
            this.mShowMaskView.setVisible(true);

            if(meresult > 0){
                this.mShowWinLose.setVisible(true);
                this.mShowWinLose.showResult(meresult);
            }

            //this.showWinAnimForCoin(winList,aScoresArray);
            this.mIsInGame = false;
            this.VisiblePlayButton(false,false);
            this.closeClock();
            this.mShowCalculate.setVisible(false);
            this.mShowCalculate.setValue([]);

            sGameData.mIsGameShowAniming = true;
            var callback1 = cc.CallFunc.create(this.showWinAnimForCoin,this);
            var callback = cc.CallFunc.create(this.showScoreEnd, this);
            var seq =cc.Sequence.create(cc.DelayTime.create(0.5),callback1,
                cc.DelayTime.create(1.5),callback);
            this.runAction(seq);

        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg,1);
        }
    },

    /**
     * 显示赢家的收取筹码动画
     */
    showWinAnimForCoin:function(){
        var winList =  this.mScoreData[0];
        var aScoresArray = this.mScoreData[1];
        cc.log("showWinAnimForCoin---------"+winList);
        for(var i = 0;i<winList.length;i++){
            var seat = winList[i][0];
            var acore = winList[i][1];
            if(i == winList.length-1){
                this.showBetBackAnim(seat);
            }else{
                this.showCoinBackAnim(seat,acore);
            }
        }
        //this.sleepforFunc(1000,showScoreView,aScoresArray);
    },

    //显示得分结束
    showScoreEnd:function(){
        sGameData.mIsGameShowAniming = false;
        cc.log("show score end----"+this.mMyState+sGameData.mIsSendingData+sGameData.mMeStandUp);
        if(this.mMyState == MYSTATE_SITDOWN && this.mIsInGameChair[this.mMyChairId] == ISINGAME_YSE && !this.mIsInGame){//在游戏桌\
            this.mShowTipView.showTip(3);
            this.VisibleContinueButton(true);
            this.showClock(0,1);
//            if(!sGameData.mIsSendingData&&!sGameData.mMeStandUp){
//                //sGameNetData.mDNNet.sendDNContinue();
//                sGameData.mIsSendingData = true;
//
//            }
        }
        //this.reInitDataUI();
    },
    noticeDNReRandomEnterNotify: function (netdata) {
        cc.log("noticeDNReRandomEnterNotify")
        var flag = netdata[1];
        if (flag == NET_SUCCESS) {
            var code = netdata[2];
            var msg = netdata[3];
            if(code == 1){
                this.initGameData_sys();
                showLittleNotice(msg,0,2);
            }else{
                showNotice(sResWord.w_notice, msg,2,0);
            }
        }else {
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
            sGameData.mUser.dnbotnum = 0;
            this.updateDBotNum();
        }
    },
    //踢出玩家
    noticeDNKickPlayer:function(netdata){
        cc.log("noticeDNKickPlayer")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            showNeedPayNotice(1,sResWord.w_tip_needpay)
        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg,1);
        }
    },
    //聊天
    noticeDNChat:function(netdata){
        cc.log("noticeDNChat")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            var chair = netdata[2];
            var type = netdata[3];
            var chatId = netdata[4];
            var msg = netdata[5];
            var tochair = netdata[6];

            var seat = this.getPlayerSeatByChairId(chair)
            var toseat = this.getPlayerSeatByChairId(tochair)
            cc.log("chair=="+chair+"|"+tochair)
            cc.log("seat=="+seat+"|"+toseat)
            if(type == 1) {
                var sex = this.mSexArray[chair];
                var msg = this.mDNLogic.mTalkMsg[sex][chatId];
                this.playTalkSound(sex, chatId);
                this.mChatView.showMsg(seat, msg)
                cc.log("chair==" + chair + "|" + tochair)
            }else if(type == 2){
                var size = cc.director.getWinSize();
                var pos0 = cc.p(size.width/2 - 107,size.height/2 - 160)
                var pos1 = cc.p(size.width/2 + 407,size.height/2 - 54)
                var pos2 = cc.p(size.width/2 + 407,size.height/2 + 160)
                var pos3 = cc.p(size.width/2 - 407,size.height/2 + 160)
                var pos4 = cc.p(size.width/2 - 407,size.height/2 - 54)
                var pos =  [pos0,pos1,pos2,pos3,pos4];
                showInterative(seat,toseat,chatId,pos,this);
            }else if(type == 5) {
                this.playFaceSound(chatId);
                this.mShowFace.showFaceImage(seat, chatId)
                cc.log("chair==" + chair + "|" +chatId)

            }else if(type == 3){
                this.mChatView.showMsg(seat, msg);
                var player = this.getPlayerByChairId(chair);
                if(player){
                    var cmsg = {}
                    cmsg.chairId = chair;
                    cmsg.fromId = player.id;
                    cmsg.name = player.nickName;
                    cmsg.content = msg;
                    cmsg.createTime = (new Date()).getTime();
                    sGameData.mShowChatList.push(cmsg);
                    if(sGameData.mShowChatList.length>30){
                        sGameData.mShowChatList.splice(0,1);
                    }
                    this.mChatInputView.updateMsg();
                }
            }

        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },
    //玩家信息
    noticeDNPlayerInfo: function (netdata) {
        cc.log("noticeDNPlayerInfo")
        var flag = netdata[1];
        if (flag == NET_SUCCESS) {
            var player = netdata[2];
            var theplayer = this.getPlayerByIdx(player.id);
            if(theplayer){
                theplayer.xp = player.xp
                theplayer.winCount = player.winCount
                theplayer.loseCount = player.loseCount
                theplayer.maxScore = player.maxScore
                theplayer.maxCardType = player.maxCardType
                theplayer.maxCard = player.maxCard
                theplayer.maxCards = player.maxCards
                theplayer.bFriend = player.bFriend
                updateGamePlayerInfo(theplayer);
            }
        }else {
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },

    noticeDNUseToolsBots: function (netdata) {
        cc.log("noticeDNUseToolsBots")
        var flag = netdata[1];
        if (flag == NET_SUCCESS) {
            var count = netdata[2] ;
            sGameData.mUser.dnbotnum = count;
            //showLittleNotice(sResWord.w_dn_usetool_ok+":"+count);

            this.updateDBotNum();

            this.VisiblePlayButton(false,true);
            this.mShowCalculate.setVisible(false);
            this.mShowCalculate.setValue([]);

        }else {
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
            sGameData.mUser.dnbotnum = 0;
            this.updateDBotNum();
        }
    },

    updateDBotNum:function(){
        var word = ""+sGameData.mUser.dnbotnum;
        //this.changeOpButton(this.ButtonID_SUANPAI,word);
    },

    //点击时隐藏某些界面
    hiddenUIWithClick:function(pos){

        if (!this.checkClickView(this.mSettingView,pos)) {
            this.mSettingView.setVisible(false);
        }
        if (this.mShowingTopMenu) {
            if (!this.checkClickView(this.mTopMenuView, pos)) {
                this.showTopMenuPanel(false);
            }
        }

        if (this.mMissionView) {
            if (!this.checkClickView(this.mMissionView, pos)) {
                this.showMission(false);
            }
        }

        this.hiddenUIWithClick_chat(this.mShowTalkView,pos,3);

        this.hiddenUIWithClick_chat(this.mChatFaceView,pos,3);

        this.hiddenUIWithClick_chat(this.mChatInputView,pos,3);


    },
    //检查是否点击到顶层界面
    isClickToTopView:function(pos){
        var isclicked = false;

        if (this.mShowingTopMenu) {
            if (this.checkClickView(this.mTopMenuView, pos)) {
                isclicked = true;
            }
        }
        if(this.checkClickView(this.mSettingView,pos)){
            isclicked = true;
        }

        if(this.checkClickView(this.mMissionView,pos)){
            isclicked = true;
        }

        if(this.checkClickView(this.mChatInputView,pos)){
            isclicked = true;
        }

        if(this.checkClickView(this.mShowTalkView,pos)){
            isclicked = true;
        }

        if(this.checkClickView(this.mChatFaceView,pos)){
            isclicked = true;
        }

        return isclicked;
    },
    //点击开始
    onTouchBegan_g:function(pos){
        //cc.log("onTouchBegan--")
        sGameData.mClickState = 1;
        this.mTouchSeat = -1;
        this.hiddenUIWithClick(pos)
        if(!checkButtonEnable()){
            return;
        }
        var isclicked = this.isClickToTopView(pos)
        if(!isclicked){
            var touchSeat = this.selectSeatForTouch(pos);
            cc.log("touchSeat=="+touchSeat);
            if(touchSeat != -1){
                this.mTouchSeat = touchSeat
            }
        }
    },
    //点击移动
    onTouchMoved_g:function(pos){

    },
    //点击结束
    onTouchEnded_g:function(pos){
        //cc.log("onTouchEnded--")
        if(!checkButtonEnable()){
            return;
        }
        if(sGameData.mClickState == 1){
            sGameData.mClickState = 2;
            if(this.mTouchSeat!=-1){
                var touchSeat = this.selectSeatForTouch(pos);
                cc.log("touchSeat=="+touchSeat);
                if(touchSeat != -1 && this.mTouchSeat == touchSeat){
                    this.clickSeat(touchSeat);
                }
            }else{
                this.checkFace(pos);
                this.clickCard(pos)
            }
        }
    },
    onTouchCancelled_g:function(pos){
        //cc.log("onTouchCancelled--")
    },

    //检测点击表情
    checkFace:function(pos){
        var index = -1;
        if(this.mChatFaceView&&this.mChatFaceView.visible){
            index = this.mChatFaceView.checkClickFace(pos);
        }
    },
    //点击某位置
    clickSeat:function(seat){
        if(seat == -1) return;

        var chairIdx = this.getPlayerChairIdBySeat(seat);
        cc.log("clickSeat=="+seat+"="+chairIdx+"|"+this.mChairSitDown[chairIdx]);
        if(this.mChairSitDown[chairIdx] == SITDOWN_NO){
            if(!sGameData.mUseRandomSit){
                if(this.mMyState == MYSTATE_STAND){//坐下
                    playClickSound();
                    cc.log("sitdown ");
                    if(sGameData.mUser.softCash < sGameData.mCurrRoom.enterPoint){
                        //showLittleNotice(sResWord.w_softcash_notenough);
                        showNeedPayNotice(0,sResWord.w_tip_needpay)
                    }else {
                        if (!sGameData.mIsSendingData) {
                            sGameData.mSitDownChairIdx = chairIdx;
                            sGameNetData.mDNNet.sendDNSitDown(chairIdx);
                            sGameData.mIsSendingData = true;
                        }
                    }
                }else{//邀请别人游戏
                    cc.log("invite player");
                }
            }
        }else{//查看玩家信息
            cc.log("see player");
            //var player = this.getPlayerByChairId(chairIdx);
            //showGamePlayerInfo(true,player,3,1);
            //sGameNetData.mDNNet.sendDNPlayerInfo(player.id);
        }
    },
    //每个位置的范围
    seatRect:function(seat){
        var size = cc.director.getWinSize();
        var pos0 = cc.p(size.width/2 - 107,size.height/2 - 174)
        var pos1 = cc.p(size.width/2 + 407,size.height/2 - 54)
        var pos2 = cc.p(size.width/2 + 407,size.height/2 + 160)
        var pos3 = cc.p(size.width/2 - 407,size.height/2 + 160)
        var pos4 = cc.p(size.width/2 - 407,size.height/2 - 54)
        var pos =  [pos0,pos1,pos2,pos3,pos4];
        //var pos =  [[200,100],[size.width-80,158],[size.width-80,358],[size.width-80,558],[80,558],[80,358]];
        var size_player_shadow = cc.size(145, 146);
        var x = pos[seat].x;
        var y = pos[seat].y;
        var width = size_player_shadow.width;
        var height = size_player_shadow.height;
        return cc.rect(x-width/2,y-height/2, width, height);
    },
    //选择点击的位置 没点中为－1
    selectSeatForTouch:function(pos){
        var touchSeat = -1;
        //触摸点坐标
        var p = pos;
        for(var i=0;i<this.MAX_PLAYERNUM;i++){
            var rect = this.seatRect(i);
            if(cc.rectContainsPoint(rect,p)){       //判断鼠标拖拉的区域是否在位置上
                touchSeat = i;
                break;
            }
        }
        return touchSeat;
    },


    //检查点击到那张牌
    checkClickCard:function(pos){
        //cc.log("checkClickCard=="+pos.x+"="+pos.y);
        var len = this.mPlayerCardShowArray[0].length;
        for(var i = len-1;i>-1;i--){
            var acard = this.mPlayerCardShowArray[0][i];
            if(acard.checkClick(pos)){
                cc.log("click = "+acard.mIndex+"="+acard.mCardValue);
                return acard;
            }
        }
        return null;
    },
    //检测点击牌
    clickCard:function(pos){
        if(!this.mIsInGame) return
        var card = this.checkClickCard(pos);
        if(card&&!card.mDisable){
            card.cardClicked();

            var values = this.getChooseCardValues();
            this.mShowCalculate.setValue(values);

            if(this.getChooseCardNum()==3){
                this.VisiblePlayButton(true,true);

                this.doCheckFenpai();
                var type = this.mDNLogic.getCardType(this.mPlayerFenCardValueArray);//mApp.randRange(0,14);
                this.mCardTypeView.showTypeImage(0,type);

            }else{
                this.VisiblePlayButton(true,false);
                this.mCardTypeView.cleanOP(0);
            }
        }
    },
    //返回主界面
    gotoMain:function(){
        if (sGameData.mUseRandomSit) {
            gotoSceneByLoading(TargetSceneMain, 3);
        } else {
            gotoSceneByLoading(TargetSceneMain, 1);
        }
    },
    //播放声音
    playCardTypeSound:function(chairId,type){
        var sex = this.mSexArray[chairId];
        var typesounds0 = [res.dn_ox_0_0_mp3,res.dn_ox_1_0_mp3,res.dn_ox_2_0_mp3,res.dn_ox_3_0_mp3,res.dn_ox_4_0_mp3,
            res.dn_ox_5_0_mp3,res.dn_ox_6_0_mp3,res.dn_ox_7_0_mp3,res.dn_ox_8_0_mp3,res.dn_ox_9_0_mp3,
            res.dn_ox_10_0_mp3,res.dn_ox_11_0_mp3,res.dn_ox_12_0_mp3,res.dn_ox_13_0_mp3,res.dn_ox_14_0_mp3]
        var typesounds1 = [res.dn_ox_0_1_mp3,res.dn_ox_1_1_mp3,res.dn_ox_2_1_mp3,res.dn_ox_3_1_mp3,res.dn_ox_4_1_mp3,
            res.dn_ox_5_1_mp3,res.dn_ox_6_1_mp3,res.dn_ox_7_1_mp3,res.dn_ox_8_1_mp3,res.dn_ox_9_1_mp3,
            res.dn_ox_10_1_mp3,res.dn_ox_11_1_mp3,res.dn_ox_12_1_mp3,res.dn_ox_13_1_mp3,res.dn_ox_14_1_mp3]
        var typesounds = [typesounds0,typesounds1];
        var sound = typesounds[sex][type];
        SoundManager.playSound(sound);
    },
    playMulitySound:function(chairId,num){
        var sex = this.mSexArray[chairId];
        var sound = "";
        switch (num){
            case 1:
            {
                if(sex == 0) {
                    sound = res.dn_mulity_1_0_mp3
                }else{
                    sound = res.dn_mulity_1_1_mp3
                }
            }
                break;
            case 2:
            {
                if(sex == 0) {
                    sound = res.dn_mulity_2_0_mp3
                }else{
                    sound = res.dn_mulity_2_1_mp3
                }
            }
                break;
            case 5:
            {
                if(sex == 0) {
                    sound = res.dn_mulity_5_0_mp3
                }else{
                    sound = res.dn_mulity_5_1_mp3
                }
            }
                break;
            case 8:
            {
                if(sex == 0) {
                    sound = res.dn_mulity_8_0_mp3
                }else{
                    sound = res.dn_mulity_8_1_mp3
                }
            }
                break;
            case 10:
            {
                if(sex == 0) {
                    sound = res.dn_mulity_10_0_mp3
                }else{
                    sound = res.dn_mulity_10_1_mp3
                }
            }
                break;
            case 15:
            {
                if(sex == 0) {
                    sound = res.dn_mulity_15_0_mp3
                }else{
                    sound = res.dn_mulity_15_1_mp3
                }
            }
                break;
        }
        if(sound.length > 0){
            SoundManager.playSound(sound);
        }

    },
    playTalkSound:function(sex,index){
        var sound = this.mDNLogic.mTalkSound[sex][index];
        SoundManager.playSound(sound,false,SOUND_TALK);
    },
    playFaceSound:function(index){
        var sound = this.mDNLogic.mFaceSound[index];
        cc.log("playFaceSound=="+sound);
        SoundManager.playSound(sound,false,SOUND_TALK);
    },
    playCallSound:function(chairId,type){
        var sex = this.mSexArray[chairId];
        var sound = res.dn_call_1_0_mp3;
        if(type == 1){
            if(sex == 0){
                sound = res.dn_call_1_0_mp3;
            }else{
                sound = res.dn_call_1_1_mp3;
            }
        }else{
            if(sex == 0){
                sound = res.dn_call_2_0_mp3;
            }else{
                sound = res.dn_call_2_1_mp3;
            }
        }
        SoundManager.playSound(sound);
    },
    playBGMusic:function(){
        SoundManager.playBGMusic(res.bg_music_game_mp3);
    }




});

DNLayer.create = function () {
    var sg = new DNLayer();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};
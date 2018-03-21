/**
 * Created by Administrator on 14-5-13.
 * 扎金花
 */
var ZJHLayer = BaseGameLayer.extend({  //BaseGameLayer  cc.Layer
    mMyState: 0,//我的状态 0未坐下 1已坐下
    mMyChairId: -1,//我的椅子号
    mUseVipShow:1,//使用vip桌面
    //下面的都以椅子号为准
    //mBaseChairId:0,//作为基准的 椅子号
    mSeeCardChair: [],//各家是否看牌
    mPGameStateChair: [],//位置上的状态 0可以比 1已经比输了
    mCompareChair: [0, 0],//参与比牌的2家  位置

    mBetValueArray: [5, 10, 20, 50, 100],//可以投注的值 根据配置变化
    mLastBetIndex: 0,//当前投注 的编号（换算成暗牌的）
    mChooseIndex: 0,//自己选择的投注编号
    mMinIndex: 0,//投注的最小 编号
    mMaxIndex: 0,//最大编号

    mPBetNumsChair: [0, 0, 0, 0, 0],//玩家各自下注值 按椅子号
    mPlayerCardValueArrayChair: [],//各家牌值

    mLunNumChair:[0,0,0,0,0],// 各家轮数（直接没参加游戏时 判断轮数）

    mRoundSee: 0,//多少轮之后可以看牌
    mRoundBi: 0,//多少轮之后可以比牌
    mRoundMaxBi: 0,//多少轮之后必须比牌

    mFapaiChair: 0,//发牌座位号
    mFapaiNum: 0,//发牌张数  0-2

    mLeaveChair: [0,0,0,0,0],//游戏中离开的玩家

    mCompareAction: [], //比牌操作  //[位置，开始移动状态0开始1结束，开始返回状态0开始1结束,2num,3num]
    mCompareCardXY: [],//比牌  移动到得位置


    mPlayerCardShowArray: [],//各家牌 显示集合

    mMaxShowBetCoin: 150,//显示的最大投币数(超过这个值 就不再显示)
    mTempCoinsArray: [],//投注 硬币显示

    mZhuangChairId: 0,//庄椅子号
    mActiveChairId: -1,//当前操作玩家

    mVSFromChairId: -1,//发起比牌的
    mVSOtherChairId: -1,//被比的
    mVSWinChairId: -1,	//赢的

    mJiCardData:null,//鸡牌信息 cards prize 1:0:10000

    mTempTime: 0,//时钟 临时时间
    mCurrOperateTime: 0,//时钟 已过时间
    mShowClock: false,//显示时钟
    mClockChairIdx: 0, //时钟 椅子号

    mWinChairId:-1,//最后获胜玩家椅子号
    mIsShowOverAnim:false,//正在显示结束动画

    mChangeNum:0,//调整位置时使用

    mLoopNum: 0,//第几轮（根据各家的判断）

    mBetNum: 0,//投注额（自己打算投的）
    mMinBet: 5,//最小下注
    mMaxBet: 100,//最大 封顶

    mAllBetNum: 0,//所有人下注总额
    mLastBetNum: 0,//最后一位投注额（已经投了的）
    mLastChairId: -1,//最后一位  操作者 椅子号
    mAnBetNum: 0,//暗注值

    mIsAllGening:false,//是否跟到底

    mIsBipaiing: false,//是否正在比牌
    mIsShowBetBtn: false,//是否在显示投注按钮
    mIsShowPlayBtn:false,//是否在现实操作按钮
    mIsShowContinueBtn:false,//继续按钮

    mChairShowArray: [],//椅子显示
    mBetNumShowsArray: [],//投注显示

    mShowingTopMenu: false, //在显示 顶部 菜单 按钮

    mZJHLogic: null,//扎金花逻辑
    mShowWinLose: null,//比牌时 显示 爆炸
    mOPMenu: null,//操作菜单 跟注 加注 看牌 比牌 弃牌
    mBetMenu: null,//投注菜单  1 2 5 10 20
    mBiMenu: null,// 比牌菜单
    mShowCardType: null,//牌型提示 和 明 弃牌
    mShowAllBet: null,//总注 暗注
    mShowChooseBet: null,//显示选中的 投注  （现在就只有 投注菜单的背景）
    mScoreView: null,// 得分
    mTopMenuView: null,// 顶部菜单 离开 站起 设置
    mSettingView: null,// 设置界面
    mShowTalkView:null,// 选择聊天语句界面
    mChatFaceView:null,//选择聊天表情
    mChatInputView:null,//输入聊天
    mShowFace:null,//显示表情
    mChatView:null,//显示 聊天
    mJiCardView:null,//鸡牌显示
    mShowOPView:null,// 显示操作
    mEffectSprite:null,//效果sprite 比牌时闪电
    mVSSprite:null,//比牌时vs
    mPKLBgSprite:null,
    mPKRBgSprite:null,
    mPKXSprite:null,
   // mShowWinCoinView:null,// 显示 自己赢了 收取金币动画
    mBtnWaitSprite:null,// 下方 按钮 等待 sprite
    mMissionView:null,//任务
    mWinBgSprite:null,//获胜背景

    mMeokSprite:null,

    mShowMaskView:null,//比牌时遮罩
    mAllGenCheck:null,

    mIsCheckCanChangeTableing:false,//要是1个人在桌子上10s 显示换桌
    mStartTimeCheckCanChangeTable:0,//

    mIsChangeTableWhenBipai:false,//比牌时换桌


    mQuitClock:null,

    //按钮 tag
    ButtonID_KANPAI: 10001,
    ButtonID_GENZHU: 10002,
    ButtonID_JIAZHU: 10003,
    ButtonID_QIPAI: 10004,
    ButtonID_RESET: 10005,
    ButtonID_BIPAI: 10006,
    ButtonID_ALLGEN: 10007,
    ButtonID_OPENCARD: 10008,

    ButtonID_BIPAI1: 10051,
    ButtonID_BIPAI2: 10052,
    ButtonID_BIPAI3: 10053,
    ButtonID_BIPAI4: 10054,

    ButtonID_JX: 30101,
    ButtonID_FH: 30102,
    ButtonID_CHANGETABLE: 30103,

    ButtonID_Bet0: 20001,
    ButtonID_Bet1: 20002,
    ButtonID_Bet2: 20003,
    ButtonID_Bet3: 20004,
    ButtonID_Bet4: 20005,

    ButtonID_CHAT: 40001,
    ButtonID_MISSION: 40002,
    ButtonID_TOPMENU: 40003,

    ButtonID_FACE: 40004,



    self: null,
    //初始化
    init: function () {
        var bRet = false;
        if (this._super()) {

            sGameData.mZJHLayer = this;
            sGameData.mCurrLayer = this;
            log("ZJHLayer start");
            this.mUseVipShow = sGameData.mZJHGameScene.mUseVipShow;

            this.mSitDownNoWait = true;//是否直接坐下
            this.MAX_PLAYERNUM = 5;// 设置游戏的最大玩家数

            //this.scheduleOnce(this.initInSecondFrame, 0.05);
            self = this;
            bRet = true;
        }
        return bRet;
    },
    onEnter:function(){
        this._super();
        this.scheduleOnce(this.initInSecondFrame,0.05);
    },
    //退出时 执行操作
    onExit: function () {
        this._super();
        this.removeListeners();
        sGameData.mZJHLayer = null;
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
    update: function () {

        //if(this.mIsCheckCanChangeTableing){
        //    var now = (new Date()).getTime();
        //    if(now - this.mStartTimeCheckCanChangeTable > sGameData.mShowChangeTableBtnTime * 1000){
        //        this.mIsCheckCanChangeTableing = false;
        //        if(this.mPlayerList.length == 1){
        //            this.VisibleChangeTableButton(true);
        //        }
        //    }
        //}


        if (this.mShowClock) { //显示时钟
            var aClockTime = sGameData.mZJHOpTime;
            var now = (new Date()).getTime();
            var dur = now - this.mTempTime;
            var v = sGameData.operateTimeVector;
            var seat = this.getPlayerSeatByChairId(this.mClockChairIdx);
            if(seat ==0){
                v = sGameData.operateTimeVector1;
            }


            this.mCurrOperateTime = Math.floor(dur / (aClockTime * 1000.0) * v.length);

            if (this.mCurrOperateTime >= v.length) {
                this.mCurrOperateTime = 0;
                this.mTempTime = now;
//                if(this.mActiveChairId ==this.mMyChairId){
//                    //this.clockTimeOver();
//                }
            }
            if (this.mUserHeadsArray.length > 0) {
                var userHead = this.mUserHeadsArray[this.mClockChairIdx];
                if (userHead) {
                    userHead.showClock(this.mCurrOperateTime);
                }
            }
        }
    },
    //第2帧 初始化
    initInSecondFrame: function () {
        var size = cc.director.getWinSize();

        if (sGameData.operateTimeVector == null) { //时钟的参数
            sGameData.operateTimeVector = setOperateTimeArr(cc.p(-3, -3), cc.p(120 + 3, 168 + 3), 6, 10);
            log("v.length==" + sGameData.operateTimeVector.length)
        }
        if (sGameData.operateTimeVector1 == null) { //时钟的参数
            sGameData.operateTimeVector1 = setOperateTimeArr(cc.p(-3, -3), cc.p(240 + 3, 120 + 3), 6,10);
            log("v1.length==" + sGameData.operateTimeVector1.length)
        }
        //获取 桌子的配置数据
        if (sGameData.mCurrTable != null) {
            this.mMinBet = sGameData.mCurrTable.minBet;
            this.mRoundSee = sGameData.mCurrTable.seeRound;
            this.mRoundBi = sGameData.mCurrTable.compareRound;
            this.mRoundMaxBi = sGameData.mCurrTable.endRound;
            log("rsee=" + this.mRoundSee);
            log("rbi=" + this.mRoundBi);
            log("rmaxbi=" + this.mRoundMaxBi);
        }else{
            log("error:no mCurrTable info");
        }
        for (var i = 0; i < this.MAX_PLAYERNUM; i++) {
            this.mChairSitDown[i] = 0;
        }
        this.mPlayerList = [];

        this.mZJHLogic = new ZJHLogic();
        this.mZJHLogic.init();

        this.initGameData();
        this.setBetValueArray();

        var tempX = (size.width-960)*0.18;
        this.mOPBtnSize = cc.size(185+tempX, 64);//64

        this.mCompareCardXY = [
            [size.width / 2 - 190, size.height - 261],
            [size.width / 2 + 100, size.height - 261]
        ];//比牌  移动到得位置


        //ui 按钮
        var gameui = ZJHGameUI.create();
        this.addChild(gameui,55);
        this.mGameUI = gameui;


        //显示总注 暗注 轮数
        var showAllBet = ZJHShowAllBet.create();
        showAllBet.setPosition(cc.p(size.width / 2, size.height * 0.90));
        this.addChild(showAllBet, 4);
        this.mShowAllBet = showAllBet;

        //显示 投注按钮 背景
        var showChooseBet = ZJHShowChooseBet.create();
        showChooseBet.setPosition(cc.p(size.width-77, 210));
        this.addChild(showChooseBet, 79);
        showChooseBet.setVisible(false);
        this.mShowChooseBet = showChooseBet

        //显示牌型
        var showCardType = ZJHShowCardType.create();
        this.addChild(showCardType, 55);
        this.mShowCardType = showCardType

        //显示操作类型 看牌 弃牌
        var showop = ZJHShowOP.create()
        this.addChild(showop,55);
        this.mShowOPView = showop;
        //得分
        var showScore = ZJHScore.create();
        this.addChild(showScore, 60);
        showScore.setVisible(false);
        this.mScoreView = showScore;
        //设置
        var setting = GameSetting.create();
        setting.x = size.width / 2;
        setting.y = size.height / 2;
        this.addChild(setting, 205);
        setting.setVisible(false);
        this.mSettingView = setting;
        //选择聊天语句
        var talk = GameChatMsg_yellow.create(2);
        talk.x = size.width / 2;
        talk.y = size.height / 2;
        this.addChild(talk,200);
        talk.setVisible(false);
        this.mShowTalkView = talk;

        var chatinput = GameChatInput_yellow.create(2);
        chatinput.x = size.width / 2;
        chatinput.y = size.height / 2;
        this.addChild(chatinput,200);
        chatinput.setVisible(false);
        this.mChatInputView = chatinput;

        //选择聊天表情
        var face = GameChatFace_yellow.create(2);
        face.x = size.width / 2;
        face.y = size.height / 2;
        this.addChild(face,200);
        face.setVisible(false);
        this.mChatFaceView = face;
        //显示表情
        var showface = GameShowChatFace.create(2);
        this.addChild(showface,83);
        this.mShowFace = showface;


        //显示聊天语句
        var chat = GameShowChatMsg.create(2);
        this.addChild(chat,55);
        this.mChatView = chat;


        var jicardInfo = ZJHJiCardInfo.create()
        jicardInfo.setPosition(cc.p(size.width / 2,size.height / 2+100));
        this.addChild(jicardInfo,120);
        jicardInfo.setVisible(false);
        this.mJiCardView = jicardInfo;

        //比牌显示 输赢
        var biwinlose = ZJHWinLose.create();
        this.addChild(biwinlose, 65);
        this.mShowWinLose = biwinlose;
        //比牌 闪电
        var effectSprite = cc.Sprite.create("#blank.png");
        effectSprite.setVisible(false);
        effectSprite.setPosition(cc.p(size.width / 2 , size.height - 200));
        this.addChild(effectSprite,65);
        this.mEffectSprite = effectSprite

        //遮罩 得分时显示
        var colorlayer = cc.LayerColor.create(cc.color(0,0,0,80))
        this.addChild(colorlayer,50);
        this.mShowMaskView = colorlayer;
        colorlayer.setVisible(false);

        var pklbgSprite = cc.Sprite.create("#zjh_pk_lbg.png");
        pklbgSprite.setVisible(false);
        pklbgSprite.setAnchorPoint(1,0.5);
        pklbgSprite.setPosition(cc.p(size.width / 2 , size.height - 200));
        this.addChild(pklbgSprite,55);
        this.mPKLBgSprite = pklbgSprite

        var pkrbgSprite = cc.Sprite.create("#zjh_pk_rbg.png");
        pkrbgSprite.setVisible(false);
        pkrbgSprite.setAnchorPoint(0,0.5);
        pkrbgSprite.setPosition(cc.p(size.width / 2 , size.height - 200));
        this.addChild(pkrbgSprite,55);
        this.mPKRBgSprite = pkrbgSprite

        var pkxSprite = cc.Sprite.create("#zjh_pk_x.png");
        pkxSprite.setVisible(false);
        pkxSprite.setPosition(cc.p(size.width / 2 , size.height - 250));
        this.addChild(pkxSprite,65);
        this.mPKXSprite = pkxSprite

        //比牌 vs
        var vsSprite = cc.Sprite.create("#zjh_pk.png");
        vsSprite.setVisible(false);
        vsSprite.setPosition(cc.p(size.width / 2 , size.height - 250));
        //vsSprite.setScale(0.5);
        this.addChild(vsSprite,65);
        this.mVSSprite = vsSprite
//        //自己赢 收取金币
//        var showwincoin = ZJHShowWinCoin.create();
//        this.addChild(showwincoin, 80);
//        showwincoin.setVisible(false);
//        this.mShowWinCoinView = showwincoin;

        //赢家背景
        var winbg = cc.Sprite.create("#zjh_epop.png");
        winbg.setPosition(cc.p(size.width / 2 , size.height/2));
        this.addChild(winbg,4);
        this.mWinBgSprite = winbg;
        this.mWinBgSprite.setVisible(false);


        sGameData.mZJHGameScene.cleanCommands();

        this.initTablesView();

        dealClickTouch(this);
        if (sGameData.mIsTestNoNet) {
            this.initTestData();
        }
        showUILoadWait(false);

        //我点继续后
        var meokSprite = cc.Sprite.create(res.g_ok_png);
        meokSprite.setPosition(cc.p(size.width / 2 +85, 293));
        this.addChild(meokSprite,65);
        meokSprite.setVisible(false);
        this.mMeokSprite = meokSprite


        var msg = sResWord.w_basepoint_zjh+":"+formatcash(this.mMinBet);
        var topLabel = cc.LabelTTF.create(msg,sGameData.mFontname,22);
        topLabel.setAnchorPoint(cc.p(0,0.5));
        topLabel.setPosition(cc.p(5,size.height-35));
        topLabel.setTag(8001);
        this.addChild(topLabel);
        topLabel.setColor(cc.color(231,199,80))

        //进入游戏前，发的进入桌子指令
        if(sGameData.mEnterTableData&&sGameData.mEnterTableData.length>0) {
            this.handleEnterTableData();
            this.initGameScene();
            sGameData.mEnterTableData = null;
        }
        this.initButtons();
        this.playBGMusic();
        this.mHasInitView = true;
    },
    showMinBet:function(){
        //this.mShowAllBet.showMinBet();
        var topLabel = this.getChildByTag(8001)
        if(topLabel){
            var msg = sResWord.w_basepoint_zjh+":"+formatcash(this.mMinBet);
            topLabel.setString(msg)
        }
    },
    //直接换桌
    handleEnterTableDataInGame:function(){
        log("--handleEnterTableDataInGame==="+this.mBaseChairId)
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
    },
    initGameData_sys:function(){
        for (var i = 0; i < this.MAX_PLAYERNUM; i++) {
            this.mChairSitDown[i] = 0;
        }
    },
    //初始化游戏数据
    initGameData: function () {
        log("initGameData---" + this.MAX_PLAYERNUM)
        for (var i = 0; i < this.MAX_PLAYERNUM; i++) {
            this.mPlayerCardShowArray[i] = [];
            this.mPlayerCardValueArrayChair[i] = [];
            this.mPGameStateChair[i] = 0;
            this.mSeeCardChair[i] = 0;
            this.mIsInGameChair[i] = 0;
            this.mPBetNumsChair[i] = 0;
            this.mFapaiStateChair[i] = 0;
        }
        this.mLastBetIndex = 0;

        this.mTempCoinsArray = [];

        this.mBetNum = this.mMinBet;
        this.mAllBetNum = 0;
        this.mLoopNum = 0;
        this.mAnBetNum = 0;
        this.mLunNumChair = [0,0,0,0,0]
        this.mLeaveChair = [0,0,0,0,0]

        this.mIsAllGening = false;


    },
    //重新初始化 界面和 数据 （重新开始游戏时调用）
    reInitDataUI: function () {
        log("test");
        this.cleanShowObject();
        this.initGameData();
        this.closeAllButton();
        this.closeClock();
        this.mShowAllBet.showAllBet();
        this.mShowCardType.cleanAll()
        this.showZhuang(-1);
        this.mScoreView.cleanAll();
        this.mScoreView.setVisible(false);
        for(var i=0;i<this.MAX_PLAYERNUM;i++){
            this.showBetNum(i);
        }
        //this.mShowWinCoinView.stopAnim();
        this.mShowAllBet.showAnimOver();
        this.mWinBgSprite.setVisible(false);
        this.mVSSprite.setVisible(false);
        if(this.mAllGenCheck){
            this.mAllGenCheck.setVisible(false);
        }
    },
    //初始化 桌子 显示 （桌子 椅子 头像 投注）
    initTablesView: function () {
        var size = cc.director.getWinSize();
        //画游戏桌面
        //var tablebg = "#game_table_bg_vip.png"
        //
        //var desk = cc.Sprite.create(tablebg);
        //desk.setPosition(cc.p(size.width / 2, size.height / 2 + 30));
        //this.addChild(desk, 1);

        this.initUserHead(ZJHUserHead);
        this.mChairShowArray = [];
        for (var i = 0; i < this.MAX_PLAYERNUM; i++) {
            //this.initChair(i)
            this.initBetNumShow(i);
        }
    },

    //初始化椅子
    initChair: function (seat) {
        //var chairShow = ZJHChairShow.create(seat)
        //chairShow.setXY();
        //this.addChild(chairShow);
        //this.mChairShowArray.push(chairShow);
    },
    /**
     * 初始化玩家 头像
     */
    initUserHead: function (theShowUserHead) {
        log("initUserHead_Basic=" + this.MAX_PLAYERNUM);
        this.mUserHeadsArray = [];
        for (var i = 0; i < this.MAX_PLAYERNUM; i++) {
            var aUserHead = theShowUserHead.create(i);
            aUserHead.setChair(i);
            if (!sGameData.mIsTestNoNet) {
                aUserHead.setVisible(false);
            }
            aUserHead.setXY();
            this.addChild(aUserHead, 5);
            this.mUserHeadsArray.push(aUserHead);
        }
    },

    //初始化投注显示
    initBetNumShow: function (seat) {
        var size = cc.director.getWinSize();
        var betshow = ZJHBetNumShow.create(seat);
        if (betshow) {
            betshow.setVisible(false);
            this.addChild(betshow, 10);
            betshow.setXY();
            this.mBetNumShowsArray[seat] = betshow;
        }
    },


    //处理 进入桌子 数据
    handleEnterTableData: function () {
        log("handleEnterTableData--");
        if (sGameData.mIsTestNoNet) {
            return;
        }
        var netdata = sGameData.mEnterTableData
        this.mGameNo = netdata[2];
        this.mGameState = netdata[3];
        if (this.mGameState == ZJH_GAME_STATE) { //本桌 处于 游戏状态
            this.mZhuangChairId = netdata[4];
            this.mActiveChairId = netdata[5];
            this.mAnBetNum = netdata[6]; //currAnBet
            this.mAllBetNum = netdata[7]; //countBet
            this.mLastBetIndex = this.getBetIndex(this.mAnBetNum);
            this.mIsInGame = true;
            log("this.mLoopNum=" + this.mLoopNum);
        }
        sGameData.mMeStandUp = true;
        var players = netdata[8];
        var gameplayers = netdata[9];
        var cards = netdata[10];
        //提取 自己的 椅子号
        for (var i = 0; i < gameplayers.length; i++) {
            var gp = gameplayers[i];
            var chairId = gp.chairId;
            var hasplayer = gp.hasplayer;
            if (hasplayer == 1) {
                var playerId = gp.playerId;
                if (playerId == sGameData.mUser.id) {
                    sGameData.mUser.chairId = chairId;
                    this.mMyChairId = chairId;
                    log("this.mMyChairId=="+this.mMyChairId)
                    if (chairId != -1) {
                        this.mMyState = MYSTATE_SITDOWN;
                        this.mBaseChairId = sGameData.mUser.chairId;
                        sGameData.mMeStandUp = false;
                        break;
                    }
                }
            }
        }
        //添加玩家到列表
        for (var i = 0; i < players.length; i++) {
            var player = players[i];
            log("player =" + player.userName );
            player.chairId = -1;
            var aPlayer = this.getPlayerByIdx(player.id);
            if (!aPlayer) {
                this.addPlayer(player);
            } else {
                aPlayer.chairId = player.chairId;
            }
            if(player.id == sGameData.mUser.id){
                if(sGameData.mEnterTableRandom) {
                    log("random sit-----")
                    var myChairId = netdata[11];
                    if (myChairId!=null&&myChairId >-1) {
                        log("myChairId-----"+myChairId)
                        this.mMyChairId = myChairId;
                        player.chairId = myChairId
                        if(aPlayer){
                            aPlayer.chairId = myChairId
                        }
                        sGameData.mUser.chairId = myChairId;
                        this.mMyChairId = myChairId;
                        log("this.mMyChairId=="+this.mMyChairId)
                        if (myChairId != -1) {
                            this.mMyState = MYSTATE_SITDOWN;
                            this.mBaseChairId = sGameData.mUser.chairId;
                            sGameData.mMeStandUp = false;
                        }
                        var gp = {};
                        gp.chairId = myChairId;
                        gp.hasplayer = 1;
                        if(gp.hasplayer ==1){
                            gp.playerId = player.id;
                            gp.state = P_READY_STATE;
                        }
                        gameplayers.push(gp);
                    }
                    var tableId = netdata[12];
                    log("new tableId=="+tableId);
                    if(sGameData.mCurrRoom.roomType == ROOM_ZI_JIAN_TYPE) {
                        var table = getDataById(sGameData.mShowTablesList, tableId);
                        sGameData.mCurrTable = table
                    }else{
                        sGameData.mCurrTable = sGameData.mCurrRoom.baseTable;
                    }

                    var table = sGameData.mCurrTable;

                    if (table) {
                        log("set new table data")
                        this.mMinBet = sGameData.mCurrTable.minBet;
                        this.mRoundSee = sGameData.mCurrTable.seeRound;
                        this.mRoundBi = sGameData.mCurrTable.compareRound;
                        this.mRoundMaxBi = sGameData.mCurrTable.endRound;
                        this.mShowAllBet.showAllBet();
                        this.setBetValueArray();
                        this.showMinBet()
                    }

                }
            }
        }
        //根据玩家的状态 设置 游戏状态
        log("player len--" + gameplayers.length);
        for (var i = 0; i < gameplayers.length; i++) {
            var gp = gameplayers[i];
            var chairId = gp.chairId;
            var hasplayer = gp.hasplayer;
            //log("chairId="+chairId)
            //log("hasplayer="+hasplayer)
            if (hasplayer == 1) {
                var playerId = gp.playerId;
                var player = this.getPlayerByIdx(playerId);
                if(player) {
                    player.chairId = chairId;
                    if (player.chairId != -1) {
                        log("p==" + player.id + "|" + player.chairId);
                        this.mChairSitDown[player.chairId] = SITDOWN_YES;
                        var chairId = player.chairId;
                    }
                }
                if (gp.state == P_GAME_STATE) { //玩家处于 游戏状态
                    var seat = this.getPlayerSeatByChairId(chairId);
                    this.mIsInGameChair[chairId] = ISINGAME_YSE;
                    this.mPGameStateChair[chairId] = PGAMESTATE_INGAME;
                    this.mSeeCardChair[chairId] = 0;
                    if (gp.bDiu) {
                        this.mPGameStateChair[chairId] = PGAMESTATE_OVERGAME;
                    }
                    if (gp.bSee) {
                        this.mSeeCardChair[chairId] = 1;
                    }
                    if(gp.betNum<0){
                        gp.betNum = Math.abs(gp.betNum);
                    }
                    this.mPBetNumsChair[chairId] += gp.betNum;
                    this.mLunNumChair[chairId] = gp.betCount;
                    if (playerId == sGameData.mUser.id) {
                        //this.mLoopNum = gp.betCount;// + 1;
                        if (!gp.bSee) {
                            gp.cards = [0, 0, 0];
                        }
                    }

                } else {
                    this.mIsInGameChair[chairId] = ISINGAME_NO;
                }
            }
        }
        this.getCurrLoopNum();
        if(cards.length > 0){
            this.mPlayerCardValueArrayChair[this.mMyChairId] = cards;
        }
        log("mGameState==" + this.mGameState)
    },
    //初始化游戏场景
    //看牌了要显 （自己 显示牌 ，别人显示明牌标示）
    initGameScene: function () {
        this.mShowAllBet.showAllBet();
        for (var i = 0; i < this.mPlayerList.length; i++) {
            var p = this.mPlayerList[i];
            log("pid--=" + p.id + "|" + p.chairId);
            if (p.chairId != -1) {
                this.playerEnterChair(p);
                var seat = this.getPlayerSeatByChairId(p.chairId);
                if (this.mIsInGameChair[p.chairId] == ISINGAME_YSE && this.mPGameStateChair[p.chairId] == PGAMESTATE_INGAME) {
                    this.showCardForInit(seat);
                    if (this.mSeeCardChair[p.chairId] == 1 && p.chairId != this.mMyChairId) {
                        this.mShowCardType.showTypeImage(seat, 20);
                    }else if (this.mSeeCardChair[p.chairId] == 1&&p.chairId == this.mMyChairId){
                        this.showPlayerCard(seat)
                    }
                    var userhead = this.mUserHeadsArray[p.chairId];
                    if(userhead){
                        userhead.setInGame(true);
                    }
                }
                this.showBetNum(p.chairId);
                //桌子上投注的筹码 没显
                //xxxxxx
            }
        }
        //this.showChangeTableBtn(1);
        if (this.mIsInGame) {
            this.showPlayerActive();
             this.mGameUI.setInviteBtnDisable();
        }
    },
    //把玩家放入某椅子
    playerEnterChair: function (p) {
        this.showPlayerByChair(p.chairId, 0, p,0);
    },

    showChangeTableBtn:function(type){
        if(type == 1){
            if(sGameData.mZJHChangeTabVisible){
                this.VisibleChangeTableButton(true,1);
            }
        }else{
            if(sGameData.mZJHChangeTabVisible){
                this.VisibleChangeTableButton(true);
                this.mMeokSprite.setVisible(true);
            }
        }
        //this.mIsCheckCanChangeTableing = true;
        //this.mStartTimeCheckCanChangeTable = (new Date()).getTime();

    },

    //test
    initTestData: function () {
        log("initTestData--")
        var tcardIndex = 0;
        var testcards = getTestCards(1);

        var jicarddata = {};
        jicarddata.cards = [3,4,24];
        jicarddata.ptype = GOODS_SOFTCASH;
        jicarddata.pnum = 35000;
        this.mJiCardData = jicarddata;

        var seatsitdown_t = [1, 1, 1, 1, 1, 1];
        var ingame_t = [1, 1, 1, 1, 1, 1];

        sGameData.mUser.chairId = 0;
        this.mMyChairId = sGameData.mUser.chairId;

        this.mZhuangChairId = 1;
        this.mActiveChairId = 0;
        this.mMinIndex = 0;
        this.mMaxIndex = 3;

        for (var i = 0; i < this.MAX_PLAYERNUM; i++) {
            this.mChairSitDown[i] = seatsitdown_t[i]
            this.mIsInGameChair[i] = ingame_t[i];
            if (ingame_t[i] == ISINGAME_YSE) {
                this.mPlayerCardValueArrayChair[i][0] = testcards[tcardIndex];
                tcardIndex++;
                this.mPlayerCardValueArrayChair[i][1] = testcards[tcardIndex];
                tcardIndex++;
                this.mPlayerCardValueArrayChair[i][2] = testcards[tcardIndex];
                tcardIndex++;
                var testp = getTestPlayerById(i+1);
                testp.chairId = i;
                this.addPlayer(testp);
            }
        }

        for (var i = 0; i < this.MAX_PLAYERNUM; i++) {
            if (this.mChairSitDown[i] == SITDOWN_YES) {
                this.mFapaiStateChair[i] = 1;
                this.mIsInGameChair[i] = ISINGAME_YSE;
                this.mPGameStateChair[i] = PGAMESTATE_INGAME;
                var userhead = this.mUserHeadsArray[i];
                if(userhead){
                    userhead.setInGame(true);
                }
            } else {
                this.mFapaiStateChair[i] = 0;
                this.mIsInGameChair[i] = ISINGAME_NO;
                this.mPGameStateChair[i] = PGAMESTATE_OVERGAME;
            }
        }
    },
    //test
    op_t_fapai: function () {
        this.buttonClicked();
        log("op_t_fapai");
        this.reInitDataUI();
        this.initTestData();
        this.mChairSitDown = [1, 1, 1, 1, 1, 1];
        this.mIsInGameChair = [1, 1, 1, 1, 1, 1];
        this.mZhuangChairId = 1;
        this.mActiveChairId = 0;
        sGameData.mUser.chairId = 0;
        this.mIsInGame = true;
        this.showGameStart();
    },
    //test
    op_t_bipai: function () {
        this.buttonClicked();
        this.mVSFromChairId = 0;
        this.mVSOtherChairId = randomInt(4)+1;
        this.mVSWinChairId = this.mVSFromChairId;
        this.mIsInGame = true;

        this.startCompareAnim(this.mVSFromChairId, this.mVSOtherChairId);
    },
    //test
    op_t_test: function () {
        this.buttonClicked();
        log("op_t_test");

        this.VisibleContinueButton(true);

        if (sGameData.mIsTestNoNet) {

            for (var i = 0; i < this.MAX_PLAYERNUM; i++) {
                this.showPlayerCard(i)
                var cash = randomInt(50);
                var type = 20+randomInt(3);
                //this.mShowOP.showOPImage(i,type);
                this.mShowCardType.showTypeImage(i, type);
                //this.startBetAnim(i,cash);

                //this.showCardForInit(i);
            }
            this.initTestData();
            //this.showClock(0);
            //this.setGiveupCard(3);

            this.VisiblePlayButton(true);


            //this.showJiCardView();

            //this.mShowAllBet.showAllBet(1);

            //this.visibleBiPaiBtn(true);

            //this.VisibleContinueButton(true)
            var seat = randomInt(5);
            this.mWinChairId = seat;
            this.showWinner(seat)

            var msg = this.mZJHLogic.mTalkMsg[0][0];
            //this.mChatView.showMsg(seat,msg);
            this.startShowFace(seat,0);

            //this.showZhuang(4);

            var type = 1+randomInt(6);
            this.mShowOPView.showOPImage(seat,type);
            this.showBetBackAnim(seat)
           // this.mShowWinCoinView.showAnim(8888)
            //this.showPlayerByChair(0, 1, null);
            //this.VisibleBetButton(!this.mIsShowBetBtn)
            this.mShowAllBet.startShowAnim();
            // this.showPlayerCard(0)
            //this.mShowOP.showOPImage(0,2,2)


            var mlen = sGameData.mShowTaskList.length
            for(var i=0;i<mlen;i++){
                var mission = sGameData.mShowTaskList[i];
                if(mission){
                    mission.allCount = mission.allCount+1;
                }
            }
            //sGameData.mShowTaskList.splice(0,1);


            var tar = randomInt(4)+1;
            var index = randomInt(8)
            var size = cc.director.getWinSize();
            var pos =  this.mZJHLogic.getOPPos();

            //showInterative(0,tar,index,pos,this);


            //if(this.mChatFaceView.visible){
            //    this.mChatFaceView.setVisible(false);
            //}else{
            //    this.mChatFaceView.setVisible(true);
            //}


        } else {
            sGameNetData.mZJHNet.sendZJHContinue();
            this.reInitDataUI();
        }
    },

    //操作 继续
    op_continue: function () {
        this.buttonClicked();
        log("op_continue");
        playClickSound();
        this.reInitDataUI();
        if (sGameData.mZJHLayer.mMyState==1) {
            sGameData.mExitRoomToMain = false;
            sGameNetData.mZJHNet.sendZJHContinue();
        }
        this.showChangeTableBtn();
        this.mMeokSprite.setVisible(true);
    },

    op_changetable:function(){
        this.buttonClicked();
        log("op_changetable");
        playClickSound();

        this.VisibleContinueButton(false);
        this.reInitDataUI();
        sGameNetData.mZJHNet.sendZJHExitTable();
        sGameNetData.mZJHNet.sendZJHRandomEnterTable(-1)
        sGameData.mChangeTableByRandom = true;
        sGameData.mIsSendingData = true;

        sGameData.mExitRoomToMain = false;

        if(this.mIsBipaiing){
            this.mIsChangeTableWhenBipai = true;
        }


    },
    //操作 看牌
    op_seecard: function () {
        this.buttonClicked();
        log("op_seecard");
        playClickSound();
        sGameNetData.mZJHNet.sendZJHSeeCard();
    },
    //操作 跟注
    op_genzhu: function () {
        this.buttonClicked();
        playClickSound();
        var betNum = this.mBetNum;
        log("op_genzhu=" + betNum);
        if (this.getMyCash() < betNum) {
            showLittleNotice(sResWord.w_zjh_tip_not_enough_money);
            return;
        }
        sGameNetData.mZJHNet.sendZJHBet(betNum);
        this.closeClock();
        this.closeAllButton();
    },
    op_allgen: function () {
        this.buttonClicked();
        //playClickSound();

        if(this.mIsAllGening){
            this.mIsAllGening = false;
            this.mAllGenCheck.setVisible(false);
        }else{
            this.mIsAllGening = true;
            this.mAllGenCheck.setVisible(true);
            if (this.mActiveChairId == sGameData.mUser.chairId) {
                this.op_genzhu();
            }
        }

    },
    //操作 加注 （加注显示 投注 按钮）
    op_jiazhu: function () {
        this.buttonClicked();
        //playClickSound();
        SoundManager.playSound(res.zjh_selmonney_mp3);
        this.VisibleBetButton(true);
        this.setBetRange();
    },
    //操作 加注（点 投注 按钮 直接加注）
    op_jiazhu1: function () {
        this.buttonClicked();
        playClickSound();
        var betNum = this.mBetNum;
        log("op_jiazhu=" + betNum);
        if (this.getMyCash() < betNum) {
            showLittleNotice(sResWord.w_zjh_tip_not_enough_money);
            return;
        }
        sGameNetData.mZJHNet.sendZJHBet(betNum);
        this.closeClock();
        this.closeAllButton();
    },
    op_opencard:function(){
        this.buttonClicked();
        playClickSound();
        log("op_opencard");
        sGameNetData.mZJHNet.sendZJHOpencard();
        this.closeClock();
        this.closeAllButton();
    },
    //操作 弃牌
    op_qipai: function () {
        this.buttonClicked();
        playClickSound();
        log("op_qipai");
        sGameNetData.mZJHNet.sendZJHGiveUp();
        this.closeClock();
        this.closeAllButton();
    },
    //操作 比牌 （点比牌 显示各位置的比牌按钮）
    op_bipai: function () {
        this.buttonClicked();
        log("op_show bipai==")
        playClickSound();
        var num = this.getInGamePlayerNum();
        if(num == 2){
            log("only two")
            var chair = this.getTheOneVSPlayerChair();
            var seat = this.getPlayerSeatByChairId(chair);
            this.op_bipai_g(seat);
        }else {
            this.visibleBiPaiBtn(true);
        }
    },

    //操作 各位置比牌
    op_bipai1: function () {
        this.op_bipai_g(1);
    },
    op_bipai2: function () {
        this.op_bipai_g(2);
    },
    op_bipai3: function () {
        this.op_bipai_g(3);
    },
    op_bipai4: function () {
        this.op_bipai_g(4);
    },
    //操作 投注
    op_bet0: function () {
        this.addBetValue(0);
    },
    op_bet1: function () {
        this.addBetValue(1);
    },
    op_bet2: function () {
        this.addBetValue(2);
    },
    op_bet3: function () {
        this.addBetValue(3);
    },
    op_bet4: function () {
        this.addBetValue(4);
    },
    //操作 各位置比牌
    op_bipai_g: function (index) {
        this.buttonClicked();
        playClickSound();
        log("op_bipai==" + index)
        var betNum = this.getCurrBetValue();
        log("发送比牌 c-" + index + "|" + betNum);
        if (this.getMyCash() < betNum*2) {
            showLittleNotice(sResWord.w_zjh_tip_not_enough_money);
            return;
        }
        var chair = this.getPlayerChairIdBySeat(index);
        sGameNetData.mZJHNet.sendZJHCompare(chair, betNum);
        this.closeClock();
        this.closeAllButton();
    },
    //检查是否需要立即比牌
    checkNeedBipaiNow:function(){
        var mycash = this.getMyCash()
        var num = this.getInGamePlayerNum();
        var betNum = this.getCurrBetValue();
        var bineednum = (num - 1)*betNum*2;
        var type = 0;//可以跟
        if(mycash < bineednum){
            type = 2;//立即比牌，可能金币都不足
        }else if(mycash< bineednum+betNum){
            type = 1;//需要立即比牌
        }
        log("checkNeedBipaiNow－－－"+mycash +"|" + num +"|"+ betNum+"|bineednum=="+bineednum+"|"+type);
        return type;
    },
    //操作 显示菜单
    op_showmenu: function () {
        this.buttonClicked();
        playClickSound();
        this.showTopMenuPanel(true);
    },
    //操作 显示 选择聊天界面
    op_showGameChatMsg:function(){
        this.buttonClicked();
        playClickSound();
        log("op_showGameChatMsg");
        var tars = [this.mChatFaceView,this.mShowTalkView,this.mChatInputView]
        this.op_showGameChatView(tars,1);
    },
    op_showGameChatInput:function(){
        this.buttonClicked();
        playClickSound();
        log("op_showGameChatInput");
        var tars = [this.mChatFaceView,this.mShowTalkView,this.mChatInputView]
        this.op_showGameChatView(tars,2);

    },
    //操作 显示 选择聊天界面
    op_showGameChatFace:function(){
        this.buttonClicked();
        playClickSound();
        log("op_showGameChatFace");
        var tars = [this.mChatFaceView,this.mShowTalkView,this.mChatInputView]
        this.op_showGameChatView(tars,0);

    },
    //显示任务
    op_showmission:function(){
        this.buttonClicked();
        playClickSound();
        log("op_showmission");
//        if (!sGameData.mIsTestNoNet) {
//            if(!sGameData.mIsSendingData) {
//                sGameData.mIsSendingData = true
//                sGameData.mGameNet.sendTaskList(1, sGameData.mCurrRoom.roomId);
//            }
//        }else {
//            this.showMission();
//        }
    },


    //操作 返回大厅
    op_quitgame_view: function () {
        log("op_quitgame_view");
        if (!sGameData.mIsTestNoNet) {
            if (!sGameData.mIsSendingData) {
                if(this.mIsInGameChair[this.mMyChairId] == ISINGAME_YSE
                    && this.mPGameStateChair[this.mMyChairId] == PGAMESTATE_INGAME){
                    sGameNetData.mZJHNet.sendZJHGiveUp();
                }
                if(sGameData.mUseRandomSit){
                    sGameNetData.mZJHNet.sendZJHExitRoom();
                }else{
                    sGameNetData.mZJHNet.sendZJHExitTable();
                    sGameNetData.mExitRoomToMain = true;
                }

                sGameData.mIsSendingData = true;
            }
        } else {
            this.gotoMain();
        }
    },
    //操作 站起
    op_standup_view: function () {
        log("op_stand_view");
        if (!sGameData.mIsTestNoNet) {
            if (!sGameData.mIsSendingData) {
                if(this.mIsInGameChair[this.mMyChairId] == ISINGAME_YSE
                    && this.mPGameStateChair[this.mMyChairId] == PGAMESTATE_INGAME){
                    sGameNetData.mZJHNet.sendZJHGiveUp();
                }
                sGameNetData.mZJHNet.sendZJHStandUp();
                sGameData.mIsSendingData = true;
            }
        }
    },
    //显示 设置
    showSetting: function () {
        if (this.mSettingView.visible) {
            this.mSettingView.setVisible(false);
        } else {
            this.mSettingView.setVisible(true);
        }
    },

    //选中 某条聊天 语句
    startShowPlayerTalk:function(index){
        log("startShowPlayerTalk="+index)
        this.mShowTalkView.setVisible(false);
        var sex = sGameData.mUser.sex;
        var msg = this.mZJHLogic.mTalkMsg[sex][index];
        //this.playTalkSound(sex,index);
        //var seat = randomInt(5);
        //this.mChatView.showMsg(seat,msg);
        if(this.mMyState == MYSTATE_SITDOWN){
            var now  = (new Date()).getTime();
            if(now - sGameData.mChatTime < sGameData.mChatDurTime*1000){
                var durtime = sGameData.mChatDurTime;
                var word = sResWord.w_tip_interative_s1+durtime+sResWord.w_tip_interative_s2;
                showLittleNotice(word)
                return;
            }
            sGameData.mChatTime = (new Date()).getTime();
            sGameNetData.mZJHNet.sendZJHChat(1,index,"",0);
        }
    },
    //显示表情
    startShowFace:function(seat,index){
        log("startShowFace="+seat+"|"+index)
        this.mShowFace.showFaceImage(seat,index);
    },
    //显示任务
    showMission:function(state){

    },
    //显示任务时 改变某些按钮状态
    setMissionButtonState:function(state){
        var pmenu = this.getChildByTag(17001);
        if(pmenu){
            var chatitem = pmenu.getChildByTag(this.ButtonID_CHAT)
            if(chatitem){
                chatitem.setEnabled(state)
            }
            var missionitem = pmenu.getChildByTag(this.ButtonID_MISSION)
            if(missionitem){
                missionitem.setEnabled(state)
            }
        }
    },
    //显示菜单（离开站起设置）
    showTopMenuPanel: function (state) {
        var size = cc.director.getWinSize();
        var size_top_menu_panel = cc.size(260, 280);
        if(sGameData.mUseRandomSit) {
            size_top_menu_panel = cc.size(260,210);
        }
        var toppanel = this.getChildByTag(5557);
        if (!toppanel&&state) {
            toppanel = ZJHTopMenuPanel.create();
            if (toppanel) {
                toppanel.setPosition(cc.p(size.width * 0.98 - size_top_menu_panel.width / 2,
                    size.height - size_top_menu_panel.height / 2-50));
                this.addChild(toppanel, 99, 5557);
                this.mTopMenuView = toppanel;
            }
        }
        if (toppanel) {
            toppanel.setVisible(true);
            toppanel.stopAllActions();
            toppanel.resetValue();
            this.mShowingTopMenu = state;
            if (state) {
                toppanel.setPosition(cc.p(size.width * 0.98 - size_top_menu_panel.width / 2,
                    size.height + size_top_menu_panel.height / 2));
                var to = cc.p(size.width * 0.98 - size_top_menu_panel.width / 2,
                    size.height - size_top_menu_panel.height / 2-50);
                var move = cc.MoveTo.create(0.5, to);
                toppanel.runAction(move);
            } else {
                toppanel.setPosition(cc.p(size.width * 0.98 - size_top_menu_panel.width / 2,
                    size.height - size_top_menu_panel.height / 2-50));
                var to = cc.p(size.width * 0.98 - size_top_menu_panel.width / 2,
                    size.height + size_top_menu_panel.height / 2 + 10);
                var move = cc.MoveTo.create(0.5, to);
                toppanel.runAction(move);
            }
        }
    },
    //显示任务
    showTasks:function(){
        log("showTasks---")
        var len = sGameData.mShowTaskList.length
        if(len){
            this.showMission();
        }else{
            showLittleNotice(sResWord.w_no_mission);
        }
    },
    showJiCardView:function(){
        this.mJiCardView.setVisible(true);
        this.mJiCardView.showJiCardInfo();
        var delay = cc.DelayTime.create(2);
        var callback = cc.CallFunc.create(this.showJiCardViewEnd, this);
        var actions2 = cc.Sequence.create(delay,callback);
        this.mJiCardView.stopAllActions();
        this.mJiCardView.runAction(actions2)
    },
    showJiCardViewEnd:function(){
        this.mJiCardView.stopAllActions();
        this.mJiCardView.setVisible(false);
    },
    //游戏开始 开始发牌
    showGameStart: function () {
        sGameData.mIsGameShowAniming = true;
        this.fapaiStart();
    },
    /**
     * 开始发牌
     */
    fapaiStart: function () {
        log("fapaiStart-")
        if (this.mIsFapaiing) return;
        //sGameData.mIsGameShowAniming = true;
        this.mIsFapaiing = true;
        this.mFapaiNum = 0;
        this.mFapaiChair = this.mZhuangChairId;

        for (var i = 0; i < this.MAX_PLAYERNUM; i++) {
            if (this.mIsInGameChair[i] == 1) {
                var seat = this.getPlayerSeatByChairId(i);
                this.startBetAnim(seat, this.mMinBet);//位置
                this.mAllBetNum += this.mMinBet;
                this.mPBetNumsChair[i] = this.mMinBet;
                this.showBetNum(i)
                this.updateGameCash(i,-this.mMinBet,0);
            }
        }
        this.mShowAllBet.showAllBet();
        this.fapaiSeat();
    },
    /**
     * 给某个位置发牌
     */
    fapaiSeat: function () {
        if(sGameData.mIsGameSitDownAniming){
            log("mIsGameSitDownAniming=")
            return;
        }
        var size = cc.director.getWinSize();
        var seat = 0;
        seat = this.getPlayerSeatByChairId(this.mFapaiChair);
        var cardscale = 0.4;
        if (seat == 0) {
            cardscale = 0.5
        }
        log("fapaiSeat=" + seat + "-" + this.mFapaiNum);
        SoundManager.playSound(res.zjh_deal_mp3);

        var card = ZJHCard.create();
        card.mIndex = 0;
        card.mSeat = seat;
        this.addChild(card, 13);
        this.mPlayerCardShowArray[seat].push(card);
        card.setPosition(cc.p(size.width / 2, size.height - 150));

        var card1 = ZJHCard.create();
        card1.mIndex = 1;
        card1.mSeat = seat;
        card.addChild(card1, 14);

        this.mPlayerCardShowArray[seat].push(card1);
        var card2 = ZJHCard.create();
        card2.mIndex = 2;
        card2.mSeat = seat;
        card.addChild(card2, 15);
        this.mPlayerCardShowArray[seat].push(card2);

        if (seat == 0) {
            card1.setPosition(cc.p(70, 0));
            card2.setPosition(cc.p(140, 0));
        } else if (seat < 3) {
            card1.setPosition(cc.p(-60, 0));//-5
            card2.setPosition(cc.p(-120, 0));//-10
        } else {
            card1.setPosition(cc.p(60, 0));//5
            card2.setPosition(cc.p(120, 0));//10
        }
        //if (seat != 0) {
            card.setScale(cardscale);
        //}
        card.setRotation(270);
        var rotateBy = cc.RotateBy.create(0.3, 90);
        var pos = this.getCardPos(seat, this.mFapaiNum);
        var moveTo = cc.MoveTo.create(0.3, pos);
        var callback = cc.CallFunc.create(this.onFapaiOver, this);
        var seq = cc.Sequence.create(moveTo, callback);
        card.runAction(seq);
        card.runAction(rotateBy);
    },

    /**
     * 给某个位置发牌结束
     */
    onFapaiOver: function (card) {
        var seat = card.mSeat;
        var num = 0;
        var lastChair = this.mFapaiChair;
        while (this.mFapaiChair < this.MAX_PLAYERNUM) {
            this.mFapaiChair++;//下一个位置
            if (this.mFapaiChair >= this.MAX_PLAYERNUM) this.mFapaiChair = 0;
            if (this.mFapaiStateChair[this.mFapaiChair] == 1) break;
            num++;
            if(num > 25){
                log("fapai error")
                this.mFapaiNum = 1;
                break;
            }
        }
        if(lastChair == this.mFapaiChair){//同一位置
            this.mFapaiNum++;
            log("error::table has one player");
        }
        if (this.mFapaiChair == this.mZhuangChairId) {
            this.mFapaiNum++;
            log("mFapaiNum==" + this.mFapaiNum + "--" + this.mFapaiChair);
        }
        if (this.mFapaiNum >= 1) {
            this.fapaiEnd();
        } else {
            this.fapaiSeat();
        }
    },
    /**
     * 发牌过程结束
     */
    fapaiEnd: function () {
        log("fapaiEnd-")
        sGameData.mIsGameShowAniming = false;
        this.mIsFapaiing = false;
        if (sGameData.mUser.chairId == this.mActiveChairId) {//该自己操作时
            this.mBetNum = this.mMinBet;
            this.mLastBetNum = this.mMinBet;
            this.VisiblePlayButton(true);
            SoundManager.playSound(res.game_ready_mp3,false,SOUND_EFFECT);
            hiddenViewWhenAction();
        }
        this.mLunNumChair[this.mActiveChairId] = 1;
        this.mLoopNum = 1;
        this.mShowAllBet.showAllBet();
        this.showClock(this.mActiveChairId);

    },
    //获取发牌时牌的位置
    getCardPos: function (seat, index) {

        var faXY = this.mZJHLogic.getCardPos();
        var pos = faXY[seat]//this.getCardPos(seat,0,1);
        if (seat == 0) {
            pos.x = pos.x + 55 * index;
        } else {
            pos.x = pos.x + 35 * index;
        }
        return pos;
    },
    //获取结束时 显示明牌的位置
    getCardResultPos:function(seat,index){
        var size = cc.director.getWinSize();
        var faXY =  this.mZJHLogic.getCardResultPos();
        var pos = cc.p(faXY[seat].x,faXY[seat].y)//this.getCardPos(seat,0,1);
        if(seat == 0){
            pos.x =  pos.x + 55*index;
        }else{
            pos.x =  pos.x + 15*index;
        }
        return pos;
    },
    //获取剩余的最后一位对手椅子号
    getTheOneVSPlayerChair:function(){
        var chair = -1;
        for (var i = 0; i < this.MAX_PLAYERNUM; i++) {
            if(this.mIsInGameChair[i]==ISINGAME_YSE&&this.mPGameStateChair[i]==PGAMESTATE_INGAME){
                if(i!=this.mMyChairId){
                    chair = i;
                    break;
                }
            }
        }
        return chair;
    },
    //获取正在游戏中的玩家数量
    getInGamePlayerNum:function(){
        var num = 0;
        for (var i = 0; i < this.MAX_PLAYERNUM; i++) {
            if(this.mIsInGameChair[i]==ISINGAME_YSE&&this.mPGameStateChair[i]==PGAMESTATE_INGAME){
                num++;
            }
        }
        return num;
    },
    /**
     * 获取当前游戏币数量  金币或元宝
     */
    getMyCash: function () {
        if (this.mMoneyType == MONEYTYPE_SOFTCASH) {
            return sGameData.mUser.softCash;
        } else {
            return sGameData.mUser.hardCash;
        }
    },
    /**
     * 设置可投注  值   选相邻的5个
     * [1,2,5,10,20,50,100,200,500,1000,2000,5000,10000,20000,50000,100000,200000,500000]
     */
    setBetValueArray: function () {
        this.checkMinBet();
        var pos = -1;
        for (var i = 0; i < zjh_num_coin.length - 4; i++) {
            var b = zjh_num_coin[i];
            if (this.mMinBet == b) {
                pos = i;
                break;
            }
        }
        if (pos != -1) {
            for (var j = 0; j < 5; j++) {
                var b = zjh_num_coin[j + pos];
                this.mBetValueArray[j] = b;
            }
        }
        log("this.mBetValueArray=" + this.mBetValueArray)
        this.changeBetButtons();
    },
    /**
     * 检测最小投注值  只能 1 2 5 10 20 50等
     */
    checkMinBet: function () {
        var pos = -1;
        for (var i = 0; i < zjh_num_coin.length - 4; i++) {
            var b = zjh_num_coin[i];
            if (this.mMinBet <= b) {
                pos = i;
                break;
            }
        }
        if (pos == -1) {
            pos = zjh_num_coin.length - 5;
        }
        this.mMinBet = zjh_num_coin[pos];
        this.mMaxBet = zjh_num_coin[pos + 4];
        log("this.mMinBet=" + this.mMinBet)
        log("this.mMaxBet=" + this.mMaxBet)
    },
    /**
     * 获取当前暗注
     */
    getCurrAnBetNum: function () {
        var annum = 0;
        if (this.mLastBetIndex < 0 || this.mLastBetIndex > 3) { // 暗注0-3 ; 明注 1-4
            this.mLastBetIndex = 0;
        }
        annum = this.mBetValueArray[this.mLastBetIndex];
        return annum;
    },

    /**
     * 点 0-4 下注
     */
    addBetValue: function (index) {
        this.buttonClicked();
        //playClickSound();
        SoundManager.playSound(res.zjh_selmonney1_mp3);
        log("addBetValue==" + index);
        this.mChooseIndex = index;

        if (this.mChooseIndex < this.mMinIndex) {
            this.mChooseIndex = this.mMinIndex;
        } else if (this.mChooseIndex > this.mMaxIndex) {
            this.mChooseIndex = this.mMaxIndex;
        }

        var n = this.mBetValueArray[this.mChooseIndex];
        var tempNum = this.getCurrBetValue();
        this.mBetNum = n;

        log("addBetValue==" + index + "|" + this.mChooseIndex + "|" + this.mBetNum + "=" + tempNum);

        this.op_jiazhu1();
    },
    //设置当前下注额  没看牌时 暗注 ； 看牌了 时下一个投注值
    getCurrBetValue: function () {
        var tempNum = 0;
        if (this.mSeeCardChair[this.mMyChairId] == 0) {
            tempNum = this.mBetValueArray[this.mLastBetIndex];
        } else {
            tempNum = this.mBetValueArray[this.mLastBetIndex + 1];
        }
        if (tempNum < this.mMinBet){
            tempNum = this.mMinBet;
        }
        log(" setCurrBetValue----mybetValue==" + tempNum + " betMin==" + this.mMinBet + " currbetNum=" + this.mLastBetNum);
        return tempNum;
    },

    /**
     * 获取投注的是 哪个编号
     */
    getBetIndex: function (num) {
        var pos = -1;
        for (var i = 0; i < 5; i++) {
            var b = this.mBetValueArray[i];
            if (num == b) {
                pos = i;
                break;
            }
        }
        return pos;
    },

    /**
     * 设置下注范围
     */
    setBetRange: function () {
        if (this.mSeeCardChair[this.mMyChairId] == 0) { //自己没看牌
            this.mMinIndex = this.mLastBetIndex;
            this.mMaxIndex = 3;
        } else {
            this.mMinIndex = this.mLastBetIndex + 1;
            this.mMaxIndex = 4;
        }
        if(this.mMaxIndex <= this.mMinIndex){
            this.setOPBtnVisible(this.ButtonID_JIAZHU, true,false);
        }
        this.updateBetButton();
    },
    //显示时钟倒计时
    showClock: function (chair) {
        this.mShowClock = true;
        this.mCurrOperateTime = 0;
        this.mClockChairIdx = chair;
        this.mTempTime = (new Date()).getTime();
    },
    //关闭显示闹钟
    closeClock: function () {
        this.mShowClock = false;
        if (this.mUserHeadsArray.length > 0) {
            if (this.mClockChairIdx != -1) {
                var userHead = this.mUserHeadsArray[this.mClockChairIdx];
                if (userHead) {
                    userHead.closeClock();
                }
            }
        }
    },
    //时钟时间到了
    clockTimeOver:function()
    {
        log("clockTimeover :");
        if (sGameData.mUser.chairId == this.mActiveChairId && this.mIsInGame==true&&this.mIsShowPlayBtn){
            this.op_qipai()
        }else if(this.mIsShowContinueBtn){
            this.op_standup_view();
        }
    },


    //显示某位置投注 动画 开始
    startBetAnim: function (seat, num) {
        log("startBetAnim==" + seat + "=" + num);
        if (num > 0) {
            SoundManager.playSound(res.zjh_bet1_mp3,false,SOUND_EFFECT);
        }
        var coinshow = ZJHCoin.create();
        coinshow.setBetValue(num);
        coinshow.setXY(seat);
        this.addChild(coinshow,6);
        //coinshow.setLocalZOrder(this.mTempCoinsArray.length);
        var deldata = 0;
        if(this.mTempCoinsArray.length < this.mMaxShowBetCoin){
            this.mTempCoinsArray.push(coinshow);
        }else{
            deldata = 1;
        }
        // 130 150 470 290
        var size = cc.director.getWinSize();
        var topos = cc.p(size.width/2-180+randomInt(360),size.height-173-randomInt(124));
        var duration = 0.3 + 0.3*Math.random()
        coinshow.starShowAnim();
        var delay1 = cc.DelayTime.create(0.35);
        var moveanim = cc.MoveTo.create(duration,topos);
        var callback = cc.CallFunc.create(this.onBetOver, this,deldata);
        var actions = cc.Sequence.create(delay1,moveanim,callback);
        coinshow.runAction(actions);
    },
    //显示投注 动画 结束
    onBetOver: function (coinshow,deldata) {
        if (deldata==1) {  //this.mTempCoinsArray.length >= this.mMaxShowBetCoin
            this.removeChild(coinshow);
        }
    },
    /**
     * 回收筹码到某位置（游戏结束时）
     */
    showBetBackAnim: function (seat) {
        SoundManager.playSound(res.zjh_winBet_mp3);
        var size = cc.director.getWinSize();
        var pos =  this.mZJHLogic.getHeadsPos();
        var topos = cc.p(pos[seat].x, pos[seat].y);
        for (var i = 0; i < this.mTempCoinsArray.length; i++) {
            var coinshow = this.mTempCoinsArray[i];
            //log("t4--")
            if(coinshow){
                coinshow.stopAllActions();
                //log("t4--1")
                var moveanim = cc.MoveTo.create(0.5, topos);
                var delay1 = cc.DelayTime.create(0.35);
                var callback1 = cc.CallFunc.create(this.onBetBackOver1, this);
                var callback = cc.CallFunc.create(this.onBetBackOver, this);
                var actions = cc.Sequence.create(moveanim,callback1,delay1, callback);
                coinshow.runAction(actions);
            }
        }

    },
    //回收结束1
    onBetBackOver1: function (coinshow) {
        coinshow.starHiddenAnim();
    },
    /**
     * 回收结束清除
     */
    onBetBackOver: function (coinshow) {
        this.cleanCoins();
    },
    //比牌时换桌
    doChangeTableWhenBiPai:function(){
        if(this.mIsChangeTableWhenBipai){
            this.mShowMaskView.setVisible(false);
            this.mPKLBgSprite.setVisible(false);
            this.mPKRBgSprite.setVisible(false);

            this.mIsBipaiing = false;
            sGameData.mIsGameShowAniming = false;
        }
    },

    /**
     * 比牌动画1 ：  开始比牌动画 从座位移动到中心
     */
    startCompareAnim: function (chair, chair2) {
        log("startCompareAnim-")
        if (!this.mIsInGame) return;
        if (this.mIsBipaiing) return;

        this.mShowMaskView.setVisible(true);

        this.mIsChangeTableWhenBipai = false;


        sGameData.mIsGameShowAniming = true;
        var seat = this.getPlayerSeatByChairId(chair)
        var seat2 = this.getPlayerSeatByChairId(chair2)

        this.mCompareChair = [chair, chair2];
        this.mIsBipaiing = true;

        this.mCompareAction[0] = [seat, 0, 0, 0, 0];//[位置，开始移动状态0开始1结束，开始返回状态0开始1结束]
        this.mCompareAction[1] = [seat2, 0, 0, 0, 0];

        var tempx1 = 1;
        if(seat > 0&& seat<3){
            tempx1 = 70;
        }
        var cards = this.mPlayerCardShowArray[seat];
        for (var i = 0; i < 1; i++) {   //移动牌
            var aCard = cards[i];
            var topos = cc.p(this.mCompareCardXY[0][0] - 35 + 35 * i+tempx1, this.mCompareCardXY[0][1]);
            var scaleanim = cc.ScaleTo.create(0.5, 0.5);
            var moveanim = cc.MoveTo.create(0.5, topos);
            var actions1 = cc.Spawn.create(scaleanim, moveanim);
            var callback = cc.CallFunc.create(this.onCardMoveOver, this);
            var actions = cc.Sequence.create(actions1, callback);
            if(i==0){
                this.reorderChild(aCard,60)
            }
            aCard.runAction(actions);
        }
        var tempx2 = 0;
        if(seat2 > 0&& seat2<3){   //
            tempx2 = 70;
        }

        var cards2 = this.mPlayerCardShowArray[seat2];
        for (var i = 0; i < 1; i++) {   //移动牌
            var aCard = cards2[i];
            var topos = cc.p(this.mCompareCardXY[1][0] - 35 + 35 * i +tempx2, this.mCompareCardXY[1][1]);
            var scaleanim = cc.ScaleTo.create(0.5, 0.5);
            var moveanim = cc.MoveTo.create(0.5, topos);
            var actions1 = cc.Spawn.create(scaleanim, moveanim);
            var callback = cc.CallFunc.create(this.onCardMoveOver, this);
            var actions = cc.Sequence.create(actions1, callback);
            if(i==0){
                this.reorderChild(aCard,60)
            }
            aCard.runAction(actions);
        }
        var size = cc.director.getWinSize();

        var lpos = cc.p(0,size.height - 200);
        var ltopos = cc.p(size.width/2+56,size.height - 200);
        this.mPKLBgSprite.setVisible(true);
        this.mPKLBgSprite.setPosition(lpos);
        this.mPKLBgSprite.setScale(1);
        var moveanim_l = cc.MoveTo.create(0.4, ltopos);
        this.mPKLBgSprite.stopAllActions();
        this.mPKLBgSprite.runAction(moveanim_l);

        var rpos = cc.p(size.width,size.height - 200);
        var rtopos = cc.p(size.width/2-38,size.height - 200);
        this.mPKRBgSprite.setVisible(true);
        this.mPKRBgSprite.setPosition(rpos);
        this.mPKRBgSprite.setScale(1);
        var moveanim_r = cc.MoveTo.create(0.4, rtopos);
        this.mPKRBgSprite.stopAllActions();
        this.mPKRBgSprite.runAction(moveanim_r);

        log("Compare1:start--")
    },
    /**
     * 比牌动画2 ：移动到 比牌位置 后 显示 输赢
     */
    onCardMoveOver: function (acard) {
        if(sGameData.mIsGameSitDownAniming) return;
        if(this.mIsChangeTableWhenBipai){
            this.doChangeTableWhenBiPai();
            return;
        }

        log("Compare2:onCardMoveOver---")
        var seat = acard.mSeat;
        if (seat == this.mCompareAction[0][0]) {
            this.mCompareAction[0][1] = 1;
        } else if (seat == this.mCompareAction[1][0]) {
            this.mCompareAction[1][1] = 1;
        }
        if (this.mCompareAction[0][1] == 1 && this.mCompareAction[1][1] == 1) {//都移动完成
            log("move end--" + seat);

            SoundManager.playSound(res.zjh_lightning_mp3);

            this.mVSSprite.setVisible(true);

            var effectSprite = this.mEffectSprite
            var size = cc.director.getWinSize();
            effectSprite.setVisible(true);
            effectSprite.stopAllActions();
            var animation = AnimationManager.getAnimation("zjhlightning")
            if(animation!= null){  //显示 闪电
                var animate =  cc.Animate.create(animation);
                var anim1 = cc.Hide.create();
                var callback = cc.CallFunc.create(this.onShowVSResult, this);
                var actions = cc.Sequence.create(animate,animate,anim1,callback);
                effectSprite.runAction(actions)
            }
            //showGameLog(mScoreNameArray[this.getPlayerSeatByChairId(mVSWinChairId)]+" 在比牌中获胜 ");
        }
    },
    //比牌动画3 ： 显示输赢
    onShowVSResult:function(){
        if(sGameData.mIsGameSitDownAniming) return;
        if(this.mIsChangeTableWhenBipai){
            this.doChangeTableWhenBiPai();
            return;
        }

        SoundManager.playSound(res.zjh_explode1_mp3);
        if (this.mVSFromChairId == this.mVSWinChairId) {
            this.mShowWinLose.setOPImg(0, 0);
            this.mShowWinLose.setOPImg(1, 1); //显示 爆炸
            var seat = this.getPlayerSeatByChairId(this.mVSOtherChairId);
            this.setGiveupCard(seat); // 输家 牌变灰

            var winseat = this.getPlayerSeatByChairId(this.mVSFromChairId);
            this.mShowOPView.showOPImage(winseat,7);// 赢家 显示 笑脸
            this.mShowOPView.showOPImage(seat,8);  // 输家 显示 哭脸

            var topos = cc.p(this.mCompareCardXY[1][0]+50, this.mCompareCardXY[1][1]+70);
            this.mPKXSprite.setPosition(topos)
            this.mPKXSprite.setVisible(true);

            var userhead = this.mUserHeadsArray[this.mVSOtherChairId];
            if(userhead){  // 输家 头像 变灰
                userhead.setInGame(false);
            }
        } else {
            this.mShowWinLose.setOPImg(0, 1); //显示 爆炸
            this.mShowWinLose.setOPImg(1, 0);
            var seat = this.getPlayerSeatByChairId(this.mVSFromChairId);
            this.setGiveupCard(seat);  // 输家 牌变灰

            var topos = cc.p(this.mCompareCardXY[0][0]+50, this.mCompareCardXY[0][1]+70);
            this.mPKXSprite.setPosition(topos)
            this.mPKXSprite.setVisible(true);

            var winseat = this.getPlayerSeatByChairId(this.mVSOtherChairId);
            this.mShowOPView.showOPImage(winseat,7); // 赢家 显示 笑脸
            this.mShowOPView.showOPImage(seat,8); // 输家 显示 哭脸
            var userhead = this.mUserHeadsArray[this.mVSFromChairId];
            if(userhead){ // 输家 头像 变灰
                userhead.setInGame(false);
            }
        }

    },

    /**
     * 比牌动画4 ：显示 输赢 结束后 返回原来位置
     */
    onShowWinLoseOver: function () {
        if(sGameData.mIsGameSitDownAniming) return;
        if(this.mIsChangeTableWhenBipai){
            this.doChangeTableWhenBiPai();
            return;
        }

        log("onShowWinLoseOver----");
        var seat = this.getPlayerSeatByChairId(this.mCompareChair[0])
        var seat2 = this.getPlayerSeatByChairId(this.mCompareChair[1])
        this.startEndCompareAnim(seat, seat2);
        this.mVSSprite.setVisible(false);
        this.mPKXSprite.setVisible(false);
    },
    /**
     * 比牌动画5：返回原来位置 动画
     */
    startEndCompareAnim: function (seat, seat2) {
        if(sGameData.mIsGameSitDownAniming) return;
        if(this.mIsChangeTableWhenBipai){
            this.doChangeTableWhenBiPai();
            return;
        }

        var cards = this.mPlayerCardShowArray[seat];
        for (var i = 0; i < 1; i++) {
            var aCard = cards[0];
            var topos = this.getCardPos(seat, i);
            var moveanim = cc.MoveTo.create(0.5, topos);
            var toScale = 0.5;
            if (seat != 0) {
                toScale = 0.4
            }
            var scaleanim = cc.ScaleTo.create(0.5, toScale);
            var actions1 = cc.Spawn.create(scaleanim, moveanim);
            var callback = cc.CallFunc.create(this.onEndMoveOver, this);
            var actions = cc.Sequence.create(actions1, callback);
            if(aCard){
                aCard.runAction(actions);
            }
        }

        var cards2 = this.mPlayerCardShowArray[seat2];
        for (var i = 0; i < 1; i++) {
            var aCard = cards2[i];
            var topos = this.getCardPos(seat2, i);
            var toScale = 0.5;
            if (seat2 != 0) {
                toScale = 0.4
            }
            var scaleanim = cc.ScaleTo.create(0.5, toScale);
            var moveanim = cc.MoveTo.create(0.5, topos);
            var actions1 = cc.Spawn.create(scaleanim, moveanim);
            var callback = cc.CallFunc.create(this.onEndMoveOver, this);
            var actions = cc.Sequence.create(actions1, callback);
            if(aCard) {
                aCard.runAction(actions);
            }
        }

        var size = cc.director.getWinSize();


        var scaleanim_l = cc.ScaleTo.create(0.5, 0.05);
        this.mPKLBgSprite.stopAllActions();
        this.mPKLBgSprite.runAction(scaleanim_l);

        var scaleanim_r = cc.ScaleTo.create(0.5, 0.05);
        this.mPKRBgSprite.stopAllActions();
        this.mPKRBgSprite.runAction(scaleanim_r);


    },


    /**
     * 比牌动画6：移动到 比牌位置 后 显示 输赢
     */
    onEndMoveOver: function (acard) {
        if(sGameData.mIsGameSitDownAniming) return;
        if(this.mIsChangeTableWhenBipai){
            this.doChangeTableWhenBiPai();
            return;
        }

        var seat = acard.mSeat;
        this.reorderChild(acard,13)
        if (seat == this.mCompareAction[0][0]) {
            this.mCompareAction[0][2] = 1;
        } else if (seat == this.mCompareAction[1][0]) {
            this.mCompareAction[1][2] = 1;
        }
        this.mShowMaskView.setVisible(false);
        this.mPKLBgSprite.setVisible(false);
        this.mPKRBgSprite.setVisible(false);

        if (this.mCompareAction[0][2] == 1 && this.mCompareAction[1][2] == 1) {//都移动完成
            log("move1 end--");

            if (this.mVSFromChairId == this.mVSWinChairId) {
                var seat = this.getPlayerSeatByChairId(this.mVSOtherChairId);
                this.mShowCardType.showTypeImage(seat, 22);
            } else {
                var seat = this.getPlayerSeatByChairId(this.mVSFromChairId);
                this.mShowCardType.showTypeImage(seat, 22);
            }

            this.mIsBipaiing = false;
            sGameData.mIsGameShowAniming = false;

            this.showPlayerActive();
        }
    },
    //显示 庄家
    showZhuang: function (chairId) {
        for (var i = 0; i < this.mUserHeadsArray.length; i++) {
            var uh = this.mUserHeadsArray[i];
            if (i == chairId) {
                uh.showZhuang(1);
            } else {
                uh.showZhuang(0);
            }
        }
    },

    //调整位置 （基准椅子号改变时）  //比牌时进入 有问题
    baseChairChange: function () {
        log("baseChairChange()----");
        sGameData.mIsGameSitDownAniming = true;
        for (var i = 0; i < this.MAX_PLAYERNUM; i++) {

            this.cleanPlayerCard(i);
            this.showBetNum(i);
            this.mShowCardType.cleanOP(i);
            var chairshow = this.mChairShowArray[i]
            if(chairshow){
                chairshow.setVisible(true)
            }
        }
        this.mShowCardType.cleanAll()
        this.showZhuang(-1);
        this.mChangeNum = 0;

        for (var i = 0; i < this.MAX_PLAYERNUM; i++) {
            var userhead = this.mUserHeadsArray[i];
            if (userhead) {
                userhead.stopAllActions();
                userhead.cleanDots();
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
            log("baseChairChangeOver-")
            for (var i = 0; i < this.mPlayerList.length; i++) {
                var p = this.mPlayerList[i];
                if (p.chairId != -1) {
                    var seat = this.getPlayerSeatByChairId(p.chairId);
                    var chairshow = this.mChairShowArray[seat]
                    if(chairshow){
                        chairshow.setVisible(false)
                    }
                    if (this.mIsInGameChair[p.chairId] == ISINGAME_YSE && this.mPGameStateChair[p.chairId] == PGAMESTATE_INGAME) {
                        this.showCardForInit(seat);
                        if(this.mSeeCardChair[p.chairId] == 1){
                            this.mShowCardType.showTypeImage(seat,20);
                        }
                        if(this.mPGameStateChair[p.chairId] == PGAMESTATE_OVERGAME){
                            this.setGiveupCard(seat)
                        }
                    }
                }
            }
            sGameData.mIsGameSitDownAniming = false;
            if(this.mIsBipaiing){
                this.mIsBipaiing = false;
                sGameData.mIsGameShowAniming = false;
            }
            if(this.mIsFapaiing){
                this.mIsFapaiing = false;
                sGameData.mIsGameShowAniming = false;
            }
        }
    },
    //初始化时显示牌 （断线重连 或 调整位置）
    showCardForInit: function (seat) {
        var cardscale = 0.4;
        if(seat == 0){
            cardscale = 0.5;
        }
        var card = ZJHCard.create();
        card.mIndex = 0;
        card.mSeat = seat;
        this.addChild(card, 13);
        this.mPlayerCardShowArray[seat].push(card);
        var pos = this.getCardPos(seat, 0);
        card.setPosition(pos);

        var card1 = ZJHCard.create();
        card1.mIndex = 1;
        card1.mSeat = seat;
        card.addChild(card1, 14);

        this.mPlayerCardShowArray[seat].push(card1);
        var card2 = ZJHCard.create();
        card2.mIndex = 2;
        card2.mSeat = seat;
        card.addChild(card2, 14);
        this.mPlayerCardShowArray[seat].push(card2);

        if (seat == 0) {
            card1.setPosition(cc.p(70, 0));
            //card1.setRotation(15.0);
            card2.setPosition(cc.p(140, 0));
            //card2.setRotation(30.0);
        } else if (seat < 3) {
            card1.setPosition(cc.p(-60, 0));
            //card1.setRotation(-15.0);
            card2.setPosition(cc.p(-120, 0));
            //card2.setRotation(-30.0);
        } else {
            card1.setPosition(cc.p(60, 0));
            //card1.setRotation(15.0);
            card2.setPosition(cc.p(120, 0));
            //card2.setRotation(30.0);
        }
        //if (seat != 0) {
            card.setScale(cardscale);
        //}
    },
    //显示明牌 （游戏结束 或 自己看牌）
    showCardResult: function (seat,showvalue) {
        if(showvalue==null){
            showvalue = true;
        }
        var chairId = this.getPlayerChairIdBySeat(seat)

        var pos = this.getCardResultPos(seat,0)
        var cardscale = 0.4;
        if(seat == 0){
            cardscale = 0.5;
        }
        var card = ZJHCard.create();
        card.mIndex = 0;
        card.mSeat = seat;
        this.addChild(card, 13);
        this.mPlayerCardShowArray[seat].push(card);
        card.setPosition(pos);
        if(showvalue){
            card.setCardValue(this.mPlayerCardValueArrayChair[chairId][0]);
        }

        var card1 = ZJHCard.create();
        card1.mIndex = 1;
        card1.mSeat = seat;
        card.addChild(card1, 14);
        card1.setPosition(cc.p(70,0));
        if(showvalue){
        card1.setCardValue(this.mPlayerCardValueArrayChair[chairId][1]);
        }

        this.mPlayerCardShowArray[seat].push(card1);
        var card2 = ZJHCard.create();
        card2.mIndex = 2;
        card2.mSeat = seat;
        card.addChild(card2, 14);
        card2.setPosition(cc.p(140,0));
        this.mPlayerCardShowArray[seat].push(card2);
        if(showvalue){
            card2.setCardValue(this.mPlayerCardValueArrayChair[chairId][2]);
        }

        //if (seat != 0) {
            card.setScale(cardscale);
        //}
    },

    //显示或隐藏某玩家 state 0显示 1隐藏  showanim显示动画： 0不显示 ,1显示
    showPlayerByChair: function (chairId, state, p,showanim) {
        log("showPlayerByChair=="+chairId+"|"+state+"|"+showanim)
        if(showanim == null){
            showanim = 1;
        }
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

    //显示 某椅子的投注额
    showBetNum: function (chair) {
        var seat = this.getPlayerSeatByChairId(chair)
        var betshow = this.mBetNumShowsArray[seat];
        var betnum = this.mPBetNumsChair[chair];
        betshow.setBetNum(betnum);
    },
    //显示看玩家得到的牌
    showPlayerCard: function (seat,showvalue) {
        var len = this.mPlayerCardShowArray[seat].length;
        log("showPlayerCard==" + seat + "|" + len)
        this.cleanPlayerCard(seat);
        this.showCardResult(seat,showvalue);
    },
    //显示赢家
    showWinner:function(seat){
        var size = cc.director.getWinSize();
        var pos =  this.mZJHLogic.getWinnerPos();
        var tpos = pos[seat]

        var winbg = this.mWinBgSprite;
        winbg.setVisible(true)
        winbg.setPosition(tpos)

        winbg.stopAllActions();
        winbg.setScale(0.1);
        var scaleanim = cc.ScaleTo.create(0.5,1.5);
        winbg.runAction(scaleanim);

        var len = this.mPlayerCardShowArray[seat].length;
        if(len > 0){
            //var card = this.mPlayerCardShowArray[seat][0];
            //var tpos1 = cc.p(tpos.x-34,tpos.y)
            //var moveanim = cc.MoveTo.create(0.5,tpos1);
            //var scaleanim = cc.ScaleTo.create(0.5,0.45);
            ////var rotateBy1 = cc.RotateBy.create(0.2, 0,-90);
            ////var rotateBy = cc.RotateBy.create(0.2, 0, 90); //CCMoveBy::create(3, ccp(130,0));
            //var callback = cc.CallFunc.create(this.showwincard, this);
            ////var seq = cc.Sequence.create(rotateBy1,callback,rotateBy);
            ////this.showwincard();
            //var actions = cc.Spawn.create(moveanim,scaleanim)//,seq
            //card.runAction(actions);

            this.showwincard();
        }

    },
    //显示赢家牌
    showwincard:function(){
        var chairId = this.mWinChairId;
        var seat = this.getPlayerSeatByChairId(chairId)
        var len = this.mPlayerCardShowArray[seat].length;
        for(var i=0;i<len;i++){
            var card = this.mPlayerCardShowArray[seat][i]
            card.setCardValue(this.mPlayerCardValueArrayChair[chairId][i]);
        }
    },
    /**
     * 玩家 牌变灰 （弃牌 或 比牌输了）
     */
    setGiveupCard: function (seat) {
        if (this.mPlayerCardShowArray == null) return;
        if (this.mPlayerCardShowArray[seat] == null)return;
        var len = this.mPlayerCardShowArray[seat].length;
        log("setGiveupCard--" + len + "-" + seat);
        for (var i = 0; i < len; i++) {
            var card = this.mPlayerCardShowArray[seat][i];
            card.setWinChoose(false);
        }
    },
    //获取当前轮
    getCurrLoopNum:function(){
        var lunnum = 0;
        for(var i=0;i<this.MAX_PLAYERNUM;i++){
            if(this.mLunNumChair[i] > lunnum){
                lunnum = this.mLunNumChair[i];
            }
        }
        this.mLoopNum = lunnum;
    },
    //清除 牌显示和 筹码
    cleanShowObject: function () {
        for (var i = 0; i < this.MAX_PLAYERNUM; i++) {
            this.cleanPlayerCard(i);
        }
        this.cleanCoins();
    },
    /**
     * 关闭所有按钮
     */
    closeAllButton: function (type) {
        this.VisibleBetButton(false);
        this.VisiblePlayButton(false);
        this.visibleBiPaiBtn(false);
        this.VisibleContinueButton(false);
        this.VisibleOpenCardButton(false);

        if(type == 1){
            if(this.mIsInGameChair[this.mMyChairId] == ISINGAME_NO
                || this.mPGameStateChair[this.mMyChairId] == PGAMESTATE_OVERGAME){
                //if(sGameData.mZJHChangeTabVisible){
                    this.showChangeTableBtn(1);
                //}
                //else{
                //    this.showChangeTableBtn(1);
                //}
            }
        }
    },
    //清除玩家显示
    cleanPlayerShow:function(chairId){
        var seat = this.getPlayerSeatByChairId(chairId);
        this.cleanPlayerCard(seat)
        this.mPBetNumsChair[chairId] = 0;
        this.showBetNum(chairId);
        this.mShowCardType.cleanOP(seat);
        if(this.mWinChairId == chairId){
            this.mWinBgSprite.setVisible(false);
        }
        this.mScoreView.cleanScore(seat);

    },
    /**
     * 按座位号清掉 手里牌
     */
    cleanPlayerCard: function (seat) {
        while (this.mPlayerCardShowArray[seat].length > 0) {
            var card = this.mPlayerCardShowArray[seat].shift();
            if (card) {
                card.removeAllChildren(true);
                this.removeChild(card);
            }
            this.mPlayerCardShowArray[seat] = [];
        }
    },
    /**
     * 清除 投注 筹码
     */
    cleanCoins: function () {
        log("cleanCoins--")
        while (this.mTempCoinsArray.length > 0) {
            var coin = this.mTempCoinsArray.shift();
            if(coin) {
                coin.stopAllActions();
            }
            this.removeChild(coin);
        }
        log("cleanCoins--"+this.mTempCoinsArray.length)
    },
    //初始化按钮
    initButtons: function () {
        var size = cc.director.getWinSize();
        if (sGameData.mIsTestNoNet) {
            //btntag,x,y,img,overimg,disimg ,word,func,point,fontsize
            var testBtnData = [
                [0, size.width - 10, size.height - 250, res.button2_png, res.button2_1_png, res.button2_png, "clean", this.reInitDataUI, cc.p(0.5, 0.5), 24],
                [0, size.width - 10, size.height - 300, res.button2_png, res.button2_1_png, res.button2_png, "fapai", this.op_t_fapai, cc.p(0.5, 0.5), 24],
                [0, size.width - 10, size.height - 350, res.button2_png, res.button2_1_png, res.button2_png, "bipai", this.op_t_bipai, cc.p(0.5, 0.5), 24],
                [0, size.width - 10, size.height - 400, res.button2_png, res.button2_1_png, res.button2_png, "test", this.op_t_test, cc.p(0.5, 0.5), 24]
            ];
            this.createWordBtnMenu(testBtnData, this);
        }

        var twidth = (size.width-150)/6-5;

        var betpic = []
        var numstr = []
        for (var i = 0; i < 5; i++) {
            var value = this.mBetValueArray[i];
            value =Number(formatcash(value));
            betpic[i] = "#"+this.mZJHLogic.getPicNum(value);;
        }
        //log("betpic="+betpic)
        // log("betdpic="+betdpic)
        var betBtnData = [
            //[this.ButtonID_Bet0, size.width / 2 - 220, 120, betpic[0],betpic[0],betpic[0],"",  this.op_bet0, 24],
            [this.ButtonID_Bet1, size.width -twidth/2-10, 105, betpic[1],betpic[1],betpic[1], "", this.op_bet1, 24],
            [this.ButtonID_Bet2, size.width -twidth/2-10, 185, betpic[2], betpic[2],betpic[2],"",  this.op_bet2, 24],
            [this.ButtonID_Bet3, size.width -twidth/2-10, 265, betpic[3],betpic[3],betpic[3], "", this.op_bet3, 24],
            [this.ButtonID_Bet4, size.width -twidth/2-10, 345, betpic[4],betpic[4],betpic[4], "", this.op_bet4, 24]
        ];
        this.mBetMenu = this.createWordBtnMenu(betBtnData, this,false,80);
        this.mBetMenu.setVisible(false);

        var biBtnData = [
            [this.ButtonID_BIPAI1, size.width-70,size.height - 335, "#zjh_desks_compare.png", "", "", "", this.op_bipai1, cc.p(0, 0), 24],
            [this.ButtonID_BIPAI2, size.width-70,size.height - 140, "#zjh_desks_compare.png", "", "", "", this.op_bipai2, cc.p(0, 0), 24],
            [this.ButtonID_BIPAI3, 70,size.height - 140, "#zjh_desks_compare.png", "", "", "", this.op_bipai3, cc.p(0, 0), 24],
            [this.ButtonID_BIPAI4, 70,size.height- 335, "#zjh_desks_compare.png", "", "", "", this.op_bipai4, cc.p(0, 0), 24]
        ];
        this.mBiMenu = this.createWordBtnMenu(biBtnData, this);

        //var faXY =  [[size.width/2-55,120],[size.width-200-70,158],[size.width-200-70,358],[size.width-200-70,558],[200,558],[200,358]];

        var tempX = (size.width-960)*0.18;

        //188  94
        //var opBtnData = [
        //    [this.ButtonID_GENZHU, size.width / 2-(188+tempX)*2, 35, sResWord.w_zjh_genzhu, this.op_genzhu],
        //    [this.ButtonID_JIAZHU, size.width / 2-(188+tempX), 35, sResWord.w_zjh_jiazhu, this.op_jiazhu],
        //    [this.ButtonID_KANPAI, size.width / 2, 35, sResWord.w_zjh_seecard, this.op_seecard],
        //    [this.ButtonID_BIPAI, size.width / 2+(188+tempX), 35, sResWord.w_zjh_bipai, this.op_bipai],
        //    [this.ButtonID_QIPAI, size.width / 2+(188+tempX)*2, 35, sResWord.w_zjh_qipai, this.op_qipai],
        //    [this.ButtonID_JX, size.width / 2, 350, sResWord.w_continue, this.op_continue]
        //];
        //this.mOPMenu = this.createOPMenu(opBtnData, this, 1, 32,false);


        var tsize = cc.size(twidth,63);

        var qipaiSprite = ButtonS9SpriteWithWordInner(tsize,"zjh_btn_green.png",sResWord.w_zjh_qipai,cc.p(0.5,0.5),24,0)
        var qipaiSprite1 = ButtonS9SpriteWithWordInner(tsize,"zjh_btn_green.png",sResWord.w_zjh_qipai,cc.p(0.5,0.5),24,1)
        var qipaiSprite2 = ButtonS9SpriteWithWordInner(tsize,"zjh_btn_green.png",sResWord.w_zjh_qipai,cc.p(0.5,0.5),24,2)
        var qipaiItem = cc.MenuItemSprite.create(
            qipaiSprite,
            qipaiSprite1,
            qipaiSprite2,
            this.op_qipai, this);
        qipaiItem.setPosition(cc.p(size.width -twidth/2-10-(twidth+5)*5,35));
        qipaiItem.setTag(this.ButtonID_QIPAI);

        var bipaiSprite = ButtonS9SpriteWithWordInner(tsize,"zjh_btn_green.png",sResWord.w_zjh_bipai,cc.p(0.5,0.5),24,0)
        var bipaiSprite1 =  ButtonS9SpriteWithWordInner(tsize,"zjh_btn_green.png",sResWord.w_zjh_bipai,cc.p(0.5,0.5),24,1)
        var bipaiSprite2 = ButtonS9SpriteWithWordInner(tsize,"zjh_btn_green.png",sResWord.w_zjh_bipai,cc.p(0.5,0.5),24,2)
        var bipaiItem = cc.MenuItemSprite.create(
            bipaiSprite,
            bipaiSprite1,
            bipaiSprite2,
            this.op_bipai, this);
        bipaiItem.setPosition(cc.p(size.width -twidth/2-10-(twidth+5)*4, 35));
        bipaiItem.setTag(this.ButtonID_BIPAI);

        var kanpaiSprite = ButtonS9SpriteWithWordInner(tsize,"zjh_btn_green.png",sResWord.w_zjh_seecard,cc.p(0.5,0.5),24,0)
        var kanpaiSprite1 = ButtonS9SpriteWithWordInner(tsize,"zjh_btn_green.png",sResWord.w_zjh_seecard,cc.p(0.5,0.5),24,1)
        var kanpaiSprite2 = ButtonS9SpriteWithWordInner(tsize,"zjh_btn_green.png",sResWord.w_zjh_seecard,cc.p(0.5,0.5),24,2)
        var kanpaiItem = cc.MenuItemSprite.create(
            kanpaiSprite,
            kanpaiSprite1,
            kanpaiSprite2,
            this.op_seecard, this);
        kanpaiItem.setPosition(cc.p(size.width -twidth/2-10-(twidth+5)*3, 35));
        kanpaiItem.setTag(this.ButtonID_KANPAI);

        var genzhuSprite = ButtonS9SpriteWithWordInner(tsize,"zjh_btn_green.png",sResWord.w_zjh_genzhu,cc.p(0.5,0.5),24,0)
        var genzhuSprite1 = ButtonS9SpriteWithWordInner(tsize,"zjh_btn_green.png",sResWord.w_zjh_genzhu,cc.p(0.5,0.5),24,1)
        var genzhuSprite2 = ButtonS9SpriteWithWordInner(tsize,"zjh_btn_green.png",sResWord.w_zjh_genzhu,cc.p(0.5,0.5),24,2)
        var genzhuItem = cc.MenuItemSprite.create(
            genzhuSprite,
            genzhuSprite1,
            genzhuSprite2,
            this.op_genzhu, this);
        genzhuItem.setPosition(cc.p(size.width -twidth/2-10-(twidth+5)*2, 35));
        genzhuItem.setTag(this.ButtonID_GENZHU);

        var allgenSprite = ButtonS9SpriteWithWordInner(tsize,"zjh_btn_green.png",sResWord.w_zjh_allgen,cc.p(0.65,0.5),24,0)
        var allgenSprite1 = ButtonS9SpriteWithWordInner(tsize,"zjh_btn_green.png",sResWord.w_zjh_allgen,cc.p(0.65,0.5),24,1)
        var allgenSprite2 = ButtonS9SpriteWithWordInner(tsize,"zjh_btn_green.png",sResWord.w_zjh_allgen,cc.p(0.65,0.5),24,2)
        var allgenItem = cc.MenuItemSprite.create(
            allgenSprite,
            allgenSprite1,
            allgenSprite2,
            this.op_allgen, this);
        allgenItem.setPosition(cc.p(size.width -twidth/2-10-(twidth+5), 35));
        allgenItem.setTag(this.ButtonID_ALLGEN);

        var checkbg = cc.Sprite.create("#zjh_check_u.png");
        allgenItem.addChild(checkbg);
        checkbg.setPosition(cc.p(twidth*0.2,30))

        var checks = cc.Sprite.create("#zjh_check_c.png");
        allgenItem.addChild(checks);
        checks.setPosition(cc.p(twidth*0.2,30))
        checks.setVisible(false);
        this.mAllGenCheck = checks;



        var jiazhuSprite = ButtonS9SpriteWithWordInner(tsize,"zjh_btn_green.png",sResWord.w_zjh_jiazhu,cc.p(0.5,0.5),24,0)
        var jiazhuSprite1 = ButtonS9SpriteWithWordInner(tsize,"zjh_btn_green.png",sResWord.w_zjh_jiazhu,cc.p(0.5,0.5),24,1)
        var jiazhuSprite2 = ButtonS9SpriteWithWordInner(tsize,"zjh_btn_green.png",sResWord.w_zjh_jiazhu,cc.p(0.5,0.5),24,2)
        var jiazhuItem = cc.MenuItemSprite.create(
            jiazhuSprite,
            jiazhuSprite1,
            jiazhuSprite2,
            this.op_jiazhu, this);
        jiazhuItem.setPosition(cc.p(size.width -twidth/2-10, 35));
        jiazhuItem.setTag(this.ButtonID_JIAZHU);


        var opencardSprite = ButtonS9SpriteWithWordInner(tsize,"zjh_btn_green.png",sResWord.w_zjh_opencard,cc.p(0.5,0.5),24,0)
        var opencardSprite1 = ButtonS9SpriteWithWordInner(tsize,"zjh_btn_green.png",sResWord.w_zjh_opencard,cc.p(0.5,0.5),24,1)
        var opencardSprite2 = ButtonS9SpriteWithWordInner(tsize,"zjh_btn_green.png",sResWord.w_zjh_opencard,cc.p(0.5,0.5),24,2)
        var opencardItem = cc.MenuItemSprite.create(
            opencardSprite,
            opencardSprite1,
            opencardSprite2,
            this.op_opencard, this);
        opencardItem.setPosition(cc.p(size.width/2, 293));
        opencardItem.setTag(this.ButtonID_OPENCARD);


        var jxSprite = ButtonS9SpriteWithWordInner(tsize,"zjh_btn_green.png",sResWord.w_continue,cc.p(0.5,0.5),24,0)
        var jxSprite1 = ButtonS9SpriteWithWordInner(tsize,"zjh_btn_green.png",sResWord.w_continue,cc.p(0.5,0.5),24,1)
        var jxSprite2 = ButtonS9SpriteWithWordInner(tsize,"zjh_btn_green.png",sResWord.w_continue,cc.p(0.5,0.5),24,2)
        var jxItem = cc.MenuItemSprite.create(
            jxSprite,
            jxSprite1,
            jxSprite2,
            this.op_continue, this);
        jxItem.setPosition(cc.p(size.width/2+85, 293));
        jxItem.setTag(this.ButtonID_JX);

        var quitclock = CountDownShow.create();
        quitclock.attr({
            x:24,
            y:37
        })
        jxItem.addChild(quitclock);
        this.mQuitClock = quitclock;

        var ctSprite = ButtonS9SpriteWithWordInner(tsize,"zjh_btn_green.png",sResWord.w_changetable,cc.p(0.5,0.5),24,0)
        var ctSprite1 = ButtonS9SpriteWithWordInner(tsize,"zjh_btn_green.png",sResWord.w_changetable,cc.p(0.5,0.5),24,1)
        var ctSprite2 = ButtonS9SpriteWithWordInner(tsize,"zjh_btn_green.png",sResWord.w_changetable,cc.p(0.5,0.5),24,2)
        var ctItem = cc.MenuItemSprite.create(
            ctSprite,
            ctSprite1,
            ctSprite2,
            this.op_changetable, this);
        ctItem.setPosition(cc.p(size.width/2-85, 293));
        ctItem.setTag(this.ButtonID_CHANGETABLE);



        var pOPMenu = cc.Menu.create(qipaiItem,bipaiItem,kanpaiItem,genzhuItem,allgenItem,jiazhuItem,opencardItem,jxItem,ctItem);
        pOPMenu.x = 0;
        pOPMenu.y = 0;
        this.addChild(pOPMenu, 82);
        this.mOPMenu = pOPMenu;



        var size_top_menu = cc.size(120, 50);
        var menuSprite = ButtoSpritenWithSpriteInnerLight(size_top_menu,"#zjh_menu.png",cc.p(0.5,0.5),0);//cc.Sprite.create("#zjh_menu.png");
        var menuSprite1 = ButtoSpritenWithSpriteInnerLight(size_top_menu,"#zjh_menu.png",cc.p(0.5,0.5),0);
        menuSprite1.setColor(cc.color(200,200,200));
        var menuSprite2 = ButtoSpritenWithSpriteInnerLight(size_top_menu,"#zjh_menu.png",cc.p(0.5,0.5),0);
        var menuItem = cc.MenuItemSprite.create(
            menuSprite,
            menuSprite1,
            menuSprite2,
            this.op_showmenu, this);
        menuItem.setAnchorPoint(cc.p(1, 1));
        menuItem.setPosition(cc.p(size.width * 0.99, size.height));
        menuItem.setTag(this.ButtonID_TOPMENU);
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
        faceItem.setPosition( cc.p(1,176));
        //chatItem.setVisible(false)
        faceItem.setTag(this.ButtonID_FACE);
        faceItem.setVisible(false);

        var pTopMenu = cc.Menu.create(menuItem,faceItem);
        pTopMenu.x = 0;
        pTopMenu.y = 0;
        pTopMenu.setTag(17001)
        this.addChild(pTopMenu, 1);

        var btnsize = cc.size(300,58);
        var waitSprite = createFrameBtnSprite("zjh_betCount.png",res.tblank_png,sResWord.w_wait,btnsize,1,24,80);//createOpButton(sResWord.w_wait,btnsize,0,24,1);
        waitSprite.setAnchorPoint(cc.p(0.5,0.5));
        waitSprite.setPosition(cc.p(size.width/2,35));
        this.addChild(waitSprite, 1);
        this.mBtnWaitSprite = waitSprite;

        this.VisibleContinueButton(false);

        this.closeAllButton();

    },
    changeBetButtons:function(){
        log("changeBetButtons==="+this.mBetValueArray);
        var betpic = []
        var btnids = [this.ButtonID_Bet0,this.ButtonID_Bet1,this.ButtonID_Bet2,this.ButtonID_Bet3,this.ButtonID_Bet4];
        for (var i = 0; i < 5; i++) {
            var value = this.mBetValueArray[i];
            value =Number(formatcash(value));
            betpic[i] = "#"+this.mZJHLogic.getPicNum(value);;
            var bid = btnids[i];
            this.changeBetButton(bid,betpic[i]);
        }
    },
    changeBetButton:function(tag,picname){
        var pOperateMenu = this.mBetMenu
        if(pOperateMenu){
            var buttonItem = pOperateMenu.getChildByTag(tag);
            if(buttonItem){
                var normal = ButtonSpriteWithWordInner(picname,"",cc.p(0,0),24);
                if(normal){
                    buttonItem.setNormalImage(normal);
                }
                var sel = ButtonSpriteWithWordInner(picname,"",cc.p(0,0),24,1);
                if(sel){
                    buttonItem.setSelectedImage(sel);
                }
                var dis = ButtonSpriteWithWordInner(picname,"",cc.p(0,0),24);
                if(dis){
                    dis.setColor(cc.color(100, 100, 100));
                    buttonItem.setDisabledImage(dis);
                }
            }
        }
    },
    //继续按钮显示／隐藏
    VisibleContinueButton: function (state) {
        var size = cc.director.getWinSize();
        this.mIsShowContinueBtn = state;
        if (this.mOPMenu) {
            this.setOPBtnVisible(this.ButtonID_JX, state);
            this.setOPBtnVisible(this.ButtonID_CHANGETABLE, state);
            if(state){
                this.setOPBtnPos(this.ButtonID_JX,cc.p(size.width/2+85, 293))
                this.setOPBtnPos(this.ButtonID_CHANGETABLE,cc.p(size.width/2-85, 293))
                if(!sGameData.mZJHChangeTabVisible){
                    this.setOPBtnVisible(this.ButtonID_CHANGETABLE, false);
                }
            }
        }
        this.mMeokSprite.setVisible(false);

        if(state){
            this.mQuitClock.setCountDown(1);
        }else{
            this.mQuitClock.closeClock();
        }
    },
    VisibleChangeTableButton: function (state,type) {
        var size = cc.director.getWinSize();
        this.mIsShowContinueBtn = state;
        if (this.mOPMenu) {
            this.setOPBtnVisible(this.ButtonID_JX, false);
            this.setOPBtnVisible(this.ButtonID_CHANGETABLE, state);
            if(state){
                if(type == 1){
                    this.setOPBtnPos(this.ButtonID_CHANGETABLE,cc.p(size.width/2, 293))
                }else{
                    this.setOPBtnPos(this.ButtonID_CHANGETABLE,cc.p(size.width/2-85, 293))
                }
                this.setOPBtnVisible(this.ButtonID_CHANGETABLE, false);
            }
        }
    },
    VisibleOpenCardButton: function (state) {
        if (this.mOPMenu) {
            this.setOPBtnVisible(this.ButtonID_OPENCARD, false);
        }
    },
    //游戏操作（投注看牌棋牌等） 按钮显示／隐藏
    VisiblePlayButton: function (state) {
        this.mIsShowPlayBtn = state;
        if (this.mOPMenu) {
            this.setOPBtnVisible(this.ButtonID_KANPAI, state);
            this.setOPBtnVisible(this.ButtonID_GENZHU, state);
            this.setOPBtnVisible(this.ButtonID_QIPAI, state);
            this.setOPBtnVisible(this.ButtonID_JIAZHU, state);
            this.setOPBtnVisible(this.ButtonID_BIPAI, state);
            this.setOPBtnVisible(this.ButtonID_ALLGEN, state);
            if (this.mLoopNum <= this.mRoundSee) {
                this.setOPBtnVisible(this.ButtonID_KANPAI, state, false);
            }
            if (this.mMyChairId != -1 && this.mSeeCardChair[this.mMyChairId] == 1) {  //如果玩家已看牌。
                this.setOPBtnVisible(this.ButtonID_KANPAI, state, false);
            }
            if (this.mLoopNum <= this.mRoundBi) {
                this.setOPBtnVisible(this.ButtonID_BIPAI, state, false);
            }
            if (this.mLoopNum >= this.mRoundMaxBi) {
                this.setOPBtnVisible(this.ButtonID_GENZHU, state, false);
                this.setOPBtnVisible(this.ButtonID_JIAZHU, state, false);
            }

            if(state && this.mLoopNum > this.mRoundBi){//能都比牌 ，且自己操作时
                var needbitype = this.checkNeedBipaiNow();
                if(needbitype > 0){
                    //showLittleNotice(sResWord.w_zjh_tip_needbipainow,1,3);
                }
            }

            if(!state){// 当前不该自己操作
                if(this.mIsInGame&&this.mIsInGameChair[this.mMyChairId] == ISINGAME_YSE
                    && this.mPGameStateChair[this.mMyChairId] == PGAMESTATE_INGAME){ // 在游戏中
                    if(this.mSeeCardChair[this.mMyChairId] ==0 && this.mLoopNum > this.mRoundSee){
                        this.setOPBtnVisible(this.ButtonID_KANPAI, true,true);
                    }else{
                        this.setOPBtnVisible(this.ButtonID_KANPAI, true,false);
                    }
                    this.setOPBtnVisible(this.ButtonID_GENZHU, true,false);
                    this.setOPBtnVisible(this.ButtonID_QIPAI, true,true);
                    this.setOPBtnVisible(this.ButtonID_JIAZHU, true,false);
                    this.setOPBtnVisible(this.ButtonID_BIPAI, true,false);
                    this.setOPBtnVisible(this.ButtonID_ALLGEN, true,true);
                    this.mBtnWaitSprite.setVisible(state)
                }else{
                    this.mBtnWaitSprite.setVisible(!state)
                }
            }else{ //显示 按钮
                this.mBtnWaitSprite.setVisible(!state)
                this.setBetRange();
            }



        }
    },
    //比牌 按钮显示／隐藏
    visibleBiPaiBtn: function (b) {
        var btnids = [this.ButtonID_BIPAI1, this.ButtonID_BIPAI2, this.ButtonID_BIPAI3, this.ButtonID_BIPAI4];
        if (this.mBiMenu) {
            for (var i = 0; i < btnids.length; i++) {
                if (b == true) {
                    var chairId = this.getPlayerChairIdBySeat(i + 1)
                    if (this.mChairSitDown[chairId] == SITDOWN_YES
                        && this.mIsInGameChair[chairId] == ISINGAME_YSE
                        && this.mPGameStateChair[chairId] == PGAMESTATE_INGAME) {
                        this.setBiBtnVisible(btnids[i], b);
                    } else {
                        this.setBiBtnVisible(btnids[i], false);
                    }
                } else {
                    this.setBiBtnVisible(btnids[i], b);
                }
            }
        }
    },
    //设置 某 操作按钮 是否显示
    setOPBtnVisible: function (tag, state, enable) {
        if (enable == null) {
            enable = true;
        }
        var opbtn = this.mOPMenu.getChildByTag(tag);
        if (opbtn) {
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

    /**
     * 显示投注按钮
     */
    VisibleBetButton: function (b) {

        var size = cc.director.getWinSize();
        var twidth = (size.width-150)/6-5;
        if (b) {
            this.mBetMenu.setVisible(true);
            this.setBetBtnVisible(this.ButtonID_Bet0, b, true);
            this.setBetBtnVisible(this.ButtonID_Bet1, b, true);
            this.setBetBtnVisible(this.ButtonID_Bet2, b, true);
            this.setBetBtnVisible(this.ButtonID_Bet3, b, true);
            this.setBetBtnVisible(this.ButtonID_Bet4, b, true);

            this.mBetNum = this.getCurrBetValue();
            //this.mShowChooseBet.showBet(true,this.mBetNum);
            this.mIsShowBetBtn = true;
            this.mShowChooseBet.setVisible(true);
            log("t8---")
            this.mBetMenu.stopAllActions();
            log("t8---1")
            this.mBetMenu.setPosition(cc.p(0,-200));
            var topos = cc.p(0,0)
            var moveanim = cc.MoveTo.create(0.2,topos);
            this.mBetMenu.runAction(moveanim)
            log("t9---")
            this.mShowChooseBet.stopAllActions();
            log("t9---1")
            this.mShowChooseBet.setPosition(cc.p(size.width -twidth/2-10, -210));
            var topos1 = cc.p(size.width -twidth/2-10, 210)
            var moveanim1 = cc.MoveTo.create(0.2,topos1);
            this.mShowChooseBet.runAction(moveanim1);

        } else {

            if(this.mIsShowBetBtn){
                this.mIsShowBetBtn = false;
                //this.mShowChooseBet.showBet(false,0);
                log("t91---")
                this.mShowChooseBet.stopAllActions();
                log("t91---1")
                this.mShowChooseBet.setPosition(cc.p(size.width -twidth/2-10, 210));
                var topos1 = cc.p(size.width -twidth/2-10, -210)
                var moveanim1 = cc.MoveTo.create(0.2,topos1);
                this.mShowChooseBet.runAction(moveanim1);
                log("t81---")
                this.mBetMenu.stopAllActions();
                log("t81---1")
                this.mBetMenu.setPosition(cc.p(0,0));
                var topos = cc.p(0,-200)
                var moveanim = cc.MoveTo.create(0.2,topos);
                var callback = cc.CallFunc.create(this.showBetBtnOver, this);
                var seq = cc.Sequence.create(moveanim,callback);
                this.mBetMenu.runAction(seq)
            }

        }
    },
    //投注 按钮显示结束
    showBetBtnOver:function(){
        var b = false;
        this.setBetBtnVisible(this.ButtonID_Bet0, b, true);
        this.setBetBtnVisible(this.ButtonID_Bet1, b, true);
        this.setBetBtnVisible(this.ButtonID_Bet2, b, true);
        this.setBetBtnVisible(this.ButtonID_Bet3, b, true);
        this.setBetBtnVisible(this.ButtonID_Bet4, b, true);
        this.mShowChooseBet.setVisible(false);
        this.mBetMenu.setVisible(false);
    },

    /**
     * 更新状态
     */
    updateBetButton: function () {
        var btnids = [this.ButtonID_Bet0, this.ButtonID_Bet1, this.ButtonID_Bet2, this.ButtonID_Bet3, this.ButtonID_Bet4];
        for (var i = 0; i < 5; i++) {
            if (i <= this.mMinIndex || i > this.mMaxIndex) {
                this.setBetBtnVisible(btnids[i], true, false);
            } else {
                this.setBetBtnVisible(btnids[i], true, true);
            }
        }
    },

    //设置 某 操作按钮 是否显示
    setBetBtnVisible: function (tag, state, enable) {
        if (enable == null) {
            enable = true;
        }
        var opbtn = this.mBetMenu.getChildByTag(tag);
        if (opbtn) {
            opbtn.setVisible(state);
            opbtn.setEnabled(enable)
        }
    },
    //设置 某 操作按钮 是否显示
    setBiBtnVisible: function (tag, state, enable) {
        //log("setBiBtnVisible="+tag+"="+state)
        if (enable == null) {
            enable = true;
        }
        var opbtn = this.mBiMenu.getChildByTag(tag);
        if (opbtn) {
            opbtn.setVisible(state);
            opbtn.setEnabled(enable)
        }
    },

    //显示该谁操作
    showPlayerActive: function () {
        if (this.mActiveChairId != -1) {
            this.mLunNumChair[this.mActiveChairId] ++;
            this.getCurrLoopNum();
            this.mShowAllBet.showAllBet();
            if (this.mActiveChairId == sGameData.mUser.chairId) {
                this.mBetNum = this.getCurrBetValue();
                //this.mLoopNum++;//轮数加
                //this.mShowAllBet.showAllBet();
                this.VisiblePlayButton(true);
                SoundManager.playSound(res.game_ready_mp3,false,SOUND_EFFECT);
                if(this.mLoopNum == 18){
                    SoundManager.playSound(res.zjh_fullmonney_mp3,false,SOUND_EFFECT1);
                }
                hiddenViewWhenAction();

                if (this.mLoopNum > this.mRoundBi) {
                    if (sGameData.mUser.softCash < this.mBetNum * 2) {
                        this.mIsAllGening = false;
                        this.mAllGenCheck.setVisible(false);
                        //this.VisibleOpenCardButton(true);
                        showNotice(sResWord.w_notice,sResWord.w_zjh_tip_opencard,12)
                    }
                }

                if(this.mIsAllGening){//
                    if (this.mLoopNum < this.mRoundMaxBi) {
                        this.op_genzhu();
                    }
                }
            }else{
                log("showPlayerActive closeAllButton");
                this.closeAllButton();
            }
            this.showClock(this.mActiveChairId);
        }

        if(this.mIsInGameChair[this.mMyChairId] == ISINGAME_NO
            || this.mPGameStateChair[this.mMyChairId] == PGAMESTATE_OVERGAME){
            log("showPlayerActive showChangeTableBtn");
           this.showChangeTableBtn(1);
        }
    },

    //接收到网络数据
    //坐下
    noticeZJHSitDown: function (netdata) {
        log("noticeZJHSitDown")
        var flag = netdata[1];
        if (flag == NET_SUCCESS) {
            var chairId = netdata[2]

            sGameData.mUser.chairId = chairId;
            this.mMyChairId = chairId;
            this.mBaseChairId = chairId;

            SoundManager.playSound(res.zjh_sitdown_mp3,false,SOUND_EFFECT1);

            if(this.mScoreView.visible){
                this.mScoreView.setVisible(false);
                this.reInitDataUI();
            }
            var p = this.getPlayerByIdx(sGameData.mUser.id);
            p.chairId = chairId;

            this.showPlayerByChair(chairId, 0, sGameData.mUser);
            this.mMyState = MYSTATE_SITDOWN;
            this.mChairSitDown[chairId] = SITDOWN_YES;
            this.mIsInGameChair[chairId] = ISINGAME_NO;

            sGameData.mMeStandUp = false;

            //需要重新 调整 玩家位置
           // this.baseChairChange();
        } else {
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },
    //站起
    noticeZJHStandUp: function (netdata) {
        log("noticeZJHStandUp")
        var flag = netdata[1];
        if (flag == NET_SUCCESS) {
            this.showPlayerByChair(sGameData.mUser.chairId, 1, null);
            this.mChairSitDown[sGameData.mUser.chairId] = SITDOWN_NO;
            this.mIsInGameChair[sGameData.mUser.chairId] = ISINGAME_NO;
            this.mLeaveChair[sGameData.mUser.chairId] = 1;
            if(!this.mIsInGame){
                this.cleanPlayerShow(sGameData.mUser.chairId);
            }
            sGameData.mUser.chairId = -1;
            this.mMyChairId = -1
            this.mMyState = MYSTATE_STAND;
            sGameData.mMeStandUp = true;
            var p = this.getPlayerByIdx(sGameData.mUser.id);
            p.chairId = -1;
            SoundManager.playSound(res.zjh_goout_mp3,false,SOUND_EFFECT1);
            this.VisibleContinueButton(false);
        } else {
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },
    //更新筹码数量（type： 0加减； 1重置）
    updateGameCash:function(chairId,cash,type){
        log("updateGameCash=="+chairId+"|"+cash+"|"+type)
        if(chairId == -1)return;
        var userhead = this.mUserHeadsArray[chairId];
        if(userhead){
            if(userhead.mShowPlayer){
                var player = this.getPlayer(userhead.mShowPlayer.id) ;
                if(player){
                    //log("update1")
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
    //更新显示玩家筹码
    updateShowPlayerCash:function(){
        for(var i=0;i<this.MAX_PLAYERNUM;i++){
            var aHead1 = this.mUserHeadsArray[i];
            if(aHead1!=null){
                aHead1.updateCashInfo();
            }
        }
    },
    //玩家数据发生变化
    noticeZJHNoticePlayerDataChange: function (netdata) {
        log("noticeZJHNoticePlayerDataChange")
        var flag = netdata[1];
        if (flag == NET_SUCCESS) {
            var type = netdata[2];
            var player = netdata[3];
            log("type=" + type + "=" + player.id)
            var p = this.getPlayer(player.id);
            if (type == SCORE_INFO_CHANGE) {
                if (p) {
                    p.xp = player.xp;
                    p.level = player.level;
                    p.softCash = player.softCash;
                    if (p.chairId != -1) {
                        this.updateGameCash(p.chairId, p.softCash, 1);
                    }
                    if (player.id == sGameData.mUser.id) {
                        log("my cash=="+p.softCash);
                        sGameData.mUser.softCash = p.softCash;
                        sGameData.mUser.xp = p.xp;
                        sGameData.mUser.level = p.level;
                    }
                }
            } else if (type == ENTER_ROOM_CHANGE || type == BASIC_INFO_CHANGE || type == ENTER_TABLE_CHANGE) {
                if (type == ENTER_TABLE_CHANGE) {
                    if (!p) {
                        this.addPlayer(player);
                    }
                    p = player;
                }
            } else if (type == SITDOWN_CHANGE) {
                if (p) {
                    p.chairId = player.chairId;

                    if (player.id == sGameData.mUser.id) {
                        sGameData.mUser.chairId = player.chairId;
                        this.mMyChairId = player.chairId;
                        this.mMyState = MYSTATE_SITDOWN;
                        this.mBaseChairId = sGameData.mUser.chairId;
                        //this.baseChairChange();
                    }
                    this.mIsInGameChair[p.chairId] = ISINGAME_NO;
                    log("sit===" + p.chairId + "|" + p.userName);
                    this.mChairSitDown[p.chairId] = SITDOWN_YES;
                    this.showPlayerByChair(p.chairId, 0, p);
                    SoundManager.playSound(res.zjh_sitdown_mp3,false,SOUND_EFFECT1);
                }

            } else if (type == STANDUP_CHANGE || type == EXIT_ROOM_CHANGE || type == EXIT_TABLE_CHANGE) {
                if (p) {
                    if (type != STANDUP_CHANGE) {
                        this.removePlayer(p.id);
                    }
                    if (p.chairId != -1) {
                        this.showPlayerByChair(p.chairId, 1, null);
                        this.mChairSitDown[p.chairId] = SITDOWN_NO;
                        this.mIsInGameChair[p.chairId] = ISINGAME_NO;
                        this.mLeaveChair[p.chairId] = 1;
                        if(!this.mIsInGame){
                            this.cleanPlayerShow(p.chairId);
                        }
                        p.chairId = -1;

                    }
                    SoundManager.playSound(res.zjh_goout_mp3,false,SOUND_EFFECT1);

                    if(this.mPlayerList.length == 1){
                        this.mGameUI.setInviteBtnEnable();
                    }

                }
                if (player.id == sGameData.mUser.id) {
                    this.mMyState = MYSTATE_STAND;
                    sGameData.mUser.chairId = -1;
                    this.mMyChairId = -1;
                    sGameData.mMeStandUp = true;
                    this.VisibleContinueButton(false);
                }
            } else if (type == NOTIFY_READY) {
                if (p) {
                    var seat = this.getPlayerSeatByChairId(p.chairId)
                    this.mShowOPView.showOPImage(seat,6);
                    this.mShowCardType.showTypeImage(seat,30);
                    SoundManager.playSound(res.zjh_readybtn_mp3);
                }
            }
        } else {
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },
    //游戏开始
    noticeZJHGameStart: function (netdata) {
        log("noticeZJHGameStart")
        var flag = netdata[1];
        if (flag == NET_SUCCESS) {
            var bankChairId = netdata[2];
            var nextChairId = netdata[3];
            var gameNo = netdata[4];

            log("本局游戏开始---");
            this.mGameUI.setInviteBtnDisable();

            this.VisibleContinueButton(false);
            this.mIsCheckCanChangeTableing = false;

            this.reInitDataUI();

            this.mZhuangChairId = bankChairId;
            this.mActiveChairId = nextChairId;
            this.showZhuang(this.mZhuangChairId);
            this.mIsInGame = true;
            this.mLastChairId = -1;
            this.mGameNo = gameNo;

            log("this.mZhuangChairId=" + this.mZhuangChairId)
            log("this.mActiveChairId=" + this.mActiveChairId)

            for (var i = 0; i < this.MAX_PLAYERNUM; i++) {
                if (this.mChairSitDown[i] == SITDOWN_YES) {
                    this.mFapaiStateChair[i] = 1;
                    this.mIsInGameChair[i] = ISINGAME_YSE;
                    this.mPGameStateChair[i] = PGAMESTATE_INGAME;
                    var userhead = this.mUserHeadsArray[i];
                    if(userhead){
                        userhead.setInGame(true);
                    }
                } else {
                    this.mFapaiStateChair[i] = 0;
                    this.mIsInGameChair[i] = ISINGAME_NO;
                    this.mPGameStateChair[i] = PGAMESTATE_OVERGAME;
                }
            }
            this.showGameStart();

        } else {
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },
    //投注
    noticeZJHBet: function (netdata) {
        log("noticeZJHBet")
        var flag = netdata[1];
        if (flag == NET_SUCCESS) {
            var betNum = netdata[2];
            var chairId = netdata[3];
            var nextChairId = netdata[4];

            closeNotice();
            this.closeClock();
            this.closeAllButton(1);
            log("----action bet c=" + chairId + "-" + betNum + "  " + nextChairId);
            this.mLastBetNum = betNum;
            this.mAllBetNum += this.mLastBetNum;
            this.mLastChairId = chairId;

            var lastSeat = this.getPlayerSeatByChairId(chairId);

            this.mPBetNumsChair[chairId] += betNum;
            this.showBetNum(chairId)

            this.updateGameCash(chairId,-betNum,0)

            this.startBetAnim(lastSeat, betNum);


            log(this.mScoreNameArray[chairId] + " 投注 " + betNum);

            var aAnIndex = this.mLastBetIndex;

            var bIndex = this.getBetIndex(betNum);
            if (this.mSeeCardChair[chairId] == 0) {//没看牌
                this.mLastBetIndex = bIndex;
            } else {
                this.mLastBetIndex = bIndex - 1;
            }
            if (this.mLastBetIndex < 0) {
                this.mLastBetIndex = 0;
                log("mLastBetIndex  error min");
            } else if (this.mLastBetIndex > 3) { //暗注 最多到 3
                this.mLastBetIndex = 3;
                log("mLastBetIndex  error max");
            }

            if (this.mLastBetIndex > aAnIndex) {

                this.playOPSound(lastSeat,1)
                this.mShowOPView.showOPImage(lastSeat,2);
            } else {

                this.playOPSound(lastSeat,2)
                this.mShowOPView.showOPImage(lastSeat,1);
            }

            log("mLastBetIndex====" + this.mLastBetIndex + "||" + this.mPGameStateChair[chairId] + "|" + bIndex);
            this.mShowAllBet.showAllBet();
            this.mBetNum = this.getCurrBetValue();

            this.mActiveChairId = nextChairId;
            this.showPlayerActive();

        } else {
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },

    //弃牌
    noticeZJHGiveUp: function (netdata) {
        log("noticeZJHGiveUp")
        var flag = netdata[1];
        if (flag == NET_SUCCESS) {
            var chairId = netdata[2];
            var nextChairId = netdata[3];

            log("----action giveup " + chairId + "-|" + nextChairId);

            this.mPGameStateChair[chairId] = PGAMESTATE_OVERGAME

            closeNotice();


            //当发生弃牌时，不显示换桌
            sGameData.mZJHChangeTabVisible = false;
            this.closeClock();
            this.closeAllButton(1);

            var seat = this.getPlayerSeatByChairId(chairId);
            this.mShowOPView.showOPImage(seat,5);

            SoundManager.playSound(res.zjh_pass1_mp3,false,SOUND_EFFECT);
            this.playOPSound(seat,5)


            this.mShowCardType.showTypeImage(seat, 21);
            this.setGiveupCard(seat);

            log(this.mScoreNameArray[chairId] + " 弃牌");
            var userhead = this.mUserHeadsArray[chairId];
            if(userhead){
                userhead.setInGame(false);
            }


            this.mActiveChairId = nextChairId;
            this.showPlayerActive();

        } else {
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },
    //看牌
    noticeZJHSeeCard: function (netdata) {
        log("noticeZJHSeeCard")
        var flag = netdata[1];
        if (flag == NET_SUCCESS) {
            var cards = netdata[2];
            log("----action seecard " + cards);
            this.mPlayerCardValueArrayChair[this.mMyChairId] = cards;
            this.showPlayerCard(0);
            this.mSeeCardChair[this.mMyChairId] = 1;
            this.mBetNum = this.getCurrBetValue();
            this.mShowChooseBet.showBet(true, this.mBetNum);
            if (this.mIsShowBetBtn) {
                this.setBetRange();
            }
            this.mShowOPView.showOPImage(0,3);
            this.playOPSound(0,3)
            this.setOPBtnVisible(this.ButtonID_KANPAI, true, false);
            log(this.mScoreNameArray[this.mMyChairId] + " 看牌");
            if (this.mActiveChairId == sGameData.mUser.chairId) {
                if (this.mLoopNum > this.mRoundBi) {//能都比牌 ，且自己操作时
                    var needbitype = this.checkNeedBipaiNow();
                    if (needbitype > 0) {
                        //showLittleNotice(sResWord.w_zjh_tip_needbipainow, 1, 3);
                    }
                }
                if (this.mLoopNum > this.mRoundBi) {
                    if (sGameData.mUser.softCash < this.mBetNum * 2) {
                        //this.VisibleOpenCardButton(true);
                        this.mIsAllGening = false;
                        this.mAllGenCheck.setVisible(false);
                        showNotice(sResWord.w_notice,sResWord.w_zjh_tip_opencard,12)
                    }
                }
            }
        } else {
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },
    //通知某人看牌
    noticeZJHNoticeSeeCard: function (netdata) {
        log("noticeZJHNoticeSeeCard")
        var flag = netdata[1];
        if (flag == NET_SUCCESS) {
            var chairId = netdata[2];
            var seat = this.getPlayerSeatByChairId(chairId);
            this.playOPSound(seat,3)
            log("----action other see " + chairId + "|" + seat);
            this.mSeeCardChair[chairId] = 1;
            this.mShowCardType.showTypeImage(seat, 20);
            this.mShowOPView.showOPImage(seat,3);
            log(this.mScoreNameArray[chairId] + " 看牌");

        } else {
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },
    //比牌
    noticeZJHCompare: function (netdata) {
        log("noticeZJHCompare")
        var flag = netdata[1];
        if (flag == NET_SUCCESS) {
            var fromChairId = netdata[2];
            var betNum = netdata[3];
            var otherChairId = netdata[4];
            var winChairId = netdata[5];
            var nextChairId = netdata[6];

            sGameData.mZJHChangeTabVisible = true;

            log("c0:" + fromChairId + " bet:" + betNum + " to c1:" + otherChairId + "  win:" + winChairId + "   --|" + nextChairId);
            this.closeClock();
            this.closeAllButton(1);

            this.mVSFromChairId = fromChairId;
            this.mVSOtherChairId = otherChairId;
            this.mVSWinChairId = winChairId;
            var fromSeat = this.getPlayerSeatByChairId(fromChairId);
            var otherSeat = this.getPlayerSeatByChairId(otherChairId);

            this.mLastBetNum = betNum;
            this.mBetNum = this.getCurrBetValue();
            this.mAllBetNum += this.mLastBetNum;
            this.mShowAllBet.showAllBet();
            this.startBetAnim(fromSeat, betNum);

            this.updateGameCash(fromChairId,-betNum,0);

            this.mPBetNumsChair[fromChairId] += betNum;
            this.showBetNum(fromChairId)

            this.mShowOPView.showOPImage(fromSeat,4);


            this.playOPSound(fromSeat,4)

            if (winChairId == fromChairId) {
                this.mPGameStateChair[otherChairId] = PGAMESTATE_OVERGAME;//对方输了
            } else {
                this.mPGameStateChair[fromChairId] = PGAMESTATE_OVERGAME;//比方输了
            }
            this.mLastChairId = fromChairId;

            this.mActiveChairId = nextChairId;
            if (this.mActiveChairId == -1) {
                log("is -- over ");
            }
            this.mCompareChair = [fromChairId, otherChairId];
            this.startCompareAnim(this.mCompareChair[0], this.mCompareChair[1]);

            log(this.mScoreNameArray[this.mCompareChair[0]] + " 与 " + this.mScoreNameArray[this.mCompareChair[1]] + " 比牌,投注 " + betNum);


        } else {
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },
    noticeZJHOpenCard: function (netdata) {
        log("noticeZJHOpenCard")
        var flag = netdata[1];
        if (flag == NET_SUCCESS) {
            var chairId = netdata[2];
            var betNum = netdata[3];
            var msg = netdata[4];
            showLittleNotice(msg,0,3);

            closeNotice();

            this.closeClock();
            this.closeAllButton();

            this.mLastBetNum = betNum;
            this.mAllBetNum += betNum;
            this.mLastChairId = chairId;

            var lastSeat = this.getPlayerSeatByChairId(chairId);

            this.mPBetNumsChair[chairId] += betNum;
            this.showBetNum(chairId)

            this.updateGameCash(chairId,-betNum,0)

            this.startBetAnim(lastSeat, betNum);

            log(this.mScoreNameArray[chairId] + " 投注 " + betNum);



        } else {
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },
    //游戏结束
    noticeZJHGameOver: function (netdata) {
        log("noticeZJHGameOver")
        var flag = netdata[1];
        if (flag == NET_SUCCESS) {
            var winChairId = netdata[2];
            var wdatas = netdata[3];

            this.mIsInGame = false;
            this.mIsGameOver = true;

            this.closeClock();
            this.closeAllButton();

            SoundManager.playSound(res.zjh_gameover_mp3,false,SOUND_EFFECT);

            this.mScoreView.setVisible(true);
            this.mScoreView.setValue(wdatas);

            for (var i = 0; i < wdatas.length; i++) {
                var data = wdatas[i];
                log(data.chairId + "得分:" + data.currScore + "类型:" + data.cardType);

                log("data.cards=" + data.cards)
                this.mPlayerCardValueArrayChair[data.chairId] = data.cards;

                var seat = this.getPlayerSeatByChairId(data.chairId);
                if (data.currScore > 0) {
                    this.mWinChairId = data.chairId;
                    var winSeat = seat;
                    this.showBetBackAnim(winSeat);
                    if(data.chairId == this.mMyChairId){
                        //this.mShowWinCoinView.showAnim(data.currScore);
                        sGameData.mZJHChangeTabVisible = true;
                        this.mShowAllBet.startShowAnim();
                    }
                    this.showPlayerCard(seat,false);//显示位置上的牌图片
                    this.showWinner(winSeat);
                }else{
                    this.showPlayerCard(seat);//显示位置上的牌图片
                    this.mShowCardType.showTypeImage(seat,data.cardType);
                }
                var player = this.getPlayerByChairId(data.chairId)
                if(player){
                    //得分 把 自己的投注减去了 计算得分时加上来
                    var pbetnum = this.mPBetNumsChair[data.chairId];
                    player.softCash += data.currScore+pbetnum;
                    if(player.id == sGameData.mUser.id){
                        sGameData.mUser.softCash += data.currScore+pbetnum
                    }
                }
            }
            this.updateShowPlayerCash();
            sGameData.mIsGameShowAniming = true;
            //this.VisibleContinueButton(true);
            this.mIsShowOverAnim = true;
            var time = 1;
            var callback = cc.CallFunc.create(this.showScoreEnd, this);
            var seq = cc.Sequence.create(cc.DelayTime.create(time), callback);
            this.runAction(seq);
        } else {
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },

    //显示得分结束
    showScoreEnd: function () {

        this.mIsShowOverAnim = false;
        sGameData.mIsGameShowAniming = false;
        log("showScoreEnd=="+this.mLeaveChair)
        for(var i = 0;i<this.MAX_PLAYERNUM;i++){
            if(this.mLeaveChair[i] == 1){
                this.cleanPlayerShow(i);
            }
        }

        log("show score end----" + this.mMyState + sGameData.mIsSendingData + sGameData.mMeStandUp);
        if (this.mMyState == MYSTATE_SITDOWN && this.mIsInGameChair[this.mMyChairId] == ISINGAME_YSE ) {//在游戏桌
            this.VisibleContinueButton(true);
            //if (!sGameData.mIsSendingData && !sGameData.mMeStandUp) {
            //    sGameNetData.mZJHNet.sendZJHContinue();
            //    sGameData.mIsSendingData = true;
            //}
        }
        //this.reInitDataUI();
    },
    noticeZJHJiCard:function(netdata){
        log("noticeZJHJiCard")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            var aJiCardData = netdata[2]
            log("aJiCardData.cards==="+aJiCardData.cards)
            sGameData.mZJHLayer.mJiCardData = aJiCardData;
            sGameData.mZJHLayer.mShowAllBet.showJiCardInfo();
        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },
    noticeZJHJiCardWin:function(netdata){
        log("noticeZJHJiCardWin")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            var userId = netdata[2]
            var ptype = netdata[3]
            var pnum = netdata[4]
            var player = this.getPlayerByIdx(userId);
            if(player){
                var pmsg = sResWord.w_zjh_jicard_win_tip_s1+player.nickName+sResWord.w_zjh_jicard_win_tip_s2+pnum;
                if(ptype == GOODS_SOFTCASH){
                    pmsg += sResWord.w_softcash;
                }else if(ptype == GOODS_HARDCASH){
                    pmsg += sResWord.w_hardcash;
                }
                showLittleNotice(pmsg,0,2);
            }

        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },
    noticeZJHReRandomEnterNotify: function (netdata) {
        log("noticeZJHReRandomEnterNotify")
        var flag = netdata[1];
        if (flag == NET_SUCCESS) {
            var code = netdata[2];
            var msg = netdata[3];
            this.initGameData_sys();
            showLittleNotice(msg,0,2);
        } else {
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },
    //退出玩家
    noticeZJHKickPlayer: function (netdata) {
        log("noticeZJHKickPlayer")
        var flag = netdata[1];
        if (flag == NET_SUCCESS) {
            showNeedPayNotice(1,sResWord.w_tip_needpay)
        } else {
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },
    //聊天
    noticeZJHChat: function (netdata) {
        log("noticeZJHChat")
        var flag = netdata[1];
        if (flag == NET_SUCCESS) {
            var chair = netdata[2];
            var type = netdata[3];
            var chatId = netdata[4];
            var msg = netdata[5];
            var tochair = netdata[6];
            var seat = this.getPlayerSeatByChairId(chair)
            log("chat =="+chair+"|"+type+"|"+chatId)
            //type  1 常用聊天 2交互 3聊天 4私聊 5表情
            if(type == 1) {
                var sex = this.mSexArray[chair];
                var msg = this.mZJHLogic.mTalkMsg[sex][chatId];
                this.playTalkSound(sex, chatId);
                this.mChatView.showMsg(seat, msg)

                log("chair==" + chair + "|" + tochair)

            }else if(type == 2){
                log("seat==" + seat + "|" + toseat)
                var toseat = this.getPlayerSeatByChairId(tochair)
                var size = cc.director.getWinSize();

                var pos =  this.mZJHLogic.getHeadsPos();
                showInterative(seat,toseat,chatId,pos,this);
            }else if(type == 5) {
                this.playFaceSound(chatId);
                this.mShowFace.showFaceImage(seat, chatId)
                log("chair==" + chair + "|" +chatId)

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
        }else {
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },
    //玩家信息
    noticeZJHPlayerInfo: function (netdata) {
        log("noticeZJHPlayerInfo")
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
    //点击时 隐藏某些界面
    hiddenUIWithClick: function (pos) {

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

        if (!this.checkClickView(this.mJiCardView,pos)) {
            this.mJiCardView.setVisible(false);
        }

        this.hiddenUIWithClick_chat(this.mShowTalkView,pos,2);

        this.hiddenUIWithClick_chat(this.mChatFaceView,pos,2);

        this.hiddenUIWithClick_chat(this.mChatInputView,pos,2);

    },

    //是否点击到某些界面
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
        if(this.checkClickView(this.mShowTalkView,pos)){
            isclicked = true;
        }

        if(this.checkClickView(this.mChatFaceView,pos)){
            isclicked = true;
        }
        if(this.checkClickView(this.mChatInputView,pos)){
            isclicked = true;
        }
        return isclicked;
    },
    //点击开始
    onTouchBegan_g:function(pos){
        //log("onTouchBegan--")

        this.mTouchSeat = -1;
        sGameData.mClickState = 1;
        this.hiddenUIWithClick(pos)
        if(!checkButtonEnable()){
            return;
        }
        var clicked = this.isClickToTopView(pos)
        if(!clicked){
            var touchSeat = this.selectSeatForTouch(pos);
            log("touchSeat==" + touchSeat);
            if (touchSeat != -1) {
                this.mTouchSeat = touchSeat
            }
        }
    },
    //点击移动
    onTouchMoved_g:function(pos){

    },
    //点击结束
    onTouchEnded_g:function(pos){
        //log("onTouchEnded--")
        if(!checkButtonEnable()){
            return;
        }
        if(sGameData.mClickState == 1) {
            sGameData.mClickState = 2;
            if (this.mTouchSeat != -1) {
                var touchSeat = this.selectSeatForTouch(pos);
                log("touchSeat==" + touchSeat);
                if (touchSeat != -1 && this.mTouchSeat == touchSeat) {
                    this.clickSeat(touchSeat);
                }
            }else{
                this.checkFace(pos);
            }
        }
        if(this.mIsShowOverAnim){
            this.mIsShowOverAnim = false;
            this.stopAllActions();
            //self.mShowWinCoinView.stopAnim();
            this.showScoreEnd();
        }
    },

    //点击某位置
    clickSeat: function (seat) {
        if (seat == -1) return;

        var chairIdx = this.getPlayerChairIdBySeat(seat);
        log("clickSeat==" + seat + "=" + chairIdx + "|" + this.mChairSitDown[chairIdx]);

        if (this.mChairSitDown[chairIdx] == SITDOWN_NO) {
            if(!sGameData.mUseRandomSit) {
                if (this.mMyState == MYSTATE_STAND) {//坐下
                    //playClickSound();
                    SoundManager.playSound(res.zjh_opendoor_mp3);
                    log("sitdown ");
                    if (sGameData.mIsTestNoNet) {
                        log("no net sitdown---")
                        var p = getTestPlayerById(1);
                        p.chairId = 0;
                        this.showPlayerByChair(p.chairId, 0, p);
                    } else {
                        if(sGameData.mUser.softCash < sGameData.mCurrRoom.enterPoint){
                            //showLittleNotice(sResWord.w_softcash_notenough);
                            showNeedPayNotice(0,sResWord.w_tip_needpay)
                        }else {
                            if (!sGameData.mIsSendingData) {
                                sGameData.mSitDownChairIdx = chairIdx;
                                sGameNetData.mZJHNet.sendZJHSitDown(chairIdx);
                                sGameData.mIsSendingData = true;
                            }
                        }
                    }
                } else {//邀请别人游戏
                    log("invite player");
                }
            }
        } else {//查看玩家信息
            log("see player");
            var player = this.getPlayerByChairId(chairIdx);
            //showGamePlayerInfo(true,player,2,1);
            //sGameNetData.mZJHNet.sendZJHPlayerInfo(player.id)
        }
    },
    //每个位置的范围
    seatRect: function (seat) {
        var size = cc.director.getWinSize();
        var pos = this.mZJHLogic.getHeadsPos();
        //var pos =  [[200,100],[size.width-80,158],[size.width-80,358],[size.width-80,558],[80,558],[80,358]];
        var size_player_shadow = cc.size(120, 168);
        if(seat == 0){
            size_player_shadow = cc.size(240, 120);
        }
        var x = pos[seat].x;
        var y = pos[seat].y;
        var width = size_player_shadow.width;
        var height = size_player_shadow.height;
        return cc.rect(x - width / 2, y - height / 2, width, height);
    },
    //选择点击的位置 没点中为－1
    selectSeatForTouch: function (pos) {
        var touchSeat = -1;
        //触摸点坐标
        var p = pos;
        for (var i = 0; i < this.MAX_PLAYERNUM; i++) {
            var rect = this.seatRect(i);
            if (cc.rectContainsPoint(rect, p)) {       //判断鼠标拖拉的区域是否在位置上
                touchSeat = i;
                break;
            }
        }
        return touchSeat;
    },
    //检测点击表情
    checkFace:function(pos){
        var index = -1;
        if(this.mChatFaceView&&this.mChatFaceView.visible){
            index = this.mChatFaceView.checkClickFace(pos);
        }
    },
    //跳转到主界面
    gotoMain: function () {
        if (sGameData.mUseRandomSit) {
            gotoSceneByLoading(TargetSceneMain, 3);
        } else {
            gotoSceneByLoading(TargetSceneMain, 1);
        }
    },
    //播放声音
    //type 1：加注 2跟注 3 看牌 4比牌 5弃牌
    playOPSound:function(seat,type){
        var chairId= this.getPlayerChairIdBySeat(seat)
        var sex = this.mSexArray[chairId];
        log("playOPSound=="+seat+"|"+type +"|"+sex)
        if(type == 1){
            if(sex == 0){
                var sounds = [res.zjh_woman_addbet1_mp3,res.zjh_woman_addbet2_mp3]
                this.playRandSound(sounds)
            }else{
                SoundManager.playSound(res.zjh_man_addbet1_mp3)
            }
        }else if(type == 2){
            if(sex == 0){
                var sounds = [res.zjh_woman_callbet1_mp3,res.zjh_woman_callbet2_mp3]
                this.playRandSound(sounds)
            }else{
                var sounds = [res.zjh_man_callbet1_mp3,res.zjh_man_callbet2_mp3]
                this.playRandSound(sounds)
            }
        }else if(type == 3){
            if(sex == 0){
                var sounds = [res.zjh_woman_seecard1_mp3,res.zjh_woman_seecard2_mp3]
                this.playRandSound(sounds)
            }else{
                SoundManager.playSound(res.zjh_man_seecard1_mp3)
            }
        }else if(type == 4){
            if(sex == 0){
                SoundManager.playSound(res.zjh_woman_compare1_mp3)
            }else{
                SoundManager.playSound(res.zjh_man_compare1_mp3)
            }
        }else if(type == 5){
            if(sex == 0){
                var sounds = [res.zjh_woman_discard1_mp3,res.zjh_woman_discard2_mp3]
                this.playRandSound(sounds)
            }else{
                SoundManager.playSound(res.zjh_man_discard1_mp3)
            }
        }
    },
    playRandSound:function(sounds){
        var len = sounds.length
        var rand = randomInt(len);
        var sname = sounds[rand];
        SoundManager.playSound(sname)
    },
    playTalkSound:function(sex,index){
        var sound = this.mZJHLogic.mTalkSound[sex][index];
        SoundManager.playSound(sound,false,SOUND_TALK);
    },
    playFaceSound:function(index){
        var sound = this.mZJHLogic.mFaceSound[index];
        log("playFaceSound=="+sound);
        SoundManager.playSound(sound,false,SOUND_TALK);
    },
    playBGMusic:function(){
        SoundManager.playBGMusic(res.bg_music_game_mp3);
    }

});

ZJHLayer.create = function () {
    var sg = new ZJHLayer();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};
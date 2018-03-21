/**
 * Created by Administrator on 14-4-15.
 * 斗地主
 */
var DDZLayer = BaseGameLayer.extend({

    CARD_SPACE:45,//牌的距离
    CARD_SPACE_MAX:100,//牌的最大距离
    CARD_OUT_SPACE:30,//出牌的距离
    mIsDownChoose:false,//是在 下方（没选中是） 被选中
    mMoveStartPos:null,//移动开始位置
    mIsMouseDownMove:false,//处于按下 移动状态； 拖动选牌
    mIsMoveStart:false,//刚开始 移动

    mFapaiChair:0,//发牌的位置
    mFapaiNum:0,////发牌张数  0-16
    mFapaiendnumLun:0,//本轮发牌 结束的次数 1-3
    mBasePoint:1,//底分
    mBeishusChair:[0,0,0],//每个位置的倍数
    mBeishu : 1,//倍数
    mMinBet : 5,//倍率
    mActiveSeatId:-1,//当前操作玩家 位置号
    mDizhuChairId:-1,//地主椅子号
    mBuJiaoNum:0,//不叫牌的 家数  3家不叫 查王

    mShowCardChairId: 0,//获得明牌 的椅子号
    mShowCardIndex: 0,//明牌是第几张牌
    mShowCardValue: 0,//明牌值

    mDizhuCardValueArray:[],//摸的底牌 值
    mDizhuCardShowArray:[],//摸的底牌  显示集合

    mCardNumArray:[],//玩家 牌的 数量
    mPlayerCardValueArray:[],//玩家自己牌值
    mPlayerOutCardValueArray:[],//各家出牌 值
    mPlayerHandCardShowArray:[],//各家手里牌 显示集合
    mPlayerOutCardShowArray:[],//各家出牌 显示集合
    mCurrOutCards:[],//当前出牌
    mCurrOutCardsType:0,//当前出牌 类型
    mCardType:0,//当前牌 牌型
    mCallNum:0,//叫牌的分数
    mShowWarning:[],//显示报警

    mLastOutSeat:-1,//上1位出牌椅子号
    mCurrOutSeat:-1,//当前出牌椅子号

    mBasePointShow:null,//底分显示
    mBeishuShows:[],//倍数显示
    mCanShowBeishu:false,//叫牌之后才能显

    mSeeCard:[0,0,0],//看牌 位置seat为准
    mDaoLaState:[0,0,0],//倒拉状态  seat 1倒 2不道 3拉 4不拉
    mIsDaopai:false,//是否倒过牌
    mIsDaopai_me:false,//我是否倒过牌

    mIsTuoguaning:false,//是否正在托管

    mIsShowPlayBtning:false,//是否正在显示出牌按钮
    mIsShowMenzhuaBtning:false,//是否正在显示闷抓
    mIsShowDaoBtning:false,//是否正在显示倒
    mIsShowLaBtning:false,//是否正在显示拉
    mIsShowJiaoBtning:false,//是否正在显示叫
    mIsShowJiabeiBtning:false,//是否正在显示加倍

    mDizhuOutNum:0,//地主出牌次数

    mIsdaida:false,//是否是代打－－没使用
    mMyChairId:-1,//我的椅子号

    mTeshuNum:[0,0,0],//[火箭，炸弹，春天]

    mTalkMsg:[],//聊天语句
    mTalkSound:[],//聊天语句声音
    mFaceSound:[],//表情声音

    mTipMsg:"",//提示消息
    mTipLabel:null,//提示显示
    mDDZLogic:null,//斗地主 逻辑
    mOPMenu:null,//操作按钮
    mShowOP:null,//显示操作
    mCardNote:null,//记牌器
    mGameUI:null,//ui
    mShowCardCounts:[null,null,null],//牌数量显示
    mShowClock:null,//时钟
    mShowScore:null,//得分
    mShowScore_normal:null,//得分
    mShowEffect:null,//显示效果（飞机 炸弹等）
    mShowSetting:null,//设置
    mShowTalk:null,//聊天语句选择界面
    mChatFaceView:null,//聊天表情选择界面
    mChatInputView:null,//输入聊天
    mShowFace:null,//显示表情
    mShowChat:null,//显示聊天
    mShowCardTip:null,//牌提示
    mShowWait:null,//等待
    mMissionView:null,//任务显示
    mMatchWaitShow:null,//比赛等待
    mMatchResultShow:null,//比赛结果
    mMatchProgressShow:null,//比赛进度显示（第几场，底分多少，名次）
    mMatchTipShow:null,//提示
    mMatchPrizeShow:null,//奖励
    mMatchRankShow:null,//排名
    mMatchInfoTips:null,//消息提示
    mMatchUpProgressShow:null,//比赛一轮结束后显示

    mQuitClock:null,

    MAX_BEISHU:4096,//最大倍数 32

    //按钮tag
    BUTTON_TAG_OUTCARD: 10001,
    BUTTON_TAG_TISHI: 10002,
    BUTTON_TAG_GIVEUP: 10003,
    BUTTON_TAG_JIAO1FEN: 10010,//叫 1分
    BUTTON_TAG_JIAO2FEN: 10011,//叫 2分
    BUTTON_TAG_JIAO3FEN: 10012,//叫 3分
    BUTTON_TAG_BUJIAO:10013,//不叫

    BUTTON_TAG_JIABEI: 10014,//加倍 、、多乐
    BUTTON_TAG_BUJIABEI: 10015,//不加倍

    BUTTON_TAG_KANPAI_SC:50001,//看牌
    BUTTON_TAG_MENZHUA_SC:50002,//闷抓
    BUTTON_TAG_JIAOPAI_SC:50003,//叫牌
    BUTTON_TAG_BUJIAO_SC:50004,//不叫
    BUTTON_TAG_DAO_SC:50005,
    BUTTON_TAG_BUDAO_SC:50006,
    BUTTON_TAG_LA_SC:50007,
    BUTTON_TAG_BULA_SC:50008,


    BUTTON_TAG_JX: 10085,//继续
    BUTTON_TAG_FH: 10086,//返回

    BUTTON_TAG_JB: 10087,//举报

    BUTTON_TAG_MATCH_TUISAI: 10501,
    BUTTON_TAG_MATCH_BACKHALL: 10502,
    BUTTON_TAG_MATCH_SEEPRIZE: 10503,

    BUTTON_TAG_MATCH_PRIZE: 10504,
    BUTTON_TAG_MATCH_RANK: 10505,

    BUTTON_TAG_MATCH_BUBLOOD: 10506,
    BUTTON_TAG_MATCH_PAY: 10507,


    BUTTON_TAG_TUOGUAN: 20001,//托管
    BUTTON_TAG_QXTUOGUAN: 20002,//取消托管


    ButtonID_MISSION: 40002,

    self :null,
    //初始化
    init:function () {
        var bRet = false;
        if (this._super()) {

            sGameData.mDDZLayer = this;
            sGameData.mCurrLayer = this;

            log("DDZLayer start");
            this.mSitDownNoWait = false;//是否直接坐下
            this.MAX_PLAYERNUM = 3;// 设置游戏的最大玩家数

            this.mOPBtnSize = cc.size(120,50);

            self =this;
            //this.scheduleOnce(this.initInSecondFrame,0.05);
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
        sGameData.mDDZLayer = null;
    },
    //移出监听
    removeListeners:function(){
        if( 'touches' in cc.sys.capabilities ){
            cc.eventManager.removeListeners(this);
        }else if ('mouse' in cc.sys.capabilities ){
            cc.eventManager.removeListeners(this);
        }
    },
    //计算比赛的基本点数 (currPlayCount 当前玩的一局 也计算在内)
    checkMatchBasePoint:function(){
        var match = sGameData.mCurrMatch;
        match.basicGScore = match.baseScore;
        if(this.mMatchProgressShow){
            this.mMatchProgressShow.updateInfo();
        }
    },

    //第2帧初始化
    initInSecondFrame:function(){ //所有的参数要 初始化一编
        var size = cc.director.getWinSize();

        if(sGameData.mGameMode == GAMEMODE_NORMAL){
            this.mBasePoint = sGameData.mCurrRoom.basicPoint;
        }else{
            analyseMatchDatas(sGameData.mCurrMatch);
            this.checkMatchBasePoint();
            this.mBasePoint = sGameData.mCurrMatch.basicGScore;
        }
        this.mBeishu = 1;
        this.mBeishusChair = [0,0,0];

        this.mTalkMsg = [[sResWord.w_ddz_woman_talk1,sResWord.w_ddz_woman_talk2,sResWord.w_ddz_woman_talk3,sResWord.w_ddz_woman_talk4,sResWord.w_ddz_woman_talk5],
            [sResWord.w_ddz_man_talk1,sResWord.w_ddz_man_talk2,sResWord.w_ddz_man_talk3,sResWord.w_ddz_man_talk4,sResWord.w_ddz_man_talk5]];

        this.mTalkSound = [[res.ddz_woman_talk_1_mp3,res.ddz_woman_talk_2_mp3,res.ddz_woman_talk_3_mp3,res.ddz_woman_talk_4_mp3,res.ddz_woman_talk_5_mp3],
            [res.ddz_man_talk_1_mp3,res.ddz_man_talk_2_mp3,res.ddz_man_talk_3_mp3,res.ddz_man_talk_4_mp3,res.ddz_man_talk_5_mp3]];

        this.mFaceSound = [res.face01_mp3,res.face02_mp3,res.face03_mp3,res.face04_mp3,res.face05_mp3,res.face06_mp3,res.face07_mp3,res.face08_mp3,res.face09_mp3,res.face10_mp3,res.face11_mp3,res.face12_mp3,res.face13_mp3,res.face14_mp3,res.face15_mp3,res.face16_mp3,res.face17_mp3,res.face18_mp3,res.face19_mp3,res.face20_mp3,res.face21_mp3,res.face22_mp3,res.face23_mp3,res.face24_mp3,res.face25_mp3];

        var blockSize = cc.size(200, 100);
//        var tipLabel = cc.LabelTTF.create("", sGameData.mFontname,24, blockSize, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_TOP);
//        tipLabel.attr({
//            x:size.width,
//            y:0,
//            anchorX: 1,
//            anchorY:0
//        });
//        this.addChild(tipLabel, 5);
//        this.mTipLabel = tipLabel;

        this.initButtons();



        var beishuposes = [[188,220],[size.width-115,size.height-225],[115,size.height-225]];
        for(var i=0;i<3;i++){
            var pos = beishuposes[i];
            var showbeishu = DDZShowNum.create();
            showbeishu.setPosition(cc.p(pos[0],pos[1]));
            this.addChild(showbeishu,2);
            showbeishu.setValue(0);
            this.mBeishuShows[i] = showbeishu;
            showbeishu.setVisible(false);
        }

        var basepointtip = cc.LabelTTF.create(sResWord.w_ddz_difen+":", sGameData.mFontname,26);
        basepointtip.setPosition(cc.p(size.width/2-25,size.height-103));//150
        this.addChild(basepointtip, 2);
        basepointtip.setColor(cc.color(229,218,30))//23,166,206

        var basepointshow = ShowNum.create();
        basepointshow.attr({
            x:size.width/2+30,
            y:size.height-103,
            anchorY:1
        });
        this.addChild(basepointshow,2);
        this.mBasePointShow = basepointshow;
        this.mBasePointShow.setValue(2,formatcash(this.mBasePoint),1,1);
        if(sGameData.mUseDDZRule == DDZ_RULE_NORMAL) {
            //basepointtip.x = basepointtip.x+100;
            //basepointshow.x = basepointshow.x +100;

            //var beishutip = cc.LabelTTF.create(sResWord.w_ddz_beishu + ":", sGameData.mFontname, 26);
            //beishutip.setPosition(cc.p(size.width / 2 - 25-100, size.height - 103));
            //this.addChild(beishutip, 2);
            //beishutip.setColor(cc.color(229, 218, 30))//23,166,206
            //
            //var beishushow = ShowNum.create();
            //beishushow.attr({
            //    x: size.width / 2 + 30-100,
            //    y: size.height - 103,
            //    anchorY: 1
            //});
            //this.addChild(beishushow, 2);
            //this.mBeishuShow = beishushow;
            //this.mBeishuShow.setValue(2, this.mBeishu, 1, 1);
        }



        //ui 按钮
        var gameui = DDZGameUI.create();
        this.addChild(gameui,55);
        this.mGameUI = gameui;
        this.showBeiShuInView(this.mBeishu,this.mBasePoint);

        //操作显示
        var showop = DDZShowOP.create();
        this.addChild(showop,50);
        this.mShowOP = showop;

        //牌数量
        var cardcount1 = DDZCardCount.create();
        cardcount1.x = size.width -50;
        cardcount1.y = size.height - 200;
        this.addChild(cardcount1,0);
        cardcount1.setVisible(false);
        this.mShowCardCounts[1] = cardcount1;

        //牌数量
        var cardcount2 = DDZCardCount.create();
        cardcount2.x = 50;
        cardcount2.y = size.height - 200;
        this.addChild(cardcount2,0);
        cardcount2.setVisible(false);
        this.mShowCardCounts[2] = cardcount2;

        //记牌器
        var cardsnote = DDZCardsNote.create();
        cardsnote.x = size.width / 2;
        cardsnote.y = size.height - 70;
        this.addChild(cardsnote,0);
        cardsnote.setVisible(false);
        this.mCardNote = cardsnote;
        //时钟
        var clock = DDZClock.create();
        clock.x = size.width / 2;
        clock.y = size.height / 2;
        this.addChild(clock,50);
        clock.setVisible(false);
        this.mShowClock = clock;
        //得分界面
        var scoreshow = DDZScore.create();
        scoreshow.x = size.width / 2;
        scoreshow.y = size.height / 2;
        this.addChild(scoreshow,70);
        scoreshow.setVisible(false);
        this.mShowScore = scoreshow;



        var scoreshow_normal = DDZScore_normal.create();
        scoreshow_normal.x = size.width / 2;
        scoreshow_normal.y = size.height / 2;
        this.addChild(scoreshow_normal,70);
        scoreshow_normal.setVisible(false);
        this.mShowScore_normal = scoreshow_normal;

        //特效显示 飞机 火箭等
        var showEffect = DDZEffects.create();
        showEffect.x = size.width / 2;
        showEffect.y = size.height / 2;
        this.addChild(showEffect,65);
        this.mShowEffect = showEffect;
        //设置
        var setting = GameSetting.create();
        setting.x = size.width / 2;
        setting.y = size.height / 2;
        this.addChild(setting,155);
        setting.setVisible(false);
        this.mShowSetting = setting;

        var chattype = 4;
        if(sGameData.mGameMode != GAMEMODE_NORMAL) {
            chattype = 7;
        }

        //选择聊天表情
        var face = GameChatFace.create(chattype);
        face.x = size.width / 2;
        face.y = size.height / 2;
        this.addChild(face,200);
        face.setVisible(false);
        this.mChatFaceView = face;

        var chatinput = GameChatInput.create(chattype);
        chatinput.x = size.width / 2;
        chatinput.y = size.height / 2;
        this.addChild(chatinput,200);
        chatinput.setVisible(false);
        this.mChatInputView = chatinput;

        //显示表情
        var showface = GameShowChatFace.create(chattype);
        this.addChild(showface,83);
        this.mShowFace = showface;

        //显示聊天语句选择
        var talk = GameChatMsg.create(chattype);
        talk.x = size.width / 2;
        talk.y = size.height / 2;
        this.addChild(talk,200);
        talk.setVisible(false);
        this.mShowTalk = talk;

        //显示聊天
        var chatshow = GameShowChatMsg.create(chattype);
        this.addChild(chatshow,65);
        //chatshow.setVisible(false);
        this.mShowChat = chatshow;

        //牌提示
        var showcardTip = DDZShowCardTip.create();
        this.addChild(showcardTip,30);
        showcardTip.setPosition(cc.p(size.width / 2,100));
        this.mShowCardTip = showcardTip;
        //显示等待
        var showwait = DDZWait.create();
        this.addChild(showwait,10)
        showwait.setPosition(cc.p(size.width/2,300));
        this.mShowWait = showwait
        if(sGameData.mGameMode == GAMEMODE_MATCH||sGameData.mGameMode == GAMEMODE_MATCH_VIDEO) {
            this.mShowWait.stopAnim();
            this.mShowWait.setVisible(false);
        }


        this.mDDZLogic = new DDZLogic();
        this.mTipMsg = "";


        this.initGameData();

        this.initUserHead_Basic(DDZUserHead);

        if(sGameData.mGameMode == GAMEMODE_MATCH||sGameData.mGameMode == GAMEMODE_MATCH_VIDEO){
            var matchwait = DDZMatchWait.create();
            this.addChild(matchwait,10)
            matchwait.setPosition(cc.p(size.width/2,360));
            this.mMatchWaitShow = matchwait;
            //matchwait.setVisible(false);
            if(sGameData.mGameMode == GAMEMODE_MATCH_VIDEO){
                matchwait.setVisible(false);
            }

            var matchresult = DDZMatchResult.create();
            this.addChild(matchresult,100)
            matchresult.setPosition(cc.p(size.width/2,size.height/2));
            matchresult.setVisible(false);
            this.mMatchResultShow = matchresult;

            var matchtip = DDZMatchTip.create();
            this.addChild(matchtip,10)
            matchtip.setPosition(cc.p(size.width/2,size.height/2));
            //matchtip.setVisible(false);
            this.mMatchTipShow = matchtip;

            var progressshow = DDZMatchProgress.create();
            this.addChild(progressshow,1);
            progressshow.setPosition(cc.p(size.width/2,size.height/2+125));
            this.mMatchProgressShow = progressshow;
            progressshow.setVisible(false);

            var upprogressshow = DDZMatchUpProgress.create();
            this.addChild(upprogressshow,100);
            upprogressshow.setPosition(cc.p(size.width/2,size.height/2-100));
            this.mMatchUpProgressShow = upprogressshow;
            upprogressshow.setVisible(false);


            var showPrize = DDZMatchPrize.create();
            this.addChild(showPrize,105)
            showPrize.setPosition(cc.p(size.width/2,size.height/2));
            showPrize.setVisible(false);
            this.mMatchPrizeShow = showPrize;


            var showRank = DDZMatchRank.create();
            this.addChild(showRank,105)
            showRank.setPosition(cc.p(size.width/2,size.height/2));
            showRank.setVisible(false);
            this.mMatchRankShow = showRank


            var infotipsshow = DDZMatchInfoTips.create();
            this.addChild(infotipsshow,10)
            infotipsshow.setPosition(cc.p(size.width/2,size.height/2-120));
            this.mMatchInfoTips = infotipsshow;

            if(sGameData.mCurrMatch.mark ==MATCH_NOTIFY_WAIT_START){
                this.mMatchWaitShow.setVisible(false);
                this.VisibleMatchStartButton(false);
                this.VisibleMatchRankButton(true);
                this.showMatchTip(2)
                this.mMatchUpProgressShow.setVisible(true);
                this.mMatchUpProgressShow.showView();
                this.hiddenCardcount();
            }
            if(sGameData.mCurrMatch.mark ==MATCH_NOTIFY_WAIT_END){
                this.mMatchWaitShow.setVisible(false);
                this.VisibleMatchStartButton(false);
                this.VisibleMatchRankButton(true);
                this.showMatchTip(3)
                this.hiddenCardcount();
            }

        }


        dealClickTouch(this);

        showUILoadWait(false);

        if(sGameData.mGameMode == GAMEMODE_MATCH_VIDEO){
            analyseVideoData();
        }

        this.playBGMusic();
        this.mHasInitView = true;
    },
    checkIsShowTopView:function(){
        var isShowTopView = false;
        if(sGameData.mGameMode == GAMEMODE_MATCH||sGameData.mGameMode == GAMEMODE_MATCH_VIDEO){
            if(this.mMatchPrizeShow&&this.mMatchPrizeShow.visible){
                isShowTopView = true;
            }
            if(this.mMatchRankShow&&this.mMatchRankShow.visible){
                isShowTopView = true;
            }
        }
        return isShowTopView;
    },
    //初始化游戏数据
    initGameData:function(type){
        log("initGameData-");
        if(type == null){
            type = 0;
        }
        this.mMoveStartPos = cc.p(0,0);
        this.mPlayerCardValueArray =[];
        if(type == 0) {
            this.mPlayerList = [];
        }
        for(var i = 0;i<3;i++){
            this.mPlayerHandCardShowArray[i] = [];
            this.mPlayerOutCardShowArray[i] = [];
            this.mPlayerOutCardValueArray[i] = [];
            if(type == 0){
                this.mChairSitDown[i] = 0;
            }
            this.mChairReady[i] = 0;
            this.mShowWarning[i] = 0;
            this.mSeeCard[i] = 0;
            this.mDaoLaState[i] = 0;
        }
        this.mDizhuCardShowArray = [];
        this.mTeshuNum = [0,0,0];
        this.mCallNum = 0;
        this.mBujiaoNum = 0;
        this.mDizhuOutNum = 0;
        this.mLastOutSeat = -1;
        this.mCurrOutSeat = -1;
        this.mCardNote.reinit();
        this.mIsDaopai = false;
        this.mIsDaopai_me = false;
        this.mIsTuoguaning = false;
        this.mCanShowBeishu = false;
        this.setTuoguanState();
    },
    //重置数据界面
    reInitDataUI:function(){
        this.cleanall();
        this.initGameData();
        this.VisibleContinueButton(false);
        this.mShowScore.setVisible(false);
        this.mShowScore.hidden()

        this.mShowScore_normal.setVisible(false);
        this.mShowScore_normal.stopAnim()

    },

    //按钮响应
    op_t_test1:function(){
        log("test111")

        this.VisibleContinueButton(true);



//        var outcards = [[3,3,3,4,4,4,5,5,5,6,6,6]];
//        var len = outcards.length;
//        for(var i=0;i<len;i++){
//            var cards = outcards[i];
//            log("outcards=="+cards);
//            var cardstype = this.mDDZLogic.getOutCardType(cards);
//            log("outcardstype=="+cardstype);
//        }
        //this.VisibleContinueButton(true);
        //this.VisiblePlayButton(true);
        //this.VisibleJiaoButton(true);
//        var size = cc.size(200,60);
//        var aSprite = createOpButton("sadf",size,0);
//        aSprite.attr({
//            x:500,
//            y:100
//        });
//        this.addChild(aSprite,2);
           var seat = randomInt(3);
        var toseat = randomInt(3);
//           this.mShowOP.showOPImage(seat,4);
//
//
//        this.showDizhuCard(false);
//
//
//        var count = randomInt(17);
//
//        this.setSeatCardcount(seat,count);
//
//        this.showClock(seat,true);
//
//        //showLittleNotice("abc");
//        //this.mGameUI.gotoMain();
//
        var type =randomInt(6);
        log("showEffect="+type);
       // this.mShowEffect.showEffect(0,seat,toseat);
//
//        //this.playOPSound(seat,type+1);
//
//        //playFapaiSound();
        var msg = this.mTalkMsg[0][3];
        //this.mShowChat.showMsg(seat,msg)
        var index = randomInt(3);
 //       this.startShowFace(seat,index);
//
        //this.mShowScore.showLoseAnim();
        //this.mShowScore.setVisible(true)
//
//        var cardcount = this.mShowCardCounts[1]
//        if(cardcount){
//            cardcount.setFlash();
//        }
//
//
//        var size = cc.director.getWinSize();
//        var pos0 = cc.p(10,205)
//        var pos1 = cc.p(size.width - 120 - 10,size.height- 168 - 30)
//        var pos2 = cc.p(10,size.height - 168 -30)
//        var pos =  [pos0,pos1,pos2];
//        //showInterative(seat,toseat,chatId,pos,this);

        var aTestCardValues = getTestCards();

        var size = cc.director.getWinSize();

        //
        //var show =  this.getChildByTag(555566);
        //if(!show){
        //    show = BaseCardShow.create();
        //    this.addChild(show);
        //    show.setTag(555566)
        //    show.setPosition(cc.p(300,150))
        //}
        //if(show){
        //    show.setCardValue(aTestCardValues[0]);
        //}


        //this.reInitDataUI();
        //if(sGameData.mGameMode == GAMEMODE_MATCH||sGameData.mGameMode == GAMEMODE_MATCH_VIDEO) {
        //
        //    var lunnum = sGameData.mCurrMatch.lundatas.length;
        //    sGameData.mCurrMatch.currPlayLun = randomInt(lunnum-1)+1;
        //
        //    this.mMatchUpProgressShow.setVisible(true);
        //    this.mMatchUpProgressShow.showView();
        //    //this.mMatchInfoTips.setVisible(true)
        //
        //    //this.mMatchResultShow.setVisible(true);
        //}
        //this.mShowScore.setVisible(true);

    },


    op_t_FaCard:function(){

        log("testFaCard--")

        this.cleanall();

        this.mGameNo = "a35"

        this.showGameTip("game start");
        this.mShowCardChairId = 0;
        this.mShowCardIndex = 7;
        this.mShowCardValue = 5;
        //this.setDizhu(0,true);

        this.mIsInGame = true;

        var aTestCardValues = getTestCards();
        this.mPlayerCardValueArray =[];
        for(var i=0;i<17;i++){
            var value = aTestCardValues[i];
            this.mPlayerCardValueArray.push(value);
        }
        log("my cards = "+this.mPlayerCardValueArray);

        //this.mActiveSeatId = mApp.randRange(0,2);

        this.fapaiStart();

    },

    op_clicked:function(tag){
        log("op_clicked=="+tag)
        playClickSound();
    },
    op_match_tuisai:function(){
        log("op_match_tuisai==")
        playClickSound();
        this.showMatchNotice(sResWord.w_notice,sResWord.w_match_tip_tuisai,3,1);
    },
    op_do_tuisai:function(){
        if(!sGameData.mIsTestNoNet){
            if(sGameData.mCurrMatch.type == MATCHSTART_COUNT){ //人满开赛
                if(sGameData.mCurrMatch.started){
                    showLittleNotice(sResWord.w_match_tip_cannotquit);
                    //sGameNetData.mDDZMatchNet.sendDDZMatchReqExitMatch(sGameData.mCurrMatch.id,sGameData.mCurrMatch.roomId);
                }else{
                    sGameNetData.mDDZMatchNet.sendDDZMatchCancelSignup(sGameData.mCurrMatch.id,sGameData.mCurrMatch.roomId);
                }
            }else{
                if(sGameData.mCurrMatch.started){
                    showLittleNotice(sResWord.w_match_tip_cannotquit);
                    //sGameNetData.mDDZMatchNet.sendDDZMatchReqExitMatch(sGameData.mCurrMatch.id,sGameData.mCurrMatch.roomId);
                }else{
                    sGameNetData.mDDZMatchNet.sendDDZMatchCancelSignup(sGameData.mCurrMatch.id,sGameData.mCurrMatch.roomId);
                }
            }
        }else{
            gotoSceneByLoading(TargetSceneMain,0);
        }
    },
    op_match_backhall:function(){
        log("op_match_backhall==")
        if(this.checkIsShowTopView()){
            return
        }
        playClickSound();
        if(sGameData.mGameMode == GAMEMODE_MATCH_VIDEO){
            gotoSceneByLoading(TargetSceneMain, 0);
        }else{
            if(!sGameData.mIsTestNoNet) {
                sGameNetData.mDDZMatchNet.sendDDZMatchTimeBackHall();
            }else{
                gotoSceneByLoading(TargetSceneMain, 0);
            }
        }
    },
    op_match_seeprize:function(){
        log("op_match_seeprize==")
        if(this.checkIsShowTopView()){
            return
        }
        playClickSound();
        if(sGameData.mGameMode == GAMEMODE_MATCH_VIDEO){
            return;
        }
        this.showMatchPrize(true);
    },
    op_match_showrank:function(){
        log("op_match_showrank==")
        if(this.checkIsShowTopView()){
            return
        }
        playClickSound();
        if(sGameData.mGameMode == GAMEMODE_MATCH_VIDEO){
            return;
        }
        if(!sGameData.mIsTestNoNet) {
            sGameNetData.mDDZMatchNet.sendDDZMatchRank();
        }else {
            this.showMatchRank(true);
        }
    },
    op_match_pay:function(){
        log("op_match_pay==")
        if(this.checkIsShowTopView()){
            return
        }
        playClickSound();
    },
    //继续
    op_continue:function(){
        this.buttonClicked();
        log("op_continue=");
        playClickSound();
        if(sGameData.mUser.softCash < sGameData.mCurrRoom.enterPoint){
            //showLittleNotice(sResWord.w_softcash_notenough);
            showNeedPayNotice(0,sResWord.w_tip_needpay)
        }else {
            sGameNetData.mDDZNet.sendDDZContinue();
        }
        this.reInitDataUI();
        this.mShowWait.setVisible(true);
        this.mShowWait.showAnim();
        this.cleanHeads();
    },

    op_canceltuoguan:function(){
        this.buttonClicked();
        playClickSound();
        this.mIsTuoguaning = false;
        this.setTuoguanState();
        this.sendTuoguanCancelCmd();
    },

    setTuoguanState:function(){
        if(this.mIsTuoguaning){
            this.setOPBtnVisible(this.BUTTON_TAG_QXTUOGUAN,true);
        }else{
            this.setOPBtnVisible(this.BUTTON_TAG_QXTUOGUAN,false);
        }
    },
    //显示任务
    op_showmission:function(){
        this.buttonClicked();
        playClickSound();
        log("op_showmission");
//        if (!sGameData.mIsTestNoNet) {
//            sGameData.mGameNet.sendTaskList(1, sGameData.mCurrRoom.roomId);
//        }else {
//            this.showMission();
//        }
    },
    //返回大厅
    op_backhall:function(){
        this.buttonClicked();
        log("op_backhall=");
        playClickSound();
        sGameNetData.mDDZNet.sendDDZExitRoom();
        this.mShowScore.setVisible(false);
        this.mShowScore.hidden()
        this.mShowScore_normal.setVisible(false);
        this.mShowScore_normal.stopAnim();
        this.VisibleContinueButton(false);
    },

    //举报玩家
    op_report:function(){
        this.buttonClicked();
        log("op_report=");
        playClickSound();
        showLittleNotice(sResWord.w_match_tip_report);

        var reportBtn = this.mOPMenu.getChildByTag(this.BUTTON_TAG_JB);
        if(reportBtn){
            reportBtn.setVisible(false);
        }
    },

    //叫牌 type 1
    op_jiao1:function(){
        this.buttonClicked();
        log("op_jiao=1");
        playClickSound();
        if(sGameData.mGameMode == GAMEMODE_MATCH_VIDEO){
            return;
        }
        this.sendCallCardCmd(1);
        this.VisibleJiaoButton(false);
        this.showClock(0,false);
    },
    //叫牌 type 1
    op_jiao2:function(){
        this.buttonClicked();
        log("op_jiao=2");
        playClickSound();
        if(sGameData.mGameMode == GAMEMODE_MATCH_VIDEO){
            return;
        }
        this.sendCallCardCmd(2);
        this.VisibleJiaoButton(false);
        this.showClock(0,false);
    },
    //叫牌 type 1
    op_jiao3:function(){
        this.buttonClicked();
        log("op_jiao=3");
        playClickSound();
        if(sGameData.mGameMode == GAMEMODE_MATCH_VIDEO){
            return;
        }
        this.sendCallCardCmd(3);
        this.VisibleJiaoButton(false);
        this.showClock(0,false);
    },
    //不叫牌
    op_bujiao:function(){
        this.buttonClicked();
        log("op_bujiao=");
        playClickSound();
        if(sGameData.mGameMode == GAMEMODE_MATCH_VIDEO){
            return;
        }
        this.sendCallCardCmd(0);
        this.VisibleJiaoButton(false);
        this.showClock(0,false);
    },

    op_jiabei:function(){
        this.buttonClicked();
        log("op_jiabei=");
        this.VisibleJiabeiButton(false);
        this.sendJiabeiCmd(1);
        this.showClock(0,false);
    },
    op_bujiabei:function(){
        this.buttonClicked();
        log("op_bujiabei=");
        this.VisibleJiabeiButton(false);
        this.sendJiabeiCmd(0);
        this.showClock(0,false);
    },

    op_kanpai_sc:function(){
        this.buttonClicked();
        log("op_kanpai_sc");
        playClickSound();
        this.VisibleMenzhuaButton(false);
        this.sendSeeCardCmd();
    },
    op_menzhua_sc:function(){
        this.buttonClicked();
        log("op_menzhua_sc");
        playClickSound();
        this.VisibleMenzhuaButton(false);
        this.sendCallCardCmd(1);
    },
    op_jiaopai_sc:function(){
        this.buttonClicked();
        log("op_jiaopai_sc");
        playClickSound();
        this.VisibleJiaoButton(false);
        this.sendCallCardCmd(1);
    },
    op_bujiao_sc:function(){
        this.buttonClicked();
        log("op_bujiao_sc");
        playClickSound();
        this.VisibleJiaoButton(false);
        this.sendCallCardCmd(0);
    },
    op_dao_sc:function(){
        this.buttonClicked();
        log("op_dao_sc");
        playClickSound();
        this.VisibleDaoButton(false);
        this.sendDaoLaCmd(1);
    },
    op_budao_sc:function(){
        this.buttonClicked();
        log("op_budao_sc");
        playClickSound();
        this.VisibleDaoButton(false);
        this.sendDaoLaCmd(2);
    },
    op_la_sc:function(){
        this.buttonClicked();
        log("op_la_sc");
        playClickSound();
        this.VisibleLaButton(false);
        this.sendDaoLaCmd(3);
    },
    op_bula_sc:function(){
        this.buttonClicked();
        log("op_bula_sc");
        playClickSound();
        this.VisibleLaButton(false);
        this.sendDaoLaCmd(4);
    },


    //出牌
    op_outcards:function(){
        this.buttonClicked();
        log("op_outcards");
        playClickSound();
        if(sGameData.mGameMode == GAMEMODE_MATCH_VIDEO){
            return;
        }
        this.checkChooseCardCanOut();
        this.playerOutCard();

        if(this.mIsTuoguaning){
            this.mIsTuoguaning = false;
            this.setTuoguanState();
            this.sendTuoguanCancelCmd();
        }

    },
    //提示  type 1有
    op_tishi:function(){
        this.buttonClicked();
        log("op_tishi");
        playClickSound();
        if(sGameData.mGameMode == GAMEMODE_MATCH_VIDEO){
            return;
        }
        this.showCardHelp();
        this.mShowCardTip.showTip(0);
    },
    //不出
    op_buchu:function(){
        this.buttonClicked();
        log("op_buchu");
        playClickSound();
        if(sGameData.mGameMode == GAMEMODE_MATCH_VIDEO){
            return;
        }
        if(this.mPlayerCardValueArray.length==20) return;//地主第一次必须出
        if(this.mPlayerOutCardValueArray[1].length==0 && this.mPlayerOutCardValueArray[2].length==0)return;//上2家没出  必须出牌
        //先把如果已经选择了的牌复位
        for(var i =0;i<this.mPlayerHandCardShowArray[0].length; i++){
            var card = this.mPlayerHandCardShowArray[0][i];
            if(card.mChoosed){
                card.unchoose();
            }
        }
        this.mPlayerOutCardValueArray[0] = [];
        this.VisiblePlayButton(false);
        this.sendOutCardCmd(this.mDDZLogic.NO_CARD, []);
        this.showClock(0,false);
    },
    //显示提示
    showMatchNotice:function(name,msg,type,from,data){
        log("showNotice---");
        var notice = (this.getChildByTag(58888));
        if(!notice){
            notice = DDZMatchNoticeLayer.create();
            var size = cc.director.getWinSize();
            notice.setPosition(cc.p(size.width*0.5,size.height*0.5));
            this.addChild(notice,104,58888);
        }else{
            notice.setVisible(true);
        }
        if(notice){
            sGameData.mIsShowNoticeing = true;
            notice.showNotice(name,msg,type,from,data);
        }
    },
    showMatchTip:function(type){
        this.cleanall(1);
        this.cleanHeads();
        if(this.mMatchTipShow){
            this.mMatchTipShow.showTip(type);
        }
    },
    showMatchRank:function(state){
        if(this.mMatchRankShow){
            this.mMatchRankShow.setVisible(state)
            if(state){
                this.mMatchRankShow.updateInfo()
            }
        }
    },
    showMatchPrize:function(state){
        if(this.mMatchPrizeShow){
            this.mMatchPrizeShow.setVisible(state)
            if(state){
                this.mMatchPrizeShow.updateInfo()
            }
        }
    },
    showMatchResult:function(state,name,rank){
        this.cleanall(1);
        this.cleanHeads();
        if(sGameData.mGameMode == GAMEMODE_MATCH){
            if(this.mMatchWaitShow){
                this.mMatchWaitShow.setVisible(false);
                this.mMatchInfoTips.setVisible(false)
                this.mMatchUpProgressShow.setVisible(false);
            }
            this.VisibleMatchStartButton(false);
            this.VisibleMatchRankButton(true);
        }
        if(this.mMatchResultShow){
            this.mMatchResultShow.setVisible(state)
            if(state&&name){
                this.mMatchResultShow.updateInfo(name,rank)
            }
        }
    },
    //显示玩家说话
    startShowPlayerTalk:function(index){
        log("startShowPlayerTalk=="+index);
        this.mShowTalk.setVisible(false);
        var sex = sGameData.mUser.sex;
        var msg = this.mTalkMsg[sex][index];
        //this.playTalkSound(sex,index);
        if(!sGameData.mIsTestNoNet){
            var now  = (new Date()).getTime();
            if(now - sGameData.mChatTime < sGameData.mChatDurTime*1000){
                var durtime = sGameData.mChatDurTime;
                var word = sResWord.w_tip_interative_s1+durtime+sResWord.w_tip_interative_s2;
                showLittleNotice(word)
                return;
            }
            sGameData.mChatTime = (new Date()).getTime();
            this.sendChatCmd(1,index,"",0);
        }
    },
    //显示表情
    startShowFace:function(seat,index){
        log("startShowFace="+seat+"|"+index)
        this.mShowFace.showFaceImage(seat,index);
    },
    //显示设置
    showSetting:function(){
        if(this.mShowSetting.visible){
            this.mShowSetting.setVisible(false);
        }else{
            this.mShowSetting.setVisible(true);
        }
    },
    //显示选择聊天面板
    op_showGameChatMsg:function(){

        var tars = [this.mChatFaceView,this.mShowTalk,this.mChatInputView]
        this.op_showGameChatView(tars,1);

    },
    op_showGameChatInput:function(){
        var tars = [this.mChatFaceView,this.mShowTalk,this.mChatInputView]
        this.op_showGameChatView(tars,2);
    },
    //操作 显示 选择聊天界面
    op_showGameChatFace:function(){
        log("op_showface");
        var tars = [this.mChatFaceView,this.mShowTalk,this.mChatInputView]
        this.op_showGameChatView(tars,0);
    },
    //显示记牌器
    showCardNote:function(state){
        if(this.mCardNote.visible){
            this.mCardNote.setVisible(false);
        }else{
            this.mCardNote.setVisible(true);
        }
    },
    //显示时钟
    showClock:function(seat,state,type){
        if(type == null){
            type = 0;
        }
        if(this.mShowClock){
            this.mShowClock.setVisible(state);
            if(state){
                this.mShowClock.setCountDown(seat,type);
            }else{
                this.mShowClock.closeClock();
            }
        }
    },
    clockTimeOver:function(){
        log("clockTimeOver==")
        if(this.mActiveSeatId == 0){
            //this.daida_ai();
            log("this.mIsTuoguaning=="+this.mIsTuoguaning)
            if(!this.mIsTuoguaning){
                this.mIsTuoguaning = true;
                this.setTuoguanState();
                this.sendTuoguanCmd();
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
    //显示任务
    showMission:function(state){

    },
    //显示任务时 改变某些按钮状态
    setMissionButtonState:function(state){
        var pmenu = this.mOPMenu;
        if(pmenu){
            var missionitem = pmenu.getChildByTag(this.ButtonID_MISSION)
            if(missionitem){
                missionitem.setEnabled(state)
            }
        }
    },

    //开始发牌
    fapaiStart:function(){
        sGameData.mPausedCommand_Use = true;
        this.mFapaiNum = 0;
        this.mIsFapaiing = true;
        this.mCardNumArray = [17,17,17];
        this.fapaiToSeat(this.mFapaiNum);
    },
    //给某位置发牌
    fapaiToSeat:function(index){
        //log("fapaiToSeat--")
        var seat = 0;
        var size = cc.director.getWinSize();
        for (var i = 0;i<3;i++){
            seat = i;
            var acard = DDZCard.create();
            acard.attr({
                x: size.width / 2,
                y: size.height -150
            });
            this.addChild(acard,5+index);
            acard.setScale(sGameData.mDDZ_othercard_scale);

            this.mPlayerHandCardShowArray[seat].push(acard);
            acard.mSeat = seat;
            acard.mIndex = index;

            var pos = this.getCardPos(seat,0,1);//this.getCardPos(seat,index,17);
            var moveanim = cc.MoveTo.create(0.15,pos);
            var callback = cc.CallFunc.create(this.fapaiToSeatend, this);
            var actions = cc.Sequence.create(moveanim,callback);
            acard.runAction(actions);
        }
    },
    //给某位置发牌结束
    fapaiToSeatend:function(acard){
        //log("fapaiToSeatend--"+this.mFapaiNum)
        var seat = acard.mSeat;
        if(seat == 0){
            playFapaiSound();
            var cv = this.mPlayerCardValueArray[this.mFapaiNum];
            acard.setCardValue(cv);
            this.resetPosToCards();
        }else{
            this.mPlayerHandCardShowArray[seat].shift();
            this.removeChild(acard);
            this.setSeatCardcount(seat,(this.mFapaiNum+1));
        }
        this.mFapaiendnumLun++;
        if(this.mFapaiendnumLun == 3){
            this.mFapaiendnumLun = 0;
            this.mFapaiNum++;
            if(this.mFapaiNum < 17 ){
                this.fapaiToSeat(this.mFapaiNum);
            }else{
                this.fapaiEnd();
            }
        }
    },
    //发牌结束
    fapaiEnd:function(){
        log("fapaiEnd===")
        this.mIsFapaiing = false;

        this.mPlayerCardValueArray.sort(sortByCard);
        log("my cards = "+this.mPlayerCardValueArray);
        this.sortPlayerHandCard();

        this.showDizhuCard(false);
        sGameData.mPausedCommand_Use = false;
        this.mIsFapaiing = false;

        if(this.mActiveSeatId == 0){
            if(sGameData.mUseDDZRule == DDZ_RULE_SC) {//sc 便是看牌 叫牌
                this.VisibleMenzhuaButton(true);
            }else{//普通 显示 123分
                this.VisibleJiaoButton(true);
            }
        }
        this.showClock(this.mActiveSeatId,true);
    },

    //设置地主
    setDizhu:function(dizhuseat,state){
        for(var i = 0;i<3;i++){
            var aHead1 = this.mUserHeadsArray[i];
            if(aHead1!=null){
                if(i==dizhuseat){
                    aHead1.setDizhu(true,state);
                }else{
                    aHead1.setDizhu(false,state);
                }
            }
        }
    },
    //显示某位置的牌数量
    setSeatCardcount:function(seat,count){
        var cardcount = this.mShowCardCounts[seat]
        if(cardcount){
            cardcount.setVisible(true);
            cardcount.setCount(count);
        }
    },
    //停止牌 数量 报警 闪烁
    stopCardcountFlash:function(){
        var cardcount = this.mShowCardCounts[1]
        if(cardcount){
            cardcount.stopFlash();
        }
        var cardcount = this.mShowCardCounts[2]
        if(cardcount){
            cardcount.stopFlash();
        }
    },
    hiddenCardcount:function(){
        var cardcount = this.mShowCardCounts[1]
        if(cardcount){
            cardcount.setVisible(false);
        }
        var cardcount = this.mShowCardCounts[2]
        if(cardcount){
            cardcount.setVisible(false);
        }
    },
    //获取牌的距离
    getCardSpace:function(len){
        var size = cc.director.getWinSize();
        var space = this.CARD_SPACE
        if(len > 1){
            space = Math.floor((size.width - DDZ_CARD_WIDTH*sGameData.mDDZ_mycard_scale-20)/(len-1));
            this.CARD_SPACE_MAX = DDZ_CARD_WIDTH*sGameData.mDDZ_mycard_scale*0.9;
            if(space > this.CARD_SPACE_MAX){
                space = this.CARD_SPACE_MAX;
            }
        }
        return space;
    },
    //获取牌的位置
    getCardPos:function(seat,index,len){
        var size = cc.director.getWinSize();
        var space = this.CARD_SPACE
        if(seat == 0&&len > 1){
            space = this.getCardSpace(len);
        }
        var pos = cc.p(0,0);
        var startX = 0;
        if(seat ==0){
            startX = (size.width- ((len-1) * space + DDZ_CARD_WIDTH*sGameData.mDDZ_mycard_scale))/2;
            pos.x = startX + index *space;
            pos.y = 10;
        }else if(seat ==1){
            pos.x = size.width - 45 - DDZ_CARD_WIDTH;
            pos.y = size.height - 263 ;
        }else if(seat ==2){
            pos.x = 45;
            pos.y = size.height - 263  ;
        }else if(seat ==-1){
            var twidth = 48;
            startX = (size.width- ((len-1) * 10 + len*twidth))/2;
            pos.x = startX + index * (twidth+10);
            pos.y = size.height - 70 ;

        }
        return pos;
    },
    //获取牌的位置
    getCardOutPos:function(seat,index,len){
        var pos = cc.p(0,0);
        var startX = 0;
        var size = cc.director.getWinSize();
        if(seat ==0){
            startX = (size.width- ((len-1) * this.CARD_OUT_SPACE + DDZ_CARD_WIDTH*sGameData.mDDZ_othercard_scale) )/2;
            pos.x = startX + index *this.CARD_OUT_SPACE;
            pos.y = 220;
        }else if(seat ==1){
            if(len > 9){
                len = 9;
            }
            startX = (size.width- 155 - ((len-1) * this.CARD_OUT_SPACE + DDZ_CARD_WIDTH*sGameData.mDDZ_othercard_scale));
            pos.x = startX + (index%9)*this.CARD_OUT_SPACE ;
            pos.y = size.height - 240 - Math.floor(index/9)*50 ;
        }else if(seat ==2){
            pos.x = 155 + (index%9)*this.CARD_OUT_SPACE ;
            pos.y = size.height - 240 - Math.floor(index/9)*50;
        }
        return pos;
    },
    //重新设置牌位置
    resetPosToCards:function(seat,index,len){
        this.sortPlayerHandCard();
    },
    /**
     * 发完牌后  显示底牌
     */
    showDizhuCard:function(show)
    {
        log(" showdizu"+show);
        this.cleanDizhuCardObject();
        for(var i=0;i < 3;i++)
        {
            var acard = DDZCard.create();

            acard.mSeat = -1;
            acard.mIndex = i;
            var pos = this.getCardPos(-1,i,3);
            acard.setPosition(pos);
            if(show){
                var cardValue= this.mDizhuCardValueArray[i];
                acard.setCardValue(cardValue);
            }else {
                acard.setCardValue(0);
            }
            this.addChild(acard,65+i);
            acard.setScale(sGameData.mDDZ_topdizhucard_scale);
            this.mDizhuCardShowArray.push(acard);
        }


        this.mGameUI.showDeviceInfo(1);


    },
    //重新 排列 玩家 手里牌
    sortPlayerHandCard:function(showMingCard,dizhucards){
        var len = this.mPlayerCardValueArray.length;
        var len1 = this.mPlayerHandCardShowArray[0].length;
        for(var i =0;i<len1;i++){
            var aCard = this.mPlayerHandCardShowArray[0][i];
            aCard.mIndex = i ;
            aCard.unchoose();
            aCard.setCardValue(this.mPlayerCardValueArray[i]);
            aCard.mDisable = false;
            var pos = this.getCardPos(0,i,len1);
            aCard.setPosition(pos);
            if(showMingCard){
                if(valuecontain(dizhucards,this.mPlayerCardValueArray[i])&&this.mPlayerCardValueArray[i] > 0){
                    aCard.choose();
                }
            }
        }
        if(showMingCard){
            var callback = cc.CallFunc.create(this.unchooseDizhuCard, this);
            var seq = cc.Sequence.create(cc.DelayTime.create(2), callback);
            this.runAction(seq);
        }
    },
    unchooseDizhuCard:function(){
        this.sortPlayerHandCard()
    },
    daida_tuoguan:function(){
        log("daida_tuoguan------")
        return;
        if(this.mIsFapaiing) return ;
        if(!this.mIsInGame) return;
        if(this.mActiveSeatId == 0){
            var callback = cc.CallFunc.create(this.daida_ai, this);
            var seq = cc.Sequence.create(cc.DelayTime.create(1.5), callback);
            this.runAction(seq);
        }
    },
    daida_ai:function(){
        log("daida_ai------")
        if(this.mIsFapaiing) return ;
        if(!this.mIsInGame) return;
        if(this.mActiveSeatId == 0) {
            if ((this.mPlayerOutCardShowArray[2].length == 0 && this.mPlayerOutCardShowArray[1].length==0) || this.mPlayerCardValueArray.length == 20) {
                this.showCardHelp();
                this.playerOutCard();
            } else {
                this.op_buchu()
            }
        }
    },
    //获取打算出的牌的值
    getPreOutCardValues:function(){
        this.mPlayerOutCardValueArray[0] = [];
        for(var i=0;i<this.mPlayerHandCardShowArray[0].length;i++)
        {
            var card=this.mPlayerHandCardShowArray[0][i]
            if(card.mChoosed == true){
                var cardValue = card.mCardValue;
                this.mPlayerOutCardValueArray[0].push(cardValue);
            }
        }
        log("this.mPlayerOutCardValueArray[0]="+this.mPlayerOutCardValueArray[0])
    },
    //清除选中的牌
    cleanChooseCards:function(){
        this.mPlayerOutCardValueArray[0] = [];
        for(var i=0;i<this.mPlayerHandCardShowArray[0].length;i++)
        {
            var card=this.mPlayerHandCardShowArray[0][i]
            if(card.mChoosed == true){
                card.unchoose();
            }
        }
    },
    // 检查是否能出牌
    checkCanOutUp:function(){
        log("do checkCanOutUp--"+this.mPlayerCardValueArray)
        var canOutUp = true;
        var aiArray = [] ;
        //如果上家有人出了,
        if(this.mPlayerOutCardShowArray[2].length>0){
            log("this.mPlayerOutCardValueArray[2]=="+this.mPlayerOutCardValueArray[2])
            var outCards = this.mCurrOutCards;
            aiArray = this.mDDZLogic.AI_Out_Card(outCards,this.mPlayerCardValueArray,this.mIsdaida);
            outCards = aiArray;//下一个
            if(outCards.length <= 0){
                outCards = this.mPlayerOutCardValueArray[2];
                aiArray = this.mDDZLogic.AI_Out_Card(outCards,this.mPlayerCardValueArray,this.mIsdaida);
            }
            log("aiArray="+aiArray)
            if(aiArray.length == 0){
                canOutUp = false;
            }
        }else if(this.mPlayerOutCardShowArray[1].length>0){
            log("this.mPlayerOutCardValueArray[1]=="+this.mPlayerOutCardValueArray[1])
            var outCards = this.mCurrOutCards;
            aiArray = this.mDDZLogic.AI_Out_Card(outCards,this.mPlayerCardValueArray,this.mIsdaida);
            outCards = aiArray;//下一个
            if(outCards.length <= 0){
                outCards = this.mPlayerOutCardValueArray[1];
                aiArray = this.mDDZLogic.AI_Out_Card(outCards,this.mPlayerCardValueArray,this.mIsdaida);
            }
            log("aiArray="+aiArray)
            if(aiArray.length == 0){
                canOutUp = false;
            }
        }
        log("checkCanOutUp=="+canOutUp)
        return canOutUp;
    },
    // 检查选出的牌是否能出
    checkChooseCardCanOut:function(){
        if(this.mActiveSeatId == 0) {
            var canout = this.checkCanOutUp();
            if (canout) {
                if(this.mPlayerCardValueArray.length == 1){
                    this.mCardType = this.mDDZLogic.SINGLE_CARD;
                    this.mPlayerOutCardValueArray[0] = this.mPlayerCardValueArray;
                    this.sendOutCardCommand();
                    this.VisiblePlayButton(false);
                    return;
                }
                this.getPreOutCardValues();
                if (this.mPlayerOutCardValueArray[0].length > 0) {
                    this.mCardType = this.mDDZLogic.getOutCardType(this.mPlayerOutCardValueArray[0]);//玩家出牌类型
                    log("mCardType==" + this.mCardType)
                    if (this.mCardType == -1) {
                        log(" 不符合出牌规则=" + this.mPlayerOutCardValueArray[0]);
                        this.mShowCardTip.showTip(1);
                        return;
                    } else {

                    }
                    if (this.mPlayerOutCardValueArray[2].length > 0) {
                        canOut = this.mDDZLogic.Compare_Out_Card(this.mPlayerOutCardValueArray[2], this.mPlayerOutCardValueArray[0]);
                        if (canOut == true) {
                            this.mShowCardTip.showTip(0);
                        } else {
                            log("没有上家大或类型不一样  ");
                            //this.mShowCardTip.showTip(2);
                            return;
                        }
                    } else if (this.mPlayerOutCardValueArray[1].length > 0) {
                        canOut = this.mDDZLogic.Compare_Out_Card(this.mPlayerOutCardValueArray[1], this.mPlayerOutCardValueArray[0]);
                        if (canOut == true) {
                            this.mShowCardTip.showTip(0);
                        } else {
                            log("没有上家大或类型不一样  ");
                            //this.mShowCardTip.showTip(2);
                            return;
                        }
                    } else {
                        this.mShowCardTip.showTip(0);
                    }
                }
            }else{
                this.mShowCardTip.showTip(2);
                if(this.mPlayerCardValueArray.length == 1){
                    this.op_buchu();
                }
            }
        }

    },
    // 帮助
    showCardHelp:function(){
        //先把如果已经选择了的牌复位
        //先把如果已经选择了的牌复位
        for(var i =0;i<this.mPlayerHandCardShowArray[0].length; i++){
            var card = this.mPlayerHandCardShowArray[0][i];
            if(card.mChoosed){
                card.unchoose();
            }
        }
        var aiArray = [] ;

        //如果上家有人出了,
        if(this.mPlayerOutCardShowArray[2].length>0){
            aiArray = this.mDDZLogic.AI_Out_Card(this.mCurrOutCards,this.mPlayerCardValueArray,this.mIsdaida);
            this.mCurrOutCards = aiArray;//下一个
            if(this.mCurrOutCards.length <= 0){
                this.mCurrOutCards = this.mPlayerOutCardValueArray[2];
                aiArray = this.mDDZLogic.AI_Out_Card(this.mCurrOutCards,this.mPlayerCardValueArray,this.mIsdaida);
                this.mCurrOutCards = aiArray;//下一个
            }
            if(this.mCurrOutCards.length==1){
                if(this.mCurrOutCards[0]==16){
                    this.mCurrOutCards[0] = 0x4F;
                }else if(this.mCurrOutCards[0]==17){
                    this.mCurrOutCards[0] = 0x5F;
                }
            }
        }else if(this.mPlayerOutCardShowArray[1].length>0){
            aiArray = this.mDDZLogic.AI_Out_Card(this.mCurrOutCards,this.mPlayerCardValueArray,this.mIsdaida);
            this.mCurrOutCards = aiArray;//下一个
            if(this.mCurrOutCards.length <= 0){
                this.mCurrOutCards = this.mPlayerOutCardValueArray[1];
                aiArray = this.mDDZLogic.AI_Out_Card(this.mCurrOutCards,this.mPlayerCardValueArray,this.mIsdaida);
                this.mCurrOutCards = aiArray;//下一个
            }
            if(this.mCurrOutCards.length==1){
                if(this.mCurrOutCards[0]==16){
                    this.mCurrOutCards[0] = 0x4F;
                }else if(this.mCurrOutCards[0]==17){
                    this.mCurrOutCards[0] = 0x5F;
                }
            }
        }else{
            if(this.mDDZLogic.getOutCardType(this.mPlayerCardValueArray)!=-1){//一把 能 出完
                aiArray=this.mDDZLogic.getCardsWithoutColor(this.mPlayerCardValueArray);
            }else{
                log(" 新的一轮出牌");
                //aiArray=this.mDDZLogic.getMinSingleCard_out(this.mPlayerCardValueArray);//都没出,提示一张最小单牌
                if(this.mDDZLogic.IFTHREE_WITH_TWO_CARD){ //允许3带2
                    aiArray=this.mDDZLogic.getMinTHREEWITHTWOLINKCARD_out_me(this.mPlayerCardValueArray);//333 444 5566
                    if(aiArray.length==0){
                        aiArray=this.mDDZLogic.getMinTHREEWITHLINKCARD_out_me(this.mPlayerCardValueArray);//333 444 56
                    }
                }else{
                    aiArray=this.mDDZLogic.getMinTHREEWITHLINKCARD_out_me(this.mPlayerCardValueArray);//333 444 56
                }
                if(aiArray.length==0)
                {
                    aiArray=this.mDDZLogic.getMinDoubleLinkCard_out_me(this.mPlayerCardValueArray);//看有没有板凳（不带王的）
                }
                if(aiArray.length==0)
                {
                    aiArray=this.mDDZLogic.getMinLinkCard_out_me(this.mPlayerCardValueArray); //看有没有顺子（不带王的）

                }
                if(aiArray.length==0)
                {
                    aiArray=this.mDDZLogic.getMinThreeCardwithOne_out_me(this.mPlayerCardValueArray); //3带1 或 3带2

                }
                if(aiArray.length==0)
                {
                    aiArray=this.mDDZLogic.getMinDoubleCard_out_me(this.mPlayerCardValueArray); //看有没有对（没算2）（不带王的）
                }
                if(aiArray.length==0)
                {
                    aiArray=this.mDDZLogic.getMinSingleCard_out(this.mPlayerCardValueArray);
                }
            }
        }
        //traces("mCurrOutCards:"+mCurrOutCards.toString());
        aiArray.sort(sortByCard);
        log("个数:"+aiArray.length+"提示出牌"+aiArray.toString()+"\r\n");
        log("原个数:"+this.mPlayerCardValueArray.length+"牌"+this.mPlayerCardValueArray+"\r\n");
        if(aiArray.length>0){
            for(var j = 0;j<aiArray.length;j++){
                for(i =0;i<this.mPlayerHandCardShowArray[0].length; i++)
                { //trace(" aiArray"+j+"-"+i+"="+aiArray[j]+"="+card.cardNum+"-"+getCardValue(card.cardNum));
                    var card = this.mPlayerHandCardShowArray[0][i];
                    var cardNum = this.mDDZLogic.getNumWithoutColor(card.mCardValue);
                    if((cardNum == this.mDDZLogic.getNumWithoutColor(aiArray[j])||cardNum==aiArray[j]) && !card.mChoosed){
                        card.choose();
                        break;
                    }
                }
            }
        }else{
            this.op_buchu(0);//不出
        }
    },

    //玩家出牌
    playerOutCard:function(){
        log("playerOutCard--")
        this.cleanPlayerOutCard(0);
        this.getPreOutCardValues();
        if(this.mPlayerOutCardValueArray[0].length > 0){
            this.mCardType = this.mDDZLogic.getOutCardType(this.mPlayerOutCardValueArray[0]);//玩家出牌类型
            log("mCardType=="+this.mCardType)
            if(this.mCardType == -1){
                log(" 不符合出牌规则="+this.mPlayerOutCardValueArray[0]);
                showLittleNotice(sResWord.w_ddz_outtype_error);
                return;
            }else{
                log(" 出牌 牌型 ="+this.mCardType);
            }
            if(this.mPlayerOutCardValueArray[2].length>0){
                canOut = this.mDDZLogic.Compare_Out_Card(this.mPlayerOutCardValueArray[2],this.mPlayerOutCardValueArray[0]);
                if(canOut==true){
                    this.sendOutCardCommand();
                }else{
                    log("没有上家大或类型不一样  ");
                    showLittleNotice(sResWord.w_ddz_big_last);
                    return;
                }
            }else if(this.mPlayerOutCardValueArray[1].length>0){
                canOut = this.mDDZLogic.Compare_Out_Card(this.mPlayerOutCardValueArray[1],this.mPlayerOutCardValueArray[0]);
                if(canOut==true){
                    this.sendOutCardCommand();
                }else {
                    log("没有上家大或类型不一样  ");
                    showLittleNotice(sResWord.w_ddz_big_last);
                    return;
                }
            }else {
                this.sendOutCardCommand();
            }
        }else{
            log("没有上家大或类型不一样  ");
            showLittleNotice(sResWord.w_ddz_please_choosecard);
        }
    },
    //发送出牌命令
    sendOutCardCommand:function(){
        if(sGameData.mGameMode == GAMEMODE_MATCH_VIDEO){
            return;
        }
        if(sGameData.mIsTestNoNet){
            this.show_OutCard(this.mPlayerOutCardValueArray[0]);
        }else{
            this.VisiblePlayButton(false);
            this.sendOutCardCmd(this.mCardType, this.mPlayerOutCardValueArray[0]);
        }
        this.showClock(0,false);
    },
    /**
     * 自己出牌
     */
    show_OutCard:function(cards){
        log("show_OutCard=="+cards);
        playChupaiSound();
        log("出牌前的牌:"+this.mPlayerCardValueArray);
        log("出牌前 length:"+this.mPlayerHandCardShowArray[0].length);
        var off = 0;
        var length = cards.length;

        var size = cc.director.getWinSize();

        this.mShowOP.cleanOP(0);

        this.mCardNote.addOutCards(cards);
        var dizhuseat = this.getPlayerSeatByChairId(this.mDizhuChairId);
        log("dizhuseat=="+dizhuseat)
        for(var j =0;j<length;j++){
            for(var i=0;i<this.mPlayerHandCardShowArray[0].length;i++){
                var card = this.mPlayerHandCardShowArray[0][i];
                if(card.mCardValue == cards[j]){
                    var cardValue = card.mCardValue;
                    card.mIndex = off;
                    card.mIsOut = true;
                    card.unchoose();
                    //card.setDaxiao();
                    card.mDisable = true;
                    var pos = this.getCardOutPos(0,off,length);
                    this.mPlayerOutCardShowArray[0].push(card);
                    this.mPlayerHandCardShowArray[0].splice(i,1);
                    if(0 == dizhuseat&&j==length-1){
                        card.addDizhuIcon()
                    }
                    card.setDaxiaoAnim()
                    var anim1 = cc.MoveTo.create(0.15,pos);
                    card.runAction(anim1);
                    off ++;
                    break;
                }
            }
        }
        log("出牌后length:"+this.mPlayerHandCardShowArray[0].length);
        this.mCardNumArray[0] -= length;
        this.setSeatCardcount(0,this.mCardNumArray[0]);
        //剩下的牌重新排列
        this.mPlayerCardValueArray = [];
        var len =  this.mPlayerHandCardShowArray[0].length;
        for(i=0;i<len;i++){
            var card =this.mPlayerHandCardShowArray[0][i];
            card.mIndex = i;
            card.unchoose();
            var pos = this.getCardPos(0,i,len);
            card.setPosition(pos);
            this.reorderChild(card,5+i);
            this.mPlayerCardValueArray.push(card.mCardValue);
        }
        log("剩下的牌:"+this.mPlayerCardValueArray);
        this.showEffects(cards,0);
    },
    //别人出牌
    otherPlayerOutCard:function(seat,isgameover,isreconn){
        playChupaiSound();
        this.cleanPlayerOutCard(seat);
        this.mShowOP.cleanOP(seat);
        log("玩家出牌:"+seat+"-"+ this.mPlayerOutCardValueArray[seat]);
        var len = this.mPlayerOutCardValueArray[seat].length;
        if(!isreconn){
            this.mCardNumArray[seat] -= len;
            this.setSeatCardcount(seat,this.mCardNumArray[seat]);
        }
        this.mCardNote.addOutCards(this.mPlayerOutCardValueArray[seat]);
        var dizhuseat = this.getPlayerSeatByChairId(this.mDizhuChairId);
        log("dizhuseat=="+dizhuseat)
        for(var i=0;i<len;i++){
            var cardValue= this.mPlayerOutCardValueArray[seat][i];
            var acard = DDZCard.create();
            acard.mSeat = seat;
            acard.mIndex = i;
            acard.mIsOut = true;
            acard.setCardValue(cardValue);
            acard.mDisable = true;
            var pos = this.getCardOutPos(seat,i,len);
            acard.setPosition(pos);
            acard.setScale(sGameData.mDDZ_othercard_scale)
            this.addChild(acard,5+i);
            this.mPlayerOutCardShowArray[seat].push(acard);

            if(seat == dizhuseat&&i==len-1){
                acard.addDizhuIcon()
            }
        }
        if(!isgameover && !isreconn){
            this.showEffects(this.mPlayerOutCardValueArray[seat],seat);
        }

    },
    //type 1：叫  2翻倍  3:闷抓 4倒 5拉   6加倍（农民）7叫
    showBeishuChange:function(type,chair){
        if(type == 1){
            this.mBeishu = 1;
            for(var i=0;i<3;i++){
                if(i != this.mDizhuChairId){
                    this.mBeishusChair[i] = 1;
                }else{
                    this.mBeishusChair[i] = 2;
                }
            }
        }else if(type == 2){
            this.mBeishu *= 2;//每出一个炸弹或火箭翻一倍。

            for(var i=0;i<3;i++){
                this.mBeishusChair[i] *= 2;
            }
        }else if(type == 3){
            this.mBeishu = 2;
            for(var i=0;i<3;i++){
                if(i != this.mDizhuChairId){
                    this.mBeishusChair[i] = 2;
                }else{
                    this.mBeishusChair[i] = 4;
                }
            }
        }else if(type == 4){
            if(!this.mIsDaopai){
                this.mBeishu *= 2;
            }
            this.mBeishusChair[this.mDizhuChairId] += this.mBeishusChair[chair];
            this.mBeishusChair[chair] *= 2;
        }else if(type == 5){
            this.mBeishu *= 2;
            var allnum = 0;
            for(var i=0;i<3;i++){
                if(i != this.mDizhuChairId){
                    var seat = this.getPlayerSeatByChairId(i);
                    if(this.mDaoLaState[seat] == 1){
                        this.mBeishusChair[i] *= 2;
                        allnum += this.mBeishusChair[i];
                    }else{
                        allnum += this.mBeishusChair[i];
                    }
                }
            }
            this.mBeishusChair[this.mDizhuChairId] = allnum;
        }else if(type == 6){
            if(!this.mIsDaopai){
                this.mBeishu *= 2;
            }
            this.mBeishusChair[this.mDizhuChairId] += this.mBeishusChair[chair];
            this.mBeishusChair[chair] *= 2;
        }else if(type == 7){
            this.mBeishu = 1;
            for(var i=0;i<3;i++){
                if(i != this.mDizhuChairId){
                    this.mBeishusChair[i] = 1;
                }else{
                    this.mBeishusChair[i] = 2;
                }
            }
        }
        if(this.mBeishu > this.MAX_BEISHU){
            this.mBeishu = this.MAX_BEISHU;
        }
        for(var i=0;i<3;i++){
            if(i != this.mDizhuChairId){
                if(this.mBeishusChair[i] > this.MAX_BEISHU){
                    this.mBeishusChair[i] = this.MAX_BEISHU;
                }
            }else{
                if(this.mBeishusChair[i] > this.MAX_BEISHU*2){
                    this.mBeishusChair[i] = this.MAX_BEISHU*2;
                }
            }
        }
        this.showBeiShuInView(this.mBeishu,this.mBasePoint)


    },

    showBeiShuInView:function(beishu,basepoint){
        //
        this.mBasePointShow.setValue(2,formatcash(basepoint),1,1);

            for (var i = 0; i < 3; i++) {
                var chairId = this.getPlayerChairIdBySeat(i);
                var num = this.mBeishusChair[chairId]
                this.mBeishuShows[i].setValue(num);
                if (this.mCanShowBeishu) {
                    this.mBeishuShows[i].setVisible(true);
                } else {
                    this.mBeishuShows[i].setVisible(false);
                }
            }
        if(sGameData.mUseDDZRule == DDZ_RULE_SC) {
        }else{
            //this.mBeishuShow.setValue(2,this.mBeishu,3,1);
        }
    },
    /**
     * 根据出牌类型，是否显示炸弹图
     */
    showEffects:function(arr,seat){
        var type = this.mDDZLogic.getOutCardType(arr);

        var isShowAnim = false;

        this.mLastOutSeat = this.mCurrOutSeat;
        this.mCurrOutSeat = seat;

        if(type==this.mDDZLogic.FOUR_CARD ){ //|| type==Ddz.FOUR_WITH_TWO_CARD 4带2暂时不算?
            this.mTeshuNum[1]++;
            this.showBeishuChange(2);
            this.mShowEffect.showEffect(0,seat,this.mLastOutSeat);
            //SoundManager.playSound(res.ddz_boom_mp3,false,SOUND_EFFECT);
            isShowAnim = true;
        }else if(type == this.mDDZLogic.SUPER_BOOM_CARD){
            this.mTeshuNum[0]++;
            this.showBeishuChange(2);
            this.mShowEffect.showEffect(1,seat,this.mLastOutSeat);
            SoundManager.playSound(res.ddz_supper_boom_mp3,false,SOUND_EFFECT);
            isShowAnim = true;
        }else if(type == this.mDDZLogic.THREE_WITH_LINK_CARD || type == this.mDDZLogic.THREE_LINK_CARD || type == this.mDDZLogic.THREE_WITH_LINK_TWO_CARD){
            this.mShowEffect.showEffect(2,seat,this.mLastOutSeat);
            SoundManager.playSound(res.ddz_link_other_mp3,false,SOUND_EFFECT);
            isShowAnim = true;
        }else if(type == this.mDDZLogic.DOUBLE_LINK_CARD){
            this.mShowEffect.showEffect(3,seat,this.mLastOutSeat);
            SoundManager.playSound(res.ddz_link_other_mp3,false,SOUND_EFFECT);
            isShowAnim = true;
        }else if(type == this.mDDZLogic.LINK_CARD){
            this.mShowEffect.showEffect(4,seat,this.mLastOutSeat);
            SoundManager.playSound(res.ddz_link_other_mp3,false,SOUND_EFFECT);
            isShowAnim = true;
        }
        if(this.mCardNumArray[seat]<=2 && this.mCardNumArray[seat] > 0){
            if(seat!=0&&this.mShowWarning[seat] == 0){
                this.mShowWarning[seat] = 1;
                SoundManager.playSound(res.ddz_warning_card_mp3,false,SOUND_EFFECT1);
                var cardcount = this.mShowCardCounts[seat]
                if(cardcount){
                    cardcount.setFlash();
                }
            }
        }
        var isNewlun = false;
        var znum = 0
        for(var i=0;i<3;i++){
            if(this.mPlayerOutCardValueArray[i].length==0&&seat!= i){
                znum++;
            }
        }
        if(znum ==2){
            isNewlun = true;
        }
        if(isNewlun || type==this.mDDZLogic.FOUR_CARD || type == this.mDDZLogic.SUPER_BOOM_CARD){
            this.playCardSound(type,seat,arr[0]);
        }else{
            this.playCardSound(type,seat,arr[0]);
            //this.playOPSound(seat,6);
        }

        var cardValue=-1;
        if(type==this.mDDZLogic.SINGLE_CARD||type==this.mDDZLogic.DOUBLE_CARD){
            cardValue=arr[0];
        }
        if(this.mIsInGame){
            //playSound(getDDZSound(seat,cardValue,type));
            if(type==this.mDDZLogic.FOUR_CARD || type == this.mDDZLogic.SUPER_BOOM_CARD){
                //showGameLog(mScoreNameArray[getPlayerChairIdBySeat(seat)]+" 出炸弹 倍数翻倍");
            }
        }
        if(!isShowAnim){
            //this.showOutCardend();
            var callback = cc.CallFunc.create(this.showOutCardend, this);
            var delay = cc.DelayTime.create(0.5)
            var actions = cc.Sequence.create(delay,callback);
            this.runAction(actions);
        }
    },
    //显示出牌结束
    showOutCardend:function(){
        sGameData.mPausedCommand_Use = false;
    },
    /**
     * 断线重连    显示 玩家 手里牌
     */
    showPlayerHandCard_reconn:function()
    {
        this.mPlayerCardValueArray.sort(sortByCard);
        var len = this.mPlayerCardValueArray.length;
        for(var i =0;i<len;i++){
            var cardValue = this.mPlayerCardValueArray[i];
            var acard = DDZCard.create();
            acard.mSeat = 0;
            acard.mIndex = i;
            acard.setCardValue(cardValue);
            var pos = this.getCardPos(0,i,len);
            acard.setPosition(pos);
            acard.setScale(sGameData.mDDZ_mycard_scale);
            this.addChild(acard,5+i);
            acard.mDisable = false;
            this.mPlayerHandCardShowArray[0].push(acard);
        }
    },

/**
 * 断线重连    显示 玩家 出牌
*/
    showOutCard_reconn:function(cards_outall,currSeatId)
    {

        var tempOut = [];
        var tempOut1 = [];
        var tempOut2=[];
        var tempOut0=[];
        for(var i=0;i<cards_outall.length;i++){
            var cards_out = cards_outall[i];

            var seat = this.getPlayerSeatByChairId(i);
            cards_out.sort(sortByCard);
            this.mPlayerOutCardValueArray[seat] = cards_out;
            if(seat!=0){
                if(cards_out.length > 0){
                    this.otherPlayerOutCard(seat,false,true);
                }
            }else{
                log("玩家出牌"+seat+"-"+this.mPlayerOutCardValueArray[seat].toString());
                var len = this.mPlayerOutCardValueArray[seat].length;
                for(var j =0;j<cards_out.length;j++)
                {
                    var cardValue = this.mPlayerOutCardValueArray[seat][j];
                    var acard = DDZCard.create();
                    acard.mSeat = seat;
                    acard.mIndex = j;
                    acard.mIsOut = true;
                    acard.setCardValue(cardValue);
                    acard.setScale(sGameData.mDDZ_othercard_scale)
                    acard.mDisable = true;
                    var pos = this.getCardOutPos(seat,j,len);
                    acard.setPosition(pos);
                    this.addChild(acard,5+j);
                    this.mPlayerOutCardShowArray[seat].push(acard);
                }
            }
            if(seat==1){
                tempOut1=cards_out;
            }else if(seat==2){
                tempOut2=cards_out;
            }if(seat==0){
                tempOut0=cards_out;
            }
        }
        if(currSeatId==0){
            if(tempOut2.length>0){
                tempOut = tempOut2;
            }else if(tempOut1.length>0){
                tempOut = tempOut1;
            }
        }else if(currSeatId==1){
            if(tempOut0.length>0){
                tempOut = tempOut0;
            }else if(tempOut2.length>0){
                tempOut = tempOut2;
            }
        }else if(currSeatId==2){
            if(tempOut1.length>0){
                tempOut = tempOut1;
            }else if(tempOut0.length>0){
                tempOut = tempOut0;
            }
        }
        this.mCurrOutCards = tempOut;
        this.cleanPlayerOutCard(currSeatId);
        log(" tempOut-----"+tempOut);
    },
    showWaitAgain:function(){
        if(sGameData.mGameMode == GAMEMODE_MATCH||sGameData.mGameMode == GAMEMODE_MATCH_VIDEO){
            this.mMatchWaitShow.setVisible(true);
            this.mMatchInfoTips.setVisible(true);
            this.VisibleMatchStartButton(true);
            this.VisibleMatchRankButton(false);
            this.mMatchTipShow.showTip(1);
            this.mMatchWaitShow.updateCount();
            this.mMatchProgressShow.setVisible(false);
            this.updateShowPlayerCash();
        }
    },
    cleanall:function(type){
        log("cleanall")
        if(type == null){
            type = 0;
        }
        for(var i=0;i<3;i++){
            this.cleanPlayerHandCard(i);
            this.cleanPlayerOutCard(i);
        }
        this.cleanDizhuCardObject();

        this.initGameData(type);

        this.mShowOP.cleanAll();
        this.VisiblePlayButton(false);
        this.VisibleJiaoButton(false);
        this.setDizhu(0,false);
        this.showClock(0,false);
        this.setSeatCardcount(1,0);
        this.setSeatCardcount(2,0);
        this.hiddenCardcount();
        if(sGameData.mGameMode == GAMEMODE_MATCH||sGameData.mGameMode == GAMEMODE_MATCH_VIDEO){
            this.checkMatchBasePoint();
            this.mBasePoint = sGameData.mCurrMatch.basicGScore;
        }else{
            this.mBasePoint = sGameData.mCurrRoom.basicPoint;
        }
        this.showBeishuChange(1);
        this.mShowScore.setVisible(false);
        this.mShowScore.hidden()
        this.mShowScore_normal.setVisible(false);
        this.mShowScore_normal.stopAnim()

        if(sGameData.mGameMode == GAMEMODE_MATCH||sGameData.mGameMode == GAMEMODE_MATCH_VIDEO){
            this.mMatchWaitShow.setVisible(false);
            this.mMatchInfoTips.setVisible(false);
            this.VisibleMatchStartButton(false);
            this.VisibleMatchRankButton(true);
            this.mMatchTipShow.showTip(0);
            this.mMatchUpProgressShow.setVisible(false);



        }
    },
    cleanHeads:function(){
        for(var i = 1;i<3;i++){
            var aHead1 = this.mUserHeadsArray[i];
            if(aHead1!=null){
                aHead1.setVisible(false)
            }
        }
        this.hiddenCardcount();
    },
    //清除某位置 手里牌
    cleanPlayerHandCard:function(seat){
        while(this.mPlayerHandCardShowArray[seat].length > 0){
            var card =this.mPlayerHandCardShowArray[seat].shift();
            if(card){
                this.removeChild(card);
            }
        }
        this.mPlayerHandCardShowArray[seat] = []
    },
    //清除掉某玩家出的牌
    cleanPlayerOutCard:function(seat){
        while(this.mPlayerOutCardShowArray[seat].length>0)
        {
            var card = this.mPlayerOutCardShowArray[seat].shift();
            this.removeChild(card);
        }
        this.mPlayerOutCardShowArray[seat] = []
    },
    /**
     * 清除 底牌
     */
    cleanDizhuCardObject:function()
    {
        if(this.mDizhuCardShowArray == null){
            return ;
        }
        while(this.mDizhuCardShowArray.length>0)
        {
            var card = this.mDizhuCardShowArray.shift();
            this.removeChild(card);
        }

        this.mGameUI.showDeviceInfo(0);
    },
    //初始化按钮
    initButtons:function(){
        var size = cc.director.getWinSize();
        if(sGameData.mIsTestNoNet){
            //btntag,x,y,img,overimg,disimg ,word,func,point,fontsize
            var testBtnData = [[0,size.width -10,size.height - 250,res.button2_png,res.button2_1_png,res.button2_png,"clean",this.reInitDataUI,cc.p(0.5,0.5),24],
                [0,size.width -10,size.height - 300,res.button2_png,res.button2_1_png,res.button2_png,"fapai",this.op_t_FaCard,cc.p(0.5,0.5),24],
                [0,size.width -10,size.height - 350,res.button2_png,res.button2_1_png,res.button2_png,"chupai",this.op_outcards,cc.p(0.5,0.5),24],
                [0,size.width -10,size.height - 400,res.button2_png,res.button2_1_png,res.button2_png,"test",this.op_t_test1,cc.p(0.5,0.5),24]
            ];
            this.createWordBtnMenu(testBtnData,this);
        }

        var buchuSprite = ButtoSpritenWithSpriteInner("#ddz_red_btn.png","#ddz_w_buchu.png",cc.p(0.5,0.5),0);
        var buchuSprite1 = ButtoSpritenWithSpriteInner("#ddz_red_btn.png","#ddz_w_buchu.png",cc.p(0.5,0.5),1);
        var buchuSprite2 = ButtoSpritenWithSpriteInner("#ddz_gray_btn.png","#ddz_w_buchu.png",cc.p(0.5,0.5),2);
        var buchuItem = cc.MenuItemSprite.create(
            buchuSprite,
            buchuSprite1,
            buchuSprite2,
            this.op_buchu,this);
        buchuItem.setPosition(cc.p(size.width/2-180,250));
        buchuItem.setTag(this.BUTTON_TAG_GIVEUP);
        buchuItem.setVisible(false);

        var tishiSprite = ButtoSpritenWithSpriteInner("#ddz_green_btn.png","#ddz_w_tishi.png",cc.p(0.5,0.5),0);
        var tishiSprite1 = ButtoSpritenWithSpriteInner("#ddz_green_btn.png","#ddz_w_tishi.png",cc.p(0.5,0.5),1);
        var tishiSprite2 = ButtoSpritenWithSpriteInner("#ddz_gray_btn.png","#ddz_w_tishi.png",cc.p(0.5,0.5),2);
        var tishiItem = cc.MenuItemSprite.create(
            tishiSprite,
            tishiSprite1,
            tishiSprite2,
            this.op_tishi,this);
        tishiItem.setPosition(cc.p(size.width/2,250));
        tishiItem.setTag(this.BUTTON_TAG_TISHI);
        tishiItem.setVisible(false);

        var chupaiSprite = ButtoSpritenWithSpriteInner("#ddz_green_btn.png","#ddz_w_chupai.png",cc.p(0.5,0.5),0);
        var chupaiSprite1 = ButtoSpritenWithSpriteInner("#ddz_green_btn.png","#ddz_w_chupai.png",cc.p(0.5,0.5),1);
        var chupaiSprite2 = ButtoSpritenWithSpriteInner("#ddz_gray_btn.png","#ddz_w_chupai.png",cc.p(0.5,0.5),2);
        var chupaiItem = cc.MenuItemSprite.create(
            chupaiSprite,
            chupaiSprite1,
            chupaiSprite2,
            this.op_outcards,this);
        chupaiItem.setPosition(cc.p(size.width/2+180,250));
        chupaiItem.setTag(this.BUTTON_TAG_OUTCARD);
        chupaiItem.setVisible(false);

        //-----------normal ddz-------------
        var bujiaoSprite = ButtoSpritenWithSpriteInner("#ddz_red_btn.png","#ddz_w_bujiao.png",cc.p(0.5,0.5),0);
        var bujiaoSprite1 = ButtoSpritenWithSpriteInner("#ddz_red_btn.png","#ddz_w_bujiao.png",cc.p(0.5,0.5),1);
        var bujiaoSprite2 = ButtoSpritenWithSpriteInner("#ddz_gray_btn.png","#ddz_w_bujiao.png",cc.p(0.5,0.5),2);
        var bujiaoItem = cc.MenuItemSprite.create(
            bujiaoSprite,
            bujiaoSprite1,
            bujiaoSprite2,
            this.op_bujiao,this);
        bujiaoItem.setPosition(cc.p(size.width/2-180,250));
        bujiaoItem.setTag(this.BUTTON_TAG_BUJIAO);
        bujiaoItem.setVisible(false);

        var jiao1Sprite = ButtoSpritenWithSpriteInner("#ddz_green_btn.png","#ddz_w_1fen.png",cc.p(0.5,0.5),0);
        var jiao1Sprite1 = ButtoSpritenWithSpriteInner("#ddz_green_btn.png","#ddz_w_1fen.png",cc.p(0.5,0.5),1);
        var jiao1Sprite2 = ButtoSpritenWithSpriteInner("#ddz_gray_btn.png","#ddz_w_1fen.png",cc.p(0.5,0.5),2);
        var jiao1Item = cc.MenuItemSprite.create(
            jiao1Sprite,
            jiao1Sprite1,
            jiao1Sprite2,
            this.op_jiao1,this);
        jiao1Item.setPosition(cc.p(size.width/2,250));
        jiao1Item.setTag(this.BUTTON_TAG_JIAO1FEN);
        jiao1Item.setVisible(false);

        var jiao2Sprite = ButtoSpritenWithSpriteInner("#ddz_green_btn.png","#ddz_w_2fen.png",cc.p(0.5,0.5),0);
        var jiao2Sprite1 = ButtoSpritenWithSpriteInner("#ddz_green_btn.png","#ddz_w_2fen.png",cc.p(0.5,0.5),0);
        var jiao2Sprite2 = ButtoSpritenWithSpriteInner("#ddz_gray_btn.png","#ddz_w_2fen.png",cc.p(0.5,0.5),2);
        var jiao2Item = cc.MenuItemSprite.create(
            jiao2Sprite,
            jiao2Sprite1,
            jiao2Sprite2,
            this.op_jiao2,this);
        jiao2Item.setPosition(cc.p(size.width/2+180,250));
        jiao2Item.setTag(this.BUTTON_TAG_JIAO2FEN);
        jiao2Item.setVisible(false);

        var jiao3Sprite = ButtoSpritenWithSpriteInner("#ddz_green_btn.png","#ddz_w_3fen.png",cc.p(0.5,0.5),0);
        var jiao3Sprite1 = ButtoSpritenWithSpriteInner("#ddz_green_btn.png","#ddz_w_3fen.png",cc.p(0.5,0.5),1);
        var jiao3Sprite2 = ButtoSpritenWithSpriteInner("#ddz_gray_btn.png","#ddz_w_3fen.png",cc.p(0.5,0.5),2);
        var jiao3Item = cc.MenuItemSprite.create(
            jiao3Sprite,
            jiao3Sprite1,
            jiao3Sprite2,
            this.op_jiao3,this);
        jiao3Item.setPosition(cc.p(size.width/2+360,250));
        jiao3Item.setTag(this.BUTTON_TAG_JIAO3FEN);
        jiao3Item.setVisible(false);


        var jiabeiSprite = ButtoSpritenWithSpriteInner("#ddz_green_btn.png","#ddz_w_jiabei.png",cc.p(0.5,0.5),0);
        var jiabeiSprite1 = ButtoSpritenWithSpriteInner("#ddz_green_btn.png","#ddz_w_jiabei.png",cc.p(0.5,0.5),1);
        var jiabeiSprite2 = ButtoSpritenWithSpriteInner("#ddz_green_btn.png","#ddz_w_jiabei.png",cc.p(0.5,0.5),0);
        var jiabeiItem = cc.MenuItemSprite.create(
            jiabeiSprite,
            jiabeiSprite1,
            jiabeiSprite2,
            this.op_jiabei,this);
        jiabeiItem.setPosition(cc.p(size.width/2-100,250));
        jiabeiItem.setTag(this.BUTTON_TAG_JIABEI);
        jiabeiItem.setVisible(false);

        var bujiabeiSprite = ButtoSpritenWithSpriteInner("#ddz_green_btn.png","#ddz_w_bujiabei.png",cc.p(0.5,0.5),0);
        var bujiabeiSprite1 = ButtoSpritenWithSpriteInner("#ddz_green_btn.png","#ddz_w_bujiabei.png",cc.p(0.5,0.5),1);
        var bujiabeiSprite2 = ButtoSpritenWithSpriteInner("#ddz_green_btn.png","#ddz_w_bujiabei.png",cc.p(0.5,0.5),0);
        var bujiabeiItem = cc.MenuItemSprite.create(
            bujiabeiSprite,
            bujiabeiSprite1,
            bujiabeiSprite2,
            this.op_bujiabei,this);
        bujiabeiItem.setPosition(cc.p(size.width/2+100,250));
        bujiabeiItem.setTag(this.BUTTON_TAG_BUJIABEI);
        bujiabeiItem.setVisible(false);

        //-----------sc ddz-------------

        var kanpaiSprite = ButtonSpriteWithWordInner("#ddz_red_btn.png",sResWord.w_ddz_kanpai,cc.p(0.5,0.55),28,0);
        var kanpaiSprite1 = ButtonSpriteWithWordInner("#ddz_red_btn.png",sResWord.w_ddz_kanpai,cc.p(0.5,0.55),28,1);
        var kanpaiSprite2 = ButtonSpriteWithWordInner("#ddz_gray_btn.png",sResWord.w_ddz_kanpai,cc.p(0.5,0.55),28,0);
        var kanpaiItem_sc = cc.MenuItemSprite.create(
            kanpaiSprite,
            kanpaiSprite1,
            kanpaiSprite2,
            this.op_kanpai_sc,this);
        kanpaiItem_sc.setPosition(cc.p(size.width/2-100,250));
        kanpaiItem_sc.setTag(this.BUTTON_TAG_KANPAI_SC);
        kanpaiItem_sc.setVisible(false);

        var menzhuaSprite = ButtonSpriteWithWordInner("#ddz_green_btn.png",sResWord.w_ddz_menzhua,cc.p(0.5,0.55),28,0);
        var menzhuaSprite1 = ButtonSpriteWithWordInner("#ddz_green_btn.png",sResWord.w_ddz_menzhua,cc.p(0.5,0.55),28,1);
        var menzhuaSprite2 = ButtonSpriteWithWordInner("#ddz_gray_btn.png",sResWord.w_ddz_menzhua,cc.p(0.5,0.55),28,0);
        var menzhuaItem_sc = cc.MenuItemSprite.create(
            menzhuaSprite,
            menzhuaSprite1,
            menzhuaSprite2,
            this.op_menzhua_sc,this);
        menzhuaItem_sc.setPosition(cc.p(size.width/2+100,250));
        menzhuaItem_sc.setTag(this.BUTTON_TAG_MENZHUA_SC);
        menzhuaItem_sc.setVisible(false);


        var bujiaopaiSprite = ButtonSpriteWithWordInner("#ddz_red_btn.png",sResWord.w_ddz_bujiao,cc.p(0.5,0.55),28,0);
        var bujiaopaiSprite1 = ButtonSpriteWithWordInner("#ddz_red_btn.png",sResWord.w_ddz_bujiao,cc.p(0.5,0.55),28,1);
        var bujiaopaiSprite2 = ButtonSpriteWithWordInner("#ddz_gray_btn.png",sResWord.w_ddz_jiaopai,cc.p(0.5,0.55),28,0);
        var bujiaopaiItem_sc = cc.MenuItemSprite.create(
            bujiaopaiSprite,
            bujiaopaiSprite1,
            bujiaopaiSprite2,
            this.op_bujiao_sc,this);
        bujiaopaiItem_sc.setPosition(cc.p(size.width/2-100,250));
        bujiaopaiItem_sc.setTag(this.BUTTON_TAG_BUJIAO_SC);
        bujiaopaiItem_sc.setVisible(false);


        var jiaopaiSprite = ButtonSpriteWithWordInner("#ddz_green_btn.png",sResWord.w_ddz_jiaopai,cc.p(0.5,0.55),28,0);
        var jiaopaiSprite1 = ButtonSpriteWithWordInner("#ddz_green_btn.png",sResWord.w_ddz_jiaopai,cc.p(0.5,0.55),28,1);
        var jiaopaiSprite2 = ButtonSpriteWithWordInner("#ddz_gray_btn.png",sResWord.w_ddz_jiaopai,cc.p(0.5,0.55),28,0);
        var jiaopaiItem_sc = cc.MenuItemSprite.create(
            jiaopaiSprite,
            jiaopaiSprite1,
            jiaopaiSprite2,
            this.op_jiaopai_sc,this);
        jiaopaiItem_sc.setPosition(cc.p(size.width/2+100,250));
        jiaopaiItem_sc.setTag(this.BUTTON_TAG_JIAOPAI_SC);
        jiaopaiItem_sc.setVisible(false);

        var budaoSprite = ButtonSpriteWithWordInner("#ddz_red_btn.png",sResWord.w_ddz_budao,cc.p(0.5,0.55),28,0);
        var budaoSprite1 = ButtonSpriteWithWordInner("#ddz_red_btn.png",sResWord.w_ddz_budao,cc.p(0.5,0.55),28,1);
        var budaoSprite2 = ButtonSpriteWithWordInner("#ddz_gray_btn.png",sResWord.w_ddz_budao,cc.p(0.5,0.55),28,0);
        var budaoItem_sc = cc.MenuItemSprite.create(
            budaoSprite,
            budaoSprite1,
            budaoSprite2,
            this.op_budao_sc,this);
        budaoItem_sc.setPosition(cc.p(size.width/2-100,250));
        budaoItem_sc.setTag(this.BUTTON_TAG_BUDAO_SC);
        budaoItem_sc.setVisible(false);

        var daoSprite = ButtonSpriteWithWordInner("#ddz_green_btn.png",sResWord.w_ddz_dao,cc.p(0.5,0.55),28,0);
        var daoSprite1 = ButtonSpriteWithWordInner("#ddz_green_btn.png",sResWord.w_ddz_dao,cc.p(0.5,0.55),28,1);
        var daoSprite2 = ButtonSpriteWithWordInner("#ddz_gray_btn.png",sResWord.w_ddz_dao,cc.p(0.5,0.55),28,0);
        var daoItem_sc = cc.MenuItemSprite.create(
            daoSprite,
            daoSprite1,
            daoSprite2,
            this.op_dao_sc,this);
        daoItem_sc.setPosition(cc.p(size.width/2+100,250));
        daoItem_sc.setTag(this.BUTTON_TAG_DAO_SC);
        daoItem_sc.setVisible(false);


        var bulaSprite = ButtonSpriteWithWordInner("#ddz_red_btn.png",sResWord.w_ddz_bula,cc.p(0.5,0.55),28,0);
        var bulaSprite1 = ButtonSpriteWithWordInner("#ddz_red_btn.png",sResWord.w_ddz_bula,cc.p(0.5,0.55),28,1);
        var bulaSprite2 = ButtonSpriteWithWordInner("#ddz_gray_btn.png",sResWord.w_ddz_bula,cc.p(0.5,0.55),28,0);
        var bulaItem_sc = cc.MenuItemSprite.create(
            bulaSprite,
            bulaSprite1,
            bulaSprite2,
            this.op_bula_sc,this);
        bulaItem_sc.setPosition(cc.p(size.width/2-100,250));
        bulaItem_sc.setTag(this.BUTTON_TAG_BULA_SC);
        bulaItem_sc.setVisible(false);

        var laSprite = ButtonSpriteWithWordInner("#ddz_green_btn.png",sResWord.w_ddz_la,cc.p(0.5,0.55),28,0);
        var laSprite1 = ButtonSpriteWithWordInner("#ddz_green_btn.png",sResWord.w_ddz_la,cc.p(0.5,0.55),28,1);
        var laSprite2 = ButtonSpriteWithWordInner("#ddz_gray_btn.png",sResWord.w_ddz_la,cc.p(0.5,0.55),28,0);
        var laItem_sc = cc.MenuItemSprite.create(
            laSprite,
            laSprite1,
            laSprite2,
            this.op_la_sc,this);
        laItem_sc.setPosition(cc.p(size.width/2+100,250));
        laItem_sc.setTag(this.BUTTON_TAG_LA_SC);
        laItem_sc.setVisible(false);

        //------------------------

        var fanhuiSprite = ButtoSpritenWithSpriteInner("#ddz_red_btn.png","#ddz_w_quit.png",cc.p(0.6,0.5),0);
        var fanhuiSprite1 = ButtoSpritenWithSpriteInner("#ddz_red_btn.png","#ddz_w_quit.png",cc.p(0.6,0.5),1);
        var fanhuiSprite2 = ButtoSpritenWithSpriteInner("#ddz_gray_btn.png","#ddz_w_quit.png",cc.p(0.6,0.5),0);
        var fanhuiItem = cc.MenuItemSprite.create(
            fanhuiSprite,
            fanhuiSprite1,
            fanhuiSprite2,
            this.op_backhall,this);
        fanhuiItem.setPosition(cc.p(size.width/2-100,110));
        fanhuiItem.setTag(this.BUTTON_TAG_FH);
        fanhuiItem.setVisible(false);


        var quitclock = DDZQuitClock.create();
        quitclock.attr({
            x:34,
            y:46
        })
        fanhuiItem.addChild(quitclock);
        this.mQuitClock = quitclock;


        var jixuSprite = ButtoSpritenWithSpriteInner("#ddz_green_btn.png","#ddz_w_jixu.png",cc.p(0.5,0.5),0);
        var jixuSprite1 = ButtoSpritenWithSpriteInner("#ddz_green_btn.png","#ddz_w_jixu.png",cc.p(0.5,0.5),1);
        var jixuSprite2 = ButtoSpritenWithSpriteInner("#ddz_gray_btn.png","#ddz_w_jixu.png",cc.p(0.5,0.5),0);
        var jixuItem = cc.MenuItemSprite.create(
            jixuSprite,
            jixuSprite1,
            jixuSprite2,
            this.op_continue,this);
        jixuItem.setPosition(cc.p(size.width/2+100,110));
        jixuItem.setTag(this.BUTTON_TAG_JX);
        jixuItem.setVisible(false);


        var jubaoSprite = ButtonSpriteWithWordInner("#ddz_green_btn.png",sResWord.w_ddz_jubao,cc.p(0.5,0.5),28,0);
        var jubaoSprite1 = ButtonSpriteWithWordInner("#ddz_green_btn.png",sResWord.w_ddz_jubao,cc.p(0.5,0.5),28,0);
        var jubaoSprite2 = ButtonSpriteWithWordInner("#ddz_gray_btn.png",sResWord.w_ddz_jubao,cc.p(0.5,0.5),28,0);
        var jubaoItem = cc.MenuItemSprite.create(
            jubaoSprite,
            jubaoSprite1,
            jubaoSprite2,
            this.op_report,this);
        jubaoItem.setPosition(cc.p(size.width/2+300,110));
        jubaoItem.setTag(this.BUTTON_TAG_JB);
        jubaoItem.setVisible(false);
        log("jubaoItem");


        var canceltuoguanSprite = ButtonSpriteWithWordInner("#ddz_green_btn.png",sResWord.w_canceltuoguan,cc.p(0.5,0.5),28,0);
        var canceltuoguanSprite1 = ButtonSpriteWithWordInner("#ddz_green_btn.png",sResWord.w_canceltuoguan,cc.p(0.5,0.5),28,1);
        var canceltuoguanSprite2 = ButtonSpriteWithWordInner("#ddz_gray_btn.png",sResWord.w_canceltuoguan,cc.p(0.5,0.5),28,0);
        var caneltuoguanItem = cc.MenuItemSprite.create(
            canceltuoguanSprite,
            canceltuoguanSprite1,
            canceltuoguanSprite2,
            this.op_canceltuoguan,this);
        caneltuoguanItem.setPosition( cc.p(size.width/2,80));
        caneltuoguanItem.setTag(this.BUTTON_TAG_QXTUOGUAN);
        caneltuoguanItem.setVisible(false);

        //操作按钮
        var pOperateMenu = null;
        if(sGameData.mUseDDZRule == DDZ_RULE_NORMAL) {// 通用规则
            pOperateMenu = cc.Menu.create(buchuItem, tishiItem, chupaiItem, bujiaoItem, jiao1Item, jiao2Item, jiao3Item,
                fanhuiItem, jubaoItem,jixuItem,  caneltuoguanItem,jiabeiItem,bujiabeiItem);
        }else{
            pOperateMenu = cc.Menu.create(buchuItem, tishiItem, chupaiItem,
                kanpaiItem_sc, menzhuaItem_sc, bujiaopaiItem_sc, jiaopaiItem_sc,budaoItem_sc,daoItem_sc,bulaItem_sc,laItem_sc,
                fanhuiItem, jubaoItem,jixuItem, caneltuoguanItem);
        }
        pOperateMenu.x = 0;
        pOperateMenu.y = 0;
        pOperateMenu.setTag(200005);//kGameOpMenu
        //pOperateMenu.setVisible(false);
        this.addChild(pOperateMenu, 100);
        this.mOPMenu = pOperateMenu

        if(sGameData.mGameMode == GAMEMODE_MATCH){

            var tuisaiSprite = ButtonSpriteWithWordInner("#ddz_red_btn.png",sResWord.w_match_tuisai,cc.p(0.5,0.55),28,0);
            var tuisaiSprite1 = ButtonSpriteWithWordInner("#ddz_red_btn.png",sResWord.w_match_tuisai,cc.p(0.5,0.55),28,1);
            var tuisaiSprite2 = ButtonSpriteWithWordInner("#ddz_gray_btn.png",sResWord.w_match_tuisai,cc.p(0.5,0.55),28,0);
            var tuisaiItem = cc.MenuItemSprite.create(
                tuisaiSprite,
                tuisaiSprite1,
                tuisaiSprite2,
                this.op_match_tuisai,this);
            tuisaiItem.setPosition(cc.p(size.width/2-180,100));
            tuisaiItem.setTag(this.BUTTON_TAG_MATCH_TUISAI);
            //tuisaiItem.setVisible(false);

            var backhallSprite = ButtonSpriteWithWordInner("#ddz_green_btn.png",sResWord.w_match_backhall,cc.p(0.5,0.55),28,0);
            var backhallSprite1 = ButtonSpriteWithWordInner("#ddz_green_btn.png",sResWord.w_match_backhall,cc.p(0.5,0.55),28,1);
            var backhallSprite2 = ButtonSpriteWithWordInner("#ddz_gray_btn.png",sResWord.w_match_backhall,cc.p(0.5,0.55),28,0);
            var backhallItem = cc.MenuItemSprite.create(
                backhallSprite,
                backhallSprite1,
                backhallSprite2,
                this.op_match_backhall,this);
            backhallItem.setPosition(cc.p(size.width/2,100));
            backhallItem.setTag(this.BUTTON_TAG_MATCH_BACKHALL);
            if (sGameData.mCurrMatch.type == MATCHSTART_COUNT) {
                backhallItem.setVisible(false);
            }

            var seeprizeSprite = ButtonSpriteWithWordInner("#ddz_green_btn.png",sResWord.w_match_seeprize,cc.p(0.5,0.55),28,0);
            var seeprizeSprite1 = ButtonSpriteWithWordInner("#ddz_green_btn.png",sResWord.w_match_seeprize,cc.p(0.5,0.55),28,1);
            var seeprizeSprite2 = ButtonSpriteWithWordInner("#ddz_gray_btn.png",sResWord.w_match_seeprize,cc.p(0.5,0.55),28,0);
            var seeprizeItem = cc.MenuItemSprite.create(
                seeprizeSprite,
                seeprizeSprite1,
                seeprizeSprite2,
                this.op_match_seeprize,this);
            seeprizeItem.setPosition(cc.p(size.width/2+180,100));
            seeprizeItem.setTag(this.BUTTON_TAG_MATCH_SEEPRIZE);
            //tuisaiItem.setVisible(false);


//            var prizeSprite = cc.Sprite.create("#match_prizeBtn.png")
//            var prizeSprite1 = cc.Sprite.create("#match_prizeBtn.png")
//            prizeSprite1.setColor(cc.color(200,200,200));
//            var prizeSprite2 = cc.Sprite.create("#match_prizeBtn.png")
//            var prizeItem = cc.MenuItemSprite.create(
//                prizeSprite,
//                prizeSprite1,
//                prizeSprite2,
//                this.op_match_seeprize,this);
//            prizeItem.setAnchorPoint(cc.p(1,0.5));
//            prizeItem.setPosition( cc.p(size.width-15,340));
//            prizeItem.setTag(this.BUTTON_TAG_MATCH_PRIZE);
//            prizeItem.setVisible(false);


            var rankSprite = cc.Sprite.create("#match_rankBtn.png")
            var rankSprite1 = cc.Sprite.create("#match_rankBtn.png")
            rankSprite1.setColor(cc.color(200,200,200));
            var rankSprite2 = cc.Sprite.create("#match_rankBtn.png")
            var rankItem = cc.MenuItemSprite.create(
                rankSprite,
                rankSprite1,
                rankSprite2,
                this.op_match_showrank,this);
            rankItem.setAnchorPoint(cc.p(1,0.5));
            rankItem.setPosition( cc.p(size.width-15,340));
            rankItem.setTag(this.BUTTON_TAG_MATCH_RANK);



            var paySprite = cc.Sprite.create("#match_btn_pay.png")
            var paySprite1 = cc.Sprite.create("#match_btn_pay.png")
            paySprite1.setColor(cc.color(200,200,200));
            var paySprite2 = cc.Sprite.create("#match_btn_pay.png")

            var payItem = cc.MenuItemSprite.create(
                paySprite,
                paySprite1,
                paySprite2,
                this.op_match_pay,this);
            payItem.setAnchorPoint(cc.p(1,0.5));
            payItem.setPosition( cc.p(size.width-85,340));
            payItem.setTag(this.BUTTON_TAG_MATCH_PAY);
            payItem.setVisible(false);


            //操作按钮
            var pMatchOperateMenu = cc.Menu.create(tuisaiItem,seeprizeItem,backhallItem,rankItem,payItem);//prizeItem
            pMatchOperateMenu.x = 0;
            pMatchOperateMenu.y = 0;
            pMatchOperateMenu.setTag(300005);//kGameOpMenu
            //pOperateMenu.setVisible(false);
            this.addChild(pMatchOperateMenu, 100);
            this.mMatchOPMenu = pMatchOperateMenu
            this.VisibleMatchRankButton(false);

        }

        //btntag,x,y,word ,func,func_param
//        var opBtnData = [[this.BUTTON_TAG_OUTCARD,size.width/2-150,250,sResWord.w_chupai,this.op_outcards],
//                          [this.BUTTON_TAG_TISHI,size.width/2,250,sResWord.w_tishi,this.op_tishi],
//                          [this.BUTTON_TAG_GIVEUP,size.width/2+150,250,sResWord.w_buchu,this.op_buchu],
//                          [this.BUTTON_TAG_JIAO1FEN,size.width/2-150,250,sResWord.w_1fen,this.op_jiao1],
//                          [this.BUTTON_TAG_JIAO2FEN,size.width/2,250,sResWord.w_2fen,this.op_jiao2],
//                          [this.BUTTON_TAG_JIAO3FEN,size.width/2+150,250,sResWord.w_3fen,this.op_jiao3],
//                          [this.BUTTON_TAG_BUJIAO,size.width/2+300,250,sResWord.w_bujiao,this.op_bujiao],
//                          [this.BUTTON_TAG_JX,size.width/2-100,100,sResWord.w_continue,this.op_continue],
//                          [this.BUTTON_TAG_FH,size.width/2+100,100,sResWord.w_back,this.op_backhall]
//        ];
//        this.mOPMenu = this.createOPMenu(opBtnData,this);
    },

    //设置操作按钮是否显示 出牌 提示 不出
    VisiblePlayButton:function(state){
        if(this.mOPMenu){

            this.mIsShowPlayBtning = state;

            this.setOPBtnVisible(this.BUTTON_TAG_OUTCARD,state);
            this.setOPBtnVisible(this.BUTTON_TAG_TISHI,state);
            this.setOPBtnVisible(this.BUTTON_TAG_GIVEUP,state);
        }
    },
    VisibleJiabeiButton:function(state){
        if(this.mOPMenu){
            this.mIsShowJiabeiBtning = state;
            this.setOPBtnVisible(this.BUTTON_TAG_JIABEI,state);
            this.setOPBtnVisible(this.BUTTON_TAG_BUJIABEI,state);
        }
    },
    //设置操作按钮是否显示 闷抓 看牌
    VisibleMenzhuaButton:function(state){
        if(this.mOPMenu){
            this.mIsShowMenzhuaBtning = state;
            this.setOPBtnVisible(this.BUTTON_TAG_KANPAI_SC,state);
            this.setOPBtnVisible(this.BUTTON_TAG_MENZHUA_SC,state);
        }
    },
    //设置操作按钮是否显示 倒 不倒
    VisibleDaoButton:function(state){
        if(this.mOPMenu){
            this.mIsShowDaoBtning = state;
            this.setOPBtnVisible(this.BUTTON_TAG_BUDAO_SC,state);
            this.setOPBtnVisible(this.BUTTON_TAG_DAO_SC,state);
        }
    },
    //设置操作按钮是否显示 拉 不拉
    VisibleLaButton:function(state){
        if(this.mOPMenu){
            this.mIsShowLaBtning = state;
            this.setOPBtnVisible(this.BUTTON_TAG_BULA_SC,state);
            this.setOPBtnVisible(this.BUTTON_TAG_LA_SC,state);
        }
    },

    //显示 隐藏 叫牌
    VisibleJiaoButton:function(state){
        this.mIsShowJiaoBtning = state
        if(sGameData.mUseDDZRule == DDZ_RULE_SC){//
            this.VisibleJiaoButton_sc(state);
        }else{
            this.VisibleJiaoButton_normal(state);
        }
    },
    VisibleJiaoButton_sc:function(state){
        if(this.mOPMenu){
            this.setOPBtnVisible(this.BUTTON_TAG_JIAOPAI_SC,state);
            this.setOPBtnVisible(this.BUTTON_TAG_BUJIAO_SC,state);

        }
    },
    //显示 隐藏 叫牌
    VisibleJiaoButton_normal:function(state){
        if(this.mOPMenu){

            this.setOPBtnVisible(this.BUTTON_TAG_JIAO1FEN,state);
            this.setOPBtnVisible(this.BUTTON_TAG_JIAO2FEN,state);
            this.setOPBtnVisible(this.BUTTON_TAG_JIAO3FEN,state);
            this.setOPBtnVisible(this.BUTTON_TAG_BUJIAO,state);

            if((sGameData.mGameMode == GAMEMODE_MATCH||sGameData.mGameMode == GAMEMODE_MATCH_VIDEO)&&state){
                var bijiao = false;
                if(this.mCallNum == 0){ //之前没人叫 检查必叫
                    bijiao = this.mDDZLogic.checkBijiao(this.mPlayerCardValueArray);
                }
                if(this.mBujiaoNum == 2){//前2家不叫，尾家必叫
                    bijiao = true;
                }
                var opbtn = this.mOPMenu.getChildByTag(this.BUTTON_TAG_BUJIAO);
                if(opbtn){
                    if(bijiao){
                        opbtn.setEnabled(false);
                    }else{
                        opbtn.setEnabled(true);
                    }
                }
            }

            if(state){
                var opbtn = this.mOPMenu.getChildByTag(this.BUTTON_TAG_JIAO1FEN);
                if(opbtn){
                    if(this.mCallNum>0){
                        opbtn.setEnabled(false);
                    }else{
                        opbtn.setEnabled(true);
                    }
                }
                var opbtn = this.mOPMenu.getChildByTag(this.BUTTON_TAG_JIAO2FEN);
                if(opbtn){
                    if(this.mCallNum>1){
                        opbtn.setEnabled(false);
                    }else{
                        opbtn.setEnabled(true);
                    }
                }
            }
        }
    },
    //设置继续按钮是否显示 出牌 提示 不出
    VisibleContinueButton:function(state){
        if(this.mOPMenu){
            this.setOPBtnVisible(this.BUTTON_TAG_JX,state);
            this.setOPBtnVisible(this.BUTTON_TAG_FH,state);
            this.setOPBtnVisible(this.BUTTON_TAG_JB,state);
        }
        if(state){
            this.mQuitClock.setCountDown();
        }else{
            this.mQuitClock.closeClock();
        }
    },

    //设置 某 操作按钮 是否显示
    setOPBtnVisible:function(tag,state){
        var opbtn = this.mOPMenu.getChildByTag(tag);
        if(opbtn){
            opbtn.setVisible(state);
        }
    },

    VisibleMatchStartButton:function(state){
        if(this.mMatchOPMenu){
            if(sGameData.mCurrMatch.type == MATCHSTART_TIME){
                this.setMatchOPBtnVisible(this.BUTTON_TAG_MATCH_BACKHALL,state);
            }else{
                this.setMatchOPBtnVisible(this.BUTTON_TAG_MATCH_BACKHALL,false);
            }
            this.setMatchOPBtnVisible(this.BUTTON_TAG_MATCH_SEEPRIZE,state);
            this.setMatchOPBtnVisible(this.BUTTON_TAG_MATCH_TUISAI,state);
        }
    },
    VisibleMatchRankButton:function(state){
        if(this.mMatchOPMenu){
            this.setMatchOPBtnVisible(this.BUTTON_TAG_MATCH_RANK,state);
            //this.setMatchOPBtnVisible(this.BUTTON_TAG_MATCH_PRIZE,state);
//            this.setMatchOPBtnVisible(this.BUTTON_TAG_MATCH_PAY,state);
        }
    },
    showScoreBtn:function(state){
        log("showScoreBtn--")
    },

    setMatchOPBtnVisible:function(tag,state,enable){
        if(enable==null){
            enable = true
        }
        var opbtn = this.mMatchOPMenu.getChildByTag(tag);
        if(opbtn){
            opbtn.setVisible(state);
            opbtn.setEnabled(enable)
        }
    },

    //接收到网络数据
    //游戏开始
    noticeDDZGameStart:function(netdata){
        log("noticeDDZGameStart");
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            var players = netdata[2];
            var mychair = -1;

            this.mGameUI.setInviteBtnDisable();

            this.mShowWait.stopAnim();
            this.mShowWait.setVisible(false);
            if(sGameData.mGameMode == GAMEMODE_MATCH||sGameData.mGameMode == GAMEMODE_MATCH_VIDEO) {
                this.mMatchWaitShow.setVisible(false);
                this.mMatchInfoTips.setVisible(false);
                this.mMatchUpProgressShow.setVisible(false);
                this.VisibleMatchStartButton(false);
                this.VisibleMatchRankButton(true);
                this.mMatchProgressShow.setVisible(true)
                sGameData.mCurrMatch.started = true;
            }
            this.mPlayerList = [];
            for(var i =0;i<players.length;i++){
                var player = players[i];
                log("player=="+player.id+"|"+player.nickName+"|"+player.chairId)
                if(sGameData.mGameMode != GAMEMODE_MATCH_VIDEO) {
                    if(player.id == sGameData.mUser.id){
                        mychair = player.chairId;
                        sGameData.mUser.chairId = mychair;
                        sGameData.mUser.xp = player.xp
                        sGameData.mUser.level = player.level
                        if(sGameData.mGameMode == GAMEMODE_MATCH||sGameData.mGameMode == GAMEMODE_MATCH_VIDEO) {
                            sGameData.mUser.score = player.score
                        }
                        break;
                    }
                }else{
                    if(player.id == sGameData.mPlayerInMatchVideo.id){
                        mychair = player.chairId;
                        sGameData.mPlayerInMatchVideo.chairId = mychair;
                        sGameData.mPlayerInMatchVideo.xp = player.xp
                        sGameData.mPlayerInMatchVideo.level = player.level
                        if(sGameData.mGameMode == GAMEMODE_MATCH||sGameData.mGameMode == GAMEMODE_MATCH_VIDEO) {
                            sGameData.mPlayerInMatchVideo.score = player.score
                        }
                        break;
                    }
                }
            }
            if(sGameData.mGameMode != GAMEMODE_MATCH_VIDEO) {
                this.mBaseChairId = sGameData.mUser.chairId
            }else{
                this.mBaseChairId = sGameData.mPlayerInMatchVideo.chairId
            }
            log("mychair=="+mychair);
            for(var i =0;i<players.length;i++){
                var player = players[i];
                var aPlayer = this.getPlayer(player.id);
                if(aPlayer == null){
                    this.addPlayer(player);
                }else{
                    aPlayer.chairId = player.chairId;
                }
                if(player.chairId != -1){
                    this.mChairSitDown[player.chairId] = 1;
                    this.playersSitDown(player);
                }
            }
            if(sGameData.mGameMode != GAMEMODE_MATCH_VIDEO) {
                this.mMyChairId = sGameData.mUser.chairId;
            }else{
                this.mMyChairId = sGameData.mPlayerInMatchVideo.chairId
            }
        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }

    },
    //发牌
    noticeDDZFaCard:function(netdata){
        log("noticeDDZFaCard");
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            var lordChairIdx = netdata[2];
            var displayPos = netdata[3];
            var displayerCard =  netdata[4];
            var cards = netdata[5];


            if(sGameData.mGameMode == GAMEMODE_MATCH||sGameData.mGameMode == GAMEMODE_MATCH_VIDEO){
                this.cleanall(1);
                if(sGameData.mGameMode != GAMEMODE_MATCH_VIDEO){
                    sGameData.mCurrMatch.currPlayCount++;
                    getMatchCurrLundata(sGameData.mCurrMatch);
                    if(sGameData.mCurrMatch.currLunPlayCount ==1){
                        if(sGameData.mCurrMatch.currPlayLun > 1){
                            var data = sGameData.mCurrMatch.lundatas[sGameData.mCurrMatch.currPlayLun-1];
                            var data1 = sGameData.mCurrMatch.lundatas[sGameData.mCurrMatch.currPlayLun-2];
                            if(data.playercount < data1.playercount){
                                showLittleNotice(sResWord.w_match_tip_new_up);
                            }else{
                                showLittleNotice(sResWord.w_match_tip_new_changetable);
                            }
                        }
                    }
                }
                this.checkMatchBasePoint();
                this.mBasePoint = sGameData.mCurrMatch.basicGScore
                this.showBeishuChange(1);

            }

            this.mShowCardChairId = lordChairIdx;
            this.mShowCardIndex = displayPos;
            this.mShowCardValue = displayerCard;
            this.mPlayerCardValueArray = cards;

            this.mIsInGame = true;
            this.mIsGameOver = false;
            this.mActiveSeatId = this.getPlayerSeatByChairId(this.mShowCardChairId);

            this.fapaiStart();

        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }

    },
    //叫牌
    noticeDDZCallCard:function(netdata){
        log("noticeDDZCallCard");
        var flag = netdata[1];
        if(flag == NET_SUCCESS) {

                var chair = netdata[2]
                var num = netdata[3]; //等于0表示不叫
                var cards = netdata[4];
                var dizhucards = netdata[5];
                var state = netdata[6]; // 0：重新发牌， 1：下一个玩家叫地主, 2:开始出牌 当状态为2时一下内容有效 3倒 4拉
                var nextChairId = netdata[7];
                var seat = this.getPlayerSeatByChairId(chair);
                var nextseat = this.getPlayerSeatByChairId(nextChairId);
                this.mActiveSeatId = nextseat

                log("chair=" + chair + " seat=" + seat + " callcard=" + num);
                log("cards=" + cards);
                log("dizhucards=" + dizhucards);
                log("gamestate=" + state);
                log("nextChairId=" + nextChairId);

                if (seat == 0) {//隐藏按钮
                    this.VisibleJiaoButton(false);
                    this.VisibleMenzhuaButton(false);//sc
                }
                this.mShowCardTip.showTip(0);

                var currCallLordNum = num;
                var lordChairIdx = -1;
                var isCallCardOKEnd = false;
                var isMenzhu = false;
                if (cards.length > 0) {//发了自己牌，显示出来
                    this.mPlayerCardValueArray = cards;
                    this.mPlayerCardValueArray.sort(sortByCard);
                    this.sortPlayerHandCard();
                }
                if (dizhucards.length > 0) {//有地主牌
                    this.mDizhuCardValueArray = dizhucards;
                }
                if (state > 1) { //叫牌结束 ，出牌或倒拉
                    isCallCardOKEnd = true;
                } else if (state == DDZ_CALLLORD_STATE) {//叫牌状态 （下1个叫）
                    if (this.mActiveSeatId == 0) {
                        if (this.mBuJiaoNum < 2) {
                            this.VisibleMenzhuaButton(true);
                        } else {//尾家直接叫牌
                            this.op_jiaopai_sc();
                        }
                    }
                } else if (state == DDZ_RESTART_STATE) {
                    //this.reInitDataUI();
                    this.cleanDizhuCardObject();
                    this.cleanall(1);
                }
                if (num > 0) {//叫牌
                    if (isCallCardOKEnd) {
                        this.mShowOP.cleanAll()
                    }
                    if (num > this.mCallNum) {
                        this.mCallNum = num;
                    }
                    if (sGameData.mUseDDZRule == DDZ_RULE_SC) {// 四川规则 判断是否闷抓
                        if (this.mSeeCard[seat] == 0) {

                            log("chair " + chair + " menzhua")
                            isMenzhu = true;
                            this.mShowOP.showOPImage(seat, 12);
                            this.playOPSound(seat, 12);
                        } else {
                            this.mShowOP.showOPImage(seat, 13);
                            this.playOPSound(seat, 13);
                        }
                        //this.playOPSound(seat, num);
                    } else {
                        this.mShowOP.showOPImage(seat, num);
                        this.playOPSound(seat, num);
                    }
                } else {//没叫牌
                    this.mBujiaoNum++;
                    if (sGameData.mUseDDZRule == DDZ_RULE_SC) {
                        if (state != 0) {
                            this.mShowOP.showOPImage(seat, 14);
                        }
                        this.playOPSound(seat, 14);
                    } else {
                        if (state != 0) {
                            this.mShowOP.showOPImage(seat, 5);
                        }
                        this.playOPSound(seat, 4);
                    }
                }

                //叫地主 结束
                if (isCallCardOKEnd) {
                    lordChairIdx = chair;
                    var dizhuseat = this.getPlayerSeatByChairId(lordChairIdx);
                    log("dizhuseat==" + dizhuseat + "|" + lordChairIdx)
                    this.setDizhu(dizhuseat, true);

                    this.mCanShowBeishu = true;

                    if (sGameData.mGameMode == GAMEMODE_MATCH || sGameData.mGameMode == GAMEMODE_MATCH_VIDEO) {
                        this.checkMatchBasePoint();
                        this.mBasePoint = sGameData.mCurrMatch.basicGScore * currCallLordNum;
                    } else {
                        this.mBasePoint = sGameData.mCurrRoom.basicPoint * currCallLordNum;
                    }


                    this.mDizhuChairId = lordChairIdx;
                    this.mCardNumArray = [17, 17, 17];
                    this.mCardNumArray[dizhuseat] = 20;
                    this.mDizhuCardValueArray = dizhucards;
                    //this.mShowOP.cleanAll();
                    //this.mShowOP.showOPImage(dizhuseat,currCallLordNum);


                    if (isMenzhu) {
                        this.showBeishuChange(3, chair);
                    } else {
                        this.showBeishuChange(1);
                    }

                    this.showDizhuCard(true);

                    if (dizhuseat == 0) {
                        if (this.mPlayerCardValueArray.length > 0) {
                            if (dizhucards.length == 0) {
                                for (var i = 0; i < 3; i++) {
                                    dizhucards[i] = 0;
                                }
                            }
                            var canadddizhucards = true;
                            if (this.mPlayerCardValueArray.length == 20) {
                                canadddizhucards = false;
                            }
                            for (var i = 0; i < 3; i++) {
                                var index = 17 + i;
                                if (canadddizhucards) {
                                    this.mPlayerCardValueArray.push(dizhucards[i]);
                                }
                                var acard = DDZCard.create();
                                var pos = this.getCardPos(0, index, 20);
                                acard.setPosition(pos);
                                acard.mSeat = dizhuseat;
                                acard.mIndex = index;
                                acard.setCardValue(dizhucards[i]);
                                acard.setScale(sGameData.mDDZ_mycard_scale)
                                this.addChild(acard, 5 + index);
                                this.mPlayerHandCardShowArray[dizhuseat].push(acard);
                            }
                            this.mShowOP.cleanAll();
                            this.mPlayerCardValueArray.sort(sortByCard);
                            this.sortPlayerHandCard(true, dizhucards);
                        }
                    } else {
                        this.setSeatCardcount(dizhuseat, 20);
                    }

                    if (state == 2) {// 通用规则－发自己牌
                        if (this.mActiveSeatId == 0) {
                            this.VisiblePlayButton(true);
                        }
                    } else if (state == 3) {// 倒
                        if (this.mActiveSeatId == 0) {
                            if (this.mSeeCard[0] == 1) { //自己看牌 不能倒//this.mSeeCard[seat] == 0 &&
                                this.op_budao_sc();
                            } else {
                                this.VisibleDaoButton(true);
                            }
                        }
                    }
                }

                if (state == 2) {
                    this.showClock(this.mActiveSeatId, true, 1);
                } else {
                    this.showClock(this.mActiveSeatId, true);
                }



        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },
    noticeDDZJiabei:function(netdata){
        log("noticeDDZJiabei");
        var flag = netdata[1];
        if(flag == NET_SUCCESS){

            var chairId = netdata[2]
            var jiabei = netdata[3]
            var gameState = netdata[4]
            var currOperateChairIdx = netdata[5]
            var seat = this.getPlayerSeatByChairId(chairId);

            this.VisibleJiabeiButton(false);

            if(jiabei == 1){
                this.showBeishuChange(6,chairId);
                this.mShowOP.showOPImage(seat, 6);
                this.playOPSound(seat,21)
            }else{
                this.mShowOP.showOPImage(seat, 7);
                this.playOPSound(seat,22)
            }


          log("chairId=="+chairId+ " jiabei=="+jiabei)

            var tseat = this.getPlayerSeatByChairId(currOperateChairIdx);
            this.mActiveSeatId = tseat;
            this.showClock(this.mActiveSeatId,true,1);
            if(currOperateChairIdx == this.mDizhuChairId) {
                if(this.mActiveSeatId == 0){
                    this.VisiblePlayButton(true);
                }
            }else {
                if(this.mActiveSeatId == 0){
                    this.VisibleJiabeiButton(true);
                }
            }
        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },
    //叫牌
    noticeDDZCallCard_normal:function(netdata){
        log("noticeDDZCallCard");
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            var chair =  netdata[2]
            var num =  netdata[3]; //等于0表示不叫
            var state = netdata[4]; // 0：重新发牌， 1：下一个玩家叫地主, 2:开始出牌  当状态为2时一下内容有效
            var seat=this.getPlayerSeatByChairId(chair);
            if(seat==0){
                this.VisibleJiaoButton(false);
            }
            this.mShowCardTip.showTip(0);

            if(num > this.mCallNum){
                this.mCallNum = num;
            }

            if(num>0){
                this.mShowOP.showOPImage(seat,num);
                this.playOPSound(seat,num);
            }else{
                if(state!=0){
                    this.mShowOP.showOPImage(seat,5);
                }
                this.playOPSound(seat,4);
            }

            //this.checkShowReChooseBtn();

            if(state==2){
                var lordChairIdx =  netdata[5]; //地主椅子号
                var currCallLordNum =  netdata[6]; //当前所叫的分数
                var dizhucards = netdata[7];
                var dizhuseat=this.getPlayerSeatByChairId(lordChairIdx);
                log("dizhuseat=="+dizhuseat+"|"+lordChairIdx)
                this.setDizhu(dizhuseat,true);
                if(sGameData.mGameMode == GAMEMODE_MATCH||sGameData.mGameMode == GAMEMODE_MATCH_VIDEO){
                    this.checkMatchBasePoint();
                    this.mBasePoint = sGameData.mCurrMatch.basicGScore*currCallLordNum;
                }else{
                    this.mBasePoint = sGameData.mCurrRoom.basicPoint*currCallLordNum;
                }
                this.mBeishu = 1;
                this.mDizhuChairId = lordChairIdx;
                this.showBeishuChange(7,lordChairIdx);

                this.mCanShowBeishu = true;

                this.showBeiShuInView(this.mBeishu,this.mBasePoint)
                //this.mGameUI.setBeishu(this.mBeishu,this.mBasePoint);

                this.mCardNumArray = [17,17,17];
                this.mCardNumArray[dizhuseat] = 20;
                this.mDizhuCardValueArray = dizhucards;
                this.mShowOP.cleanAll();

                this.mShowOP.showOPImage(dizhuseat,currCallLordNum);

                this.showDizhuCard(true);
                if(dizhuseat==0){
                    for(var i = 0;i<3;i++){
                        var index = 17+i;
                        this.mPlayerCardValueArray.push(dizhucards[i]);
                        var acard = DDZCard.create();
                        var pos = this.getCardPos(0,index,20);
                        acard.setPosition(pos);
                        acard.mSeat = dizhuseat;
                        acard.mIndex = index;
                        acard.setCardValue(dizhucards[i]);
                        acard.setScale(sGameData.mDDZ_mycard_scale)
                        this.addChild(acard,5+index);
                        this.mPlayerHandCardShowArray[dizhuseat].push(acard);
                    }
                    this.mShowOP.cleanAll();
                    this.mPlayerCardValueArray.sort(sortByCard);
                    this.sortPlayerHandCard(true,dizhucards);
                    //this.checkShowReChooseBtn();
                }else{
                    this.setSeatCardcount(dizhuseat,20);
                }

                if(sGameData.mDDZHasJiabei){
                    this.mActiveSeatId = this.getNextSeat(dizhuseat);
                    this.showClock(this.mActiveSeatId,true,1);
                    if(this.mActiveSeatId == 0){
                        this.VisibleJiabeiButton(true);
                    }
                }else{
                    this.mActiveSeatId = dizhuseat;
                    this.showClock(this.mActiveSeatId,true,1);
                    if(this.mActiveSeatId == 0){
                        this.VisiblePlayButton(true);
                    }
                }
            }else if(state==1){
                this.mActiveSeatId = this.getNextSeat(seat);
                this.showClock(this.mActiveSeatId,true);
                if(this.mActiveSeatId == 0){
                    this.VisibleJiaoButton(true);
                }
            }else if(state==0){
                //this.reInitDataUI();
                this.cleanDizhuCardObject();
                this.cleanall(1);
            }

        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },

    noticeDDZSeeCard:function(netdata){
        log("noticeDDZSeeCard");
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            var chairId = netdata[2];
            var cards = netdata[3];
            var seat = this.getPlayerSeatByChairId(chairId);
            if(seat == 0){
                this.VisibleMenzhuaButton(false);
            }
            log("chairId="+chairId+ " seat="+seat+ " seecards="+cards);

            this.mSeeCard[seat] = 1;
            this.mShowOP.showOPImage(seat,11);
            this.playOPSound(seat,11);
            if(seat == 0){
                this.mPlayerCardValueArray = cards;
                this.mPlayerCardValueArray.sort(sortByCard);
                this.sortPlayerHandCard();
                this.VisibleJiaoButton(true);
            }
            this.showClock(this.mActiveSeatId,true)

        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },
    noticeDDZDaoLa:function(netdata){
        log("noticeDDZDaoLa");
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            var chairId = netdata[2] ;
            var daolatype = netdata[3];
            var cards = netdata[4];
            var dizhucards = netdata[5];
            var state = netdata[6]; // 0：重新发牌， 1：下一个玩家叫地主, 2:开始出牌 当状态为2时一下内容有效 3倒 4拉
            var nextChairId = netdata[7];

            var seat = this.getPlayerSeatByChairId(chairId);
            this.mDaoLaState[seat] = daolatype;

            log("chairId="+chairId+ " seat="+seat+ " daola="+daolatype);
            log("cards="+cards);
            log("dizhucards="+dizhucards);
            log("gamestate=" + state);
            log("nextChairId=" + nextChairId);

            var dizhuseat = this.getPlayerSeatByChairId(this.mDizhuChairId);
            this.mActiveSeatId = this.getPlayerSeatByChairId(nextChairId);

            if(seat == 0){//隐藏按钮
                this.VisibleDaoButton(false);
                this.VisibleLaButton(false);
            }

            if(cards.length > 0){//发了自己牌，显示出来
                this.mPlayerCardValueArray = cards;
                this.mPlayerCardValueArray.sort(sortByCard);
                this.sortPlayerHandCard();
            }
            if(dizhucards.length > 0){//有地主牌
                this.mDizhuCardValueArray = dizhucards;
            }
            if(this.mDizhuChairId == this.mMyChairId) { //地主 是自己 ，组合地主牌
                if(this.mDizhuCardValueArray.length > 0 && this.mPlayerCardValueArray.length >0 && this.mPlayerCardValueArray.length <20){
                    for(var i=0;i<this.mDizhuCardValueArray.length;i++){
                        this.mPlayerCardValueArray.push(this.mDizhuCardValueArray[i]);
                    }
                    this.mPlayerCardValueArray.sort(sortByCard);
                    this.sortPlayerHandCard();
                }
            }

            if(daolatype == 1){//倒
                if(chairId == this.mMyChairId || (this.mDizhuChairId ==this.mMyChairId && !this.mIsDaopai)){
                    this.showBeishuChange(4,chairId);
                }else{
                    this.showBeishuChange(4,chairId);
                }
                this.mIsDaopai = true;
                if(seat == 0){
                    this.mIsDaopai_me = true;
                }
                this.mShowOP.showOPImage(seat,15);
                this.showClock(this.mActiveSeatId,true);
                this.playOPSound(seat,15);
            }else if(daolatype == 2){//不倒
                this.mShowOP.showOPImage(seat,16);
                this.showClock(this.mActiveSeatId,true);
                this.playOPSound(seat,16);
            }else if(daolatype == 3){//拉
                if(this.mIsDaopai_me || this.mMyChairId == this.mDizhuChairId){
                    this.showBeishuChange(5,chairId);
                }else{
                    this.showBeishuChange(5,chairId);
                }
                this.mShowOP.showOPImage(seat,17);
                this.showClock(this.mActiveSeatId,true,1);
                this.playOPSound(seat,17);
            }else if(daolatype == 4){//不拉
                this.mShowOP.showOPImage(seat,18);
                this.showClock(this.mActiveSeatId,true,1);
                this.playOPSound(seat,18);
            }

            if(this.mActiveSeatId == 0){
                if(state == 2){
                    this.VisiblePlayButton(true);
                    this.showClock(this.mActiveSeatId,true,1);
                }else if(state == 3){
                    if(this.mSeeCard[0]==1){//this.mSeeCard[dizhuseat] == 0&&
                        this.op_budao_sc()
                    }else{
                        this.VisibleDaoButton(true);
                    }
                }else if(state == 4){
                    this.VisibleLaButton(true);
                }
            }

        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },
    //出牌
    noticeDDZOutCard:function(netdata){
        log("noticeDDZOutCard");
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            var chairId = netdata[2]
            //this.cleanDizhuCardObject();
            var seat= this.getPlayerSeatByChairId(chairId);
            this.mActiveSeatId = this.getNextSeat(seat);

            this.VisibleJiabeiButton(false);

            this.mShowCardTip.showTip(0);
            if(seat == 0){
                if(this.mPlayerCardValueArray.length != 1) {
                    if (this.mIsShowPlayBtning) {
                        if(!this.mIsTuoguaning){
                            this.mIsTuoguaning = true;
                            this.setTuoguanState();
                            this.sendTuoguanCmd();
                        }
                    }
                }
                this.VisiblePlayButton(false);
            }
            this.cleanPlayerOutCard(this.mActiveSeatId);
            this.mShowOP.cleanOP(this.mActiveSeatId);
            this.mPlayerOutCardValueArray[seat] = new Array();

            sGameData.mPausedCommand_Use = true;

            var aIsOver = false;//游戏结束

            var len = netdata[3]
            if(len > 0){

                var type = netdata[4];
                var cards = netdata[5];
                cards.sort(sortByCard);
                this.mCurrOutCards = cards;
                this.mCurrOutCardsType = type;
                this.mPlayerOutCardValueArray[seat]=cards;

                if(chairId == this.mDizhuChairId){
                    log("dizhu out=="+chairId+"|"+this.mDizhuChairId);
                    this.mDizhuOutNum++;
                }

                if(seat==0){
                    this.show_OutCard(cards);
                }else{
                    this.otherPlayerOutCard(seat);
                }
                if(this.mCardNumArray[seat]==0){
                    aIsOver = true;
                }
            }else{
                this.mShowOP.showOPImage(seat,4);
                this.playOPSound(seat,5);

                var callback = cc.CallFunc.create(this.showOutCardend, this);
                var delay = cc.DelayTime.create(0.5)
                var actions = cc.Sequence.create(delay,callback);
                this.runAction(actions);
            }
            if(!aIsOver){
                if(this.mActiveSeatId == 0){
                    this.checkChooseCardCanOut();
                }
            }
            if(!aIsOver){
                this.showClock(this.mActiveSeatId,true);
                if(this.mActiveSeatId == 0){
                    this.VisiblePlayButton(true);
                    hiddenViewWhenAction();
                    if(this.mIsTuoguaning){
                        this.daida_tuoguan();
                    }
                }
            }
            if(aIsOver){
                this.showClock(this.mActiveSeatId,false);
            }


        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },

    //更新玩家金币等
    updateShowPlayerCash:function(){
        if(sGameData.mGameMode == GAMEMODE_MATCH||sGameData.mGameMode == GAMEMODE_MATCH_VIDEO){
            for(var i = 0;i<3;i++){
                var aHead1 = this.mUserHeadsArray[i];
                if(aHead1!=null){
                    aHead1.updateCashInfo();
                }
            }

        }else{
            var aHead1 = this.mUserHeadsArray[0];
            if(aHead1!=null){
                aHead1.updateCashInfo();
            }
        }

    },
    //游戏结束
    noticeDDZGameOver:function(netdata){
        log("noticeDDZGameOver");
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            var datas = netdata[2];
            var infos = netdata[3];
            var mybeishu = netdata[4];
            log("infos--"+infos)
            this.mShowCardTip.showTip(0);


            var isMeWin = false;
            var scores = [];
            for(var i=0;i<datas.length;i++){
                var data = datas[i]
                var chairId = data.chairId
                var score = data.score
                var matchscore = 0;
                var matchPlayerCount = 0;
                var matchRank = 0;
                if(sGameData.mGameMode == GAMEMODE_MATCH||sGameData.mGameMode == GAMEMODE_MATCH_VIDEO){
                    matchscore = data.matchScore
                    matchPlayerCount = data.playercount
                    matchRank = data.rank
                    log("matchscore="+matchscore+"|"+chairId+"|"+score+"|"+matchRank);

                }
                var cards = data.cards
                log("cards==="+cards);
                cards.sort(sortByCard);
                var seat = this.getPlayerSeatByChairId(chairId,this.mMyChairId);
                if(sGameData.mGameMode == GAMEMODE_NORMAL) {
                    scores[seat] = score;
                }else{
                    scores[seat] = matchscore;
                }
                if(cards.length>0&&seat>0)
                {
                    log("cards="+seat+"|"+cards);
                    this.mPlayerOutCardValueArray[seat]=cards;
                    this.otherPlayerOutCard(seat,true);
                }
                if(sGameData.mGameMode == GAMEMODE_NORMAL) {
                    if (seat == 0 && score > 0) {
                        isMeWin = true;
                    }
                }else{
                    if (seat == 0 && matchscore > 0) {
                        isMeWin = true;
                    }
                }
                if(seat ==0){
                    if(sGameData.mGameMode != GAMEMODE_MATCH_VIDEO) {
                        if(sGameData.mGameMode == GAMEMODE_NORMAL){
                            sGameData.mUser.softCash += score;
                        }else{
                            //sGameData.mUser.softCash += score;
                            sGameData.mUser.score += matchscore;
                            var lastrank = sGameData.mCurrMatch.rank;
                            sGameData.mCurrMatch.rank = matchRank;
                            sGameData.mCurrMatch.currPlayerCount = matchPlayerCount;
                            if(lastrank == 0){
                                sGameData.mCurrMatch.rankchange = 1
                            }else{
                                if(lastrank == matchRank) {
                                    sGameData.mCurrMatch.rankchange = 0
                                }else if(lastrank > matchRank){
                                    sGameData.mCurrMatch.rankchange = 1
                                }else{
                                    sGameData.mCurrMatch.rankchange = -1
                                }
                            }
                        }
                    }else{
                        sGameData.mPlayerInMatchVideo.score += matchscore;
                    }
                }else{
                    if(sGameData.mGameMode != GAMEMODE_NORMAL){
                        var player = this.getPlayerByChairId(chairId);
                        player.score += matchscore;
                    }
                }
            }
            this.updateShowPlayerCash();
            if(sGameData.mGameMode != GAMEMODE_MATCH_VIDEO) {
                log("myscore=" + sGameData.mUser.score + "|" + this.mMyChairId+"|"+sGameData.mUser.softCash)
            }


            this.stopCardcountFlash();
            //this.checkChuntian();

            if(isMeWin){
                SoundManager.playSound(res.ddz_win_mp3,false,SOUND_EFFECT);
            }else{
                SoundManager.playSound(res.ddz_lose_mp3,false,SOUND_EFFECT);
            }
            var meisDizhu = false;
            if(sGameData.mGameMode != GAMEMODE_MATCH_VIDEO) {
                if (this.mDizhuChairId == this.mMyChairId) {
                    meisDizhu = true;
                }
            }else{
                if (this.mDizhuChairId == sGameData.mPlayerInMatchVideo.chairId) {
                    meisDizhu = true;
                }
            }

            this.VisiblePlayButton(false);


            if(sGameData.mGameMode == GAMEMODE_NORMAL) {
                this.VisibleContinueButton(true);
            }

            this.mIsTuoguaning = false;
            this.setTuoguanState();

            this.mIsInGame = false;
            this.mIsGameOver = true;
            if(sGameData.mGameMode != GAMEMODE_MATCH_VIDEO) {
                sGameData.mUser.chairId = -1;
            }else{
                sGameData.mPlayerInMatchVideo.chairId = -1
            }



            this.mGameUI.setInviteBtnEnable();

            //this.mShowScore.setScore(scores,meisDizhu,isMeWin,this.mTeshuNum);

            this.mShowScore.showScore(datas,infos,mybeishu);
            this.mShowScore.setVisible(true);
//            if(isMeWin){
//                this.mShowScore.showWinAnim();
//            }else{
//                this.mShowScore.showLoseAnim()
//            }
            if(sGameData.mGameMode == GAMEMODE_MATCH){
                sGameData.mIsGameShowAniming = true;
                this.mIsShowOverAnim = true;
                var time = 3;
                var callback = cc.CallFunc.create(this.showScoreEnd, this);
                var seq = cc.Sequence.create(cc.DelayTime.create(time), callback);
                this.runAction(seq);
            }
            log("本局游戏结束");

        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },


    //游戏结束
    noticeDDZGameOver_normal:function(netdata){
        log("noticeDDZGameOver");
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            var rocketCount = netdata[2];
            var springCount = netdata[3];
            var bombCount = netdata[4];

            this.mTeshuNum[0] = rocketCount;
            this.mTeshuNum[1] = bombCount;
            this.mTeshuNum[2] = springCount;

            this.mShowCardTip.showTip(0);

            var len = netdata[5];
            var isMeWin = false;
            var scores = [];
            for(var i=0;i<len;i++){
                var data = netdata[6+i]
                var chairId = data.chairId
                var score = data.score
                var matchscore = 0;
                if(sGameData.mGameMode == GAMEMODE_MATCH||sGameData.mGameMode == GAMEMODE_MATCH_VIDEO){
                    matchscore = data.matchScore
                    log("matchscore="+matchscore+"|"+chairId+"|"+score);
                }
                var cards = data.cards
                log("cards==="+cards);
                cards.sort(sortByCard);
                var seat = this.getPlayerSeatByChairId(chairId,this.mMyChairId);
                if(sGameData.mGameMode == GAMEMODE_NORMAL) {
                    scores[seat] = score;
                }else{
                    scores[seat] = matchscore;
                }
                if(cards.length>0&&seat>0)
                {
                    log("cards="+seat+"|"+cards);
                    this.mPlayerOutCardValueArray[seat]=cards;
                    this.otherPlayerOutCard(seat,true);
                }
                if(sGameData.mGameMode == GAMEMODE_NORMAL) {
                    if (seat == 0 && score > 0) {
                        isMeWin = true;
                    }
                }else{
                    if (seat == 0 && matchscore > 0) {
                        isMeWin = true;
                    }
                }
                if(seat ==0){
                    if(sGameData.mGameMode != GAMEMODE_MATCH_VIDEO) {
                        if(sGameData.mGameMode == GAMEMODE_NORMAL){
                            sGameData.mUser.softCash += score;
                        }else{
                            sGameData.mUser.softCash += score;
                            sGameData.mUser.score += matchscore;
                        }
                    }else{
                        sGameData.mPlayerInMatchVideo.score += matchscore;
                    }
                }else{
                    if(sGameData.mGameMode != GAMEMODE_NORMAL){
                        var player = this.getPlayerByChairId(chairId);
                        player.score += matchscore;
                    }
                }
            }
            this.updateShowPlayerCash();
            if(sGameData.mGameMode != GAMEMODE_MATCH_VIDEO) {
                log("myscore=" + sGameData.mUser.score + "|" + this.mMyChairId+"|"+sGameData.mUser.softCash)
            }


            this.stopCardcountFlash();
            //this.checkChuntian();

            if(isMeWin){
                SoundManager.playSound(res.ddz_win_mp3,false,SOUND_EFFECT);
            }else{
                SoundManager.playSound(res.ddz_lose_mp3,false,SOUND_EFFECT);
            }
            var meisDizhu = false;
            if(sGameData.mGameMode != GAMEMODE_MATCH_VIDEO) {
                if (this.mDizhuChairId == this.mMyChairId) {
                    meisDizhu = true;
                }
            }else{
                if (this.mDizhuChairId == sGameData.mPlayerInMatchVideo.chairId) {
                    meisDizhu = true;
                }
            }

            this.VisiblePlayButton(false);
            //this.setReChooseState(false,false);


            if(sGameData.mGameMode == GAMEMODE_NORMAL) {
                this.VisibleContinueButton(true);
            }

            this.mIsTuoguaning = false;
            this.setTuoguanState();

            this.mGameUI.setInviteBtnEnable();

            this.mIsInGame = false;
            this.mIsGameOver = true;
            if(sGameData.mGameMode != GAMEMODE_MATCH_VIDEO) {
                sGameData.mUser.chairId = -1;
            }else{
                sGameData.mPlayerInMatchVideo.chairId = -1
            }
            this.mShowScore_normal.setScore(scores,meisDizhu,isMeWin,this.mTeshuNum);
            //this.mShowScore.showScore(datas,infos,mybeishu);
            this.mShowScore_normal.setVisible(true);
            if(isMeWin){
                this.mShowScore_normal.showWinAnim();
            }else{
                this.mShowScore_normal.showLoseAnim()
            }
            if(sGameData.mGameMode == GAMEMODE_MATCH){
                sGameData.mIsGameShowAniming = true;
                this.mIsShowOverAnim = true;
                var time = 3;
                var callback = cc.CallFunc.create(this.showScoreEnd, this);
                var seq = cc.Sequence.create(cc.DelayTime.create(time), callback);
                this.runAction(seq);
            }
            log("本局游戏结束");

        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },

    showScoreEnd: function () {

        this.mIsShowOverAnim = false;
        sGameData.mIsGameShowAniming = false;

    },
    //断线重连 在桌子 显示玩家
    setPlayerOnTable_reconn:function(playerdatas){
        var mychair = -1;
        for(var i =0;i<playerdatas.length;i++){
            var data = playerdatas[i];
            var player = data[0];
            log("player=="+player.id+"|"+player.nickName+"|"+player.chairId)
            if(player.id == sGameData.mUser.id){
                mychair = player.chairId;
                sGameData.mUser.chairId = mychair;
                if (sGameData.mGameMode == GAMEMODE_MATCH || sGameData.mGameMode == GAMEMODE_MATCH_VIDEO) {
                    sGameData.mUser.score = player.score
                }
                break;
            }
        }
        this.mBaseChairId = sGameData.mUser.chairId

        log("mychair=="+mychair);
        for(var i =0;i<playerdatas.length;i++){
            var data = playerdatas[i];
            var player = data[0];
            var aPlayer = this.getPlayer(player.id);
            if(aPlayer == null){
                this.addPlayer(player);
            }else{
                aPlayer.chairId = player.chairId;
            }
            if(player.chairId != -1){
                this.mChairSitDown[player.chairId] = 1;
                this.playersSitDown(player);
            }
        }
        this.mMyChairId = sGameData.mUser.chairId;
    },
    //断线重连 场景数据
    noticeDDZScene:function(netdata){
        log("noticeDDZScene");
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            var gamestate = netdata[2] ;
            var lordChairIdx = netdata[3]  ;
            var currOperateChairIdx = netdata[4];
            var currCallLordNum = netdata[5];
            var bombCount = netdata[6];
            log("gamestate="+gamestate+"|"+lordChairIdx+"|"+currOperateChairIdx+"|"+currCallLordNum+"|"+bombCount);
            var playerdatas = netdata[7];

            this.initGameData();

            this.mGameUI.setInviteBtnDisable();

            this.setPlayerOnTable_reconn(playerdatas);

            this.mIsInGame = true;
            this.mIsGameOver = false;

            this.mShowWait.setVisible(false);
            if(sGameData.mGameMode == GAMEMODE_MATCH||sGameData.mGameMode == GAMEMODE_MATCH_VIDEO) {
                this.mMatchWaitShow.setVisible(false);
                this.mMatchInfoTips.setVisible(false);
                this.mMatchUpProgressShow.setVisible(false);
                this.VisibleMatchStartButton(false);
                this.VisibleMatchRankButton(true);
                this.mMatchProgressShow.setVisible(true)
            }

            this.mActiveSeatId = this.getPlayerSeatByChairId(currOperateChairIdx);
            this.mCallNum = 0
            var dizhuseat= -1;
            if(gamestate > 1){
                var dizhuseat=this.getPlayerSeatByChairId(lordChairIdx);
                this.setDizhu(dizhuseat,true);
                if(sGameData.mGameMode == GAMEMODE_MATCH||sGameData.mGameMode == GAMEMODE_MATCH_VIDEO){
                    this.checkMatchBasePoint();
                    this.mBasePoint = sGameData.mCurrMatch.basicGScore*currCallLordNum;
                }else {
                    this.mBasePoint = sGameData.mCurrRoom.basicPoint * currCallLordNum;
                }
                this.mBeishu = bombCount;
                this.showBeiShuInView(this.mBeishu,this.mBasePoint);
                this.mDizhuChairId = lordChairIdx;
            }
            var cards_outall = [];
            for(var i=0;i<playerdatas.length;i++){
                var data = playerdatas[i];
                var player = data[0];
                var seat = this.getPlayerSeatByChairId(player.chairId);
                log("player="+player.id+"|"+player.userName+"|"+player.chairId+"|"+seat);
                if(gamestate == 1){
                    var callLordNum = data[1];
                    var handcards = data[2];
                    log("callLordNum="+callLordNum);
                    log("handcards="+handcards);
                    if(callLordNum > 0){
                        this.mShowOP.showOPImage(seat,callLordNum);
                    }
                    if(callLordNum > this.mCallNum){
                        this.mCallNum = callLordNum;
                    }
                    if(seat == 0){
                        this.mPlayerCardValueArray = handcards;
                        this.showPlayerHandCard_reconn();
                    }else{
                        this.setSeatCardcount(seat,17);
                    }
                    this.mCardNumArray[seat] = 17;
                }else if(gamestate == 2){
                    var handcardslen = data[1];
                    var handcards = data[2];
                    var outcards = data[3];
                    log("handcardslen="+handcardslen);
                    log("handcards="+handcards);
                    log("outcards="+outcards);
                    this.mCardNumArray[seat] = handcardslen;
                    if(seat == 0){
                        this.mPlayerCardValueArray = handcards;
                        this.showPlayerHandCard_reconn();
                    }else{
                        this.setSeatCardcount(seat,handcardslen);
                    }
                    cards_outall[player.chairId] = outcards;
                }else if(gamestate == 3 || gamestate == 4){
                    var daolastate = data[1];
                    var cards = data[2];
                    log("daolastate="+daolastate);
                    log("cards="+cards);
                    this.mDaoLaState[seat] = daolastate;
                    if(seat == 0){
                        this.mPlayerCardValueArray = cards;
                        this.showPlayerHandCard_reconn();
                    }else{
                        if(dizhuseat != seat){
                            this.setSeatCardcount(seat,17);
                        }else{
                            this.setSeatCardcount(seat,20);
                        }
                    }
                }
            }
            this.showOutCard_reconn(cards_outall,this.mActiveSeatId);
            if(this.mActiveSeatId==0)
            {
                if(gamestate == 1){
                    this.VisibleJiaoButton(true);
                }else if(gamestate== 2)
                {
                    this.VisiblePlayButton(true);
                }else{
                    log("error state ");
                }
            }
            this.sendTuoguanCancelCmd();
            if(this.mActiveSeatId!=-1){
                this.showClock(this.mActiveSeatId,true);
            }

        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },

    //断线重连 场景数据
    noticeDDZScene_normal:function(netdata){
        log("noticeDDZScene");
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            var gamestate = netdata[2] ;
            var lordChairIdx = netdata[3]  ;
            var currOperateChairIdx = netdata[4];
            var currCallLordNum = netdata[5];
            var bombCount = netdata[6];
            log("gamestate="+gamestate+"|"+lordChairIdx+"|"+currOperateChairIdx+"|"+currCallLordNum+"|"+bombCount);
            var playerdatas = netdata[7];

            this.initGameData();

            this.mGameUI.setInviteBtnDisable();

            this.setPlayerOnTable_reconn(playerdatas);

            this.mIsInGame = true;
            this.mIsGameOver = false;

            this.mShowWait.setVisible(false);
            if(sGameData.mGameMode == GAMEMODE_MATCH||sGameData.mGameMode == GAMEMODE_MATCH_VIDEO) {
                this.mMatchWaitShow.setVisible(false);
                this.mMatchInfoTips.setVisible(false);
                this.VisibleMatchStartButton(false);
                this.VisibleMatchRankButton(true);
                this.mMatchProgressShow.setVisible(true)
            }

            this.mActiveSeatId = this.getPlayerSeatByChairId(currOperateChairIdx);
            this.mCallNum = 0
            if(gamestate == 2||gamestate == 5){
                var dizhuseat=this.getPlayerSeatByChairId(lordChairIdx);
                this.setDizhu(dizhuseat,true);
                if(sGameData.mGameMode == GAMEMODE_MATCH||sGameData.mGameMode == GAMEMODE_MATCH_VIDEO){
                    this.checkMatchBasePoint();
                    this.mBasePoint = sGameData.mCurrMatch.basicGScore*currCallLordNum;
                }else {
                    this.mBasePoint = sGameData.mCurrRoom.basicPoint * currCallLordNum;
                }
                this.mBeishu = bombCount;
                this.showBeiShuInView(this.mBeishu,this.mBasePoint)
                //this.mGameUI.setBeishu(this.mBeishu,this.mBasePoint);
                this.mDizhuChairId = lordChairIdx;
            }
            var cards_outall = [];
            for(var i=0;i<playerdatas.length;i++){
                var data = playerdatas[i];
                var player = data[0];
                var seat = this.getPlayerSeatByChairId(player.chairId);
                log("player="+player.id+"|"+player.userName+"|"+player.chairId+"|"+seat);
                if(gamestate == 1){
                    var callLordNum = data[1];
                    var handcards = data[2];
                    log("callLordNum="+callLordNum);
                    log("handcards="+handcards);
                    if(callLordNum > 0){
                        this.mShowOP.showOPImage(seat,callLordNum);
                    }
                    if(callLordNum > this.mCallNum){
                        this.mCallNum = callLordNum;
                    }
                    if(seat == 0){
                        this.mPlayerCardValueArray = handcards;
                        this.showPlayerHandCard_reconn();
                    }else{
                        this.setSeatCardcount(seat,17);
                    }
                    this.mCardNumArray[seat] = 17;
                }else if(gamestate == 5){
                    var jiabei = player.jiabei;
                    var handcardslen = data[1];
                    var handcards = data[2];
                    this.mCardNumArray[seat] = handcardslen;
                    if(seat == 0){
                        this.mPlayerCardValueArray = handcards;
                        this.showPlayerHandCard_reconn();
                    }else{
                        this.setSeatCardcount(seat,handcardslen);
                    }
                }else {
                    var handcardslen = data[1];
                    var handcards = data[2];
                    var outcards = data[3];
                    log("handcardslen="+handcardslen);
                    log("handcards="+handcards);
                    log("outcards="+outcards);
                    this.mCardNumArray[seat] = handcardslen;
                    if(seat == 0){
                        this.mPlayerCardValueArray = handcards;
                        this.showPlayerHandCard_reconn();
                    }else{
                        this.setSeatCardcount(seat,handcardslen);
                    }
                    cards_outall[player.chairId] = outcards;
                }
            }
            this.showOutCard_reconn(cards_outall,this.mActiveSeatId);
            if(this.mActiveSeatId==0)
            {
                if(gamestate == 1){
                    this.VisibleJiaoButton(true);
                }else if(gamestate== 2)
                {
                    this.VisiblePlayButton(true);
                }else if(gamestate== 5)
                {
                    this.VisibleJiabeiButton(true);
                }else{
                    log("error state ");
                }
            }
            this.sendTuoguanCancelCmd();
            if(this.mActiveSeatId!=-1){
                this.showClock(this.mActiveSeatId,true);
            }

        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },
    noticeDDZNoticePlayerDataChange:function(netdata){
        log("noticeDDZNoticePlayerDataChange")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            var type = netdata[2];
            var player = netdata[3];
            log("type="+type+"="+player.id)
            var p = this.getPlayer(player.id);
            if(type == SCORE_INFO_CHANGE){
                if(p){
                    p.xp = player.xp;
                    p.level = player.level;
                    p.softCash = player.softCash;
                    p.hardCash = player.hardCash;
                    if(sGameData.mGameMode !=GAMEMODE_MATCH_VIDEO){
                        if(player.id == sGameData.mUser.id){
                            sGameData.mUser.softCash = p.softCash;
                            sGameData.mUser.hardCash = p.hardCash;
                            sGameData.mUser.xp = p.xp;
                            sGameData.mUser.level = p.level;
                            log("mycash=="+p.softCash)
                        }
                    }
                    if(p.chairId!=-1){
                        this.updateShowPlayerCash();
                    }
                }
            }
        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg,1);
        }
    },
    //踢出玩家
    noticeDDZKickPlayer:function(netdata){
        log("noticeDDZKickPlayer");
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            var code = netdata[2];
            var msg = netdata[3];

            showNeedPayNotice(1,msg);
            //showNotice(sResWord.w_notice,msg,5,0);
            this.VisibleContinueButton(false);

        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },
    noticeDDZKickDisableUser:function(netdata){
        log("noticeDDZKickDisableUser");
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            var code = netdata[2];
            var msg = netdata[3];

            showNotice(sResWord.w_notice,msg,14,0);
            this.VisibleContinueButton(false);

        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },
    //聊天
    noticeDDZChat:function(netdata){
        log("noticeDDZChat")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){

            var chair = netdata[2];
            var type = netdata[3];
            var chatId = netdata[4];
            var msg = netdata[5];
            var tochair = netdata[6];
            var seat = this.getPlayerSeatByChairId(chair)
            if(type == 1) {
                var sex = this.mSexArray[chair];
                var msg = this.mTalkMsg[sex][chatId];
                this.playTalkSound(sex,chatId);
                this.mShowChat.showMsg(seat,msg)
            }else if(type == 2){
                log("seat==" + seat + "|" + toseat)
                var toseat = this.getPlayerSeatByChairId(tochair)
                var size = cc.director.getWinSize();
                var pos0 = cc.p(70,289)
                var pos1 = cc.p(size.width - 70,size.height- 114)
                var pos2 = cc.p(70,size.height - 114)
                var pos =  [pos0,pos1,pos2];
                showInterative(seat,toseat,chatId,pos,this);
            }else if(type == 5) {
                this.playFaceSound(chatId);
                this.mShowFace.showFaceImage(seat, chatId)
                log("chair==" + chair + "|" +chatId)

            }else if(type == 3){
                this.mShowChat.showMsg(seat, msg);
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
    noticeDDZPlayerInfo: function (netdata) {
        log("noticeDDZPlayerInfo")
        var flag = netdata[1];
        if (flag == NET_SUCCESS) {
            var player = netdata[2];
            var theplayer = this.getPlayerByIdx(player.id);
            log("ppp="+player.id);
            if(theplayer){
                theplayer.xp = player.xp
                theplayer.winCount = player.winCount
                theplayer.loseCount = player.loseCount
                if(player.id == sGameData.mUser.id){
                    theplayer.softCash = sGameData.mUser.softCash
                }
                theplayer.bFriend = player.bFriend
                updateGamePlayerInfo(theplayer);
            }
        }else {
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },



    noticeDDZUseTools: function (netdata) {
        log("noticeDDZUseTools")
        var flag = netdata[1];
        if (flag == NET_SUCCESS) {
            var endtime = netdata[2];
            sGameData.mUser.ddzNoteCardEndTime = endtime;
            sGameData.mDDZLayer.showCardNote();

        }else {
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },
    noticeDDZTuoguan: function (netdata) {
        log("noticeDDZTuoguan")
        var flag = netdata[1];
        if (flag == NET_SUCCESS) {
            var chairId =  netdata[2]
            if(chairId == this.mMyChairId){
                this.mIsTuoguaning = true;
                this.setTuoguanState();
            }

        }else {
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },
    noticeDDZTuoguanCancel: function (netdata) {
        log("noticeDDZTuoguanCancel")
        var flag = netdata[1];
        if (flag == NET_SUCCESS) {
            var chairId =  netdata[2]
            if(chairId == this.mMyChairId){
                this.mIsTuoguaning = false;
                this.setTuoguanState();
            }
        }else {
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },

    //点击时隐藏某些界面
    hiddenUIWithClick:function(pos){


        if (!this.checkClickView(this.mShowSetting,pos)) {
            this.mShowSetting.setVisible(false);
        }

        if (this.mMissionView) {
            if (!this.checkClickView(this.mMissionView, pos)) {
                this.showMission(false);
            }
        }

        this.hiddenUIWithClick_chat(this.mShowTalk,pos,4);

        this.hiddenUIWithClick_chat(this.mChatFaceView,pos,4);

        this.hiddenUIWithClick_chat(this.mChatInputView,pos,4);
    },
    //点击开始
    onTouchBegan_g:function(pos){
        //log("onTouchBegan--")
        var cpos = this.getCardPos(0,0,1);
        var cardy = cpos.y;

        sGameData.mClickState = 1;
        this.mTouchSeat = -1;

        if(!checkButtonEnable()){
            return;
        }
        if(pos.y > cardy && pos.y < cardy + DDZ_CARD_HEIGHT*sGameData.mDDZ_mycard_scale+20){
            this.mMoveStartPos = pos;
            this.mIsMouseDownMove = true;
            this.mIsMoveStart = true;
            this.moveChooseCards(pos);
        }else{
            var touchSeat = this.selectSeatForTouch(pos);
            log("touchSeat==" + touchSeat);
            if (touchSeat != -1) {
                this.mTouchSeat = touchSeat
            }
            if(pos.y > 290){
                this.cleanChooseCards();
            }
        }
        this.hiddenUIWithClick(pos);
    },
    //点击移动
    onTouchMoved_g:function(pos){
        if(this.mIsMouseDownMove){
            this.moveChooseCards(pos);
        }
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
                this.checkFace(pos)
            }
            if (this.mIsMouseDownMove) {
                this.moveChooseCards(pos);
                this.cleanCardsColor();
            }

            if(this.mShowScore.visible){
                this.mShowScore.checkClickItem(pos)
            }
        }
        this.mIsMouseDownMove = false;
    },
    onTouchCancelled_g:function(pos){
        //log("onTouchCancelled--")
    },

    //处理点击 触摸

    //清除牌的颜色，选牌时变灰
    cleanCardsColor:function(){
        var len = this.mPlayerHandCardShowArray[0].length;
        for(var i =len -1;i>-1;i--){
            var aCard = this.mPlayerHandCardShowArray[0][i];
            aCard.setColorType(0);
        }
    },
    //滑动时选牌
    moveChooseCards:function(pos){
        var self = this;
        //log("moveChooseCards=="+self.mIsInGame+self.mIsFapaiing)
        if(!self.mIsInGame) return;
        if(self.mIsFapaiing) return;
        //log("moveChooseCards xy--"+pos.x+"-"+pos.y+" |||| ---||||"+this.mMoveStartPos.x+"-"+this.mMoveStartPos.y);
        var isLeft = true; //向左活动
        if(pos.x > this.mMoveStartPos.x){  //向右活动
            isLeft = false;
        }
        var space = this.getCardSpace(this.mPlayerHandCardShowArray[0].length);
        var cpos = this.getCardPos(0,0,1);
        var cardy = cpos.y ;
        //log("cardy=="+cardy);
        if(this.mMoveStartPos.y > cardy && this.mMoveStartPos.y < cardy + DDZ_CARD_HEIGHT*sGameData.mDDZ_mycard_scale+20){
            if(isLeft){
                //log("has card isLeft="+isLeft)
                var len = this.mPlayerHandCardShowArray[0].length;
                for(var i =len -1;i>-1;i--){
                    var aCard = this.mPlayerHandCardShowArray[0][i];
                    var choose = false;
                    if(i ==len -1&&aCard.x + DDZ_CARD_WIDTH*sGameData.mDDZ_mycard_scale > pos.x && aCard.x  < this.mMoveStartPos.x ){//
                        choose = true;
                    }else if(aCard.x + space > pos.x && aCard.x  < this.mMoveStartPos.x ){//
                        choose = true;
                    }
                    if(choose){
                        if(this.mIsMoveStart){
                            this.mIsMoveStart = false;
                            if(aCard.mChoosed){
                                this.mIsDownChoose = false;
                            }else{
                                this.mIsDownChoose = true;
                            }
                        }
                        if(this.mIsDownChoose){
                            aCard.choose();
                            aCard.setColorType(1)
                        }else{
                            aCard.unchoose();
                            aCard.setColorType(1)
                        }
                    }
                }
            }else{
                var len = this.mPlayerHandCardShowArray[0].length;
                for(var i = len-1;i>-1;i--){
                    var aCard = this.mPlayerHandCardShowArray[0][i];
                    var choose = false;
                    if(i ==len -1&&aCard.x + DDZ_CARD_WIDTH*sGameData.mDDZ_mycard_scale > this.mMoveStartPos.x && aCard.x  < pos.x ){//
                        choose = true;
                    }else if(aCard.x + space > this.mMoveStartPos.x && aCard.x < pos.x ){
                        choose = true;
                    }
                    if(choose){
                        if(this.mIsMoveStart){
                            this.mIsMoveStart = false;
                            if(aCard.mChoosed){
                                this.mIsDownChoose = false;
                            }else{
                                this.mIsDownChoose = true;
                            }
                        }
                        if(this.mIsDownChoose){
                            aCard.choose();
                            aCard.setColorType(1)
                        }else{
                            aCard.unchoose();
                            aCard.setColorType(1)
                        }
                    }
                }
            }
        }
    },
    //检测选中哪个表情
    checkFace:function(pos){
        var index = -1;
        if(this.mChatFaceView&&this.mChatFaceView.visible){
            index = this.mChatFaceView.checkClickFace(pos);
        }
    },
    //点击某位置
    clickSeat: function (seat) {
        if (seat == -1) return;

        var chairIdx = this.getPlayerChairIdBySeat(seat);
        log("clickSeat==" + seat + "=" + chairIdx + "|" + this.mChairSitDown[chairIdx]);

        if (this.mChairSitDown[chairIdx] == SITDOWN_NO) {

        } else {//查看玩家信息
            log("see player");
            //if(sGameData.mGameMode == GAMEMODE_NORMAL) {
            //    var player = this.getPlayerByChairId(chairIdx);
            //    if (player.id == sGameData.mUser.id) {
            //        player.softCash = sGameData.mUser.softCash
            //    }
            //    showGamePlayerInfo(true, player, 4, 0);
            //    sGameNetData.mDDZNet.sendDDZPlayerInfo(player.id);
            //}else if(sGameData.mGameMode == GAMEMODE_MATCH) {
            //    var player = this.getPlayerByChairId(chairIdx);
            //    if (player.id == sGameData.mUser.id) {
            //        player.softCash = sGameData.mUser.softCash
            //    }
            //    if(this.mIsInGame){
            //        showGamePlayerInfo(true, player, 7, 0);
            //    }
            //}
        }
    },
    //每个位置的范围
    seatRect: function (seat) {
        var size = cc.director.getWinSize();
        var pos0 = cc.p(70,289)
        var pos1 = cc.p(size.width - 70,size.height- 114)
        var pos2 = cc.p(70,size.height - 114)
        var pos = [pos0, pos1, pos2];
        var size_player_shadow = cc.size(120, 168);
        var x = pos[seat].x;
        var y = pos[seat].y;
        var width = size_player_shadow.width;
        var height = size_player_shadow.height;
        return cc.rect(x-width/2 , y-height/2 , width, height);
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

    //检查点击到那张牌
    checkClickCard:function(pos){
        log("checkClickCard=="+pos.x+"="+pos.y);
        var len = this.mPlayerHandCardShowArray[0].length;
        for(var i = len-1;i>-1;i--){
            var acard = this.mPlayerHandCardShowArray[0][i];
            if(acard.checkClick(pos)){
                log("click = "+acard.mIndex+"="+acard.mCardValue);
                return acard;
            }
        }
        return null;
    },
    showGameTip:function(msg){
//        if(this.mTipLabel!=null){
//            this.mTipMsg += msg+"\n";
//            log("ttmsg=="+this.mTipMsg);
//            this.mTipLabel.setString(this.mTipMsg+this.mGameNo);
//        }
    },
    sendJiabeiCmd:function(type){
        if(sGameData.mGameMode == GAMEMODE_NORMAL){
            sGameNetData.mDDZNet.sendDDZJiabei(type);
        }else{

        }
    },
    sendCallCardCmd:function(type){
        if(sGameData.mGameMode == GAMEMODE_NORMAL){
            sGameNetData.mDDZNet.sendDDZCallCard(type);
        }else{
            sGameNetData.mDDZMatchNet.sendDDZMatchCallCard(type);
        }
    },
    sendSeeCardCmd:function() {
        if (sGameData.mGameMode == GAMEMODE_NORMAL) {
            sGameNetData.mDDZNet.sendDDZSeeCard();
        } else {
            sGameNetData.mDDZMatchNet.sendDDZMatchSeeCard();
        }
    },
    sendDaoLaCmd:function(type) {
        if(sGameData.mGameMode == GAMEMODE_NORMAL){
            sGameNetData.mDDZNet.sendDDZDaoLa(type);
        }else{
            sGameNetData.mDDZMatchNet.sendDDZMatchDaoLa(type);
        }
    },
    sendOutCardCmd:function(type,cards){
        if(sGameData.mGameMode == GAMEMODE_NORMAL) {
            sGameNetData.mDDZNet.sendDDZOutCard(type,cards);
        }else{
            sGameNetData.mDDZMatchNet.sendDDZMatchOutCard(type,cards);
        }
    },
    sendChatCmd:function(type,chatId,msg,toChairId){
        if(sGameData.mGameMode == GAMEMODE_NORMAL) {
            sGameNetData.mDDZNet.sendDDZChat(type,chatId,msg,toChairId);
        }else{
            sGameNetData.mDDZMatchNet.sendDDZMatchChat(type,chatId,msg,toChairId);
        }
    },
    sendTuoguanCmd:function(){
        if(sGameData.mGameMode == GAMEMODE_NORMAL){
            sGameNetData.mDDZNet.sendDDZTuoguan();
        }else{
            sGameNetData.mDDZMatchNet.sendDDZMatchTuoguan();
        }
    },
    sendTuoguanCancelCmd:function(){
        if(sGameData.mGameMode == GAMEMODE_NORMAL){
            sGameNetData.mDDZNet.sendDDZTuoguanCancel();
        }else{
            sGameNetData.mDDZMatchNet.sendDDZMatchTuoguanCancel();
        }
    },

    //播放背景音乐
    playBGMusic:function(){
        var musics = [res.bg_music_ddz_mp3,res.bg_music_ddz_mp3];//,res.bg_music_3_mp3
        var rand = randomInt(2);
        var name = musics[rand];
        SoundManager.playBGMusic(name);
    },
    //播放说话声音
    playTalkSound:function(sex,index){
        var sound = this.mTalkSound[sex][index];
        SoundManager.playSound(sound,false,SOUND_TALK);
    },
    playFaceSound:function(index){
        var sound = this.mFaceSound[index];
        log("playFaceSound=="+sound);
        SoundManager.playSound(sound,false,SOUND_TALK);
    },
    playSingleCardSound:function(cardtype,seat,card){
        var chairId= this.getPlayerChairIdBySeat(seat)
        var sex = this.mSexArray[chairId];
        var name = "";
        var sounds0 = ["","",res.ddz_woman_single_2_mp3,res.ddz_woman_single_3_mp3,res.ddz_woman_single_4_mp3,res.ddz_woman_single_5_mp3,
            res.ddz_woman_single_6_mp3,res.ddz_woman_single_7_mp3,res.ddz_woman_single_8_mp3,res.ddz_woman_single_9_mp3,res.ddz_woman_single_10_mp3,
            res.ddz_woman_single_j_mp3,res.ddz_woman_single_q_mp3,res.ddz_woman_single_k_mp3,res.ddz_woman_single_a_mp3,res.ddz_woman_single_2_mp3,
            res.ddz_woman_single_joker1_mp3,res.ddz_woman_single_joker2_mp3]
        var sounds1 = ["","",res.ddz_man_single_2_mp3,res.ddz_man_single_3_mp3,res.ddz_man_single_4_mp3,res.ddz_man_single_5_mp3,
            res.ddz_man_single_6_mp3,res.ddz_man_single_7_mp3,res.ddz_man_single_8_mp3,res.ddz_man_single_9_mp3,res.ddz_man_single_10_mp3,
            res.ddz_man_single_j_mp3,res.ddz_man_single_q_mp3,res.ddz_man_single_k_mp3,res.ddz_man_single_a_mp3,res.ddz_man_single_2_mp3,
            res.ddz_man_single_joker1_mp3,res.ddz_man_single_joker2_mp3]
        var sounds = [sounds0,sounds1];

        var cardpoint = this.mDDZLogic.getNumWithoutColor(card);
        name = sounds[sex][cardpoint]
        log("playSingleCardSound=="+cardtype+"|"+seat+"|"+card+"|"+cardpoint+"|"+name)
        if(name&&name.length > 0){
            SoundManager.playSound(name);
        }
    },
    playDoubleCardSound:function(cardtype,seat,card){
        var chairId= this.getPlayerChairIdBySeat(seat)
        var sex = this.mSexArray[chairId];
        var name = "";
        var sounds0 = ["","",res.ddz_woman_double_2_mp3,res.ddz_woman_double_3_mp3,res.ddz_woman_double_4_mp3,res.ddz_woman_double_5_mp3,
            res.ddz_woman_double_6_mp3,res.ddz_woman_double_7_mp3,res.ddz_woman_double_8_mp3,res.ddz_woman_double_9_mp3,res.ddz_woman_double_10_mp3,
            res.ddz_woman_double_j_mp3,res.ddz_woman_double_q_mp3,res.ddz_woman_double_k_mp3,res.ddz_woman_double_a_mp3,res.ddz_woman_double_2_mp3]
        var sounds1 = ["","",res.ddz_man_double_2_mp3,res.ddz_man_double_3_mp3,res.ddz_man_double_4_mp3,res.ddz_man_double_5_mp3,
            res.ddz_man_double_6_mp3,res.ddz_man_double_7_mp3,res.ddz_man_double_8_mp3,res.ddz_man_double_9_mp3,res.ddz_man_double_10_mp3,
            res.ddz_man_double_j_mp3,res.ddz_man_double_q_mp3,res.ddz_man_double_k_mp3,res.ddz_man_double_a_mp3,res.ddz_man_double_2_mp3]
        var sounds = [sounds0,sounds1];

        var cardpoint = this.mDDZLogic.getNumWithoutColor(card);
        name = sounds[sex][cardpoint]
        log("playDoubleCardSound=="+cardtype+"|"+seat+"|"+card+"|"+cardpoint+"|"+name)
        if(name&&name.length > 0){
            SoundManager.playSound(name);
        }
    },
    playCardSound:function(cardtype,seat,card){
        var chairId= this.getPlayerChairIdBySeat(seat)
        var sex = this.mSexArray[chairId];
        var name = "";
        switch(cardtype)
        {
            case this.mDDZLogic.SINGLE_CARD:
                this.playSingleCardSound(cardtype,seat,card)
                break;
            case this.mDDZLogic.DOUBLE_CARD:
                this.playDoubleCardSound(cardtype,seat,card)
                break;
            case this.mDDZLogic.THREE_CARD:
                if(sex == 0){
                    name = res.ddz_woman_three_card_mp3;
                }else{
                    name = res.ddz_man_three_card_mp3;
                }
                break;
            case this.mDDZLogic.THREE_WITH_ONE_CARD: //  3带1 如777＋5    888+3
                if(sex == 0){
                    name = res.ddz_woman_three_one_card_mp3;
                }else{
                    name = res.ddz_man_three_one_card_mp3;
                }
                break;
            case this.mDDZLogic.THREE_WITH_TWO_CARD://  3带2 如444+66 777+99
                if(sex == 0){
                    name = res.ddz_woman_three_two_card_mp3;
                }else{
                    name = res.ddz_man_three_two_card_mp3;
                }
                break;
            case this.mDDZLogic.FOUR_CARD://炸弹4张牌
                if(sex == 0){
                    name = res.ddz_woman_four_card;
                }else{
                    name = res.ddz_man_four_card;
                }
                break;
            case this.mDDZLogic.FOUR_WITH_TWO_CARD: //四带二 炸弹＋两手牌
                if(sex == 0){
                    name = res.ddz_woman_four_two_card_mp3;
                }else{
                    name = res.ddz_man_four_two_card_mp3;
                }
                break;
            case this.mDDZLogic.LINK_CARD://单顺 5张(含)以上连续单牌。如8910jqk
                if(sex == 0){
                    name = res.ddz_woman_link_card_mp3;
                }else{
                    name = res.ddz_man_link_card_mp3;
                }
                break;
            case this.mDDZLogic.DOUBLE_LINK_CARD://双 顺 3对(含)以上连续对牌。如334455
                if(sex == 0){
                    name = res.ddz_woman_double_link_card_mp3;
                }else{
                    name = res.ddz_man_double_link_card_mp3;
                }
                break;
            case this.mDDZLogic.THREE_LINK_CARD:// 三顺 2个(含)以上连续三条。如jjjqqq
                if(sex == 0){
                    name = res.ddz_woman_three_link_card_mp3;
                }else{
                    name = res.ddz_man_three_link_card_mp3;
                }
                break;
            case this.mDDZLogic.THREE_WITH_LINK_TWO_CARD://飞机带翅膀 三顺＋同数量的对牌 如888999 4466
                if(sex == 0){
                    name = res.ddz_woman_three_link_two_card_mp3;
                }else{
                    name = res.ddz_man_three_link_two_card_mp3;
                }
                break;
            case this.mDDZLogic.THREE_WITH_LINK_CARD:////飞机带翅膀 三顺＋同数量的单牌jjjqqqkkk 678
                if(sex == 0){
                    name = res.ddz_woman_three_link_two_card_mp3;
                }else{
                    name = res.ddz_man_three_link_two_card_mp3;
                }
                break;
            case this.mDDZLogic.SUPER_BOOM_CARD: //火箭
                name = res.ddz_woman_supper_boom_card_mp3
                if(sex == 0){
                    name = res.ddz_woman_supper_boom_card_mp3;
                }else{
                    name = res.ddz_man_supper_boom_card_mp3;
                }
                break;
        }
        log("playcardsound=="+cardtype+"|"+name);
        if(name.length > 0){
            SoundManager.playSound(name);
        }
    },
    //type 1：1分 2：2分 3：3分 4:不叫 5 不出 6 管上  11 看牌 12闷抓 13叫牌 14不叫 15倒 16不倒 17拉 18不拉
    // 21 加倍 22不加倍
    playOPSound:function(seat,type){
        var chairId= this.getPlayerChairIdBySeat(seat)
        var sex = this.mSexArray[chairId];
        log("playOPSound=="+seat+"|"+type +"|"+sex)
        if(type == 1){
            if(sex == 0){
                SoundManager.playSound(res.ddz_woman_landlord_1_mp3)
            }else{
                SoundManager.playSound(res.ddz_man_landlord_1_mp3)
            }
        }else if(type == 2){
            if(sex == 0){
                SoundManager.playSound(res.ddz_woman_landlord_2_mp3)
            }else{
                SoundManager.playSound(res.ddz_man_landlord_2_mp3)
            }
        }else if(type == 3){
            if(sex == 0){
                SoundManager.playSound(res.ddz_woman_landlord_3_mp3)
            }else{
                SoundManager.playSound(res.ddz_man_landlord_3_mp3)
            }
        }else if(type == 4){
            if(sex == 0){
                SoundManager.playSound(res.ddz_woman_landlord_no_mp3)
            }else{
                SoundManager.playSound(res.ddz_man_landlord_no_mp3)
            }
        }else if(type == 5){
            if(sex == 0){
                SoundManager.playSound(res.ddz_woman_pass_mp3)
            }else{
                SoundManager.playSound(res.ddz_man_pass_mp3)
            }
        }else if(type == 6){
            var rand = randomInt(2);
            if(sex == 0){
                if(rand == 1){
                    SoundManager.playSound(res.ddz_woman_follow_1_mp3)
                }else{
                    SoundManager.playSound(res.ddz_woman_follow_2_mp3)
                }
            }else{
                if(rand == 1){
                    SoundManager.playSound(res.ddz_man_follow_1_mp3)
                }else{
                    SoundManager.playSound(res.ddz_man_follow_2_mp3)
                }
            }
        }else if(type == 21){
            if(sex == 0){
                SoundManager.playSound(res.ddz_woman_jiabei_mp3)
            }else{
                SoundManager.playSound(res.ddz_man_jiabei_mp3)
            }
        }else if(type == 22){
            if(sex == 0){
                SoundManager.playSound(res.ddz_woman_bujiabei_mp3)
            }else{
                SoundManager.playSound(res.ddz_man_bujiabei_mp3)
            }
        }

        //else if(type == 11){ //11 看牌
        //    var sounds = [res.ddz_woman_kanpai_mp3,res.ddz_man_kanpai_mp3]
        //    SoundManager.playSound(sounds[sex])
        //}else if(type == 12){ //12闷抓
        //    var sounds = [res.ddz_woman_menzhua_mp3,res.ddz_man_menzhua_mp3]
        //    SoundManager.playSound(sounds[sex])
        //}else if(type == 13){ // 13叫牌
        //    var sounds = [res.ddz_woman_zhua_mp3,res.ddz_man_zhua_mp3]
        //    SoundManager.playSound(sounds[sex])
        //}else if(type == 14){ //  14不叫
        //    var sounds = [res.ddz_woman_buzhua_mp3,res.ddz_man_buzhua_mp3]
        //    SoundManager.playSound(sounds[sex])
        //}else if(type == 15){ //  15倒
        //    var sounds = [res.ddz_woman_dao_mp3,res.ddz_man_dao_mp3]
        //    SoundManager.playSound(sounds[sex])
        //}else if(type == 16){ //   16不倒
        //    var sounds = [res.ddz_woman_budao_mp3,res.ddz_man_budao_mp3]
        //    SoundManager.playSound(sounds[sex])
        //}else if(type == 17){ //   17拉
        //    var sounds = [res.ddz_woman_la_mp3,res.ddz_man_la_mp3]
        //    SoundManager.playSound(sounds[sex])
        //}else if(type == 18){ //    18不拉
        //    var sounds = [res.ddz_woman_bula_mp3,res.ddz_man_bula_mp3]
        //    SoundManager.playSound(sounds[sex])
        //}
    }

});

DDZLayer.create = function () {
    var sg = new DDZLayer();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};
/**
 * Created by Administrator on 14-4-8.
 * 全局 游戏数据
 * 简体改繁体 mAppVersionFor 设为 APPVERSION_TW 
 */
var sGameData = {
    //****  setting 的 值 设定之后不会再改变   ****
    //*********** setting level 1 :net ***********
    mIsTestNoNet:false,// 测试 无网络
    mIsTestWxPay:false,//
    mIsTestAliPay:false,//alipay  测试 ()
    mIsTestUseWebGuest:true,
    mIsTestUser:false,//是否是测试用户 aaaa bbbb cccc
    //*********** setting level 2 :version ***********
    mAppVersionFor:APPVERSION_ZC,//哪个版本 APPVERSION_ZC  TW  HK
    mCocosVerCode:30000, //cocos版本号 30000:v3.0  30100:v3.1 （可自动获取）
    mAgent:AGENT_DUOJIN,//代理商
    mAppIsSubmitToAppStore:false,//是否是提交到苹果的审核版本
    mAppIsTestPayH5:false,
    mPromoter:"duojin",//用户渠道
    //*********** setting level 3 :show ***********
    mIsUseTrueNick:true,//使用真实昵称
    mUseAddressNick:true,//
    mUseSysLanguage:false,//使用系统 语言  true：根据系统设定语言   false：使用指定的语言
    mGameLanguage:LANGUAGE_ZH_CN,//制定语言  mUseSysLanguage 为false时有效LANGUAGE_ZH_CN
    mCppResVersion:0,//

    //--tw--
    mAppCanUseFacebook:false,//能否使用facebook *-
    mAppUsesdklogin:false, //使用sdk登录 *- cpp 设置


    //--需要设置（build有控制）--
    mUseSqliteByJS:true,//是否使用js sqlite
    mAppCanCheckConfigVersion:true,//app是否检查配置版本
    mAppCanShowShare:false, //分享 未实现 *-
    mAppCanShowScoreWall:false,//积分墙 *-
    mAppCanShowTaskShare:false,//分享 任务
    //--需要设置--
    mAppCanShowOLPlayer:false,//是否显示在线玩家
    mAppCanShowMatch:false,//能否显示 比赛 *-
    mAppCanOpenMatch:false,//开放比赛 *-
    mAppCanShowWorldMsg:false,//世界消息
    mAppUseHallScene:false,//是否使用hall场景()---已弃用，单机统一用djhall，qp统一main（dj的hall资源和game资源打包到一起）
    mAppRoomShowInfoBtn:true,//房间是否显示帮助
    mAppCanLocalPushMsg:false,//能否本地推送消息
    mAppCanChat:true,//是否聊天（直接输入）
    //--不需要设置--
    mAppCanShowSpecialUI:true,//app能否显示 (兑奖等) *-
    mAppCanShowDaily:false,//显示每日必做 *-(资源已删除)

    mAppCanShowSysGonggao:true,//能否显示系统公告 *-

    mAppUseDownGameRes:true,//使用下载游戏资源方式(web false)
    mAppUseUUIDAutoLogin:true,//使用自动登录

    //mAppTaoNiuVersion:1,//套牛版本(1元宝 2金币)
    mAppTaoNiuType:0,//套牛版本(1金币 2元宝 0金币,元宝)
    mAppCanShowDJAutoBtn:false,//单机自动按钮
    mAppShowTurnTableInMain:true,//在main场景中显示转盘
    mAppCanRandomChangeTable:true,//随机坐能换桌

    mAppLoadUseBG:true,//加载时使用背景

    //add by tony 使用佳都支付API，优先使用佳都，其次再使用h5
    mAppUseJiaDuoPay:false,

    mAppUsejubaoSdkPay:false,

    mAppUseH5Pay:true,//使用h5支付

    mAppCheckBindPhone:true,//检查绑定手机(true  tw:false)
    mAppCanShowBannerAD:false,//普通广告 (true)
    //*********** setting level 4 :game setting ***********
    mUseRandomSit:true,//全部使用随机坐 不使用这个(根据房间类型或设置确定)
    mNetSendDataAfterEnterGame:true,//进入游戏后发指令 －－(断线重连，房间随机坐＝，重新坐下，选座,桌子随机坐)

    mUseDDZRule:DDZ_RULE_NORMAL,//ddz规则: 标准规则(1,2,3分) ，sc规则（抓、闷抓、倒、拉）
    mDDZHasJiabei:true,//标准规则 农民加倍

    mZJHCanUseJiCard:false,//zjh鸡牌

    mDDZCanUseTool:true,//ddz是否使用道具
    mDNCanUseTool:true,//dn是否使用道具

    mShowChangeTableBtnTime:20,//继续多少s后，检查是否需要显示换桌

    mHelpUrl:"http://aaa.com/help.do",// 用完整的地址(具体地址在CommonMethod里设置了)

    //mJiaDuZhiFuUrl:"http://tanxintwhpay.picp.io:20361/api/service", //佳都支付url地址

    mJiaDuZhiFuUrl:"http://api.pcidata.cn:30033/api/service", //佳都支付商户url地址

    mJiaDuZhiFuZhifuBaoAPIName:"api_union_000017",


    //显示的游戏 （match 不 列入; ggl 已屏蔽）GAME_TYPE_ZJH
    mShowGames:[GAME_TYPE_DN,GAME_TYPE_ZJH,GAME_TYPE_DDZ],

    //游戏排序 没在列表的排后面
    mGameSort:[GAME_TYPE_DDZ,GAME_TYPE_ZJH,GAME_TYPE_DN],
    //开放的游戏
    mOpenGames:[GAME_TYPE_DDZ,GAME_TYPE_DN,GAME_TYPE_ZJH],//

    //单机游戏 (显示在单机区域或棋牌区)（单机游戏 使用单独的大厅，棋牌游戏使用统一大厅）
    mDJGames:[],//
    //显示在单机区域
    mGamesShowInDJArea:[],//

    mShowBigIconInMain:true,//大厅的游戏图标是否放大
    mQPShowType:0,//棋牌区域显示几个游戏 0:3;1:2(显示几个游戏)


    /**
     * 游戏配置数据
     * ［0:gameId,1:场景对应id，2:类型，3:open方法,4:load方法，
     * 5:goToMainFromGame方法，6:continueActionAfterReconnectNet方法,
     * 7:指令类型，8:初始化游戏网络方法,9:接受指令方法， 10:处理指令方法]
     * 类型 1先进棋牌大厅（棋牌） 2先进单机大厅（动物快跑） 3直接进游戏（套牛） 4比赛
     * -----值不在这里设置（setVersionInfo里设值）
     */
    mGameConfigDatas:[],


    mPay_Allow_ios:[PAY_APPLE,PAY_ALIPAY,PAY_WXPAY],//允许的支付方式
    mPay_Allow_android:[PAY_ALIPAY,PAY_WXPAY],
    mPay_Allow_win:[],
    mPay_Allow_web:[PAY_ALIPAY,PAY_WXPAY],


    mDDZ_mycard_scale:0.7,//斗地主 我的牌 放大 多少
    mDDZ_othercard_scale:0.5,//斗地主 别的牌 放大 多少
    mDDZ_topdizhucard_scale:0.25,//斗地主 3张地主牌 放大 多少
    mOPBtnSize:cc.p(120,50),//默认的游戏操作按钮大小

    mCashUseDot:true,//用小数点

    mReqPropsImgVer:1,// 要求道具图片版本 (要更新道具图片 ，数量加1)
    mReqPrizeImgVer:1,// 要求奖品图片版本

    mPicPath_prize:"goods/",//网络上取图片路径
    mPicPath_props:"props/",//
    mPicPath_avatar:"avatar/",//未使用

    mPicSavePath_prize:"goods_",//本地存储路径 (要更新道具图片 （变这个值，上面删除有问题）
    mPicSavePath_props:"props_",//
    mPicSavePath_avatar:"",//未使用

    mChatDurTime:20,//聊天间隔时间   －－－从config里取
    mInterativeDurTime:20,//交互间隔时间 30
    mDDZCallLordTime:25,//ddz叫地主时间
    mDDZOutCardTime:15,//ddz出牌时间  25
    mDZPKReadyTime:20,//dzpk准备时间
    mDZPKOpTime:20,//dzpk操作时间 20
    mZJHReadyTime:20,//zjh准备时间
    mZJHOpTime:20,//zjh操作时间  20
    mDNReadyTime:20,//dn准备时间
    mDNOpTime:20,//dn操作时间  20
    mMJOpTime:10,//mj操作时间  10

    //通常版本
    mAppUseLocalAccount:false,//是否使用本地账号登录
    mAppMainBGScale:true,//主背景拉伸
    mTipColor:cc.color(255,255,255),//颜色//
    mUseIosLogo:true,//
    //
    //*********** setting level end ***********


    //*********** 全局 变量  ***********

    mIsShowWebViewing:false,//是否正在显示 webview

    mLocalPropsImgVer:0,// 道具本地缓存图片版本
    mLocalPrizeImgVer:0,// 奖品本地缓存图片版本

    mCanShowDaily:true,//显示每日必做
    mCanShowSignin:true,//能否显示签到


    mAppBaseVersion:"",//版本(xml)(客户端cpp版本_build)
    mAppCppVersion:"",//客户端cpp版本
    mAppCppBuild:"0",//客户端cpp build
    mGameVersion:"", //版本显示(js)
    mPlatform : "web",  //发布平台 ios android html5 win  //iphone, ipad, android, wp, pc, web
    mDeviceName:"",//设备名字

    mMusicon:true,//是否播放音乐 状态
    mSoundon:true,//是否播放音效 状态
    mFontname:"SimHei", //Arial

    mDoReLogin:false,//是否需要重新登录 （从游戏返回大厅时ip改变）

    mIsGameDataInited:false,//游戏数据是否初始化了 只执行一次的 如网络
    mIsShowNoticeing:false,// 正在显示提示
    mIsShowTopView:false,//正在显示 顶层界面

    mEnterTableRandom:false,//进入桌子是随机的(根据进入桌子的指令确定)
    mChangeTableByRandom:false,//随机模式重新坐下
    mExitRoomToMain:true,//当推出桌子时是否需要推出房间
    mZJHChangeTabVisible:true,//砸金花换桌按钮是否显示

    mIsGameShowAniming:false,//正在显示动画 发牌 （zjh比牌 结束） (dn抢庄 分牌 输赢) (dzpk 得分)
    mIsGameShowBetAniming:false,//正在显示动画 投注
    mIsGameSitDownAnimNum:0,//同一时间左下的人数
    mIsGameSitDownAniming:false,//正在显示坐下动画 (坐下时 停止发牌 比牌)

    mWallADers:[],//广告商

    mNeedRememberPwd:true,//是否记住密码

    mShareTaskId:0,//分享任务id
    mEnterBackgroundFor:"",//进入后台是为了（share）--未使用


    mIsLogined:false,//是否已经登录
    mGuid:"",//唯一标示
    mUser:null,//用户数据
    mCurrZoneId:1,//分区id
    mUserMsgCount:0,//用户消息数量
    mRoomlist:[],//房间列表
    mShowGameRoomList:[],//当前游戏的房间列表
    mShowTablesList:[],//当前游戏的桌子列表
    mCurrRoom:null,//当前房间
    mCurrTable:null,//当前桌子
    mGameNet:null,//网络
    mGameNetHandle:null,//网络
    mEnterTableData:null,//进入桌子时收到的数据
    mULevel:null,//用户等级
    mGuestUUID:"",//游客id
    mAccountLoginType:1,//系统账号登录 1系统 （保存账号密码） 0游客
    mUseGuestLoginNum:0,//有时游客登录失败

    mCurrInviteRoom:null,//当前房间
    mIsQuitByInviteGame:false,//因为邀请游戏而退出的游戏
    mIsSameGameByInviteGame:false,//和邀请游戏在同一个游戏

    mNoticeNeedReg:false,//游客登陆之后应该

    mAgent_login:AGENT_APPLE,//登录时用的代理

    mCurrGameType:-1,//当前游戏类型

    mOLPlayers:[],//显示的在线玩家
    mShowOLPlayersInFriend:[],//在好友中显示的在线玩家
    mOLPlayersGetTime:0,//获取 时间  超过 3分钟 重新取

    mGameMode:0,//游戏模式: 0-普通游戏；1-比赛

    mSysDataDBMan:null,//系统数据库
    mSysDataConfiglist:[],//系统数据配置列表 －－服务器
    mConfigDataNeedLoadByDB:[],//需要从数据库加载的配置
    mConfigDataNeedSaveToDB:[],//需要保存到数据库的配置
    mLoadConfigsOverByDB:false,//加载配置结束
    mLoadConfigsOverByNet:false,//加载配置结束

    mHasSaveConfigData:false,//已经保存

    mSys_GameConfigs:[],//从数据库 取出的系统数据
    mSys_Prizes:[],//从数据库 取出的系统数据
    mSys_Propses:[],//从数据库 取出的系统数据
    mSys_Signins:[],//从数据库 取出的系统数据
    mSys_Tasks:[],//从数据库 取出的系统数据
    mSys_UserLevels:[],//从数据库 取出的系统数据
    mSys_Vips:[],//从数据库 取出的系统数据

    mResPathSys:"",//资源下载位置

    mHasShowSysNotice:false,//是否已经显示系统公告
    mSysNoticemsg:"",//公告消息

    mMsgList:[],//所有消息列表
    mShowMsgList:[],//显示的消息列表
    mFriendList:[],//所有好友列表
    mShowFriendList:[],//显示好友列表（如发送了消息的）
    mChatList:[],//聊天列表
    mShowChatList:[],//显示的消息列表
    mPayList:[],//充值列表
    mShowPayList:[],//显示的充值列表
    mPayAgent:"",//
    mIsShowQuickPay:false,
    mPrizeList:[],//奖品列表
    mPrizeCanChangeList:[],//能兑换奖品列表
    mShowPrizeList:[],//显示的奖品列表
    mCurrPrize:null,//选择的奖品\
    mCurrUPrize:null,//选择的奖品\
    mChangePrizeLogList:[],//兑换奖品日志

    mGetFriendFrom:0,//从哪获取好友
    mDoActionOnceAfterLogin:true,// 登录之后获取一次操作

    mCanloadPicHtml5:true,//html5能否加载网络图片 （跨域问题）

    mUserTasks:[],//用户任务列表

    mChatMsgList:[],//聊天消息列表

    mRoomScale:1,//房间放缩比例


    mGetVCodeTime:0,//获取验证码时间
    mSMSDelayTime:120,// 发送短信间隔时间

    mMatchList:[],//比赛
    mMatchShowList:[],//显示的列表
    mCurrMatch:null,//当前选中的比赛
    mMatchSignType:1,//1普通报名 2双倍积分
    mUserMatchDatas:[], //玩家正在参与或即将开始的比赛数据
    mVideoCanReadData:true,//录像能读取数据
    mVideoCanReadDataTime:0,//能读取数据
    mVideoCanReadDataDelay:2,//1-3 s之间
    mMatchRankList:[],//比赛排行列表
    mMatchHisRankList:[],//比赛我的 历史排名
    mMatchHisWinnerList:[],//比赛历届冠军

    mVideoMatchList:[],//录像的比赛
    mCurrVideoMatch:null,//当前查看的比赛
    mCurrVideoUser:null,//当前查看的玩家
    mPlayerInMatchVideo:null,//比赛中 使用的玩家
    mVideoMatchUsers:[],//录像比赛的玩家
    mMatchGameVideos:[],//比赛的录像纪录
    mVideoData:null,//录像数据

    mGetNewWallTaskData:true,//获取新

    mGetUserInfoUid:0,//获取用户信息的id

    mRankType:1,//排名类型 1金币  3等级
    mRankList:[],//排名 列表

    mTaskList:[],//游戏 任务 列表(已停止使用)
    mShowTaskList:[],//当前游戏的任务(已停止使用)

    mPropsList:[],//系统道具列表
    mSellPropsList:[],//可销售的道具
    mCurrProps:null,//当前道具
    mUserPropsList:[],//用户道具列表
    mUserPrizeList:[],//用户奖品列表


    mVPayLogList:[],//充值验证列表
    mIsPayVerifying:false,//正在验证
    mCurrVerifyOrderNo:"",//当前验证 订单号
    mCurrVerifyMsg:"", //当前验证 附加消息
    mCurrVerifyNum:0, //当前验证 次数
    mIsVerifyAfterLogin:true,//登录后验证
    mNeedVerifyPayLogListLogin:[],// 需要登录验证的订单号纪录
    mReturnNumVPayLogin:0,// 登录验证结束的数量

    mCurrPayType:PAY_APPLE,//支付方式
    mPayTypes:[],//当前可用的支付方式

    mCurrFriend:null,//当前好友，

    mIsHallChangeRoom:false,//是在大厅切换房间
    mSendDataTypeInGame:0,//0进入房间  1进入桌子 2随机进入桌子


    mShowMainLayerIndex:0,//进入MainScene 显示的 layer   1halllist 2halltable 3HallRoom 4pay
    mDefaultHallShow:1, //默认显示 大厅 0halllist 1halltable
    mEnterFromViewType:1, //0list 1table

    mEnterTableType:0,//进入的房间类型
    mEnterTableIdx:0,//要进入的房间
    mSitDownChairIdx:0,//要坐下的椅子
    mSitDownChip:0,//要坐下时的筹码
    mMeStandUp:true,//本人是否站起

    mARunCircleData:null,//赛跑圆数据
    mTurnTableCircleData:null,//转盘圆数据
    mTurnTableTimeSpace:0,//转盘时间间隔
    mIsShowTurnTableing:false,


    //游戏基本资源数据－－根据gameId取resname(一个游戏下载完成，才能下另一个)
    mCurrDownGameId:0,//
    mIsDownLoadingGameRes:false,//是否正在下载游戏资源
    mGamesResDatas:[],
    //mBaseResDatas:[],//基本资源数据
    mDowningGameResDatas:[],//正在下载游戏资源[gdata,state]
    mHasGetGameResData:false,

    mUpmpTradeNo:"",//银联交易流水号

    mOnlineNum:1,//在线人数
    mGetScrollNotifyId:0,//获取的滚动消息id
    mShowScrollNotifyId:0,//显示的消息id
    mScrollMsgs:[],//滚动消息(所有 系统和玩家)
    mScrollMsgs_sys:[],//滚动消息
    mScrollMsgs_new:[],//滚动消息new（main 跑马灯：优先显示新消息，没新消息显示系统消息）
    mDefaultScrollMsg:"",
    mIsShowWorldChatPaneling:false,//是否再显示世界消息面板
    mScrollMsgId:0,//滚动消息 id
    mScrollMsgMaxNum:40,//滚动消息 最大数量
    mScrollMsgSysMaxNum:3,//滚动消息 最大数量

    mHasGetUserExtraInfo:false,//是否获取了额外信息（支付宝，钱庄密码）

    mClickState:0,//层点击时判断用；开始点击设成1 ;点击结束时 还等于1时 设成2 ；其他(按钮)操作改变设成3 (保证多层或按钮时只响应1个)

    mCurrGGLCard:null,//当前刮刮卡\
    mGGLRankList:[],//刮刮乐排行

    mLastGetRoomDataTime:0,//上次获取房间信息时间

    mCanUpdateDeviceInfo:false,//能更新设备信息(add时自动设true，remove时false)
    mDeviceInfo_battery:50,//电量
    mDeviceInfo_signal:50,//信号
    mDeviceInfo_time:0,//时间
    mDeviceInfoHasUpdate:false,//设备信息更新了
    mCurrShowDeviceInfo:null,

    mExitRoomForAction:0,//退出房间是为了 1充值
    mGoToMainFromGameType:0,//从游戏退出类型

    mChoosePicData:"",//选择图片数据；

    mChatTime:0,//
    mInterativeTime:0,//

    mCurrScene:null,//当前场景
    mCurrLayer:null,//当前显示层

    mGameLogic:null,//基本逻辑类

    mFShShareData:null,//水浒传老虎机 共享数据
    mFruit_IsShowHelping:false,//水浒传老虎机是否在显示帮助

    mDJEnterRoomNetdata:null,//单机进入房间获取的网络数据

    mLoadResObserverId:0,//要加载的资源跟踪id
    mLoadResArray:[],//当前要下载的资源｛oid,resname,url,state,currlayer,pnode,func｝

    mNeedReConnRoom:false,//是否需要重连
    mIsEnterGameing:false,//是否正在进入游戏 （一般状态,在切换界面时重置）
    mIsSendEnterRoomIng:false,//正在发送进入房间
    mIsSendingData:false,//正在发送数据 （所有发送数据状态 ，在checkSendDataState重置）
    mNetDataArray_Socket:[],//网络数据 Socket 专用
    mNetDataArray_Game:[],//游戏 可以使用的数据 (需要等待，播放动画 时 等待)
    mNetDataArray_Game_nowait:[],//网络数据 Socket 专用 (不需要等待)
    mCanReadNetData_Game:true,//能否读取数据
    mCanReadNetData_Game_nowait:true,//能否读取数据
    mPausedCommand_Use:false,//能否暂停 读取数据 （游戏里控制 用这个）

    mHallLogoPic:"",

    mDelayLoadingForEnterGame:false, // 增加需求：为了能在进入游戏后能够多延迟随机延迟1。5～3秒钟的时间

    mForceUpUrl:"",

    mIsOldVer:false, //0704 app版 为旧版

    mSysHeads:["f_0.png","f_1.png","f_2.png","f_3.png","f_4.png","m_0.png","m_1.png","m_2.png","m_3.png","m_4.png"],//系统图片

    mTempData:null,//

    mUserName_login:"",//登陆的用户名
    mPwd_login:"",//登陆的密码
    mPwd_change:"",//修改的密码

    operateTimeVector:null,//头像 时间条 位置
    operateTimeVector1:null,//头像 时间条 位置(zjh 2个)
    netTipLabel:null,
    end:"" //--
};

var sResWord = {};

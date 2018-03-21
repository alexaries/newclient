/**
 * Created by Administrator on 14-4-16.
 */
var C_HEART_CMD     = 0x30001;
var S_HEART_CMD     = 0x30002;
//基础指令
var TYPE_MASK = 0x00FF0000;        		//类型
var T_SYS_COMMAND = 0x00010000;//系统指令类型
var T_HALL_COMMAND = 0x00020000;//大厅指令类型

//***************************

//系统指令 放 GameSysNet 里

//***************************

var C_REG           = 0x00020001;//注册
var S_REG            = 0x00020002;
var C_LOGIN 	      = 0x00020003  ;  //登录
var S_LOGIN 		  = 0x00020004 ;
var C_HALL = 	0x00020005;				//大厅列表
var S_HALL = 	0x00020006;

var C_SIGNIN =  0x00020007;	//签到
var S_SIGNIN =  0x00020008;

var C_FRIEND_FOLLOW = 	0x0002000B;	   //关注好友
var S_FRIEND_FOLLOW = 	0x0002000C;


var C_FRIEND_GETLIST = 	0x00020010;	   //获得好友关系  1我关注的， 2：我的粉丝， 3：双向关注（好友） 现在只处理好友
var S_FRIEND_GETLIST = 	0x00020011;

var C_SEARCHUSER = 0x00020027;  //搜索用户
var S_SEARCHUSER = 0x00020028;


var C_UPROPSLIST = 	0x0002001A;  //列表用户背包道具
var S_UPROPSLIST = 	0x0002001B;

var C_UPROPS_USE = 	0x0002001C;  //使用用户道具
var S_UPROPS_USE = 	0x0002001D;

var C_PROPS_LIST = 	0x0002001E;  //道具   -- 从sys_data直接取 //--未使用
var S_PROPS_LIST = 	0x00020020;

var C_PROPS_BUY = 	0x00020042;  //购买道具
var S_PROPS_BUY = 	0x00020043;

var C_MSGLIST = 	0x00020021;  //用户消息列表
var S_MSGLIST = 	0x00020022;

var C_MSG_READ = 	0x00020023;  //预览用户消息
var S_MSG_READ = 	0x00020024;

var C_MSG_DEL = 0x00020025  //删除消息
var S_MSG_DEL = 0x00020026




var C_USER_MSG_KIT_PROC   = 0x0002002B;//用户消息附件受理
var S_USER_MSG_KIT_PROC   = 0x0002002C;


var C_PAY_LIST = 0x0002002D;//充值列表
var S_PAY_LIST = 0x0002002E;



var C_PAY_LOG = 0x00020032;//充值日志数据
var S_PAY_LOG = 0x00020033;

var C_CHANGE_USERINFO = 0x00020034;//修改用户信息
var S_CHANGE_USERINFO = 0x00020035;




var C_STORE_LIST	 =  0x00020039;		//商品兑换列表  -- 从sys_data直接取 //--未使用
var S_STORE_LIST	 =  0x0002003A;

var C_STORE_EXCHANGE =  0x0002003B;		//兑换商品
var S_STORE_EXCHANGE =  0x0002003C;

var C_STORE_EXCHANGE_LOG =  0x0002003D;	//兑换商品日志
var S_STORE_EXCHANGE_LOG =  0x0002003E;

var C_TASK_LIST =  0x00020040;	//任务列表
var S_TASK_LIST =  0x00020041;

var C_PRIZE_ACCEPT	 =  0x00020044;		//领取存入背包中的奖品
var S_PRIZE_ACCEPT	 =  0x00020045;

var C_RANK_LIST = 0x00020046; //排行榜
var S_RANK_LIST = 0x00020047;

var C_BINDMOBILE_GETCODE = 0x00020048; //绑定手机 获取验证码
var S_BINDMOBILE_GETCODE = 0x00020049;

var C_BINDMOBILE_VERIFYCODE = 0x0002004A; //绑定手机 验证验证码
var S_BINDMOBILE_VERIFYCODE = 0x0002004B;


var C_UPMP_GETTRADENO = 0x00020050; //银联获取交易流水号
var S_UPMP_GETTRADENO  = 0x00020051;


var C_MATCH_LIST = 0x00020052; //获取斗地主比赛列表
var S_MATCH_LIST = 0x00020053;

var C_MATCH_SIGNUP = 0x00020054; //比赛报名  --定时开赛
var S_MATCH_SIGNUP = 0x00020055;

var C_MATCH_CANCEL_SIGNUP = 0x00020056; //取消报名   --定时开赛
var S_MATCH_CANCEL_SIGNUP = 0x00020057;

var S_MATCH_NOTIFY_START = 0x00020058;// 通知比赛 开始


var C_MATCH_VIDEO_LIST = 0x00020059; //斗地主比赛录影记录列表
var S_MATCH_VIDEO_LIST = 0x0002005A;

var C_MATCH_VIDEO_USERS = 0x0002005B; //某一局比赛的玩家列表
var S_MATCH_VIDEO_USERS = 0x0002005C;

var C_MATCH_VIDEO_RECORD_LIST = 0x0002005D; //某一局比赛的玩家比赛列表
var S_MATCH_VIDEO_RECORD_LIST = 0x0002005E;

var C_MATCH_VIDEO_SEE = 0x00020060;   //比赛录影记录
var S_MATCH_VIDEO_SEE = 0x00020061;

var C_REQ_USER_INFO = 0x00020062  // //请求一次用户信息
var S_REQ_USER_INFO = 0x00020063


var C_OLPLAYER_LIST = 0x00020066   //在线玩家列表
var S_OLPLAYER_LIST = 0x00020067


var C_ADER_WALL = 0x20068;	 //积分墙广告商列表
var S_ADER_WALL = 0x20069;

var C_WALL_TASK_LIST = 0x2006A;	 //完成积分墙，获得的奖励列表
var S_WALL_TASK_LIST = 0x2006B;

var C_WALL_TASK_AWARD = 0X2006C;   //领取任务奖励
var S_WALL_TASK_AWARD = 0X2006D;

var C_UTASK_LIST = 0X2006E;   //任务列表
var S_UTASK_LIST = 0X20070;

var C_UTASK_AWARD = 0X20071;   //领取任务奖励
var S_UTASK_AWARD = 0X20072;


var C_RETRIEVE_PASSWORD = 0X20075;   //找回密码
var S_RETRIEVE_PASSWORD = 0X20076;

var C_GOOGLE_PAY = 0X20077;   //google pay
var S_GOOGLE_PAY = 0X20078;


var C_WEIXIN_TASK = 0X20079;   //微信任务通知
var S_WEIXIN_TASK = 0X2007A;


var C_CONFIG_VERSION = 0X2007B;   //配置 版本
var S_CONFIG_VERSION = 0X2007C;

var C_UPGRADE_GUEST_USER		= 0X2007D;   //升级游客账号为正式账号
var S_UPGRADE_GUEST_USER  		= 0X2007E;

var C_WORLD_MSG = 0X20080;   //发送世界消息
var S_WORLD_MSG = 0X20081;

var C_GAME_RES_LIST = 0X20082;   //游戏 资源包列表
var S_GAME_RES_LIST = 0X20083;

var C_GET_USERINFO = 0x00020084;//获取用户信息
var S_GET_USERINFO = 0x00020085;

var C_MATCH_RANK = 0x00020086;//比赛排名
var S_MATCH_RANK = 0x00020087;


var S_UPGRADE_FORCE = 0x0002008C; //app 强制升级提示

var C_QUESTION_SERVICE 	= 0x2008D;  //发送客户问题
var S_QUESTION_SERVICE = 0x2008E;

var C_CHANGE_EBANK_PWD = 0x20090; //修改钱庄密码
var S_CHANGE_EBANK_PWD = 0x20091;

var C_BIND_ALIPAY = 0x20092;  //绑定 支付宝
var S_BIND_ALIPAY = 0x20093;

var C_EBANK_SAVECASH = 0x20094;  //银行 存钱
var S_EBANK_SAVECASH = 0x20095;

var C_EBANK_GETCASH = 0x20096;  //银行 取钱
var S_EBANK_GETCASH = 0x20097;

var C_CHANGECASH = 0x20098;  //兑换 到x宝
var S_CHANGECASH = 0x20099;

var C_CHANGE_ALIPAY = 0x200A2;  //更改 支付宝
var S_CHANGE_ALIPAY = 0x200A3;

//游戏网络数据 －－－－－－网络相关数据保存成全局，（如果时保存在GameNet，Socket状态改变时经常报错，用self也不行）
var sGameNetData = {
    mIsConnectIng:false, //正在连接网络，还没连通
    mSocketConnected:false, //socket 连接成功 （Socket状态改变时改变）
    mSocketClosed:false, //socket 已关闭 （Socket状态改变时改变）
    mSocketWasConnectOk:false, //socket 连接成功过 （Socket状态改变时改变）
    mNetIsConnected:false,//是否网络连通 （在update 检查时改变 ）
    mNetIsClosed:false,//是否网络关闭（重连次数最大）
    mIsReConnect:false,//是否重连(断线 没完全关闭)
    mISReConnect_close:false,//是否重连(关闭之后)
    mWasConnectOk:false,//网络曾经连通过
    mConnectFailNum:0,//连接失败次数
    mIsReConnectOK:false,//是否重连成功
    mHasChangeNet:false,//是否换网了
    mNetStateChange:false,//状态是否改变
    //********* net handlenet *********
    mSysNet:null,
    mDZPKNet:null, //dzpk网络数据处理
    mDDZNet:null, //ddz网络数据处理
    mZJHNet:null, //zjh网络数据处理
    mDNNet:null, //dn网络数据处理
    mMJNet:null,//麻将网络数据处理
    mGYMJNet:null,//贵阳麻将网络数据处理
    mDDZMatchNet:null,//ddz match
    mTNNet:null,//taoniu网络数据处理
    mRunNet:null,//赛跑网络数据处理
    mFSHNet:null,//水浒老虎机网络数据处理
    mLuckyFruitNet:null,//幸运水果机网络数据处理
    mTurnTableNet:null,//转盘网络数据处理

    //********* net handlenet end *********
    _recvPkt:null,  //所有接受到的数据存在这
    //网络关闭时清除数据
    cleandataNetClose:function(){
        var i = 0;
        while(i<sGameData.mNetDataArray_Socket.length){
            var packet = sGameData.mNetDataArray_Socket[i];
            packet.readskip(5);
            var command = packet.readInt();
            var cmds = [S_NOTIFY_OTHER_LOGIN,S_DDZ_KICK_DISABLE_USER];
            if(valuecontain(cmds,command)){//其他地方登录 不清除
                packet._rpos = 0;
                i++;
            }else{
                sGameData.mNetDataArray_Socket.splice(i,1);
            }
        }
    }
}
//游戏网络
var GameNet = GameSysNet.extend({
    mIP:"", //服务端ip
    mPort : 80,//服务端 端口
    mGameSocket : null, //websocket
    mCanReadData_Socket:true,//读数据使用
    mConnType:0,//连接目标类型 0 大厅 1游戏  2比赛报名 3比赛取消报名 4进入比赛 5断线登陆
    tempTime:0,//最近一次发送数据时间
    self:null,
    ctor:function(){
        log("net create---");

        //初始化 initNetData_xxx
        var len = sGameData.mGameConfigDatas.length
        for(var i = 0;i<len;i++){
            var data = sGameData.mGameConfigDatas[i];
            var func = data[GameData_ID_INITNET_METHOD];
            if(func){
                func();
            }
        }

        _recvPkt = Packet.create();
    },
    //初始化 WebSocket
    init:function(ip,port){
        log("GameNet init = "+ip+":"+port)
        if(!sGameNetData.mIsConnectIng){
            sGameNetData.mIsConnectIng = true;
            this.mIP = ip;
            this.mPort = port;
            sGameNetData.mNetIsConnected = false;
            sGameData.mNetDataArray_Socket = [];
            sGameData.mNetDataArray_Game = [];
            this.showTip(sResWord.w_net_isconnecting);
            this.mGameSocket = new WebSocket("ws://"+this.mIP+":"+this.mPort+"/ws");
            this.mGameSocket.binaryType = "arraybuffer";
            this.mGameSocket.onopen = this.onNetConnected;
            this.mGameSocket.onmessage = this.onNetReceiveData;
            this.mGameSocket.onerror = this.onNetError;
            this.mGameSocket.onclose = this.onNetClose;
            sGameNetData.mSocketConnected = false;
            sGameNetData.mSocketClosed = false;
            //self = this;
            sGameNetData.mNetStateChange = true;

        }
    },
    //关闭网络
    closeNet:function(){
        log("closeNet--")
        sGameNetData.mIsConnectIng = false;
        sGameNetData.mSocketConnected = false;
        sGameData.mNetDataArray_Socket = [];
        sGameData.mNetDataArray_Game = [];
        if(this.mGameSocket!=null){
            if (this.mGameSocket.readyState == WebSocket.OPEN)
            {
                this.mGameSocket.close()
            }
            //this.mGameSocket = null;
        }
    },
    /**
     * 重连网络
     * 不使用下面的这种方式
     * //this.closeNet();   //关闭 和 重连 顺序可能有问题
     * //this.init(ip,port);
     * 要先关闭网络，在检测网络中确定网络已关闭再重新初始化
     */
    reConnect:function(ip,port,conntype){
        log("reConnect=="+ip+":"+port);
        if(ip != this.mIP || this.mPort != port || !sGameNetData.mSocketConnected){ //判断时候需要重连 －ip； 端口； 没连接；
            this.mIP = ip;
            this.mPort = port;
            this.mConnType = conntype;
            sGameData.mDoReLogin = true;
            sGameNetData.mHasChangeNet = true;
            sGameNetData.mIsReConnect = true;
            sGameNetData.mIsReConnectOK = false;
            //用这种方式 保证先关闭再重连
            sGameNetData.mISReConnect_close = true;
            if(this.mGameSocket){
                log("re-1")
                this.closeNet();
            }else{//已经确定关闭 的 直接连
                log("re-2")
                sGameNetData.mISReConnect_close = false;
                this.init(ip,port);
            }
        }else{
            log("no need")
            sGameData.mDoReLogin = false;
            sGameNetData.mHasChangeNet = false;
            this.mConnType = conntype;
            sGameNetData.mNetIsConnected = true;
            sGameNetData.mIsReConnectOK = true;
        }
    },
    //检查网络状态
    checkNet:function(){
        this.checkNetHeart();
        if(this.mGameSocket){
            var mHasClose_Me = false;//是否自己关闭 自己关闭的 不报提示消息
            if(sGameNetData.mNetIsConnected!=sGameNetData.mSocketConnected
                ||sGameNetData.mNetIsClosed!=sGameNetData.mSocketClosed
                ||sGameNetData.mWasConnectOk !=sGameNetData.mSocketWasConnectOk
                ||sGameNetData.mNetStateChange == true){ // 网络状态发生改变时
                sGameNetData.mNetStateChange = false;
                log("checkNet---"+sGameNetData.mSocketConnected + sGameNetData.mSocketClosed);
                if(sGameNetData.mSocketClosed){//Socket  关闭之后
                    log("net -- shut down "+sGameNetData.mIsReConnect+sGameNetData.mISReConnect_close);
                    this.showTip(sResWord.w_net_tip_close);
                    sGameData.mIsSendingData = false;
                    this.mGameSocket = null;
                    if(sGameNetData.mIsReConnect){//网络异常关闭之后重连
                        if(sGameNetData.mISReConnect_close){//自己关闭之后重连（换服务器）
                            mHasClose_Me = true;
                            sGameNetData.mISReConnect_close = false;
                            this.init(this.mIP,this.mPort);
                        }
                    }
                }else if(!sGameNetData.mSocketConnected){  //显示提示 点确定后重连
                    sGameData.mIsSendingData = false;
                    if(sGameNetData.mSocketWasConnectOk){
                        log("net Connected is closed");
                        this.showTip(sGameData.w_net_tip_reconning);
                        sGameNetData.mIsReConnect = true;
                    }
                }else{
                    log("net is Connected ");
                    if(sGameNetData.mIsReConnect){
                        //this.showTip("");
                        sGameNetData.mIsReConnectOK = true;
                    }else{
                        this.showTip(sResWord.w_net_tip_connectok);
                    }
                    sGameNetData.mIsReConnect = false;
                }
            }
            sGameNetData.mNetIsConnected=sGameNetData.mSocketConnected
            sGameNetData.mNetIsClosed=sGameNetData.mSocketClosed
            sGameNetData.mWasConnectOk =sGameNetData.mSocketWasConnectOk
            if(mHasClose_Me){
                sGameNetData.mNetIsClosed = false;
            }
        }
    },
    //检查网络心跳
    checkNetHeart:function(){
        //if(sGameData.mIsLogined&&sGameData.mCurrScene==sGameData.mMainScene){
            if(sGameNetData.mNetIsConnected){
                var now =  (new Date()).getTime();
                if(now - this.tempTime > 1000*15){
                    this.tempTime = now;
                    this.sendTick(sGameData.mGetScrollNotifyId);
                }
            }
        //}
    },
    //当网络连通时调用
    onNetConnected:function(evt) {
        log("***onNetConnected");
        sGameNetData.mSocketConnected = true;
        sGameNetData.mSocketWasConnectOk = true;
        sGameNetData.mIsConnectIng = false;
        sGameNetData.mConnectFailNum = 0;
        sGameNetData.mNetStateChange = true;
    },

    //当网络接受到数据时调用
    onNetReceiveData:function(evt) {
        log("***onNetReceiveData");
        var pktData = new Int8Array(evt.data);
        log("pktData=="+pktData.length);
        if(pktData.length > 0){
            _recvPkt.appendByData(pktData);//新接收到的数据加入接收包中
            while(_recvPkt.getCurrLen()>=4){
                var recvlen = _recvPkt.getCurrLen();//接收包的当前长度
                var _recvPktdata = _recvPkt.getDataByLen(4);
                var pktLen = getIntFromArrayData(_recvPktdata,0)//[0];   //获取当前指令包的长度
                log("recepktLen=="+pktLen);

                var slitlen = recvlen - pktLen;
                if(slitlen >= 0){//如果当前指令包已接收完 加到指令列表
                    var tpacketdata = _recvPkt.getDataByLen(pktLen)

                    var command = getIntFromArrayData(tpacketdata,5);
                    log("command="+command)

                    var packet = Packet.createByData(tpacketdata);
                    sGameData.mNetDataArray_Socket.push(packet);
                    _recvPkt.eraseData(pktLen);//去除当前指令的数据
                    log("now recevdata len ="+sGameData.mNetDataArray_Socket.length);

                    //超过50条数据没读取 关闭网络 --进入那后台,读取数据会停止或变慢
                    if(sGameData.mNetDataArray_Socket.length > 10){  // 用这种方式 (html5 需要)
                        log(" game close net-- background 2")
                        var now = (new Date()).getTime();
                        if(now - CppCall.enterForegroundTime < 2000){
                            reStartGame();
                        }else{
                            if(sGameData.mNetDataArray_Socket.length > 25){
                                reStartGame();
                            }
                        }
                    }

                }else{ //没读取完 继续读取
                    break;
                }
            }
            showNetWait(false);
        }
    },
    //当网络错误时调用
    onNetError:function(evt) {
        log("***onNetError");
        sGameNetData.mSocketConnected = false;
        sGameNetData.mIsConnectIng = false;
        sGameNetData.mNetStateChange = true;
    },
    //当网络关闭时调用
    onNetClose:function(evt) {
        log("***onNetClose");
        sGameNetData.mNetStateChange = true;
        sGameNetData.mSocketConnected = false;
        sGameNetData.mSocketClosed = true;
        sGameNetData.mIsConnectIng = false;
        //sGameData.mNetDataArray_Socket = [];
        sGameData.mNetDataArray_Game = [];
        sGameData.mNetDataArray_Game_nowait = [];
        sGameNetData.cleandataNetClose();
    },
    //每帧更新
    update:function(){
        this.checkNet();
        //socket 接受到的数据处理
        if(sGameConfig.isLocalTest){
            this.dealNetCommand();
        }else{
            try
            {
                this.dealNetCommand();
            }catch (e)
            {
                log("!!!!!net read error: ");
                log("net error = " + e.name + ": " + e.message);
            }
        }
    },

    dealNetCommand:function(){
        if(this.mCanReadData_Socket && sGameData.mNetDataArray_Socket.length > 0){
            this.mCanReadData_Socket = false;
            sGameData.mIsSendingData = false;
            var packet = sGameData.mNetDataArray_Socket.shift();
            packet.readskip(5);
            var command = packet.readInt();
            var commandType = command&TYPE_MASK;
            log("command read---"+command+"|"+commandType);

            switch(commandType){
                case T_SYS_COMMAND://认证命令
                    this.receSysCommand(command,packet);
                    break;
                case T_HALL_COMMAND://大厅命令
                    this.receHallCommand(command,packet);
                    break;
                default:
                    //接收游戏指令
                    var func = getGameConfigDataByType(GameData_ID_CMD_TYPE,commandType,GameData_ID_RECECMD_METHOD);
                    if(func){
                        func(command,packet);
                    }else{
                        log("application:未知命令类型: "+command);
                    }
                    break;
            }
            this.mCanReadData_Socket = true;
        }
    },

    //处理接收到的大厅指令
    receHallCommand:function(command,packet){
        switch (command){
            case S_LOGIN:
                this.receLoginCommand(packet);
                break;
            case S_REG:
                this.receRegCommand(packet);
                break;
            case S_SIGNIN:
                this.receSigninCommand(packet);
                break;
            case S_FRIEND_FOLLOW:
                this.receFriendFollowCommand(packet);
                break;
            case S_FRIEND_GETLIST:
                this.receFriendGetListCommand(packet);
                break;
            case S_SEARCHUSER:
                this.receSearchUserCommand(packet);
                break;
            case S_MSGLIST:
                this.receMsgListCommand(packet);
                break;
            case S_MSG_READ:
                this.receMsgReadCommand(packet);
                break;
            case S_MSG_DEL:
                this.receMsgDelCommand(packet);
                break;
            case S_UPROPSLIST:
                this.receUPropsListCommand(packet);
                break;
            case S_UPROPS_USE:
                this.receUPropsUseCommand(packet);
                break;
            case S_PROPS_LIST:
                this.recePropsListCommand(packet);
                break;
            case S_PROPS_BUY:
                this.recePropsBuyCommand(packet);
                break;
            case S_PAY_LIST:
                this.recePayListCommand(packet);
                break;
            case S_GOOGLE_PAY:
                this.receGooglePayCommand(packet);
                break;
            case S_PAY_LOG:
                this.recePayLogCommand(packet);
                break;
            case S_USER_MSG_KIT_PROC:
                this.receUserMsgKitProcCommand(packet);
                break;
            case S_CHANGE_USERINFO:
                this.receChangeUserInfoCommand(packet);
                break;
            case S_STORE_LIST:
                this.receStoreListCommand(packet);
                break;
            case S_STORE_EXCHANGE:
                this.receStoreChangeCommand(packet);
                break;
            case S_STORE_EXCHANGE_LOG:
                this.receStoreChangeLogCommand(packet);
                break;
            case S_TASK_LIST:
                this.receTaskListCommand(packet);
                break;
            case S_PRIZE_ACCEPT:
                this.recePrizeAcceptCommand(packet);
                break;
            case S_RANK_LIST:
                this.receRankListCommand(packet);
                break;
            case S_BINDMOBILE_GETCODE:
                this.receBindMobileGetCodeCommand(packet);
                break;
            case S_BINDMOBILE_VERIFYCODE:
                this.receBindMobileVerifyCodeCommand(packet);
                break;
            case S_UPMP_GETTRADENO:
                this.receUpmpGetTradeNoCommand(packet);
                break;
            case S_MATCH_LIST:
                this.receMatchListCommand(packet);
                break;
            case S_MATCH_SIGNUP:
                this.receMatchSignupCommand(packet);
                break;
            case S_MATCH_CANCEL_SIGNUP:
                this.receMatchCancelSignupCommand(packet);
                break;
            case S_MATCH_RANK:
                this.receMatchRankCommand(packet);
                break;
            case S_MATCH_NOTIFY_START:
                this.receMatchNotifyStartCommand(packet);
                break;
            case S_MATCH_VIDEO_LIST:
                this.receMatchVideoListCommand(packet);
                break;
            case S_MATCH_VIDEO_USERS:
                this.receMatchVideoUsersCommand(packet);
                break;
            case S_MATCH_VIDEO_RECORD_LIST:
                this.receMatchVideoRecordListCommand(packet);
                break;
            case S_MATCH_VIDEO_SEE:
                this.receMatchVideoSeeCommand(packet);
                break;
            case S_OLPLAYER_LIST:
                this.receOLPlayerListCommand(packet);
                break;
            case S_UTASK_LIST:
                this.receUTaskCommand(packet);
                break;
            case S_UTASK_AWARD:
                this.receUTaskAwardCommand(packet);
                break;
            case S_WALL_TASK_LIST:
                this.receUWallTaskListCommand(packet);
                break;
            case S_WALL_TASK_AWARD:
                this.receUWallTaskAwardCommand(packet);
                break;
            case S_ADER_WALL:
                this.receADerWallCommand(packet);
                break;
            case S_RETRIEVE_PASSWORD:
                this.receRetrievePasswordCommand(packet);
                break;
            case S_WEIXIN_TASK:
                this.receWeixinTaskCommand(packet);
                break;
            case S_CONFIG_VERSION:
                this.receConfigVersionCommand(packet);
                break;
            case S_UPGRADE_GUEST_USER:
                this.receUpgradeGuestUserCommand(packet);
                break;
            case S_WORLD_MSG:
                this.receWorldMsgCommand(packet);
                break;
            case S_GAME_RES_LIST:
                this.receGameResListCommand(packet);
                break;
            case S_GET_USERINFO:
                this.receGetUserInfoCommand(packet);
                break;
            case S_UPGRADE_FORCE:
                this.receUpgradeForceCommand(packet);
                break;
            case S_QUESTION_SERVICE:
                this.receQuestionServiceCommand(packet);
                break;
            case S_CHANGE_EBANK_PWD:
                this.receChangeEbankPwdCommand(packet);
                break;
            case S_BIND_ALIPAY:
                this.receBindAlipayCommand(packet);
                break;
            case S_CHANGE_ALIPAY:
                this.receChangeAlipayCommand(packet);
                break;
            case S_EBANK_SAVECASH:
                this.receEbankSaveCashCommand(packet);
                break;
            case S_EBANK_GETCASH:
                this.receEbankGetCashCommand(packet);
                break;
            case S_CHANGECASH:
                this.receChangeCashCommand(packet);
                break;
            case S_REQ_USER_INFO:
                this.receReqUserInfoCommand(packet);
                break;
            default:
                log("unknown command="+command);
                packet.clear();
                packet = null;
                break;
        }
    },
    //登录
    receLoginCommand:function(packet){
        log("receLoginCommand==");
        var netdata = [];
        netdata[0] = S_LOGIN;
        var flag = packet.readByte();
        netdata[1] = flag;

        if(flag == NET_SUCCESS){
            log("login suc");
            var user = {};
            user.sessionId = packet.readString();
            user.id = packet.readLong();
            user.userName = packet.readString();
            user.nickName = packet.readString();
            user.sex = packet.readInt();
            user.avatar = packet.readString();
            user.vip = packet.readInt();
            user.xp = packet.readInt();
            user.level = packet.readInt();
            user.softCash = packet.readLong();
            user.hardCash = packet.readLong();
            user.moneyCash = packet.readInt(); //充值货币数
            user.realName = packet.readString();
            user.idcard = packet.readString();
            user.email = packet.readString();
            user.phone = packet.readString();
            log("user = "+user.sessionId+"|"+user.id+"|"+user.userName+"|"+user.nickName);
            log("user1 = "+user.sex+"|"+user.avatar+"|"+user.vip+"|"+user.xp+"|"+user.level);
            log("user2 = "+user.softCash+"|"+user.hardCash+"|"+user.moneyCash);

            var roomlist =[];
            var roomLen = packet.readInt();
            for(var i = 0;i<roomLen;i++){
                var room = {}
                room.roomId = packet.readLong();
                room.roomName = packet.readString();
                room.gameId = packet.readInt();
                room.ipAddress = packet.readString();
                room.port = packet.readInt();
                room.websocketPort = packet.readInt();
                room.state = packet.readInt();
                room.onlineCount = packet.readInt();
                room.basicPoint = packet.readInt();
                //room.enterPoint = packet.readInt();
                room.enterPoint = packet.readLong();//Lower
                room.enterUpperPoint = packet.readLong();
                room.enterLowerLevel = packet.readInt();
                room.enterUpperLevel = packet.readInt();
                room.maxAllowCount = packet.readInt();
                log("room"+i+" = "+room.roomId+"|"+room.roomName+"|"+room.gameId)
                log(" = "+room.ipAddress+"|"+room.port+"|"+room.websocketPort)
                log(" = "+room.state+"|"+room.onlineCount+"|"+room.basicPoint+"|"+room.enterPoint)
                roomlist.push(room);
            }

            var onLineRoomId = packet.readLong();  //>0时：玩家在房间的id号(掉线重连使用)
            var onLineTableId = packet.readInt();  //当onLineRoomId > 0 时该字段有效，onLineTbaleId <= 0表示不在房间中
            log("onLineRoomId="+onLineRoomId+"|"+onLineTableId);

            //保持兼容
            user.serverTime = packet.readLong();
            user.localTimeByServer = (new Date()).getTime(); //取得服务器时间时的本地时间

            var matchs = [];
            var matchroomcount = packet.readInt();
            log("matchroomcount="+matchroomcount);
            for(var i=0;i<matchroomcount;i++){
                var match = {}
                match.roomId = packet.readLong();   //matchroomId
                match.openState = packet.readInt(); //开放状态 0不开放
                match.name = packet.readString();   //比赛名称
                match.gameId = packet.readInt();    //游戏id
                match.id = packet.readLong();       //比赛id
                match.ip = packet.readString();     //IP
                match.socketPort = packet.readInt();//端口
                match.websocketPort = packet.readInt();//端口
                match.type = packet.readInt();      //类型： 1定时 2人满
                match.signupGold = packet.readInt();//报名费
                match.playerUpperlimit = packet.readInt();//人数限制
                match.initScore = packet.readInt(); // 初始积分
                match.baseScore = packet.readInt();// 底分
                match.gamedata = packet.readString();//游戏数据“6:2,6:1,3:1” "人数:局数，人数:局数"
                match.prizeInfo = packet.readString();//奖励信息
                match.info = packet.readString();   //比赛信息
                match.sort = packet.readInt();
                match.startTime = packet.readLong();//开始时间
                match.basicPoint = packet.readInt();
                match.enterLowerPoint = packet.readLong();
                match.enterUpperPoint = packet.readLong();
                match.enterLowerLevel = packet.readInt();
                match.enterUpperLevel = packet.readInt();
                match.pic = packet.readString();//图片
                match.currPlayerCount = packet.readInt();//报名人数
                match.userMatchId = packet.readLong();//大于0，表示报名了
                match.matchCount = 0;
                if(match.userMatchId > 0){
                    match.signup = 1;
                }
                matchs.push(match);
                log("match"+i+" = "+match.id+"|"+match.name+"|"+match.roomId+"|"+match.type+"|"+match.userMatchId)
                log("score"+i+" = "+match.initScore+"|"+match.baseScore+"|"+match.signupGold+"|"+ match.openState+"|"+match.gamedata)
            }
            //保持兼容 end

            user.signin = packet.readString(); //签到数据
            log("signin="+user.signin);
            var noticemsg = packet.readString();
            user.turntableTime = packet.readLong();
            //user.turntableTime = 0;
            user.type = packet.readInt();
            netdata[2] = user;
            netdata[3] = roomlist;
            netdata[4] = onLineRoomId;
            netdata[5] = onLineTableId;
            netdata[6] = noticemsg;
            netdata[7] = matchs;
        }else{
            var code = packet.readInt();
            var msg = packet.readString();
            log("error code="+code+"|"+msg);
            netdata[2] = code;
            netdata[3] = msg;
        }
        sGameData.mNetDataArray_Game.push(netdata);
        packet.clear();
        packet = null;
    },
    //注册
    receRegCommand:function(packet){
        log("receRegCommand==");
        var netdata = [];
        netdata[0] = S_REG;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("reg suc");
        }else{
            var code = packet.readInt();
            var msg = packet.readString();
            log("error code="+code+"|"+msg);
            netdata[2] = code;
            netdata[3] = msg;
        }
        sGameData.mNetDataArray_Game.push(netdata);
        packet.clear();
        packet = null;
    },
    //签到
    receSigninCommand:function(packet){
        log("receSigninCommand==");
        var netdata = [];
        netdata[0] = S_SIGNIN;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("signin suc");
            var signin = packet.readString();
            var loginmsg = packet.readString();
            netdata[2] = signin;
            netdata[3] = loginmsg;
        }else{
            var code = packet.readInt();
            var msg = packet.readString();
            log("error code="+code+"|"+msg);
            netdata[2] = code;
            netdata[3] = msg;
        }
        sGameData.mNetDataArray_Game.push(netdata);
        packet.clear();
        packet = null;
    },
    //关注好友
    receFriendFollowCommand:function(packet){
        log("receFriendFollowCommand==");
        var netdata = [];
        netdata[0] = S_FRIEND_FOLLOW;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("FriendFollow suc");

        }else{
            var code = packet.readInt();
            var msg = packet.readString();
            log("error code="+code+"|"+msg);
            netdata[2] = code;
            netdata[3] = msg;
        }
        sGameData.mNetDataArray_Game.push(netdata);
        packet.clear();
        packet = null;
    },

    //获取好友列表
    receFriendGetListCommand:function(packet){
        log("receFriendGetListCommand==");
        var netdata = [];
        netdata[0] = S_FRIEND_GETLIST;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("Friend getlist suc");
            var count = packet.readInt();
            var friends = [];
            for(var i=0;i<count;i++){
                var friend = {}
                friend.id = packet.readLong();
                friend.userName = packet.readString();
                friend.nickName = packet.readString();
                friend.sex = packet.readInt();
                friend.avatar = packet.readString();
                friend.level = packet.readInt();
                friend.softCash = packet.readLong();
                friend.roomId = packet.readInt();
                friend.tableId  = packet.readInt();
                friends[i] = friend
                log("friend="+friend.id+"|"+friend.userName);
            }
            netdata[2] = friends;
        }else{
            var code = packet.readInt();
            var msg = packet.readString();
            log("error code="+code+"|"+msg);
            netdata[2] = code;
            netdata[3] = msg;
        }
        sGameData.mNetDataArray_Game.push(netdata);
        packet.clear();
        packet = null;
    },
    //好友添加  搜索用户
    receSearchUserCommand:function(packet){
        log("receSearchUserCommand==");
        var netdata = [];
        netdata[0] = S_SEARCHUSER;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("search user suc");
            var count = packet.readInt();
            var friends = [];
            for(var i=0;i<count;i++){
                var user = {}
                user.id = packet.readLong();
                user.userName = packet.readString();
                user.nickName = packet.readString();
                user.sex = packet.readInt();
                user.avatar = packet.readString();
                user.level = packet.readInt();
                user.softCash = packet.readLong();
                user.nearLoginTime = packet.readLong();
                friends[i] = user
                log("friend="+user.id+"|"+user.userName);
            }
            netdata[2] = friends;
        }else{
            var code = packet.readInt();
            var msg = packet.readString();
            log("error code="+code+"|"+msg);
            netdata[2] = code;
            netdata[3] = msg;
        }
        sGameData.mNetDataArray_Game.push(netdata);
        packet.clear();
        packet = null;
    },

    //消息列表
    receMsgListCommand:function(packet){
        log("receMsgListCommand==");
        var netdata = [];
        netdata[0] = S_MSGLIST;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("msglist suc");
            var count = packet.readInt();
            var msgdatas = [];
            for(var i=0;i<count;i++){
                var aMsg = {}
                aMsg.id = packet.readLong();
                aMsg.fromId = packet.readLong();
                aMsg.type = packet.readInt();
                aMsg.img = packet.readString();
                aMsg.content = packet.readString();
                aMsg.kitdata = packet.readString();
                aMsg.readTime = packet.readLong(); //阅读了的时间 0:未读
                aMsg.kitTime = packet.readLong();
                aMsg.createTime = packet.readLong();
                msgdatas[i] = aMsg;
                //log(" aMsg.id="+ aMsg.id+"|"+aMsg.kitdata)
            }
            netdata[2] = msgdatas;
        }else{
            var code = packet.readInt();
            var msg = packet.readString();
            log("error code="+code+"|"+msg);
            netdata[2] = code;
            netdata[3] = msg;
        }
        sGameData.mNetDataArray_Game.push(netdata);
        packet.clear();
        packet = null;
    },
    //消息读取
    receMsgReadCommand:function(packet){
        log("receMsgReadCommand==");
        var netdata = [];
        netdata[0] = S_MSG_READ;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("msg read suc");
            var msgId = packet.readLong();
            var readTime = packet.readLong();
            netdata[2] = msgId;
            netdata[3] = readTime;
        }else{
            var code = packet.readInt();
            var msg = packet.readString();
            log("error code="+code+"|"+msg);
            netdata[2] = code;
            netdata[3] = msg;
        }
        sGameData.mNetDataArray_Game.push(netdata);
        packet.clear();
        packet = null;
    },
    //消息删除
    receMsgDelCommand:function(packet){
        log("receMsgDelCommand==");
        var netdata = [];
        netdata[0] = S_MSG_DEL;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("msg del suc");
            var msgId = packet.readLong();
            netdata[2] = msgId;
        }else{
            var code = packet.readInt();
            var msg = packet.readString();
            log("error code="+code+"|"+msg);
            netdata[2] = code;
            netdata[3] = msg;
        }
        sGameData.mNetDataArray_Game.push(netdata);
        packet.clear();
        packet = null;
    },
    //背包 用户道具列表
    receUPropsListCommand:function(packet){
        log("receUPropsListCommand==");
        var netdata = [];
        netdata[0] = S_UPROPSLIST;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("uprop list suc");
            var type = packet.readInt();
            var count = packet.readInt();
            log("count="+count+"|"+type);
            var upropses = [];
            if(type ==4){
                for(var i=0;i<count;i++){
                    var aUProps = {}
                    aUProps.id = packet.readLong();
                    aUProps.propsId = packet.readLong();
                    aUProps.remaincount = packet.readInt();
                    aUProps.count = packet.readInt();
                    if(i==4) {
                        log("aUProps.count=="+aUProps.count);
                    }
                    aUProps.expireTime = packet.readLong();
                    aUProps.validityEndTime  = packet.readLong();
                    upropses[i] = aUProps
                    log("aUProps.expireTime=="+aUProps.expireTime);


                }
            }else if(type ==5){
                for(var i=0;i<count;i++){
                    var aPrize = {}
                    aPrize.id = packet.readLong();
                    aPrize.prizeId = packet.readLong();
                    aPrize.count = packet.readInt();
                    aPrize.expireTime = packet.readLong();
                    aPrize.info = packet.readString();
                    log("aPrize=="+aPrize.id+"|"+aPrize.prizeId+"|"+aPrize.info);
                    upropses[i] = aPrize
                }
            }
            netdata[2] = type;
            netdata[3] = upropses;
        }else{
            var code = packet.readInt();
            var msg = packet.readString();
            log("error code="+code+"|"+msg);
            netdata[2] = code;
            netdata[3] = msg;
        }
        sGameData.mNetDataArray_Game.push(netdata);
        packet.clear();
        packet = null;
    },
    //用户道具使用
    receUPropsUseCommand:function(packet){
        log("receUPropsUseCommand==");
        var netdata = [];
        netdata[0] = S_UPROPS_USE;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("uprop use suc");

        }else{
            var code = packet.readInt();
            var msg = packet.readString();
            log("error code="+code+"|"+msg);
            netdata[2] = code;
            netdata[3] = msg;
        }
        sGameData.mNetDataArray_Game.push(netdata);
        packet.clear();
        packet = null;
    },
    //系统道具列表 //--未使用
    recePropsListCommand:function(packet){
        log("recePropsListCommand==");
        var netdata = [];
        netdata[0] = S_PROPS_LIST;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("prop list suc");
            var count = packet.readInt();
            log("count=="+count);
            var propses = [];
            for(var i=0;i<count;i++){
                var aProps = {}
                aProps.id = packet.readLong();
                aProps.name = packet.readString();
                aProps.img = packet.readString();
                aProps.price = packet.readInt();
                aProps.preprice = packet.readInt();
                aProps.value1 = packet.readString();
                aProps.value2 = packet.readString();
                aProps.info = packet.readString();
                propses[i] = aProps
            }
            netdata[2] = propses;
        }else{
            var code = packet.readInt();
            var msg = packet.readString();
            log("error code="+code+"|"+msg);
            netdata[2] = code;
            netdata[3] = msg;
        }
        sGameData.mNetDataArray_Game.push(netdata);
        packet.clear();
        packet = null;
    },
    //购买道具
    recePropsBuyCommand:function(packet){
        log("recePropsBuyCommand==");
        var netdata = [];
        netdata[0] = S_PROPS_BUY;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("prop buy suc");
            var propsId = packet.readLong();
            var count = packet.readInt();
            var softCash = packet.readLong();
            var hardCash = packet.readLong();
            netdata[2] = propsId;
            netdata[3] = count;
            netdata[4] = softCash;
            netdata[5] = hardCash;
        }else{
            var code = packet.readInt();
            var msg = packet.readString();
            log("error code="+code+"|"+msg);
            netdata[2] = code;
            netdata[3] = msg;
        }
        sGameData.mNetDataArray_Game.push(netdata);
        packet.clear();
        packet = null;
    },
    //充值列表
    recePayListCommand:function(packet){
        log("recePayListCommand==");
        var netdata = [];
        netdata[0] = S_PAY_LIST;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("paylist suc");
            var count = packet.readInt();
            var pays = [];
            for(var i=0;i<count;i++){
                var pay = {};
                pay.id = packet.readInt();
                pay.agent = packet.readString();
                pay.productId = packet.readString();
                pay.displayName = packet.readString();
                pay.description = packet.readString();
                pay.price = packet.readInt();
                pay.priceUnit = packet.readString();
                pay.cash = packet.readInt();
                pay.giftCash  = packet.readInt();
                pays.push(pay)
                //log("pay.agent="+pay.agent)
                //log("pay.priceUnit="+pay.priceUnit)
            }
            netdata[2] = pays;
        }else{
            var code = packet.readInt();
            var msg = packet.readString();
            log("error code="+code+"|"+msg);
            netdata[2] = code;
            netdata[3] = msg;
        }
        sGameData.mNetDataArray_Game.push(netdata);
        packet.clear();
        packet = null;
    },

    receGooglePayCommand:function(packet){
        log("receGooglePayCommand==");
        var netdata = [];
        netdata[0] = S_GOOGLE_PAY;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("google pay suc");
            var orderNo = packet.readString();
            var cash = packet.readLong();
            netdata[3] = orderNo;
            netdata[2] = cash;
            log("cash=="+cash);
        }else{
            var code = packet.readInt();
            var msg = packet.readString();
            log("error code="+code+"|"+msg);
            netdata[2] = code;
            netdata[3] = msg;
        }
        sGameData.mNetDataArray_Game.push(netdata);
        packet.clear();
        packet = null;
    },
    //充值纪录
    recePayLogCommand:function(packet){
        log("recePayLogCommand==");
        var netdata = [];
        netdata[0] = S_PAY_LOG;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("paylog suc");

        }else{
            var code = packet.readInt();
            var msg = packet.readString();
            log("error code="+code+"|"+msg);
            netdata[2] = code;
            netdata[3] = msg;
        }
        sGameData.mNetDataArray_Game.push(netdata);
        packet.clear();
        packet = null;
    },

    //处理用户消息附件
    receUserMsgKitProcCommand:function(packet){
        log("receUserMsgKitProcCommand==");
        var netdata = [];
        netdata[0] = S_USER_MSG_KIT_PROC;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("user msg kit proc suc");
            var msgId = packet.readLong();
            var kitTime = packet.readLong();
            netdata[2] = msgId;
            netdata[3] = kitTime;
            log("msgId=="+msgId+"="+kitTime)
        }else{
            var code = packet.readInt();
            var msg = packet.readString();
            log("error code="+code+"|"+msg);
            netdata[2] = code;
            netdata[3] = msg;
        }
        sGameData.mNetDataArray_Game.push(netdata);
        packet.clear();
        packet = null;
    },
    //更改用户信息
    receChangeUserInfoCommand:function(packet){
        log("receChangeUserInfoCommand==");
        var netdata = [];
        netdata[0] = S_CHANGE_USERINFO;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("change userinfo suc");
            var type = packet.readInt();
            var value = packet.readString();
            netdata[2] = type;
            netdata[3] = value;
        }else{
            var code = packet.readInt();
            var msg = packet.readString();
            log("error code="+code+"|"+msg);
            netdata[2] = code;
            netdata[3] = msg;
        }
        sGameData.mNetDataArray_Game.push(netdata);
        packet.clear();
        packet = null;
    },

    //奖品列表  //--未使用
    receStoreListCommand:function(packet){
        log("receStoreListCommand==");
        var netdata = [];
        netdata[0] = S_STORE_LIST;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("StoreList suc");
            var stores = [];
            var num = packet.readInt();
            for(var i=0;i<num;i++){
                var store = {};
                store.id = packet.readLong();
                store.name = packet.readString();
                store.image = packet.readString();
                store.ingot = packet.readInt();
                store.count = packet.readInt();
                store.info = packet.readString();
                stores.push(store)
            }
            netdata[2] = stores;
        }else{
            var code = packet.readInt();
            var msg = packet.readString();
            log("error code="+code+"|"+msg);
            netdata[2] = code;
            netdata[3] = msg;
        }
        sGameData.mNetDataArray_Game.push(netdata);
        packet.clear();
        packet = null;
    },
    //奖品兑换
    receStoreChangeCommand:function(packet){
        log("receStoreChangeCommand==");
        var netdata = [];
        netdata[0] = S_STORE_EXCHANGE;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("StoreChange suc");
            var hardCash = packet.readLong();
            netdata[2] = hardCash;
        }else{
            var code = packet.readInt();
            var msg = packet.readString();
            log("error code="+code+"|"+msg);
            netdata[2] = code;
            netdata[3] = msg;
        }
        sGameData.mNetDataArray_Game.push(netdata);
        packet.clear();
        packet = null;
    },
    //背包中奖品领取
    recePrizeAcceptCommand:function(packet){
        log("recePrizeAcceptCommand==");
        var netdata = [];
        netdata[0] = S_PRIZE_ACCEPT;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("prize accept suc");
            var upid = packet.readInt();
            netdata[2] = upid;
        }else{
            var code = packet.readInt();
            var msg = packet.readString();
            log("error code="+code+"|"+msg);
            netdata[2] = code;
            netdata[3] = msg;
        }
        sGameData.mNetDataArray_Game.push(netdata);
        packet.clear();
        packet = null;
    },
    //奖品兑换纪录
    receStoreChangeLogCommand:function(packet){
        log("receStoreChangeLogCommand==");
        var netdata = [];
        netdata[0] = S_STORE_EXCHANGE_LOG;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("StoreChangelog suc");
            var logs = []
            var count = packet.readInt();
            for(var i=0;i<count;i++){
                var log = {};
                log.id = packet.readLong();
                log.goodsName = packet.readString();
                log.state = packet.readInt();
                log.acceptInfo = packet.readString();
                log.createTime = packet.readLong();
                logs.push(log)
            }
            netdata[2] = logs;
        }else{
            var code = packet.readInt();
            var msg = packet.readString();
            log("error code="+code+"|"+msg);
            netdata[2] = code;
            netdata[3] = msg;
        }
        sGameData.mNetDataArray_Game.push(netdata);
        packet.clear();
        packet = null;
    },
    //游戏任务列表  －－－－已停用
    receTaskListCommand:function(packet){
        log("receTaskListCommand==");
        var netdata = [];
        netdata[0] = S_TASK_LIST;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("task list suc");
            var tasks = [];
            var count = packet.readInt();
            for(var i=0;i<count;i++){
                var task = {};
                task.id = packet.readLong();
                task.taskId = packet.readInt();
                task.taskValue = packet.readInt();
                task.taskValuePara = packet.readString();
                task.state = packet.readInt();
                task.acceptTime = packet.readLong();
                tasks.push(task);
                log("task.id=="+task.id)
                log("task.taskId=="+task.taskId)
                log("task.taskValue=="+task.taskValue)
                log("task.taskValuePara=="+task.taskValuePara)
            }
            netdata[2] = tasks;
        }else{
            var code = packet.readInt();
            var msg = packet.readString();
            log("error code="+code+"|"+msg);
            netdata[2] = code;
            netdata[3] = msg;
        }
        sGameData.mNetDataArray_Game_nowait.push(netdata);
        packet.clear();
        packet = null;
    },
    //排行榜
    receRankListCommand:function(packet){
        log("receRankListCommand==");
        var netdata = [];
        netdata[0] = S_RANK_LIST;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("rank list suc");
            var users = []
            var type = packet.readInt();
            if(type == 1){//金币榜
                var count = packet.readInt();
                log("count="+count+"|"+type);
                for(var i=0;i<count;i++){
                    var user = {};
                    user.rank = i+1;
                    user.id = packet.readLong();
                    user.nickName = packet.readString();
                    user.score = packet.readLong();
                    users.push(user);
                }
            }else if(type == 2){ //比赛冠军
                var count = packet.readInt();
                log("count="+count+"|"+type);
                for(var i=0;i<count;i++){
                    var user = {};
                    user.rank = i+1;
                    user.matchName = packet.readString();
                    user.nickName = packet.readString();
                    //user.createTime = packet.readLong();//add
                    users.push(user);
                }
            }else if(type == 3){ //等级
                var count = packet.readInt();
                log("count="+count+"|"+type);
                for(var i=0;i<count;i++){
                    var user = {};
                    user.rank = i+1;
                    user.id = packet.readLong();
                    user.nickName = packet.readString();
                    user.level = packet.readInt();
                    //user.createTime = packet.readLong();//add
                    users.push(user);
                }
            }else if(type == 4){//每日积分榜
                var count = packet.readInt();
                log("count="+count+"|"+type);
                for(var i=0;i<count;i++){
                    var user = {};
                    user.rank = i+1;
                    user.id = packet.readLong();
                    user.nickName = packet.readString();
                    user.score = packet.readInt();
                    users.push(user);
                    //log("user.id=="+user.id+"|"+user.nickName+"|"+user.score)
                }
            }
            var myrank = packet.readInt();
            netdata[2] = type;
            netdata[3] = users;
            netdata[4] = myrank;
        }else{
            var code = packet.readInt();
            var msg = packet.readString();
            log("error code="+code+"|"+msg);
            netdata[2] = code;
            netdata[3] = msg;
        }
        sGameData.mNetDataArray_Game.push(netdata);
        packet.clear();
        packet = null;
    },
    //绑定手机获取验证码
    receBindMobileGetCodeCommand:function(packet){
        log("receBindMobileGetCodeCommand==");
        var netdata = [];
        netdata[0] = S_BINDMOBILE_GETCODE;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("bind mobile getcode suc");
            var intervalTime = packet.readInt();
            netdata[2] = intervalTime;
        }else{
            var code = packet.readInt();
            var msg = packet.readString();
            log("error code="+code+"|"+msg);
            netdata[2] = code;
            netdata[3] = msg;
        }
        sGameData.mNetDataArray_Game.push(netdata);
        packet.clear();
        packet = null;
    },
    //绑定手机验证验证码
    receBindMobileVerifyCodeCommand:function(packet){
        log("receBindMobileVerifyCodeCommand==");
        var netdata = [];
        netdata[0] = S_BINDMOBILE_VERIFYCODE;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("bind mobile verifycode suc");
            var phone = packet.readString();
            var award = packet.readLong();
            var softcash = packet.readLong();
            netdata[2] = phone;
            netdata[3] = award;
            netdata[4] = softcash;
        }else{
            var code = packet.readInt();
            var msg = packet.readString();
            log("error code="+code+"|"+msg);
            netdata[2] = code;
            netdata[3] = msg;
        }
        sGameData.mNetDataArray_Game.push(netdata);
        packet.clear();
        packet = null;
    },

    //银联获取交易流水号
    receUpmpGetTradeNoCommand:function(packet){
        log("receUpmpGetTradeNoCommand==");
        var netdata = [];
        netdata[0] = S_UPMP_GETTRADENO;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log(" upmp get tradeno suc");
            var tradeno = packet.readString();
            var orderno = packet.readString();
            netdata[2] = tradeno;
            netdata[3] = orderno;
        }else{
            var code = packet.readInt();
            var msg = packet.readString();
            log("error code="+code+"|"+msg);
            netdata[2] = code;
            netdata[3] = msg;
        }
        sGameData.mNetDataArray_Game.push(netdata);
        packet.clear();
        packet = null;
    },
    //比赛 列表
    receMatchListCommand:function(packet){
        log("receMatchListCommand==");
        var netdata = [];
        netdata[0] = S_MATCH_LIST;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("match list suc");
            var matchs = [];
            var matchroomcount = packet.readInt();
            log("matchroomcount="+matchroomcount);
            for(var i=0;i<matchroomcount;i++){
                var match = {}
                match.roomId = packet.readLong();   //matchroomId
                match.openState = packet.readInt(); //开放状态 0不开放
                match.name = packet.readString();   //比赛名称
                match.gameId = packet.readInt();    //游戏id
                match.id = packet.readLong();       //比赛id
                match.ip = packet.readString();     //IP
                match.socketPort = packet.readInt();//端口
                match.websocketPort = packet.readInt();//端口
                match.type = packet.readInt();      //类型： 1定时 2人满
                match.signupGold = packet.readInt();//报名费
                match.playerUpperlimit = packet.readInt();//人数限制
                match.initScore = packet.readInt(); // 初始积分
                match.baseScore = packet.readInt();// 底分
                match.gamedata = packet.readString();//游戏数据“6:2,6:1,3:1” "人数:局数，人数:局数"
                match.prizeInfo = packet.readString();//奖励信息
                match.info = packet.readString();   //比赛信息
                match.sort = packet.readInt();
                match.startTime = packet.readLong();//开始时间
                match.basicPoint = packet.readInt();
                match.enterLowerPoint = packet.readLong();
                match.enterUpperPoint = packet.readLong();
                match.enterLowerLevel = packet.readInt();
                match.enterUpperLevel = packet.readInt();
                match.pic = packet.readString();//图片
                match.currPlayerCount = packet.readInt();//报名人数
                match.userMatchId = packet.readLong();//大于0，表示报名了
                match.matchCount = 0;
                if(match.userMatchId > 0){
                    match.signup = 1;
                }
                matchs.push(match);
                log("match"+i+" = "+match.id+"|"+match.name+"|"+match.roomId+"|"+match.type+"|"+match.userMatchId+"|"+ match.sort)
                log("score"+i+" = "+match.initScore+"|"+match.baseScore+"|"+match.signupGold+"|"+ match.openState+"|count="+match.currPlayerCount)
            }
            netdata[2] = matchs;
        }else{
            var code = packet.readInt();
            var msg = packet.readString();
            log("error code="+code+"|"+msg);
            netdata[2] = code;
            netdata[3] = msg;
        }
        sGameData.mNetDataArray_Game.push(netdata);
        packet.clear();
        packet = null;
    },
    //ddz 比赛 报名  --
    receMatchSignupCommand:function(packet){
        log("receMatchSignupCommand==");
        var netdata = [];
        netdata[0] = S_MATCH_SIGNUP;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("match signup suc");
            //var state = packet.readInt();
            var softcash = packet.readLong();
            var hardcash = packet.readLong();
            var matchId = packet.readLong();
            var matchRoomId = packet.readLong();
            var currPlayerCount = packet.readInt();
            netdata[2] = softcash;
            netdata[3] = hardcash;
            netdata[4] = matchId;
            netdata[5] = matchRoomId;
            netdata[6] = currPlayerCount;
        }else{
            var code = packet.readInt();
            var msg = packet.readString();
            log("error code="+code+"|"+msg);
            netdata[2] = code;
            netdata[3] = msg;
        }
        sGameData.mNetDataArray_Game.push(netdata);
        packet.clear();
        packet = null;
    },
    //比赛取消报名--
    receMatchCancelSignupCommand:function(packet){
        log("receMatchCancelSignupCommand==");
        var netdata = [];
        netdata[0] = S_MATCH_CANCEL_SIGNUP;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("match cancel signup suc");
            var softcash = packet.readLong();
            var hardcash = packet.readLong();
            var matchId = packet.readLong();
            var matchRoomId = packet.readLong();
            var currPlayerCount = packet.readInt();
            netdata[2] = softcash;
            netdata[3] = hardcash;
            netdata[4] = matchId;
            netdata[5] = matchRoomId;
            netdata[6] = currPlayerCount;

        }else{
            var code = packet.readInt();
            var msg = packet.readString();
            log("error code="+code+"|"+msg);
            netdata[2] = code;
            netdata[3] = msg;
        }
        sGameData.mNetDataArray_Game.push(netdata);
        packet.clear();
        packet = null;
    },
    //比赛排名
    receMatchRankCommand:function(packet){
        log("receMatchRankCommand==");
        var netdata = [];
        netdata[0] = S_MATCH_RANK;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("match rank suc");
            var type = packet.readInt();
            var datas = [];
            if(type == 1){
                var len = packet.readInt();
                for(var i=0;i<len;i++){
                    var data = {};
                    data.rank = packet.readInt();
                    data.score = packet.readInt();
                    data.createTime = packet.readLong();
                    datas.push(data)
                }
            }else if(type == 2){
                var len = packet.readInt();
                for(var i=0;i<len;i++){
                    var data = {};
                    data.uid = packet.readLong();
                    data.winnername = packet.readString();
                    data.score = packet.readInt();
                    data.createTime = packet.readLong();
                    datas.push(data)
                }
            }
            netdata[2] = type;
            netdata[3] = datas;
        }else{
            var code = packet.readInt();
            var msg = packet.readString();
            log("error code="+code+"|"+msg);
            netdata[2] = code;
            netdata[3] = msg;
        }
        sGameData.mNetDataArray_Game.push(netdata);
        packet.clear();
        packet = null;
    },
    //比赛 通知 开始
    receMatchNotifyStartCommand:function(packet){
        log("receMatchNotifyStartCommand==");
        var netdata = [];
        netdata[0] = S_MATCH_NOTIFY_START;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("match notify start suc");
            var match = {}
            match.id = packet.readLong();
            match.roomId = packet.readLong();
            match.startTime = packet.readLong();
            match.name = packet.readString();
            match.gameId = packet.readInt();
            match.type = packet.readInt();
            match.prizeInfo = packet.readString();
            match.info = packet.readString();
            match.initScore = packet.readInt(); //初始积分
            match.baseScore = packet.readInt();// 底分
            match.incrScore = packet.readInt();// 每局增加底分
            match.matchCount = packet.readInt();// 比赛局数
            match.entryLowerlimit = packet.readInt();	//报名允许的最小玩家数
            match.entryUpperlimit = packet.readInt();	//报名允许的最大玩家数
            match.basePoint = packet.readInt();
            match.enterPoint = packet.readInt();
            match.candouble = packet.readInt();
            match.blood = packet.readString();
            match.ip = packet.readString();
            match.socketPort = packet.readInt();
            match.websocketPort = packet.readInt();

            log("umatch"+" = "+match.id+"|"+match.name+"|"+match.roomId)
            netdata[2] = match;
        }else{
            var code = packet.readInt();
            var msg = packet.readString();
            log("error code="+code+"|"+msg);
            netdata[2] = code;
            netdata[3] = msg;
        }
        sGameData.mNetDataArray_Game.push(netdata);
        packet.clear();
        packet = null;
    },
    //录像的比赛列表
    receMatchVideoListCommand:function(packet){
        log("receMatchVideoListCommand==");
        var netdata = [];
        netdata[0] = S_MATCH_VIDEO_LIST;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("video list suc");
            var count = packet.readInt();
            log("count=="+count)
            var datas = [];
            for(var i=0;i<count;i++){
                var data = {};
                data.matchId = packet.readLong();
                data.matchRoomId = packet.readLong();
                data.matchName = packet.readString();
                data.openTime = packet.readLong();
                log("matchName="+data.matchName+"|"+data.openTime)
                datas.push(data);
            }
            netdata[2] = datas;
        }else{
            var code = packet.readInt();
            var msg = packet.readString();
            log("error code="+code+"|"+msg);
            netdata[2] = code;
            netdata[3] = msg;
        }
        sGameData.mNetDataArray_Game.push(netdata);
        packet.clear();
        packet = null;
    },
    //某比赛的玩家
    receMatchVideoUsersCommand:function(packet){
        log("receMatchVideoUsersCommand==");
        var netdata = [];
        netdata[0] = S_MATCH_VIDEO_USERS;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log(" video users suc");
            var count = packet.readInt();
            log("count="+count)
            var datas = [];
            for(var i=0;i<count;i++){
                var data = {};
                data.userMatchId = packet.readLong();
                data.userId = packet.readLong();
                data.nickName = packet.readString();
                data.matchScore = packet.readInt();
                data.rank = packet.readInt();
                datas.push(data);
            }
            netdata[2] = datas;
        }else{
            var code = packet.readInt();
            var msg = packet.readString();
            log("error code="+code+"|"+msg);
            netdata[2] = code;
            netdata[3] = msg;
        }
        sGameData.mNetDataArray_Game.push(netdata);
        packet.clear();
        packet = null;
    },
    //某玩家 在 某比赛的 录像记录
    receMatchVideoRecordListCommand:function(packet){
        log("receMatchVideoRecordListCommand==");
        var netdata = [];
        netdata[0] = S_MATCH_VIDEO_RECORD_LIST;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log(" video record list suc");
            var count = packet.readInt();
            var datas = [];
            for(var i=0;i<count;i++){
                var data = {};
                data.userMatchId = packet.readLong();
                data.gameNo = packet.readString();
                data.createTime = packet.readLong();
                datas.push(data);
            }
            netdata[2] = datas;
        }else{
            var code = packet.readInt();
            var msg = packet.readString();
            log("error code="+code+"|"+msg);
            netdata[2] = code;
            netdata[3] = msg;
        }
        sGameData.mNetDataArray_Game.push(netdata);
        packet.clear();
        packet = null;
    },
    //看比赛 录像
    receMatchVideoSeeCommand:function(packet){
        log("receMatchVideoSeeCommand==");
        var netdata = [];
        netdata[0] = S_MATCH_VIDEO_SEE;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("see video suc");
            var data = [];
            data.logId = packet.readLong();
            data.matchId = packet.readLong();
            data.matchRoomId = packet.readLong();
            data.gameNo = packet.readString();
            data.uid0 = packet.readLong();
            data.uid1 = packet.readLong();
            data.uid2 = packet.readLong();
            data.valuelen = packet.readInt();
            data.value = [];
            for(var i=0;i<data.valuelen;i++){
                data.value[i] = packet.readByte();
            }
            log("valuelen=="+data.valuelen);
            //data.value = packet.readString();
            data.createTime = packet.readLong();
            netdata[2] = data;
        }else{
            var code = packet.readInt();
            var msg = packet.readString();
            log("error code="+code+"|"+msg);
            netdata[2] = code;
            netdata[3] = msg;
        }
        sGameData.mNetDataArray_Game.push(netdata);
        packet.clear();
        packet = null;
    },
    //在线玩家 列表（主页 显示）
    receOLPlayerListCommand:function(packet){
        log("receOLPlayerListCommand==");
        var netdata = [];
        netdata[0] = S_OLPLAYER_LIST;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("ol player list suc");
            var count = packet.readInt();
            var olplayers = [];
            log("count=="+count);
            for(var i=0;i<count;i++){
                var olplayer = {};
                olplayer.id = packet.readLong();
                olplayer.nickName = packet.readString();
                olplayer.avatar = packet.readString();
                olplayer.level = packet.readInt();
                olplayer.softCash = packet.readLong();
                olplayer.serverId = packet.readInt();
                olplayer.roomId = packet.readLong();
                olplayer.tableId = packet.readInt();
                olplayers.push(olplayer)
            }
            netdata[2] = olplayers;
        }else{
            var code = packet.readInt();
            var msg = packet.readString();
            log("error code="+code+"|"+msg);
            netdata[2] = code;
            netdata[3] = msg;
        }
        sGameData.mNetDataArray_Game.push(netdata);
        packet.clear();
        packet = null;
    },
    //用户任务 列表
    receUTaskCommand:function(packet){
        log("receUTaskCommand==");
        var netdata = [];
        netdata[0] = S_UTASK_LIST;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("utask suc");
            var count = packet.readInt();
            log("count=="+count)
            var utasks = [];
            for(var i=0;i<count;i++){
                var utask = {};
                utask.id = packet.readLong();
                utask.taskId = packet.readInt();
                utask.taskValue = packet.readInt();
                utask.state = packet.readInt();
                utasks.push(utask);
            }
            netdata[2] = utasks;
        }else{
            var code = packet.readInt();
            var msg = packet.readString();
            log("error code="+code+"|"+msg);
            netdata[2] = code;
            netdata[3] = msg;
        }
        sGameData.mNetDataArray_Game.push(netdata);
        packet.clear();
        packet = null;
    },
    //用户任务奖励
    receUTaskAwardCommand:function(packet){
        log("receUTaskAwardCommand==");
        var netdata = [];
        netdata[0] = S_UTASK_AWARD;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("utask award suc");
            var goodslen = packet.readInt();
            log("goodslen=="+goodslen)
            var goodses = [];
            for(var i = 0;i<goodslen;i++){
                var goods = {};
                goods.type = packet.readInt();
                goods.count = packet.readInt();
                if(goods.type == GOODS_SOFTCASH){
                    var softCash = packet.readLong();
                    goods.data = softCash;
                }else if(goods.type == GOODS_HARDCASH){
                    var hardCash = packet.readLong();
                    goods.data = hardCash;
                }else if(goods.type == GOODS_RPOPS_TYPE){
                    var uProp = {};
                    uProp.id = packet.readLong();
                    uProp.propId = packet.readLong();
                    uProp.remaincount = packet.readInt();
                    uProp.expireTime  = packet.readLong(); //expireTime
                    uProp.count = packet.readInt();
                    goods.data = uProp;
                }else if(goods.type == GOODS_PRIZES_TYPE){
                    var uPrize = {};
                    uPrize.id = packet.readLong();
                    uPrize.prizeId = packet.readLong();
                    goods.data = uPrize;
                }
                goodses.push(goods)
            }
            netdata[2] = goodses;


            var count = packet.readInt();
            log("count=="+count)
            var utasks = [];
            for(var i=0;i<count;i++){
                var utask = {};
                utask.id = packet.readLong();
                utask.taskId = packet.readInt();
                utask.taskValue = packet.readInt();
                utask.state = packet.readInt();
                utasks.push(utask);
            }
            netdata[3] = utasks;

        }else{
            var code = packet.readInt();
            var msg = packet.readString();
            log("error code="+code+"|"+msg);
            netdata[2] = code;
            netdata[3] = msg;
        }
        sGameData.mNetDataArray_Game.push(netdata);
        packet.clear();
        packet = null;
    },
    //积分墙 任务 列表
    receUWallTaskListCommand:function(packet){
        log("receUWallTaskListCommand==");
        var netdata = [];
        netdata[0] = S_WALL_TASK_LIST;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("u wall tasks suc");
            var count = packet.readInt();
            log("count=="+count)
            var walltasks = [];
            for(var i=0;i<count;i++){
                var walltask = {};
                walltask.adertype = packet.readString(); //广告商 类型 “admob”
                walltask.id = packet.readLong();
                walltask.name = packet.readString();
                walltask.gold = packet.readInt();
                walltask.createTime = packet.readLong();
                walltask.state = packet.readInt();
                walltask.getPrizeTime = packet.readLong();
                walltasks.push(walltask)
            }
            netdata[2] = walltasks;
        }else{
            var code = packet.readInt();
            var msg = packet.readString();
            log("error code="+code+"|"+msg);
            netdata[2] = code;
            netdata[3] = msg;
        }
        sGameData.mNetDataArray_Game.push(netdata);
        packet.clear();
        packet = null;
    },
    //积分墙 任务 领奖
    receUWallTaskAwardCommand:function(packet){
        log("receUWallTaskAwardCommand==");
        var netdata = [];
        netdata[0] = S_WALL_TASK_AWARD;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("u wall task award suc");
            var walltask = {};
            walltask.id = packet.readLong();
            walltask.state = packet.readInt();
            walltask.getPrizeTime = packet.readLong();
            var point = packet.readInt();
            var softcash = packet.readLong();
            netdata[2] = walltask;
            netdata[3] = point;
            netdata[4] = softcash;
        }else{
            var code = packet.readInt();
            var msg = packet.readString();
            log("error code="+code+"|"+msg);
            netdata[2] = code;
            netdata[3] = msg;
        }
        sGameData.mNetDataArray_Game.push(netdata);
        packet.clear();
        packet = null;
    },
    //积分墙广告商列表
    receADerWallCommand:function(packet){
        log("receADerWallCommand==");
        var netdata = [];
        netdata[0] = S_ADER_WALL;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("ad wall suc");
            var count = packet.readInt();
            var ads = [];
            for(var i=0;i<count;i++){
                var ad = {};
                ad.id = packet.readLong();
                ad.code = packet.readString();
                ad.name = packet.readString();
                ad.count = packet.readInt();
                ads.push(ad);
            }
            netdata[2] = ads;
        }else{
            var code = packet.readInt();
            var msg = packet.readString();
            log("error code="+code+"|"+msg);
            netdata[2] = code;
            netdata[3] = msg;
        }
        sGameData.mNetDataArray_Game.push(netdata);
        packet.clear();
        packet = null;
    },
    //找回密码
    receRetrievePasswordCommand:function(packet){
        log("receRetrievePasswordCommand==");
        var netdata = [];
        netdata[0] = S_RETRIEVE_PASSWORD;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("get pwd suc");
            var msg = packet.readString();
            netdata[2] = msg;
        }else{
            var code = packet.readInt();
            var msg = packet.readString();
            log("error code="+code+"|"+msg);
            netdata[2] = code;
            netdata[3] = msg;
        }
        sGameData.mNetDataArray_Game.push(netdata);
        packet.clear();
        packet = null;
    },
    receWeixinTaskCommand:function(packet){
        log("receWeixinTaskCommand==");
        var netdata = [];
        netdata[0] = S_WEIXIN_TASK;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("weixin task suc");
            var count = packet.readInt();
            log("count=="+count)
            var utasks = [];
            for(var i=0;i<count;i++){
                var utask = {};
                utask.id = packet.readLong();
                utask.taskId = packet.readInt();
                utask.taskValue = packet.readInt();
                utask.state = packet.readInt();
                utasks.push(utask);
            }
            netdata[2] = utasks;
        }else{
            var code = packet.readInt();
            var msg = packet.readString();
            log("error code="+code+"|"+msg);
            netdata[2] = code;
            netdata[3] = msg;
        }
        sGameData.mNetDataArray_Game.push(netdata);
        packet.clear();
        packet = null;
    },
    receConfigVersionCommand:function(packet){
        log("receConfigVersionCommand==");
        var netdata = [];
        netdata[0] = S_CONFIG_VERSION;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("config version");
            var count = packet.readInt();
            log("count=="+count);
            var cfgdatas = [];
            for(var i = 0; i<count;i++){
                var cfgdata = {};
                cfgdata.name = packet.readString();
                cfgdata.version = packet.readInt();
                var TAG = cfgdata.name;
                log("-----------"+TAG+"=="+cfgdata.version+"-----------")
                var datas = [];
                if(cfgdata.name == CONFIG_N_GAMECONFIG){//ok
                    var len = packet.readInt();
                    for(var k = 0;k<len;k++){
                        var data = {};
                        data.id = packet.readLong();
                        data.keyName = packet.readString();
                        data.value = packet.readString();
                        data.valueType = packet.readString();
                        data.info = packet.readString();
                        data.toClient = 1;
                        data.editLevel = 0;
                        datas.push(data)
                        if(k == len-1) {
                            log(TAG + "==" + data.id + "|" + data.keyName)
                        }
                    }
                }else if(cfgdata.name == CONFIG_N_PRIZE){//ok
                    var len = packet.readInt();
                    for(var k = 0;k<len;k++){
                        var data = {};
                        data.id = packet.readLong();
                        data.name = packet.readString();
                        data.ingot = packet.readInt();
                        data.propsId = packet.readLong();
                        data.propsCount = packet.readInt();
                        data.image = packet.readString();
                        data.info = packet.readString();
                        data.count = packet.readInt();
                        data.state = packet.readInt();
                        data.sort = packet.readInt();
                        data.type = packet.readInt();
                        datas.push(data)
                        if(k == len-1) {
                            log(TAG + "==" + data.id + "|" + data.name)
                        }
                    }
                }else if(cfgdata.name == CONFIG_N_PROPS){//ok
                    var len = packet.readInt();
                    for(var k = 0;k<len;k++){
                        var data = {};
                        data.id = packet.readLong();
                        data.name = packet.readString();
                        data.img = packet.readString();
                        data.price = packet.readInt();
                        data.preprice = packet.readInt();
                        data.value1 = packet.readString();
                        data.value2 = packet.readString();
                        data.info = packet.readString();
                        data.enabled = packet.readInt();
                        data.startTime = packet.readLong();
                        data.endTime = packet.readLong();
                        datas.push(data)
                        if(k == len-1) {
                            log(TAG + "==" + data.id + "|" + data.name)
                        }
                    }
                }else if(cfgdata.name == CONFIG_N_SIGNIN){//ok
                    var len = packet.readInt();
                    for(var k = 0;k<len;k++){
                        var data = {};
                        data.id = packet.readLong();
                        data.name = packet.readString();
                        data.img = packet.readString();
                        data.prizes = packet.readString();
                        data.prizesInfo = packet.readString();
                        datas.push(data)
                        if(k == len-1) {
                            log(TAG+"=="+data.id+"|"+data.name)
                        }
                    }
                }else if(cfgdata.name == CONFIG_N_TASK){
                    var len = packet.readInt();
                    for(var k = 0;k<len;k++){
                        var data = {};
                        data.id = packet.readLong();
                        data.name = packet.readString();
                        data.roomId = packet.readLong();
                        data.img = packet.readString();
                        data.groups = packet.readInt();
                        data.taskType = packet.readInt();
                        data.taskCondition = packet.readInt();
                        data.conditionPara = packet.readString();
                        data.conditionInfo = packet.readString();
                        data.prizes = packet.readString();
                        data.prizesInfo = packet.readString();
                        data.nextId = packet.readInt();
                        data.initTask = packet.readInt();
                        data.endTime = packet.readLong();
                        data.initId = packet.readInt();
                        datas.push(data)
                        if(k == len-1) {
                            log(TAG+"=="+data.id+"|"+data.name)
                        }
                    }
                }else if(cfgdata.name == CONFIG_N_USERLEVEL){//ok
                    var len = packet.readInt();
                    for(var k = 0;k<len;k++){
                        var data = {};
                        data.id = packet.readLong();
                        data.xp = packet.readInt();
                        data.prizes = packet.readString();
                        data.prizesInfo = packet.readString();
                        datas.push(data)
                        if(k == len-1) {
                            log(TAG+"=="+data.id+"|"+data.xp)
                        }
                    }
                }else if(cfgdata.name == CONFIG_N_VIP){//ok
                    var len = packet.readInt();
                    for(var k = 0;k<len;k++){
                        var data = {};
                        data.id = packet.readLong();
                        data.name = packet.readString();
                        var payAmount = packet.readString();
                        data.payAmount = Number(payAmount);
                        data.prizes = packet.readString();
                        data.info = packet.readString();
                        datas.push(data)
                        if(k == len-1){
                            log(TAG+"=="+data.id+"|"+data.name)
                        }
                    }
                }
                cfgdata.datas = datas;
                cfgdatas.push(cfgdata);
            }
            netdata[2] = cfgdatas;
        }else{
            var code = packet.readInt();
            var msg = packet.readString();
            log("error code="+code+"|"+msg);
            netdata[2] = code;
            netdata[3] = msg;
        }
        sGameData.mNetDataArray_Game.push(netdata);
        packet.clear();
        packet = null;
    },
    receUpgradeGuestUserCommand:function(packet){
        log("receUpgradeGuestUserCommand==");
        var netdata = [];
        netdata[0] = S_UPGRADE_GUEST_USER;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("up guest suc");
            var username = packet.readString();
            var nickname = packet.readString();
            var award = packet.readLong();
            var softcash = packet.readLong();

            netdata[2] = username;
            netdata[3] = nickname;
            netdata[4] = award;
            netdata[5] = softcash;
        }else{
            var code = packet.readInt();
            var msg = packet.readString();
            log("error code="+code+"|"+msg);
            netdata[2] = code;
            netdata[3] = msg;
        }
        sGameData.mNetDataArray_Game.push(netdata);
        packet.clear();
        packet = null;
    },

    receWorldMsgCommand:function(packet){
        log("receWorldMsgCommand==");
        var netdata = [];
        netdata[0] = S_WORLD_MSG;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("WorldMsg suc");

        }else{
            var code = packet.readInt();
            var msg = packet.readString();
            log("error code="+code+"|"+msg);
            netdata[2] = code;
            netdata[3] = msg;
        }
        sGameData.mNetDataArray_Game.push(netdata);
        packet.clear();
        packet = null;
    },
    receGameResListCommand:function(packet){
        log("receGameResListCommand==");
        var netdata = [];
        netdata[0] = S_GAME_RES_LIST;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("game res list suc");
            var glen = packet.readInt();
            log("glen=="+glen);
            var datas = [];
            for(var i=0;i<glen;i++){
                var gameId = packet.readInt();
                var rlen = packet.readInt();
                log("gameId=="+gameId);
                log("rlen=="+rlen);
                for(var j=0;j<rlen;j++){
                    var data = new GameResData;
                    data.mGameId = gameId;
                    data.mVersion = packet.readInt();
                    data.mSize = packet.readLong();
                    data.mUrl = packet.readString();
                    datas.push(data)
                    log("data.mVersion="+data.mVersion+"|"+data.mSize+"|"+data.mUrl)
                }
            }
            netdata[2] = datas;
        }else{
            var code = packet.readInt();
            var msg = packet.readString();
            log("error code="+code+"|"+msg);
            netdata[2] = code;
            netdata[3] = msg;
        }
        sGameData.mNetDataArray_Game.push(netdata);
        packet.clear();
        packet = null;
    },
    receGetUserInfoCommand:function(packet){
        log("receGetUserInfoCommand==");
        var netdata = [];
        netdata[0] = S_GET_USERINFO;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("get userinfo suc");
            var type = packet.readInt();
            var value = "";
            netdata[2] = type;
            if(type == 1){
                value = packet.readString();
                netdata[3] = value;
            }else if(type == 2){
                var hasbindalipay = packet.readInt();
                var alipay = "";
                var realname = "";
                if(hasbindalipay == 1){
                    alipay = packet.readString();
                    realname = packet.readString();
                }
                var hasEbankPwd = packet.readInt();
                var ebankCash = packet.readLong();
                netdata[3] = hasbindalipay;
                netdata[4] = alipay;
                netdata[5] = realname;
                netdata[6] = hasEbankPwd;
                netdata[7] = ebankCash;
            }


        }else{
            var code = packet.readInt();
            var msg = packet.readString();
            log("error code="+code+"|"+msg);
            netdata[2] = code;
            netdata[3] = msg;
        }
        sGameData.mNetDataArray_Game.push(netdata);
        packet.clear();
        packet = null;
    },
    receUpgradeForceCommand:function(packet){
        log("receUpgradeForceCommand==");
        var netdata = [];
        netdata[0] = S_UPGRADE_FORCE;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("UpgradeForce suc");
            var upver = packet.readString();
            var forceupver = packet.readString();
            var upmsg = packet.readString();
            var upsize = packet.readLong();
            var upurl = packet.readString();
            netdata[2] = upver;
            netdata[3] = forceupver;
            netdata[4] = upmsg;
            netdata[5] = upsize;
            netdata[6] = upurl;
        }else{
            var code = packet.readInt();
            var msg = packet.readString();
            log("error code="+code+"|"+msg);
            netdata[2] = code;
            netdata[3] = msg;
        }
        sGameData.mNetDataArray_Game.push(netdata);
        packet.clear();
        packet = null;
    },
    receQuestionServiceCommand:function(packet){
        log("receQuestionServiceCommand==");
        var netdata = [];
        netdata[0] = S_QUESTION_SERVICE;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("question service suc");

        }else{
            var code = packet.readInt();
            var msg = packet.readString();
            log("error code="+code+"|"+msg);
            netdata[2] = code;
            netdata[3] = msg;
        }
        sGameData.mNetDataArray_Game.push(netdata);
        packet.clear();
        packet = null;
    },
    receChangeEbankPwdCommand:function(packet){
        log("receChangeEbankPwdCommand==");
        var netdata = [];
        netdata[0] = S_CHANGE_EBANK_PWD;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("change ebank pwd suc");

        }else{
            var code = packet.readInt();
            var msg = packet.readString();
            log("error code="+code+"|"+msg);
            netdata[2] = code;
            netdata[3] = msg;
        }
        sGameData.mNetDataArray_Game.push(netdata);
        packet.clear();
        packet = null;
    },
    receBindAlipayCommand:function(packet){
        log("receBindAlipayCommand==");
        var netdata = [];
        netdata[0] = S_BIND_ALIPAY;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("bind alipay suc");

        }else{
            var code = packet.readInt();
            var msg = packet.readString();
            log("error code="+code+"|"+msg);
            netdata[2] = code;
            netdata[3] = msg;
        }
        sGameData.mNetDataArray_Game.push(netdata);
        packet.clear();
        packet = null;
    },
    receChangeAlipayCommand:function(packet){
        log("receChangeAlipayCommand==");
        var netdata = [];
        netdata[0] = S_CHANGE_ALIPAY;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("change alipay suc");

        }else{
            var code = packet.readInt();
            var msg = packet.readString();
            log("error code="+code+"|"+msg);
            netdata[2] = code;
            netdata[3] = msg;
        }
        sGameData.mNetDataArray_Game.push(netdata);
        packet.clear();
        packet = null;
    },
    receEbankSaveCashCommand:function(packet){
        log("receEbankSaveCashCommand==");
        var netdata = [];
        netdata[0] = S_EBANK_SAVECASH;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("ebank save cash suc");
            var softCash = packet.readLong();
            var ebankCash = packet.readLong();
            netdata[2] = softCash;
            netdata[3] = ebankCash;

        }else{
            var code = packet.readInt();
            var msg = packet.readString();
            log("error code="+code+"|"+msg);
            netdata[2] = code;
            netdata[3] = msg;
        }
        sGameData.mNetDataArray_Game.push(netdata);
        packet.clear();
        packet = null;
    },
    receEbankGetCashCommand:function(packet){
        log("receEbankGetCashCommand==");
        var netdata = [];
        netdata[0] = S_EBANK_GETCASH;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("ebank get cash suc");
            var softCash = packet.readLong();
            var ebankCash = packet.readLong();
            netdata[2] = softCash;
            netdata[3] = ebankCash;
        }else{
            var code = packet.readInt();
            var msg = packet.readString();
            log("error code="+code+"|"+msg);
            netdata[2] = code;
            netdata[3] = msg;
        }
        sGameData.mNetDataArray_Game.push(netdata);
        packet.clear();
        packet = null;
    },
    receChangeCashCommand:function(packet){
        log("receChangeCashCommand==");
        var netdata = [];
        netdata[0] = S_CHANGECASH;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("change cash suc");
            var softCash = packet.readLong();
            netdata[2] = softCash;
        }else{
            var code = packet.readInt();
            var msg = packet.readString();
            log("error code="+code+"|"+msg);
            netdata[2] = code;
            netdata[3] = msg;
        }
        sGameData.mNetDataArray_Game.push(netdata);
        packet.clear();
        packet = null;
    },
    receReqUserInfoCommand:function(packet){
        log("receReqUserInfoCommand==");
        var netdata = [];
        netdata[0] = S_REQ_USER_INFO;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("user info suc");
            var softcash =  packet.readLong();
            var hardcash =  packet.readLong();
            var vip =  packet.readInt();
            netdata[2] = softcash;
            netdata[3] = hardcash;
            netdata[4] = vip;

        }else{
            var code = packet.readInt();
            var msg = packet.readString();
            log("error code="+code+"|"+msg);
            netdata[2] = code;
            netdata[3] = msg;
        }
        sGameData.mNetDataArray_Game.push(netdata);
        packet.clear();
        packet = null;
    },

    /*
    receMobanCommand:function(packet){
        log("receMobanCommand==");
        var netdata = [];
        netdata[0] = S_DZPK_MOBAN;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("moban suc");

        }else{
            var code = packet.readInt();
            var msg = packet.readString();
            log("error code="+code+"|"+msg);
            netdata[2] = code;
            netdata[3] = msg;
        }
        sGameData.mNetDataArray_Game.push(netdata);
        packet.clear();
        packet = null;
    },
    */
    //发送数据
    //发送数据
    sendData:function(packet,servertype,istick){
        if(servertype == null){
            servertype = CONN_SERVER_HALL;
        }

        if(servertype == CONN_SERVER_HALL){
            if(!checkNetConnServer(CONN_SERVER_HALL)){
                sGameData.mIsSendingData = false;
                handleNetConnServerError(CONN_SERVER_HALL);
                return;
            }
        }
        if(istick == null){
            istick = false;
        }
        if (this.mGameSocket&&sGameNetData.mSocketConnected)
        {
            //log("Socket sendData==");
            if(!istick){
                showNetWait(true);
            }
            this.mGameSocket.send(packet.data());
            this.tempTime = (new Date()).getTime();
            if(!istick) {
                sGameData.mIsSendingData = true;
            }
        }else{
            log("Connected=="+sGameNetData.mSocketConnected);
        }
        packet.clear();
        packet = null;
    },
    //检查发送数据状态(防止一直收不到返回数据，导致无法继续操作)
    checkSendDataState:function(){
        if(sGameData.mIsSendingData){
            var now = (new Date()).getTime();
            if(now - this.tempTime > 3*1000){ //3s没回应 默认返回失败 自动重置
                sGameData.mIsSendingData = false;
                if(sGameData.mIsSendEnterRoomIng){
                    sGameData.mIsSendEnterRoomIng = false;
                }
            }
        }
    },
    //****************************
    //****************************



    //****************************
    //****************************

    //注册
    sendReg:function(userName,password,agent,clientVersion,deviceType,deviceName,promoter){
        log("sendReg=="+userName);
        var packet = Packet.create(true);
        packet.writeInt(C_REG);
        packet.writeString(userName);
        packet.writeString(password);
        packet.writeString(agent);
        packet.writeString(clientVersion);
        packet.writeString(deviceType);
        packet.writeString(deviceName);//encodeURI(
        packet.writeString(promoter);
        this.sendData(packet);     
    },

    //登录  类型,0:游客登录, 1:帐号登录, 2:ff平台
    sendLogin:function(type,userName,password,agent,clientVersion,deviceType,deviceName,promoter){
        log("sendLogin=="+type+"|"+userName+"|"+agent+"|"+promoter);
        if(!promoter){
            promoter = agent;
        }
        var packet = Packet.create(true);
        packet.writeInt(C_LOGIN);
        packet.writeInt(type);
        packet.writeString(userName);
        packet.writeString(password);
        packet.writeString(agent);
        packet.writeString(clientVersion);
        packet.writeString(deviceType);
        packet.writeString(deviceName);//encodeURI(
        packet.writeString(promoter);//推广渠道
        this.sendData(packet);     
    },
    //签到
    sendSignin:function(type,count){
        log("sendSignin=");
        var packet = Packet.create(true);
        packet.writeInt(C_SIGNIN);
        packet.writeInt(type);
        packet.writeInt(count);
        this.sendData(packet);
    },
    //关注好友
    sendFriendFollow:function(userId){
        log("sendFriendFollow="+userId);
        var packet = Packet.create(true);
        packet.writeInt(C_FRIEND_FOLLOW);
        packet.writeLong(userId);
        this.sendData(packet);
    },

    //获取好友列表  type: 1我关注的， 2：我的粉丝， 3：双向关注（好友） 现在只处理好友
    sendFriendGetList:function(type){
        log("sendFriendGetList");
        var packet = Packet.create(true);
        packet.writeInt(C_FRIEND_GETLIST);
        packet.writeInt(type);
        this.sendData(packet);
    },
    //搜索用户
    sendSearchUser:function(value){
        log("sendSearchUser="+value);
        var packet = Packet.create(true);
        packet.writeInt(C_SEARCHUSER);
        packet.writeString(value);
        this.sendData(packet);
    },

    //获取消息列表
    sendMsgList:function(){
        log("sendMsgList");
        var packet = Packet.create(true);
        packet.writeInt(C_MSGLIST);
        this.sendData(packet);
    },
    //读取消息
    sendMsgRead:function(msgId){
        log("sendMsgRead");
        var packet = Packet.create(true);
        packet.writeInt(C_MSG_READ);
        packet.writeLong(msgId);
        this.sendData(packet);
    },
    //删除消息
    sendMsgDel:function(msgId){
        log("sendMsgDel="+msgId);
        var packet = Packet.create(true);
        packet.writeInt(C_MSG_DEL);
        packet.writeLong(msgId);
        this.sendData(packet);
    },
    //获取用户道具列表 type 4 道具 5奖品
    sendUPropsList:function(type){
        log("sendUPropsList="+type);
        var packet = Packet.create(true);
        packet.writeInt(C_UPROPSLIST);
        packet.writeInt(type);
        this.sendData(packet);
    },
    // 使用用户道具
    sendUPropsUse:function(upid){
        log("sendUPropsUse");
        var packet = Packet.create(true);
        packet.writeInt(C_UPROPS_USE);
        packet.writeLong(upid);
        this.sendData(packet);
    },
    //获取系统道具列表
    sendPropsList:function(){
        log("sendPropsList");
        var packet = Packet.create(true);
        packet.writeInt(C_PROPS_LIST);
        this.sendData(packet);
    },
    //购买道具
    sendPropsBuy:function(propsId,count){
        log("sendPropsBuy＝"+propsId+"|"+count);
        var packet = Packet.create(true);
        packet.writeInt(C_PROPS_BUY);
        packet.writeLong(propsId);
        packet.writeInt(count);
        this.sendData(packet);
    },
    //充值列表
    sendPayList:function(){
        log("sendPayList");
        var packet = Packet.create(true);
        packet.writeInt(C_PAY_LIST);
        this.sendData(packet);
    },

    //google充值验证
    sendGooglePay:function(orderid,payinfo,purchasedata,dataSignature){
        log("sendGooglePay=="+orderid);
        var packet = Packet.create(true);
        packet.writeInt(C_GOOGLE_PAY);
        packet.writeString(orderid);
        packet.writeString(payinfo);
        packet.writeString(purchasedata);
        packet.writeString(dataSignature);
        this.sendData(packet);
    },
    //充值纪录
    sendPayLog:function(){
        log("sendPayLog");
        var packet = Packet.create(true);
        packet.writeInt(C_PAY_LOG);
        this.sendData(packet);
    },

    //用户消息附件处理
    sendUserMsgKitProc:function(msgId,procType){
        log("sendUserMsgKitProc");
        var packet = Packet.create(true);
        packet.writeInt(C_USER_MSG_KIT_PROC);
        packet.writeLong(msgId);
        packet.writeInt(procType);
        this.sendData(packet);
    },
    //更改用户信息 type 1昵称 2头像  3：性别 , 8:修改口令
    sendChangeUserInfo:function(type,value){
        log("sendChangeUserInfo="+type+"|"+value);
        var packet = Packet.create(true);
        packet.writeInt(C_CHANGE_USERINFO);
        packet.writeInt(type);
        packet.writeString(value);
        this.sendData(packet);
    },

    //获取奖品列表
    sendStoreList:function(){
        log("sendStoreList=");
        var packet = Packet.create(true);
        packet.writeInt(C_STORE_LIST);
        this.sendData(packet);
    },
    //奖品兑换
    sendStoreChange:function(goodId,name,phone,address,postcode){
        log("sendStoreChange=");
        var packet = Packet.create(true);
        packet.writeInt(C_STORE_EXCHANGE);
        packet.writeLong(goodId);
        packet.writeString(name);
        packet.writeString(phone);
        packet.writeString(address);
        packet.writeString(postcode);
        this.sendData(packet);
    },
    //奖品兑换纪录
    sendStoreChangeLog:function(){
        log("sendStoreChangeLog=");
        var packet = Packet.create(true);
        packet.writeInt(C_STORE_EXCHANGE_LOG);
        this.sendData(packet);
    },
    //获取任务列表  －－－－已停用
    sendTaskList:function(type,roomId){
        log("sendTaskList="+type+"|"+roomId);
        var packet = Packet.create(true);
        packet.writeInt(C_TASK_LIST);
        packet.writeInt(type);
        packet.writeLong(roomId);
        this.sendData(packet);
    },
    //背包奖品领取
    sendPrizeAccept:function(uprizeId,name,phone,address,postcode){
        log("sendPrizeAccept=");
        var packet = Packet.create(true);
        packet.writeInt(C_PRIZE_ACCEPT);
        packet.writeLong(uprizeId);
        packet.writeString(name);
        packet.writeString(phone);
        packet.writeString(address);
        packet.writeString(postcode);
        this.sendData(packet);
    },
    //排行榜
    sendRankList:function(type){
        log("sendRankList="+type);
        var packet = Packet.create(true);
        packet.writeInt(C_RANK_LIST);
        packet.writeInt(type);
        this.sendData(packet);
    },
    //绑定手机获取验证码
    sendBindMobileGetCode:function(mobilenumber){
        log("sendBindMobileGetCode="+mobilenumber);
        var packet = Packet.create(true);
        packet.writeInt(C_BINDMOBILE_GETCODE);
        packet.writeString(mobilenumber);
        this.sendData(packet);
    },
    //绑定手机验证验证码
    sendBindMobileVerifyCode:function(code){
        log("sendBindMobileVerifyCode="+code);
        var packet = Packet.create(true);
        packet.writeInt(C_BINDMOBILE_VERIFYCODE);
        packet.writeString(code);
        this.sendData(packet);
    },

    //获取银联交易流水号
    sendUpmpGetTradeNo:function(pid){
        log("sendUpmpGetTradeNo="+pid);
        var packet = Packet.create(true);
        packet.writeInt(C_UPMP_GETTRADENO);
        packet.writeString(pid);
        this.sendData(packet);
    },
    //比赛列表
    sendGetMatchList:function(){
        log("sendGetMatchList=");
        var packet = Packet.create(true);
        packet.writeInt(C_MATCH_LIST);
        this.sendData(packet);
    },
    //比赛 报名 －
    sendMatchSignup:function(matchId,matchRoomId,scoreType){
        log("sendMatchSignup=="+matchId+"|"+matchRoomId+"|"+scoreType);
        var packet = Packet.create(true);
        packet.writeInt(C_MATCH_SIGNUP);
        packet.writeLong(matchRoomId);
        //packet.writeLong(matchId);
        //packet.writeInt(scoreType);
        this.sendData(packet);
    },
    //比赛 取消报名 －
    sendMatchCancelSignup:function(matchId,matchRoomId){
        log("sendMatchCancelSignup=="+matchId+"|"+matchRoomId);
        var packet = Packet.create(true);
        packet.writeInt(C_MATCH_CANCEL_SIGNUP);
        //packet.writeLong(matchId);
        packet.writeLong(matchRoomId);
        this.sendData(packet);
    },
    //有录影的 比赛 列表
    sendMatchVideoList:function(){
        log("sendMatchVideoList==");
        var packet = Packet.create(true);
        packet.writeInt(C_MATCH_VIDEO_LIST);
        this.sendData(packet);
    },
    //某比赛 的 玩家
    sendMatchVideoUsers:function(matchId,matchRoomId){
        log("sendMatchVideoUsers=="+matchId+"|"+matchRoomId);
        var packet = Packet.create(true);
        packet.writeInt(C_MATCH_VIDEO_USERS);
        packet.writeLong(matchId);
        packet.writeLong(matchRoomId);
        this.sendData(packet);
    },
    //某玩家某比赛 的 录影记录
    sendMatchVideoRecordList:function(matchId,matchRoomId,userId){
        log("sendMatchVideoUsers=="+matchId+"|"+matchRoomId+"|"+userId);
        var packet = Packet.create(true);
        packet.writeInt(C_MATCH_VIDEO_RECORD_LIST);
        packet.writeLong(matchId);
        packet.writeLong(matchRoomId);
        packet.writeLong(userId);
        this.sendData(packet);
    },
    //比赛 看 录影
    sendMatchSeeVideo:function(logid){
        log("sendMatchSeeVideo=="+logid);
        var packet = Packet.create(true);
        packet.writeInt(C_MATCH_VIDEO_SEE);
        packet.writeLong(logid);
        this.sendData(packet);
    },
    //在线玩家列表（首页选中几个显示）
    sendOLPlayerList:function(){
        log("sendOLPlayerList==");
        var packet = Packet.create(true);
        packet.writeInt(C_OLPLAYER_LIST);
        this.sendData(packet);
    },
    //用户任务列表
    sendUTaskList:function(){
        log("sendUTaskList==");
        var packet = Packet.create(true);
        packet.writeInt(C_UTASK_LIST);
        this.sendData(packet);
    },
    //用户任务领奖
    sendUTaskAward:function(utaskId){
        log("sendUTaskAward==");
        var packet = Packet.create(true);
        packet.writeInt(C_UTASK_AWARD);
        packet.writeLong(utaskId);
        this.sendData(packet);
    },
    //积分墙任务列表
    sendWallTaskList:function(){
        log("sendWallTaskList==");
        var packet = Packet.create(true);
        packet.writeInt(C_WALL_TASK_LIST);
        this.sendData(packet);
    },
    //积分墙任务领奖
    sendWallTaskAward:function(walltaskId){
        log("sendWallTaskAward==");
        var packet = Packet.create(true);
        packet.writeInt(C_WALL_TASK_AWARD);
        packet.writeLong(walltaskId);
        this.sendData(packet);
    },
    //获取广告商
    sendADerWallList:function(){
        log("sendADWallList==");
        var packet = Packet.create(true);
        packet.writeInt(C_ADER_WALL);
        this.sendData(packet);
    },
    //找回密码 ; //1:通过绑定的手机号， 2：通过绑定的邮箱
    sendRetrievePassword:function(type,value){
        log("sendRetrievePassword==");
        var packet = Packet.create(true);
        packet.writeInt(C_RETRIEVE_PASSWORD);
        packet.writeInt(type);
        packet.writeString(value);
        this.sendData(packet);
    },
    //weixin
    sendWeixinTask:function(utaskId){
        log("sendWeixinTask=="+utaskId);
        var packet = Packet.create(true);
        packet.writeInt(C_WEIXIN_TASK);
        packet.writeLong(utaskId);
        this.sendData(packet);
    },
    sendConfigVersion:function(configs){
        log("sendConfigVersion==");
        var packet = Packet.create(true);
        packet.writeInt(C_CONFIG_VERSION);
        var len = configs.length;
        packet.writeInt(len);
        for(var i = 0;i<len;i++){
            var config = configs[i];
            var name = config[0];
            var ver = config[1];
            packet.writeString(name);
            packet.writeInt(ver);
        }
        this.sendData(packet);
    },
    sendUpgradeGuestUser:function(uname,upwd){
        log("sendUpgradeGuestUser=="+uname);
        var packet = Packet.create(true);
        packet.writeInt(C_UPGRADE_GUEST_USER);
        packet.writeString(uname);
        packet.writeString(upwd);
        this.sendData(packet);
    },

    sendWorldMsg:function(msg){
        log("sendWorldMsg==");
        var packet = Packet.create(true);
        packet.writeInt(C_WORLD_MSG);
        packet.writeString(msg);
        this.sendData(packet);
    },
    sendGameResList:function(mainVersion,datas){
        log("sendGameResList==");
        var packet = Packet.create(true);
        packet.writeInt(C_GAME_RES_LIST);
        packet.writeInt(datas.length);
        for(var i=0;i<datas.length;i++){
            var data = datas[i]
            //log("gameid =="+data[0]+" v="+data[1])
            packet.writeInt(data[0]);
            packet.writeInt(data[1]);
        }
        packet.writeInt(mainVersion);
        this.sendData(packet);
    },
    //获取用户信息 type 1头像  2：获得用户支付宝账号和是否设置了保险箱密码
    sendGetUserInfo:function(uid,type){
        log("sendGetUserInfo=="+type);
        var packet = Packet.create(true);
        packet.writeInt(C_GET_USERINFO);
        packet.writeLong(uid);
        packet.writeInt(type);
        this.sendData(packet);
    },
    //比赛排名 type:1我的战绩;2历届冠军
    sendMatchRank:function(matchId,type){
        log("sendMatchRank=="+matchId+"|"+type);
        var packet = Packet.create(true);
        packet.writeInt(C_MATCH_RANK);
        packet.writeLong(matchId);
        packet.writeInt(type);
        this.sendData(packet);
    },

    sendQuestionService:function(userId,questionType,deviceName,deviceNo,describe,contact){
        log("sendQuestionService==");
        var packet = Packet.create(true);
        packet.writeInt(C_QUESTION_SERVICE);
        packet.writeLong(userId);
        packet.writeInt(questionType);
        packet.writeString(deviceName);
        packet.writeString(deviceNo);
        packet.writeString(describe);
        packet.writeString(contact);
        this.sendData(packet);
    },
    sendChangeEbankPwd:function(oldpwd,newpwd){
        log("sendChangeEbankPwd==");
        var packet = Packet.create(true);
        packet.writeInt(C_CHANGE_EBANK_PWD);
        packet.writeString(oldpwd);
        packet.writeString(newpwd);
        this.sendData(packet);
    },
    sendBindAlipay:function(alipay,name){
        log("sendBindAlipay==");
        var packet = Packet.create(true);
        packet.writeInt(C_BIND_ALIPAY);
        packet.writeString(alipay);
        packet.writeString(name);
        this.sendData(packet);
    },
    sendChangeAlipay:function(oldalipay,alipay,name){
        log("sendChangeAlipay==");
        var packet = Packet.create(true);
        packet.writeInt(C_CHANGE_ALIPAY);
        packet.writeString(oldalipay);
        packet.writeString(alipay);
        packet.writeString(name);
        this.sendData(packet);
    },
    //1:支付宝, 2:微信
    sendChangeCash:function(type,account,cash){
        log("sendChangeCash==");
        var packet = Packet.create(true);
        packet.writeInt(C_CHANGECASH);
        packet.writeLong(cash);
        packet.writeInt(type);
        packet.writeString(account);
        this.sendData(packet);
    },
    sendEbankSaveCash:function(cash){
        log("sendEbankSaveCash==");
        var packet = Packet.create(true);
        packet.writeInt(C_EBANK_SAVECASH);
        packet.writeLong(cash);
        this.sendData(packet);
    },
    sendEbankGetCash:function(cash,pwd){
        log("sendEbankGetCash==");
        var packet = Packet.create(true);
        packet.writeInt(C_EBANK_GETCASH);
        packet.writeLong(cash);
        packet.writeString(pwd);
        this.sendData(packet);
    },
    sendReqUserInfo:function(){
        log("sendReqUserInfo==");
        var packet = Packet.create(true);
        packet.writeInt(C_REQ_USER_INFO);
        this.sendData(packet);
    },


    //显示提示
    showTip:function(msg){
        log("tip=="+msg);
        if(sGameData.netTipLabel!=null&&msg){
            sGameData.netTipLabel.setString(msg);
        }
    }



});

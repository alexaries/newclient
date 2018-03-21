

var C_SERVER_VERIFYSESSION    =  0x00010001;     //认证玩家是否可进入该服务器
var S_SERVER_VERIFYSESSION  	 =  0x00010002;

var C_TICK  =  0x00010003;		//心跳数据
var S_TICK  =  0x00010004;

var S_SCROLLMSG  =  0x00010010; //滚动消息

var C_REQ_PROPS_NUM = 0x00010011;  //请求道具数量
var S_REQ_PROPS_NUM = 0x00010012;

var C_FRIEND_UNFOLLOW = 	0x00010013;	   //取消关注好友
var S_FRIEND_UNFOLLOW = 	0x00010014;

var C_SEND_USER_MSG = 0x00010015;//给用户发送消息
var S_SEND_USER_MSG = 0x00010016;

var S_NOTIFY_OTHER_LOGIN   =  0x00010017; //通知该账号在其他地方登了

var C_FRIEND_START_TALK = 	0x00010018;	   //进入指定好友聊天
var S_FRIEND_START_TALK = 	0x00010019;

var C_FRIEND_SEND_TALK = 	0x0001001A;	   //发送聊天消息
var S_FRIEND_SEND_TALK = 	0x0001001B;


var C_PAY_REQ = 	0x0001001C;	   //请求支付(定额支付)
var S_PAY_REQ = 	0x0001001D;



var S_PAY_NOTICE = 	0x0001001E; // 充值 通知

var C_PAY_QUERY = 0x00010020;//充值(查询)
var S_PAY_QUERY = 0x00010021;

var C_PAY_QUERY_APPSTORE = 0x00010022;//充值(查询) -appstore 专用
var S_PAY_QUERY_APPSTORE = 0x00010023;

var C_INVITE_GAME 			   =  0x10024;		//邀请人游戏
var S_INVITE_GAME 			   =  0x10025;
var S_NOTICE_INVITE_GAME 			   =  0x10026;


var C_REQ_HEEPAY = 	0x00010027;	   //请求支付
var S_REQ_HEEPAY = 	0x00010028;

var C_PAY_REQ_V2 = 	0x00010029;	   //请求支付（不定金额）
var S_PAY_REQ_V2 = 	0x0001002A;

var GameSysNet = cc.Class.extend({

    receSysCommand:function(command,packet){
        switch (command){
            case S_SERVER_VERIFYSESSION:
                this.receServerVerifySessionCommand(packet);
                break;
            case S_NOTIFY_OTHER_LOGIN:
                this.receNotifyOtherLoginCommand(packet);
                break;
            case S_TICK:
                this.receTickCommand(packet);
                break;
            case S_PAY_REQ:
            case S_PAY_REQ_V2:
            case S_REQ_HEEPAY:
                this.recePayReqCommand(packet);
                break;
            case S_PAY_NOTICE:
                this.recePayNoticeCommand(packet);
                break;
            case S_PAY_QUERY:
            case S_PAY_QUERY_APPSTORE:
                this.recePayCommand(packet);
                break;
            case S_SCROLLMSG:
                this.receScrollMsgCommand(packet);
                break;
            case S_FRIEND_UNFOLLOW:
                this.receFriendUnfollowCommand(packet);
                break;
            case S_SEND_USER_MSG:
                this.receSendUserMsgCommand(packet);
                break;
            case S_REQ_PROPS_NUM:
                this.receReqPropsNumCommand(packet);
                break;
            case S_FRIEND_START_TALK:
                this.receFriendStartTalkCommand(packet);
                break;
            case S_FRIEND_SEND_TALK:
                this.receFriendSendTalkCommand(packet);
                break;
            case S_INVITE_GAME:
                this.receInviteGameCommand(packet);
                break;
            case S_NOTICE_INVITE_GAME:
                this.receNoticeInviteGameCommand(packet);
                break;
            default:
                log("unknown command="+command);
                packet.clear();
                packet = null;
                break;
        }
    },
    //切换服务器验证session
    receServerVerifySessionCommand:function(packet){
        log("receServerVerifySessionCommand==");
        var netdata = [];
        netdata[0] = S_SERVER_VERIFYSESSION;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("server session suc");

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
    //请求支付
    recePayReqCommand:function(packet){
        log("recePayReqCommand==");
        var netdata = [];
        netdata[0] = S_PAY_REQ;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("reqpay suc");
            var paydata = packet.readString();
            netdata[2] = paydata;
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
    //支付通知
    recePayNoticeCommand:function(packet){
        log("recePayNoticeCommand==");
        var netdata = [];
        netdata[0] = S_PAY_NOTICE;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("pay notice suc");
            //var orderNo = packet.readString();
            var cash = packet.readLong();
            //netdata[3] = orderNo;
            netdata[2] = cash;
            log("cash=="+cash);
            //endPayVerify();
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
    //充值验证结果
    recePayCommand:function(packet){
        log("recePayCommand==");
        var netdata = [];
        netdata[0] = S_PAY_QUERY;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("pay suc");
            var orderNo = packet.readString();
            var cash = packet.readLong();
            netdata[3] = orderNo;
            netdata[2] = cash;
            log("cash=="+cash);
            endPayVerify();
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
    //通知该帐号在其他地方登陆
    receNotifyOtherLoginCommand:function(packet){
        log("receNotifyOtherLoginCommand==");
        var netdata = [];
        netdata[0] = S_NOTIFY_OTHER_LOGIN;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("notify other login suc");

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

    //心跳
    receTickCommand:function(packet){
        log("receTickCommand==");
        var netdata = [];
        netdata[0] = S_TICK;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("tick suc");
            var count1 = packet.readInt();
            var count2 = packet.readInt();
            var msgs = [];
            for(var i=0;i<count2;i++){
                var msg = packet.readString();
                msgs.push(msg)
            }
            var count3 = packet.readInt();
            var count4 = packet.readInt();
            netdata[2] = count1;
            netdata[3] = count2;
            netdata[4] = msgs;
            netdata[5] = count3;
            netdata[6] = count4;
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
    //滚动消息
    receScrollMsgCommand:function(packet){
        log("receScrollMsgCommand==");
        var netdata = [];
        netdata[0] = S_SCROLLMSG;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("scroll msg suc");
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
    //取消关注
    receFriendUnfollowCommand:function(packet){
        log("receFriendUnfollowCommand==");
        var netdata = [];
        netdata[0] = S_FRIEND_UNFOLLOW;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("FriendunFollow suc");
            var userId = packet.readLong()
            netdata[2] = userId;
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
    //发动用户消息
    receSendUserMsgCommand:function(packet){
        log("receSendUserMsgCommand==");
        var netdata = [];
        netdata[0] = S_SEND_USER_MSG;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("send user msg suc");

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
    receReqPropsNumCommand:function(packet){
        log("receReqPropsNumCommand==");
        var netdata = [];
        netdata[0] = S_REQ_PROPS_NUM;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("req prop num suc");
            var propsId = packet.readInt();
            var value = packet.readLong();
            netdata[2] = propsId;
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
    //开始与好友聊天
    receFriendStartTalkCommand:function(packet){
        log("receFriendStartTalkCommand==");
        var netdata = [];
        netdata[0] = S_FRIEND_START_TALK;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("Friend start talk suc");
            var count = packet.readInt();
            var msgdatas = [];
            for(var i=0;i<count;i++){
                var data = packet.readString(); //聊天留言数据 （msgId:sendUserId:receiveId:createTime:msg）
                msgdatas[i] = data
            }
            log("count=="+count);
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
    //给好友发送消息
    receFriendSendTalkCommand:function(packet){
        log("receFriendSendTalkCommand==");
        var netdata = [];
        netdata[0] = S_FRIEND_SEND_TALK;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("Friend send talk suc");
            var count = packet.readInt();
            var msgdatas = [];
            for(var i=0;i<count;i++){
                var data = packet.readString(); //聊天留言数据 （msgId:sendUserId:receiveId:createTime:msg）
                msgdatas[i] = data
            }
            log("count=="+count);
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
    receInviteGameCommand:function(packet){
        log("receInviteGameCommand==");
        var netdata = [];
        netdata[0] = S_INVITE_GAME;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("invite suc");
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
    receNoticeInviteGameCommand:function(packet){
        log("receNoticeInviteGameCommand==");
        var netdata = [];
        netdata[0] = S_NOTICE_INVITE_GAME;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("notice invite suc");
            var roomId = packet.readLong();
            var msg = packet.readString();
            log("roomId=="+roomId);
            netdata[2] = roomId;
            netdata[3] = msg;
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
    sendData:function(packet,servertype,istick) {

    },
    sendSysData:function(packet,istick){
        this.sendData(packet,CONN_SERVER_ANY,istick);
    },
    //切换服务器验证session
    sendServerVerifySession:function(session){
        log("sendServerVerifySession="+session);
        var packet = Packet.create(true);
        packet.writeInt(C_SERVER_VERIFYSESSION);
        packet.writeString(session);
        this.sendSysData(packet);
    },

    //发送心跳
    sendTick:function(currNotifyId){
        log("sendTick="+currNotifyId);
        var packet = Packet.create(true);
        packet.writeInt(C_TICK);
        packet.writeInt(currNotifyId);
        this.sendSysData(packet,true);
    },
    sendReqPropsNum:function(propsId){
        log("sendReqPropsNum==");
        var packet = Packet.create(true);
        packet.writeInt(C_REQ_PROPS_NUM);
        packet.writeInt(propsId);
        this.sendSysData(packet);
    },

    //取消关注好友
    sendFriendUnfollow:function(userId){
        log("sendFriendUnfollow");
        var packet = Packet.create(true);
        packet.writeInt(C_FRIEND_UNFOLLOW);
        packet.writeLong(userId);
        this.sendSysData(packet);
    },
    //type
    //消息附件 //数据格式为(propsType:count或id; propsType:count或id)
    sendSendUserMsg:function(userId,type,msg,kitData){
        log("sendSendUserMsg");
        var packet = Packet.create(true);
        packet.writeInt(C_SEND_USER_MSG);
        packet.writeLong(userId);
        packet.writeInt(type);
        packet.writeString(msg);
        packet.writeString(kitData);
        this.sendSysData(packet);
    },
    //同好友开始聊天
    sendFriendStartTalk:function(userId){
        log("sendFriendStartTalk="+userId);
        var packet = Packet.create(true);
        packet.writeInt(C_FRIEND_START_TALK);
        packet.writeLong(userId);
        this.sendSysData(packet);
    },
    //给好友发送聊天信息
    sendFriendSendTalk:function(userId,msg,msgId){
        log("sendFriendSendTalk="+userId+"|"+msgId);
        var packet = Packet.create(true);
        packet.writeInt(C_FRIEND_SEND_TALK);
        packet.writeLong(userId);
        packet.writeString(msg);
        packet.writeLong(msgId);
        this.sendSysData(packet);
    },
    sendReqPay:function(channel,payId){
        log("sendReqPay=="+channel+"|"+payId);
        var packet = Packet.create(true);
        packet.writeInt(C_PAY_REQ);
        packet.writeInt(channel);
        packet.writeInt(payId);
        packet.writeString("");
        this.sendSysData(packet);
    },

    //充值验证
    //other orderid:orderid  paratemter:pid
    sendPay:function(channel,orderid){
        log("sendPay=="+orderid);
        var packet = Packet.create(true);
        packet.writeInt(C_PAY_QUERY);
        packet.writeString(orderid);
        packet.writeInt(channel);
        this.sendSysData(packet);
    },
    //appstore orderid:pid paratemter:msg
    sendPayAppStore:function(orderid,paratemter){
        log("sendPayAppStore=="+orderid);
        var packet = Packet.create(true);
        packet.writeInt(C_PAY_QUERY_APPSTORE);
        packet.writeString(orderid);
        packet.writeString(paratemter);
        this.sendSysData(packet);
    },
    sendReqHeePay:function(paytype,money){
        log("sendReqHeePay=="+paytype+"|"+money);
        var packet = Packet.create(true);
        packet.writeInt(C_REQ_HEEPAY);
        packet.writeInt(money);
        packet.writeString(""+paytype);
        this.sendSysData(packet);
    },
    sendReqPayV2:function(channel,paras){
        log("sendReqPayV2=="+channel+"|"+paras);
        var packet = Packet.create(true);
        packet.writeInt(C_PAY_REQ_V2);
        packet.writeInt(channel);
        packet.writeString(""+paras);
        this.sendSysData(packet);
    },
    sendInviteGame:function(msg){
        if(!msg){
            msg = "2缺1，速度来战！";
        }
        log("sendInviteGame==");
        var packet = Packet.create(true);
        packet.writeInt(C_INVITE_GAME);
        packet.writeString(msg);
        this.sendSysData(packet);
    }


});

var T_NEW_COMMAND = 0x00060000;//扎金花指令类型

var C_NEW_ENTERROOM = 0x00060001
var S_NEW_ENTERROOM = 0x00060002

var GameNEWNet = cc.Class.extend({

    receNEWCommand:function(command,packet){
        switch (command){
            case S_NEW_ENTERROOM:
                this.receNEWEnterRoomCommand(packet);
                break;
            default:
                cc.log("unknown command="+command);
                packet.clear();
                packet = null;
                break;
        }
    },
    receNEWEnterRoomCommand:function(packet){
        cc.log("receNEWEnterRoomCommand==");
        var netdata = [];
        netdata[0] = S_NEW_ENTERROOM;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            cc.log("moban suc");

        }else{
            var code = packet.readInt();
            var msg = packet.readString();
            cc.log("error code="+code+"|"+msg);
            netdata[2] = code;
            netdata[3] = msg;
        }
        sGameData.mNetDataArray_Game.push(netdata);
        packet.clear();
        packet = null;
    },
    sendData:function(packet){
        sGameData.mGameNet.sendData(packet);
    },
    sendNEWEnterRoom:function(roomId,session){
        cc.log("sendGAMEEnterRoom=="+roomId+"|"+session);
        var packet = Packet.create(true);
        packet.writeInt(C_NEW_ENTERROOM);
        packet.writeInt(roomId);
        packet.writeString(session);
        this.sendData(packet);
    }


});
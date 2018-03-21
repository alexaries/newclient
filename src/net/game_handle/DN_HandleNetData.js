/**
 * Created by apple on 15-12-22.
 *  * //在多个场景都使用的指令，放到这个文件。（如进入房间、退出房间等）
 * //只在游戏场景使用的，放在XXXGameScene的 updateOnLoadDataInGame 里 （具体的游戏指令，如投注、游戏开始等）
 */

var DN_HandleNetData = cc.Class.extend({
    //通知 dn 指令
    noticeDNCommand:function(netdata,baseScene){
        var command = netdata[0];
        switch (command){
            case S_DN_ENTERROOM:
                this.noticeDNEnterRoom(netdata);
                break;
            case S_DN_EXITROOM:
                this.noticeDNExitRoom(netdata);
                break;
            case S_DN_REFRESH_ROOM:
                this.noticeDNRefreshRoom(netdata);
                break;
            case S_DN_ENTERTABLE:
                this.noticeDNEnterTable(netdata);
                break;
            case S_DN_RANDOM_ENTERTABLE:
                this.noticeDNRandomEnterTable(netdata);
                break;
            case S_DN_EXITTABLE:
                this.noticeDNExitTable(netdata);
                break;
            case S_DN_CONTINUE:
                this.noticeDNContinue(netdata);
                break;
            case S_DN_INGOT_AWARD_NOTIFY:
                baseScene.noticeGameIngotAwardNotify(netdata);
                break;
            default:
                baseScene.updateOnLoadDataInGame(netdata);
                break;
        }
    },
    //通知 dn 刷新房间
    noticeDNRefreshRoom:function(netdata){
        log("noticeDNRefreshRoom")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            var tables = netdata[2];
            for(var i = 0;i<tables.length;i++){
                var thetable = tables[i];
                var tableId = thetable.id
                var table = getDataById(sGameData.mShowTablesList, tableId);
                if (table) {
                    table = thetable;
                }else{
                    sGameData.mShowTablesList.push(thetable);
                }
            }
            //sGameData.mShowTablesList = tables;
            if(sGameData.mCurrLayer == sGameData.mHallListLayer){
                sGameData.mHallListLayer.reflushRoomData();
            }else if(sGameData.mCurrLayer == sGameData.mHallTableLayer){
                sGameData.mHallTableLayer.reflushRoomData(1);
            }

        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
        sGameData.mIsSendEnterRoomIng = false;
    },
    //通知 dn 进入房间
    noticeDNEnterRoom:function(netdata){
        log("noticeDNEnterRoom")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            var state = netdata[2];
            var tables = netdata[3];
            sGameData.mShowTablesList = tables;
            if(sGameData.mUseRandomSit){
                if(state == 0){ //0 后面没有 进入桌子指令
                    sGameNetData.mDNNet.sendDNRandomEnterTable(-1);
                }else{//1 后面有 进入桌子指令
                    log("re enter-----"+sGameData.mUser.onLineRoomId+"|"+sGameData.mCurrRoom.roomId)
                    var room = sGameData.mCurrRoom;
                    if(room.roomId == sGameData.mUser.onLineRoomId){
                        var table = getDataById(sGameData.mShowTablesList,sGameData.mUser.onLineTableId);
                        if(table){
                            sGameData.mCurrTable =  table
                        }
                    }
                    sGameData.mUser.onLineRoomId = -1;
                    sGameData.mUser.onLineTableId = -1;
                }
            }else {
                if (sGameData.mCurrLayer == sGameData.mHallRoomLayer) {
                    gotoHallShowTable();
                } else if (sGameData.mCurrLayer == sGameData.mHallListLayer) {
                    sGameData.mHallListLayer.reflushRoomData();
                } else if (sGameData.mCurrLayer == sGameData.mHallTableLayer) {
                    sGameData.mHallTableLayer.reflushRoomData();
                } else if (sGameData.mCurrLayer == sGameData.mFriendSearchLayer) {
                    gotoHallShowTable();
                } else if (sGameData.mCurrLayer == sGameData.mMainLayer) {
                    gotoHallShowTable();
                }
            }

        }else{
            var code = netdata[2];
            var msg = netdata[3];
            sGameData.mCurrRoom = null;
            showNotice(sResWord.w_notice,msg,13)
            //showLittleNotice(msg);
            //connectHallWhenExitRoom();
            //if(sGameData.mCurrScene == sGameData.mDNGameScene) {
            //    goToMainFromGame();
            //}
        }
        sGameData.mIsSendEnterRoomIng = false;
    },
    //通知 dn 退出房间
    noticeDNExitRoom:function(netdata){
        log("noticeDNExitRoom")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            if(sGameData.mIsQuitByInviteGame){
                var room = sGameData.mCurrInviteRoom;
                sGameData.mCurrRoom = room;
                sGameData.mCurrGameType = room.gameId;
                if(sGameData.mIsSameGameByInviteGame) {
                    if (!sGameData.mIsSendEnterRoomIng) {
                        sGameData.mIsSendEnterRoomIng = true;
                        sGameData.mGameNet.reConnect(room.ipAddress, room.websocketPort, 1);
                    }
                }else{
                    sGameData.mSendDataTypeInGame = 0;
                    sGameData.mIsEnterGameing = true;
                    gotoGameScene(room.gameId);
                }
                sGameData.mIsQuitByInviteGame = false;
                sGameData.mIsSameGameByInviteGame = false;
            }else {
                if (sGameData.mUseRandomSit) {
                    goToMainFromGame();
                } else {
                    goToMainFromHall(GAME_TYPE_DN)
                }
            }
        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
            if(sGameData.mIsQuitByInviteGame){
                sGameData.mIsQuitByInviteGame = false;
                sGameData.mIsSameGameByInviteGame = false;
            }
        }
    },
    //通知 dn 进入桌子
    noticeDNEnterTable:function(netdata){
        log("noticeDNEnterTable")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            sGameData.mEnterTableRandom = false;
            sGameData.mEnterTableData = netdata;
            if(sGameData.mCurrScene != sGameData.mDNGameScene) {
                gotoGameDN();
            }else{
                sGameData.mDNLayer.handleEnterTableDataInGame();
            }
        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },
    //通知 dn 进入桌子 随机坐下
    noticeDNRandomEnterTable:function(netdata){
        log("noticeDNRandomEnterTable")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            sGameData.mEnterTableRandom = true;
            sGameData.mEnterTableData = netdata;
            if(sGameData.mCurrScene != sGameData.mDNGameScene) {
                gotoGameDN();
            }else{
                sGameData.mDNLayer.handleEnterTableDataInGame();
                sGameData.mChangeTableByRandom = false;
            }
        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },

    //通知 退出桌子
    noticeDNExitTable:function(netdata){
        log("noticeDNExitTable")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            if(!sGameData.mChangeTableByRandom) {
                goToMainFromGame();
            }
        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },

    //通知 dn 继续游戏
    noticeDNContinue:function(netdata){
        log("noticeDNContinue")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            if(sGameData.mCurrLayer == sGameData.mDNLayer){
                sGameData.mDNLayer.mShowOPView.showOPImage(0,12);
            }
        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    }

});
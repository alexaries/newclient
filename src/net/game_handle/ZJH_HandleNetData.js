/**
 * Created by apple on 15-12-22.
 *  * //在多个场景都使用的指令，放到这个文件。（如进入房间、退出房间等）
 * //只在游戏场景使用的，放在XXXGameScene的 updateOnLoadDataInGame 里 （具体的游戏指令，如投注、游戏开始等）
 */

var ZJH_HandleNetData = cc.Class.extend({
    //通知 zjh 指令
    noticeZJHCommand:function(netdata,baseScene){
        var command = netdata[0];
        switch (command){
            case S_ZJH_REFRESH_ROOM:
                this.noticeZJHRefreshRoom(netdata);
                break;
            case S_ZJH_ENTERROOM:
                this.noticeZJHEnterRoom(netdata);
                break;
            case S_ZJH_EXITROOM:
                this.noticeZJHExitRoom(netdata);
                break;
            case S_ZJH_ENTERTABLE:
                this.noticeZJHEnterTable(netdata);
                break;
            case S_ZJH_RANDOM_ENTERTABLE:
                this.noticeZJHRandomEnterTable(netdata);
                break;
            case S_ZJH_EXITTABLE:
                this.noticeZJHExitTable(netdata);
                break;
            case S_ZJH_CONTINUE:
                this.noticeZJHContinue(netdata);
                break;
            case S_ZJH_INGOT_AWARD_NOTIFY:
                baseScene.noticeGameIngotAwardNotify(netdata);
                break;
            default:
                baseScene.updateOnLoadDataInGame(netdata);
                break;
        }
    },
    //通知 zjh 刷新房间
    noticeZJHRefreshRoom:function(netdata){
        log("noticeZJHRefreshRoom")
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
    //通知 zjh 进入房间
    noticeZJHEnterRoom:function(netdata){
        log("noticeZJHEnterRoom")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            var state = netdata[2];
            var roomType = netdata[3];

            sGameData.mCurrRoom.roomType = roomType;

            if(roomType == ROOM_ZI_JIAN_TYPE) {
                var tables = netdata[4];
                sGameData.mShowTablesList = tables;
            }else{
                var table = netdata[4];
                sGameData.mCurrRoom.baseTable = table;
            }

            if(sGameData.mUseRandomSit){
                if(state == 0){ //0 后面没有 进入桌子指令
                    sGameNetData.mZJHNet.sendZJHRandomEnterTable(-1);
                }else{ //1 后面有 进入桌子指令
                    log("re enter-----" + sGameData.mUser.onLineRoomId + "|" + sGameData.mCurrRoom.roomId)
                    var room = sGameData.mCurrRoom;
                    if (room.roomId == sGameData.mUser.onLineRoomId) {
                        if(roomType == ROOM_ZI_JIAN_TYPE) {
                            var table = getDataById(sGameData.mShowTablesList, sGameData.mUser.onLineTableId);
                            sGameData.mCurrTable = table
                        }else{
                            sGameData.mCurrTable = sGameData.mCurrRoom.baseTable;
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
            //if(sGameData.mCurrScene == sGameData.mZJHGameScene) {
            //    goToMainFromGame();
            //}
        }
        sGameData.mIsSendEnterRoomIng = false;
    },
    //通知 zjh 退出房间
    noticeZJHExitRoom:function(netdata){
        log("noticeZJHExitRoom")
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
            }else{
                if(sGameData.mUseRandomSit) {
                    goToMainFromGame();
                }else {
                    goToMainFromHall(GAME_TYPE_ZJH)
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
    //通知 zjh 进入桌子
    noticeZJHEnterTable:function(netdata){
        log("noticeZJHEnterTable")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            sGameData.mEnterTableRandom = false;
            sGameData.mEnterTableData = netdata;
            if(sGameData.mCurrScene != sGameData.mZJHGameScene) {
                gotoGameZJH();
            }else{
                sGameData.mZJHLayer.handleEnterTableDataInGame();
            }
        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },
    //通知 zjh 进入桌子 随机坐下
    noticeZJHRandomEnterTable:function(netdata){
        log("noticeZJHRandomEnterTable")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            sGameData.mEnterTableRandom = true;
            sGameData.mEnterTableData = netdata;
            if(sGameData.mCurrScene != sGameData.mZJHGameScene) {
                gotoGameZJH();
            }else{
                sGameData.mZJHLayer.handleEnterTableDataInGame();
                sGameData.mChangeTableByRandom = false;
            }
        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },
    //通知zjh 退出桌子
    noticeZJHExitTable:function(netdata){
        log("noticeZJHExitTable")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            //if(!sGameData.mChangeTableByRandom){
            //    goToMainFromGame();
            //}
            if(sGameData.mExitRoomToMain){
                goToMainFromGame();
            }
        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },
    //通知 zjh 继续游戏
    noticeZJHContinue:function(netdata){
        log("noticeZJHContinue")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            if(sGameData.mCurrLayer == sGameData.mZJHLayer){
                sGameData.mExitRoomToMain = true;
                sGameData.mZJHLayer.mShowOPView.showOPImage(0,6);
                sGameData.mZJHLayer.mShowCardType.showTypeImage(0,30);
                SoundManager.playSound(res.zjh_readybtn_mp3);
            }
        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    }

});
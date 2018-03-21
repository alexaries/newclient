/**
 * Created by apple on 15-12-22.
 *  * //在多个场景都使用的指令，放到这个文件。（如进入房间、退出房间等）
 * //只在游戏场景使用的，放在XXXGameScene的 updateOnLoadDataInGame 里 （具体的游戏指令，如投注、游戏开始等）
 */

var DDZ_HandleNetData = cc.Class.extend({


    //通知 ddz 指令
    noticeDDZCommand:function(netdata,baseScene){
        var command = netdata[0];
        switch (command){
            case S_DDZ_ENTERROOM:
                this.noticeDDZEnterRoom(netdata);
                break;
            case S_DDZ_EXITROOM:
                this.noticeDDZExitRoom(netdata);
                break;
            case S_DDZ_CONTINUE:
                this.noticeDDZContinue(netdata);
                break;
            case S_DDZ_INGOT_AWARD_NOTIFY:
                baseScene.noticeGameIngotAwardNotify(netdata);
                break;
            case S_ENTER_QUEUE:
                this.noticeDDZEnterQueue(netdata);
                break;
            default:
                baseScene.updateOnLoadDataInGame(netdata);
                break;
        }
    },
    //通知 ddz 进入房间
    noticeDDZEnterRoom:function(netdata){
        log("noticeDDZEnterRoom")
        var flag = netdata[1];
        var isNeedSqueue = netdata[2];
        log("noticeDDZEnterRoom flag = " + flag);
        log("noticeDDZEnterRoom isNeedSqueue = " + isNeedSqueue);
        if(flag == NET_SUCCESS){
            if(isNeedSqueue == 2){
                //显示新手房对话框
                var msgInfo = netdata[3];
                log("noticeDDZEnterRoom msgInfo = " + msgInfo);
                showNotice(sResWord.w_notice,msgInfo,16)
                sGameData.mIsSendEnterRoomIng = false;
                return;
            }
            if(sGameData.mCurrScene != sGameData.mDDZGameScene) {
                gotoGameDDZ();
            }
            sGameData.mIsEnterGameing = true;
        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showNotice(sResWord.w_notice,msg,13)
            //showLittleNotice(msg);
            //connectHallWhenExitRoom();
            //if(sGameData.mCurrScene == sGameData.mDDZGameScene) {
            //    goToMainFromGame();
            //}
        }
        sGameData.mIsSendEnterRoomIng = false;
    },

    noticeDDZEnterQueue:function(netdata){
        log("noticeDDZEnterQueue")
        if(sGameData.mCurrScene != sGameData.mDDZGameScene) {
            gotoGameDDZ();
        }
        sGameData.mIsEnterGameing = true;

    },


    //通知 ddz 退出房间
    noticeDDZExitRoom:function(netdata){
        log("noticeDDZExitRoom")
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
                goToMainFromGame();
                sGameData.mIsEnterGameing = false;
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
    //通知 ddz 继续游戏
    noticeDDZContinue:function(netdata){
        log("noticeDDZContinue")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            if(sGameData.mCurrLayer == sGameData.mDDZLayer){
                sGameData.mDDZLayer.reInitDataUI();
            }
        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    }
});
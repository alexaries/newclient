/**
 * Created by apple on 16/2/1.
 */
//根据渠道设置 界面
var setViewInfoByAgent = function() {
    log("setVersionInfoByAgent==="+sGameData.mAppVersionFor+"|"+sGameData.mAgent);

    sGameData.mHallLogoPic = res.hall_logo_png;

    if(sGameData.mAgent == AGENT_APPLE){//设置 功能
        log("agent---apple") //


    }

    if(sGameData.mAgent == AGENT_DUOLE){//设置 功能
        log("agent---duole") //

        if(sGameData.mAppIsSubmitToAppStore){
            //sGameData.mShowGames = [GAME_TYPE_DDZ];
            //sGameData.mShowGames = [GAME_TYPE_ZJH];
            //sGameData.mShowGames = [GAME_TYPE_DN];
        }
    }

    if(sGameData.mAgent == AGENT_DUOLEPAY){//设置 功能
        log("agent---duolepay") //
        if(sGameData.mAppIsSubmitToAppStore){
            sGameData.mShowGames = [GAME_TYPE_DDZ];
        }
    }



}
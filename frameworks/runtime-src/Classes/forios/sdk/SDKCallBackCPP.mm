//
//  SDKCallBack.cpp
//  shuihu_downjoy
//
//  Created by apple on 14-3-20.
//
//

#include "SDKCallBackCPP.h"
SDKCallBackCPP::SDKCallBackCPP(void)
{
    
}

SDKCallBackCPP::~SDKCallBackCPP(void)
{
    
}
void SDKCallBackCPP::init()
{
    CCLOG("SDKCallBackCPP--Init");
}
//code 1成功 2失败  3取消
void SDKCallBackCPP::loginCallBack(int code,std::string uid,std::string token){
    CCLOG("SDKCallBackCPP--loginCallBack");
    if(code == 1){
        CCLog("code = %d uid=  %s  token = %s",code,uid.c_str(),token.c_str());
        
        sGlobal->mHasGetUserFromSDK = true;
        sGlobal->mCanLoginGameForSDK = true;
        sGlobal->mUid_SDK = uid;
        sGlobal->mSession_SDK = token;

    }else if(code == 3){
        CCLog("ios cancel login");
        sGlobal->mDoQuitGameBySDK = true;
    }else{
        CCLog("ios login fail");
    }
    
}
//code 1成功 2失败
void SDKCallBackCPP::payCallBack(int code,std::string orderno){
    CCLOG("SDKCallBackCPP--payCallBack");
    CCLog("code = %d orderno=  %s ",code,orderno.c_str());
    if(code == 1){

        
//        int zoneid = sGlobal->mCurrZoneId_pay;
//        int64_t uid = sGlobal->mUserId_pay;
//        sGlobal->mSqliteManager->insertPaylog(zoneid,uid,"",orderno,"", PAYSTATE_VERIFY);
    }
}
void SDKCallBackCPP::logoutCallBack(){
    CCLOG("SDKCallBackCPP--logoutCallBack");

}
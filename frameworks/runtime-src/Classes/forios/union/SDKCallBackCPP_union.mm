//
//  SDKCallBack.cpp
//  shuihu_downjoy
//
//  Created by apple on 14-3-20.
//
//

#include "SDKCallBackCPP_union.h"
SDKCallBackCPP_union::SDKCallBackCPP_union(void)
{
    
}

SDKCallBackCPP_union::~SDKCallBackCPP_union(void)
{
    
}
void SDKCallBackCPP_union::init()
{
    CCLOG("SDKCallBackCPP_union--Init");
}

//code 1成功 2失败
void SDKCallBackCPP_union::payCallBack(int code,std::string orderno){
    CCLOG("SDKCallBackCPP--payCallBack");
    CCLog("code = %d orderno=  %s ",code,orderno.c_str());
    if(code == 1){ //成功
        string msg = "";
        sGlobal->mCallJS->payok(orderno,msg);
        
        int zoneid = sGlobal->mCurrZoneId_pay;
        int64_t uid = sGlobal->mUserId_pay;
        sGlobal->mSqliteManager->insertPaylog(zoneid,uid,"",orderno,msg, PAYSTATE_VERIFY);
    }
}

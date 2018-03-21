//
//  PurchaseCallBackCPP.cpp
//  gamesanguo
//
//  Created by apple on 13-3-20.
//
//

#include "PurchaseCallBackCPP.h"
#include "Header.h"

PurchaseCallBackCPP::PurchaseCallBackCPP(void)
{
    
}

PurchaseCallBackCPP::~PurchaseCallBackCPP(void)
{
    
}
void PurchaseCallBackCPP::init()
{
    CCLOG("PurchaseCallBackCPP--Init");
}
void PurchaseCallBackCPP::failCallBack(std::string pid)
{
    CCLOG("PurchaseCallBackCPP--failCallBack=%s",pid.c_str());
    //if(sGlobal->mMainScene){
    //    sGlobal->mMainScene->showNotice(sResWord->w_paytip, sResWord->w_pay_unfinish,0,0);
    //}
    sGlobal->mGameLogic->showSysNotice(sResWord->w_pay_unfinish);
}
void PurchaseCallBackCPP::successCallBack(std::string pid)
{
    CCLOG("PurchaseCallBackCPP--successCallBack=%s",pid.c_str());
    //sGlobal->mMainScene->showNotice("充值成功", "充值成功");
}
void PurchaseCallBackCPP::restoreCallBack(std::string pid)
{
    CCLOG("PurchaseCallBackCPP--restoreCallBack=%s",pid.c_str());
    //sGlobal->mMainScene->showNotice("充值恢复", "充值恢复");
}
void PurchaseCallBackCPP::sendToServerCallBack(std::string pid,std::string msg)
{
    CCLOG("PurchaseCallBackCPP--sendToServerCallBack=%s",pid.c_str());
    //CCLOG("msg--%s",msg.c_str());

    string orderno = pid;//sGlobal->mGameLogic->makeOrderNo();
    
    sGlobal->mCallJS->payok(orderno,msg);
        
    int zoneid = sGlobal->mCurrZoneId_pay;
    int64_t uid = sGlobal->mUserId_pay;
    sGlobal->mSqliteManager->insertPaylog(zoneid,uid,pid,orderno,msg, PAYSTATE_VERIFY);
    
 
}
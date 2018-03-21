//
//  SDKCallBack.cpp
//  shuihu_downjoy
//
//  Created by apple on 14-3-20.
//
//

#include "AvatarCallBackCPP.h"
AvatarCallBackCPP::AvatarCallBackCPP(void)
{
    
}

AvatarCallBackCPP::~AvatarCallBackCPP(void)
{
    
}
void AvatarCallBackCPP::init()
{
    log("AvatarCallBackCPP--Init");
}

void AvatarCallBackCPP::loadPicSuc(int code,string data){
    log("AvatarCallBackCPP--loadPicSuc");
    if(code == 200){
        sGlobal->mGameLogic->choosePicEnd(1, data);
    }else{
        sGlobal->mCallJS->upAvatarEnd(code);
    }
}
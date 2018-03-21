// CustomClass.cpp
#include "GameJSB.h"

USING_NS_CC;

bool GameJSB::_isFirst;
GameJSB* GameJSB::_shared;
BGameLogic* GameJSB::mGameLogic;

GameJSB* GameJSB::sharedGJSB(){
    if(!_shared){
        _shared = new GameJSB();
    }
    return _shared;
}

GameJSB::GameJSB(){
    mGameLogic = NULL;
    //_isFirst = true;
}

GameJSB::~GameJSB(){

}

bool GameJSB::init(){
    return true;
}

void GameJSB::openSdkView(int code){
    if(mGameLogic!=NULL){
        mGameLogic->openSdkView(code);
    }
}

void GameJSB::loadPic(string aid,string picname,string url){
    if(mGameLogic!=NULL){
        mGameLogic->loadPic(aid,picname,url);
    }
}

void GameJSB::gotoPay(string orderNo,string einfo,int money,int zoneId,string userid){
    CCLOG("gotoPay=%s",orderNo.c_str());
    if(mGameLogic!=NULL){
        mGameLogic->gotoPay(orderNo,einfo,money,zoneId,userid);
    }
}


string GameJSB::getVerifyOrderNos(int zoneId,string userid){
    if(mGameLogic!=NULL){
        return mGameLogic->getVerifyOrderNos(zoneId,userid);
    }else{
        return "";
    }
}

void GameJSB::setVPaylogState(string orderno,int state){
    if(mGameLogic!=NULL){
        mGameLogic->setVPaylogState(orderno,state);
    }
}

void GameJSB::sendLocalPushMsg(string info){
    if(mGameLogic!=NULL){
        mGameLogic->sendLocalPushMsg(info);
    }
}

void GameJSB::doSomeString(int code,string para1,string para2,string para3,string para4,string para5){
    if(mGameLogic!=NULL){
        mGameLogic->doSomeString(code,para1,para2,para3,para4,para5);
    }else{
        CCLOG("*****GameJSB mGameLogic no init****");
    }
}

int GameJSB::pixelReadFromRenderTexture(RenderTexture* pRender,cocos2d::Rect &readRect){
    if(mGameLogic!=NULL){
        return mGameLogic->pixelReadFromRenderTexture(pRender,readRect);
    }else{
        return 255;
    }
}
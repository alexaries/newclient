//
//  ResData.cpp
//  cardgame
//
//  Created by apple on 12-12-28.
//
//

#include "ResData.h"
ResData::ResData(){
    mResdataArray = CCArray::create();
    mResdataArray -> retain();
    
    
}
ResData::~ResData(){
    mResdataArray ->release();
    mResdataArray = NULL;

}
bool ResData::init(){
    
    return true;
}

//根据他的资源名 加载 plist png 
void ResData::addToLoadByName(string loadobserverId,std::string resName,string url){
    int needupdate = 1;
//    if(GameUtil::stringequals("1", loadobserverId)){
//        needupdate = 1;
//    }
    
    int checkloaded = 1;
    int inedx = url.find("avatar/");
    if(inedx > -1){
        checkloaded = 0;
    }
    
    
    if((!checkIsLoadSuc(resName)&&checkloaded==1)||checkloaded==0){
        if(sGlobal->mResDownload->isFileExist(resName.c_str())&&needupdate==0){
            log("resload:::local has it==%s",resName.c_str());
            sGlobal->mCallJS->loadPicEnd(loadobserverId, resName,10);
        }else{
            log("resload:::add to load list==%s",resName.c_str());
            string path = url;
            LoadRes* res = new LoadRes(resName.c_str(),0,path.c_str());
            res->resobserverId= loadobserverId;
            sGlobal->mResDownload->addRes(res);
        }
    }else{
        log("resload:::has loaded suc==%s",resName.c_str());
        sGlobal->mCallJS->loadPicEnd(loadobserverId, resName,10);
    }

}

void ResData::addLoadSucRes(string resName){
    if(!checkIsLoadSuc(resName)){
        mLoadSucResNames.push_back(resName);
    }
}

bool ResData::checkIsLoadSuc(string resName){
    //log("LoadSucResNames.size==%ld",mLoadSucResNames.size());
    for(int i=0;i<mLoadSucResNames.size();i++){
        string rname = mLoadSucResNames.at(i);
        if(GameUtil::stringequals(rname, resName)){
            return true;
        }
    }
    return false;
}


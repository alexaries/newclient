//
//  WebClient.cpp
//  hero
//
//  Created by apple on 13-9-24.
//
//

#include "WebHttpClient.h"

//
WebHttpClient::WebHttpClient(void)
{
    mReqList = CCArray::create();
    mReqList->retain();
    mIsSendHttpDataing = false;
    mHttpVisit = new HttpVisit();
}

WebHttpClient::~WebHttpClient(void)
{
    mReqList->release();
    mReqList = NULL;
}

bool WebHttpClient::init(){
    
    return true;
}

void WebHttpClient::addHttpReq(string code,string url,string type,string params){
    HttpReq* req = new HttpReq();
    req->autorelease();
    req->code = code;
    req->url = url;
    req->type = type;
    req->params = params;
    mReqList->addObject(req);
    
    actionHttpVisit();
}

void WebHttpClient::actionHttpVisit(){
    if(!mIsSendHttpDataing){
        if(mReqList->count() > 0){
            HttpReq* req = (HttpReq*)mReqList->getObjectAtIndex(0);
            mHttpVisit->doRequest(req->code, req->url,req->type,req->params);
            mIsSendHttpDataing = true;
            mReqList->removeObjectAtIndex(0);
        }
    }
}
//处理服务端的版本信息
void WebHttpClient::handleVersion(CSJson::Value data){
    log("handleVersion");
    VersionData* verdata = new VersionData();
    verdata->autorelease();
    verdata->retain();
    verdata->state = data["state"].asInt();
    verdata->clientVersion = data["version"].asString();
    verdata->msg = data["msg"].asString();
    int index = verdata->clientVersion.find_last_of(".");
    if (index>-1){
        verdata->resVersion = verdata->clientVersion.substr(index+1);
        verdata->clientVersion = verdata->clientVersion.substr(0,index);
    }
    log("state==%d",verdata->state);
    log("clientVersion==%s",verdata->clientVersion.c_str());
    log("resVersion==%s",verdata->resVersion.c_str());
    log("msg==%s",verdata->msg.c_str());
    
    sGlobal->mGameLogic->mHallList = CCArray::create();
    sGlobal->mGameLogic->mHallList->retain();
    CSJson::Value tlistObj  = data["hallServer"];
    log("halllen==%d",tlistObj.size());
    for(int i=0;i<tlistObj.size();i++){
        HallServer* info = new HallServer();
        info->autorelease();
        info->serverIp = tlistObj[i]["serverIp"].asString();
        info->serverPort = tlistObj[i]["serverPort"].asInt();
        info->webSocketPort = tlistObj[i]["webSocketPort"].asInt();
        info->quality = tlistObj[i]["quality"].asInt();
        sGlobal->mGameLogic->mHallList->addObject(info);

    }
    
    verdata->reslist = CCArray::create();
    verdata->reslist->retain();
    CSJson::Value listObj  = data["res"];
    log("reslen==%d",listObj.size());
    for(int i=0;i<listObj.size();i++){
        ResVersionInfo* info = new ResVersionInfo();
        info->autorelease();
        info->currVersion = listObj[i]["currVersion"].asInt();
        info->url = listObj[i]["url"].asString();
        info->size = listObj[i]["size"].asInt();
        info->unzippath = listObj[i]["unZipPath"].asString();
        if(!sGlobal->mTest_LoadZip){
            verdata->reslist->addObject(info);
        }
    }
    
    CSJson::Value alistObj  = data["portalUrl"];
    if(alistObj!= CSJson::ValueType::nullValue){//有客户端升级-=
        log("purlslen==%d",alistObj.size());
        for(int i=0;i<alistObj.size();i++){
            string url = alistObj[i].asString();
            if(!url.empty()&& url.length() > 0){
                string laststr = url.substr(url.length()-1);
                if(!GameUtil::stringequals(laststr,"/")){ //以/结尾
                    url = url+"/";
                }
                verdata->portalUrls.push_back(url);
            }
        }
    }
    
    
    //portalUrl
    
    
    CSJson::Value uploadUrldata  = data["uploadUrl"];
    if(uploadUrldata.type()!= CSJson::ValueType::nullValue){//有客户端升级-=
        verdata->uploadUrl = data["uploadUrl"].asString();
        verdata->uploadVersion = data["uploadVersion"].asString();
        verdata->forceUploadVersion = data["forceUploadVersion"].asString();
        verdata->uploadMsg = data["uploadMsg"].asString();
        verdata->uploadSize = data["uploadSize"].asInt();
        log("uploadVersion==%s",verdata->uploadVersion.c_str());
        log("forceUploadVersion==%s",verdata->forceUploadVersion.c_str());
    }else{
        log(" no client upload ");
        verdata->uploadUrl = "";
    }
    
    //verdata->msg = "abc";
    
    if(sGlobal->mTest_LoadZip){
        ResVersionInfo* info = new ResVersionInfo();
        info->autorelease();
        info->currVersion = 1;
        info->url = "http://192.168.0.168/qpgame/res1.zip";
        info->size = 777777;
        info->unzippath = "/res/";
        verdata->reslist->addObject(info);
    }
    
    
    sGlobal->mGameLogic->mVersionData = verdata;
    sGlobal->mGameLogic->mHasGetVersionInfo = true;
    
    
    
}

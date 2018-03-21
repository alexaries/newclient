//
//  HttpDownload.cpp
//  cardgame
//
//  Created by apple on 12-12-26.
//
//

#include "HttpDownload.h"
#include "network/HttpRequest.h"
#include "network/HttpResponse.h"
#include "network/HttpClient.h"
using namespace cocos2d::network;
//竞技场
HttpDownload::HttpDownload(void)
{
    mIsLoading = false;
    this->mCurrRes = NULL;
    mResArray = CCArray::create();
    mResArray->retain();
    mHasLoaddata = false;

}

HttpDownload::~HttpDownload(void)
{
    this->mCurrRes = NULL;
    mResArray->release();
    mResArray=NULL;
}
//添加需要加载的资源
void HttpDownload::addRes(ResVersionInfo* res)
{
    mResArray->addObject(res);
    //log("load res2 len=%d\n",mResArray->count());
    startLoad();
   
}

void HttpDownload::clearreses(){
    mResArray->removeAllObjects();
}

//没有加载时，挑最先加入的进行加载
void HttpDownload::startLoad()
{
    if(!sGlobal->mCanLoadRes){
        return;
    }
    if(!mIsLoading){
        if(mResArray->count() > 0){
            ResVersionInfo* res = (ResVersionInfo*)mResArray->getObjectAtIndex(0);
            mResArray->removeObjectAtIndex(0);
            onStartLoadRes(res);
            log("load res3 len=%zd",mResArray->count());
        }
    }
}

//加载资源
void HttpDownload::onStartLoadRes(ResVersionInfo* res)
{
    mIsLoading = true;
    mHasLoaddata = false;
    mTempTime = GameUtil::getTimeNow();
    mCurrRes = res;
    
    printf("-------------\n start load %d \n",res->currVersion);
    sGlobal->mGameLogic->showLoadIndex(res->loadIndex);
    
    mCurrRes->updatestate = RES_UPDATE_LOAD_ING;

    HttpRequest* request = new HttpRequest();
   
    std::string url_ = res->url;    
    
    if(sGlobal->mTest_LoadZip){
        int index = url_.find("192.168.0.168");
        if (index>-1){
            url_ = "http://192.168.0.168/qpgame/res1.zip";
        }else{
            index = url_.find("192.168.0.168");
            if (index>-1){
                url_ = "http://192.168.0.168/qpgame/res1.zip";
            }
        }
    }

    log("url1==%s",url_.c_str());
    request->setUrl(url_.c_str());
    request->setRequestType(HttpRequest::Type::GET);
    request->setResponseCallback(this, callfuncND_selector(HttpDownload::onHttpRequestCompleted));
    
    request->setTag("GET RES");
    HttpClient::getInstance()->setTimeoutForRead(1800);//下载时要是 60*30s 还没下载完，关闭
    HttpClient::getInstance()->setLoadsize(0);
    HttpClient::getInstance()->send(request);
    request->release();
    
    //log("request release");
}

//一个资源加载结束时
void HttpDownload::onHttpRequestCompleted(cocos2d::Node *sender, void *data)
{
    HttpResponse *response = (HttpResponse*)data;
    log("onHttpRequestCompleted－－");
    if (!response)
    {
        mCurrRes->updatestate = RES_UPDATE_LOAD_FAIL;
        loadend();
        return;
    }

    // You can get original request type from: response->request->reqType
    if (0 != strlen(response->getHttpRequest()->getTag()))
    {
        log("%s completed", response->getHttpRequest()->getTag());
    }

    int statusCode = response->getResponseCode();
    char statusString[64] = {};
    sprintf(statusString, "HTTP Status Code: %d, tag = %s", statusCode, response->getHttpRequest()->getTag());

    log("response code: %d", statusCode);

    if (!response->isSucceed())
    {
        log("response failed");
        log("error buffer: %s", response->getErrorBuffer());
        mCurrRes->updatestate = RES_UPDATE_LOAD_FAIL;
        loadend();
        return;
    }

    // dump data
    std::vector<char> *buffer = response->getResponseData();
    std::string path = GameUtil::getScriptPath();
    if(mCurrRes->type == 1){
        path = GameUtil::getGameDownPath();
    }
    std::string bufffff(buffer->begin(),buffer->end());
    //log("filename_: %s",mCurrRes->resName.c_str());
    
    
    //保存到本地文件
    path+= changePicPath(mCurrRes->url);
    log("path: %s",path.c_str());
    FILE *fp = fopen(path.c_str(), "wb+");
    fwrite(bufffff.c_str(), 1,buffer->size(),  fp);
    fclose(fp);
    log("save: ok");
    mCurrRes->savepath = path;
    mCurrRes->updatestate = RES_UPDATE_LOAD_SUC;

    loadend();
}

//获取当前资源下载了多少
int HttpDownload::getressizeuploaded(){
    int size = 0;
    //if(mIsLoading){
        size = HttpClient::getInstance()->getLoadsize();
    //}
    if(mIsLoading && size > 0){
        mHasLoaddata = true;
    }
    if(!mHasLoaddata){  //10s未下载到内容自动 关闭 --未实现
//        long now = GameUtil::getTimeNow();
//        if(now - mTempTime > 10*1000){
//            mTempTime = now;
//            log("----can not down data-----");
//            //mCurrRes->updatestate = RES_UPDATE_LOAD_FAIL;
//            //loadend();
//        }
    }
    
    //log("upload size =%d",size);
    return size;
}

ResVersionInfo* HttpDownload::getCurrResInfo(){
    ResVersionInfo* res = NULL;
    if(mCurrRes->type == 1){
        res = mCurrRes;
    }
    return res;
}

//取消当前资源下载 --未实现
void HttpDownload::cancelDownload(){
    log("cancelDownload---");
    //mCurrRes->updatestate = RES_UPDATE_LOAD_FAIL;
    //loadend();
}


//加载结束 (不管成功还是失败) 通知
void HttpDownload::loadend(){
    
    //std::string name = mCurrRes->name;
    sGlobal->mGameLogic->resLoadEnd(mCurrRes);
    
    if(mCurrRes->type == 1 && mCurrRes->updatestate == RES_UPDATE_LOAD_FAIL){//下载失败全清除
        mResArray->removeAllObjects();
    }
    mHasLoaddata = false;
    mIsLoading = false;
    startLoad();
}


//改变路径 把'／'改成 '_'
string HttpDownload::changePicPath(string path){
    int index = path.find_last_of("/");
    path = path.substr(index+1);
    //log("path==%s",path.c_str());
    path = GameUtil::ReplaceAll(path,"/","_");
    return path;
}



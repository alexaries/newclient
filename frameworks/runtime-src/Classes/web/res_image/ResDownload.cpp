//
//  ResDownload.cpp
//  cardgame
//
//  Created by apple on 12-12-26.
//
//

#include "ResDownload.h"
#include "network/HttpRequest.h"
#include "network/HttpResponse.h"
#include "network/HttpClient.h"
using namespace cocos2d::network;
//加载头像等
ResDownload::ResDownload(void)
{
    mIsLoading = false;
    this->mCurrRes = NULL;
    mResArray = CCArray::create();
    mResArray->retain();
}

ResDownload::~ResDownload(void)
{
    this->mCurrRes = NULL;
    mResArray->release();
    mResArray=NULL;
}
//添加需要加载的资源
void ResDownload::addRes(LoadRes* res)
{
    mResArray->addObject(res);
    startLoad();
   
}

void ResDownload::removeRes(string resobserverId){
    int i = 0;
    while(i<mResArray->count())
    {
        LoadRes* res = (LoadRes*)mResArray->objectAtIndex(i);
        //printf("res->resName==%s\n",res->resName.c_str());
         if(res&&GameUtil::stringequals(res->resobserverId,resobserverId)){
            mResArray->removeObject(res);
        }else{
            i++;
        }
    }
    
}
//没有加载时，挑最先加入的进行加载
void ResDownload::startLoad()
{
    if(!mIsLoading){
        if(mResArray->count() > 0){
            LoadRes* res = (LoadRes*)mResArray->objectAtIndex(0);
            mResArray->removeObjectAtIndex(0);
            //log("resdown:::load res3 len=%ld",mResArray->count());
            onStartLoadRes(res);
        }
    }
}

//加载资源
void ResDownload::onStartLoadRes(LoadRes* res)
{
    mIsLoading = true;
    mCurrRes = res;
    
    //log("resdown:::1------ start load %s ",res->resName.c_str());

    HttpRequest* request = new HttpRequest();

    std::string url_ = res->url;

    //log("resdown:::2filename_: %s",res->resName.c_str());
    //log("resdown:::3url==%s",url_.c_str());
    
    request->setUrl(url_.c_str());
    request->setRequestType(HttpRequest::Type::GET);
    request->setResponseCallback(this, callfuncND_selector(ResDownload::onHttpRequestCompleted));
    
    request->setTag("GET avatar");
    HttpClient::getInstance()->send(request);
    request->release();
    
}

//一个资源加载结束时
void ResDownload::onHttpRequestCompleted(cocos2d::Node *sender, void *data)
{
    HttpResponse *response = (HttpResponse*)data;

    if (!response)
    {
        mCurrRes->state = 2;
        loadend();
        return;
    }

    // You can get original request type from: response->request->reqType
    if (0 != strlen(response->getHttpRequest()->getTag()))
    {
        //log("resdown:::%s completed", response->getHttpRequest()->getTag());
    }

    int statusCode = response->getResponseCode();
    char statusString[64] = {};
    sprintf(statusString, "HTTP Status Code: %d, tag = %s", statusCode, response->getHttpRequest()->getTag());

    //log("resdown:::http response code: %d", statusCode);

    if (!response->isSucceed())
    {
        //log("resdown:::http response failed");
        log("resdown:::error http buffer: %s", response->getErrorBuffer());
        mCurrRes->state = 2;
        loadend();
        return;
    }

    // dump data
    std::vector<char> *buffer = response->getResponseData();
    std::string path = GameUtil::getImgPath();
    std::string bufffff(buffer->begin(),buffer->end());

    //log("filename_: %s",mCurrRes->resName.c_str());

    //保存到本地文件
    path+= mCurrRes->resName;//sGlobal->mGameLogic->changePicPath(mCurrRes->resName);
    //log("resdown:::path: %s",path.c_str());
    FILE *fp = fopen(path.c_str(), "wb+");
    fwrite(bufffff.c_str(), 1,buffer->size(),  fp);
    fclose(fp);
    mCurrRes->state = 1;
    loadend();
}
//加载结束 (不管成功还是失败) 通知 
void ResDownload::loadend(){
    
    
    if(mCurrRes->state == 1){
        sGlobal->mResData->addLoadSucRes(mCurrRes->resName);
    }
    std::string name = mCurrRes->resName;
    //log("resdown:::loadend=%s=%d",mCurrRes->resName.c_str(),mCurrRes->state);
    sGlobal->mCallJS->loadPicEnd(mCurrRes->resobserverId, mCurrRes->resName, mCurrRes->state);
    //要是有同样加载这个资源的 一起通知了
    //printf("load res len=%d----%s\n",mResArray->count());
    int i = 0;
    while(i<mResArray->count())
    {
        LoadRes* res = (LoadRes*)mResArray->objectAtIndex(i);
        //printf("res->resName==%s\n",res->resName.c_str());

        if(res&&GameUtil::stringequals(res->resName,name)){
            res->state = mCurrRes->state;
            sGlobal->mCallJS->loadPicEnd(res->resobserverId, res->resName, res->state);
            mResArray->removeObject(res);
        }else{
            i++;
        }
    }
    //printf("load res1 len=%d\n",mResArray->count());
    
    mIsLoading = false;
    startLoad();
}

//判断这个文件以前是否加载过
bool ResDownload::isFileExist(const char* pFileName)
{
    if( !pFileName ) return false;
    std::string filePath = GameUtil::getImgPath();
    
    filePath += pFileName;//sGlobal->mGameLogic->changePicPath(pFileName);
    
    FILE *fp = fopen(filePath.c_str(),"r");
    if(fp)
    {
        fclose(fp);
        return true;
    }
    return false;
}

//本地资源库是否有这个文件
bool ResDownload::isFileLocalExist(const char* pFileName)
{
    if( !pFileName ) return false;
    std::string filePath = GameUtil::getResPath();
    filePath += pFileName;
    FILE *fp = fopen(filePath.c_str(),"r");
    if(fp)
    {
        fclose(fp);
        return true;
    }
    return false;
}





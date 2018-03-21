//
//  HttpVisit.cpp
//  gamesanguo
//
//  Created by apple on 13-8-15.
//
//

#include "HttpVisit.h"
#include "network/HttpRequest.h"
#include "network/HttpResponse.h"
#include "network/HttpClient.h"
using namespace cocos2d::network;
//
HttpVisit::HttpVisit(void)
{
    currcode = "";
}

HttpVisit::~HttpVisit(void)
{
    
}

bool HttpVisit::init(){
    
    return true;
}
//http 访问不能取消
void HttpVisit::doRequest(string code,string url,string type,string params){
    currcode = code;
    log("HttpVisit----doRequest===%s",url.c_str());
    HttpRequest* request = new HttpRequest();
    // required fields
    request->setUrl(url.c_str());
    if(GameUtil::stringequals("post", type)){
        request->setRequestType(HttpRequest::Type::POST);
        if(params.length() > 0){
            string header1 = "Content-Type: application/x-www-form-urlencoded";
            std::vector<string> header;
            header.push_back(header1);
            request->setHeaders(header);
            request->setRequestData(params.c_str(),params.length());
        }
    }else{
        request->setRequestType(HttpRequest::Type::GET);
    }
    request->setResponseCallback(this, callfuncND_selector(HttpVisit::onHttpRequestCompleted));
    // optional fields
    request->setTag((code+"_"+type).c_str());
    

    HttpClient::getInstance()->sendImmediate(request);
    
    
    // don't forget to release it, pair to new
    request->release();
}

void HttpVisit::onHttpRequestCompleted(cocos2d::Node *sender, void *data)
{
    log("HttpVisit----onHttpRequestCompleted");
    HttpResponse *response = (HttpResponse*)data;
    
    string thecurrcode = currcode;
    sGlobal->mWebHttpClient->mIsSendHttpDataing = false;
    sGlobal->mWebHttpClient->actionHttpVisit();
    if (!response)
    {
        
        sGlobal->mGameLogic->httpVisitFail(thecurrcode);
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
    //m_labelStatusCode->setString(statusString);
    log("response code: %d", statusCode);
    
    if (!response->isSucceed())
    {
        if(GameUtil::stringequals("js_jiaDuALiPay_post",response->getHttpRequest()->getTag())
        && GameUtil::stringequals("js_jiaDuWXPay_post",response->getHttpRequest()->getTag())
        ){
            string tcode = thecurrcode.substr(3,thecurrcode.length());
            sGlobal->mCallJS->httpResultForjs(tcode,"failed");
        }
        log("response failed");
        log("error buffer: %s", response->getErrorBuffer());
        sGlobal->mGameLogic->httpVisitFail(thecurrcode);
        return;
    }
    
    // dump data
    string rdata;
    std::vector<char> *buffer = response->getResponseData();
    //printf("Http Test, dump data: ");
    for (unsigned int i = 0; i < buffer->size(); i++)
    {
        //printf("%c", (*buffer)[i]);
        rdata += (*buffer)[i];
    }
    printf("\n");

    
    string jscode = "js_";
    if (jscode == thecurrcode.substr(0,3)){
        
        if(GameUtil::stringequals("js_jiaDuALiPay", thecurrcode)){
           //调用安卓底层接口
           //json 处理 获取orderId，appId
           CSJson::Value root ;//= NULL
           CSJson::Reader reader;
          reader.parse(rdata.c_str(), root, false);
          CSJson::Value response_detail  = root["response_detail"];
          std::string orderInfo = response_detail["orderInfo"].asString();
           #if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
                   CallAndroid::gotoAliPay(orderInfo);
           #elif (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
                  sGlobal->mGameLogic->paynew(1,"duole",orderInfo,orderInfo);
           #else
           #endif
        }else if(GameUtil::stringequals("js_jiaDuWXPay", thecurrcode)){
                      CSJson::Value root ;//= NULL
                       CSJson::Reader reader;
                      reader.parse(rdata.c_str(), root, false);
                      std::string response_detail  = root["response_detail"].toStyledString();
                      //std::string orderInfo = response_detail["orderInfo"].asString();
                       #if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
                               CallAndroid::gotoWXPay(response_detail);
                        #elif (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
                                sGlobal->mGameLogic->paynew(2,"duole",response_detail,response_detail);
                        #else
                       #endif
        }
        string tcode = thecurrcode.substr(3,thecurrcode.length());
        sGlobal->mCallJS->httpResultForjs(tcode,rdata);
    }else if(!GameUtil::stringequals("sign", thecurrcode)){
        //json 处理
        CSJson::Value root ;//= NULL
        CSJson::Reader reader;
        reader.parse(rdata.c_str(), root, false);
        if(root.size() == 0){
            log("error json");
        }else{
            handleData(thecurrcode,root);
        }
    }else{
        sGlobal->mGameLogic->getHttpSignResult(rdata);
    }
    
}

void HttpVisit::handleData(string code,CSJson::Value root){
    log("handleData==%s",code.c_str());
    if(GameUtil::stringequals("version", code)){
        sGlobal->mWebHttpClient->handleVersion(root);
    }
}
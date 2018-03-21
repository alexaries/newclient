//
//  WebClient.h
//  hero
//
//  Created by apple on 13-9-24.
//
//

#ifndef __hero__WebHttpClient__
#define __hero__WebHttpClient__

#include "Header.h"

class HttpVisit;
//
class WebHttpClient: public Ref
{
public:
    WebHttpClient(void);
	~WebHttpClient(void);
    bool init();
    void addHttpReq(string code,string url,string type,string params);
    void actionHttpVisit();
    
    void handleVersion(CSJson::Value data);
public:
    bool mIsSendHttpDataing;//是否再发送http消息
private:
    CCArray* mReqList;//请求列表
    HttpVisit* mHttpVisit;//
};
#endif /* defined(__hero__WebClient__) */

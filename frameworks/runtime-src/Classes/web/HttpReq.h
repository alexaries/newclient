//
//  HttpReq.h
//  hero
//
//  Created by apple on 13-9-24.
//
//

#ifndef hero_HttpReq_h
#define hero_HttpReq_h

#include "Header.h"

//http访问请求
class HttpReq: public Ref
{
public:
    HttpReq(void){};
	~HttpReq(void){};
    
    std::string code;//标示
    std::string url;//访问地址
    std::string type;//get post
    std::string params;//post 参数
};

#endif

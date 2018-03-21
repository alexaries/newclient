//
//  HttpVisit.h
//  gamesanguo
//
//  Created by apple on 13-8-15.
//
//

#ifndef __gamesanguo__HttpVisit__
#define __gamesanguo__HttpVisit__

#include "Header.h"
USING_NS_CC;
//
class HttpVisit: public Ref
{
public:
    HttpVisit(void);
	~HttpVisit(void);
    bool init();
    
    void doRequest(string code,string url,string type,string params);
    void onHttpRequestCompleted(cocos2d::Node *sender, void *data);

private:
    void handleData(string code,CSJson::Value root);
private:
    string currcode;
};

#endif /* defined(__gamesanguo__HttpVisit__) */

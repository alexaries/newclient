// CustomClass.h

#ifndef __CUSTOM__CLASS

#define __CUSTOM__CLASS

#include "cocos2d.h"
using namespace cocos2d;
using namespace std;
class BGameLogic
{
public:
    //int64_t 用 string 传
    BGameLogic(){};
	~BGameLogic(){};
    //int64_t 用 string 传
	virtual void test(int code){}; //vc 用,去除一个错误
    virtual void openSdkView(int code){};
    virtual void loadPic(string aid,string picname,string url){};
    virtual void gotoPay(string orderNo,string einfo,int money,int zoneId,string userid){};
    virtual string getVerifyOrderNos(int zoneId,string userid){return "";};
    virtual void setVPaylogState(string orderno,int state){};
    virtual void sendLocalPushMsg(string info){};
    virtual void doSomeString(int code,string para1,string para2,string para3,string para4,string para5){};
    
    virtual int pixelReadFromRenderTexture(RenderTexture* pRender,cocos2d::Rect &readRect){return 0;};
    
};

namespace cocos2d {
    class GameJSB : public cocos2d::Ref
    {
    public:
        
        GameJSB();
        ~GameJSB();
        static GameJSB* sharedGJSB();
        bool init();
        
        void openSdkView(int code);
        void loadPic(string aid,string picname,string url);
        void gotoPay(string orderNo,string einfo,int money,int zoneId,string userid);
        string getVerifyOrderNos(int zoneId,string userid);
        void setVPaylogState(string orderno,int state);
        void sendLocalPushMsg(string info);
        void doSomeString(int code,string para1,string para2,string para3,string para4,string para5);
        int pixelReadFromRenderTexture(RenderTexture* pRender,cocos2d::Rect &readRect);
        
        CREATE_FUNC(GameJSB);
    public:
        static BGameLogic* mGameLogic;
    private:
        static bool _isFirst;
        static GameJSB* _shared;
    };
} //namespace cocos2d

#endif // __CUSTOM__CLASS
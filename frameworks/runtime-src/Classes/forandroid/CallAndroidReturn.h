//
//  CheckJavaMethodReturn.h
//  coolgame
//
//  Created by apple on 15-8-17.
//
//

#ifndef coolgame_CheckJavaMethodReturn_h
#define coolgame_CheckJavaMethodReturn_h

#include "cocos2d.h"
USING_NS_CC;
using namespace std;

#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
#include <jni.h>
#include "platform/android/jni/JniHelper.h"
#include <android/log.h>
#endif

//call android
class CheckJavaMethodReturn: public Ref
{
public:
    CheckJavaMethodReturn(void){};
    ~CheckJavaMethodReturn(void){};
    
    JniMethodInfo minfo;//方法信息
    jobject jobj;// xx.getInstance对象
    bool isHave;//是否有改方法
    
};



#endif

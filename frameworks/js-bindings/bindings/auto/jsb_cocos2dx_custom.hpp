#ifndef __cocos2dx_custom_h__
#define __cocos2dx_custom_h__

#include "jsapi.h"
#include "jsfriendapi.h"


extern JSClass  *jsb_cocos2d_GameJSB_class;
extern JSObject *jsb_cocos2d_GameJSB_prototype;

bool js_cocos2dx_custom_GameJSB_constructor(JSContext *cx, uint32_t argc, jsval *vp);
void js_cocos2dx_custom_GameJSB_finalize(JSContext *cx, JSObject *obj);
void js_register_cocos2dx_custom_GameJSB(JSContext *cx, JSObject *global);
void register_all_cocos2dx_custom(JSContext* cx, JSObject* obj);
bool js_cocos2dx_custom_GameJSB_setVPaylogState(JSContext *cx, uint32_t argc, jsval *vp);
bool js_cocos2dx_custom_GameJSB_doSomeString(JSContext *cx, uint32_t argc, jsval *vp);
bool js_cocos2dx_custom_GameJSB_init(JSContext *cx, uint32_t argc, jsval *vp);
bool js_cocos2dx_custom_GameJSB_loadPic(JSContext *cx, uint32_t argc, jsval *vp);
bool js_cocos2dx_custom_GameJSB_gotoPay(JSContext *cx, uint32_t argc, jsval *vp);
bool js_cocos2dx_custom_GameJSB_getVerifyOrderNos(JSContext *cx, uint32_t argc, jsval *vp);
bool js_cocos2dx_custom_GameJSB_openSdkView(JSContext *cx, uint32_t argc, jsval *vp);
bool js_cocos2dx_custom_GameJSB_sendLocalPushMsg(JSContext *cx, uint32_t argc, jsval *vp);
bool js_cocos2dx_custom_GameJSB_pixelReadFromRenderTexture(JSContext *cx, uint32_t argc, jsval *vp);
bool js_cocos2dx_custom_GameJSB_create(JSContext *cx, uint32_t argc, jsval *vp);
bool js_cocos2dx_custom_GameJSB_sharedGJSB(JSContext *cx, uint32_t argc, jsval *vp);
bool js_cocos2dx_custom_GameJSB_GameJSB(JSContext *cx, uint32_t argc, jsval *vp);
#endif


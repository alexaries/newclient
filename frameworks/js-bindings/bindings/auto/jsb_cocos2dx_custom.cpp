#include "jsb_cocos2dx_custom.hpp"
#include "cocos2d_specifics.hpp"
#include "GameJSB.h"

template<class T>
static bool dummy_constructor(JSContext *cx, uint32_t argc, jsval *vp) {
    JS::RootedValue initializing(cx);
    bool isNewValid = true;
    JSObject* global = ScriptingCore::getInstance()->getGlobalObject();
	isNewValid = JS_GetProperty(cx, global, "initializing", &initializing) && JSVAL_TO_BOOLEAN(initializing);
	if (isNewValid)
	{
		TypeTest<T> t;
		js_type_class_t *typeClass = nullptr;
		std::string typeName = t.s_name();
		auto typeMapIter = _js_global_type_map.find(typeName);
		CCASSERT(typeMapIter != _js_global_type_map.end(), "Can't find the class type!");
		typeClass = typeMapIter->second;
		CCASSERT(typeClass, "The value is null.");

		JSObject *_tmp = JS_NewObject(cx, typeClass->jsclass, typeClass->proto, typeClass->parentProto);
		JS_SET_RVAL(cx, vp, OBJECT_TO_JSVAL(_tmp));
		return true;
	}

    JS_ReportError(cx, "Constructor for the requested class is not available, please refer to the API reference.");
    return false;
}

static bool empty_constructor(JSContext *cx, uint32_t argc, jsval *vp) {
	return false;
}

static bool js_is_native_obj(JSContext *cx, JS::HandleObject obj, JS::HandleId id, JS::MutableHandleValue vp)
{
	vp.set(BOOLEAN_TO_JSVAL(true));
	return true;	
}
JSClass  *jsb_cocos2d_GameJSB_class;
JSObject *jsb_cocos2d_GameJSB_prototype;

bool js_cocos2dx_custom_GameJSB_setVPaylogState(JSContext *cx, uint32_t argc, jsval *vp)
{
	jsval *argv = JS_ARGV(cx, vp);
	bool ok = true;
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	cocos2d::GameJSB* cobj = (cocos2d::GameJSB *)(proxy ? proxy->ptr : NULL);
	JSB_PRECONDITION2( cobj, cx, false, "js_cocos2dx_custom_GameJSB_setVPaylogState : Invalid Native Object");
	if (argc == 2) {
		std::string arg0;
		int arg1;
		ok &= jsval_to_std_string(cx, argv[0], &arg0);
		ok &= jsval_to_int32(cx, argv[1], (int32_t *)&arg1);
		JSB_PRECONDITION2(ok, cx, false, "js_cocos2dx_custom_GameJSB_setVPaylogState : Error processing arguments");
		cobj->setVPaylogState(arg0, arg1);
		JS_SET_RVAL(cx, vp, JSVAL_VOID);
		return true;
	}

	JS_ReportError(cx, "js_cocos2dx_custom_GameJSB_setVPaylogState : wrong number of arguments: %d, was expecting %d", argc, 2);
	return false;
}
bool js_cocos2dx_custom_GameJSB_doSomeString(JSContext *cx, uint32_t argc, jsval *vp)
{
	jsval *argv = JS_ARGV(cx, vp);
	bool ok = true;
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	cocos2d::GameJSB* cobj = (cocos2d::GameJSB *)(proxy ? proxy->ptr : NULL);
	JSB_PRECONDITION2( cobj, cx, false, "js_cocos2dx_custom_GameJSB_doSomeString : Invalid Native Object");
	if (argc == 6) {
		int arg0;
		std::string arg1;
		std::string arg2;
		std::string arg3;
		std::string arg4;
		std::string arg5;
		ok &= jsval_to_int32(cx, argv[0], (int32_t *)&arg0);
		ok &= jsval_to_std_string(cx, argv[1], &arg1);
		ok &= jsval_to_std_string(cx, argv[2], &arg2);
		ok &= jsval_to_std_string(cx, argv[3], &arg3);
		ok &= jsval_to_std_string(cx, argv[4], &arg4);
		ok &= jsval_to_std_string(cx, argv[5], &arg5);
		JSB_PRECONDITION2(ok, cx, false, "js_cocos2dx_custom_GameJSB_doSomeString : Error processing arguments");
		cobj->doSomeString(arg0, arg1, arg2, arg3, arg4, arg5);
		JS_SET_RVAL(cx, vp, JSVAL_VOID);
		return true;
	}

	JS_ReportError(cx, "js_cocos2dx_custom_GameJSB_doSomeString : wrong number of arguments: %d, was expecting %d", argc, 6);
	return false;
}
bool js_cocos2dx_custom_GameJSB_init(JSContext *cx, uint32_t argc, jsval *vp)
{
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	cocos2d::GameJSB* cobj = (cocos2d::GameJSB *)(proxy ? proxy->ptr : NULL);
	JSB_PRECONDITION2( cobj, cx, false, "js_cocos2dx_custom_GameJSB_init : Invalid Native Object");
	if (argc == 0) {
		bool ret = cobj->init();
		jsval jsret = JSVAL_NULL;
		jsret = BOOLEAN_TO_JSVAL(ret);
		JS_SET_RVAL(cx, vp, jsret);
		return true;
	}

	JS_ReportError(cx, "js_cocos2dx_custom_GameJSB_init : wrong number of arguments: %d, was expecting %d", argc, 0);
	return false;
}
bool js_cocos2dx_custom_GameJSB_loadPic(JSContext *cx, uint32_t argc, jsval *vp)
{
	jsval *argv = JS_ARGV(cx, vp);
	bool ok = true;
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	cocos2d::GameJSB* cobj = (cocos2d::GameJSB *)(proxy ? proxy->ptr : NULL);
	JSB_PRECONDITION2( cobj, cx, false, "js_cocos2dx_custom_GameJSB_loadPic : Invalid Native Object");
	if (argc == 3) {
		std::string arg0;
		std::string arg1;
		std::string arg2;
		ok &= jsval_to_std_string(cx, argv[0], &arg0);
		ok &= jsval_to_std_string(cx, argv[1], &arg1);
		ok &= jsval_to_std_string(cx, argv[2], &arg2);
		JSB_PRECONDITION2(ok, cx, false, "js_cocos2dx_custom_GameJSB_loadPic : Error processing arguments");
		cobj->loadPic(arg0, arg1, arg2);
		JS_SET_RVAL(cx, vp, JSVAL_VOID);
		return true;
	}

	JS_ReportError(cx, "js_cocos2dx_custom_GameJSB_loadPic : wrong number of arguments: %d, was expecting %d", argc, 3);
	return false;
}
bool js_cocos2dx_custom_GameJSB_gotoPay(JSContext *cx, uint32_t argc, jsval *vp)
{
	jsval *argv = JS_ARGV(cx, vp);
	bool ok = true;
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	cocos2d::GameJSB* cobj = (cocos2d::GameJSB *)(proxy ? proxy->ptr : NULL);
	JSB_PRECONDITION2( cobj, cx, false, "js_cocos2dx_custom_GameJSB_gotoPay : Invalid Native Object");
	if (argc == 5) {
		std::string arg0;
		std::string arg1;
		int arg2;
		int arg3;
		std::string arg4;
		ok &= jsval_to_std_string(cx, argv[0], &arg0);
		ok &= jsval_to_std_string(cx, argv[1], &arg1);
		ok &= jsval_to_int32(cx, argv[2], (int32_t *)&arg2);
		ok &= jsval_to_int32(cx, argv[3], (int32_t *)&arg3);
		ok &= jsval_to_std_string(cx, argv[4], &arg4);
		JSB_PRECONDITION2(ok, cx, false, "js_cocos2dx_custom_GameJSB_gotoPay : Error processing arguments");
		cobj->gotoPay(arg0, arg1, arg2, arg3, arg4);
		JS_SET_RVAL(cx, vp, JSVAL_VOID);
		return true;
	}

	JS_ReportError(cx, "js_cocos2dx_custom_GameJSB_gotoPay : wrong number of arguments: %d, was expecting %d", argc, 5);
	return false;
}
bool js_cocos2dx_custom_GameJSB_getVerifyOrderNos(JSContext *cx, uint32_t argc, jsval *vp)
{
	jsval *argv = JS_ARGV(cx, vp);
	bool ok = true;
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	cocos2d::GameJSB* cobj = (cocos2d::GameJSB *)(proxy ? proxy->ptr : NULL);
	JSB_PRECONDITION2( cobj, cx, false, "js_cocos2dx_custom_GameJSB_getVerifyOrderNos : Invalid Native Object");
	if (argc == 2) {
		int arg0;
		std::string arg1;
		ok &= jsval_to_int32(cx, argv[0], (int32_t *)&arg0);
		ok &= jsval_to_std_string(cx, argv[1], &arg1);
		JSB_PRECONDITION2(ok, cx, false, "js_cocos2dx_custom_GameJSB_getVerifyOrderNos : Error processing arguments");
		std::string ret = cobj->getVerifyOrderNos(arg0, arg1);
		jsval jsret = JSVAL_NULL;
		jsret = std_string_to_jsval(cx, ret);
		JS_SET_RVAL(cx, vp, jsret);
		return true;
	}

	JS_ReportError(cx, "js_cocos2dx_custom_GameJSB_getVerifyOrderNos : wrong number of arguments: %d, was expecting %d", argc, 2);
	return false;
}
bool js_cocos2dx_custom_GameJSB_openSdkView(JSContext *cx, uint32_t argc, jsval *vp)
{
	jsval *argv = JS_ARGV(cx, vp);
	bool ok = true;
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	cocos2d::GameJSB* cobj = (cocos2d::GameJSB *)(proxy ? proxy->ptr : NULL);
	JSB_PRECONDITION2( cobj, cx, false, "js_cocos2dx_custom_GameJSB_openSdkView : Invalid Native Object");
	if (argc == 1) {
		int arg0;
		ok &= jsval_to_int32(cx, argv[0], (int32_t *)&arg0);
		JSB_PRECONDITION2(ok, cx, false, "js_cocos2dx_custom_GameJSB_openSdkView : Error processing arguments");
		cobj->openSdkView(arg0);
		JS_SET_RVAL(cx, vp, JSVAL_VOID);
		return true;
	}

	JS_ReportError(cx, "js_cocos2dx_custom_GameJSB_openSdkView : wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
bool js_cocos2dx_custom_GameJSB_sendLocalPushMsg(JSContext *cx, uint32_t argc, jsval *vp)
{
	jsval *argv = JS_ARGV(cx, vp);
	bool ok = true;
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	cocos2d::GameJSB* cobj = (cocos2d::GameJSB *)(proxy ? proxy->ptr : NULL);
	JSB_PRECONDITION2( cobj, cx, false, "js_cocos2dx_custom_GameJSB_sendLocalPushMsg : Invalid Native Object");
	if (argc == 1) {
		std::string arg0;
		ok &= jsval_to_std_string(cx, argv[0], &arg0);
		JSB_PRECONDITION2(ok, cx, false, "js_cocos2dx_custom_GameJSB_sendLocalPushMsg : Error processing arguments");
		cobj->sendLocalPushMsg(arg0);
		JS_SET_RVAL(cx, vp, JSVAL_VOID);
		return true;
	}

	JS_ReportError(cx, "js_cocos2dx_custom_GameJSB_sendLocalPushMsg : wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
bool js_cocos2dx_custom_GameJSB_pixelReadFromRenderTexture(JSContext *cx, uint32_t argc, jsval *vp)
{
	jsval *argv = JS_ARGV(cx, vp);
	bool ok = true;
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	cocos2d::GameJSB* cobj = (cocos2d::GameJSB *)(proxy ? proxy->ptr : NULL);
	JSB_PRECONDITION2( cobj, cx, false, "js_cocos2dx_custom_GameJSB_pixelReadFromRenderTexture : Invalid Native Object");
	if (argc == 2) {
		cocos2d::RenderTexture* arg0;
		cocos2d::Rect arg1;
		do {
			if (!argv[0].isObject()) { ok = false; break; }
			js_proxy_t *jsProxy;
			JSObject *tmpObj = JSVAL_TO_OBJECT(argv[0]);
			jsProxy = jsb_get_js_proxy(tmpObj);
			arg0 = (cocos2d::RenderTexture*)(jsProxy ? jsProxy->ptr : NULL);
			JSB_PRECONDITION2( arg0, cx, false, "Invalid Native Object");
		} while (0);
		ok &= jsval_to_ccrect(cx, argv[1], &arg1);
		JSB_PRECONDITION2(ok, cx, false, "js_cocos2dx_custom_GameJSB_pixelReadFromRenderTexture : Error processing arguments");
		int ret = cobj->pixelReadFromRenderTexture(arg0, arg1);
		jsval jsret = JSVAL_NULL;
		jsret = int32_to_jsval(cx, ret);
		JS_SET_RVAL(cx, vp, jsret);
		return true;
	}

	JS_ReportError(cx, "js_cocos2dx_custom_GameJSB_pixelReadFromRenderTexture : wrong number of arguments: %d, was expecting %d", argc, 2);
	return false;
}
bool js_cocos2dx_custom_GameJSB_create(JSContext *cx, uint32_t argc, jsval *vp)
{
	if (argc == 0) {
		cocos2d::GameJSB* ret = cocos2d::GameJSB::create();
		jsval jsret = JSVAL_NULL;
		do {
		if (ret) {
			js_proxy_t *jsProxy = js_get_or_create_proxy<cocos2d::GameJSB>(cx, (cocos2d::GameJSB*)ret);
			jsret = OBJECT_TO_JSVAL(jsProxy->obj);
		} else {
			jsret = JSVAL_NULL;
		}
	} while (0);
		JS_SET_RVAL(cx, vp, jsret);
		return true;
	}
	JS_ReportError(cx, "js_cocos2dx_custom_GameJSB_create : wrong number of arguments");
	return false;
}

bool js_cocos2dx_custom_GameJSB_sharedGJSB(JSContext *cx, uint32_t argc, jsval *vp)
{
	if (argc == 0) {
		cocos2d::GameJSB* ret = cocos2d::GameJSB::sharedGJSB();
		jsval jsret = JSVAL_NULL;
		do {
		if (ret) {
			js_proxy_t *jsProxy = js_get_or_create_proxy<cocos2d::GameJSB>(cx, (cocos2d::GameJSB*)ret);
			jsret = OBJECT_TO_JSVAL(jsProxy->obj);
		} else {
			jsret = JSVAL_NULL;
		}
	} while (0);
		JS_SET_RVAL(cx, vp, jsret);
		return true;
	}
	JS_ReportError(cx, "js_cocos2dx_custom_GameJSB_sharedGJSB : wrong number of arguments");
	return false;
}

bool js_cocos2dx_custom_GameJSB_constructor(JSContext *cx, uint32_t argc, jsval *vp)
{
	jsval *argv = JS_ARGV(cx, vp);
	bool ok = true;
    cocos2d::GameJSB* cobj = new (std::nothrow) cocos2d::GameJSB();
    cocos2d::Ref *_ccobj = dynamic_cast<cocos2d::Ref *>(cobj);
    if (_ccobj) {
        _ccobj->autorelease();
    }
    TypeTest<cocos2d::GameJSB> t;
    js_type_class_t *typeClass = nullptr;
    std::string typeName = t.s_name();
    auto typeMapIter = _js_global_type_map.find(typeName);
    CCASSERT(typeMapIter != _js_global_type_map.end(), "Can't find the class type!");
    typeClass = typeMapIter->second;
    CCASSERT(typeClass, "The value is null.");
    JSObject *obj = JS_NewObject(cx, typeClass->jsclass, typeClass->proto, typeClass->parentProto);
    JS_SET_RVAL(cx, vp, OBJECT_TO_JSVAL(obj));
    // link the native object with the javascript object
    js_proxy_t* p = jsb_new_proxy(cobj, obj);
    JS_AddNamedObjectRoot(cx, &p->obj, "cocos2d::GameJSB");
    if (JS_HasProperty(cx, obj, "_ctor", &ok))
        ScriptingCore::getInstance()->executeFunctionWithOwner(OBJECT_TO_JSVAL(obj), "_ctor", argc, argv);
    return true;
}



void js_cocos2d_GameJSB_finalize(JSFreeOp *fop, JSObject *obj) {
    CCLOGINFO("jsbindings: finalizing JS object %p (GameJSB)", obj);
}

void js_register_cocos2dx_custom_GameJSB(JSContext *cx, JSObject *global) {
	jsb_cocos2d_GameJSB_class = (JSClass *)calloc(1, sizeof(JSClass));
	jsb_cocos2d_GameJSB_class->name = "GameJSB";
	jsb_cocos2d_GameJSB_class->addProperty = JS_PropertyStub;
	jsb_cocos2d_GameJSB_class->delProperty = JS_DeletePropertyStub;
	jsb_cocos2d_GameJSB_class->getProperty = JS_PropertyStub;
	jsb_cocos2d_GameJSB_class->setProperty = JS_StrictPropertyStub;
	jsb_cocos2d_GameJSB_class->enumerate = JS_EnumerateStub;
	jsb_cocos2d_GameJSB_class->resolve = JS_ResolveStub;
	jsb_cocos2d_GameJSB_class->convert = JS_ConvertStub;
	jsb_cocos2d_GameJSB_class->finalize = js_cocos2d_GameJSB_finalize;
	jsb_cocos2d_GameJSB_class->flags = JSCLASS_HAS_RESERVED_SLOTS(2);

	static JSPropertySpec properties[] = {
		{"__nativeObj", 0, JSPROP_ENUMERATE | JSPROP_PERMANENT, JSOP_WRAPPER(js_is_native_obj), JSOP_NULLWRAPPER},
		{0, 0, 0, JSOP_NULLWRAPPER, JSOP_NULLWRAPPER}
	};

	static JSFunctionSpec funcs[] = {
		JS_FN("setVPaylogState", js_cocos2dx_custom_GameJSB_setVPaylogState, 2, JSPROP_PERMANENT | JSPROP_ENUMERATE),
		JS_FN("doSomeString", js_cocos2dx_custom_GameJSB_doSomeString, 6, JSPROP_PERMANENT | JSPROP_ENUMERATE),
		JS_FN("init", js_cocos2dx_custom_GameJSB_init, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
		JS_FN("loadPic", js_cocos2dx_custom_GameJSB_loadPic, 3, JSPROP_PERMANENT | JSPROP_ENUMERATE),
		JS_FN("gotoPay", js_cocos2dx_custom_GameJSB_gotoPay, 5, JSPROP_PERMANENT | JSPROP_ENUMERATE),
		JS_FN("getVerifyOrderNos", js_cocos2dx_custom_GameJSB_getVerifyOrderNos, 2, JSPROP_PERMANENT | JSPROP_ENUMERATE),
		JS_FN("openSdkView", js_cocos2dx_custom_GameJSB_openSdkView, 1, JSPROP_PERMANENT | JSPROP_ENUMERATE),
		JS_FN("sendLocalPushMsg", js_cocos2dx_custom_GameJSB_sendLocalPushMsg, 1, JSPROP_PERMANENT | JSPROP_ENUMERATE),
		JS_FN("pixelReadFromRenderTexture", js_cocos2dx_custom_GameJSB_pixelReadFromRenderTexture, 2, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FS_END
	};

	static JSFunctionSpec st_funcs[] = {
		JS_FN("create", js_cocos2dx_custom_GameJSB_create, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
		JS_FN("sharedGJSB", js_cocos2dx_custom_GameJSB_sharedGJSB, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
		JS_FS_END
	};

	jsb_cocos2d_GameJSB_prototype = JS_InitClass(
		cx, global,
		NULL, // parent proto
		jsb_cocos2d_GameJSB_class,
		js_cocos2dx_custom_GameJSB_constructor, 0, // constructor
		properties,
		funcs,
		NULL, // no static properties
		st_funcs);
	// make the class enumerable in the registered namespace
//	bool found;
//FIXME: Removed in Firefox v27	
//	JS_SetPropertyAttributes(cx, global, "GameJSB", JSPROP_ENUMERATE | JSPROP_READONLY, &found);

	// add the proto and JSClass to the type->js info hash table
	TypeTest<cocos2d::GameJSB> t;
	js_type_class_t *p;
	std::string typeName = t.s_name();
	if (_js_global_type_map.find(typeName) == _js_global_type_map.end())
	{
		p = (js_type_class_t *)malloc(sizeof(js_type_class_t));
		p->jsclass = jsb_cocos2d_GameJSB_class;
		p->proto = jsb_cocos2d_GameJSB_prototype;
		p->parentProto = NULL;
		_js_global_type_map.insert(std::make_pair(typeName, p));
	}
}

void register_all_cocos2dx_custom(JSContext* cx, JSObject* obj) {
	// first, try to get the ns
	JS::RootedValue nsval(cx);
	JS::RootedObject ns(cx);
	JS_GetProperty(cx, obj, "cc", &nsval);
	if (nsval == JSVAL_VOID) {
		ns = JS_NewObject(cx, NULL, NULL, NULL);
		nsval = OBJECT_TO_JSVAL(ns);
		JS_SetProperty(cx, obj, "cc", nsval);
	} else {
		JS_ValueToObject(cx, nsval, &ns);
	}
	obj = ns;

	js_register_cocos2dx_custom_GameJSB(cx, obj);
}


LOCAL_PATH := $(call my-dir)




include $(CLEAR_VARS)

LOCAL_MODULE := cocos2djs_shared

LOCAL_MODULE_FILENAME := libcocos2djs

LOCAL_SRC_FILES := hellojavascript/main.cpp \
                   jubaosdk/ShellApiJni.cpp \
                   ../../Classes/AppDelegate.cpp \
                   ../../Classes/forandroid/CallAndroid.cpp\
                   ../../Classes/forandroid/AndroidCallBack.cpp\
                   ../../Classes/logic/CallJS.cpp\
                   ../../Classes/logic/GameLogic.cpp\
                   ../../Classes/logic/Global.cpp\
                   ../../Classes/logic/GameUtil.cpp\
                   ../../Classes/logic/ResWord.cpp\
                   ../../Classes/logic/SqliteManager.cpp\
                   ../../Classes/logic/SQLiteWrapper.cpp\
                   ../../Classes/logic/autogensqlitebindings.cpp\
                   ../../Classes/scene/CBaseGScene.cpp\
                   ../../Classes/scene/NoticeLayer.cpp\
                   ../../Classes/scene/StartScene.cpp\
                   ../../Classes/web/res_image/ResData.cpp\
                   ../../Classes/web/res_image/ResDownload.cpp\
                   ../../Classes/web/res_image/LoadRes.cpp\
                   ../../Classes/web/HttpDownload.cpp\
                   ../../Classes/web/HttpVisit.cpp\
                   ../../Classes/web/WebHttpClient.cpp\
                   ../../Classes/thirdparty/lib_json/json_reader.cpp\
                   ../../Classes/thirdparty/lib_json/json_value.cpp\
                   ../../Classes/thirdparty/lib_json/json_writer.cpp\
                   ../../Classes/thirdparty/sqlite3/sqlite3.c\
                   ../../Classes/thirdparty/MD5.cpp\
    


LOCAL_C_INCLUDES := $(LOCAL_PATH)/../../Classes\
                    $(LOCAL_PATH)/../../../js-bindings/cocos2d-x/extensions\
                        $(LOCAL_PATH)/../../Classes/thirdparty/sqlite3\


LOCAL_WHOLE_STATIC_LIBRARIES := cocos_jsb_static
LOCAL_WHOLE_STATIC_LIBRARIES += jsb_chipmunk_static
LOCAL_WHOLE_STATIC_LIBRARIES += jsb_extension_static
LOCAL_WHOLE_STATIC_LIBRARIES += jsb_localstorage_static
LOCAL_WHOLE_STATIC_LIBRARIES += jsb_ui_static
LOCAL_WHOLE_STATIC_LIBRARIES += jsb_studio_static
LOCAL_WHOLE_STATIC_LIBRARIES += jsb_network_static
LOCAL_WHOLE_STATIC_LIBRARIES += jsb_builder_static
LOCAL_WHOLE_STATIC_LIBRARIES += jsb_spine_static


LOCAL_EXPORT_CFLAGS := -DCOCOS2D_DEBUG=2 -DCOCOS2D_JAVASCRIPT

include $(BUILD_SHARED_LIBRARY)
#set ndk module path
$(call import-add-path,$(LOCAL_PATH)/../../../js-bindings)\
$(call import-add-path,$(LOCAL_PATH)/../../../js-bindings/external)\
$(call import-add-path,$(LOCAL_PATH)/../../../js-bindings/cocos2d-x)\
$(call import-add-path,$(LOCAL_PATH)/../../../js-bindings/cocos2d-x/cocos)\
$(call import-add-path,$(LOCAL_PATH)/../../../js-bindings/cocos2d-x/external)\
$(call import-add-path,$(LOCAL_PATH)/../../../js-bindings/cocos2d-x/extensions)\
#ndk module path end


$(call import-module,bindings)
$(call import-module,bindings/manual/chipmunk)
$(call import-module,bindings/manual/extension)
$(call import-module,bindings/manual/localstorage)
$(call import-module,bindings/manual/network)
$(call import-module,bindings/manual/cocosbuilder)
$(call import-module,bindings/manual/ui)
$(call import-module,bindings/manual/cocostudio)
$(call import-module,bindings/manual/spine)

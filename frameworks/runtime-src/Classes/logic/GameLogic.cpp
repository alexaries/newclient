//
//  GameLogic.cpp
//  hero
//
//  Created by apple on 13-9-25.
//
//

#include "GameLogic.h"
#include "ScriptingCore.h"

//#include "C2DXShareSDK.h"
//using namespace cn::sharesdk;

#include "storage/local-storage/LocalStorage.h"

GameLogic::GameLogic(){
    mHasGetVersionInfo =false;
    mHasCheckVersion = false;
    mVersionData = NULL;
    mCanLoginAfterCheckVer = false;
    mLocalResInfos = CCArray::create();
    mLocalResInfos->retain();
    mNeedUpdateResInfos = CCArray::create();
    mNeedUpdateResInfos->retain();
    mNeedUpdateRes =false;
    mCanStartUpdateRes = false;
    mCheckLocalVersionOver = false;
    mCanNoticeResUpdate = false;
    mIsLoadingRes = false;
    mNoNetNum = 0;
    mResallsize = 0;
    mLoadIndex = 0;
    mResuploadsize = 0;
    mNeedReLoadRes = false;
    //mZonesList = CCArray::create();
    //mZonesList->retain();
    mVerifyPayloglist= CCArray::create();
    mVerifyPayloglist->retain();
    mChoosePicdata ="";
    mHallList = NULL;
    mCurrHall = NULL;
}
GameLogic::~GameLogic(){
    mLocalResInfos->release();
    mLocalResInfos = NULL;
    mNeedUpdateResInfos->release();
    mNeedUpdateResInfos = NULL;
    //mZonesList->release();
    //mZonesList = NULL;
    mVerifyPayloglist->release();
    mVerifyPayloglist = NULL;
}
void GameLogic::reInitData(){
    mHasGetVersionInfo =false;
    mHasCheckVersion = false;
    mVersionData = NULL;
    mCanLoginAfterCheckVer = false;
    mLocalResInfos = CCArray::create();
    mLocalResInfos->retain();
    mNeedUpdateResInfos = CCArray::create();
    mNeedUpdateResInfos->retain();
    mNeedUpdateRes =false;
    mCanStartUpdateRes = false;
    mCheckLocalVersionOver = false;
    mCanNoticeResUpdate = false;
    mIsLoadingRes = false;
    mNoNetNum = 0;
    mResallsize = 0;
    mLoadIndex = 0;
    mResuploadsize = 0;
    mNeedReLoadRes = false;
    //mZonesList = CCArray::create();
    //mZonesList->retain();
    mVerifyPayloglist= CCArray::create();
    mVerifyPayloglist->retain();

    
    mChoosePicdata ="";
    mHallList = NULL;
    mCurrHall = NULL;
}


//获取大厅
HallServer* GameLogic::getHall(){
    HallServer* hall = NULL;
    int quality = 10000;
    if(mHallList){
        for(int i=0;i<mHallList->count();i++){
            HallServer* thall = (HallServer*)mHallList->getObjectAtIndex(i);
            if(thall->quality < quality){
                quality = thall->quality;
                hall = thall;
            }
        }
    }
    return hall;
}


//清除更新的资源
void GameLogic::cleanUpdateRes(){
    log("---------cleanUpdateRes---");
    for(int i = 0;i<sGlobal->mNeedRemovePath.size();i++){
        string basepath  = GameUtil::getResPath();
        string path =basepath+sGlobal->mNeedRemovePath[i];
        if(GameUtil::CheckFolderExist(path.c_str())){ //删除 旧的 资源路径
            log("notice*****: del old res path:%s",path.c_str());
            bool result = removeDirAndFiles(path);//FileUtils::getInstance()->removeDirectory(path);
            if(result){
                log("del ok");
            }else{
                log("del fail");
            }
        }
    }
    
    string basepath  = GameUtil::getResPath();
    string path =basepath+sGlobal->mScriptDownPath;
    if(GameUtil::CheckFolderExist(path.c_str())){ //
        log("notice*****: del res path:%s",path.c_str());
        bool result = removeDirAndFiles(path);//FileUtils::getInstance()->removeDirectory(path);
        if(result){
            log("del ok");
        }else{
            log("del fail");
        }
    }
    
    SaveBooleanToXML(HAS_LOCAL_VERINFO,false);
    SaveStringToXML(VERSION_RES,"0");
    UserDefault::getInstance()->flush();//保存本地

}
//删除文件夹
bool GameLogic::removeDirAndFiles(string pDirectoryName){
    bool result = false;
    #if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
        result = CallIOS::removeDirAndFiles(pDirectoryName);
    #endif
    #if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
        result = CallAndroid::removeDirAndFiles(pDirectoryName);
    #endif
    return result;
}



//获取初始数据
//如 服务器地址 版本号
void GameLogic::initGameData(){
    
    log("---------initGameData---");
    
    dealCppVersionBuild();
    
    
    for(int i = 0;i<sGlobal->mNeedRemovePath.size();i++){
        string basepath  = GameUtil::getResPath();
        string path =basepath+sGlobal->mNeedRemovePath[i];
        if(GameUtil::CheckFolderExist(path.c_str())){ //删除 旧的 资源路径
            log("notice*****: del old res path:%s",path.c_str());
            bool result = removeDirAndFiles(path);//FileUtils::getInstance()->removeDirectory(path);
            if(result){
                log("del ok");
                SaveBooleanToXML(HAS_LOCAL_VERINFO,false);
                UserDefault::getInstance()->flush();//保存本地
            }else{
                log("del fail");
            }
            
        }
    }

    
    sGlobal->mCallJS = new CallJS();
    sGlobal->mCallJS->init(); //从脚本获取数据 （服务器地址 版本号）
    
    if(sGlobal->mSqliteManager==NULL){
        sGlobal->mSqliteManager = new SqliteManager();
        sGlobal->mSqliteManager->init();
    }
    
//    if(sGlobal->mTest_NoNet){
//    	log("no net");
//        return;
//    }
    
    sGlobal->mResDownload = new ResDownload();
    sGlobal->mResData = new ResData();
    
    if(sGlobal->mWebHttpClient==NULL){
        sGlobal->mWebHttpClient = new WebHttpClient();
    }
    
    if(sGlobal->mHttpDownload==NULL){
        sGlobal->mHttpDownload = new HttpDownload();
    }
   
    
    string avatarpath = GameUtil::getImgPath(); //头像 保存路径
    if(!GameUtil::CheckFolderExist(avatarpath.c_str())){
        GameUtil::createDirectory(avatarpath.c_str());
    }
    string scriptpath = GameUtil::getScriptPath(); //更新资源 保存路径
    if(!GameUtil::CheckFolderExist(scriptpath.c_str())){
        log("create res path:%s",scriptpath.c_str());
        GameUtil::createDirectory(scriptpath.c_str());
        
        //要是更新目录被删除，重新创建时，把原来的版本号清除
        SaveBooleanToXML(HAS_LOCAL_VERINFO,false);
        SaveStringToXML(VERSION_RES,"0");
        UserDefault::getInstance()->flush();//保存本地
        
        sGlobal->mNeedCleanLocalGameResVersion = true;
        
    }
    
    string gamedownpath = GameUtil::getGameDownPath(); //游戏下载 保存路径
    if(!GameUtil::CheckFolderExist(gamedownpath.c_str())){
        GameUtil::createDirectory(gamedownpath.c_str());
    }
    
    
    bool haslocalverinfo = LoadBooleanFromXML(HAS_LOCAL_VERINFO);
        
    if(haslocalverinfo){//保存了 本地版本信息  ---客户端版本号 根据配置信息取 资源版本号取本地保存
        log("it has local version info");
        
        string jsclientver = "";
        string jsresversion = "0";
        string versioninfo = sGlobal->mVerInfoFormScript;
        vector<string> verstrs = GameUtil::split(versioninfo,"|");
        if(verstrs.size()==2){
            jsclientver = verstrs.at(0);
            jsresversion = verstrs.at(1);
        }
        string localresversion = LoadStringFromXML(VERSION_RES);
        if(atoi(jsresversion.c_str()) > atoi(localresversion.c_str())){
            localresversion = jsresversion;
        }
        sGlobal->mCurrResVersion = localresversion;
        //sGlobal->mCurrClientVersion = jsclientver;
        //sGlobal->mCurrClientVersion = LoadStringFromXML(VERSION_CLIENT);
        sGlobal->mCurrClientVersion = sGlobal->mAppCppVersion;
        
        log("mLocalResInfos---len=%zd",mLocalResInfos->count());
        
        
        
    }else{//第一次启动 －－没有本地版本信息
        log("it is first init");
        initDataByFirstOpen();
        
        sGlobal->mCurrClientVersion = sGlobal->mAppCppVersion;
        
        SaveStringToXML(VERSION_RES,sGlobal->mCurrResVersion);
        SaveStringToXML(VERSION_CLIENT,sGlobal->mCurrClientVersion);
        SaveBooleanToXML(HAS_LOCAL_VERINFO,true);
        UserDefault::getInstance()->flush();//保存本地
    }
    
    log("localresVersion==%s",sGlobal->mCurrResVersion.c_str());
    log("localclientVersion==%s",sGlobal->mCurrClientVersion.c_str());
    sGlobal->mAppVersion = sGlobal->mCurrClientVersion+"."+sGlobal->mCurrResVersion;
    sGlobal->mAppVersionShow = "v"+sGlobal->mCurrClientVersion+"."+sGlobal->mCurrResVersion;
    
    log("---------\n");
    
}


//第一次启动时 获取本地版本信息
void GameLogic::initDataByFirstOpen(){
    
    if(!LoadBooleanFromXML(HAS_LOCAL_VERINFO)){//本地没有版本数据时（第1次启动）
        string versioninfo = sGlobal->mVerInfoFormScript;
        vector<string> verstrs = GameUtil::split(versioninfo,"|");
        if(verstrs.size()==2){
            sGlobal->mCurrResVersion = verstrs.at(1);
            sGlobal->mCurrClientVersion = verstrs.at(0);
        }
        SaveBooleanToXML("musicon",true);
        SaveBooleanToXML("soundon",true);
        UserDefault::getInstance()->flush();//保存本地
    }
}
//进入后台
void GameLogic::applicationDidEnterBackground(){
    log("applicationDidEnterBackground----");
    sGlobal->mCallJS->enterForeBackground(2);
}


//从后台重新进入
void GameLogic::applicationWillEnterForeground(){
    log("applicationWillEnterForeground----");
    
    if(sGlobal->mDoQuitGameBySDK){
        sGlobal->mDoQuitGameBySDK = false;
        Director::getInstance()->end();
    }else{
        sGlobal->mCallJS->enterForeBackground(1);
    }
    
}

//检查 客户端 版本与目标 版本 （）
int GameLogic::checkClientVersionDif(string tcver){
    int result = 1;
    
    int c_ver_1 = 0;
    int c_ver_2 = 0;
    vector<string> verstrs = GameUtil::split(sGlobal->mAppCppVersion,".");
    if(verstrs.size()>1){
        c_ver_1 = atoi(verstrs.at(0).c_str());
        c_ver_2 = atoi(verstrs.at(1).c_str());
    }
    
    int t_c_ver_1 = 0;
    int t_c_ver_2 = 0;
    vector<string> t_verstrs = GameUtil::split(tcver,".");
    if(t_verstrs.size()>1){
        t_c_ver_1 = atoi(t_verstrs.at(0).c_str());
        t_c_ver_2 = atoi(t_verstrs.at(1).c_str());
    }
    
    if(c_ver_1 == t_c_ver_1 && c_ver_2==t_c_ver_2){//
        result = 0;
    }else  if(c_ver_1 >= t_c_ver_1 && c_ver_2 >= t_c_ver_2){//
        result = 1;
    }else {//
        result = -1;
    }
    log("cver =%s tcver=%s == %d ",sGlobal->mAppCppVersion.c_str(),tcver.c_str(),result);
    return result;
}

//检查版本信息
void GameLogic::checkVersion(){
    log("----------\n checkVersion---");
    bool hasClientUpLoad = false;
    if(mVersionData->uploadUrl.length() > 0){
        hasClientUpLoad = true;
    }
    //------ client update -------------
    if(hasClientUpLoad){
        int verdif = checkClientVersionDif(mVersionData->uploadVersion);
        int forceverdif = checkClientVersionDif(mVersionData->forceUploadVersion);
        //verdif = -1;
        //forceverdif = -1;
        sGlobal->mNeedClientUpload = 0;
        if(verdif <= 0){
            sGlobal->mNeedClientUpload = 1;
        }
        if(forceverdif <= 0){
            sGlobal->mNeedClientUpload = 2;
        }
    }
    //------ res update -------------
    mNeedUpdateResInfos->removeAllObjects();
    bool needupdate = false;
    int allsize = 0;
    int localver = atoi(sGlobal->mCurrResVersion.c_str());
    if(!GameUtil::stringequals(sGlobal->mAppVersion, mVersionData->clientVersion)){//版本号不一致
        for(int i=0;i<mVersionData->reslist->count();i++){
            ResVersionInfo* verinfo = (ResVersionInfo*)mVersionData->reslist->getObjectAtIndex(i);
            log("checkVersion---%d-%d",verinfo->currVersion,localver);
            if(localver < verinfo->currVersion){
                mNeedUpdateResInfos->addObject(verinfo);
                needupdate = true;
                allsize = allsize + verinfo->size;
            }
        }
    }
    log("allsize ==%d",allsize);
    string allsizestr = GameUtil::getFileSize(allsize);
    log("sss size ==%s",allsizestr.c_str());
    mResallsize = allsize;
    mResuploadsize = 0;
    int num = mNeedUpdateResInfos->count();
    char sizestr[120];
    sprintf(sizestr, "%s%d%s%s",sResWord->w_filesize_s1.c_str(),num,sResWord->w_filesize_s2.c_str(),allsizestr.c_str());
    
    mUpdateResInfo = sizestr;
    mNeedUpdateRes = needupdate;
    mCheckLocalVersionOver = true;
    log("----------\n");
    if(!needupdate){
        if(sGlobal->mStartScene){
            sGlobal->mStartScene->updateTip(sResWord->w_loadshow);
        }
    }
    
}


//开始更新资源
void GameLogic::startUpdateRes(){
    log("startUpdateRes---");
    mIsLoadingRes = true;
    sGlobal->mCanLoadRes = true;
    
    mLoadErrorRes.clear();
    
    sGlobal->mHttpDownload->clearreses();
    for(int i=0;i<mNeedUpdateResInfos->count();i++){
        ResVersionInfo* verinfo = (ResVersionInfo*)mNeedUpdateResInfos->getObjectAtIndex(i);
        verinfo->loadIndex = i+1;
        sGlobal->mHttpDownload->addRes(verinfo);
    }
}

//资源加载完成
void GameLogic::resLoadEnd(ResVersionInfo* info){
    log("resLoadEnd---%d==state:%d",info->currVersion,info->updatestate);
    bool isLastRes = false;
    bool haserror = false;
    if(info->loadIndex == mNeedUpdateResInfos->count()){
        isLastRes = true;
        log("-----it is the last res");
    }
    if(info->updatestate == RES_UPDATE_LOAD_SUC){//下载成功
        bool result = true;
        
        if(info->type != 1){
            result =GameUtil::unzip(info->savepath,info->unzippath,0);
        }else{
            result =GameUtil::unzip(info->savepath,info->unzippath,1);
        }
        if(result){//解压成功 保存到本地
            info->updatestate = RES_UPDATE_END;
            mResuploadsize = mResuploadsize + info->size;
            log("mResuploadsize==%lld/%lld",mResuploadsize,mResallsize);
            
        }else{//解压失败
            info->updatestate = RES_UPDATE_UNZIP_FAIL;
            //没有处理
            mLoadErrorRes.push_back(info->currVersion);
            haserror = true;
        }
    }else if(info->updatestate == RES_UPDATE_LOAD_FAIL){//下载失败
        //没有处理
        mLoadErrorRes.push_back(info->currVersion);
        haserror = true;
    }
    if(haserror){
        if(info->type == 9){
            sGlobal->mCallJS->doDownTestResEnd(2);
        }else if(info->type == 1){
            sGlobal->mCallJS->doDownGameResEnd(info->gameId,info->resName,info->updatestate);
        }else{
            loadreserror();
        }
        return;
    }
    if(info->type == 9){
        sGlobal->mCallJS->doDownTestResEnd(1);
    }else if(info->type == 1){//游戏基本资源
        log("-----game base res loadover");
        setGameResVersion(info);
        sGlobal->mCallJS->doDownGameResEnd(info->gameId,info->resName,info->updatestate);
        
    }else {
        bool isAllLoadEnd = checkALlResUpdateEnd();
        if(isAllLoadEnd){//所有资源加载完成 设置可登录  设置版本号
            log("--------allres is LoadEnd-----");
            if(sGlobal->mStartScene){
                sGlobal->mStartScene->updateTip(sResWord->w_loadshow);
            }
            
            //设置版本号
            sGlobal->mCurrResVersion = sGlobal->mGameLogic->mVersionData->resVersion;
            
            sGlobal->mCurrClientVersion = sGlobal->mGameLogic->mVersionData->clientVersion;
            SaveStringToXML(VERSION_RES,sGlobal->mCurrResVersion);
            SaveStringToXML(VERSION_CLIENT,sGlobal->mCurrClientVersion);
            UserDefault::getInstance()->flush();//保存本地
            
            sGlobal->mAppVersion = sGlobal->mCurrClientVersion+"."+sGlobal->mCurrResVersion;
            
            mIsLoadingRes = false;
            //设置可登录
            sGlobal->mGameLogic->mCanLoginAfterCheckVer = true;
        }else{
            if(isLastRes){
                log("-----load res error");
                loadreserror();
            }
        }
    }
    
}
//设置下载游戏基本资源状态
void GameLogic::setGameResVersion(ResVersionInfo* info){
    char keystr[100];
    //数据保存 key  ："gres_"+gameId+"_ver"
    sprintf(keystr,"gres_%d_ver",info->gameId);
    //var key = "gres_"+gdata.mResName+"_state"
    
    char statestr[10];
    sprintf(statestr,"%d",info->updatever);
    
    string key = keystr;
    localStorageSetItem(key,statestr);//
    log("-----setGameResVersion  %s=%s",keystr,statestr);
}

//加载资源错误
void GameLogic::loadreserror(){
    string allname = "";
    for(int i=0;i<mLoadErrorRes.size();i++){
        allname += mLoadErrorRes.at(i);
        if(i!=mLoadErrorRes.size()-1){
            allname+="|";
        }
    }
    if(sGlobal->mStartScene){
        sGlobal->mStartScene->updateTip(sResWord->w_error_loadres);
    }
    sGlobal->mGameLogic->showSysNotice(sResWord->w_error_loadres+allname);
    //资源加载失败时 处理
    //sGlobal->mGameLogic->mCanLoginAfterCheckVer = true;
    
    sGlobal->mGameLogic->mNeedReLoadRes = true;
    sGlobal->mGameLogic->mHasCheckVersion = false;
    sGlobal->mCanLoadRes = false;
}


//检查所有资源更新完成
bool GameLogic::checkALlResUpdateEnd(){
    bool retult = true;
    for(int i=0;i<mNeedUpdateResInfos->count();i++){
        ResVersionInfo* verinfo = (ResVersionInfo*)mNeedUpdateResInfos->getObjectAtIndex(i);
        if(verinfo->updatestate != RES_UPDATE_END){
            retult = false;
        }
    }
    return retult;
}
//显示增加加载的索引号
void GameLogic::showLoadIndex(int index){
    mLoadIndex = index;
    log("showLoadIndex------%d/%zd",index,mNeedUpdateResInfos->count());
}


//http访问失败
void GameLogic::httpVisitFail(string code){
    log("httpVisitFail----%s",code.c_str());
    if(sGlobal->mTest_NoCheckVersion){
        sGlobal->mGameLogic->mCanLoginAfterCheckVer = true;
        return;
    }else{
//        if(!sGlobal->mFirstVisit){
//            showSysNotice(sResWord->w_error_ver);
//        }
    }
    if(sGlobal->mStartScene){
        sGlobal->mStartScene->updateTip(sResWord->w_error_ver);
    }
    if(sGlobal->mFirstVisit){
        sGlobal->mFirstVisit = false;
        if(sGlobal->mStartScene){
            sGlobal->mStartScene->loadVersionInfo();
        }
    }else{
        string lenstr = localStorageGetItem("portalurllen");
        int len = atoi(lenstr.c_str());
        
        if(!sGlobal->mUseSqliteUrl){
            sGlobal->mUseSqliteUrl = true;
            sGlobal->mSqliteUrlIndex = 0;
        }else{
            sGlobal->mSqliteUrlIndex++;
        }
        log("SqliteUrlIndex/len----%d/%d",sGlobal->mSqliteUrlIndex,len);
        if(sGlobal->mSqliteUrlIndex < len){
            if(sGlobal->mStartScene){
                sGlobal->mStartScene->loadVersionInfo();
            }
        }else{
            showSysNotice(sResWord->w_error_ver);
        }
    }

}

//保存门户地址
void GameLogic::savePortalUrl(vector<string> urls){
    int len = urls.size() ;
    log("savePortalUrl----%d",len);
    char lenstr[10];
    sprintf(lenstr,"%d",len);
    localStorageSetItem("portalurllen",lenstr);
    for(int i=0;i<len;i++){
        string url = urls.at(i);
        char indexstr[20];
        sprintf(indexstr,"portalurl_%d",i);
        localStorageSetItem(indexstr,url);//
    }
}
//获取门户地址
string GameLogic::getPortalUrl(int index){
    string url = "";
    string lenstr = localStorageGetItem("portalurllen");
    int len = atoi(lenstr.c_str());
    if(index < len){
        char indexstr[20];
        sprintf(indexstr,"portalurl_%d",index);
        url = localStorageGetItem(indexstr);
    }
    return url;
}

//添加搜索路径 后面添加的优先级在前（跟Script引擎设置的相反）
void GameLogic::addSearchPathToFirst(string path){
    //log("addSearchPathToFirst==%s",path.c_str());
    bool isContain = false;
    vector<string> searchPaths = FileUtils::getInstance()->getSearchPaths();
    for(int i=0;i<searchPaths.size();i++){
        string aPath = searchPaths.at(i);
        if(GameUtil::stringequals(aPath, path)){
            isContain = true;
            break;
        }
    }
    if(!isContain){
        vector<string> searchPaths = FileUtils::getInstance()->getSearchPaths();
        vector<string>::iterator iter = searchPaths.begin();
        searchPaths.insert(iter, path);
        FileUtils::getInstance()->setSearchPaths(searchPaths);
        //FileUtils::getInstance()->addSearchPath(path.c_str());//后面添加的优先级在后
    }
}


//添加查找路径 index 0 最前面
void GameLogic::addSearchPathByIndex(string path,int index){
    //log("addSearchPathToFirst==%s",path.c_str());
    bool isContain = false;
    vector<string> searchPaths = FileUtils::getInstance()->getSearchPaths();
    for(int i=0;i<searchPaths.size();i++){
        string aPath = searchPaths.at(i);
        if(GameUtil::stringequals(aPath, path)){
            isContain = true;
            break;
        }
    }
    if(!isContain){
        vector<string> searchPaths = FileUtils::getInstance()->getSearchPaths();
        vector<string>::iterator iter = searchPaths.begin()+index;
        searchPaths.insert(iter, path);
        FileUtils::getInstance()->setSearchPaths(searchPaths);
        //FileUtils::getInstance()->addSearchPath(path.c_str());//后面添加的优先级在后
    }
}


//返回 平台  phone  pc
string GameLogic::getPlatform(){
    string g_platform = "";
    string tplatform = "";
    Application* sharedApplication = Application::getInstance();
    Application::Platform target = sharedApplication->getTargetPlatform();
    if (target == Application::Platform::OS_WINDOWS){
        g_platform = "windows";
        tplatform = "pc";
    }else if (target == Application::Platform::OS_ANDROID){
        g_platform = "android";
        tplatform = "phone";
    }else if (target == Application::Platform::OS_IPHONE || target == Application::Platform::OS_IPAD){
        g_platform = "iphone";
        tplatform = "phone";
        if (target == Application::Platform::OS_IPHONE){
            g_platform = "iphone";
            tplatform = "phone";
        } else{
            g_platform = "ipad";
            tplatform = "pc";
        }
    }
    return tplatform;
}
//获取要验证的订单号
string GameLogic::getVerifyOrderNos(int zoneId,string useridstr){
    log("getVerifyOrderNos---");
    string result = "";
    int64_t userid = 0;
    #if (CC_TARGET_PLATFORM == CC_PLATFORM_WIN32)
        userid = atol(useridstr.c_str());
    #else
        userid = atoll(useridstr.c_str());
    #endif
    

    sGlobal->mSqliteManager->loadPayLogList(zoneId, userid);
    int size = mVerifyPayloglist->count();
    for(int i=0;i<size;i++){
        Paylog* log = (Paylog*)mVerifyPayloglist->getObjectAtIndex(i);
        if(sGlobal->mAgent == AGENT_APPLE){
            result = result+log->orderno+":"+log->msg+"|";
        }else{
            result = result+log->orderno+"|";
        }
    }
    log("result==%s",result.c_str());
    return result;
}
//设置充值纪录状态 1成功 3失败
void GameLogic::setVPaylogState(string orderno,int state){
    log("setVPaylogState==%s == %d",orderno.c_str(),state);
    sGlobal->mSqliteManager->updatePaylog("", orderno, "", state);
}
//打开webview
void GameLogic::showWebView(string url,int type){
    log("showWebView==%s",url.c_str());
    if(!sGlobal->mIsShowPTWebView){
        sGlobal->mIsShowPTWebView = true;
        #if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
            CallIOS::showWebView(url,type);
        #endif
        #if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
            CallAndroid::showWebView(url,type);
        #endif
    }
}
//关闭webview
void GameLogic::closeWebView(){
    log("closeWebView==");
    if(sGlobal->mIsShowPTWebView){
        sGlobal->mIsShowPTWebView = false;

        #if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
            CallIOS::closeWebView();
        #endif
        #if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
            CallAndroid::closeWebView();
        #endif
    }
}

//生成订单号
string GameLogic::makeOrderNo(){
    char orderno[60];
    int num = GameUtil::randomInt(100000);
    sprintf(orderno,"%ld%05d_%d_%lld",abs(GameUtil::getTimeNow()),num,sGlobal->mCurrZoneId_pay,sGlobal->mUserId_pay);
    return orderno;
}
//网络状态
NetState GameLogic::getNetState(){
    NetState state = NoNetWork;
    #if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
        state = CallIOS::getNetState();
    #endif
    #if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
        state = CallAndroid::getNetState();
    #endif
    return state;
}

//设置头像 (stype 0头像 1上传) type  0相册 1拍照
void GameLogic::setAvatarImg(int stype,int type){
    log("setAvatarImg==%d",type);
    log("upavatarurl=%s",sGlobal->mUrl_upavatar.c_str());
    #if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
        CallIOS::setAvatarImg(stype,type);
    #endif
    #if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
        CallAndroid::setAvatarImg(stype,type);
    #endif
}

//跳转到某地址
void GameLogic::gotoUrl(string url){
    log("gotoUrl==%s",url.c_str());
    #if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
        CallIOS::gotoUrl(url);
    #endif
    
    #if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
        CallAndroid::gotoUrl(url);
    #endif
}

//显示公告
void GameLogic::showSysNotice(string msg){
    log("showSysNotice==%s",msg.c_str());
    #if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
        CallIOS::showNotice(msg);
    #endif
    #if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
        CallAndroid::showNotice(msg);
    #endif
}
//官方平台 充值 使用 app store ，googleplay
void GameLogic::gotoPay(string orderNo,string einfo,int money,int zoneId,string userid){
    log("GameLogic=gotoPay=%s",orderNo.c_str());
    sGlobal->mCurrZoneId_pay = zoneId;
    int64_t tuserid = 0;
    #if (CC_TARGET_PLATFORM == CC_PLATFORM_WIN32)
        tuserid = atol(userid.c_str());
    #else
        tuserid = atoll(userid.c_str());
    #endif
    sGlobal->mUserId_pay = tuserid;
    log("gotoPay==%s",orderNo.c_str());
    #if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
        if (sGlobal->mAgent == AGENT_APPLE){
           PurchaseCPP::buy(orderNo);
        }
    #endif
    #if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
        CallAndroid::gotoPay(orderNo,einfo,money);
    #endif
}

//银联充值
void GameLogic::gotoPay_Upmp(string tn,string orderno){
    log("gotoPay_Upmp==%s",tn.c_str());
    gotoPayByType("upmp",orderno,tn,0,"");
}

//按类型充值
void GameLogic::gotoPayByType(string type,string orderNo,string einfo,int money,string data){
    log("gotoPayByType==%s",type.c_str());
    
    int zoneId = 1;
    string userid = "0";
    vector<string> verstrs = GameUtil::split(einfo,"_");
    if(verstrs.size()>2){
        zoneId = atoi(verstrs.at(1).c_str());
        userid = verstrs.at(2);
        sGlobal->mCurrZoneId_pay = zoneId;
        int64_t tuserid = 0;
        #if (CC_TARGET_PLATFORM == CC_PLATFORM_WIN32)
                tuserid = atol(userid.c_str());
        #else
                tuserid = atoll(userid.c_str());
        #endif
        sGlobal->mUserId_pay = tuserid;
    }
    
    
    #if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
        CallIOS::gotoPayByType(type,orderNo,einfo,money,data);
    #endif
    #if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
        CallAndroid::gotoPayByType(type,orderNo,einfo,money,data);
    #endif
}

//type alipay
void GameLogic::doHttpSign(string type,string data){
    
    string urldata = GameUtil::UrlEncode(data);
    
    char urlstr[600];
    sprintf(urlstr, "%s?paydata=%s",sGlobal->mUrl_Sign_ali.c_str(),urldata.c_str());
    string url = urlstr; //agent="+sGlobal->mAgent+"&
    log("doHttpSign----%s",url.c_str());
    sGlobal->mWebHttpClient->addHttpReq("sign",url,"post","");
}

void GameLogic::getHttpSignResult(string rdata){
    string encode = GameUtil::UrlEncode(rdata);//再编码一次
    log("getHttpSignResult----%s",encode.c_str());
#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    CallIOS::gotoPayForAli_sign(encode);
#endif
}

void GameLogic::dealResult_ali(string result){
    //log("dealResult_ali----%s",result.c_str());
    string orderNo = "";
    
    
    vector<string> verstrs = GameUtil::split(result,";");
    for(int i = 0;i<verstrs.size();i++){
        string str = verstrs.at(i);
        long index = str.find("out_trade_no=");
        if(index > -1){
            orderNo = str.substr(index+14,str.length()-1 - index-14);
            long index1 = orderNo.find_first_of("&");
            string msg = "";
            orderNo = orderNo.substr(0,index1-1);
            
            sGlobal->mCallJS->payok(orderNo,msg);
            
            int zoneid = sGlobal->mCurrZoneId_pay;
            int64_t uid = sGlobal->mUserId_pay;
            sGlobal->mSqliteManager->insertPaylog(zoneid,uid,"",orderNo,msg, PAYSTATE_VERIFY);
        }
    }
    log("orderNo----%s",orderNo.c_str());
    
}

//  1成功 2失败
void GameLogic::showPayResult(int state){
    log("showWxPayResult---IOS==%d",state);
    if(state == 1){
        string orderNo =sGlobal->mOrderNo_pay;
        string msg = "";
        
        sGlobal->mCallJS->payok(orderNo,msg);
        int zoneid = sGlobal->mCurrZoneId_pay;
        int64_t uid = sGlobal->mUserId_pay;
        sGlobal->mSqliteManager->insertPaylog(zoneid,uid,"",orderNo,msg, PAYSTATE_VERIFY);
    }else{
        sGlobal->mGameLogic->showSysNotice(sResWord->w_pay_unfinish);
    }
}



void GameLogic::dealAlipayResult_ios(){
    log("dealAlipayResult_ios----%lu",sGlobal->mPayResults_ali.size());
    
    
    for(int i=0;i<sGlobal->mPayResults_ali.size();i++){
        string result = sGlobal->mPayResults_ali.at(i);
        dealResult_ali(result);
        
    }
}

//使用sdk登录
void GameLogic::gotoSDKLogin(){
    log("gotoSDKLogin---");
    #if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
        CallAndroid::gotoSDKLogin();
    #endif
}


//显示积分墙
void GameLogic::showScoreWall(int64_t uid,string typestr){
    log("showScoreWall==%s",typestr.c_str());
    #if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
        CallIOS::showScoreWall(uid,typestr);
    #endif
    
    #if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
        CallAndroid::showScoreWall(uid,typestr);
    #endif
}
//显示积分墙积分管理
void GameLogic::showScoreManagerForScoreWall(int64_t uid,string typestr){
    log("showScoreManagerForScoreWall==%s",typestr.c_str());
    #if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
        CallIOS::showScoreManagerForScoreWall(uid,typestr);
    #endif
    #if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
        CallAndroid::showScoreManagerForScoreWall(uid,typestr);
    #endif
}
//显示广告条
void GameLogic::showBannerAD(string type,float heightrate){
    log("showBannerAD==%s",type.c_str());
    #if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
        CallIOS::showBannerAD(type,heightrate);
    #endif
    
}
//隐藏广告条
void GameLogic::hiddenBannerAD(string type){
    log("hiddenBannerAD==%s",type.c_str());
    #if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
        CallIOS::hiddenBannerAD(type);
    #endif
}

//获取游戏版本（cpp）
string GameLogic::getAppBaseVersion(){
    log("getAppBaseVersion--");
    string ver = "";
    #if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
        ver = CallIOS::getAppBaseVersion();
    #endif
    #if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
        ver = CallAndroid::getAppBaseVersion();
    #endif
    return ver;
}

//获取唯一编号
string GameLogic::getMyUUID(){
    log("getMyUUID--");
    string uuid = "";
#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    uuid = CallIOS::getMyUUID();
#endif
#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
    uuid = CallAndroid::getMyUUID();
#endif
    return uuid;
}

//处理cpp 版本号和build
void GameLogic::dealCppVersionBuild(){
    string basever = getAppBaseVersion(); //1.3_8
    vector<string> verstrs = GameUtil::split(basever,"_");
    if(verstrs.size()>1){
        sGlobal->mAppCppVersion = verstrs.at(0);
        sGlobal->mAppCppbuild = verstrs.at(1);
    }
    if(verstrs.size()>2){
        sGlobal->mDeviceModel = verstrs.at(2);
    }
    log("mAppCppVersion--%s mAppCppbuild==%s",sGlobal->mAppCppVersion.c_str(),sGlobal->mAppCppbuild.c_str());
}



//发送本地推送
//type 0清除之前de 1 （多久没登录执行） 2每周六 7点 执行
void GameLogic::sendLocalPushMsg(int type,string info,int repeat,int delayday,int delaytime){
    log("sendLocalPushMsg=%d||%d||%d||%d=%s",type,repeat,delayday,delaytime,info.c_str());
#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    CallIOS::sendLocalPushMsg(type,info,repeat,delayday,delaytime);
#endif
#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
    CallAndroid::sendLocalPushMsg(type,info,repeat,delayday,delaytime);
#endif
}


//void shareResultHandler(C2DXResponseState state, C2DXPlatType platType, CCDictionary *shareInfo, CCDictionary *error)
//{
//    int type = 0;
//    if(platType == C2DXPlatTypeWeixiSession){
//        type = 1;
//    }else if(platType == C2DXPlatTypeWeixiTimeline){
//        type = 2;
//    }
//    switch (state) {
//        case C2DXResponseStateSuccess:
//            log("分享成功==%d",type);
//            
//            sGlobal->mCallJS->doShareEnd(type,1);
//            break;
//        case C2DXResponseStateFail:
//            log("分享失败==%d",type);
//            sGlobal->mCallJS->doShareEnd(type,2);
//            break;
//        default:
//            break;
//    }
//}

//显示分享 (type 0自己选 1好友 2朋友圈)
void GameLogic::showShare(int type,string title,string content1,string desc,string imgurl,string url,string siteUrl,string sitename){
    log("showShare==%s",title.c_str());
    //    #if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    //        CallIOS::showShare(title,content,defaultcontent,url,desc,imgurl);
    //    #endif
    
//    Dictionary *content = Dictionary::create();
//    content -> setObject(CCString::create(content1), "content");
//    content -> setObject(CCString::create(imgurl), "image");
//    content -> setObject(CCString::create(title), "title");
//    content -> setObject(CCString::create(desc), "description");
//    content -> setObject(CCString::create(url), "url");
//    content -> setObject(CCString::createWithFormat("%d", C2DXContentTypeNews), "type");
//    content -> setObject(CCString::create(siteUrl), "siteUrl");
//    content -> setObject(CCString::create(sitename), "site");
//    content -> setObject(CCString::create(""), "musicUrl");
//    content -> setObject(CCString::create("extInfo"), "extInfo");
//    
//    if(type== 0){
//        C2DXShareSDK::showShareMenu(NULL, content, CCPointMake(100, 100), C2DXMenuArrowDirectionLeft, shareResultHandler);
//    }else if(type == 1){
//        C2DXShareSDK::showShareView(C2DXPlatTypeWeixiSession,content, shareResultHandler);
//    }else if(type == 2){
//        C2DXShareSDK::showShareView(C2DXPlatTypeWeixiTimeline,content, shareResultHandler);
//    }
    
    
}


//打开sdk某界面
void GameLogic::openSdkView(int code){
    log("GameLogic=openSdkView=%d",code);
    #if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
        CallAndroid::gotoShowDSKView(code);
    #endif
    
}
//加载图片
void GameLogic::loadPic(string aid,string picname,string url){
    log("GameLogic=loadPic=%s=%s",aid.c_str(),picname.c_str());
    sGlobal->mResData->addToLoadByName(aid, picname,url);
}

//获取手机电量 信号强度 时间
void GameLogic::getPhoneInfoForBatterySignal(){
    int batterylevel = 50;
    int signallevel = 50;
#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    batterylevel = CallIOS::getBatteryInfo();
    signallevel = CallIOS::getSignalInfo();
#endif
#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
    batterylevel = CallAndroid::getBatteryInfo();
    signallevel = CallAndroid::getSignalInfo();
#endif
    
    log("batterylevel=%d",batterylevel);
    log("signallevel=%d",signallevel);
    sGlobal->mCallJS->getPhoneInfoForBatterySignalEnd(batterylevel, signallevel);
}

//选择图片结束
void GameLogic::choosePicEnd(int state,string data){
    sGlobal->mCallJS->choosePicEnd(state,data);
    
    //android 需要延时 （不然黑图）
    if(state==1&&data.length() > 0){
        mChoosePicdata = data;
        Scene *pCurScene = Director::getInstance()->getRunningScene();
        ActionInterval* delay = DelayTime::create(0.8);
        //auto calback =  CallFunc::create(CC_CALLBACK_0(GameLogic::showChoosePic,this, data));
        auto calback = CallFunc::create(CC_CALLBACK_0( GameLogic::showChoosePic,this));
        //showChoosePic(data);
        Action *action = Sequence::create(delay,calback,NULL);
        action->setTag(98765);
        pCurScene->stopActionByTag(98765);
        pCurScene->runAction(action);
    }
    
}
//显示选择图片
void GameLogic::showChoosePic(){
    string data = mChoosePicdata;
    log("show choose pic");
    int len = 0;
    unsigned char *buffer;
    len = base64Decode((unsigned char*)data.c_str(), (unsigned int)data.length(), &buffer);
    
    Image* img = new Image();
    img->initWithImageData(buffer,len);
    Texture2D* tex = new Texture2D();
    tex->initWithImage(img);
    Scene *pCurScene = Director::getInstance()->getRunningScene();
    Sprite* pSprite2 = (Sprite*)pCurScene->getChildByTag(989898);
    if(!pSprite2){
        pSprite2 = Sprite::createWithTexture(tex);
        Size visibleSize = Director::getInstance()->getVisibleSize();
        pSprite2->setAnchorPoint(Vec2(0.5, 0));
        pSprite2->setPosition(visibleSize.width/2, 29);
        pCurScene->addChild(pSprite2, 101,989898);
        float scale = 210/pSprite2->getContentSize().height;
        pSprite2->setScale(scale, scale);
    }else{
        pSprite2->initWithTexture(tex);
        float scale = 210/pSprite2->getContentSize().height;
        pSprite2->setAnchorPoint(Vec2(0.5, 0));
        pSprite2->setScale(scale, scale);
    }
    log("show choose pic end");
    log("picdata=%s",data.c_str());
    mChoosePicdata = "";
}
//隐藏选择图片
void GameLogic::hiddenChoosePic(){
    Scene *pCurScene = Director::getInstance()->getRunningScene();
    pCurScene->stopActionByTag(98765);
    auto pSprite2 = pCurScene->getChildByTag(989898);
    if(pSprite2){
        pCurScene->removeChild(pSprite2);
    }
}

//更新apk
void GameLogic::startUpdateApk(string url){
    #if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
        CallAndroid::startUpdateApk(url);
    #endif
}

//新的充值
void GameLogic::paynew(int channel,string payAgent,string orderNo,string paydata){
    log("paynew::%d",channel);
    sGlobal->mOrderNo_pay = orderNo;
    #if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
        CallAndroid::gotoPaynew(channel,payAgent,orderNo,paydata);
    #endif
    #if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
        CallIOS::gotoPaynew(channel,payAgent,orderNo,paydata);
    #endif
}


/**
 //进行某操作
 //code
 //1:获取配置 服务器地址 版本
 //1001:获取配置 服务器地址 版本
 //2:设置头像
 //3: 给js 传递数据
 //4:打开webview 1帮助 2公告 3用户协议 4全屏竖屏（有问题） 5全屏横屏 6上下有bar横屏
 //5:打开关闭view
 //6: 跳到某地址 add 0715
 //7:银联支付  add 0818
 //8:renderer add 0822
 //9: 改变本地存储的值 add 0827
 //10:公告 打开webview0912 1帮助 2公告 3用户协议 4全屏竖屏（有问题） 5全屏横屏
 //11:清除某个js 脚本 add 1014
 //12:添加搜索路径 add 1106
 //13:获取app版本（xml）1216
 //14:获取uuid
 //15:选择图片（相册、照相），返回base64   160105
 //16:删除选择的图片 160105
 //17:js调用cpp访问url 160105
 //20:sdk登录
 //21:sdk充值
 //50:传递配置数据（如支付宝数据）
 //70:本地推送
 //80:获取手机电量 信号强度 时间
 //81:android back 一次 提示
 //101:分享
 //102:积分墙 展示 add1128
 //103:积分墙 积分管理
 //104:广告 展示
 //105:广告 隐藏
 //191:分享 好友
 //192:分享 朋友圈
 //200:清除更新资源
 //201:删除某文件
 //500:新充值
 //885:下载apk
 //888:下载游戏资源
 //889:获取下载游戏资源进度
 //890:取消下载 --未实现
 //900:下载测试版本更新包
 */
void GameLogic::doSomeString(int code,string para1,string para2,string para3,string para4,string para5){
    log("GameLogic=doSomeString=%d",code);
    if(code == 1001){//重新 加载 (资源版本自动加1)
        log("reload -------");
        string type = para1;
        if(type != "99"){
            int resver = atoi(sGlobal->mCurrResVersion.c_str()) + 1;
            
            char resverstr[10];
            sprintf(resverstr, "%d",resver);
            
            sGlobal->mCurrResVersion = resverstr;
            
            sGlobal->mAppVersion = sGlobal->mCurrClientVersion+"."+sGlobal->mCurrResVersion;
            sGlobal->mAppVersionShow = "v"+sGlobal->mCurrClientVersion+"."+sGlobal->mCurrResVersion;
            
            SaveStringToXML(VERSION_RES,sGlobal->mCurrResVersion);
            SaveBooleanToXML(HAS_LOCAL_VERINFO,true);
            UserDefault::getInstance()->flush();//保存本地
        }
        
        this->reInitData();//重新初始化数据
        
        sGlobal->mUseAppConfig = "1";
        
        sGlobal->mCallJS->getConfigData("1");
        
        StartScene::Show();
    }else if(code == 1){//获取配置
        string serverloginUrl = para1;
        string versioninfo = para2;
        string serverResUrl = para3;
        string versionfor = para4;
        string serverloginUrlIp = para5;
        log("serverurl==%s",serverloginUrl.c_str());
        log("versioninfo==%s",versioninfo.c_str());
        log("serverloginUrlIp==%s",serverloginUrlIp.c_str());
        log("serverResUrl==%s",serverResUrl.c_str());
        log("versionfor==%s",versionfor.c_str());

        sGlobal->mServerUrl = serverloginUrl;
        sGlobal->mUrl_avatar = serverResUrl+"avatar/";
        sGlobal->mUrl_upavatar = serverResUrl+"upAvatar.do";
        sGlobal->mVerInfoFormScript = versioninfo;
        sGlobal->mVersionFor = versionfor;
        sGlobal->mServerUrlIp = serverloginUrlIp;


        
        
        #if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
            CallAndroid::setBaseDataToAndroid(sGlobal->mServerUrl,"","","","");
        #endif
    }else if(code == 2){//设置头像
        int type = atoi(para1.c_str()); //type 0相册 1拍照
        int64_t uid = 0;
        #if (CC_TARGET_PLATFORM == CC_PLATFORM_WIN32)
            uid = atol(para2.c_str());
        #else
            uid = atoll(para2.c_str());
        #endif
        sGlobal->mMyUid = uid;
        setAvatarImg(0,type);
    }else if(code == 3){// 给js 传递数据
        sGlobal->mCallJS->setDataToScript();
        //sGlobal->mCallJS->setOpenUrlData();
        if(sGlobal->mNeedCleanLocalGameResVersion){
            sGlobal->mNeedCleanLocalGameResVersion = false;
            sGlobal->mCallJS->cleanLocalGameResVersion();
        }
        
    }else if(code == 4){ // 打开webview 1帮助 2公告 3用户协议 4全屏竖屏（有问题） 5全屏横屏 6上下有bar横屏
        string url = para1;
        int type = atoi(para2.c_str());//
        showWebView(url,type);
    }else if(code == 5){// 打开关闭view
        closeWebView();
    }else if(code == 6){// 跳到某地址
        string url = para1;
        gotoUrl(url);
    }else if(code == 7){// 银联支付
        string tradeno = para1;
        string orderno = para2;
        gotoPay_Upmp(tradeno,orderno);
    }else if(code == 8){// renderer
        Director::getInstance()->getRenderer()->render();
    }else if(code == 9){//改变本地存储的值
        string type = para1;  //"1" 字符串 2bool 3int
        string key = para2;
        string value = para3;
        if(type == "1"){
            SaveStringToXML(key.c_str(),value);
        }else if(type == "2"){
            SaveBooleanToXML(key.c_str(),value=="0"?false:true);
        }else if(type == "3"){
            SaveIntegerToXML(key.c_str(),atoi(value.c_str()));
        }
        
        UserDefault::getInstance()->flush();//保存本地
    }else if(code == 10){ // 打开webview 公告1帮助 2公告 3用户协议 4全屏竖屏（有问题） 5全屏横屏
        string url = para1;
        int type = atoi(para2.c_str());//
        showWebView(url,type);
    }else if(code == 11){ //清除某个js 脚本
        string path = para1;
        ScriptingCore::getInstance()->cleanScript(path.c_str());
    }else if(code == 12){ //添加搜索路径
        string path = para1;
        int index = atoi(para2.c_str());//
        addSearchPathByIndex(path, index);
    }else if(code == 13){ //获取app版本（xml）1216
        sGlobal->mCallJS->getAppBaseVersion();
    }else if(code == 14){ //获取uuid
        string uuid = getMyUUID();
        sGlobal->mCallJS->getUUIDEnd(uuid);
    }else if(code == 15){////15:选择图片（相册、照相），返回base64
        int type = atoi(para1.c_str()); //type 0相册 1拍照
        int64_t uid = 0;
        #if (CC_TARGET_PLATFORM == CC_PLATFORM_WIN32)
                uid = atol(para2.c_str());
        #else
                uid = atoll(para2.c_str());
        #endif
        sGlobal->mMyUid = uid;
        setAvatarImg(1,type);
    }else if(code == 16){//16:删除选择的图片
        hiddenChoosePic();
        
    }else if(code == 17){ //17:js调用cpp访问url
        //code 前加 js_
        string code = "js_"+para1;
        string url = para2;
        string type = para3;
        string params = para4;
        sGlobal->mWebHttpClient->addHttpReq(code,url,type,params);
        
    }else if(code == 20){ //sdk登录
        gotoSDKLogin();
    }else if(code == 21){ //sdk充值
        string type = para1;
        string orderno = para2;
        string einfo = para3;
        int money = atoi(para4.c_str());//
        string data = para5;
        gotoPayByType(type,orderno,einfo,money,data);
    }else if(code == 22){
        int type = atoi(para1.c_str());//
        openSdkView(type);
    }else if(code == 50){ //50:传递配置数据（如支付宝数据）
        string aliPartner = para1;
        string aliSeller = para2;
        string payurl = para3;

        sGlobal->mUrl_Sign_ali = payurl+ "alipaySign.go";
        sGlobal->mUrl_notifypay_ali = payurl+ "alipayNotify.go";
        
        log("mUrl_Sign_ali==%s",sGlobal->mUrl_Sign_ali.c_str());
        log("mUrl_notifypay_ali==%s",sGlobal->mUrl_notifypay_ali.c_str());

        
        log("aliPartner==%s",aliPartner.c_str());
        log("aliSeller==%s",aliSeller.c_str());
        
        sGlobal->mPartner_ali = aliPartner;
        sGlobal->mSeller_ali = aliSeller;
        
        #if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
            CallAndroid::setBaseDataToAndroid(payurl,sGlobal->mPartner_ali,sGlobal->mSeller_ali,"","");
        #endif
        
    }else if(code == 70){ //
        string msg = para1;
        int type = atoi(para2.c_str());
        int repeat = atoi(para3.c_str());
        int durday = atoi(para4.c_str());
        int durtime = atoi(para5.c_str());
        sendLocalPushMsg(type,msg,repeat,durday,durtime);
    }else if(code == 80){ //80:获取手机电量 信号强度 时间
        getPhoneInfoForBatterySignal();
    }else if(code == 81){ //81:android back 一次 提示
        #if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
            CallAndroid::clickBackForQuitTip();
        #endif
    }else if(code == 101||code == 191||code == 192){ // 101:分享
        
        int type = 0;
        if(code == 191){
            type = 1;
        }else if(code == 192){
            type = 2;
        }
        //CallCpp.doSomeString(20, shareData.title+"|"+shareData.url, shareData.imgurl, shareData.content,shareData.desc, shareData.sitename+"|"+shareData.siteUrl);
        string title = "";
        string url = "";
        vector<string> p1s = GameUtil::split(para1,"|");
        if(p1s.size()==2){
            title = p1s.at(0);
            url = p1s.at(1);
        }
        string imgurl = para2;
        string content = para3;
        string desc = para4;
        string sitename = "";
        string siteUrl = "";
        vector<string> p5s = GameUtil::split(para5,"|");
        if(p5s.size()==2){
            sitename = p5s.at(0);
            siteUrl = p5s.at(1);
        }
        showShare(type,title,content,desc,imgurl,url,siteUrl,sitename);
    }else if(code == 102){ // 102:积分墙
        int64_t uid = 0;
        #if (CC_TARGET_PLATFORM == CC_PLATFORM_WIN32)
            uid = atol(para1.c_str());
        #else
            uid = atoll(para1.c_str());
        #endif
        string typestr = para2;//
        showScoreWall(uid,typestr);
    }else if(code == 103){ // 103:积分墙  积分管理
        int64_t uid = 0;
        #if (CC_TARGET_PLATFORM == CC_PLATFORM_WIN32)
                uid = atol(para1.c_str());
        #else
                uid = atoll(para1.c_str());
        #endif
        string typestr = para2;//
        showScoreManagerForScoreWall(uid,typestr);
    }else if(code == 104){ // 104:广告 展示
        string typestr = para1;//
        float heightrate = atof(para2.c_str());
        showBannerAD(typestr,heightrate);
    }else if(code == 105){ // 105:广告 隐藏
        string typestr = para1;//
        hiddenBannerAD(typestr);
    }else if(code == 200){ //200:清除更新资源
        cleanUpdateRes();
    }else if(code == 201){ //201:删除某文件
        string path = para1;//
        GameUtil::removeFile(path);
    }else if(code == 500){ //500:新充值
        int channel = atoi(para1.c_str());//渠道号
        string payAgent = para2;//充值代理编号
        string orderNo = para3;//订单号
        string paydata = para4;//充值数据
        string tdata = para5;//zoneId_userid
        vector<string> verstrs = GameUtil::split(tdata,"_");
        if(verstrs.size()>=2){
            int zoneId = atoi(verstrs.at(0).c_str());
            string userid = verstrs.at(1);
            sGlobal->mCurrZoneId_pay = zoneId;
            int64_t tuserid = 0;
            #if (CC_TARGET_PLATFORM == CC_PLATFORM_WIN32)
                tuserid = atol(userid.c_str());
            #else
                tuserid = atoll(userid.c_str());
            #endif
            sGlobal->mUserId_pay = tuserid;
        }
        log("pay channel = %d", channel);
        log("pay payAgent = %s", payAgent.c_str());
        log("pay orderNo = %s", orderNo.c_str());
        log("pay paydata = %s", paydata.c_str());
        paynew(channel,payAgent,orderNo,paydata);
    }else if(code == 501){ //聚宝sdk支付
            int channel = 6;
            string amount = para1;
            string goodsName = para2;
            string playerId = para3;
            log("pay amount = %s", amount.c_str());
            log("pay goodsName = %s", goodsName.c_str());
            log("pay playerId = %s", playerId.c_str());
            paynew(channel,amount,goodsName,playerId);
    }else if(code == 885){ //885:下载apk
        string apkurl = para1;
        startUpdateApk(apkurl);
    }else if(code == 888){ //888:下载游戏资源
        string oid = para1;
        string gameId = para2;//游戏id（一个游戏可能对应几个资源。暂时用1个资源。有多个游戏使用同样的mp3）
        string url = para3;
        string resname = para4;//(唯一，资源名)
        string version = para5;
        downLoadGameBaseRes(oid,gameId,resname,url,version);
    }else if(code == 889){ //889:获取下载游戏资源进度
        ResVersionInfo*  res = sGlobal->mHttpDownload->getCurrResInfo();
        int loadsize = sGlobal->mHttpDownload->getressizeuploaded();
        log("loadsize==%d",loadsize);
        if(res){
            sGlobal->mCallJS->setGameResDownSize(res->gameId,res->resName,loadsize);
        }
    }else if(code == 890){ //890:取消下载
        sGlobal->mHttpDownload->cancelDownload();
    }else if(code == 900){ //900:下载测试版本更新包
        string url = para1;
        downloadLocalTestUpdataRes(url);
    }

}
//下载游戏基本资源
void GameLogic::downLoadGameBaseRes(string oid,string gameId,string resname,string url,string version){
    log("downloadLocalTestUpdataRes===%s---%s",gameId.c_str(),resname.c_str());
    ResVersionInfo* verinfo = new ResVersionInfo();
    verinfo->currVersion = 1;
    verinfo->loadIndex = 1;
    verinfo->url = url;
    verinfo->type = 1;
    verinfo->resName = resname;
    verinfo->gameId = atoi(gameId.c_str());
    verinfo->updatever = atoi(version.c_str());
    sGlobal->mHttpDownload->addRes(verinfo);
}
//下载本地测试更新资源
void GameLogic::downloadLocalTestUpdataRes(string url){
    log("downloadLocalTestUpdataRes===");
    ResVersionInfo* verinfo = new ResVersionInfo();
    verinfo->currVersion = atoi(sGlobal->mCurrResVersion.c_str())+1;
    verinfo->loadIndex = 1;
    verinfo->url = url;
    verinfo->type = 9;
    sGlobal->mHttpDownload->addRes(verinfo);
}
//获取透明区域百分比（像素读取）215 316  25,10
int GameLogic::pixelReadFromRenderTexture(RenderTexture* pRender,cocos2d::Rect &readRect){
    int x =readRect.origin.x;
    int y =readRect.origin.y;
    int w = readRect.size.width;
    int h = readRect.size.height;
    int allpointlen = w*h;
    int notoupointlen = 0;

    log("pixelReadFromRenderTexture=%d-%d-%d-%d",x,y,w,h);
    auto image = pRender->newImage();
    unsigned char * data = image->getData();
    unsigned int *pixel = (unsigned int *)data;
    for(int i=0;i<w;i++){
        for(int j=0;j<h;j++){
            unsigned int * tpixel= pixel + ((j+y) *w) + (i+x);
            int a = (*tpixel >> 24) & 0xff;
            if(a > 1){
                notoupointlen++;
            }
        }
    }
    int percent = (int)((allpointlen-notoupointlen)*1.0/allpointlen*100);
    log("touming per==%d=%d-%d",percent,allpointlen,notoupointlen);
    return percent;
}




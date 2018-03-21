//
//  GameUtil.cpp
//  cardgame
//
//  Created by apple on 12-12-19.
//
//

#include "GameUtil.h"

//#include "netdb.h"
//
//#ifdef WIN32
//#include <Winsock2.h>
//#else
//#include <arpa/inet.h>
//#endif

#include "cocos-ext.h"
USING_NS_CC_EXT;

#include <curl/curl.h>
#include <curl/easy.h>
#include <stdio.h>
#include <vector>

#if (CC_TARGET_PLATFORM != CC_PLATFORM_WIN32)
#include <sys/types.h>
#include <sys/stat.h>
#include <unistd.h>
#include <errno.h>

#include <stdlib.h>
#include <dirent.h>
#include <string.h>

#endif





#include "unzip/unzip.h"

//#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
//#include <jni.h>
//#include "platform/android/jni/JniHelper.h"
//#include <android/log.h>
//#endif



#define BUFFER_SIZE    8192
#define MAX_FILENAME   512
#define F_OK 0

// 获取时间（long）
long GameUtil::getTimeNow()
{
    struct timeval now;
    gettimeofday(&now, NULL);
    return (now.tv_sec * 1000 + now.tv_usec / 1000);
}
//获取当前时间（string）
std::string GameUtil::NowTime()
{
    long timeSec = getTimeNow();
    char str[64] = {0};
    time_t timep = timeSec;
    sprintf(str, "%s",asctime(gmtime(&timep)));
    return str;
}

int GameUtil::randomInt(int max){
    int value = 0;
    #if (CC_TARGET_PLATFORM != CC_PLATFORM_WIN32)
        value = arc4random() % max;
    #else

    #endif
    return value;
}

float GameUtil::randomFloat(){
    #if (CC_TARGET_PLATFORM != CC_PLATFORM_WIN32)
        int value = arc4random() % 1000000;
        float a = value/1000000.0;
        return a;
    #else
        return 0;
    #endif
    
}
int GameUtil::toInt(float value){
    int value1 = int(value+0.5);
    return value1;
}

std::string GameUtil::randChars(int len){
    #if (CC_TARGET_PLATFORM != CC_PLATFORM_WIN32)
        const char CCH[63] = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        int i,j;
        srand((int)time(0));//初始化随机数发生器
        char astr[len+1];
        for(i=0;i<len;i++)
        {
            j= rand()%62;//取得0~25的随机数
            astr[i] = CCH[j];
        }
        astr[len] = 0;
        return astr;
    #else
        return “”;
    #endif
}


//判断2个string相等
bool GameUtil::stringequals(std::string s1,std::string s2)
{
    
    bool result = false;
    if(s1.size()==s2.size()){//
        const char *p= s1.c_str();
        const char *s= s2.c_str();
        int flag = 0 ;
        while (*p!='\0' && *s!='\0' )
        {
            if (*p!=*s)
            {
                flag =0;//只要1个不同就退出
                break;
            }else{
                flag =1;
            }
            p++;
            s++;
        }
        if (flag)
        {
            result = true;
        }
    }
    return result;
}
//去空格
std::string GameUtil::trim(std::string s){
    s.erase(0,s.find_first_not_of("\r\t\n "));
    s.erase(s.find_last_not_of("\r\t\n ")+1);
    return s;
}

//替换字符串
std::string GameUtil::m_replace(std::string str,std::string pattern,std::string dstPattern,int count)
{
    std::string retStr="";
    string::size_type pos;
    
    int szStr=str.length();
    //int szPattern=pattern.size();
    int i=0;
    int l_count=0;
    if(-1 == count) // replace all
        count = szStr;
    
    for(i=0; i<szStr; i++)
    {
        pos=str.find(pattern,i);
        
        if(std::string::npos == pos)
            break;
        if(pos < szStr)
        {
            std::string s=str.substr(i,pos-i);
            retStr += s;
            retStr += dstPattern;
            i=pos+pattern.length()-1;
            if(++l_count >= count)
            {
                i++;
                break;
            }
        }
    }
    retStr += str.substr(i);
    return retStr;
}



//替换字符串－－use this
string& GameUtil::ReplaceAll(string& context,const string &from,const string& to)
{
    
    size_t lookHere=0;
    size_t foundHere;
    while((foundHere=context.find(from,lookHere))!=string::npos)
    {
        context.replace(foundHere,from.size(),to);
        lookHere=foundHere+to.size();
    }
    return context;
    
}


//按 字符 分割字符串
vector<string> GameUtil::split(string& str,const char* c)
{
    char *cstr, *p;
    vector<string> res;
    cstr = new char[str.size()+1];
    strcpy(cstr,str.c_str());
    p = strtok(cstr,c);
    while(p!=NULL)
    {
        res.push_back(p);
        p = strtok(NULL,c);
    }
    delete cstr;
    return res;
}

std::string GameUtil::getResPath()
{
    std::string path = FileUtils::getInstance()->getWritablePath();
    #if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
        path = CallIOS::getResCachePath();
    #endif
    return path;
}
std::string GameUtil::getImgPath()
{
    std::string path = FileUtils::getInstance()->getWritablePath();
    #if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
        path = CallIOS::getResCachePath();
    #endif
    path+="imgs/";
    return path;
}

std::string GameUtil::getScriptPath(){
    string basepath  = GameUtil::getResPath();
    string scriptpath = basepath + sGlobal->mScriptDownPath;
    return scriptpath;
}


std::string GameUtil::getGameDownPath(){
    string basepath  = GameUtil::getResPath();
    string scriptpath = basepath + sGlobal->mGameDownPath;
    return scriptpath;
}

//根据版本号获取资源路径（读写）/xxx/v1/
std::string GameUtil::getResPath(string version){
    std::string path = FileUtils::getInstance()->getWritablePath();
    #if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
        path = CallIOS::getResCachePath();
    #endif
    //path+= "v"+version+"/";
    path+= "v/";
    return path;
}

string GameUtil::getSavepath(string basepath,string unzippath){
    string path = "";
    int index = unzippath.find_first_of("/");
    if(index == 0){
        unzippath = unzippath.substr(1);
    }
    //log("unzippath--%s",unzippath.c_str());
    path = basepath+unzippath;
    return path;
}

//创建多级目录
bool GameUtil::createDirectorys(string basepath,string createpath){
    bool result = true;
//    vector<string> paths = split(createpath,"/");
//    int num = 0;
//    int index[paths.size()];
//    
//    for(int i=0;i<paths.size();i++){
//        string path = paths.at(i);
//        if(!stringequals(path, "")){
//            index[num] = i;
//            num++;
//            string apath = "";
//            for(int j=0;j<num;j++){
//                apath+="/"+paths[index[j]];
//            }
//            apath = basepath+apath+"/";
//            //log("apath==%s",apath.c_str());
//            createDirectory(apath.c_str());
//        }
//    }
    return result;
}
/*
* //新建文件夹
*/
bool GameUtil::createDirectory(const char *path)
{
    //log("createDirectory==%s",path);
    #if (CC_TARGET_PLATFORM != CC_PLATFORM_WIN32)
        mode_t processMask = umask(0);
        int ret = mkdir(path, S_IRWXU | S_IRWXG | S_IRWXO);
        umask(processMask);
        if (ret != 0 && (errno != EEXIST))
        {
            return false;
        }
        
        return true;
    #else
        BOOL ret = CreateDirectoryA(path, NULL);
        if (!ret && ERROR_ALREADY_EXISTS != GetLastError())
        {
            return false;
        }
        return true;
    #endif
}

bool GameUtil::CheckFolderExist(const char *path){
    
    #if (CC_TARGET_PLATFORM != CC_PLATFORM_WIN32)
        bool rValue = false;
        if(access(path,F_OK) == 0){
            rValue = true;
        }
        return rValue;
    #else
        WIN32_FIND_DATA wfd;
        bool rValue = false;
        HANDLE hFind = FindFirstFile((LPCTSTR)path, &wfd);
        if ((hFind != INVALID_HANDLE_VALUE) && (wfd.dwFileAttributes & FILE_ATTRIBUTE_DIRECTORY))
        {
            rValue = true;
        }
        FindClose(hFind);
        
        return rValue;
    #endif
}






//按路径解压缩文件
bool GameUtil::unzip(string path,string unzippath,int type){
    //log("-----unzip==p1=%s",path.c_str());
    // Open the zip file
    string _storagePath = getScriptPath();//getSavepath(getResPath(),unzippath);
    if(type == 1){
        _storagePath = getGameDownPath();
    }
    //log("-----unzip==p2=%s",_storagePath.c_str());
    
    string outFileName = path;
    unzFile zipfile = unzOpen(outFileName.c_str());
    if (! zipfile)
    {
        log("can not open downloaded zip file %s", outFileName.c_str());
        return false;
    }
    
    // Get info about the zip file
    unz_global_info global_info;
    if (unzGetGlobalInfo(zipfile, &global_info) != UNZ_OK)
    {
        log("can not read file global info of %s", outFileName.c_str());
        unzClose(zipfile);
        return false;
    }
    
    // Buffer to hold data read from the zip file
    char readBuffer[BUFFER_SIZE];
    
    log("start uncompressing");
    
    // Loop to extract all files.
    uLong i;
    for (i = 0; i < global_info.number_entry; ++i)
    {
        // Get info about current file.
        unz_file_info fileInfo;
        char fileName[MAX_FILENAME];
        if (unzGetCurrentFileInfo(zipfile,
                                  &fileInfo,
                                  fileName,
                                  MAX_FILENAME,
                                  NULL,
                                  0,
                                  NULL,
                                  0) != UNZ_OK)
        {
            log("can not read file info");
            unzClose(zipfile);
            return false;
        }
        
        string fullPath = _storagePath + fileName;
        
        // Check if this entry is a directory or a file.
        const size_t filenameLength = strlen(fileName);
        if (fileName[filenameLength-1] == '/')
        {
            // Entry is a direcotry, so create it.
            // If the directory exists, it will failed scilently.
            if (!createDirectory(fullPath.c_str()))
            {
                log("can not create directory %s", fullPath.c_str());
                unzClose(zipfile);
                return false;
            }
        }
        else
        {
            // Entry is a file, so extract it.
            
            // Open current file.
            if (unzOpenCurrentFile(zipfile) != UNZ_OK)
            {
                log("can not open file %s", fileName);
                unzClose(zipfile);
                return false;
            }
            
            // Create a file to store current file.
            FILE *out = fopen(fullPath.c_str(), "wb");
            if (! out)
            {
                log("can not open destination file %s", fullPath.c_str());
                unzCloseCurrentFile(zipfile);
                unzClose(zipfile);
                return false;
            }
            
            // Write current file content to destinate file.
            int error = UNZ_OK;
            do
            {
                error = unzReadCurrentFile(zipfile, readBuffer, BUFFER_SIZE);
                if (error < 0)
                {
                    log("can not read zip file %s, error code is %d", fileName, error);
                    unzCloseCurrentFile(zipfile);
                    unzClose(zipfile);
                    return false;
                }
                
                if (error > 0)
                {
                    fwrite(readBuffer, error, 1, out);
                }
            } while(error > 0);
            
            fclose(out);
        }
        
        unzCloseCurrentFile(zipfile);
        
        // Goto next entry listed in the zip file.
        if ((i+1) < global_info.number_entry)
        {
            if (unzGoToNextFile(zipfile) != UNZ_OK)
            {
                log("can not read next file");
                unzClose(zipfile);
                return false;
            }
        }
        //log("fullPath=%s",fullPath.c_str());
    }
    //解压完成后删除
    if (remove(outFileName.c_str()) != 0)
    {
        log("can not remove downloaded zip file %s", outFileName.c_str());
    }
    
    log("end uncompressing");
    return true;
}
void GameUtil::removeFile(string path){
    //删除
    if (remove(path.c_str()) != 0)
    {
        log("can not remove  file %s", path.c_str());
    }
    
}



string GameUtil::getFileSize(int size){
    string str = "";
    if(size < 1024){
        str = "1K";
    }else if(size < 1024*1024){
        float num = size/1024.0;
        char sizestr[100];
        sprintf(sizestr, "%.01fK",num);
        str = sizestr;
    }else{
        float num = size/(1024*1024.0);
        char sizestr[100];
        sprintf(sizestr, "%.01fM",num);
        str = sizestr;
    }
    return str;
}

Sprite* GameUtil::getMainButtonSprite1(std::string bgname,std::string word,int fontsize){
    Sprite* btnsprite = Sprite::create(bgname.c_str());
    if(btnsprite){
        auto *label = LabelTTF::create(word.c_str(), "Arial", fontsize);
        if(label){
            Size size1 = btnsprite->getContentSize();
            label->setPosition(Vec2(size1.width*0.5, size1.height*0.5));
            label->setColor(Color3B(255,255,255));
            btnsprite->addChild(label,1);
        }
    }
    return btnsprite;
}

Scale9Sprite* GameUtil::createPanel(string frame,Vec2  size){
    Scale9Sprite* btnframe = Scale9Sprite::create();
    btnframe->initWithSpriteFrameName(frame);
    btnframe->setContentSize(Size(size.x, size.y));
    return btnframe;
}

Sprite* GameUtil::createFrameSprite(string frame,string inner,Vec2 size){
    Sprite* btnbg = Sprite::create(inner,Rect(0,0,size.x,size.y));
    if(btnbg){
        Texture2D::TexParams p = {GL_LINEAR,GL_LINEAR,GL_REPEAT,GL_REPEAT};
        btnbg->getTexture()->setTexParameters(p);
        
        Scale9Sprite* btnframe = Scale9Sprite::create(frame);
        //btnframe->initWith
        btnframe->setContentSize(Size(size.x+4*2, size.y));
        btnframe->setPosition(Vec2(size.x*0.5,size.y*0.5+1));
        btnbg->addChild(btnframe);
        
    }
    return btnbg;
}


unsigned char ToHex(unsigned char x)
{
    return  x > 9 ? x + 55 : x + 48;
}

std::string GameUtil::UrlEncode(const std::string& str)
{
    std::string strTemp = "";
    size_t length = str.length();
    for (size_t i = 0; i < length; i++)
    {
        if (isalnum((unsigned char)str[i]) ||
            (str[i] == '-') ||
            (str[i] == '_') ||
            (str[i] == '.') ||
            (str[i] == '~'))
            strTemp += str[i];
        else if (str[i] == ' ')
            strTemp += "+";
        else
        {
            strTemp += '%';
            strTemp += ToHex((unsigned char)str[i] >> 4);
            strTemp += ToHex((unsigned char)str[i] % 16);
        }
    }
    return strTemp;
}

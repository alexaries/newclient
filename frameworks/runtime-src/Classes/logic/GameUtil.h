//
//  GameUtil.h
//  cardgame
//
//  Created by apple on 12-12-19.
//
//

#ifndef cardgame_GameUtil_h
#define cardgame_GameUtil_h
#include "Header.h"
#include "extensions/cocos-ext.h"
USING_NS_CC_EXT;
using namespace cocos2d;


class GameUtil
{
public:
    // 获取时间（long）
    static long getTimeNow();
    //获取当前时间（string）
    static std::string NowTime();
    static int randomInt(int max);
    static float randomFloat();
    static int toInt(float value);
    static std::string randChars(int len);
    
    //判断2个string相等
    static bool stringequals(std::string s1,std::string s2);
    //去空格
    static std::string trim(std::string s1);
    //替换字符串
    static std::string m_replace(std::string str,std::string pattern,std::string dstPattern,int count=-1);
    //替换字符串－－use this
    static string& ReplaceAll(string& context,const string &from,const string& to);
    //按 字符 分割字符串
    static vector<string> split(string& str,const char* c);
    static std::string getResPath();
    //根据版本号获取资源路径（读写）/xxx/v1/
    static std::string getResPath(string version);
    static std::string getImgPath();
    static std::string getScriptPath();
    static std::string getGameDownPath();
    
    static void removeFile(string path);
        
    //创建多级目录
    static bool createDirectorys(string basepath,string createpath);
    //新建文件夹
    static bool createDirectory(const char *path);
    static bool CheckFolderExist(const char *path);

    //按路径解压缩文件
    static bool unzip(string path,string unzippath,int type);
    
static std::string UrlEncode(const std::string& str);
    
    static string getSavepath(string basepath,string unzippath);

    static Sprite* getMainButtonSprite1(std::string bgname,std::string word,int fontsize);
    
    static string getFileSize(int size);
    
    static Scale9Sprite* createPanel(string frame,Vec2  size);
    
    static Sprite* createFrameSprite(string frame,string inner,Vec2  size);
};


#endif

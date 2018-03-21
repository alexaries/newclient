//
//  SqliteManager.h
//  hero
//
//  Created by apple on 13-9-25.
//
//

#ifndef qpgame_SqliteManager_h
#define qpgame_SqliteManager_h

#include "Header.h"
//json_lib.h 位置
//CCArmature/external_tool/json/lib_json/ －2.1.4 ; extensions/CocoStudio/Json/lib_json －2.2.0
#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS) //ios 把 路径 添加进去后 直接引用
#include "sqlite3.h"
#elif (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)   //android 使用全部路径 win?
#include "thirdparty/sqlite3/sqlite3.h"
#elif (CC_TARGET_PLATFORM == CC_PLATFORM_WIN32)
#include "sqlite3.h"
#endif

#define IS_EXISTED_GAME_DB "_IS_EXISTED_QPGAME_DATABASE_1"//更新数据库  1011 --1

//资源版本信息
class SqliteManager: public Ref
{
public:
    SqliteManager(void);
	~SqliteManager(void);
    
   void init();
    

    void loadPayLogList(int zoneid,int64_t uid);
    
    
    void insertPaylog(int zoneid,int64_t uid,string pid,string orderno,string msg,int state);
    void updatePaylog(string pid,string orderno,string msg,int state);
private:
    void createDataBase();

    void createTablePayLog(sqlite3 *pDB);
    
    void loadVPayLogs(sqlite3 *pDB,int zoneid,int64_t uid);
    static int loadPayLog( void * para, int n_column, char ** column_value, char ** column_name );
    static int loadVPayLog( void * para, int n_column, char ** column_value, char ** column_name );

public:
    bool mIsopen;//
private:
    sqlite3 *mDBBase;
    int usenum;//
    string mDBpath;//android多线程时取不到路径 要先初始化
    
};

#endif
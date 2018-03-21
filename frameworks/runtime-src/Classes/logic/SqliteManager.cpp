//
//  SqliteManager.cpp
//  gamesanguo
//
//  Created by apple on 13-2-25.
//
//

#include "SqliteManager.h"
//主场景
SqliteManager::SqliteManager(void)
{
    log("SqliteManager---");
    mDBBase = NULL;
    usenum = 0;
    mDBpath = "";
}

SqliteManager::~SqliteManager(void)
{
   log("SqliteManager---over");
}
//初始化
void SqliteManager::init()
{
    log("SqliteManager---init");
    std::string path = FileUtils::getInstance()->getWritablePath()+"qpgame_wc.db";
    mDBpath = path;
    bool isExit = LoadBooleanFromXML(IS_EXISTED_GAME_DB);
    if(!isExit){
        createDataBase();
    }

}



//初始化数据库
void SqliteManager::createDataBase(){
    
    log("SqliteManager---createDataBase");
    
    mDBBase = NULL;//数据库指针
    usenum = 0;
    char * errMsg = NULL;//错误信息
    int result;//sqlite3_exec返回值

    //打开一个数据库，如果该数据库不存在，则创建一个数据库文件
    std::string path = mDBpath;
    result = sqlite3_open(path.c_str(), &mDBBase);
    if( result != SQLITE_OK ){
        log( "打开数据库失败，错误码:%d ，错误原因:%s\n" , result, errMsg);
    }
    usenum++;
    
    createTablePayLog(mDBBase);
    
    //关闭数据库
    usenum--;
    if(usenum == 0){
        sqlite3_close(mDBBase);
        mDBBase = NULL;
    }
    SaveBooleanToXML(IS_EXISTED_GAME_DB,true);
    UserDefault::getInstance()->flush();//保存本地
}





void SqliteManager::createTablePayLog(sqlite3 *pDB){
    std::string sqlstr;//SQL指令
    int result;//sqlite3_exec返回值
    char * errMsg = NULL;//错误信息
    sqlstr = "DROP TABLE IF EXISTS paylog";
    result=sqlite3_exec( pDB, sqlstr.c_str() , NULL, NULL, &errMsg );
    if( result != SQLITE_OK ){
        log( "删除表失败paylog，错误码:%d ，错误原因:%s\n" , result, errMsg );
    }else{
        //log( "删除表成功card，\n");
    }
    sqlstr = "CREATE TABLE paylog (id INTEGER PRIMARY KEY AUTOINCREMENT,zoneid int,uid bigint,pid varchar(60),orderno varchar(60) ,msg varchar(5000),state int)";
    
    //创建表，设置ID为主键，且自动增加
    result=sqlite3_exec( pDB, sqlstr.c_str() , NULL, NULL, &errMsg );
    if( result != SQLITE_OK ){
        log( "创建表失败paylog，错误码:%d ，错误原因:%s\n" , result, errMsg );
    }else{
        //log( "创建表成功card，\n");
    }
}

void SqliteManager::insertPaylog(int zoneid,int64_t uid,string pid,string orderno,string msg,int state){
    log("SqliteManager---insertPaylog=%s",orderno.c_str());
    
    char * errMsg = NULL;//错误信息
    int result;//sqlite3_exec返回值
    if(mDBBase == NULL){
        //打开一个数据库，如果该数据库不存在，则创建一个数据库文件
        std::string path = mDBpath;
        result = sqlite3_open(path.c_str(), &mDBBase);
        if( result != SQLITE_OK ){
            log( "打开数据库失败，错误码:%d ，错误原因:%s\n" , result, errMsg);
        }
    }
    usenum++;
    std::string sqlstr;//SQL指令
     
    char str[5200];
    sprintf(str, "insert into paylog (zoneid,uid,pid,orderno,msg,state) values (%d,%lld,'%s','%s','%s',%d)"
            ,zoneid,uid,pid.c_str(),orderno.c_str(),msg.c_str(),state);
    //插入数据
    sqlstr = str;
    //log("sql=%s   ===%d",str,sqlstr.length());
    result = sqlite3_exec( mDBBase, sqlstr.c_str() , NULL, NULL, &errMsg );
    if(result != SQLITE_OK ){
        log( "插入记录失败Paylog，错误码:%d ，错误原因:%s\n" , result, errMsg );

    }
    usenum--;
    if(usenum == 0){
        //关闭数据库
        sqlite3_close(mDBBase);
        mDBBase = NULL;
    }
}

void SqliteManager::loadPayLogList(int zoneid,int64_t uid){
    log( "loadPayLogList------------\n");
    
    char * errMsg = NULL;//错误信息
    std::string sqlstr;//SQL指令
    int result;//sqlite3_exec返回值
    if(mDBBase == NULL){
        //打开一个数据库，如果该数据库不存在，则创建一个数据库文件
        std::string path = mDBpath;
        result = sqlite3_open(path.c_str(), &mDBBase);
        if( result != SQLITE_OK ){
            log( "打开数据库失败，错误码:%d ，错误原因:%s\n" , result, errMsg);
        }
    }
    usenum++;
    sGlobal->mGameLogic->mVerifyPayloglist->removeAllObjects();
    loadVPayLogs(mDBBase,zoneid,uid);
    usenum--;
    if(usenum == 0){
        sqlite3_close(mDBBase);
        mDBBase = NULL;
    }
}



void SqliteManager::loadVPayLogs(sqlite3 *pDB,int zoneid,int64_t uid){
    log("loadVPayLogs---------");
    
    char * errMsg=NULL;
    char str[100];
    sprintf(str, "select * from paylog where zoneid = %d and uid = %lld and state=2 order by id"
            ,zoneid,uid);
    
	std::string sqlstr = str;
	int result = sqlite3_exec( pDB, sqlstr.c_str() ,loadVPayLog, NULL, &errMsg );
    if(result != SQLITE_OK ){
        log( "查询记录失败，错误码:%d ，错误原因:%s\n" , result, errMsg );
    }
    
}
int SqliteManager::loadPayLog( void * para, int n_column, char ** column_value, char ** column_name ){
    Paylog* log = new Paylog();
    log->autorelease();
    log->retain();
    log->idx = atoi(column_value[0]);
    log->zoneid= atoi(column_value[1]);
    log->uid= atoi(column_value[2]);
    log->pid= (string)(column_value[3]);
    log->orderno = (string)(column_value[4]);
    log->msg = (string)(column_value[5]);
    log->state = atoi(column_value[6]);
    CCLog("paylog=%s-%s--s=%d",log->pid.c_str(),log->orderno.c_str(),log->state);
    para = log;
    return 0;
}

int SqliteManager::loadVPayLog( void * para, int n_column, char ** column_value, char ** column_name ){
    Paylog* log = new Paylog();
    log->autorelease();
    log->retain();
    log->idx = atoi(column_value[0]);
    log->zoneid= atoi(column_value[1]);
    log->uid= atoi(column_value[2]);
    log->pid= (string)(column_value[3]);
    log->orderno = (string)(column_value[4]);
    log->msg = (string)(column_value[5]);
    log->state = atoi(column_value[6]);
    sGlobal->mGameLogic->mVerifyPayloglist->addObject(log);
    CCLog("vpaylog=%s-%s--s=%d",log->pid.c_str(),log->orderno.c_str(),log->state);
    para = log;
    return 0;
}

void SqliteManager::updatePaylog(string pid,string orderno,string msg,int state){
    log("SqliteManager---updatePaylog=%s",orderno.c_str());

    char * errMsg = NULL;//错误信息
    int result;//sqlite3_exec返回值
    if(mDBBase == NULL){
        //打开一个数据库，如果该数据库不存在，则创建一个数据库文件
        std::string path = mDBpath;
        result = sqlite3_open(path.c_str(), &mDBBase);
        if( result != SQLITE_OK ){
            log( "打开数据库失败，错误码:%d ，错误原因:%s\n" , result, errMsg);
        }
    }
    
    std::string sqlstr;//SQL指令
    
    char str[4000];
    if(state == PAYSTATE_FAIL || state == PAYSTATE_SUCCESS){
        sprintf(str, "update paylog set state = %d where orderno = '%s'"
                ,state,orderno.c_str());
    }else if(state == PAYSTATE_VERIFY){
        sprintf(str, "update paylog set state = %d,msg = '%s' where orderno = '%s'"
                ,state,msg.c_str(),orderno.c_str());
    }
    //插入数据
    sqlstr = str;
    //log("sql=%s   ===%d",str,sqlstr.length());
    result = sqlite3_exec( mDBBase, sqlstr.c_str() , NULL, NULL, &errMsg );
    if(result != SQLITE_OK ){
        log( "插入记录失败Paylog，错误码:%d ，错误原因:%s\n" , result, errMsg );
        
    }
    usenum--;
    if(usenum == 0){
        //关闭数据库
        sqlite3_close(mDBBase);
        mDBBase = NULL;
    }
}



/**
 * Created by apple on 15-1-5.
 * 系统数据 存 数据库 管理
 */
//系统数据 数据库
var HAS_LOCAL_DB_SYSDATA        = "hasLocaldbsysdata"; //是否有本地系统数据库
var LOCAL_DB_SYSDATA_VER        = "localdbsysdataver";//本地系统数据库 版本号

var LOCAL_CONFIG_JS_FILE_VER = [0,0,0,0,0,0,0,0];//本地js文件的版本

var CONFIG_GAMECONFIG       =   1
var CONFIG_PRIZE            =   2
var CONFIG_PROPS            =   3
var CONFIG_SIGNIN           =   4
var CONFIG_TASK             =   5
var CONFIG_USERLEVEL        =   6
var CONFIG_VIP              =   7

var CONFIG_N_GAMECONFIG       =   "gameconfig"
var CONFIG_N_PRIZE            =   "prize"
var CONFIG_N_PROPS            =   "props"
var CONFIG_N_SIGNIN           =   "signin"
var CONFIG_N_TASK             =   "task"
var CONFIG_N_USERLEVEL        =   "userlevel"
var CONFIG_N_VIP              =   "vip"

var DB_T_VER_GAMECONFIG         = "db_t_ver_gameconfig"
var DB_T_VER_PRIZE              = "db_t_ver_prize"
var DB_T_VER_PROPS              = "db_t_ver_props"
var DB_T_VER_SIGNIN             = "db_t_ver_signin"
var DB_T_VER_TASK               = "db_t_ver_task"
var DB_T_VER_USERLEVEL          = "db_t_ver_userlevel"
var DB_T_VER_VIP                = "db_t_ver_vip"

var LOCAL_DB_CONFIGS = [[CONFIG_GAMECONFIG,DB_T_VER_GAMECONFIG,CONFIG_N_GAMECONFIG],
    [CONFIG_PRIZE,DB_T_VER_PRIZE,CONFIG_N_PRIZE],
    [CONFIG_PROPS,DB_T_VER_PROPS,CONFIG_N_PROPS],
    [CONFIG_SIGNIN,DB_T_VER_SIGNIN,CONFIG_N_SIGNIN],
    [CONFIG_TASK,DB_T_VER_TASK,CONFIG_N_TASK],
    [CONFIG_USERLEVEL,DB_T_VER_USERLEVEL,CONFIG_N_USERLEVEL],
    [CONFIG_VIP,DB_T_VER_VIP,CONFIG_N_VIP]];


var SqliteManager = cc.Class.extend({
    mReqVer:2,//要求的数据库版本（每次修改表＋1） -151218
    _db:null,//数据库Wrapper
    _dbPath:"",//数据库路径
    _isOpen:null,//是否打开
    _useNum:0,//使用次数
    init:function(){

        log("js sql --- init")
        this._useNum = 0;

        var ls = cc.sys.localStorage;
        var hasdb = ls.getItem(HAS_LOCAL_DB_SYSDATA);
        var needCreateDB = false;
        if(!hasdb){
            needCreateDB = true
        }else{
            var localver = Number(ls.getItem(LOCAL_DB_SYSDATA_VER));
            log("dbver =="+localver+"| req="+this.mReqVer);
            if(this.mReqVer > localver){
                needCreateDB = true
            }
        }
        this._db = new sql.SQLiteWrapper();
        this._dbPath = this._db.initializing("data_sys.db", "res", "");
        if(needCreateDB){
            this.createDataBase();
        }

        //this.initTest();


    },
    //打开数据库
    openDB:function(){
        this._isOpen = this._db.open(this._dbPath);
        if(!this._isOpen){
            log("open sysdb fail")
        }
    },
    //关闭数据库
    closeDB:function(){
        this._db.closeSqlite();
        this._isOpen = false;
    },
    //使用数据库（计数＋1）
    doUseDB:function(){
        if(!this._isOpen){
            this.openDB();
        }
        this._useNum++;
    },
    //使用数据库结束（计数－1，计数为0关闭数据库）－－写数据时花的时间很长
    doUnUseDB:function(){
        this._useNum--;
        if(this._useNum == 0){
            this.closeDB();
        }
    },
    //创建数据库 表
    createDataBase:function(){
        log("createDataBase--");

        this.doUseDB();

        this.createTableGameconfig();
        this.createTablePrize();
        this.createTableProps();
        this.createTableSignin();
        this.createTableTask();
        this.createTableUserlevel();
        this.createTableVip();

        this.doUnUseDB();
        var ls = cc.sys.localStorage;
        ls.setItem(HAS_LOCAL_DB_SYSDATA, true);
        ls.setItem(LOCAL_DB_SYSDATA_VER, this.mReqVer);
    },

    //id INTEGER PRIMARY KEY AUTOINCREMENT

    //************** gameconfig ok *******************
    //创建表gameconfig
    createTableGameconfig:function(){
        var TAG = "gameconfig";
        var sqlstr = "";
        sqlstr = "DROP TABLE IF EXISTS gameconfig";
        var result = this._db.directStatement(sqlstr);
        if(result){
            log( "删除表成功:"+TAG);
        }else{
            log( "删除表失败:"+TAG+":"+sqlstr);
        }
        sqlstr = "CREATE TABLE gameconfig (id bigint,keyName varchar(100) ,value varchar(2000),valueType varchar(20),info varchar(1200),toClient int,editLevel int)";
        result = this._db.directStatement(sqlstr);
        if(result){
            log( "创建表成功:"+TAG);
        }else{
            log( "创建表失败:"+TAG+":"+sqlstr);
        }
    },
    //插入数据
    insertGameconfig:function(data){
        var TAG = "gameconfig";
        var sqlstr = cc.formatStr("insert into gameconfig (id,keyName,value,valueType,info,toClient,editLevel) values (%d,'%s','%s','%s','%s',%d,%d)",data.id,data.keyName,data.value,data.valueType,data.info,data.toClient,data.editLevel);
        var result = this._db.directStatement(sqlstr);
        if(!result){
            log( "插入记录失败失败:"+TAG+":"+sqlstr);
        }
    },
    //保存数据
    saveGameconfigs:function(datas){
        log("saveGameconfigs--start")
        this.doUseDB();
        this.createTableGameconfig();
        var len = datas.length;
        for(var i = 0;i<len;i++){
            var data = datas[i];
            this.insertGameconfig(data);
        }
        this.doUnUseDB();
        log("saveGameconfigs--end len="+len)
    },
    //查询数据数据
    selectGameconfigs:function(){
        log("selectGameconfigs--start")
        var TAG = "gameconfig";
        var datas = [];
        this.doUseDB();
        var sqlstr = "select * from gameconfig order by id";
        var st = this._db.statement(sqlstr);
        while(st.nextRow()){
            var data = {};
            data.id = Number(st.valueString(0));
            data.keyName = st.valueString(1);
            data.value = st.valueString(2);
            data.valueType = st.valueString(3);
            data.info = st.valueString(4);
            data.toClient = Number(st.valueString(5));
            data.editLevel = Number(st.valueString(6));
            //log(TAG+"=="+data.id+"|"+data.keyName+"|"+data.value)
            datas.push(data)
        }
        this.doUnUseDB();
        return datas;
    },
    //**************Gameconfig end*******************


    //************** prize ok *******************
    //创建表prize
    createTablePrize:function(){
        var TAG = "prize";
        var sqlstr = "";
        sqlstr = "DROP TABLE IF EXISTS prize";
        var result = this._db.directStatement(sqlstr);
        if(result){
            log( "删除表成功:"+TAG);
        }else{
            log( "删除表失败:"+TAG+":"+sqlstr);
        }
        sqlstr = "CREATE TABLE prize (id bigint,name varchar(40) ,ingot int,propsId bigint,propsCount int,image varchar(40),info varchar(800),count int,state int,sort int,type int)";
        result = this._db.directStatement(sqlstr);
        if(result){
            log( "创建表成功:"+TAG);
        }else{
            log( "创建表失败:"+TAG+":"+sqlstr);
        }
    },
    //插入数据
    insertPrize:function(data){
        var TAG = "prize";
        var sqlstr = cc.formatStr("insert into prize (id,name,ingot,propsId,propsCount,image,info,count,state,sort,type) values (%d,'%s',%d,%d,%d,'%s','%s',%d,%d,%d,%d)",data.id,data.name,data.ingot,data.propsId,data.propsCount,data.image,data.info,data.count,data.state,data.sort,data.type);
        var result = this._db.directStatement(sqlstr);
        if(!result){
            log( "插入记录失败失败:"+TAG+":"+sqlstr);
        }
    },
    //保存数据
    savePrizes:function(datas){
        log("savePrizes--start")
        this.doUseDB();
        this.createTablePrize()
        var len = datas.length;
        for(var i = 0;i<len;i++){
            var data = datas[i];
            this.insertPrize(data);
        }
        this.doUnUseDB();
        log("savePrizes--end len="+len)
    },
    //查询数据数据
    selectPrizes:function(){
        log("selectPrizes--start")
        var TAG = "prize";
        var datas = [];
        this.doUseDB();
        var sqlstr = "select * from prize order by id";
        var st = this._db.statement(sqlstr);
        while(st.nextRow()){
            var data = {};
            data.id = Number(st.valueString(0));
            data.name = st.valueString(1);
            data.ingot = Number(st.valueString(2));
            data.propsId = Number(st.valueString(3));
            data.propsCount = Number(st.valueString(4));
            data.image = st.valueString(5);
            data.info = st.valueString(6);
            data.count = Number(st.valueString(7));
            data.state = Number(st.valueString(8));
            data.sort = Number(st.valueString(9));
            data.type = Number(st.valueString(10));
            //log(TAG+"=="+data.id+"|"+data.name)
            datas.push(data)
        }
        this.doUnUseDB();
        return datas;
    },
    //**************prize end*******************

    //************** props ok 最后2个时间 设为空*******************
    //创建表props
    createTableProps:function(){
        var TAG = "props";
        var sqlstr = "";
        sqlstr = "DROP TABLE IF EXISTS props";
        var result = this._db.directStatement(sqlstr);
        if(result){
            log( "删除表成功:"+TAG);
        }else{
            log( "删除表失败:"+TAG+":"+sqlstr);
        }
        sqlstr = "CREATE TABLE props (id bigint,name varchar(120) ,img varchar(60),price int,preprice int,value1 varchar(3000),value2 varchar(3000),info varchar(1200),enabled int,startTime varchar(30),endTime varchar(30))";
        result = this._db.directStatement(sqlstr);
        if(result){
            log( "创建表成功:"+TAG);
        }else{
            log( "创建表失败:"+TAG+":"+sqlstr);
        }
    },
    //插入数据
    insertProps:function(data){
        var TAG = "props";
        var sqlstr = cc.formatStr("insert into props (id,name,img,price,preprice,value1,value2,info,enabled,startTime,endTime) values (%d,'%s','%s',%d,%d,'%s','%s','%s',%d,'%s','%s')",data.id,data.name,data.img,data.price,data.preprice,data.value1,data.value2,data.info,data.enabled,"","");
        var result = this._db.directStatement(sqlstr);
        if(!result){
            log( "插入记录失败失败:"+TAG+":"+sqlstr);
        }
    },
    //保存数据
    savePropses:function(datas){
        log("savePropses--start")
        this.doUseDB();
        this.createTableProps()
        var len = datas.length;
        for(var i = 0;i<len;i++){
            var data = datas[i];
            this.insertProps(data);
        }
        this.doUnUseDB();
        log("savePropses--end len="+len)
    },
    //查询数据数据
    selectPropses:function(){
        log("selectPropses--start")
        var TAG = "props";
        var datas = [];
        this.doUseDB();
        var sqlstr = "select * from props order by id";
        var st = this._db.statement(sqlstr);
        while(st.nextRow()){
            var data = {};
            data.id = Number(st.valueString(0));
            data.name = st.valueString(1);
            data.img = st.valueString(2);
            data.price = Number(st.valueString(3));
            data.preprice = Number(st.valueString(4));
            data.value1 = st.valueString(5);
            data.value2 = st.valueString(6);
            data.info = st.valueString(7);
            data.enabled = Number(st.valueString(8));
            data.startTime = st.valueString(9);// ""
            data.endTime = st.valueString(10);// ""
            //log(TAG+"=="+data.id+"|"+data.name)
            datas.push(data)
        }
        this.doUnUseDB();
        return datas;
    },
    //**************props end*******************

    //************** signin ok*******************
    //创建表signin
    createTableSignin:function(){
        var TAG = "signin";
        var sqlstr = "";
        sqlstr = "DROP TABLE IF EXISTS signin";
        var result = this._db.directStatement(sqlstr);
        if(result){
            log( "删除表成功:"+TAG);
        }else{
            log( "删除表失败:"+TAG+":"+sqlstr);
        }
        sqlstr = "CREATE TABLE signin (id bigint,name varchar(60) ,img varchar(60),prizes varchar(20),prizesInfo varchar(100))";
        result = this._db.directStatement(sqlstr);
        if(result){
            log( "创建表成功:"+TAG);
        }else{
            log( "创建表失败:"+TAG+":"+sqlstr);
        }
    },
    //插入数据
    insertSignin:function(data){
        var TAG = "signin";
        var sqlstr = cc.formatStr("insert into signin (id,name,img,prizes,prizesInfo) values (%d,'%s','%s','%s','%s')",data.id,data.name,data.img,data.prizes,data.prizesInfo);
        var result = this._db.directStatement(sqlstr);
        if(!result){
            log( "插入记录失败失败:"+TAG+":"+sqlstr);
        }
    },
    //保存数据
    saveSignins:function(datas){
        log("saveSignins--start")
        this.doUseDB();
        this.createTableSignin()
        var len = datas.length;
        for(var i = 0;i<len;i++){
            var data = datas[i];
            this.insertSignin(data);
        }
        this.doUnUseDB();
        log("saveSignins--end len="+len)
    },
    //查询数据数据
    selectSignins:function(){
        log("selectSignins--start")
        var TAG = "signin";
        var datas = [];
        this.doUseDB();
        var sqlstr = "select * from signin order by id";
        var st = this._db.statement(sqlstr);
        while(st.nextRow()){
            var data = {};
            data.id = Number(st.valueString(0));
            data.name = st.valueString(1);
            data.img = st.valueString(2);
            data.prizes = (st.valueString(3));
            data.prizesInfo = (st.valueString(4));
            //log(TAG+"=="+data.id+"|"+data.name)
            datas.push(data)
        }
        this.doUnUseDB();
        return datas;
    },
    //**************signin end*******************


    //**************task ok ---endTime 空*******************
    //创建表task
    createTableTask:function(){
        var TAG = "task";
        var sqlstr = "";
        sqlstr = "DROP TABLE IF EXISTS task";
        var result = this._db.directStatement(sqlstr);
        if(result){
            log( "删除表成功:"+TAG);
        }else{
            log( "删除表失败:"+TAG+":"+sqlstr);
        }
        //id INTEGER PRIMARY KEY AUTOINCREMENT
        sqlstr = "CREATE TABLE task (id bigint,name varchar(60) ,roomId bigint,img varchar(20),groups int,taskType int,taskCondition int,conditionPara varchar(11),conditionInfo varchar(120),prizes varchar(120),prizesInfo  varchar(120),nextId int,initTask int,endTime varchar(30),initId int)";
        result = this._db.directStatement(sqlstr);
        if(result){
            log( "创建表成功:"+TAG);
        }else{
            log( "创建表失败:"+TAG+":"+sqlstr);
        }
    },
    //插入数据
    insertTask:function(data){
        var TAG = "task";
        var sqlstr = cc.formatStr("insert into task (id,name,roomId,img,groups,taskType,taskCondition,conditionPara,conditionInfo,prizes,prizesInfo,nextId,initTask,endTime,initId) values (%d,'%s',%d,'%s',%d,%d,%d,'%s','%s','%s','%s',%d,%d,'%s',%d)",data.id,data.name,data.roomId,data.img,data.groups,data.taskType,data.taskCondition,data.conditionPara,data.conditionInfo,data.prizes,data.prizesInfo,data.nextId,data.initTask,"",data.initId);
        var result = this._db.directStatement(sqlstr);
        if(!result){
            log( "插入记录失败失败:"+TAG+":"+sqlstr);
        }
    },
    //保存数据
    saveTasks:function(datas){
        log("saveTasks--start")
        this.doUseDB();
        this.createTableTask();
        var len = datas.length;
        for(var i = 0;i<len;i++){
            var data = datas[i];
            if(data.taskType) {
                this.insertTask(data);
            }
        }
        this.doUnUseDB();
        log("saveTasks--end len="+len)
    },
    //查询数据数据
    selectTasks:function(){
        log("selectTasks--start")
        var TAG = "task";
        var datas = [];
        this.doUseDB();
        var sqlstr = "select * from task order by id";
        var st = this._db.statement(sqlstr);
        while(st.nextRow()){
            var task = {};
            task.id = Number(st.valueString(0));
            task.name = st.valueString(1);
            task.roomId = Number(st.valueString(2));
            task.img = st.valueString(3);
            task.groups = Number(st.valueString(4));
            task.taskType = Number(st.valueString(5));
            task.taskCondition = Number(st.valueString(6));
            task.conditionPara = (st.valueString(7));
            task.conditionInfo = (st.valueString(8));
            task.prizes = (st.valueString(9));
            task.prizesInfo = (st.valueString(10));
            task.nextId = Number(st.valueString(11));
            task.initTask = Number(st.valueString(12));
            task.endTime = (st.valueString(13));
            task.initId = Number(st.valueString(14));
            //log(TAG+"=="+task.id+"|"+task.name+"|"+task.conditionInfo)
            datas.push(task);
        }
        this.doUnUseDB();
        return datas;
    },
    //**************task end*******************


    //************** userlevel ok*******************
    //创建表userlevel
    createTableUserlevel:function(){
        var TAG = "userlevel";
        var sqlstr = "";
        sqlstr = "DROP TABLE IF EXISTS userlevel";
        var result = this._db.directStatement(sqlstr);
        if(result){
            log( "删除表成功:"+TAG);
        }else{
            log( "删除表失败:"+TAG+":"+sqlstr);
        }
        sqlstr = "CREATE TABLE userlevel (id bigint,xp int,prizes varchar(120),prizesInfo varchar(120))";
        result = this._db.directStatement(sqlstr);
        if(result){
            log( "创建表成功:"+TAG);
        }else{
            log( "创建表失败:"+TAG+":"+sqlstr);
        }
    },
    //插入数据
    insertUserlevel:function(data){
        var TAG = "userlevel";
        var sqlstr = cc.formatStr("insert into userlevel (id,xp,prizes,prizesInfo) values (%d,%d,'%s','%s')",data.id,data.xp,data.prizes,data.prizesInfo);
        var result = this._db.directStatement(sqlstr);
        if(!result){
            log( "插入记录失败失败:"+TAG+":"+sqlstr);
        }
    },
    //保存数据
    saveUserlevels:function(datas){
        log("saveUserlevels--start")
        this.doUseDB();
        this.createTableUserlevel()
        var len = datas.length;
        for(var i = 0;i<len;i++){
            var data = datas[i];
            this.insertUserlevel(data);
        }
        this.doUnUseDB();
        log("saveUserlevels--end len="+len)
    },
    //查询数据数据
    selectUserlevels:function(){
        log("selectUserlevels--start")
        var TAG = "userlevel";
        var datas = [];
        this.doUseDB();
        var sqlstr = "select * from userlevel order by id";
        var st = this._db.statement(sqlstr);
        while(st.nextRow()){
            var data = {};
            data.id = Number(st.valueString(0));
            data.xp = Number(st.valueString(1));
            data.prizes = (st.valueString(3));
            data.prizesInfo = (st.valueString(4));
            //log(TAG+"=="+data.id+"|"+data.xp)
            datas.push(data)
        }
        this.doUnUseDB();
        return datas;
    },
    //**************userlevel end*******************


    //************** vip *******************
    //创建表Vip
    createTableVip:function(){
        var TAG = "vip";
        var sqlstr = "";
        sqlstr = "DROP TABLE IF EXISTS vip";
        var result = this._db.directStatement(sqlstr);
        if(result){
            log( "删除表成功:"+TAG);
        }else{
            log( "删除表失败:"+TAG+":"+sqlstr);
        }
        sqlstr = "CREATE TABLE vip (id bigint,name varchar(120),payAmount decimal(14,4),prizes varchar(120),info varchar(1200))";
        result = this._db.directStatement(sqlstr);
        if(result){
            log( "创建表成功:"+TAG);
        }else{
            log( "创建表失败:"+TAG+":"+sqlstr);
        }
    },
    //插入数据
    insertVip:function(data){
        var TAG = "vip";
        var sqlstr = cc.formatStr("insert into vip (id,name,payAmount,prizes,info) values (%d,'%s',"+data.payAmount+",'%s','%s')",data.id,data.name,data.prizes,data.info);
        var result = this._db.directStatement(sqlstr);
        if(!result){
            log( "插入记录失败失败:"+TAG+":"+sqlstr);
        }
    },
    //保存数据
    saveVips:function(datas){
        log("saveVips--start")
        this.doUseDB();
        this.createTableVip()
        var len = datas.length;
        for(var i = 0;i<len;i++){
            var data = datas[i];
            this.insertVip(data);
        }
        this.doUnUseDB();
        log("saveVips--end len="+len)
    },
    //查询数据数据
    selectVips:function(){
        log("selectVips--start")
        var TAG = "vip";
        var datas = [];
        this.doUseDB();
        var sqlstr = "select * from vip order by id";
        var st = this._db.statement(sqlstr);
        while(st.nextRow()){
            var data = {};
            data.id = Number(st.valueString(0));
            data.name = (st.valueString(1));
            data.payAmount = Number(st.valueString(1));
            data.prizes = (st.valueString(3));
            data.info = (st.valueString(4));
            //log(TAG+"=="+data.id+"|"+data.name)
            datas.push(data)
        }
        this.doUnUseDB();
        return datas;
    },
    //**************vip end*******************

    //************** load datas *******************
    //从数据库加载数据
    loadConfigDataByDB:function(){
        log("loadConfigDataByDB --start")
        this.doUseDB();
        var now1 = (new Date()).getTime();
        log("now1=="+now1)
        var loadconfigs = sGameData.mConfigDataNeedLoadByDB;
        var configs = LOCAL_DB_CONFIGS;
        for(var i = 0;i<configs.length;i++){
            var configId = configs[i][0];
            if(loadconfigs[configId] == 1){
                var version = getLocalDBConfigVer(configId);
                if(version > 0){
                    if(configId == CONFIG_GAMECONFIG) {
                        var sys_gameconfig = this.selectGameconfigs();
                        sGameData.mSys_GameConfigs = sys_gameconfig;
                    }else if(configId == CONFIG_PRIZE) {
                        var sys_prize = this.selectPrizes();
                        sGameData.mSys_Prizes = sys_prize;
                    }else if(configId == CONFIG_PROPS) {
                        var sys_props = this.selectPropses();
                        sGameData.mSys_Propses = sys_props;
                    }else if(configId == CONFIG_SIGNIN) {
                        var sys_signin = this.selectSignins();
                        sGameData.mSys_Signins = sys_signin;
                    }else if(configId == CONFIG_TASK) {
                        var sys_task = this.selectTasks();
                        sGameData.mSys_Tasks = sys_task;
                    }else if(configId == CONFIG_USERLEVEL) {
                        var sys_userlevel = this.selectUserlevels();
                        sGameData.mSys_UserLevels = sys_userlevel;
                    }else if(configId == CONFIG_VIP) {
                        var sys_vip = this.selectVips();
                        sGameData.mSys_Vips = sys_vip;
                    }
                }
            }
        }
        var now2 = (new Date()).getTime();
        log("now2=="+now2)
        this.doUnUseDB();
    },
    //保存数据到数据库
    saveConfigDataToDB:function(){
        log("saveConfigDataToDB --start")
        this.doUseDB();
        var now1 = (new Date()).getTime();
        log("now1=="+now1)
        var saveconfigs = sGameData.mConfigDataNeedSaveToDB;
        var configs = LOCAL_DB_CONFIGS;
        for(var i=0;i<configs.length;i++){
            var configId = configs[i][0];
            var flag = configs[i][1];
            if(saveconfigs[configId] == 1){
                if(configId == CONFIG_GAMECONFIG) {
                    this.saveGameconfigs(sGameData.mSys_GameConfigs);
                }else if(configId == CONFIG_PRIZE) {
                    this.savePrizes(sGameData.mSys_Prizes)
                }else if(configId == CONFIG_PROPS) {
                    this.savePropses(sGameData.mSys_Propses)
                }else if(configId == CONFIG_SIGNIN) {
                    this.saveSignins(sGameData.mSys_Signins)
                }else if(configId == CONFIG_TASK) {
                    this.saveTasks(sGameData.mSys_Tasks);
                }else if(configId == CONFIG_USERLEVEL) {
                    this.saveUserlevels(sGameData.mSys_UserLevels);
                }else if(configId == CONFIG_VIP) {
                    this.saveVips(sGameData.mSys_Vips);
                }
                var netversion = getConfigVerisonByNet(configId);
                setDBConfigVerison(flag,netversion);
                saveconfigs[configId] = 0;
            }
        }
        var now2 = (new Date()).getTime();
        log("now2=="+now2)
        this.doUnUseDB();
    },
    doLoadConfig_thread:function(){
        log("doLoadConfig_thread --start")
        //CallCpp.doSomeString(14,"","","","","");
    },
    doSaveConfig_thread:function(){
        log("doSaveConfig_thread --start")
        //CallCpp.doSomeString(15,"","","","","");
        this.saveConfigDataToDB();
    },
    //test
    initTest:function(){
        log("initTest---sql")
//        var list = sGameData.mSys_Vips;;
//        this.saveVips(list);
//        this.selectVips();

//        sGameData.mConfigDataNeedSaveToDB[CONFIG_TASK] = 1;
//        this.doSaveConfig_thread();

    },
    toString:function(){
        var str = "isopen = "+this._isOpen+" useNum=="+this._useNum;
        log(str);
    }
});


//************** sysdata db *******************



//存储版本号到本地
var setDBConfigVerison = function(configflag,version){
    log("setDBConfigVerison==="+configflag+"|"+version);
    var ls = cc.sys.localStorage;
    ls.setItem(configflag,version);
}

//获取本地存储的版本号
var getDBConfigVerison = function(configflag,configId){
    var version = 0;
    var ls = cc.sys.localStorage;
    var verstr = ls.getItem(configflag);
    if(verstr){
        version = Number(verstr);
    }else{
        var tver = LOCAL_CONFIG_JS_FILE_VER[configId];
        if(tver){
            version = tver;
        }
    }
    return version;
}
//获取网络存储的版本号
var getConfigVerisonByNet = function(configId){
    var version = 0;
    var datas = sGameData.mSysDataConfiglist;
    for(var i = 0;i<datas.length;i++){
        var data = datas[i];
        if(data[0] == configId){
            version = data[1];
            break;
        }
    }
    return version;
}
//获取本地数据库 配置
var getLocalDBConfig = function(configId){
    var configs = LOCAL_DB_CONFIGS;
    for(var i=0;i<configs.length;i++){
        var config = configs[i];
        if(config[0] == configId){
            return config;
        }
    }
    return null;
}

//获取本地数据库 配置
var getLocalDBConfigByName = function(configName){
    var configs = LOCAL_DB_CONFIGS;
    for(var i=0;i<configs.length;i++){
        var config = configs[i];
        if(config[2] == configName){
            return config;
        }
    }
    return null;
}

//获取本地存储的版本号
var getLocalDBConfigVer = function(configId){
    var version = 0;
    var config = getLocalDBConfig(configId)
    if(config){
        version = getDBConfigVerison(config[1],configId);
    }
    return version;
}




//开始获取配置版本
var doStartSendGetConfig = function(){
    var cfgdatas = [];
    var configs = LOCAL_DB_CONFIGS;
    var len = LOCAL_DB_CONFIGS.length
    var needload = [];
    for(var i = 0;i<len;i++){
        var config = configs[i];
        var configId = config[0];
        var configname = config[2];
        needload[configId] = 1;
        var localvno = getLocalDBConfigVer(configId);
        cfgdatas.push([configname,localvno]);
    }
    sGameData.mConfigDataNeedLoadByDB = needload;
    sGameData.mGameNet.sendConfigVersion(cfgdatas);
}
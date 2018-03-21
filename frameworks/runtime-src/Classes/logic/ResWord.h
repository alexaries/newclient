//
//  ResWord.h
//  sanguo_ft
//
//  Created by apple on 13-7-8.
//
//

#ifndef __sanguo_ft__ResWord__
#define __sanguo_ft__ResWord__

#include "Header.h"

using namespace std;

class ResWord : public Singleton<ResWord>
{
public:
	ResWord(void);
	~ResWord(void);
    
    //startscene--
    string w_init_ing;//"正在初始化,请稍候...";
    string w_req_version;//"正在检测版本信息,请稍候..."
    string w_req_version_end;//"检测版本信息完成..."
    string w_loadresing;//"正在下载资源,请稍候..."
    string w_loadres;//"正在下载资源";
    string w_loadshow;//"正在加载界面,请稍候..."
    string w_notice;//"提示"
    string w_close;//"关闭"
    string w_error_ver;//"获取版本信息失败，请检查网络"
    string w_error_loadres;//"加载资源失败"
    string w_quitgame;//"确定退出游戏"
    string w_needupdateres;//"当前版本不是最新版本,需要下载资源。"
    string w_yes;//"确定"
    string w_no;//"取消"
    string w_filesize_s1;//"共"
    string w_filesize_s2;//"个文件"
    string w_net_no;//"当前无网络"
    string w_net_no1;//"当前无网络"
    string w_net_3g;//"当前网络为3G"
    string w_jindu;//"进度"
    string w_needreload;//"下载资源失败,需要重新下载"
    string w_pay_unfinish;//充值未完成
    
    string w_load_nowlan_tip;//"推荐使用WLAN下载，检测到您当前WLAN还未打开或连接，是否继续下载？"
    
    string w_down_install_client;//
    
    string w_notopen;//"暂未开放"
    
};

#define sResWord ResWord::instance()

#endif /* defined(__sanguo_ft__ResWord__) */

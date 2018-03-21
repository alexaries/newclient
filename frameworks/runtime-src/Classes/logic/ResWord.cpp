//
//  ResWord.cpp
//  sanguo_ft
//
//  Created by apple on 13-7-8.
//
//

#include "ResWord.h"

DECLARE_SINGLETON_MEMBER(ResWord);

ResWord::ResWord(void)
{
    //startscene
    w_init_ing="正在初始化,请稍候...";
    w_req_version="正在检测资源版本信息,请稍候...";
    w_req_version_end="检测资源版本信息完成...";
    w_loadresing="正在下载资源,请稍候...";
    w_loadres="正在下载资源";
    w_loadshow="正在加载界面,请稍候...";
    w_notice="提示";
    w_close = "关闭";
    w_error_ver="服务器维护中，请稍后再试";
    w_error_loadres = "加载资源失败";
    w_quitgame="确定退出游戏?";
    w_needupdateres="当前版本不是最新版本,需要下载资源.";
    w_yes="确定";
    w_no="取消";
    w_filesize_s1="共";
    w_filesize_s2="个文件,";
    w_net_no="当前无网络";
    w_net_no1="当前无网络,请检查设置";
    w_net_3g="当前网络为3G/4G";
    w_jindu="进度:";
    w_needreload="需要重新加载";
    w_pay_unfinish = "充值未完成";
    w_load_nowlan_tip = "推荐使用WLAN下载，检测到您当前WLAN还未打开或连接，是否继续下载？";
    w_down_install_client = "请下载并安装新版本";
    w_notopen = "暂未开放";
}

ResWord::~ResWord(void)
{
    log("ResWord---over");

}

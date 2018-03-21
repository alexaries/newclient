package cn.coolqp.game.pushmsg;

import cn.coolqp.game.QpgameActivity;
import com.qp.xlylc.com.R;

import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Intent;
import android.os.IBinder;
import android.util.Log;
/*
 * 后台服务类
 */
public class BackService extends Service{
    private static final String TAG = "BackService";
    private ServiceThread cServiceThread;
    //通知管理器 
    //private NotificationManager cNotificationManager; 
    //常驻通知
    //private Notification cNotification;
    @Override
    public IBinder onBind(Intent arg0) {
        // TODO 自动生成的方法存根
        return null;
    }
    @Override
      public void onCreate() {
          Log.i(TAG, "服务创建");
          cServiceThread = new ServiceThread(this);//实例化服务线程
          
    }
     @Override
     public void onDestroy() {
         Log.i(TAG, "服务停止");
         cServiceThread.cCanRun=false;//设置后台服务标识量为flase
         //cNotificationManager.cancel(1);//清理通知
     }
     @Override
     public void onStart(Intent intent, int startid) {
         Log.i(TAG, "服务启动");
         cServiceThread.start();
     }
     
     static final int NOTIFICATION_ID = 0x1123;
     
 	 public void sendLocalPushMsg(String msg){
 		//String msg = "欢迎来到家！Good Luck！！！";
 		Log.d(TAG,"service sendLocalPushMsg=="+msg);
 		
 		 //获取系统的NotificationManager服务
         NotificationManager notificationManager = (NotificationManager) 
           getSystemService(NOTIFICATION_SERVICE);
 		
         notificationManager.cancel(NOTIFICATION_ID);
 		
 		
 		String appname = getResources().getString(R.string.app_name);
 		//创建一个启动其他Activity的Intent
 		Intent intent = new Intent(this
 			, QpgameActivity.class);
 		PendingIntent pi = PendingIntent.getActivity(this
 			, 0, intent , 0);
 		//创建一个Notification
         Notification notify = new Notification();
         //为Notification设置图标，该图标显示在状态栏
         notify.icon = R.drawable.icon;
         //为Notification设置文本内容，该文本会显示在状态栏
         notify.tickerText = ""+msg;
         //为Notification设置发送时间
         notify.when = System.currentTimeMillis();
         //为Notification设置声音
         notify.defaults = Notification.DEFAULT_SOUND;
         //为Notification设置默认声音、默认振动、默认闪光灯
         notify.defaults = Notification.DEFAULT_ALL;
         //设置事件信息
         notify.setLatestEventInfo(this, appname,""+msg, pi);
        
         //发送通知
         notificationManager.notify(NOTIFICATION_ID, notify);
 	}
     
    public void UpdateNotification(int aCount) {
        Log.i(TAG, "更新通知");
//        cNotification.number=aCount;
//        cNotification.when=System.currentTimeMillis();//通知时间
//        Intent intent = new Intent(this, AlarmListActivity.class);//设置点击时要跳转到的Activity
//        PendingIntent contentIntent = PendingIntent.
//                getActivity(this, 0, intent, 0);
//      cNotification.setLatestEventInfo(this, this.getString(R.string.app_name)+"后台运行中",
//                "报警信息", contentIntent);
//        cNotificationManager.notify(1, cNotification);
    }
}

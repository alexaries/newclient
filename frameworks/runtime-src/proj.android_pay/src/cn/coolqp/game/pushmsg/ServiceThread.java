package cn.coolqp.game.pushmsg;



import java.util.Calendar;
import java.util.Date;

import android.app.Activity;
import android.content.SharedPreferences;
import android.util.Log;
/*
 * 后台服务线程
 * */
public class ServiceThread extends Thread{
    private BackService cBackService;
    //运行标识量
    public Boolean cCanRun =false;
    
    private String PREFS_NAME = "localdata";
    
    public ServiceThread(BackService aBackService)
    {
        cBackService=aBackService;
    }
    
    
    
    
    @Override
    public void run(){
        cCanRun=true;
        //APP通知
        int i=1;
        while(cCanRun)
        {
            try {
                int sleeptime = 10*60*1000;//  10 分钟
                int daytime = 24*60*60*1000;//
            	
            	SharedPreferences settings = cBackService.getSharedPreferences(PREFS_NAME, Activity.MODE_PRIVATE);  
            	
            	int push1isopen = settings.getInt("pushmsg1_isopen", 0); 
            	int push2isopen = settings.getInt("pushmsg2_isopen", 0); 
            	int push3isopen = settings.getInt("pushmsg3_isopen", 0);
            	
            	long opentime = settings.getLong("pushmsg_opentime", 0l);  
            	
            	 //type:repeat:delayday:delaytime:info
                //type 0清除之前de 1 （多久没登录执行） 2每周六 7点 执行  3 每天 几点执行
                //repeat 0不重复 1 每天 2每周
                //1:2:几天没登录（7）:延迟几分钟（5））:msg
                //2:2:周几（周天1，－ 周六7）:几点（12））:msg
                //3:1:几点（11）:几分（5）:msg
            	Date d = new Date();
	            int h = d.getHours();
            	if(push1isopen == 1){

	                int durday = settings.getInt("pushmsg1_durday", 7); 
	                int durtime = settings.getInt("pushmsg1_durtime", 30); 
	                int repeat = settings.getInt("pushmsg1_repeat", 0); 
	                int pushcount = settings.getInt("pushmsg1_count", 0); 
	                long now = System.currentTimeMillis();
	                
	               
	                Log.d("info", "push1isopen==="+opentime+"|"+repeat+"|"+durday+"|"+durtime+"|"+pushcount+"|"+h); 
	                
	                int delaytime = durtime*60*1000;//  30 分钟

	                
	                int tmptime = delaytime+durday*daytime;
	                if(repeat == 1){
	                	tmptime = delaytime+durday*daytime+pushcount*1*daytime;
	                }else if(repeat == 2){
	                	tmptime = delaytime+durday*daytime+pushcount*7*daytime;
	                }
	                if(opentime > 0 && h >= 8 && h< 23){
		                if(((now - opentime > tmptime) && pushcount == 0)
		                	||(repeat>0&&(now - opentime > tmptime) && pushcount > 0)){
		                	String msg = settings.getString("pushmsg1_msg", "Good Luck!");  
		                	cBackService.sendLocalPushMsg(msg);
		                	SharedPreferences.Editor editor = settings.edit();  
		                    editor.putInt("pushmsg1_count", pushcount+1);  
		                    editor.commit();
		                }
	                }
            	}
            	// //2:2:周几（周天1，－ 周六7）:几点（12））:msg
            	if(push2isopen == 1){
 	                int durday = settings.getInt("pushmsg2_durday", 7); 
 	                int durtime = settings.getInt("pushmsg2_durtime", 30); 
 	                int repeat = settings.getInt("pushmsg2_repeat", 0); 
 	                int pushcount = settings.getInt("pushmsg2_count", 0); 
 	                long now = System.currentTimeMillis();
 	                
 	                Log.d("info", "push2isopen==="+opentime+"|"+repeat+"|"+durday+"|"+durtime+"|"+pushcount+"|"+h); 
 	               
 	                Date tmptime1 = new Date(opentime);
 	                Calendar c = Calendar.getInstance(); 
 	                c.setTime(tmptime1); 
 	                int week = c.get(Calendar.DAY_OF_WEEK); 
 	                int hour = tmptime1.getHours();
 	                int min = tmptime1.getMinutes();
 	                int dur_day = durday-week;
 	                int dur_hour = durtime - hour;
 	                int dur_min = 05 - min;
 	                if(dur_day < 0){
 	                    dur_day = dur_day+7;
 	                }else if(dur_day == 0){
 	                    if(dur_hour < 0){
 	                        dur_day = dur_day+7;
 	                    }else if(dur_hour == 0){
 	                        if(dur_min <= 0){
 	                            dur_day = dur_day+7;
 	                        }
 	                    }
 	                }
 	                int delaytime = dur_day*daytime + dur_hour*60*60*1000 +dur_min*60*1000;
 	                int tmptime = delaytime;
	                if(repeat == 1){
	                	tmptime = delaytime+pushcount*1*daytime;
	                }else if(repeat == 2){
	                	tmptime = delaytime+pushcount*7*daytime;
	                }
	                if(opentime > 0 && h >= 8 && h< 23){
		                if(((now - opentime > tmptime) && pushcount == 0)
		                	||(repeat>0&&(now - opentime > tmptime) && pushcount > 0)){
		                	String msg = settings.getString("pushmsg2_msg", "Good Luck2!");  
		                	cBackService.sendLocalPushMsg(msg);
		                	SharedPreferences.Editor editor = settings.edit();  
		                    editor.putInt("pushmsg2_count", pushcount+1);  
		                    editor.commit();
		                }
	                }
 	               //tmptime.
 	                
            	}
            	// //3:1:几点（11）:几分（5）:msg
            	if(push3isopen == 1){
 	                int durday = settings.getInt("pushmsg3_durday", 7); 
 	                int durtime = settings.getInt("pushmsg3_durtime", 30); 
 	                int repeat = settings.getInt("pushmsg3_repeat", 0); 
 	                int pushcount = settings.getInt("pushmsg3_count", 0); 
 	                long now = System.currentTimeMillis();
 	                
 	               Log.d("info", "push3isopen==="+opentime+"|"+repeat+"|"+durday+"|"+durtime+"|"+pushcount+"|"+h); 
 	               
	                Date tmptime1 = new Date(opentime);
	                int hour = tmptime1.getHours();
	                int min = tmptime1.getMinutes();
	                int dur_hour = durday - hour;
	                int dur_min = durtime - min;
	                int dur_day = 0;
                    if(dur_hour < 0){
                        dur_day = dur_day+1;
                    }else if(dur_hour == 0){
                        if(dur_min <= 0){
                            dur_day = dur_day+1;
                        }
                    }
	                
	                int delaytime = dur_day*daytime + dur_hour*60*60*1000 +dur_min*60*1000;
	                int tmptime = delaytime;
	                if(repeat == 1){
	                	tmptime = delaytime+pushcount*1*daytime;
	                }else if(repeat == 2){
	                	tmptime = delaytime+pushcount*7*daytime;
	                }
	                if(opentime > 0 && h >= 8 && h< 23){
		                if(((now - opentime > tmptime) && pushcount == 0)
		                	||(repeat>0&&(now - opentime > tmptime) && pushcount > 0)){
		                	String msg = settings.getString("pushmsg3_msg", "Good Luck3!");  
		                	cBackService.sendLocalPushMsg(msg);
		                	SharedPreferences.Editor editor = settings.edit();  
		                    editor.putInt("pushmsg3_count", pushcount+1);  
		                    editor.commit();
		                }
	                }
            	}
                
                Thread.sleep(sleeptime);//每处理完一次循环，休息10分钟
            } catch (Exception e) {
                Log.i("后台服务线程", e.getMessage());
                e.printStackTrace();
                break;
            }
        }
    }
}

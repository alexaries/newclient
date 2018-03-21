package cn.coolqp.game;

import java.io.File;
import java.util.UUID;

import android.app.Activity;
import android.content.Context;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.pm.PackageManager.NameNotFoundException;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.Build;
import android.telephony.TelephonyManager;

public class GameUtil {
	/**
     * 递归删除文件及文件夹
     * 用于删除更新的文件
     * @param file （是路径）
     */
    public static void deleteDirFiles(File file) {
  		if (file.isFile()) {
  			file.delete();
  			return;
  		}
  		if(file.isDirectory()){
  			File[] childFiles = file.listFiles();
  			if (childFiles == null || childFiles.length == 0) {
  				file.delete();
  				return;
  			}
  	
  			for (int i = 0; i < childFiles.length; i++) {
  				deleteDirFiles(childFiles[i]);
  			}
  			file.delete();
  		}
  	}
    
    /** 
     * 检测网络是否连接 
     * @return 
     */  
    public static  boolean isNetConnected(ConnectivityManager cm ) {  
        //ConnectivityManager cm = (ConnectivityManager) getSystemService(Context.CONNECTIVITY_SERVICE);  
        if (cm != null) {  
            NetworkInfo[] infos = cm.getAllNetworkInfo();  
            if (infos != null) {  
                for (NetworkInfo ni : infos) {  
                    if (ni.isConnected()) {  
                        return true;  
                    }  
                }  
            }  
        }  
        return false;  
    }  
  
    /** 
     * 检测wifi是否连接 
     * @return 
     */  
    public static  boolean isWifiConnected(ConnectivityManager cm ) {  
       //ConnectivityManager cm = (ConnectivityManager) getSystemService(Context.CONNECTIVITY_SERVICE);  
        if (cm != null) {  
            NetworkInfo networkInfo = cm.getActiveNetworkInfo();  
            if (networkInfo != null  
                    && networkInfo.getType() == ConnectivityManager.TYPE_WIFI) {  
                return true;  
            }  
        }  
        return false;  
    }  
  
    /** 
     * 检测3G是否连接 
     * @return 
     */  
    public static  boolean is3gConnected(ConnectivityManager cm ) {  
        //ConnectivityManager cm = (ConnectivityManager) getSystemService(Context.CONNECTIVITY_SERVICE);  
        if (cm != null) {  
            NetworkInfo networkInfo = cm.getActiveNetworkInfo();  
            if (networkInfo != null  
                    && networkInfo.getType() == ConnectivityManager.TYPE_MOBILE) {  
                return true;  
            }  
        }  
        return false;  
    }  
    
    /**
     * 获取app版本号(vername_build)(1.2_1)
     * @return
     */
    public static String getAppBaseVersion(Activity tar){
    	String ver = "";
    	try {  
    	    PackageInfo info = tar.getPackageManager().getPackageInfo(tar.getPackageName(), 0);  
    	    // 当前应用的版本名称  
    	    String versionName = info.versionName;  
    	    // 当前版本的版本号  
    	    int versionCode = info.versionCode;  
    	    //设备型号
    	    Build bd = new Build();  
    		String model = bd.MODEL;  
 
    	    ver = versionName+"_"+versionCode+"_"+model;
    	    // 当前版本的包名  
    	    //String packageNames = info.packageName;  
    	} catch (NameNotFoundException e) {  
    	    // TODO Auto-generated catch block
    	    e.printStackTrace();  
    	}  
    	return ver;
    }
    
    public static  String getMyUUID(Activity tar){
		//Activity
		  final TelephonyManager tm = (TelephonyManager) tar.getBaseContext().getSystemService(Context.TELEPHONY_SERVICE);    
		  final String tmDevice, tmSerial, tmPhone, androidId;    
		  tmDevice = "" + tm.getDeviceId();   
		  tmSerial = "" + tm.getSimSerialNumber();    
		  androidId = "" + android.provider.Settings.Secure.getString(tar.getContentResolver(),android.provider.Settings.Secure.ANDROID_ID);    
		  UUID deviceUuid = new UUID(androidId.hashCode(), ((long)tmDevice.hashCode() << 32) | tmSerial.hashCode());    
		  String uniqueId = deviceUuid.toString();
		  //Log.d("jni","uuid="+uniqueId);
		  return uniqueId;
	}
    
    /**
	 * 检查应用是否存在
	 * @param packageName
	 * @return
	 */
	public static boolean checkApkExist(Activity tar,String packageName)  
	{  
	    if (packageName == null || "".equals(packageName))  
	        return false;  
	    try  
	    {  
	        ApplicationInfo info = tar.getPackageManager().getApplicationInfo(packageName,PackageManager.GET_UNINSTALLED_PACKAGES);  
	          
	        return true;  
	    } catch (NameNotFoundException e)  
	    {  
	        return false;  
	    }  
	} 
}

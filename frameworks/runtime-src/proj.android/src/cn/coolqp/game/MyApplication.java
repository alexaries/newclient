package cn.coolqp.game;


import android.app.Application;
import android.content.Context;
import android.util.Log;
import com.fanwei.jubaosdk.shell.FWPay; //聚宝sdk
import com.qp.xlylc.com.R;


public class MyApplication extends Application {
    @Override
    protected void attachBaseContext(Context ctx){
        super.attachBaseContext(ctx);
        //FWPay.init(this, "14081714462317168447");//聚宝sdk
    }
    
    @Override
    public void onCreate() {
        super.onCreate();
        FWPay.init(this, "87710612");//聚宝sdk
    }

}

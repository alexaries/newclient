package cn.coolqp.game;

public class AppConfig {
	public static String mServerUrl = "";//android端的访问地址，都通过它来组合 （防止改端口时，还要打包）从cpp获取  
	
	//cpp 获取
	
	//----------alipay---------- //全部应用都可以使用
	public static String payurl_alipay = "alipayNotify.go";//alipay 回调地址
	public static String signurl_alipay = "alipaySign.go";
	
	
	
	//----------wxpay----------
	public static boolean mUseWXPay = true; //shop使用
	public static String APPID_WX = "wx000000000eb";//wx6s000000eb
	
	//----------cmcc----------
	
	
	
	public static String m_orderno = "";//订单号 //wx专用
}

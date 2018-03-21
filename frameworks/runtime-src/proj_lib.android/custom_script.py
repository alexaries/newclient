import os
import os.path
import cocos
from shutil import copy2

def copy_so_file(src, dst):
    names = os.listdir(src)
    for name in names:
        srcname = os.path.join(src, name)
        dstname = os.path.join(dst, name)
        try:
            copy2(srcname, dstname)
        except (IOError, os.error) as why:
            errors.append((srcname, dstname, str(why)))

appliba_android_root = ""
def handle_event(event, target_platform, args):
    if target_platform != "android":
        return
    # cocos.Logging.info(event)
    if event != "pre-copy-assets":
        return
    # cocos.Logging.info("args is %s\n" % args)
    global appliba_android_root  

    appliba_android_root = os.path.abspath(os.path.join(args["platform-project-path"], os.pardir)) 
    appliba_android_root = os.path.join(appliba_android_root, "proj_lib.android")

        #appliba_android_root = obj_local_dir1
        #cocos.Logging.info("applib_android_root = %s"%(applib_android_root1))

    src = os.path.join(appliba_android_root, "prebuild", "libs", "armeabi")
    dst = os.path.join(appliba_android_root, "libs", "armeabi")
    # copy so
    copy_so_file(src, dst)
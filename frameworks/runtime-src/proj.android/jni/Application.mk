APP_STL := gnustl_static
#APP_CPPFLAGS := -frtti 
#APP_CPPFLAGS += -DCOCOS2D_DEBUG=1 -DCC_ENABLE_CHIPMUNK_INTEGRATION=1 -std=c++11 -fsigned-char


#use clang by default, uncomment next line to use gcc4.8
#NDK_TOOLCHAIN_VERSION=4.8
NDK_TOOLCHAIN_VERSION=clang

APP_CPPFLAGS := -frtti -DCC_ENABLE_CHIPMUNK_INTEGRATION=1 -std=c++11 -fsigned-char
APP_LDFLAGS := -latomic

ifeq ($(NDK_DEBUG),1)
  APP_CPPFLAGS += -DCOCOS2D_DEBUG=1
  APP_OPTIM := debug
else
  APP_CPPFLAGS += -DNDEBUG
  APP_OPTIM := release
endif

STLPORT_FORCE_REBUILD := true
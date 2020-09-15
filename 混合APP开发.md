

### cordova

* 添加开发模式 src-cordova

  ```
  quasar mode add cordova
  ```

  

* 调用相机

  ```
  cordova plugin add cordova-plugin-camera 
  ```

  

* 调用扫描二维码（支持的版本太低）

  ```
  cordova plugin add cordova-plugin-barcodescanner
  ```

  

* **调用扫描二维码** (支持android 8.0)

  ```
  cordova plugin add phonegap-plugin-barcodescanner
  ```

  

* 连接设备开发

  ```
  quasar dev -m cordova -T android
  quasar dev -m cordova -T ios
  ```

* 启动调试器

  ```
  quasar dev -m android --ide
  ```

* 改变状态栏颜色

  ```
  cordova plugin add cordova-plugin-statusbar
  ```

  ```
  	// StatusBar.backgroundColorByName("red");
      StatusBar.overlaysWebView(true);
      StatusBar.backgroundColorByHexString("#1976D2")
  ```

  

* 点击back按钮事件

  ```
  cordova plugin add cordova-plugin-backbutton
  ```

  
  
  
  
  

###  限制竖屏

* **使用流媒体查询在横屏时图片提示**

* 在AndroidManifest.xml中，为activity节点配置android:screenOrientation属性 

  ```
  @media screen and (orientation: landscape) {
    .tips {
      display: block;
    }
  
    /* 内容就隐藏 */
    .container {
      display: none;
    }
  }
  ```

* 9/09发现会导致键盘弹出异常

  https://blog.csdn.net/rth362147773/article/details/78897867





### 移动适配

* 暂时不做

### 使用icon-font

> 原因: quasar的  [Material Icons](https://material.io/icons/) 有时无法满足需要

使用symbol的方式图标,封装图标组件，和quasar控件互补

>  https://juejin.im/post/6844903517564436493#heading-4 

### 登录滑动验证

>  https://www.npmjs.com/package/vue-monoplasty-slide-verify/v/1.1.2 

```
npm install --save vue-monoplasty-slide-verify
```




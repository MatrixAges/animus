## 发布流程

1.app执行`pnpm run build:release`，生成app_dist
2.执行id:mac

## 修改plist

如果想要在开发环境测试inAppPurchase模块，需要进入`node_modules/electron/dist/Electron.app/Contents/Info.plist`，修改添加如下内容：

```xml
<key>CFBundleIdentifier</key>
<string>com.openages.if</string>
<key>ElectronTeamID</key>
<string>84LQHT5G2Z</string>
```

## `inAppPurchase.getProducts` 没有返回值/返回慢

- `PassWall` => 关闭
- `PassWall` => `规则列表` => 移除`apple.com`
- `PassWall` => `DNS` => `晴空NFTSET`
- 清理DNS缓存 `sudo killall -HUP mDNSResponder; sudo dscacheutil -flushcache;`


## `inAppPurchase.getProducts`有返回值，但为空数组

- 删除if_electron的`node_modules`
- 删除最顶层if下的`node_modules`
- 到if_electron执行`pnpm install`，注意：执行完`pnpm install`之后要立刻修改plist，修改之前不能运行（首次运行存在一个注册机制，electron会注册相关信息到macos的系统中），否则修改无效
- 修改plist

## 打包之后,`node_modules/electron/dist/`不存在`Electron.app`

移除if_electron的node_modules，进入到顶层node_modules，找到electron，移除electron，然后执行pnpm install

## 沙盒出现无法正常支付的情况

执行`inAppPurchase.finishAllTransactions()`

## dmg签名失败

给dmg签名失败时，关闭passwall，保证网络的纯净性

## 检查更新无法退出主窗口

检查更新要求本地应用和远程应用都得签名，否则就会在检查更新时无法关闭主窗口，报错

## node-gyp build registry-js报错

将python版本降级到v3.11以下即可
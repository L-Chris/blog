#### 6.6.1 使用
1. 添加系统host配置(c:\windows\system32\drivers\etc\hosts)
```
xxx.xxx.xxx.xxx npm.lchris.com
```
2. npm和yarn设置镜像地址（必须都设置）
```
npm config set registry http://npm.lchris.com
yarn config set registry http://npm.lchris.com
```

#### 6.6.2 发布私有库
1. 登录账号
```
npm login
```
2. 发布
```
npm publish
```

#### 6.6.3 sinopia部署
1.安装

```
npm i sinopia -g
yarn global add sinopia
```

2.调整配置
packages配置处，需要根据情况调整包的access/publish/proxy配置
目前配置带@lchris前缀的走本地私有，而其他包都走proxy代理到淘宝镜像

```
vi /root/.config/sinopia/config.yaml

uplinks:
	npmjs:
		url: https://registry.npm.taobao.org/
packages:
	'@lchris/*':
		access: $all
		publish: $authenticated

	'*':
		acess: $all
		publsih: $authenticated
		proxy: npmjs
```
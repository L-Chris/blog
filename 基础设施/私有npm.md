# 私有npm

## 前言

稍有规模的前端团队，代码复用逐渐显得重要，私有仓库的方案也应运而生

目前，私有仓库方案主要有：
- npm + git：借助npm的安装方式
- private npm
	- [sinopia](https://github.com/rlidwka/sinopia)
	- [verdaccio](https://github.com/verdaccio/verdaccio)
	- [cnpm](https://github.com/cnpm/cnpmjs.org)


各方案对比如下：
| 方案 | 优点 | 缺点 | 适用场景 |
| --- | --- | --- | --- |
| npm+git | 简单，无需部署服务 | 无法使用npm update | 小团队，库数量少，且对库版本要求低 |
| sinopia | 简单，基本零配置部署 | 作者已不再维护 | 中型团队，对库版本管理有要求 |
| verdaccio | 简单，基本零配置部署 | 可扩展性不高，无法深度定制 | 中型团队，对库版本管理有要求 |
| cnpm | 扩展性好 | 配置复杂 | 大型团队，对私有仓库扩展性要求高 |

## 一、手动部署

### 1.1 部署

#### 安装

```bash
npm i verdaccio -g
# or
yarn global add verdaccio
```

#### 调整配置
根据情况调整包的access/publish/proxy配置

目前配置带@lchris前缀的走本地私有，而其他包都走proxy代理到淘宝镜像

```bash
vi /root/.config/verdaccio/config.yaml

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

### 1.2 使用

#### 添加系统host配置
```bash
# 文件地址 c:\windows\system32\drivers\etc\hosts
xxx.xxx.xxx.xxx npm.lchris.com
```

#### 设置包镜像地址
```bash
# 必须都设置
npm config set registry http://npm.lchris.com
yarn config set registry http://npm.lchris.com
```

#### 部署

为了提升私有库服务稳定性，使用pm2守护进程

```bash
# install pm2
yarn global add pm2
# run service
pm2 start verdaccio
```

#### 添加账号
```bash
npm adduser --registry http://npm.lchris.com
```

#### 发布
```bash
# 登录
npm login
# 发布
npm publish
```

## 二、Docker部署

文档：
- [Github]()
- [DockerHub]()
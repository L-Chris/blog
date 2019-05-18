# Jenkins

## TODO
- 版本更新流程
- 账号管理

## 一、部署

### 1.1 Docker部署
[官方文档](https://jenkins.io/zh/doc/book/installing/)

```bash
docker run \
  -u root \
  --rm \
  -d \
  -p 8080:8080 \
  -p 50000:50000 \
  -v $HOME/jenkins:/var/jenkins_home \
  -v /var/run/docker.sock:/var/run/docker.sock \
  jenkinsci/blueocean
```

### 1.2 普通安装

#### 1.2.1 java环境
java环境，参考[文档](https://blog.csdn.net/qq_37423198/article/details/78702574)

#### 1.2.2 下载源

#### 1.2.3 安装
```
sudo rpm -ih jenkins-1.562-1.1.noarch.rpm
```

#### 1.2.4 修改配置
```
vi /etc/sysconfig/jenkins
$JENKINS_USER="root"
```

#### 1.2.5 修改相关文件夹用户权限
```
chown -R root:root /var/lib/jenkins
chown -R root:root /var/cache/jenkins
chown -R root:root /var/log/jenkins
```

#### 1.2.6 启动
```
service jenkins start
```

### 1.3 备份 & 恢复
- 安装ThinBackup插件
- [系统管理]->[ThinBackup]->配置备份配置
- 保存备份文件
- 部署新节点，上传备份文件，安装ThinBackup插件，进入插件功能页面并还原

## 二、交互Gitlab

1. 添加本地host
```
vi  /etc/hosts
127.0.0.1 gitlab.lchris.com jenkins.lchris.com
```

## 三、常见问题

### 3.1 自定义主题
参考[文档](http://afonsof.com/jenkins-material-theme/)
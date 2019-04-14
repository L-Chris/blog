# Jenkins

## TODO
- 版本更新流程
- 账号管理
- Docker部署

## 一、部署

1. java环境，参考[文档](https://blog.csdn.net/qq_37423198/article/details/78702574)

2. 下载源

3. 安装
```
sudo rpm -ih jenkins-1.562-1.1.noarch.rpm
```

4. 修改配置
```
vi /etc/sysconfig/jenkins
$JENKINS_USER="root"
```

5. 修改相关文件夹用户权限
```
chown -R root:root /var/lib/jenkins
chown -R root:root /var/cache/jenkins
chown -R root:root /var/log/jenkins
```

6. 启动
```
service jenkins start
```

## 二、交互Gitlab

1. 添加本地host
```
vi  /etc/hosts
127.0.0.1 gitlab.lchris.com jenkins.lchris.com
```

## 三、常见问题

### 3.1 自定义主题
参考[文档](http://afonsof.com/jenkins-material-theme/)
# Gitlab

## TODO
- 版本更新流程
- Docker部署

## 一、部署

### 1.1 安装
1. 下载源
```
根据Centos版本下载：el7-Centos7 el6-Centos6
wget https://mirrors.tuna.tsinghua.edu.cn/gitlab-ce/yum/el7/gitlab-ce-10.8.3-ce.0.el7.x86_64.rpm
wget https://mirrors.tuna.tsinghua.edu.cn/gitlab-ce/yum/el6/gitlab-ce-10.8.3-ce.0.el6.x86_64.rpm
```
2. 安装依赖
```
yum -y install policycoreutils openssh-server openssh-clients postfix
```

3. 安装Gitlab
```
rpm -i gitlab-ce-10.8.3-ce.0.el7.x86_64.rpm
```

4. 调整Gitlab配置

- 设置端口
```
vi /etc/gitlab/gitlab.rb
external_url localhost:xxxx
```
- 开启邮箱功能，参考[官方文档](https://docs.gitlab.com/omnibus/settings/smtp.html)

### 1.2 启动

```
gitlab-ctl reconfigure
gitlab-ctl restart
```

## 二、Gitlab Runner部署
runner主要作用是执行Gitlab自带的CI/CD任务
```
# 下载
sudo wget -O /usr/local/bin/gitlab-runner https://gitlab-runner-downloads.s3.amazonaws.com/latest/binaries/gitlab-runner-linux-amd64
# 添加权限
sudo chmod +x /usr/local/bin/gitlab-runner
# 创建Gitlab CI用户
sudo useradd --comment 'GitLab Runner' --create-home gitlab-runner --shell /bin/bash
# 安装
sudo gitlab-runner install --user=gitlab-runner --working-directory=/home/gitlab-runner
# 执行
sudo gitlab-runner start
```

## 三、安全

### 3.1 账号管理
- 管理员账号由1~2人管理，使用算法随机生成
- 使用者账号自行邮箱注册，只能用公司邮箱注册
- linux账号管理参考[前端服务器Linux账号管理]()

### 3.2 定时备份
基本流程：
- Gitlab配合crontab命令，设置定时自动备份
- 通过scp命令，定时传送备份文件到远程服务器
- 远程服务器定时清理过期备份文件

1. Gitlab自动备份配置
```
crontab -e
# 添加配置
0 21 * * * /opt/gitlab/bin/gitlab-rake gitlab:backup:create
# 重启crontab
systemctl restart crond
```

2. Gitlab自动清理配置
```
# 修改配置
vi /etc/gitlab/gitlab.rb
gitlab_rails['backup_keep_time'] = 172800
# Gitlab更新配置
gitlab-ctl reconfigure
```

3. 定时传送配置
- shell脚本
```
#!/bin/bash
# gitlab服务器备份路径
LocalBackDir=/var/opt/gitlab/backups
# 远程备份服务器gitlab备份文件存放路径
RemoteBackDir=/root/gitlab_backup
RemoteUser=root
RemoteIP=172.17.20.23
# 当前系统日期
DATE=`date +"%Y-%m-%d"`
# Log存放路径
LogFile=$LocalBackDir/log/$DATE.log
# 查找 gitlab本地备份目录下 时间为60分钟之内的，并且后缀为.tar的gitlab备份文件
BACKUPFILE_SEND_TO_REMOTE=$(find $LocalBackDir -type f -mmin -60  -name '*.tar*')
# 新建日志文件
touch $LogFile
# 追加日志到日志文件
echo "Gitlab auto backup to remote server, start at  $(date +"%Y-%m-%d %H:%M:%S")" >>  $LogFile
echo "---------------------------------------------------------------------------" >> $LogFile
# 输出日志，打印出每次scp的文件名
echo "---------------------The file to scp to remote server is: $BACKUPFILE_SEND_TO_REMOTE-------------------------------" >> $LogFile
# 备份到远程服务器
scp $BACKUPFILE_SEND_TO_REMOTE $RemoteUser@$RemoteIP:$RemoteBackDir
#追加日志到日志文件
echo "---------------------------------------------------------------------------" >> $LogFile
```

- 定时任务
```
# 定时任务
30 21 * * * /root/auto_backup_to_remote.sh -D 1
# 重启crontab
systemctl restart crond
```

4. 远程服务器脚本
- 脚本
```shell
#!/bin/bash
# 远程备份服务器gitlab备份文件存放路径
GitlabBackDir=/root/gitlab_backup
# 查找远程备份路径下，超过14天且文件后缀为.tar的Gitlab备份文件然后删除
find $GitlabBackDir -type f -mtime +14 -name '*.tar*' -exec rm {} \;
```

- 定时任务
```
# 修改执行权限
chmod 777 auto_remove_old_backup.sh
# 定时任务配置
crontab -e
0 0 * * *  /root/auto_remove_old_backup.sh
# 重启crontab
systemctl restart crond
```

### 3.3 内网穿透
使用[sunny-ngrok](https://ngrok.cc/)，将内网gitlab端口暴露到外网可访问，方便司外办公

使用步骤：
- 下载对应版本的sunny-ngrok
- 开启sunny-ngrok
```
./sunny clientid 隧道id
```


## 四、常见问题

- 提示gitlab-workhorse: runsv not running时：
```
systemctl start gitlab-runsvdir.service
systemctl status gitlab-runsvdir.service
gitlab-ctl start
```

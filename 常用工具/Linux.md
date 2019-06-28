# Linux

## Centos 7阿里云镜像
```bash
# 备份
mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.backup
curl -o /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo
```

## 安装git
```bash
yum install -y epel-release && \
rpm -ivh https://centos7.iuscommunity.org/ius-release.rpm && \
yum list git2u && \
yum install -y git2u && \
git --version
```


## tar
```
# 压缩文件夹
tar -cvf examples.tar files|dir

# 解压
tar -xvf examples.tar
```
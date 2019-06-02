# Linux

## 安装git
yum install -y epel-release  
rpm -ivh https://centos7.iuscommunity.org/ius-release.rpm  
yum list git2u  
yum install -y git2u  
git --version

## tar
```
# 压缩文件夹
tar -cvf examples.tar files|dir

# 解压
tar -xvf examples.tar
```
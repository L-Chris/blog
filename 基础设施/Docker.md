# Docker

## 一、安装

### 1.1 linux环境

#### 1.1.1 Centos7镜像
```bash
curl -o /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo
```

#### 1.1.2 安装git

```bash
yum install -y epel-release && \
rpm -ivh https://repo.ius.io/ius-release-el7.rpm && \
yum list git2u && \
yum install -y git2u && \
git --version
```

#### 1.1.3 设置Docker镜像

安装相关依赖
```bash
sudo yum install -y yum-utils device-mapper-persistent-data lvm2
```

设置stable镜像
```bash
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
```

#### 1.1.4 安装Docker CE
```bash
sudo yum install docker-ce docker-ce-cli containerd.io
```

#### 1.1.5 安装Docker Compose
```bash
sudo curl -L "https://github.com/docker/compose/releases/download/1.24.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

#### 1.1.6 启动Docker
```bash
sudo systemctl start docker
```

#### 1.1.7 汇总

##### centos7
```bash
sudo curl -o /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo && \
sudo yum install -y yum-utils device-mapper-persistent-data lvm2 && \
sudo yum-config-manager --add-repo https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo && \
sudo yum install docker-ce docker-ce-cli containerd.io && \
sudo curl -L https://get.daocloud.io/docker/compose/releases/download/1.24.1/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose && \
sudo chmod +x /usr/local/bin/docker-compose && \
sudo systemctl enable docker && \
sudo systemctl start docker
```

##### debian
```bash
apt-get update && \
apt-get -y install apt-transport-https ca-certificates curl software-properties-common && \
curl -fsSL http://mirrors.aliyun.com/docker-ce/linux/debian/gpg | apt-key add - && \
add-apt-repository "deb [arch=amd64] http://mirrors.aliyun.com/docker-ce/linux/debian $(lsb_release -cs) stable" && \
apt-get -y update && \
apt-get -y install docker-ce && \
curl -L https://get.daocloud.io/docker/compose/releases/download/1.24.1/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose && \
chmod +x /usr/local/bin/docker-compose
```

## 二、使用镜像

- 进入[阿里云镜像加速页面](https://cr.console.aliyun.com/#/accelerator)

- 修改/etc/docker/daemon.json文件
```bash
{
  "registry-mirrors": ["https://72idtxd8.mirror.aliyuncs.com"]
}
```

- 重启daemon
```bash
systemctl daemon-reload
```

- 启动docker服务
```bash
# 开机自动启动
sudo systemctl enable docker
# 启动
sudo systemctl restart docker
```

## 三、问题

### 3.1 docker attach卡住情况
当容易在```-d```状态运行时，运行的进程是ssh，而不是```/bin/bash```也没有虚拟终端(-it)参数，所以不能进入。
此时可用exec命令：
```
docker exec -it containerID /bin/bash
```

### 3.2 virtualbox共享文件夹挂载
```bash
sudo mount -t vboxsf name dir
```
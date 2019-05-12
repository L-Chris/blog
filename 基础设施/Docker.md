# Docker

## 一、安装

### 1.1 linux环境

#### 1.1.1 设置Docker镜像

安装相关依赖
```bash
sudo yum install -y yum-utils device-mapper-persistent-data lvm2
```

设置stable镜像
```bash
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
```

#### 1.1.2 安装Docker CE
```bash
sudo yum install docker-ce docker-ce-cli containerd.io
```

#### 1.1.3 启动Docker
```bash
sudo systemctl start docker
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

- 重启docker服务
```bash
systemctl restart docker
```

## 三、问题

### 3.1 docker attach卡住情况
当容易在```-d```状态运行时，运行的进程是ssh，而不是```/bin/bash```也没有虚拟终端(-it)参数，所以不能进入。
此时可用exec命令：
```
docker exec -it containerID /bin/bash
```
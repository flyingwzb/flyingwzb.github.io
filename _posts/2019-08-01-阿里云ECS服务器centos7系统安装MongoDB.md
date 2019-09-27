---
layout:     post
title:      阿里云ECS服务器centos7系统安装MongoDB
subtitle:   Linux系统软件安装
date:       2017-12-31
author:     Will Wang
header-img: img/post-bg-article.jpg
catalog: true
tags:
    - 阿里云
    - MongoDB
---

#### 简介
- MongoDB 是一个基于分布式 文件存储的NoSQL数据库
- 由C++语言编写，运行稳定，性能高
- 旨在为 WEB 应用提供可扩展的高性能数据存储解决方案

#### MongoDB特点
- 模式自由：可以把不同结构的文档存储在同一个数据库里
- 面向集合的存储：适合存储 JSON风格文件的形式
- 完整的索引支持：对任何属性可索引
- 复制和高可用性：支持服务器之间的数据复制，支持主-从模式及服务器之间的相互复制。复制的主要目的是提供冗余及自动故障转移
- 自动分片：支持云级别的伸缩性：自动分片功能支持水平的数据库集群，可动态添加额外的机器
- 丰富的查询：支持丰富的查询表达方式，查询指令使用JSON形式的标记，可轻易查询文档中的内嵌的对象及数组
- 快速就地更新：查询优化器会分析查询表达式，并生成一个高效的查询计划
- 高效的传统存储方式：支持二进制数据及大型对象（如照片或图片）

#### 在CentOS7上安装MongoDB
###### 下载地址
- [https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-rhel70-4.0.0.tgz](https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-rhel70-4.0.0.tgz)
###### 解压
```
cd /usr/local/

tar -zxvf mongodb-linux-x86_64-rhel70-4.0.0.tgz 
```
###### 重命名文件夹
```
mv mongodb-linux-x86_64-rhel70-4.0.0 mongodb4.0.0
```
###### 创建日志目录和数据文件目录
```
cd /usr/local/mongodb4.0.0/

mkdir -p data/logs

mkdir -p data/db
```
###### 指定配置文件
- 先在你的windows系统桌面上准备一个文件mongodb.conf，移动阿里云服务器目录下：/usr/local/mongodb4.0.0/
```
#端口号(默认的端口号是27017)
port=27017

#数据目录
dbpath=/usr/local/mongodb4.0.0/data/db

#日志目录（指定mongodb.log文件名，系统会自动创建）
logpath=/usr/local/mongodb4.0.0/logs/mongodb.log

#设置后台运行
fork=true 

#日志输出方式（写日志的模式：设置为true为追加。默认是覆盖。如果未指定此设置，启动时MongoDB的将覆盖现有的日志文件。）
logappend=true 

#开启认证（默认是false,不需要认证的，这里开启认证是为了安全性）
auth=false
```
###### 启动MongoDB
```
cd /usr/local/mongodb4.0.0/bin/

./mongod --config ../mongodb.conf
```
- 如果启动成功，你会看到以下内容：
    ```
    2019-08-30T10:38:27.567+0800 I CONTROL  [main] Automatically disabling TLS 1.0, to force-enable TLS 1.0 specify --sslDisabledProtocols 'none'
    about to fork child process, waiting until server is ready for connections.
    forked process: 32667
    child process started successfully, parent exiting
    ```
- 通过ps aux |grep mongodb命令查看mongodb进程是否开启
    ```
    ps aux |grep mongodb
    root     32667  4.0  2.6 1068176 50476 ?       Sl   10:38   0:00 ./mongod --config ../mongodb.conf
    root     32694  0.0  0.0 112708   988 pts/0    R+   10:38   0:00 grep --color=auto mongodb
    ```
###### 进入终端操作数据库
```
cd /usr/local/mongodb4.0.0/bin/

./mongo --port=27017
MongoDB shell version v4.0.0
connecting to: mongodb://127.0.0.1:27017
MongoDB server version: 4.0.0
Welcome to the MongoDB shell.
For interactive help, type "help".
For more comprehensive documentation, see
	http://docs.mongodb.org/
Questions? Try the support group
	http://groups.google.com/group/mongodb-user
> show dbs
> show dbs
> exit
bye
```

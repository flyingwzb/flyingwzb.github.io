---
layout:     post
title:      快速搭建个人博客
subtitle:   手把手教你在半小时内搭建自己的个人博客(如果不踩坑的话🙈🙊🙉)
date:       2018-01-02
author:     Will Wang
header-img: img/post-bg-article.jpg
catalog: true
tags:
    - Blog
---

https://flyingwzb.github.io/2018/01/02/%E5%BF%AB%E9%80%9F%E6%90%AD%E5%BB%BA%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/
> 正所谓前人栽树，后人乘凉。
> 
> 感谢[Huxpro](https://github.com/huxpro)提供的博客模板
> 
> [我的的博客](https://flyingwzb.github.io)

# 前言
从 Jekyll 到 GitHub Pages 中间踩了许多坑，终于把我的个人博客[Will Wang Blog](https://flyingwzb.github.io)搭建出来了。。。

本教程针对的是不懂技术又想搭建个人博客的小白，操作简单暴力且快速。当然懂技术那就更好了。

看看看博客的主页样式：
[![](https://github.com/flyingwzb/flyingwzb.github.io/blob/master/img/readme-home.png?raw=true)](https://flyingwzb.github.io/)

在手机上的布局：
[![](https://github.com/flyingwzb/flyingwzb.github.io/blob/master/img/post-home-h5.png?raw=true)](https://flyingwzb.github.io/)

废话不多说了，开始进入正文。

# 快速开始

### 从注册一个Github账号开始

我采用的搭建博客的方式是使用 [GitHub Pages](https://pages.github.com/) + [jekyll](http://jekyll.com.cn/) 的方式。

要使用 GitHub Pages，首先你要注册一个[GitHub](https://github.com/)账号，GitHub 是全球最大的同性交友网站(吐槽下程序员~)，你值得拥有。
![](http://upload-images.jianshu.io/upload_images/2178672-e65e5cda50f38cef.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 拉取我的博客模板

注册完成后搜索 `flyingwzb.github.io` 进入[我的仓库](https://github.com/flyingwzb/flyingwzb.github.io)

![](https://github.com/flyingwzb/flyingwzb.github.io/blob/master/img/blog/blog-001.png?raw=true)
点击右上角的 **Fork** 将我的仓库拉倒你的账号下

稍等一下，点击刷新，你会看到**Fork**了成功的页面
![](https://github.com/flyingwzb/flyingwzb.github.io/blob/master/img/blog/blog-002.png?raw=true)

### 修改仓库名

点击**settings**进入设置
![](https://github.com/flyingwzb/flyingwzb.github.io/blob/master/img/blog/blog-003.png?raw=true)

<p id = "Rename"></p>
修改仓库名为 `你的Github账号名.github.io`，然后 Rename

![](https://github.com/flyingwzb/flyingwzb.github.io/blob/master/img/blog/blog-004.png?raw=true)

这时你在在浏览器中输入 `你的Github账号名.github.io` 例如:`flyingwzb.github.io`

你将会看到如下界面
![](https://github.com/flyingwzb/flyingwzb.github.io/blob/master/img/readme-home.png?raw=true)

说明已经成功一半了😀。。。当然，还需要修改博客的配置才能变成你的博客。

若是出现
![](http://upload-images.jianshu.io/upload_images/2178672-cfd55a22902a9d2c.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

则需要 [检查一下你的仓库名是否正确](#Rename)

### 整个网站结构

修改Blog前我们来看看Jekyll 网站的基础结构，当然我们的网站比这个复杂。

```
    ├── _config.yml
    ├── _drafts
    |   ├── begin-with-the-crazy-ideas.textile
    |   └── on-simplicity-in-technology.markdown
    ├── _includes
    |   ├── footer.html
    |   └── header.html
    ├── _layouts
    |   ├── default.html
    |   └── post.html
    ├── _posts
    |   ├── 1994-10-03-Hello-World.md
    |   └── 2018-01-01-My-First-Blog.md
    ├── _data
    |   └── members.yml
    ├── _site
    ├── img
    └── index.html
```

很复杂看不懂是不是，不要紧，你只要记住其中几个OK了

- `_config.yml` 全局配置文件
- `_posts`	放置博客文章的文件夹
- `img`	存放图片的文件夹

其他的想继续深究可以[看这里](http://jekyll.com.cn/docs/structure/)

### 修改博客配置

来到你的仓库，找到`_config.yml`文件,这是网站的全局配置文件。
![](https://github.com/flyingwzb/flyingwzb.github.io/blob/master/img/blog/blog-005.png?raw=true)

点击修改
![](https://github.com/flyingwzb/flyingwzb.github.io/blob/master/img/blog/blog-006.png?raw=true)

然后编辑`_config.yml`的内容
![](https://github.com/flyingwzb/flyingwzb.github.io/blob/master/img/blog/blog-007.png?raw=true)

接下来我们来详细说说以下配置文件的内容：

#### 基础设置
```yaml
# Site settings
title: My Blog                      # 你博客的标题
SEOTitle: 我的博客 | My Blog    	    # 显示在浏览器上搜索的时候显示的标题
header-img: img/post-bg-rwd.jpg  	# 显示在首页的背景图片
email: You@gmail.com	            # 个人邮箱
description: "You Blog"  			# 网站介绍
keyword: "Will Wang, Will Wang Blog, 王志彪的博客, flyingwzb, 王志彪, Java, golang" #关键词
url: "https://flyingwzb.github.io"  # 这个就是填写你的博客地址
baseurl: ""                         # 这个我们不用填写
```
#### 侧边栏
```yaml
# Sidebar settings
sidebar: true                           # 是否开启侧边栏
sidebar-about-description: "侧边栏个人描述"
sidebar-avatar: /img/will-wang.jpg      # 你的个人头像
```
#### 社交账号
展示你的其他社交平台

![](http://upload-images.jianshu.io/upload_images/2178672-ec775a22f76e2f40.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

在下面你的社交账号的用户名就可以了，若没有可不用填

```yaml
# SNS settings
RSS: false
weibo_username:     username
zhihu_username:     username
github_username:    username
facebook_username:  username
jianshu_username:	jianshu_id
```

新加入了**简书**，`jianshu_id` 在你打开你的简书主页后的地址如：`https://www.jianshu.com/u/77560bfb8112`中，后面这一串数字：`77560bfb8112`

#### 评论系统

博客中使用的是 [Disqus](https://disqus.com/) 评论系统，在 [官网](https://disqus.com/) 注册帐号后，按下面的步骤简单的配置即可：

进入 [设置页面](https://disqus.com/home/settings/profile/) 配置个人信息

![配置 Disqus 个人信息](http://upload-images.jianshu.io/upload_images/2178672-904ecb30c536c73b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

找到 **Username**

![Disqus Account](http://upload-images.jianshu.io/upload_images/2178672-19d1b9e7d2624bfb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

这个 **Username**  就是我们 `_config.yml` 中 `disqus_username`

```yaml
# Disqus settings（https://disqus.com/）
disqus_username: flyingwzb
```

> 很对人反映 Disqus 评论插件加载不出来，因为 Disqus 在国内加载缓慢，所以我新集成了 Gitalk 评论插件（感谢[@FeDemo](https://github.com/FeDemo)的推荐），喜欢折腾的朋友可以看这篇：[《为博客添加 Gitalk 评论插件》](https://flyingwzb.github.io/2018/12/19/%E4%B8%BA%E5%8D%9A%E5%AE%A2%E6%B7%BB%E5%8A%A0-Gitalk-%E8%AF%84%E8%AE%BA%E6%8F%92%E4%BB%B6/)。 我已经在`_config.yml` 配置就好了，只需要填写参数可以了。

#### 网站统计

集成了 [Baidu Analytics](http://tongji.baidu.com/web/welcome/login) 和 [Google Analytics](http://www.google.cn/analytics/)，到各个网站注册拿到track_id替换下面的就可以了

这是我的 Google Analytics

![](http://upload-images.jianshu.io/upload_images/2178672-c36b895c53196fdb.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**不要使用我的track_id**😂。。。

若不想启用统计，直接删除或注释掉就可以了

```yaml
# Analytics settings
# Baidu Analytics
ba_track_id: 83e259f69b37d02a4633a2b7d960139c

# Google Analytics
ga_track_id: 'UA-90855596-1'            # Format: UA-xxxxxx-xx
ga_domain: auto
```

#### 好友
```yaml
friends: [
    {title: "书舟网",href: "http://kindle.archiew.top/"},
    {title: "阮一峰",href: "http://www.ruanyifeng.com/home.html"},
    {title: "阿里巴巴",href: "https://www.alibabagroup.com/cn/global/home"},
    {title: "腾讯",href: "https://www.tencent.com/zh-cn/index.html"},
    {title: "字节跳动",href: "https://www.bytedance.com/zh"}
]
```

#### 保存
讲网页拉倒底部，点击 `Commit changes` 提交保存

![](http://upload-images.jianshu.io/upload_images/2178672-0781006b5d15d149.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

再次进入你的主页，

![](https://github.com/flyingwzb/flyingwzb.github.io/blob/master/img/readme-home.png?raw=true)

恭喜你，你的个人博客搭建完成了😀。

# 写文章

利用 Github网站 ，我们可以不用学习[git](https://git-scm.com/)，就可以轻松管理自己的博客

对于轻车熟路的程序猿来说，使用git管理会更加方便。。。

## 创建
文章统一放在网站根目录下的 `_posts` 的文件夹中。
![](https://github.com/flyingwzb/flyingwzb.github.io/blob/master/img/blog/blog-008.png?raw=true)

创建一个文件
![](https://github.com/flyingwzb/flyingwzb.github.io/blob/master/img/blog/blog-009.png?raw=true)

在下面写文章，和标题，还能实时预览，最后提交保存就能看到自己的新文章了。
![](https://github.com/flyingwzb/flyingwzb.github.io/blob/master/img/blog/blog-010.png?raw=true)


## 格式
每一篇文章文件命名采用的是`2018-01-01-Hello-2018.md`时间+标题的形式，空格用`-`替换连接。

文件的格式是 `.md` 的 [**MarkDown**](https://flyingwzb.github.io/2018/01/05/Markdown%E4%BD%BF%E7%94%A8/) 文件。

我们的博客文章格式采用是 **MarkDown**+ **YAML** 的方式。

[**YAML**](http://www.ruanyifeng.com/blog/2016/07/yaml.html?f=tt) 就是我们配置 `_config`文件用的语言。

[**MarkDown**](https://flyingwzb.github.io/2018/01/05/Markdown%E4%BD%BF%E7%94%A8/) 是一种轻量级的「标记语言」，很简单。[花半个小时看一下](https://flyingwzb.github.io/2018/01/05/Markdown%E4%BD%BF%E7%94%A8/)就能熟练使用了

大概就是这么一个结构。

```
    ---
    layout:     post   				    # 使用的布局（不需要改）
    title:      My First Post 			# 标题 
    subtitle:   Hello World, Hello Blog # 副标题
    date:       2018-02-06 				# 时间
    author:     Will Wang 				# 作者
    header-img: img/post-bg-article.jpg 	# 这篇文章标题背景图片
    catalog: true 						# 是否归档
    tags:								# 标签
        - 生活
    ---
    
    ## Hey
    >这是我的第一篇博客。
    
    进入你的博客主页，新的文章将会出现在你的主页上.
```

按格式创建文章后，提交保存。进入你的博客主页，新的文章将会出现在你的主页上.
![](https://github.com/flyingwzb/flyingwzb.github.io/blob/master/img/readme-home.png?raw=true)

到这里，恭喜你！

你已经成功搭建了自己的个人博客以及学会在博客上撰写文字的技能了（是不是有点小兴奋🙈）。


#### 首页标签

在首页可以看到这些特色标签，当你的文章出现相同标签（默认相同的**标签数量大于1**），才会自动生成。

所以当你只放一篇文章的时候是不会出现标签的。
![](https://github.com/flyingwzb/flyingwzb.github.io/blob/master/img/blog/blog-011.png?raw=true)

建站的初期，博客比较少，若你想直接在首页生成比较多的标签。你可以在 `_congfig.yml`中找到这段：

```yaml
# Featured Tags
featured-tags: true                     # 是否使用首页标签
featured-condition-size: 1              # 相同标签数量大于这个数，才会出现在首页
```

将其修改为`featured-condition-size: 0`, 这样只有一个标签时也会出现在首页了。

相反，当你博客比较多，标签也很多时，这时你就需要改回 `1` 甚至是 `2` 了。


# 自定义域名
搭建好博客之后 你可能不想直接使用 [flyingwzb.github.io](http://flyingwzb.github.io) 这么长的博客域名吧, 想换成想 [flyingd.cn](https://flyingwzb.github.io) 这样简短的域名。那我们开始吧！

#### 购买域名
首先，你必须购买一个自己的域名。

我是在[阿里云](https://wanwang.aliyun.com/domain/?spm=5176.8006371.1007.dnetcndomain.q1ys4x)购买的域名

![](http://upload-images.jianshu.io/upload_images/2178672-ef3844cab15e35ff.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

用**阿里云** app也可以注册域名，域名的价格根据后缀的不同和域名的长度而分，比如我这个 `flyingd.cn` 的域名第一年才只要4元~

域名尽量选择短一点比较好记住，注意，不能选择中文域名，比如 `张三.top` ,GitHub Pages **无法处理中文域名**，会导致你的域名在你的主页上使用。

注册的步骤就不在介绍了

#### 解析域名

注册好域名后，需要将域名解析到你的博客上

管理控制台 → 域名与网站（万网） → 域名
![](http://upload-images.jianshu.io/upload_images/2178672-9a75bba50d1b14d7.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

选择你注册好的域名，点击解析
![](https://github.com/flyingwzb/flyingwzb.github.io/blob/master/img/blog/blog-012.png?raw=true)

添加解析

分别添加两个`A` 记录类型,

一个主机记录为 `www`,代表可以解析 `www.flyingd.cn`的域名

另一个为 `@`, 代表 `flyingd.cn`

记录值就是我们博客的IP地址，是 GitHub Pagas 在美国的服务器的地址 `185.199.111.153`
![](https://github.com/flyingwzb/flyingwzb.github.io/blob/master/img/blog/blog-013.png?raw=true)

可以通过 [这个网站](http://ip.chinaz.com/)  或者直接在终端输入`ping 你的地址`，查看博客的IP

	ping flyingwzb.github.io

细心地你会发现所有人的博客都解析到 `185.199.111.153` 这个IP。

然后 GitHub Pages 再通过 CNAME记录 跳转到你的主页上。

#### 修改CNAME

最后一步，只需要修改 我们github仓库下的 **CNAME** 文件。

选择 **CNAME** 文件
![](https://github.com/flyingwzb/flyingwzb.github.io/blob/master/img/blog/blog-014.png?raw=true)

使用的注册的域名进行替换,然后提交保存
![](https://github.com/flyingwzb/flyingwzb.github.io/blob/master/img/blog/blog-015.png?raw=true)

这时，输入你自己的域名，就可以解析到你的主页了。

大功告成！

# 进阶

若你对博客模板进行修改，你就要看看 Jekyll 的[开发文档](http://jekyll.com.cn),是中文文档哦，对英语一般的朋友简直是福利啊（比如说我😀）。

还要学习 **Git** 和 **GitHub** 的工作机制了及使用。

你可以先看看这个[git教程](http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/)，对git有个初步的了解后，那么相信你就能将自己图片传到GitHub仓库上，或者可以说掌握了 **使用git管理自己的GitHub仓库** 的技能呢。

对于轻车熟路的程序猿来说，这篇教程就算就结束了，因为下面的内容对于你们来说 so eazy~

但相信很多小白都一脸懵逼，那我们继续👇。

# 利用GithHub Desktop管理GitHub仓库

[GithHub Desktop](https://desktop.github.com/) 是 **GithHub** 推出的一款管理GitHub仓库的桌面软件，换句话说就是将你在**Github**上的文件同步到本地电脑上，并将修改后的文件同步到**Github**远程仓库。

#### 下载

点击图片进入下载页面，选择对应的平台进行下载
[![](http://upload-images.jianshu.io/upload_images/2178672-6022ba3938b3088e.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)](https://desktop.github.com/)

下面以**Mac**平台为例：

#### 安装

将下载好的文件解压，将这只小猫拖到应用程序文件夹中
![](http://upload-images.jianshu.io/upload_images/2178672-8f8c27f4e5c72276.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

就可以在**Launchpad**找到这只小猫咪~
![](http://upload-images.jianshu.io/upload_images/2178672-0f2da4717361459c.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 登录

点开应用,会弹出**登录**框，
![](http://upload-images.jianshu.io/upload_images/2178672-adb7d6824e471ef5.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

输入你的**GitHub**账号和密码进行登录
![](http://upload-images.jianshu.io/upload_images/2178672-2d7c407ebddbb44f.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

登录后关闭窗口
![](http://upload-images.jianshu.io/upload_images/2178672-93cdccc42024914b.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

然后返回引导窗，一直按 **Continue** 继续
![](http://upload-images.jianshu.io/upload_images/2178672-450ccef6b1ab7b0a.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**Continue**
![](http://upload-images.jianshu.io/upload_images/2178672-06b6e6792472ecae.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

还是**Continue**~
![](http://upload-images.jianshu.io/upload_images/2178672-681a6c455f6b512f.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

进入主界面，先 **右键Remve** 删除这个用户指导，贼烦~
![](http://upload-images.jianshu.io/upload_images/2178672-604f6f23b8fab6f3.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 克隆仓库

选择你的仓库克隆到本地

![](http://upload-images.jianshu.io/upload_images/2178672-45ddcd27e2f858a1.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![](http://upload-images.jianshu.io/upload_images/2178672-625be1220fea36b6.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


#### 管理仓库

现在文件夹中打开
![](http://upload-images.jianshu.io/upload_images/2178672-92c1616af56b501a.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

打开后你会的发现文件结构和你在Github上的一模一样~
![](http://upload-images.jianshu.io/upload_images/2178672-bf3580ae1cd9a29e.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

你最先关心的可能是你的头像~在**img**文件夹中把替换我的头像就好了。
![](http://upload-images.jianshu.io/upload_images/2178672-c9421d64538c3ba6.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

不仅是图片，所有在Github上的的操作都可以进行。

#### 保存修改

当你对仓库文件夹的文件下进行修改、添加或删除时，都可以在 **GitHub Desktop** 中看到

例如我在 `img` 中添加了一张图片 `avatar-demo.png` 添加了一张图片

就可以在看到**GitHub Desktop**显示了我的修改

保存修改只要按 **Commit to master**，然后可以写上你的修改说明
![](http://upload-images.jianshu.io/upload_images/2178672-4bfbfec37cbb8eb6.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 同步

将修改同步到 **GitHub** 远程仓库上只需要一步：点击右上角的**同步按钮**
![](http://upload-images.jianshu.io/upload_images/2178672-3c2ee8234a7f1832.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 完成

打开你的GitHub上的仓库，你就可以看到已经和本地同步了

可以看到你提交的详情： `add img` 
![](http://upload-images.jianshu.io/upload_images/2178672-293bdd4cbee0e9e3.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

这样，你已经能轻松管理自己的博客了。

想上传头像，背景，或者是删掉你不要的图片（我的头像😏）已经是 so eazy了吧~

#### 注意
你在 **GitHub** 网站上进行 **Commit** 操作后，需要在**GitHub Desktop**上按一下 **同步按键** 才能同步网站上的修改到你的本地。

# 修改个人介绍

![](https://github.com/flyingwzb/flyingwzb.github.io/blob/master/img/blog/blog-016.png?raw=true)

修改个人介绍需要修改根目录下的 `about.html` 文件
![](https://github.com/flyingwzb/flyingwzb.github.io/blob/master/img/blog/blog-016.png?raw=true)

看不懂 HTML 标签？没关系，对照着修改就好了~ 还有注意这个有中英介绍
![](https://github.com/flyingwzb/flyingwzb.github.io/blob/master/img/blog/blog-016.png?raw=true)

# 常见问题

最近有很多人给我提问题，我这边总结一下

#### 配置文件修改后没有效果
刷新几遍浏览器就好了~

不行的话，先清除浏览器缓存再试试。

#### 404错误

1. 检查你的仓库名是否有按照要求填写
2. 确定 **Fork** 的是不是我的仓库~

#### 修改CNAME文件，域名还是不变

清除浏览器缓存就OK~

#### 其他问题

直接在评论中提出来或私信我，我会一一替大家解决的😀


# 其他

最近有人往我的远程仓库不停的 **push**，一天连收几十封邮件！例如像这样的
![](http://upload-images.jianshu.io/upload_images/2178672-1347f2cc9a4a8dc8.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

原因大多是直接Clone了我的仓库到本地，**没有删除我的远程仓库地址**，添加完自己的仓库地址后，一口气推送到所有远程仓库（包括我的😂）~

打扰了我的工作和生活~

所以，**请不要往我的仓库上推送分支**！

我发现一个问题是，很多人每次修改博客的内容都commit一次到远程仓库，然后再查看修改结果，这样效率非常低！

#### 来，上车！

## 在本地调试博客

> 注：下面的操作是在 **Mac** 终端进行的。
> **Windows** 环境下的配置请参考 [@梦幻之云](http://www.jianshu.com/u/a13e7484dc21) 提供的 [这篇文章](https://agcaiyun.cn/2017/09/10/%E6%90%AD%E5%BB%BA%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/)。

有心的同学在 [jekyll官网](http://jekyllcn.com/) 就会发现 `jekyll` 的 提供的实例代码。

```bash
~ $ gem install jekyll bundler
~ $ jekyll new my-awesome-site
~ $ cd my-awesome-site
~/my-awesome-site $ bundle install
~/my-awesome-site $ bundle exec jekyll serve

# => 打开浏览器 http://localhost:4000
```

这段命令创建了一个默认的 `jekll` 网站，然后在本机的 4000 窗口展示。聪明的你应该发现怎么做了吧~

安装 `jekyll`和 `jekyll bundler`

```bash
$ gem install jekyll
$ gem install jekyll bundler
```

进入你的 **Blog 所在目录**，然后创建本地服务器

```bash
$ jekyll s
```

然后会显示 

```
 Auto-regeneration: enabled for '/Users/baiying/Blog'
Configuration file: /Users/baiying/Blog/_config.yml
    Server address: http://127.0.0.1:4000/
  Server running... press ctrl-c to stop.
```

你就可以在 <http://127.0.0.1:4000/> 看到你的博客，你对本地博客的修改都会在这个地址进行显示，这大大提高了对博客的配置效率。

使用`ctrl+c`就可以停止 **serve**

# Star

若本教程顺利帮你搭建了自己的个人博客，请不要 **害羞**，给我的 [github仓库](https://github.com/flyingwzb/flyingwzb.github.io) 点个 **star** 吧！

因为最近发现 Fork 将近破百，加上直接 Clone 仓库的，保守估计已经帮助上百人成功的搭建了自己的博客，~~可是 Star 却仅仅只有 **12**！可能还是做的不够好吧！~~现在已经破百了，感谢大家的Star！

### **别无他求，点个 [Star](https://github.com/flyingwzb/flyingwzb.github.io) 吧**！

![](https://github.com/flyingwzb/flyingwzb.github.io/blob/master/img/blog/blog-017.png?raw=true)

**心满意足！**

# 补充

#### 修改网站的 **icon**

![](https://github.com/flyingwzb/flyingwzb.github.io/blob/master/img/blog/blog-018.png?raw=true)

要修改如图所示的网站 **icon**：

在博客 `img` 目录下找到并替换 `favicon.ico` 这个图标即可，图标尺寸为`32x32`。
![](https://github.com/flyingwzb/flyingwzb.github.io/blob/master/img/blog/blog-019.png?raw=true)


#### 修改主页的座右铭

最近有不少小伙伴私信我：**如何修改主页的座右铭？**

就是这个：
![](https://github.com/flyingwzb/flyingwzb.github.io/blob/master/img/blog/blog-020.png?raw=true)

很简单，找到博客目录下的 **index.html** 文件，修改这句话就可以了。
![](https://github.com/flyingwzb/flyingwzb.github.io/blob/master/img/blog/blog-021.png?raw=true)

#### 如何在博客文章中上插入图片

博客的文章用的是 MarkDown 格式，如果没用过 MarkDown 真的 强烈推荐 [花半个小时学习一下](https://flyingwzb.github.io/2018/01/05/Markdown%E4%BD%BF%E7%94%A8/)。

MarkDown 中添加图片的形式是 :`![](图片的URL)`

例如：

`![MarkDown示例图片](http://upload-images.jianshu.io/upload_images/2178672-eb2effd6b942a500.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)`就会显示下面这张图片

![MarkDown示例图片](http://upload-images.jianshu.io/upload_images/2178672-98965f66db8f5856.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

`https://ws3.sinaimg.cn/large/006tNc79gy1fj9xhjzobbj30yg0my75z.jpg`就是这张图片的URL，我们可以在浏览器输入这个URL找到或下载这张图片。

所以，要在 MacDown 中插入图片，这张图片就需要上传到图床（网上），然后在引
用这张图片的URL。

##### 将图片上传到图床

Mac 上的图床神器：iPic  

直接在App Store上下载，谁用谁知道！

使用方法很简单，直接拖动图片到 P 图标上，或者选中图片按快捷键 `⌘+U`，就能请示上传。

上传成功就能直接粘贴图片的URL。
![iPic](http://upload-images.jianshu.io/upload_images/2178672-7399aeaced6f1e29.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

用 iPic 上传图片后，获取URL插入文章中就可以了。
![iPic上传图片](http://upload-images.jianshu.io/upload_images/2178672-4be76fb02708de5e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 推荐几个好用软件

##### MarkDown编辑器

[MacDown](https://macdown.uranusjr.com/)：可能是Mac上最好的MacDown编辑器了  

![](http://upload-images.jianshu.io/upload_images/2178672-2226239a63278302.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

##### 图片压缩工具

[ImageOptim](https://imageoptim.com/)

对于我们的博客来说，图片越大，加载速度越慢。

不信你用手机打开你的博客试试~

所以有必要对我们上传到博客网站中的图片：指的是你的头像，首页背景图片，文章背景图片等。对于博客文章中插入的图片，其实也可以压缩了再上传。

对博客中的所有图片进行压缩：

看看压缩结果，最高的一张压缩了78.7%，这简直是太可怕了！
![ImageOptim压缩图片](http://upload-images.jianshu.io/upload_images/2178672-0f8e643fa1da8674.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

好了，现在个人博客的加载速度估计要起飞了~

### 统计网站PV、UV

新增网站访问量的PV、UV统计，采用[不蒜子](http://ibruce.info/2015/04/04/busuanzi/)提供的js，动态引入即可实现统计功能。

在`footer.html`文件中加入引入相关配置
![](https://github.com/flyingwzb/flyingwzb.github.io/blob/master/img/blog/blog-022.png?raw=true)

统计网站PV、UV统计效果如下：
![](https://github.com/flyingwzb/flyingwzb.github.io/blob/master/img/blog/blog-023.png?raw=true)


### JS实现文章打赏功能

在js包路径下引入`ds.js`文件，并在`post.html`文件如加入如下配置：

```javascript 1.8
    // 引入ds.js源文件
    <script src='{{ "/js/ds.js" | prepend: site.baseurl }}'></script>
    <script>
        new tctip({
            // 按钮UI位置
            top: '20%',
            button: {
                // id对应颜色配置
                id: 6,
                // 可选打赏或赞助两种类型，其他类型不可用
                type: 'dashang'
            },
            list: [
                {
                    type: 'alipay',
                    // 支付宝付款码，这里可以将照片转成base64码，加载更快
                    qrImg: 'data:image/jpeg;base64,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'
                }, {
                    type: 'wechat',
                    // 微信付款码，这里可以将照片转成base64码，加载更快
                    qrImg: 'data:image/jpeg;base64,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'
                }
            ]
        }).init()
    </script>
```

刷新页面，点击博客的每一篇文章即可看到我的博客打赏码（喜欢请打赏），如下：
![](https://github.com/flyingwzb/flyingwzb.github.io/blob/master/img/blog/blog-024.png?raw=true)

#### 最后

我在博客中的每篇文章都是我一字一句敲出来的，转载的文章我也注明了出处，表示对原作者的尊重。同时也希望大家都能尊重我的付出。

谢谢~
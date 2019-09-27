---
layout:     post
title:      SpringMVC的拦截器和过滤器
subtitle:   SpringMVC的拦截器（Interceptor）和过滤器（Filter）的区别与联系
date:       2018-07-25
author:     Will Wang
header-img: img/post-bg-article.jpg
catalog: true
tags:
    - SpringMVC
    - Interceptor
    - Filter
---

### 一 简介

##### （1）过滤器：

依赖于servlet容器。在实现上基于函数回调，可以对几乎所有请求进行过滤，但是缺点是一个过滤器实例只能在容器初始化时调用一次。使用过滤器的目的是用来做一些过滤操作，获取我们想要获取的数据，比如：在过滤器中修改字符编码；在过滤器中修改HttpServletRequest的一些参数，包括：过滤低俗文字、危险字符等
> 继承HttpServletRequestWrapper以实现在Filter中修改HttpServletRequest的参数

> 在SpringMVC中使用过滤器（Filter）过滤容易引发XSS的危险字符

##### （2）拦截器：

依赖于web框架，在SpringMVC中就是依赖于SpringMVC框架。在实现上基于Java的反射机制，属于**面向切面编程(AOP)** 的一种运用。由于拦截器是基于web框架的调用，因此可以使用Spring的**依赖注入(DI)** 进行一些业务操作，同时一个拦截器实例在一个controller生命周期之内可以多次调用。但是缺点是只能对controller请求进行拦截，对其他的一些比如直接访问静态资源的请求则没办法进行拦截处理

> 在SpringMVC中使用拦截器（interceptor）拦截CSRF攻击（修）

> SpringMVC中使用Interceptor+cookie实现在一定天数之内自动登录

### 二 多个过滤器与拦截器的代码执行顺序

如果在一个项目中仅仅只有一个拦截器或者过滤器，那么我相信相对来说理解起来是比较容易的。但是我们是否思考过：如果一个项目中有多个拦截器或者过滤器，那么它们的执行顺序应该是什么样的？或者再复杂点，一个项目中既有多个拦截器，又有多个过滤器，这时它们的执行顺序又是什么样的呢？

下面我将用简单的代码来测试说明：
1. 先定义两个过滤器：
    1. 过滤器1：
    ```java
    import java.io.IOException;
     
    import javax.servlet.FilterChain;
    import javax.servlet.ServletException;
    import javax.servlet.http.HttpServletRequest;
    import javax.servlet.http.HttpServletResponse;
     
    import org.springframework.web.filter.OncePerRequestFilter;
     
    public class TestFilter1 extends OncePerRequestFilter {
    	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
    			throws ServletException, IOException {
    		//在DispatcherServlet之前执行
    		system.out.println("############TestFilter1 doFilterInternal executed############");
    		filterChain.doFilter(request, response);
    		//在视图页面返回给客户端之前执行，但是执行顺序在Interceptor之后
    		System.out.println("############TestFilter1 doFilter after############");
    //		try {
    //			Thread.sleep(10000);
    //		} catch (InterruptedException e) {
    //			e.printStackTrace();
    //		}
    	}
    }
    ```
    2. 过滤器2：
    ```java
    import java.io.IOException;
     
    import javax.servlet.FilterChain;
    import javax.servlet.ServletException;
    import javax.servlet.http.HttpServletRequest;
    import javax.servlet.http.HttpServletResponse;
     
    import org.springframework.web.filter.OncePerRequestFilter;
     
    public class TestFilter2 extends OncePerRequestFilter {
    	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
    			throws ServletException, IOException {
    		System.out.println("############TestFilter2 doFilterInternal executed############");
    		filterChain.doFilter(request, response);
    		System.out.println("############TestFilter2 doFilter after############");
    	}
    }
    ```
    3. 在web.xml中注册这两个过滤器：
    ```xml
    <!-- 自定义过滤器：testFilter1 -->	
     	<filter>
    		<filter-name>testFilter1</filter-name>
    		<filter-class>cn.zifangsky.filter.TestFilter1</filter-class>
    	</filter>
    	<filter-mapping>
    		<filter-name>testFilter1</filter-name>
    		<url-pattern>/*</url-pattern>
    	</filter-mapping>
    	<!-- 自定义过滤器：testFilter2 -->	
     	<filter>
    		<filter-name>testFilter2</filter-name>
    		<filter-class>cn.zifangsky.filter.TestFilter2</filter-class>
    	</filter>
    	<filter-mapping>
    		<filter-name>testFilter2</filter-name>
    		<url-pattern>/*</url-pattern>
    	</filter-mapping>
    ```
2. 再定义两个拦截器：
    1. 拦截器1，基本拦截器：
    ```java
    import javax.servlet.http.HttpServletRequest;
    import javax.servlet.http.HttpServletResponse;
     
    import org.springframework.web.servlet.HandlerInterceptor;
    import org.springframework.web.servlet.ModelAndView;
     
    public class BaseInterceptor implements HandlerInterceptor{
    	
    	/**
    	 * 在DispatcherServlet之前执行
    	 * */
    	public boolean preHandle(HttpServletRequest arg0, HttpServletResponse arg1, Object arg2) throws Exception {
    		System.out.println("************BaseInterceptor preHandle executed**********");
    		return true;
    	}
     
    	/**
    	 * 在controller执行之后的DispatcherServlet之后执行
    	 * */
    	public void postHandle(HttpServletRequest arg0, HttpServletResponse arg1, Object arg2, ModelAndView arg3)
    			throws Exception {
    		System.out.println("************BaseInterceptor postHandle executed**********");
    	}
    	
    	/**
    	 * 在页面渲染完成返回给客户端之前执行
    	 * */
    	public void afterCompletion(HttpServletRequest arg0, HttpServletResponse arg1, Object arg2, Exception arg3)
    			throws Exception {
    		System.out.println("************BaseInterceptor afterCompletion executed**********");
    //		Thread.sleep(10000);
    	}
    }
    ```
    2. 指定controller请求的拦截器：
    ```java
    import javax.servlet.http.HttpServletRequest;
    import javax.servlet.http.HttpServletResponse;
     
    import org.springframework.web.servlet.HandlerInterceptor;
    import org.springframework.web.servlet.ModelAndView;
     
    public class TestInterceptor implements HandlerInterceptor {
    	public boolean preHandle(HttpServletRequest arg0, HttpServletResponse arg1, Object arg2) throws Exception {
    		System.out.println("************TestInterceptor preHandle executed**********");
    		return true;
    	}
     
    	public void postHandle(HttpServletRequest arg0, HttpServletResponse arg1, Object arg2, ModelAndView arg3)
    			throws Exception {
    		System.out.println("************TestInterceptor postHandle executed**********");
    	}
     
    	public void afterCompletion(HttpServletRequest arg0, HttpServletResponse arg1, Object arg2, Exception arg3)
    			throws Exception {
    		System.out.println("************TestInterceptor afterCompletion executed**********");
    	}
    }
    ```
    3. 在SpringMVC的配置文件中注册这两个拦截器：
    ```xml
    	<!-- 拦截器 -->
     	<mvc:interceptors>
    		<!-- 对所有请求都拦截，公共拦截器可以有多个 -->
    		<bean name="baseInterceptor" class="cn.zifangsky.interceptor.BaseInterceptor" />
    		<!-- <bean name="testInterceptor" class="cn.zifangsky.interceptor.TestInterceptor" /> -->
    		<mvc:interceptor>		
    			<!-- 对/test.html进行拦截 -->
    			<mvc:mapping path="/test.html"/>
    			<!-- 特定请求的拦截器只能有一个 -->
    			<bean class="cn.zifangsky.interceptor.TestInterceptor" />
    		</mvc:interceptor>
    	</mvc:interceptors>
    ```
3. 定义一个测试使用的controller：
```java
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
 
@Controller
public class TestController {
	
	@RequestMapping("/test.html")
	public ModelAndView handleRequest(){
		System.out.println("---------TestController executed--------");
		return new ModelAndView("test");
	}
}
```
4. 视图页面test.jsp：
```xml
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>    
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<base href="http://983836259.blog.51cto.com/7311475/">
<title>FilterDemo</title>
</head>
<body>
	<%
		System.out.println("test.jsp is loading");
	%>
	<div align="center">
		This is test page
	</div>
</body>
</html>
```

5. 测试效果：

- 说明了过滤器的运行是依赖于servlet容器的，跟springmvc等框架并没有关系。并且，多个过滤器的执行顺序跟xml文件中定义的先后关系有关

- 对于过个拦截器它们之间的执行顺序跟在SpringMVC的配置文件中定义的先后顺序有关

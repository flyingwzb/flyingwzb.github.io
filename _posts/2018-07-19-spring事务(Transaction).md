---
layout:     post
title:      Spring事务(Transaction)
subtitle:   七种事务传播行为及五种隔离级别
date:       2018-07-19
author:     Will Wang
header-img: img/post-bg-article.jpg
catalog: true
tags:
    - Spring
    - Transaction
---

#### 1. 首先,说说什么事务（Transaction）
- 事务，就是一组操作数据库的动作集合。事务是现代数据库理论中的核心概念之一。
- 如果一组处理步骤或者全部发生或者一步也不执行，我们称该组处理步骤为一个事务。
- 当所有的步骤像一个操作一样被完整地执行，我们称该事务被提交。
- 由于其中的一部分或多步执行失败，导致没有步骤被提交，则事务必须回滚到最初的系统状态。

#### 2. spring七个事务传播属性：
1. PROPAGATION_REQUIRED
    - 支持当前事务，如果当前没有事务，就新建一个事务。这是最常见的选择。
2. PROPAGATION_SUPPORTS
    - 支持当前事务，如果当前没有事务，就以非事务方式执行。
3. PROPAGATION_MANDATORY
    - 支持当前事务，如果当前没有事务，就抛出异常。
4. PROPAGATION_REQUIRES_NEW
    - 新建事务，如果当前存在事务，把当前事务挂起。
5. PROPAGATION_NOT_SUPPORTED
    - 以非事务方式执行操作，如果当前存在事务，就把当前事务挂起。
6. PROPAGATION_NEVER
    - 以非事务方式执行，如果当前存在事务，则抛出异常。
7. PROPAGATION_NESTED
    - 如果当前存在事务，则在嵌套事务内执行。如果当前没有事务，则进行与PROPAGATION_REQUIRED类似的操作。
- 备注：常用的两个事务传播属性是1和4，即PROPAGATION_REQUIRED，PROPAGATION_REQUIRES_NEW

#### 3. 五个隔离级别：
- ISOLATION_DEFAULT 
    - 这是一个PlatfromTransactionManager默认的隔离级别，使用数据库默认的事务隔离级别.
- 另外四个与JDBC的隔离级别相对应；
- ISOLATION_READ_UNCOMMITTED 
    - 这是事务最低的隔离级别，它充许别外一个事务可以看到这个事务未提交的数据。
    - 这种隔离级别会产生脏读，不可重复读和幻像读。
- ISOLATION_READ_COMMITTED 
    - 保证一个事务修改的数据提交后才能被另外一个事务读取。另外一个事务不能读取该事务未提交的数据。 
    - 这种事务隔离级别可以避免脏读出现，但是可能会出现不可重复读和幻像读。
- ISOLATION_REPEATABLE_READ 
    - 这种事务隔离级别可以防止脏读，不可重复读。但是可能出现幻像读。
    - 它除了保证一个事务不能读取另一个事务未提交的数据外，还保证了避免下面的情况产生(不可重复读)。
- ISOLATION_SERIALIZABLE 
    - 这是花费最高代价但是最可靠的事务隔离级别。事务被处理为顺序执行。 
    - 除了防止脏读，不可重复读外，还避免了幻像读。

##### 关键词： 
1. 幻读：事务1读取记录时事务2增加了记录并提交，事务1再次读取时可以看到事务2新增的记录； 
2. 不可重复读取：事务1读取记录时，事务2更新了记录并提交，事务1再次读取时可以看到事务2修改后的记录；
3. 脏读：事务1更新了记录，但没有提交，事务2读取了更新后的行，然后事务T1回滚，现在T2读取无效。

脏读：
- 指一个事务读取了一个未提交事务的数据

不可重复读：
- 在一个事务内读取表中的某一行数据,多次读取结果不同.一个事务读取到了另一个事务提交后的数据.

虚读(幻读)：
- 在一个事务内读取了别的事务插入的数据，导致前后读取不一致(insert)
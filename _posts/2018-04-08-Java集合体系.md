---
layout:     post
title:      Java集合体系
subtitle:   Java集合体系分类与关系
date:       2018-04-08
author:     Will Wang
header-img: img/post-bg-article.jpg
catalog: true
tags:
    - java
    - 集合
---

### 集合
#### 单列集合-collection
##### 有序集合List
###### ArrayList:
- ArrayList是一个动态数组，也是我们最常用的集合。
- 它允许任何符合规则的元素插入甚至包括null。
- 每一个ArrayList都有一个初始容量（10），该容量代表了数组的大小。
- 随着容器中的元素不断增加，容器的大小也会随着增加。在每次向容器中增加元素的同时都会进行容量检查，当快溢出时，就会进行扩容操作。
- 所以如果我们明确所插入元素的多少，最好指定一个初始容量值，避免过多的进行扩容操作而浪费时间、效率。

###### LinkedList：
- 是一个双链表,在添加和删除元素时具比ArrayList更好的性能；
- 它除了有ArrayList的基本操作方法外还额外提供了get，remove，insert方法在LinkedList的首部或尾部。
- 由于实现的方式不同，LinkedList不能随机访问，它所有的操作都是要按照双重链表的需要执行。
- 在列表中索引的操作将从开头或结尾遍历列表（从靠近指定索引的一端）。
- 这样做的好处就是可以通过较低的代价在List中进行插入和删除操作。

###### Vector：
- 相当于是一个线程安全的ArrayList，效率比较底下，如果对安全性有要求的话可以考虑使用Vector

##### 无序集合set
###### HashSet：
- 无序不重复，线程不安全，放入的元素可以为null；
- HashSet集合判断两个元素相等的标准是两个对象通过equals方法比较相等，并且两个对象的hashCode()方法返回值相等

###### LinkedHashSet：
- 按放入顺序有序不重复

###### TreeSet：
- 按红黑树方式有序不重复；
- TreeSet 是二差树实现的,Treeset中的数据是自动排好序的，不允许放入null值。 

#### 多列集合-map
##### HashMap：
1. 线程不安全；
2. 可以接受为null的键值(key)和值(value)；
3. 不能保证随着时间的推移Map中的元素次序是不变的；
4. HashMap可以通过下面的语句进行同步：
Map m = Collections.synchronizeMap(hashMap);

##### HashTable：
1. 线程安全；
2. 不接受null值；
3. Java5提供了ConcurrentHashMap，它是HashTable的替代，比HashTable的扩展性更好；
4. 如果你不需要线程安全，那么使用HashMap，如果需要线程安全，那么使用ConcurrentHashMap。HashTable已经被淘汰了，不要在新的代码中再使用它。
5. 为什么HashTable已经淘汰了，还要优化它？因为有老的代码还在使用它，所以优化了它之后，这些老的代码也能获得性能提升。
---
layout:     post
title:      设计模式之23种设计模式
subtitle:   单例/工厂方法/抽象工厂/模板方法/建造者/代理/原型/中介者/命令/责任链/装饰/策略/适配器/迭代器/组合/观察者/门面/备忘录/访问者/状态/解释器/享元/桥梁
date:       2019-06-02``
author:     Will Wang
header-img: img/post-bg-article.jpg
catalog: true
tags:
    - 设计模式
---

- [单例模式](#单例模式)
- [工厂方法模式](#工厂方法模式)
- [抽象工厂模式](#抽象工厂模式)
- [模板方法模式](#模板方法模式)
- [建造者模式](#建造者模式)
- [代理模式](#代理模式)
- [原型模式](#原型模式)
- [中介者模式](#中介者模式)
- [命令模式](#命令模式)
- [责任链模式](#责任链模式)
- [装饰模式](#装饰模式)
- [策略模式](#策略模式)
- [适配器模式](#适配器模式)
- [迭代器模式](#迭代器模式)
- [组合模式](#组合模式)
- [观察者模式](#观察者模式)
- [门面模式](#门面模式)
- [备忘录模式](#备忘录模式)
- [访问者模式](#访问者模式)
- [状态模式](#状态模式)
- [解释器模式](#解释器模式)
- [享元模式](#享元模式)
- [桥梁模式](#桥梁模式)

#### 单例模式
单例模式（Singleton Pattern） 是一个比较简单的模式
##### 定义
- Ensure a class has only one instance, and provide a global point of access to it.
- （确保某一个类只有一个实例，而且自行实例化并向整个系统提供这个实例。）

##### 通用源码
- 饿汉式单例
    ```java
        public class Singleton {
            private static final Singleton singleton = new Singleton();
            // 限制产生多个对象
            private Singleton(){
            }
            // 通过该方法获得实例对象
            public static Singleton getSingleton(){
                return singleton;
            }
            // 类中其他方法，尽量是static
            public static void doSomething(){
                
            }
        }
    ```

##### 单例模式的优点
1. 由于单例模式在内存中只有一个实例， 减少了内存开支， 特别是一个对象需要频繁地创建、 销毁时， 而且创建或销毁时性能又无法优化， 单例模式的优势就非常明显。
1. 由于单例模式只生成一个实例， 所以减少了系统的性能开销， 当一个对象的产生需要比较多的资源时， 如读取配置、 产生其他依赖对象时， 则可以通过在应用启动时直接产生一个单例对象， 然后用永久驻留内存的方式来解决（在Java EE中采用单例模式时需要注意JVM垃圾回收机制） 。
1. 单例模式可以避免对资源的多重占用， 例如一个写文件动作， 由于只有一个实例存在内存中， 避免对同一个资源文件的同时写操作。
1. 单例模式可以在系统设置全局的访问点， 优化和共享资源访问， 例如可以设计一个单例类， 负责所有数据表的映射处理。

##### 单例模式的缺点
1. 单例模式一般没有接口， 扩展很困难， 若要扩展， 除了修改代码基本上没有第二种途径可以实现。 单例模式为什么不能增加接口呢？ 因为接口对单例模式是没有任何意义的， 它要求“自行实例化”， 并且提供单一实例、 接口或抽象类是不可能被实例化的。 当然， 在特殊情况下， 单例模式可以实现接口、 被继承等， 需要在系统开发中根据环境判断。
1. 单例模式对测试是不利的。 在并行开发环境中， 如果单例模式没有完成， 是不能进行测试的， 没有接口也不能使用mock的方式虚拟一个对象。
1. 单例模式与单一职责原则有冲突。 一个类应该只实现一个逻辑， 而不关心它是否是单例的， 是不是要单例取决于环境， 单例模式把“要单例”和业务逻辑融合在一个类中。

##### 单例模式的使用场景
1. 要求生成唯一序列号的环境；
1. 在整个项目中需要一个共享访问点或共享数据，例如一个Web页面上的计数器，可以不用把每次刷新都记录到数据库中，使用单例模式保持计数器的值，并确保是线程安全的；
1. 创建一个对象需要消耗的资源过多，如要访问IO和数据库等资源；
1. 需要定义大量的静态常量和静态方法（如工具类）的环境，可以采用单例模式（当然，也可以直接声明为static的方式）。

##### 单例模式的扩展
- 这种需要产生固定数量对象的模式就叫做有上限的多例模式，它是单例模式的一种扩展，采用有上限的多例模式，我们可以在设计时决定在内存中有多少个实例，方便系统进行扩展，修正单例可能存在的性能问题，提供系统的响应速度。
    ```java
        public class Emperor {
            //定义最多能产生的实例数量
            private static int maxNumOfEmperor = 2;
            //每个皇帝都有名字， 使用一个ArrayList来容纳， 每个对象的私有属性
            private static ArrayList<String> nameList=new ArrayList<String>();
            //定义一个列表， 容纳所有的皇帝实例
            private static ArrayList<Emperor> emperorList=new ArrayList<Emperor>();
            //当前皇帝序列号
            private static int countNumOfEmperor =0;
            //产生所有的对象
            static{
                for(int i=0;i<maxNumOfEmperor;i++){
                    emperorList.add(new Emperor("皇"+(i+1)+"帝"));
                }
            }
            private Emperor(){
            //世俗和道德约束你， 目的就是不产生第二个皇帝
            }
            //传入皇帝名称， 建立一个皇帝对象
            private Emperor(String name){
                nameList.add(name);
            }
            //随机获得一个皇帝对象
            public static Emperor getInstance(){
                Random random = new Random();
                //随机拉出一个皇帝， 只要是个精神领袖就成
                countNumOfEmperor = random.nextInt(maxNumOfEmperor);
                return emperorList.get(countNumOfEmperor);
            }
            //皇帝发话了
            public static void say(){
                System.out.println(nameList.get(countNumOfEmperor));
            }
        }
    ```


#### 工厂方法模式
##### 定义
- Define an interface for creating an object,but let subclasses decide which class to instantiate.Factory Method lets a class defer instantiation to subclasses.
- （定义一个用于创建对象的接口，让子类决定实例化哪一个类。工厂方法使一个类的实例化延迟到其子类。）

##### 通用源码
- 抽象产品类
    ```java
    public abstract class Product {
        //产品类的公共方法
        public void method1(){
          //业务逻辑处理
        }
        //抽象方法
        public abstract void method2();
    }
    ```
- 具体产品类
    ```java
    public class ConcreteProduct1 extends Product {
        public void method2() {
        //业务逻辑处理
        }
    }

    public class ConcreteProduct2 extends Product {
        public void method2() {
        //业务逻辑处理
        }
    }
    ```
- 抽象工厂类
    ```java
    public abstract class Creator {
        /*
         * 创建一个产品对象， 其输入参数类型可以自行设置
         * 通常为String、 Enum、 Class等， 当然也可以为空
         */
        public abstract <T extends Product> T createProduct(Class<T> c);
    }
    ```
- 具体工厂类
    ```java
    public class ConcreteCreator extends Creator {
        public <T extends Product> T createProduct(Class<T> c){
            Product product=null;
            try {
              product = (Product)Class.forName(c.getName()).newInstance();
            } catch (Exception e) {
              //异常处理
            }
            return (T)product;
        }
    }
    ```
- 场景类
    ```java
        public class Client {
            public static void main(String[] args) {
                Creator creator = new ConcreteCreator();
                Product product = creator.createProduct(ConcreteProduct1.class);
                /*
                * 继续业务处理
                */
            }
        }
    ```

##### 工厂方法模式的优点
- 良好的封装性，代码结构清晰。
- 工厂方法模式的扩展性非常优秀。
- 屏蔽产品类。
- 工厂方法模式是典型的解耦框架。

##### 工厂方法模式的使用场景
- 工厂方法模式是new一个对象的替代品，所以在所有需要生成对象的地方都可以使用，但是需要慎重地考虑是否要增加一个工厂类进行管理，增加代码的复杂度。
- 需要灵活的、可扩展的框架时，可以考虑采用工厂方法模式。
- 工厂方法模式可以用在异构项目中
- 可以使用在测试驱动开发的框架下。

##### 工厂方法模式的扩展
- 简单工厂模式（Simple Factory Pattern），也叫做静态工厂模式。在实际项目中，采用该方法的案例还是比较多的，其缺点是工厂类的扩展比较困难，不符合开闭原则，但它仍然是一个非常实用的设计模式。
- 在复杂的应用中一般采用多工厂的方法，然后再增加一个协调类，避免调用者与各个子工厂交流，协调类的作用是封装子工厂类，对高层模块提供统一的访问接口。
- 通过工厂方法模式创建了一个单例对象，该框架可以继续扩展，在一个项目中可以产生一个单例构造器，所有需要产生单例的类都遵循一定的规则（构造方法是private），然后通过扩展该框架，只要输入一个类型就可以获得唯一的一个实例。
- 一个对象被消费完毕后，并不立刻释放，工厂类保持其初始状态，等待再次被使用。


#### 抽象工厂模式
抽象工厂模式（Abstract Factory Pattern） 是一种比较常用的模式
##### 定义
- Provide an interface for creating families of related or dependent objects without specifying their concrete classes.
- 为创建一组相关或相互依赖的对象提供一个接口，而且无须指定它们的具体类。

##### 通用源码
- 抽象产品类
    ```java
    public abstract class AbstractProductA {
        //每个产品共有的方法
        public void shareMethod(){
        }
        //每个产品相同方法， 不同实现
        public abstract void doSomething();
    }
    ```
- 产品A1的实现类
    ```java
    public class ProductA1 extends AbstractProductA {
        public void doSomething() {
          System.out.println("产品A1的实现方法");
        }
    }
    ```
- 产品A2的实现类
    ```java
    public class ProductA2 extends AbstractProductA {
        public void doSomething() {
            System.out.println("产品A2的实现方法");
        }
    }
    ```
- 产品B与此类似， 不再赘述。
- 抽象工厂类(有N个产品族，在抽象工厂类中就应该有N个创建方法。)
    ```java
    public abstract class AbstractCreator {
        //创建A产品家族
        public abstract AbstractProductA createProductA();
        //创建B产品家族
        public abstract AbstractProductB createProductB();
    }
    ```
- 产品等级1的实现类
    ```java
    public class Creator1 extends AbstractCreator {
        //只生产产品等级为1的A产品
        public AbstractProductA createProductA() {
            return new ProductA1();
        }
        //只生产产品等级为1的B产品
        public AbstractProductB createProductB() {
            return new ProductB1();
        }
    }
    ```
- 产品等级2的实现类
    ```java
    public class Creator2 extends AbstractCreator {
        //只生产产品等级为2的A产品
        public AbstractProductA createProductA() {
            return new ProductA2();
        }
        //只生产产品等级为2的B产品
        public AbstractProductB createProductB() {
            return new ProductB2();
        }
    }
    ```
- 场景类
    ```java
    public class Client {
        public static void main(String[] args) {
            //定义出两个工厂
            AbstractCreator creator1 = new Creator1();
            AbstractCreator creator2 = new Creator2();
            //产生A1对象
            AbstractProductA a1 = creator1.createProductA();
            //产生A2对象
            AbstractProductA a2 = creator2.createProductA();
            //产生B1对象
            AbstractProductB b1 = creator1.createProductB();
            //产生B2对象
            AbstractProductB b2 = creator2.createProductB();
            /*
            * 然后在这里就可以为所欲为了...
            */
        }
    }
    ```
    
##### 抽象工厂模式的优点
- 封装性，每个产品的实现类不是高层模块要关心的，它要关心的是什么？是接口，是抽象，它不关心对象是如何创建出来，这由谁负责呢？工厂类，只要知道工厂类是谁，我就能创建出一个需要的对象，省时省力，优秀设计就应该如此。
- 产品族内的约束为非公开状态。

##### 抽象工厂模式的缺点
- 抽象工厂模式的最大缺点就是产品族扩展非常困难
- 横向扩展容易， 纵向扩展困难。 

##### 抽象工厂模式的使用场景
- 抽象工厂模式的使用场景定义非常简单：一个对象族（或是一组没有任何关系的对象）都有相同的约束，则可以使用抽象工厂模式。


#### 模板方法模式
模板方法模式（Template Method Pattern）是如此简单，以致让你感觉你已经能够掌握其精髓了。
##### 定义
- Define the skeleton of an algorithm in an operation,deferring some steps to subclasses.TemplateMethod lets subclasses redefine certain steps of an algorithm without changing the algorithm's structure.
- 定义一个操作中的算法的框架，而将一些步骤延迟到子类中。使得子类可以不改变一个算法的结构即可重定义该算法的某些特定步骤。


#### 建造者模式


#### 代理模式


#### 原型模式


#### 中介者模式


#### 命令模式


#### 责任链模式


#### 装饰模式


#### 策略模式


#### 适配器模式


#### 迭代器模式


#### 组合模式


#### 观察者模式


#### 门面模式


#### 备忘录模式


#### 访问者模式


#### 状态模式


#### 解释器模式


#### 享元模式


#### 桥梁模式

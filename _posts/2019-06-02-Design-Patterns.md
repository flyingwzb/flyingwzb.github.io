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

### 单例模式
单例模式（Singleton Pattern） 是一个比较简单的模式
##### 定义
- Ensure a class has only one instance, and provide a global point of access to it.
- 确保某一个类只有一个实例，而且自行实例化并向整个系统提供这个实例。

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


### 工厂方法模式
##### 定义
- Define an interface for creating an object,but let subclasses decide which class to instantiate.Factory Method lets a class defer instantiation to subclasses.
- 定义一个用于创建对象的接口，让子类决定实例化哪一个类。工厂方法使一个类的实例化延迟到其子类。

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


### 抽象工厂模式
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


### 模板方法模式
模板方法模式（Template Method Pattern）是如此简单，以致让你感觉你已经能够掌握其精髓了。
##### 定义
- Define the skeleton of an algorithm in an operation,deferring some steps to subclasses. Template Method lets subclasses redefine certain steps of an algorithm without changing the algorithm's structure.
- 定义一个操作中的算法的框架，而将一些步骤延迟到子类中。使得子类可以不改变一个算法的结构即可重定义该算法的某些特定步骤。

##### 通用代码
- 抽象模板类
    ```java
    public abstract class AbstractClass {
        //基本方法
        protected abstract void doSomething();
        //基本方法
        protected abstract void doAnything();
        //模板方法
        public void templateMethod(){
            /*
            * 调用基本方法， 完成相关的逻辑
            */
            this.doAnything();
            this.doSomething();
        }
    }
    ```
- 具体模板类
    ```java
    public class ConcreteClass1 extends AbstractClass {
        //实现基本方法
        protected void doAnything() {
        //业务逻辑处理
        }
        protected void doSomething() {
        //业务逻辑处理
        }
    }
    
    public class ConcreteClass2 extends AbstractClass {
        //实现基本方法
        protected void doAnything() {
        //业务逻辑处理
        }
        protected void doSomething() {
        //业务逻辑处理
        }
    }
    ```
- 场景类
    ```java
    public class Client {
        public static void main(String[] args) {
            AbstractClass class1 = new ConcreteClass1();
            AbstractClass class2 = new ConcreteClass2();
            //调用模板方法
            class1.templateMethod();
            class2.templateMethod();
        }
    }
    ```
- 抽象模板中的基本方法尽量设计为protected类型，符合迪米特法则，不需要暴露的属性或方法尽量不要设置为protected类型。实现类若非必要，尽量不要扩大父类中的访问权限。

##### 模板方法模式的优点
1. 封装不变部分，扩展可变部分
1. 提取公共部分代码，便于维护
1. 行为由父类控制，子类实现

##### 模板方法模式的缺点
- 按照我们的设计习惯，抽象类负责声明最抽象、最一般的事物属性和方法，实现类完成具体的事物属性和方法。但是模板方法模式却颠倒了，抽象类定义了部分抽象方法，由子类实现，子类执行的结果影响了父类的结果，也就是子类对父类产生了影响，这在复杂的项目中，会带来代码阅读的难度，而且也会让新手产生不适感。

##### 模板方法模式的使用场景
1. 多个子类有公有的方法，并且逻辑基本相同时。
1. 重要、复杂的算法，可以把核心算法设计为模板方法，周边的相关细节功能则由各个子类实现。
1. 重构时，模板方法模式是一个经常使用的模式，把相同的代码抽取到父类中，然后通过钩子函数（见“模板方法模式的扩展”）约束其行为。


### 建造者模式
建造者模式（Builder Pattern）也叫做生成器模式
##### 定义
- Separate the construction of a complex object from its representation so that the same construction process can create different representations.
- 将一个复杂对象的构建与它的表示分离，使得同样的构建过程可以创建不同的表示。

##### 注意
- 如果你要调用类中的成员变量或方法，需要在前面加上this关键字，不加也能正常地跑起来，但是不清晰，加上this关键字，我就是要调用本类中的成员变量或方法，而不是本方法中的一个变量。
- 还有super方法也是一样，是调用父类的成员变量或者方法，那就加上这个关键字，不要省略，这要靠约束，还有就是程序员的自觉性。
- 作为一个系统分析师或是技术经理一定要告诉项目成员，ArrayList和HashMap如果定义成类的成员变量，那你在方法中的调用一定要做一个clear的动作，以防止数据混乱。

##### 建造者模式的通用类图
- Product产品类
    - 通常是实现了模板方法模式，也就是有模板方法和基本方法
- Builder抽象建造者
    - 规范产品的组建，一般是由子类实现。
- ConcreteBuilder具体建造者
    - 实现抽象类定义的所有方法，并且返回一个组建好的对象。
- Director导演类
    - 负责安排已有模块的顺序， 然后告诉Builder开始建造

##### 通用源代码
- 产品类
    ```java
    public class Product {
        public void doSomething(){
        //独立业务处理
        }
    }
    ```
- 抽象建造者
    ```java
    public abstract class Builder {
        //设置产品的不同部分， 以获得不同的产品
        public abstract void setPart();
        //建造产品
        public abstract Product buildProduct();
    }
    ```
- 具体建造者
    ```java
    public class ConcreteProduct extends Builder {
        private Product product = new Product();
        //设置产品零件
        public void setPart(){
            /*
            * 产品类内的逻辑处理
            */
        }
        //组建一个产品
        public Product buildProduct() {
            return product;
        }
    }
    ```
- 导演类
    ```java
    public class Director {
        private Builder builder = new ConcreteProduct();
        //构建不同的产品
        public Product getAProduct(){
            builder.setPart();
            /*
            * 设置不同的零件， 产生不同的产品
            */
            return builder.buildProduct();
        }
    }
    ```

##### 建造者模式的优点
- 封装性
- 建造者独立，容易扩展
- 便于控制细节风险

##### 建造者模式的使用场景
1. 相同的方法，不同的执行顺序，产生不同的事件结果时，可以采用建造者模式。
1. 多个部件或零件，都可以装配到一个对象中，但是产生的运行结果又不相同时，则可以使用该模式。
1. 产品类非常复杂，或者产品类中的调用顺序不同产生了不同的效能，这个时候使用建造者模式非常合适。
1. 在对象创建过程中会使用到系统中的一些其他对象，这些对象在产品对象的创建过程中不易得到时，也可以采用建造者模式封装该对象的创建过程。该种场景只能是一个补偿方法，因为一个对象不容易获得，而在设计阶段竟然没有发觉，而要通过创建者模式柔化创建过程，本身已经违反设计的最初目标。

##### 建造者模式和工厂模式的区别
- 建造者模式最主要的功能是基本方法的调用顺序安排，也就是这些基本方法已经实现了，通俗地说就是零件的装配，顺序不同产生的对象也不同；
- 而工厂方法则重点是创建，创建零件是它的主要职责，组装顺序则不是它关心的。


### 代理模式
代理模式（Proxy Pattern） 是一个使用率非常高的模式
##### 定义
- Provide a surrogate or placeholder for another object to control access to it.
- 为其他对象提供一种代理以控制对这个对象的访问。
- 代理模式也叫做委托模式，它是一项基本设计技巧。

##### 代理模式的优点
- 职责清晰
- 高扩展性
- 智能化

##### 代理模式的扩展
- 普通代理
    - 普通代理，它的要求就是客户端只能访问代理角色，而不能访问真实角色，这是比较简单的。
    - 普通代理模式的约束问题，尽量通过团队内的编程规范类约束，因为每一个主题类是可被重用的和可维护的，使用技术约束的方式对系统维护是一种非常不利的因素。
- 强制代理
    - 强制代理的概念就是要从真实角色查找到代理角色，不允许直接访问真实角色。
    - 高层模块只要调用getProxy就可以访问真实角色的所有方法，它根本就不需要产生一个代理出来，代理的管理已经由真实角色自己完成。
- 代理是有个性的
    - 一个类可以实现多个接口，完成不同任务的整合。
    - 也就是说代理类不仅仅可以实现主题接口，也可以实现其他接口完成不同的任务，而且代理的目的是在目标对象方法的基础上作增强，这种增强的本质通常就是对目标对象的方法进行拦截和过滤。
    - 代理类可以为真实角色预处理消息、过滤消息、消息转发、事后处理消息等功能。
    - 当然一个代理类，可以代理多个真实角色，并且真实角色之间可以有耦合关系
- 动态代理
    - 动态代理的主要意图就是解决我们常说的“审计”问题，也就是横切面编程，在不改变我们已有代码结构的情况下增强或控制对象的行为。
    - 要实现动态代理的首要条件是：被代理类必须实现一个接口


### 原型模式
原型模式（Prototype Pattern）的简单程度仅次于单例模式和迭代器模式。
##### 定义
- Specify the kinds of objects to create using a prototypical instance,and create new objects by copying this prototype.
- 用原型实例指定创建对象的种类，并且通过拷贝这些原型创建新的对象。

##### 原型模式的优点
- 性能优良
- 逃避构造函数的约束

##### 原型模式的使用场景
- 资源优化场景
    - 类初始化需要消化非常多的资源，这个资源包括数据、硬件资源等。
- 性能和安全要求的场景
    - 通过new产生一个对象需要非常繁琐的数据准备或访问权限，则可以使用原型模式。
- 一个对象多个修改者的场景
    - 一个对象需要提供给其他对象访问，而且各个调用者可能都需要修改其值时，可以考虑使用原型模式拷贝多个对象供调用者使用。

##### 原型模式的注意事项
- 构造函数不会被执行
- 浅拷贝和深拷贝
    - Object类提供的方法clone只是拷贝本对象，其对象内部的数组、引用对象等都不拷贝，还是指向原生对象的内部元素地址，这种拷贝就叫做浅拷贝。
    - 使用原型模式时，引用的成员变量必须满足两个条件才不会被拷贝：一是类的成员变量，而不是方法内变量；二是必须是一个可变的引用对象，而不是一个原始类型或不可变对象。
    - 深拷贝和浅拷贝建议不要混合使用，特别是在涉及类的继承时，父类有多个引用的情况就非常复杂，建议的方案是深拷贝和浅拷贝分开实现。
- 对象的clone与对象内的final关键字是有冲突的
    - 要使用clone方法，类的成员变量上不要增加final关键字。
    

### 中介者模式
##### 定义
- Define an object that encapsulates how a set of objects interact. Mediator promotes loose coupling by keeping objects from referring to each other explicitly,and it lets you vary their interaction independently.
- 用一个中介对象封装一系列的对象交互，中介者使各对象不需要显示地相互作用，从而使其耦合松散，而且可以独立地改变它们之间的交互。

##### 中介者模式通用类图
- Mediator 抽象中介者角色
    - 抽象中介者角色定义统一的接口，用于各同事角色之间的通信。
- Concrete Mediator 具体中介者角色
    - 具体中介者角色通过协调各同事角色实现协作行为，因此它必须依赖于各个同事角色。
- Colleague 同事角色
    - 每一个同事角色都知道中介者角色，而且与其他的同事角色通信的时候，一定要通过中介者角色协作。
    - 每个同事类的行为分为两种：一种是同事本身的行为，比如改变对象本身的状态，处理自己的行为等，这种行为叫做自发行为（Self-Method），与其他的同事类或中介者没有任何的依赖；
    - 第二种是必须依赖中介者才能完成的行为，叫做依赖方法（DepMethod）。

##### 通用源码
- 抽象中介者
    ```java
    public abstract class Mediator {
        //定义同事类
        protected ConcreteColleague1 c1;
        protected ConcreteColleague2 c2;
        //通过getter/setter方法把同事类注入进来
        public ConcreteColleague1 getC1() {
            return c1;
        }
        public void setC1(ConcreteColleague1 c1) {
            this.c1 = c1;
        }
        public ConcreteColleague2 getC2() {
            return c2;
        }
        public void setC2(ConcreteColleague2 c2) {
            this.c2 = c2;
        }
        //中介者模式的业务逻辑
        public abstract void doSomething1();
        public abstract void doSomething2();
    }
    ```
- 通用中介者
    ```java
    public class ConcreteMediator extends Mediator {
        @Override
        public void doSomething1() {
            //调用同事类的方法， 只要是public方法都可以调用
            super.c1.selfMethod1();
            super.c2.selfMethod2();
        }
        public void doSomething2() {
            super.c1.selfMethod1();
            super.c2.selfMethod2();
        }
    }
    ```
- 抽象同事类
    ```java
    public abstract class Colleague {
        protected Mediator mediator;
        public Colleague(Mediator _mediator){
            this.mediator = _mediator;
        }
    }
    ```
- 具体同事类
    ```java
    public class ConcreteColleague1 extends Colleague {
        //通过构造函数传递中介者
        public ConcreteColleague1(Mediator _mediator){
            super(_mediator);
        }
        //自有方法 self-method
        public void selfMethod1(){
            //处理自己的业务逻辑
        }
        //依赖方法 dep-method
        public void depMethod1(){
            //处理自己的业务逻辑
            //自己不能处理的业务逻辑， 委托给中介者处理
            super.mediator.doSomething1();
        }
        }
        public class ConcreteColleague2 extends Colleague {
            //通过构造函数传递中介者
            public ConcreteColleague2(Mediator _mediator){
            super(_mediator);
        }
        //自有方法 self-method
        public void selfMethod2(){
            //处理自己的业务逻辑
        }
        //依赖方法 dep-method
        public void depMethod2(){
            //处理自己的业务逻辑
            //自己不能处理的业务逻辑， 委托给中介者处理
            super.mediator.doSomething2();
        }
    }
    ```

##### 中介者模式的优点
- 中介者模式的优点就是减少类间的依赖，把原有的一对多的依赖变成了一对一的依赖，同事类只依赖中介者，减少了依赖，当然同时也降低了类间的耦合。

##### 中介者模式的缺点
- 中介者模式的缺点就是中介者会膨胀得很大，而且逻辑复杂，原本N个对象直接的相互依赖关系转换为中介者和同事类的依赖关系，同事类越多，中介者的逻辑就越复杂。

##### 中介者模式的使用场景
- 中介者模式适用于多个对象之间紧密耦合的情况，紧密耦合的标准是：在类图中出现了蜘蛛网状结构。
- 在这种情况下一定要考虑使用中介者模式，这有利于把蜘蛛网梳理为星型结构，使原本复杂混乱的关系变得清晰简单。

##### 中介者模式的实际应用
- 机场调度中心
- MVC框架
- 媒体网关
- 中介服务

##### 最佳实践
- 如果两个对象不能提炼出共性，那就不要刻意去追求两者的抽象，抽象只要定义出模式需要的角色即可。
- 一个中介者抽象类一般只有一个实现者，对于中介者来说，抽象已经没有太多的必要。
- N个对象之间产生了相互的依赖关系（N＞2）。
- 多个对象有依赖关系，但是依赖的行为尚不确定或者有发生改变的可能，在这种情况下一般建议采用中介者模式，降低变更引起的风险扩散。
- 产品开发。一个明显的例子就是MVC框架，把中介者模式应用到产品中，可以提升产品的性能和扩展性，但是对于项目开发就未必，因为项目是以交付投产为目标，而产品则是以稳定、高效、扩展为宗旨。


### 命令模式
命令模式是一个高内聚的模式
##### 定义
- Encapsulate a request as an object,thereby letting you parameterize clients with different requests,queue or log requests,and support undoable operations.
- 将一个请求封装成一个对象，从而让你使用不同的请求把客户端参数化，对请求排队或者记录请求日志，可以提供命令的撤销和恢复功能。

##### 命令模式的通用类图
- Receive接收者角色
    - 该角色就是干活的角色，命令传递到这里是应该被执行的
- Command命令角色
    - 需要执行的所有命令都在这里声明。
- Invoker调用者角色
    - 接收到命令，并执行命令。

##### 通用代码
- 通用Receiver类
    ```java
    public abstract class Receiver {
        //抽象接收者， 定义每个接收者都必须完成的业务
        public abstract void doSomething();
    }
    ```
- 具体的Receiver类
    ```java
    public class ConcreteReciver1 extends Receiver{
        //每个接收者都必须处理一定的业务逻辑
        public void doSomething(){
        }
    }
    public class ConcreteReciver2 extends Receiver{
        //每个接收者都必须处理一定的业务逻辑
        public void doSomething(){
        }
    }
    ```
- 抽象的Command类
    ```java
    public abstract class Command {
      //定义一个子类的全局共享变量
      protected final Receiver receiver;
    
      //实现类必须定义一个接收者
      public Command(Receiver _receiver){
          this.receiver = _receiver;
      }
    
      //每个命令类都必须有一个执行命令的方法
      public abstract void execute();
    }
    ```
- 具体的Command类
    ```java
    public class ConcreteCommand1 extends Command {
        //声明自己的默认接收者
        public ConcreteCommand1(){
          super(new ConcreteReciver1());
        }
      
        //设置新的接收者
        public ConcreteCommand1(Receiver _receiver){
          super(_receiver);
        }
      
        //每个具体的命令都必须实现一个命令
        public void execute() {
            //业务处理
            super.receiver.doSomething();
        }
    }
    
    public class ConcreteCommand2 extends Command {
        //声明自己的默认接收者
        public ConcreteCommand2(){
          super(new ConcreteReciver2());
        }
      
        //设置新的接收者
        public ConcreteCommand2(Receiver _receiver){
          super(_receiver);
        }
      
        //每个具体的命令都必须实现一个命令
        public void execute() {
            //业务处理
            super.receiver.doSomething();
        }
    }
    ```
- 调用者Invoker类
    ```java
    public class Invoker {
        private Command command;
        //受气包， 接受命令
        public void setCommand(Command _command){
          this.command = _command;
        }
        //执行命令
        public void action(){
          this.command.execute();
        }
    }
    ```
- 场景类
    ```java
    public class Client {
        public static void main(String[] args) {
            //首先声明调用者Invoker
            Invoker invoker = new Invoker();
          
            //定义一个发送给接收者的命令
            Command command = new ConcreteCommand1();
          
            //把命令交给调用者去执行
            invoker.setCommand(command);
            invoker.action();
        }
    }
    ```

##### 命令模式的优点
- 类间解耦
    - 调用者角色与接收者角色之间没有任何依赖关系，调用者实现功能时只需调用Command抽象类的execute方法就可以，不需要了解到底是哪个接收者执行。
- 可扩展性
    - Command的子类可以非常容易地扩展，而调用者Invoker和高层次的模块Client不产生严重的代码耦合。
- 命令模式结合其他模式会更优秀
    - 命令模式可以结合责任链模式，实现命令族解析任务；结合模板方法模式，则可以减少Command子类的膨胀问题。
    
##### 命令模式的缺点
- 命令模式也是有缺点的，请看Command的子类：如果有N个命令，问题就出来了，Command的子类就可不是几个，而是N个，这个类膨胀得非常大，这个就需要读者在项目中慎重考虑使用。

##### 命令模式的使用场景
- 只要你认为是命令的地方就可以采用命令模式


### 责任链模式
##### 定义
- Avoid coupling the sender of a request to its receiver by giving more than one object a chance to handle the request.Chain the receiving objects and pass the request along the chain until an object handles it.
- 使多个对象都有机会处理请求，从而避免了请求的发送者和接受者之间的耦合关系。将这些对象连成一条链，并沿着这条链传递该请求，直到有对象处理它为止。

#####   通用类图  
- 抽象处理者
    - 一是定义一个请求的处理方法handleMessage，唯一对外开放的方法；
    - 二是定义一个链的编排方法setNext，设置下一个处理者；
    - 三是定义了具体的请求者必须实现的两个方法：定义自己能够处理的级别getHandlerLevel和具体的处理任务echo。
    ```java
    public abstract class Handler {
    private Handler nextHandler;
        //每个处理者都必须对请求做出处理
        public final Response handleMessage(Request request){
            Response response = null;
            //判断是否是自己的处理级别
            if(this.getHandlerLevel().equals(request.getRequestLevel())){
              response = this.echo(request);
            }else{ //不属于自己的处理级别
                //判断是否有下一个处理者
                if(this.nextHandler != null){
                  response = this.nextHandler.handleMessage(request);
                }else{
                  //没有适当的处理者， 业务自行处理
                }
            }
            return response;
        }
      
        //设置下一个处理者是谁
        public void setNext(Handler _handler){
          this.nextHandler = _handler;
        }
        //每个处理者都有一个处理级别
        protected abstract Level getHandlerLevel();
        //每个处理者都必须实现处理任务
        protected abstract Response echo(Request request);
    }
    ```
- 具体处理者
    - Level类负责定义请求和处理级别，Request类负责封装请求，Response负责封装链中返回的结果
    ```java
        public class ConcreteHandler1 extends Handler {
            //定义自己的处理逻辑
            protected Response echo(Request request) {
                //完成处理逻辑
                return null;
            }
            //设置自己的处理级别
            protected Level getHandlerLevel() {
                //设置自己的处理级别
                return null;
            }
        }
      
        public class ConcreteHandler2 extends Handler {
            //定义自己的处理逻辑
            protected Response echo(Request request) {
                //完成处理逻辑
                return null;
            }
            //设置自己的处理级别
            protected Level getHandlerLevel() {
                //设置自己的处理级别
                return null;
            }
        }
      
        public class ConcreteHandler3 extends Handler {
            //定义自己的处理逻辑
            protected Response echo(Request request) {
                //完成处理逻辑
                return null;
            }
            //设置自己的处理级别
            protected Level getHandlerLevel() {
                //设置自己的处理级别
                return null;
            }
        }
    ```
- 框架代码
    ```java
    public class Level {
      //定义一个请求和处理等级
    }
  
    public class Request {
        //请求的等级
        public Level getRequestLevel(){
          return null;
        }
    }
  
    public class Response {
      //处理者返回的数据
    }
    ```
- 场景类
    ```java
    public class Client {
        public static void main(String[] args) {
            //声明所有的处理节点
            Handler handler1 = new ConcreteHandler1();
            Handler handler2 = new ConcreteHandler2();
            Handler handler3 = new ConcreteHandler3();
            //设置链中的阶段顺序1-->2-->3
            handler1.setNext(handler2);
            handler2.setNext(handler3);
            //提交请求， 返回结果
            Response response = handler1.handlerMessage(new Request());
        }
    }
    ```

##### 责任链模式的优点
- 责任链模式非常显著的优点是将请求和处理分开。请求者可以不用知道是谁处理的，处理者可以不用知道请求的全貌，两者解耦，提高系统的灵活性。

##### 责任链模式的缺点
- 一是性能问题，每个请求都是从链头遍历到链尾，特别是在链比较长的时候，性能是一个非常大的问题。
- 二是调试不很方便，特别是链条比较长，环节比较多的时候，由于采用了类似递归的方式，调试的时候逻辑可能比较复杂。

##### 责任链模式的注意事项
- 链中节点数量需要控制，避免出现超长链的情况，一般的做法是在Handler中设置一个最大节点数量，在setNext方法中判断是否已经是超过其阈值，超过则不允许该链建立，避免无意识地破坏系统性能。


### 装饰模式
装饰模式（Decorator Pattern） 是一种比较常见的模式
##### 定义
- Attach additional responsibilities to an object dynamically keeping the same interface.Decorators provide a flexible alternative to subclassing for extending functionality.
- 动态地给一个对象添加一些额外的职责。就增加功能来说，装饰模式相比生成子类更为灵活。

##### 通用类图
- Component抽象构件
    - Component是一个接口或者是抽象类，就是定义我们最核心的对象，也就是最原始的对象
    - 在装饰模式中，必然有一个最基本、最核心、最原始的接口或抽象类充当Component抽象构件。
    - ```java
      public abstract class Component {
          //抽象的方法
          public abstract void operate();
      }
      ```
- ConcreteComponent具体构件
    - ConcreteComponent是最核心、最原始、最基本的接口或抽象类的实现，你要装饰的就是它。
    - ```java
      public class ConcreteComponent extends Component {
          //具体实现
          @Override
          public void operate() {
              System.out.println("do Something");
          }
      }
      ```
- Decorator装饰角色
    - 一般是一个抽象类，做什么用呢？实现接口或者抽象方法，它里面可不一定有抽象的方法呀，在它的属性里必然有一个private变量指向Component抽象构件。
    - ```java
      public abstract class Decorator extends Component {
          private Component component = null;
          //通过构造函数传递被修饰者
          public Decorator(Component _component){
              this.component = _component;
          }
          //委托给被修饰者执行
          @Override
          public void operate() {
              this.component.operate();
          }
      }
      ```
- 具体装饰角色
    - ConcreteDecoratorA和ConcreteDecoratorB是两个具体的装饰类，你要把你最核心的、最原始的、最基本的东西装饰成其他东西。
    - ```java
      public class ConcreteDecorator1 extends Decorator {
          //定义被修饰者
          public ConcreteDecorator1(Component _component){
              super(_component);
          }
          //定义自己的修饰方法
          private void method1(){
              System.out.println("method1 修饰");
          }
          //重写父类的Operation方法
          public void operate(){
              this.method1();
              super.operate();
          }
      }
      
      
      public class ConcreteDecorator2 extends Decorator {
          //定义被修饰者
          public ConcreteDecorator2(Component _component){
              super(_component);
          }
          //定义自己的修饰方法
          private void method2(){
              System.out.println("method2修饰");
          }
          //重写父类的Operation方法
          public void operate(){
              super.operate();
              this.method2();
          }
      }
      ```
  
##### 装饰模式的优点
- 装饰类和被装饰类可以独立发展，而不会相互耦合。换句话说，Component类无须知道Decorator类，Decorator类是从外部来扩展Component类的功能，而Decorator也不用知道具体的构件。
- 装饰模式是继承关系的一个替代方案。我们看装饰类Decorator，不管装饰多少层，返回的对象还是Component，实现的还是is-a的关系。
- 装饰模式可以动态地扩展一个实现类的功能，这不需要多说，装饰模式的定义就此。

##### 装饰模式的缺点
- 多层的装饰是比较复杂的。
- 尽量减少装饰类的数量，以便降低系统的复杂度。

##### 装饰模式的使用场景
- 需要扩展一个类的功能，或给一个类增加附加功能。
- 需要动态地给一个对象增加功能，这些功能可以再动态地撤销。
- 需要为一批的兄弟类进行改装或加装功能，当然是首选装饰模式。


### 策略模式
策略模式（Strategy Pattern）是一种比较简单的模式，也叫做政策模式（Policy Pattern）
##### 定义
- Define a family of algorithms,encapsulate each one,and make them interchangeable.
- 定义一组算法，将每个算法都封装起来，并且使它们之间可以互换。

##### 通用类图
- Context封装角色
    - 它也叫做上下文角色，起承上启下封装作用，屏蔽高层模块对策略、算法的直接访问，封装可能存在的变化。
- Strategy抽象策略角色
    - 策略、算法家族的抽象，通常为接口，定义每个策略或算法必须具有的方法和属性。
- ConcreteStrategy具体策略角色
    - 实现抽象策略中的操作，该类含有具体的算法。
    
##### 通用源码
- 抽象的策略角色
    ```java
    public interface Strategy {
        //策略模式的运算法则
        public void doSomething();
    }
    ```
- 具体策略角色
    ```java
    public class ConcreteStrategy1 implements Strategy {
        public void doSomething() {
          System.out.println("具体策略1的运算法则");
        }
    }
    
    public class ConcreteStrategy2 implements Strategy {
        public void doSomething() {
          System.out.println("具体策略2的运算法则");
        }
    }
    ```
- 封装角色
    ```java
    public class Context {
        //抽象策略
        private Strategy strategy = null;
        //构造函数设置具体策略
        public Context(Strategy _strategy){
          this.strategy = _strategy;
        }
        //封装后的策略方法
        public void doAnythinig(){
          this.strategy.doSomething();
        }
    }
    ```
- 高层模块
    ```java
    public class Client {
        public static void main(String[] args) {
            //声明一个具体的策略
            Strategy strategy = new ConcreteStrategy1();
            //声明上下文对象
            Context context = new Context(strategy);
            //执行封装后的方法
            context.doAnythinig();
        }
    }
    ```

##### 策略模式的优点
- 算法可以自由切换
    - 通过封装角色对其进行封装，保证对外提供“可自由切换”的策略。
- 避免使用多重条件判断
    - 多重条件语句不易维护，而且出错的概率大大增强。
    - 使用策略模式后，可以由其他模块决定采用何种策略，策略家族对外提供的访问接口就是封装类，简化了操作，同时避免了条件语句判断。
- 扩展性良好

##### 策略模式的缺点
- 策略类数量增多
    - 每一个策略都是一个类，复用的可能性很小，类数量增多。
- 所有的策略类都需要对外暴露

##### 策略模式的使用场景
- 多个类只有在算法或行为上稍有不同的场景
- 算法需要自由切换的场景。
- 需要屏蔽算法规则的场景。

##### 策略模式的注意事项
- 如果系统中的一个策略家族的具体策略数量超过4个，则需要考虑使用混合模式，解决策略类膨胀和对外暴露的问题，否则日后的系统维护就会成为一个烫手山芋，谁都不想接。


### 适配器模式



### 迭代器模式


### 组合模式


### 观察者模式


### 门面模式


### 备忘录模式


### 访问者模式


### 状态模式


### 解释器模式


### 享元模式


### 桥梁模式

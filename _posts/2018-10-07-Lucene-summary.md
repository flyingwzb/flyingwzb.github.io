---
layout:     post
title:      lucene总结
subtitle:   lucene
date:       2018-10-07
author:     Will Wang
header-img: img/post-bg-article.jpg
catalog: true
tags:
    - Lucene
---

#### 重点：
1. lucene创建索引 <br>
    Document/Field/Directory/IndexWriterConfig/IndexWriter
2. 查询索引 <br>
    QueryParser/MultiFieldQueryParser/Query/IndexSearcher/TopDocs/ScoreDoc <br>
    TermQuery/WildcardQuery/FuzzyQuery/NumericRangeQuery
3. 维护索引：文档的增删改  文档的修改（先删除，再添加）<br>
	indexWriter.addDocument<br>
	indexWriter.updateDocument<br>
	indexWriter.deleteDocuments<br>

##### 1.为什么要学Lucene?学了Lucene，在哪里应用？
- 搜索，数据库字符串模糊查询，查询商品名称中带有"笔记本"
- 业内，专门用搜索服务器来处理搜索，主要是为了提高搜索效率，为了更好的用户体验。
- 搜索服务器，主要有两种：ElasticSearch/Solr，底层都用到了Lucene

##### 2.几个重要的概念（类比图书馆的例子）
- 倒排索引：（最重要，之所以能够全文检索就是靠倒排索引）
	- 就是从关键字（词条）到文档的映射过程，保存这种映射信息的索引称为反向索引，也叫倒排索引。
	- 倒排索引用到了倒排索引链表保存词条与文档的映射信息，及词条出现在哪些文档上，出现的频率信息。
	- 大白话：根据片段找到完整记录的过程<br>
		听歌识曲<br>
		书籍的索引页<br>
- 全文索引：基于倒排索引技术，采用分词器，对文本每个词进行切分，建立词条，方便进行查找。
	- 采用倒排索引技术，将词条和文档建立对应关系。
- 全文检索：
    - 将非结构化数据中的一部分信息提取出来，重新组织，使其变得有一定结构，
	- 然后对此有一定结构的数据进行搜索，从而达到搜索相对较快的目的。
	- 这部分从非结构化数据中提取出的然后重新组织的信息，我们称之索引。
	- 这种先建立索引，再对索引进行搜索的过程就叫全文检索(Full-text Search)。

##### 3.使用lucene api创建索引Document/Field/Directory/IndexWriterConfig/IndexWriter
- lucene:是集成了搜索分词算法的jar库，lucene不能单独使用。
- 市场上集成了该lucene库有哪些搜索服务器,如ElasticSearch、Solr。
    - lucene类库
	- ElasticSearch、Solr是基于lucene发展出来的搜索服务器技术
	- 官网：http://lucene.apache.org/
- 创建索引（库）的过程
	- 第一步：获取原始文档（类似于图书馆来了一车书）
	- 第二步：创建Document（准备工作，准备对书分门别类）
	- 第三步：创建Field（Field叫做字段，也叫域，创建Field，对书做分门别类）
	- 第四步：把Document写入索引库（把书按照门类以及书架放好）
- 文档有不同字段，字段类型也不同，字段也叫做域
- StringField(索引但是默认不分词，数据被当成一个词条), Term(词条)
- TextField(索引并且根据索引写入器中定义的分词器来进行分词，数据被当做多个词条)
- StoreField一定会被存储，但是一定不创建索引
- 要通过构造函数中的参数Store来指定：Store.YES代表存储，Store.NO代表不存储
- [x] 问题1：如何确定一个字段是否需要**存储**？
	- 如果一个字段要显示到最终的结果中，那么一定要存储，否则就不存储
	- 要么在创建该Field对象的时候，指定Field.Store.YES
	- 要么加一句： Field fieldSizeStore = new StoredField("size", fileSize);
	- 不需要存储，可以使用LongPoint
- [x] 问题2：如何确定一个字段是否需要创建**索引**？
	- 如果要根据这个字段进行搜索，那么这个字段就必须创建索引。
- [x] 问题3：如何确定一个字段是否需要**分词**？    
	- 前提是这个字段首先要创建索引。然后如果这个字段的值是不可分割的，那么就不需要分词。
	- 例如：ID 身份证号不要分词，专有名词不需要分词 StringField
	以上除外，都要分词，都可以用TextField

##### 4.查询索引
- IndexSearcher/QueryParser/MultiFieldQueryParser/Query/TopDocs/ScoreDoc
- TermQuery/WildcardQuery/FuzzyQuery/NumericRangeQuery
- 第一步：创建索引查询对象                     IndexSearcher，需要用到DirectoryReader对象
- 第二步：调用查询方法，得到查询结果TopDocs
	- 需要用到QueryParser（单一字段的查询解析器）解析出Query对象
	- TopDocs topDocs = indexSearcher.search(query, 10);
- 第三步：解析查询结果
    ```
    //得分文档集合
	ScoreDoc[] scoreDocs = topDocs.scoreDocs;
    ```
```
queryParser：先分词再查询
Query query = queryParser.parse("lucene是一个Java开发的全文检索工具包");	
TermQuery：词条精准查询
WildcardQuery：通配符查询 ?匹配单个字符 *匹配0或者多个字符
FuzzyQuery：模糊查询 允许错两次，通过纠错、补位、移动位置  容错性 25%
NumericRangeQuery：数值范围查询  1 <= x <= 10 [1,5] (1,5) [1,5) (1,5]
```
##### 5.修改索引/删除索引
	indexWriter.updateDocument
	indexWriter.deleteDocuments
	
#### 完成：
理解概念：**倒排索引**、**全文索引**、**全文检索**

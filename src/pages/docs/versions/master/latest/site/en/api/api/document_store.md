---
title: "Document Store"
metaTitle: "Database"
metaDescription: ""
slug: "/docs/apidatabase"
date: "2020-09-03"
id: "apidatabasemd"
---

# Document Store

<a name="base"></a>
# Module: base

<a name="base.BaseDocumentStore"></a>
## Class: BaseDocumentStore

```python
class BaseDocumentStore(ABC)
```

Base class for implementing Document Stores.

<a name="base.BaseDocumentStore.write_documents"></a>
#### write\_documents

```python
 | @abstractmethod
 | write_documents(documents: Union[List[dict], List[Document]], index: Optional[str] = None)
```

Indexes documents for later queries.

**Arguments**:

- `documents`: a list of Python dictionaries or a list of Haystack Document objects.
For documents as dictionaries, the format is {"text": "<the-actual-text>"}.
Optionally: Include meta data via {"text": "<the-actual-text>",
"meta":{"name": "<some-document-name>, "author": "somebody", ...}}
It can be used for filtering and is accessible in the responses of the Finder.
- `index`: Optional name of index where the documents shall be written to.
If None, the DocumentStore's default index (self.index) will be used.

**Returns**:

None

<a name="base.BaseDocumentStore.get_all_documents"></a>
#### get\_all\_documents

```python
 | @abstractmethod
 | get_all_documents(index: Optional[str] = None, filters: Optional[Dict[str, List[str]]] = None, return_embedding: Optional[bool] = None) -> List[Document]
```

Get documents from the document store.

**Arguments**:

- `index`: Name of the index to get the documents from. If None, the
DocumentStore's default index (self.index) will be used.
- `filters`: Optional filters to narrow down the documents to return.
Example: {"name": ["some", "more"], "category": ["only_one"]}
- `return_embedding`: Whether to return the document embeddings.

<a name="base.BaseDocumentStore.add_eval_data"></a>
#### add\_eval\_data

```python
 | add_eval_data(filename: str, doc_index: str = "eval_document", label_index: str = "label", batch_size: Optional[int] = None, preprocessor: Optional[PreProcessor] = None, max_docs: Union[int, bool] = None)
```

Adds a SQuAD-formatted file to the DocumentStore in order to be able to perform evaluation on it.
If a jsonl file and a batch_size is passed to the function, documents are loaded batchwise
from disk and also indexed batchwise to the DocumentStore in order to prevent out of memory errors.

**Arguments**:

- `filename`: Name of the file containing evaluation data (json or jsonl)
- `doc_index`: Elasticsearch index where evaluation documents should be stored
- `label_index`: Elasticsearch index where labeled questions should be stored
- `batch_size`: Optional number of documents that are loaded and processed at a time.
When set to None (default) all documents are processed at once.
- `preprocessor`: Optional PreProcessor to preprocess evaluation documents.
It can be used for splitting documents into passages (and assigning labels to corresponding passages).
Currently the PreProcessor does not support split_by sentence, cleaning nor split_overlap != 0.
When set to None (default) preprocessing is disabled.
- `max_docs`: Optional number of documents that will be loaded.
When set to None (default) all available eval documents are used.

<a name="elasticsearch"></a>
# Module: elasticsearch

<a name="elasticsearch.ElasticsearchDocumentStore"></a>
## Class: ElasticsearchDocumentStore

```python
class ElasticsearchDocumentStore(BaseDocumentStore)
```

<a name="elasticsearch.ElasticsearchDocumentStore.__init__"></a>
#### \_\_init\_\_

```python
 | __init__(host: str = "localhost", port: int = 9200, username: str = "", password: str = "", index: str = "document", label_index: str = "label", search_fields: Union[str, list] = "text", text_field: str = "text", name_field: str = "name", embedding_field: str = "embedding", embedding_dim: int = 768, custom_mapping: Optional[dict] = None, excluded_meta_data: Optional[list] = None, faq_question_field: Optional[str] = None, analyzer: str = "standard", scheme: str = "http", ca_certs: str = None, verify_certs: bool = True, create_index: bool = True, update_existing_documents: bool = False, refresh_type: str = "wait_for", similarity="dot_product", timeout=30, return_embedding: bool = False)
```

A DocumentStore using Elasticsearch to store and query the documents for our search.

* Keeps all the logic to store and query documents from Elastic, incl. mapping of fields, adding filters or boosts to your queries, and storing embeddings
* You can either use an existing Elasticsearch index or create a new one via haystack
* Retrievers operate on top of this DocumentStore to find the relevant documents for a query

**Arguments**:

- `host`: url of elasticsearch
- `port`: port of elasticsearch
- `username`: username
- `password`: password
- `index`: Name of index in elasticsearch to use. If not existing yet, we will create one.
- `search_fields`: Name of fields used by ElasticsearchRetriever to find matches in the docs to our incoming query (using elastic's multi_match query), e.g. ["title", "full_text"]
- `text_field`: Name of field that might contain the answer and will therefore be passed to the Reader Model (e.g. "full_text").
If no Reader is used (e.g. in FAQ-Style QA) the plain content of this field will just be returned.
- `name_field`: Name of field that contains the title of the the doc
- `embedding_field`: Name of field containing an embedding vector (Only needed when using a dense retriever (e.g. DensePassageRetriever, EmbeddingRetriever) on top)
- `embedding_dim`: Dimensionality of embedding vector (Only needed when using a dense retriever (e.g. DensePassageRetriever, EmbeddingRetriever) on top)
- `custom_mapping`: If you want to use your own custom mapping for creating a new index in Elasticsearch, you can supply it here as a dictionary.
- `analyzer`: Specify the default analyzer from one of the built-ins when creating a new Elasticsearch Index.
Elasticsearch also has built-in analyzers for different languages (e.g. impacting tokenization). More info at:
https://www.elastic.co/guide/en/elasticsearch/reference/7.9/analysis-analyzers.html
- `excluded_meta_data`: Name of fields in Elasticsearch that should not be returned (e.g. [field_one, field_two]).
Helpful if you have fields with long, irrelevant content that you don't want to display in results (e.g. embedding vectors).
- `scheme`: 'https' or 'http', protocol used to connect to your elasticsearch instance
- `ca_certs`: Root certificates for SSL: it is a path to certificate authority (CA) certs on disk. You can use certifi package with certifi.where() to find where the CA certs file is located in your machine.
- `verify_certs`: Whether to be strict about ca certificates
- `create_index`: Whether to try creating a new index (If the index of that name is already existing, we will just continue in any case)
- `update_existing_documents`: Whether to update any existing documents with the same ID when adding
documents. When set as True, any document with an existing ID gets updated.
If set to False, an error is raised if the document ID of the document being
added already exists.
- `refresh_type`: Type of ES refresh used to control when changes made by a request (e.g. bulk) are made visible to search.
If set to 'wait_for', continue only after changes are visible (slow, but safe).
If set to 'false', continue directly (fast, but sometimes unintuitive behaviour when docs are not immediately available after ingestion).
More info at https://www.elastic.co/guide/en/elasticsearch/reference/6.8/docs-refresh.html
- `similarity`: The similarity function used to compare document vectors. 'dot_product' is the default sine it is
more performant with DPR embeddings. 'cosine' is recommended if you are using a Sentence BERT model.
- `timeout`: Number of seconds after which an ElasticSearch request times out.
- `return_embedding`: To return document embedding

<a name="elasticsearch.ElasticsearchDocumentStore.get_document_by_id"></a>
#### get\_document\_by\_id

```python
 | get_document_by_id(id: str, index=None) -> Optional[Document]
```

Fetch a document by specifying its text id string

<a name="elasticsearch.ElasticsearchDocumentStore.get_documents_by_id"></a>
#### get\_documents\_by\_id

```python
 | get_documents_by_id(ids: List[str], index=None) -> List[Document]
```

Fetch documents by specifying a list of text id strings

<a name="elasticsearch.ElasticsearchDocumentStore.write_documents"></a>
#### write\_documents

```python
 | write_documents(documents: Union[List[dict], List[Document]], index: Optional[str] = None, batch_size: int = 10_000)
```

Indexes documents for later queries in Elasticsearch.

Behaviour if a document with the same ID already exists in ElasticSearch:
a) (Default) Throw Elastic's standard error message for duplicate IDs.
b) If `self.update_existing_documents=True` for DocumentStore: Overwrite existing documents.
(This is only relevant if you pass your own ID when initializing a `Document`.
If don't set custom IDs for your Documents or just pass a list of dictionaries here,
they will automatically get UUIDs assigned. See the `Document` class for details)

**Arguments**:

- `documents`: a list of Python dictionaries or a list of Haystack Document objects.
For documents as dictionaries, the format is {"text": "<the-actual-text>"}.
Optionally: Include meta data via {"text": "<the-actual-text>",
"meta":{"name": "<some-document-name>, "author": "somebody", ...}}
It can be used for filtering and is accessible in the responses of the Finder.
Advanced: If you are using your own Elasticsearch mapping, the key names in the dictionary
should be changed to what you have set for self.text_field and self.name_field.
- `index`: Elasticsearch index where the documents should be indexed. If not supplied, self.index will be used.
- `batch_size`: Number of documents that are passed to Elasticsearch's bulk function at a time.

**Returns**:

None

<a name="elasticsearch.ElasticsearchDocumentStore.write_labels"></a>
#### write\_labels

```python
 | write_labels(labels: Union[List[Label], List[dict]], index: Optional[str] = None, batch_size: int = 10_000)
```

Write annotation labels into document store.

**Arguments**:

- `labels`: A list of Python dictionaries or a list of Haystack Label objects.
- `batch_size`: Number of labels that are passed to Elasticsearch's bulk function at a time.

<a name="elasticsearch.ElasticsearchDocumentStore.update_document_meta"></a>
#### update\_document\_meta

```python
 | update_document_meta(id: str, meta: Dict[str, str])
```

Update the metadata dictionary of a document by specifying its string id

<a name="elasticsearch.ElasticsearchDocumentStore.get_document_count"></a>
#### get\_document\_count

```python
 | get_document_count(filters: Optional[Dict[str, List[str]]] = None, index: Optional[str] = None) -> int
```

Return the number of documents in the document store.

<a name="elasticsearch.ElasticsearchDocumentStore.get_label_count"></a>
#### get\_label\_count

```python
 | get_label_count(index: Optional[str] = None) -> int
```

Return the number of labels in the document store

<a name="elasticsearch.ElasticsearchDocumentStore.get_all_documents"></a>
#### get\_all\_documents

```python
 | get_all_documents(index: Optional[str] = None, filters: Optional[Dict[str, List[str]]] = None, return_embedding: Optional[bool] = None, batch_size: int = 10_000) -> List[Document]
```

Get documents from the document store.

**Arguments**:

- `index`: Name of the index to get the documents from. If None, the
DocumentStore's default index (self.index) will be used.
- `filters`: Optional filters to narrow down the documents to return.
Example: {"name": ["some", "more"], "category": ["only_one"]}
- `return_embedding`: Whether to return the document embeddings.
- `batch_size`: When working with large number of documents, batching can help reduce memory footprint.

<a name="elasticsearch.ElasticsearchDocumentStore.get_all_documents_generator"></a>
#### get\_all\_documents\_generator

```python
 | get_all_documents_generator(index: Optional[str] = None, filters: Optional[Dict[str, List[str]]] = None, return_embedding: Optional[bool] = None, batch_size: int = 10_000) -> Generator[Document, None, None]
```

Get documents from the document store. Under-the-hood, documents are fetched in batches from the
document store and yielded as individual documents. This method can be used to iteratively process
a large number of documents without having to load all documents in memory.

**Arguments**:

- `index`: Name of the index to get the documents from. If None, the
DocumentStore's default index (self.index) will be used.
- `filters`: Optional filters to narrow down the documents to return.
Example: {"name": ["some", "more"], "category": ["only_one"]}
- `return_embedding`: Whether to return the document embeddings.
- `batch_size`: When working with large number of documents, batching can help reduce memory footprint.

<a name="elasticsearch.ElasticsearchDocumentStore.get_all_labels"></a>
#### get\_all\_labels

```python
 | get_all_labels(index: Optional[str] = None, filters: Optional[Dict[str, List[str]]] = None, batch_size: int = 10_000) -> List[Label]
```

Return all labels in the document store

<a name="elasticsearch.ElasticsearchDocumentStore.query"></a>
#### query

```python
 | query(query: Optional[str], filters: Optional[Dict[str, List[str]]] = None, top_k: int = 10, custom_query: Optional[str] = None, index: Optional[str] = None) -> List[Document]
```

Scan through documents in DocumentStore and return a small number documents
that are most relevant to the query as defined by the BM25 algorithm.

**Arguments**:

- `query`: The query
- `filters`: A dictionary where the keys specify a metadata field and the value is a list of accepted values for that field
- `top_k`: How many documents to return per query.
- `index`: The name of the index in the DocumentStore from which to retrieve documents

<a name="elasticsearch.ElasticsearchDocumentStore.query_by_embedding"></a>
#### query\_by\_embedding

```python
 | query_by_embedding(query_emb: np.array, filters: Optional[Dict[str, List[str]]] = None, top_k: int = 10, index: Optional[str] = None, return_embedding: Optional[bool] = None) -> List[Document]
```

Find the document that is most similar to the provided `query_emb` by using a vector similarity metric.

**Arguments**:

- `query_emb`: Embedding of the query (e.g. gathered from DPR)
- `filters`: Optional filters to narrow down the search space.
Example: {"name": ["some", "more"], "category": ["only_one"]}
- `top_k`: How many documents to return
- `index`: Index name for storing the docs and metadata
- `return_embedding`: To return document embedding

**Returns**:



<a name="elasticsearch.ElasticsearchDocumentStore.describe_documents"></a>
#### describe\_documents

```python
 | describe_documents(index=None)
```

Return a summary of the documents in the document store

<a name="elasticsearch.ElasticsearchDocumentStore.update_embeddings"></a>
#### update\_embeddings

```python
 | update_embeddings(retriever: BaseRetriever, index: Optional[str] = None, batch_size: int = 10_000)
```

Updates the embeddings in the the document store using the encoding model specified in the retriever.
This can be useful if want to add or change the embeddings for your documents (e.g. after changing the retriever config).

**Arguments**:

- `retriever`: Retriever to use to update the embeddings.
- `index`: Index name to update
- `batch_size`: When working with large number of documents, batching can help reduce memory footprint.

**Returns**:

None

<a name="elasticsearch.ElasticsearchDocumentStore.delete_all_documents"></a>
#### delete\_all\_documents

```python
 | delete_all_documents(index: str, filters: Optional[Dict[str, List[str]]] = None)
```

Delete documents in an index. All documents are deleted if no filters are passed.

**Arguments**:

- `index`: Index name to delete the document from.
- `filters`: Optional filters to narrow down the documents to be deleted.

**Returns**:

None

<a name="elasticsearch.OpenDistroElasticsearchDocumentStore"></a>
## Class: OpenDistroElasticsearchDocumentStore

```python
class OpenDistroElasticsearchDocumentStore(ElasticsearchDocumentStore)
```

Document Store using the Open Distro for Elasticsearch. It is compatible with the AWS Elasticsearch Service.

In addition to native Elasticsearch query & filtering, it provides efficient vector similarity search using
the KNN plugin that can scale to a large number of documents.

<a name="memory"></a>
# Module: memory

<a name="memory.InMemoryDocumentStore"></a>
## Class: InMemoryDocumentStore

```python
class InMemoryDocumentStore(BaseDocumentStore)
```

In-memory document store

<a name="memory.InMemoryDocumentStore.__init__"></a>
#### \_\_init\_\_

```python
 | __init__(embedding_field: Optional[str] = "embedding", return_embedding: bool = False, similarity="dot_product")
```

**Arguments**:

- `embedding_field`: Name of field containing an embedding vector (Only needed when using a dense retriever (e.g. DensePassageRetriever, EmbeddingRetriever) on top)
- `return_embedding`: To return document embedding
- `similarity`: The similarity function used to compare document vectors. 'dot_product' is the default sine it is
more performant with DPR embeddings. 'cosine' is recommended if you are using a Sentence BERT model.

<a name="memory.InMemoryDocumentStore.write_documents"></a>
#### write\_documents

```python
 | write_documents(documents: Union[List[dict], List[Document]], index: Optional[str] = None)
```

Indexes documents for later queries.


**Arguments**:

- `documents`: a list of Python dictionaries or a list of Haystack Document objects.
For documents as dictionaries, the format is {"text": "<the-actual-text>"}.
Optionally: Include meta data via {"text": "<the-actual-text>",
"meta": {"name": "<some-document-name>, "author": "somebody", ...}}
It can be used for filtering and is accessible in the responses of the Finder.
- `index`: write documents to a custom namespace. For instance, documents for evaluation can be indexed in a
separate index than the documents for search.

**Returns**:

None

<a name="memory.InMemoryDocumentStore.write_labels"></a>
#### write\_labels

```python
 | write_labels(labels: Union[List[dict], List[Label]], index: Optional[str] = None)
```

Write annotation labels into document store.

<a name="memory.InMemoryDocumentStore.get_document_by_id"></a>
#### get\_document\_by\_id

```python
 | get_document_by_id(id: str, index: Optional[str] = None) -> Optional[Document]
```

Fetch a document by specifying its text id string

<a name="memory.InMemoryDocumentStore.get_documents_by_id"></a>
#### get\_documents\_by\_id

```python
 | get_documents_by_id(ids: List[str], index: Optional[str] = None) -> List[Document]
```

Fetch documents by specifying a list of text id strings

<a name="memory.InMemoryDocumentStore.query_by_embedding"></a>
#### query\_by\_embedding

```python
 | query_by_embedding(query_emb: List[float], filters: Optional[Dict[str, List[str]]] = None, top_k: int = 10, index: Optional[str] = None, return_embedding: Optional[bool] = None) -> List[Document]
```

Find the document that is most similar to the provided `query_emb` by using a vector similarity metric.

**Arguments**:

- `query_emb`: Embedding of the query (e.g. gathered from DPR)
- `filters`: Optional filters to narrow down the search space.
Example: {"name": ["some", "more"], "category": ["only_one"]}
- `top_k`: How many documents to return
- `index`: Index name for storing the docs and metadata
- `return_embedding`: To return document embedding

**Returns**:



<a name="memory.InMemoryDocumentStore.update_embeddings"></a>
#### update\_embeddings

```python
 | update_embeddings(retriever: BaseRetriever, index: Optional[str] = None)
```

Updates the embeddings in the the document store using the encoding model specified in the retriever.
This can be useful if want to add or change the embeddings for your documents (e.g. after changing the retriever config).

**Arguments**:

- `retriever`: Retriever
- `index`: Index name to update

**Returns**:

None

<a name="memory.InMemoryDocumentStore.get_document_count"></a>
#### get\_document\_count

```python
 | get_document_count(filters: Optional[Dict[str, List[str]]] = None, index: Optional[str] = None) -> int
```

Return the number of documents in the document store.

<a name="memory.InMemoryDocumentStore.get_label_count"></a>
#### get\_label\_count

```python
 | get_label_count(index: Optional[str] = None) -> int
```

Return the number of labels in the document store

<a name="memory.InMemoryDocumentStore.get_all_documents_generator"></a>
#### get\_all\_documents\_generator

```python
 | get_all_documents_generator(index: Optional[str] = None, filters: Optional[Dict[str, List[str]]] = None, return_embedding: Optional[bool] = None, batch_size: int = 10_000) -> Generator[Document, None, None]
```

Get all documents from the document store. The methods returns a Python Generator that yields individual
documents.

**Arguments**:

- `index`: Name of the index to get the documents from. If None, the
DocumentStore's default index (self.index) will be used.
- `filters`: Optional filters to narrow down the documents to return.
Example: {"name": ["some", "more"], "category": ["only_one"]}
- `return_embedding`: Whether to return the document embeddings.

<a name="memory.InMemoryDocumentStore.get_all_labels"></a>
#### get\_all\_labels

```python
 | get_all_labels(index: str = None, filters: Optional[Dict[str, List[str]]] = None) -> List[Label]
```

Return all labels in the document store

<a name="memory.InMemoryDocumentStore.delete_all_documents"></a>
#### delete\_all\_documents

```python
 | delete_all_documents(index: Optional[str] = None, filters: Optional[Dict[str, List[str]]] = None)
```

Delete documents in an index. All documents are deleted if no filters are passed.

**Arguments**:

- `index`: Index name to delete the document from.
- `filters`: Optional filters to narrow down the documents to be deleted.

**Returns**:

None

<a name="sql"></a>
# Module: sql

<a name="sql.SQLDocumentStore"></a>
## Class: SQLDocumentStore

```python
class SQLDocumentStore(BaseDocumentStore)
```

<a name="sql.SQLDocumentStore.__init__"></a>
#### \_\_init\_\_

```python
 | __init__(url: str = "sqlite://", index: str = "document", label_index: str = "label", update_existing_documents: bool = False)
```

An SQL backed DocumentStore. Currently supports SQLite, PostgreSQL and MySQL backends.

**Arguments**:

- `url`: URL for SQL database as expected by SQLAlchemy. More info here: https://docs.sqlalchemy.org/en/13/core/engines.html#database-urls
- `index`: The documents are scoped to an index attribute that can be used when writing, querying, or deleting documents.
This parameter sets the default value for document index.
- `label_index`: The default value of index attribute for the labels.
- `update_existing_documents`: Whether to update any existing documents with the same ID when adding
documents. When set as True, any document with an existing ID gets updated.
If set to False, an error is raised if the document ID of the document being
added already exists. Using this parameter could cause performance degradation
for document insertion.

<a name="sql.SQLDocumentStore.get_document_by_id"></a>
#### get\_document\_by\_id

```python
 | get_document_by_id(id: str, index: Optional[str] = None) -> Optional[Document]
```

Fetch a document by specifying its text id string

<a name="sql.SQLDocumentStore.get_documents_by_id"></a>
#### get\_documents\_by\_id

```python
 | get_documents_by_id(ids: List[str], index: Optional[str] = None, batch_size: int = 10_000) -> List[Document]
```

Fetch documents by specifying a list of text id strings

<a name="sql.SQLDocumentStore.get_documents_by_vector_ids"></a>
#### get\_documents\_by\_vector\_ids

```python
 | get_documents_by_vector_ids(vector_ids: List[str], index: Optional[str] = None, batch_size: int = 10_000)
```

Fetch documents by specifying a list of text vector id strings

<a name="sql.SQLDocumentStore.get_all_documents_generator"></a>
#### get\_all\_documents\_generator

```python
 | get_all_documents_generator(index: Optional[str] = None, filters: Optional[Dict[str, List[str]]] = None, return_embedding: Optional[bool] = None, batch_size: int = 10_000) -> Generator[Document, None, None]
```

Get documents from the document store. Under-the-hood, documents are fetched in batches from the
document store and yielded as individual documents. This method can be used to iteratively process
a large number of documents without having to load all documents in memory.

**Arguments**:

- `index`: Name of the index to get the documents from. If None, the
DocumentStore's default index (self.index) will be used.
- `filters`: Optional filters to narrow down the documents to return.
Example: {"name": ["some", "more"], "category": ["only_one"]}
- `return_embedding`: Whether to return the document embeddings.

<a name="sql.SQLDocumentStore.get_all_labels"></a>
#### get\_all\_labels

```python
 | get_all_labels(index=None, filters: Optional[dict] = None)
```

Return all labels in the document store

<a name="sql.SQLDocumentStore.write_documents"></a>
#### write\_documents

```python
 | write_documents(documents: Union[List[dict], List[Document]], index: Optional[str] = None, batch_size: int = 10_000)
```

Indexes documents for later queries.

**Arguments**:

- `documents`: a list of Python dictionaries or a list of Haystack Document objects.
For documents as dictionaries, the format is {"text": "<the-actual-text>"}.
Optionally: Include meta data via {"text": "<the-actual-text>",
"meta":{"name": "<some-document-name>, "author": "somebody", ...}}
It can be used for filtering and is accessible in the responses of the Finder.
- `index`: add an optional index attribute to documents. It can be later used for filtering. For instance,
documents for evaluation can be indexed in a separate index than the documents for search.
- `batch_size`: When working with large number of documents, batching can help reduce memory footprint.

**Returns**:

None

<a name="sql.SQLDocumentStore.write_labels"></a>
#### write\_labels

```python
 | write_labels(labels, index=None)
```

Write annotation labels into document store.

<a name="sql.SQLDocumentStore.update_vector_ids"></a>
#### update\_vector\_ids

```python
 | update_vector_ids(vector_id_map: Dict[str, str], index: Optional[str] = None, batch_size: int = 10_000)
```

Update vector_ids for given document_ids.

**Arguments**:

- `vector_id_map`: dict containing mapping of document_id -> vector_id.
- `index`: filter documents by the optional index attribute for documents in database.
- `batch_size`: When working with large number of documents, batching can help reduce memory footprint.

<a name="sql.SQLDocumentStore.reset_vector_ids"></a>
#### reset\_vector\_ids

```python
 | reset_vector_ids(index: Optional[str] = None)
```

Set vector IDs for all documents as None

<a name="sql.SQLDocumentStore.update_document_meta"></a>
#### update\_document\_meta

```python
 | update_document_meta(id: str, meta: Dict[str, str])
```

Update the metadata dictionary of a document by specifying its string id

<a name="sql.SQLDocumentStore.get_document_count"></a>
#### get\_document\_count

```python
 | get_document_count(filters: Optional[Dict[str, List[str]]] = None, index: Optional[str] = None) -> int
```

Return the number of documents in the document store.

<a name="sql.SQLDocumentStore.get_label_count"></a>
#### get\_label\_count

```python
 | get_label_count(index: Optional[str] = None) -> int
```

Return the number of labels in the document store

<a name="sql.SQLDocumentStore.delete_all_documents"></a>
#### delete\_all\_documents

```python
 | delete_all_documents(index: Optional[str] = None, filters: Optional[Dict[str, List[str]]] = None)
```

Delete documents in an index. All documents are deleted if no filters are passed.

**Arguments**:

- `index`: Index name to delete the document from.
- `filters`: Optional filters to narrow down the documents to be deleted.

**Returns**:

None

<a name="faiss"></a>
# Module: faiss

<a name="faiss.FAISSDocumentStore"></a>
## Class: FAISSDocumentStore

```python
class FAISSDocumentStore(SQLDocumentStore)
```

Document store for very large scale embedding based dense retrievers like the DPR.

It implements the FAISS library(https://github.com/facebookresearch/faiss)
to perform similarity search on vectors.

The document text and meta-data (for filtering) are stored using the SQLDocumentStore, while
the vector embeddings are indexed in a FAISS Index.

<a name="faiss.FAISSDocumentStore.__init__"></a>
#### \_\_init\_\_

```python
 | __init__(sql_url: str = "sqlite:///", vector_dim: int = 768, faiss_index_factory_str: str = "Flat", faiss_index: Optional[faiss.swigfaiss.Index] = None, return_embedding: bool = False, update_existing_documents: bool = False, index: str = "document", similarity: str = "dot_product", **kwargs, ,)
```

**Arguments**:

- `sql_url`: SQL connection URL for database. It defaults to local file based SQLite DB. For large scale
deployment, Postgres is recommended.
- `vector_dim`: the embedding vector size.
- `faiss_index_factory_str`: Create a new FAISS index of the specified type.
The type is determined from the given string following the conventions
of the original FAISS index factory.
Recommended options:
- "Flat" (default): Best accuracy (= exact). Becomes slow and RAM intense for > 1 Mio docs.
- "HNSW": Graph-based heuristic. If not further specified,
we use a RAM intense, but more accurate config:
HNSW256, efConstruction=256 and efSearch=256
- "IVFx,Flat": Inverted Index. Replace x with the number of centroids aka nlist.
Rule of thumb: nlist = 10 * sqrt (num_docs) is a good starting point.
For more details see:
- Overview of indices https://github.com/facebookresearch/faiss/wiki/Faiss-indexes
- Guideline for choosing an index https://github.com/facebookresearch/faiss/wiki/Guidelines-to-choose-an-index
- FAISS Index factory https://github.com/facebookresearch/faiss/wiki/The-index-factory
Benchmarks: XXX
- `faiss_index`: Pass an existing FAISS Index, i.e. an empty one that you configured manually
or one with docs that you used in Haystack before and want to load again.
- `return_embedding`: To return document embedding
- `update_existing_documents`: Whether to update any existing documents with the same ID when adding
documents. When set as True, any document with an existing ID gets updated.
If set to False, an error is raised if the document ID of the document being
added already exists.
- `index`: Name of index in document store to use.
- `similarity`: The similarity function used to compare document vectors. 'dot_product' is the default sine it is
more performant with DPR embeddings. 'cosine' is recommended if you are using a Sentence BERT model.

<a name="faiss.FAISSDocumentStore.write_documents"></a>
#### write\_documents

```python
 | write_documents(documents: Union[List[dict], List[Document]], index: Optional[str] = None, batch_size: int = 10_000)
```

Add new documents to the DocumentStore.

**Arguments**:

- `documents`: List of `Dicts` or List of `Documents`. If they already contain the embeddings, we'll index
them right away in FAISS. If not, you can later call update_embeddings() to create & index them.
- `index`: (SQL) index name for storing the docs and metadata
- `batch_size`: When working with large number of documents, batching can help reduce memory footprint.

**Returns**:



<a name="faiss.FAISSDocumentStore.update_embeddings"></a>
#### update\_embeddings

```python
 | update_embeddings(retriever: BaseRetriever, index: Optional[str] = None, batch_size: int = 10_000)
```

Updates the embeddings in the the document store using the encoding model specified in the retriever.
This can be useful if want to add or change the embeddings for your documents (e.g. after changing the retriever config).

**Arguments**:

- `retriever`: Retriever to use to get embeddings for text
- `index`: (SQL) index name for storing the docs and metadata
- `batch_size`: When working with large number of documents, batching can help reduce memory footprint.

**Returns**:

None

<a name="faiss.FAISSDocumentStore.get_all_documents_generator"></a>
#### get\_all\_documents\_generator

```python
 | get_all_documents_generator(index: Optional[str] = None, filters: Optional[Dict[str, List[str]]] = None, return_embedding: Optional[bool] = None, batch_size: int = 10_000) -> Generator[Document, None, None]
```

Get all documents from the document store. Under-the-hood, documents are fetched in batches from the
document store and yielded as individual documents. This method can be used to iteratively process
a large number of documents without having to load all documents in memory.

**Arguments**:

- `index`: Name of the index to get the documents from. If None, the
DocumentStore's default index (self.index) will be used.
- `filters`: Optional filters to narrow down the documents to return.
Example: {"name": ["some", "more"], "category": ["only_one"]}
- `return_embedding`: Whether to return the document embeddings.
- `batch_size`: When working with large number of documents, batching can help reduce memory footprint.

<a name="faiss.FAISSDocumentStore.train_index"></a>
#### train\_index

```python
 | train_index(documents: Optional[Union[List[dict], List[Document]]], embeddings: Optional[np.array] = None)
```

Some FAISS indices (e.g. IVF) require initial "training" on a sample of vectors before you can add your final vectors.
The train vectors should come from the same distribution as your final ones.
You can pass either documents (incl. embeddings) or just the plain embeddings that the index shall be trained on.

**Arguments**:

- `documents`: Documents (incl. the embeddings)
- `embeddings`: Plain embeddings

**Returns**:

None

<a name="faiss.FAISSDocumentStore.delete_all_documents"></a>
#### delete\_all\_documents

```python
 | delete_all_documents(index=None)
```

Delete all documents from the document store.

<a name="faiss.FAISSDocumentStore.query_by_embedding"></a>
#### query\_by\_embedding

```python
 | query_by_embedding(query_emb: np.array, filters: Optional[dict] = None, top_k: int = 10, index: Optional[str] = None, return_embedding: Optional[bool] = None) -> List[Document]
```

Find the document that is most similar to the provided `query_emb` by using a vector similarity metric.

**Arguments**:

- `query_emb`: Embedding of the query (e.g. gathered from DPR)
- `filters`: Optional filters to narrow down the search space.
Example: {"name": ["some", "more"], "category": ["only_one"]}
- `top_k`: How many documents to return
- `index`: (SQL) index name for storing the docs and metadata
- `return_embedding`: To return document embedding

**Returns**:



<a name="faiss.FAISSDocumentStore.save"></a>
#### save

```python
 | save(file_path: Union[str, Path])
```

Save FAISS Index to the specified file.

**Arguments**:

- `file_path`: Path to save to.

**Returns**:

None

<a name="faiss.FAISSDocumentStore.load"></a>
#### load

```python
 | @classmethod
 | load(cls, faiss_file_path: Union[str, Path], sql_url: str)
```

Load a saved FAISS index from a file and connect to the SQL database.
Note: In order to have a correct mapping from FAISS to SQL,
make sure to use the same SQL DB that you used when calling `save()`.

**Arguments**:

- `faiss_file_path`: Stored FAISS index file. Can be created via calling `save()`
- `sql_url`: Connection string to the SQL database that contains your docs and metadata.

**Returns**:

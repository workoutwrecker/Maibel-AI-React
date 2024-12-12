import os
from pinecone import Pinecone
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_pinecone import PineconeVectorStore
from dotenv import load_dotenv

load_dotenv()

# Constants for configuration
PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
INDEX_NAME = "langchain-test-index"
MODEL_NAME = "sentence-transformers/all-mpnet-base-v2"

class VectorStoreManager:
    def __init__(self):
        self._initialize_pinecone()

    def _initialize_pinecone(self):
        Pinecone(api_key=PINECONE_API_KEY)

    def __get_vector_store(self):
        model_kwargs = {'device': 'cpu'}
        encode_kwargs = {'normalize_embeddings': False}
        embeddings = HuggingFaceEmbeddings(model_name=MODEL_NAME, model_kwargs=model_kwargs, encode_kwargs=encode_kwargs)
        return PineconeVectorStore(index_name=INDEX_NAME, embedding=embeddings)

    def retrieve_from_vector_store(self, query: str, top_k: int):
        vector_store = self.__get_vector_store()
        results = vector_store.similarity_search(query, k=top_k)
        return results

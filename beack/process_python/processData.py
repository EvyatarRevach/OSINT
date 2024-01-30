import json
import time
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from gensim import corpora, models
from confluent_kafka import Consumer, KafkaError, Producer
import gensim

# Download NLTK resources
# nltk.download('stopwords')

# Preprocess Hebrew text
def preprocess_hebrew(text):
    he_stop = set(stopwords.words('hebrew'))
    words = word_tokenize(text)
    return [word.lower() for word in words if word.isalpha() and word.lower() not in he_stop]

#LDA model creation code
def create_lda_model(corpus, dictionary):
    ldamodel = gensim.models.ldamodel.LdaModel(corpus, num_topics=10, id2word=dictionary, passes=15)
    return ldamodel

# Run LDA
def run_lda(messages, dictionary):
    docs = [preprocess_hebrew(text) for text in messages]
    doc_term_matrix = [dictionary.doc2bow(doc) for doc in docs]

    # Create or load the LDA model
    try:
        lda_model = gensim.models.LdaModel.load('model10.gensim')
    except FileNotFoundError:
        lda_model = create_lda_model(doc_term_matrix, dictionary)

    important_words = get_important_words(lda_model, dictionary=dictionary)
    return important_words, lda_model  

# Get important words from LDA model
def get_important_words(lda_model, num_topics=10, num_words=3, dictionary=None):
    important_words = []

    for topic_id in range(num_topics):
        topic_terms = lda_model.show_topic(topic_id, topn=num_words)
        words = [' '.join([term for term, _ in topic_terms])]
        important_words.append(words)
        print(f"Words for Topic {topic_id}: {words}")

    print(important_words, '\nimportant_words')
    return important_words

# Kafka consumer configuration
conf = {'bootstrap.servers': 'localhost:9092',
        'group.id': 'my-group',
        'auto.offset.reset': 'earliest'}

consumer = Consumer(conf)
consumer.subscribe(['message_from_telegram'])

# Kafka producer configuration
producer = Producer({'bootstrap.servers': 'localhost:9092'})

# Initialize variables
messages = []
last_processing_time = time.time()
lda_model = None  

# Kafka message processing loop
while True:
    msg = consumer.poll(1.0)
    if msg is not None and len(msg) > 0:
        message = json.loads(msg.value().decode())['message']
        messages.append(message)

        current_time = time.time()
        ten_minutes_passed = current_time - last_processing_time >= 10
        print (ten_minutes_passed)

        if ten_minutes_passed and len(messages) > 10:
            # Assume you have a dictionary object already created
            dictionary = corpora.Dictionary([preprocess_hebrew(text) for text in messages])
            important_words, lda_model = run_lda(messages, dictionary)
            print(important_words)
        
            # Produce the important words directly to Kafka
            producer.produce('processed_messages', value=json.dumps(important_words))
            producer.flush()
            print('the message sent to kafka ')
            last_processing_time = current_time
            break

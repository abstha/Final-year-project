from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from pymongo import MongoClient
from sklearn.metrics.pairwise import cosine_similarity

# Connect to MongoDB
client = MongoClient("mongodb+srv://admin:admin@cluster0.ugllwwg.mongodb.net/?retryWrites=true&w=majority")
db = client["test"]
collection = db["destinations"]

# Get all the destinations and their features
destinations = list(collection.find({}, {'_id': 0}))

# Extract features using TfidfVectorizer
tfidf = TfidfVectorizer()
features = tfidf.fit_transform([d['category'] for d in destinations]).toarray()

# Calculate cosine similarity between all the destinations
similarity_matrix = cosine_similarity(features)

app = Flask(__name__)
CORS(app)

@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.get_json()
    category = data['category']
    n = data.get('n', 5)

    # Find the index of the category in the list
    category_index = [d['category'] for d in destinations].index(category)

    # Get the similarity scores of the category with all other categories
    similarity_scores = list(enumerate(similarity_matrix[category_index]))

    # Sort the categories based on the similarity score
    sorted_categories = sorted(similarity_scores, key=lambda x: x[1], reverse=True)

    # Get the top n similar categories
    top_n_categories = [destinations[i[0]] for i in sorted_categories[1:n+1]]

    return jsonify({'recommended_destinations': top_n_categories})

if __name__ == '__main__':
    app.run(port=5001)
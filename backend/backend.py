from flask import Flask, request, jsonify
import pandas as pd
from sklearn.neighbors import NearestNeighbors
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Sample user data (Replace this with a real database)
users = pd.DataFrame({
    'id': [1, 2, 3, 4, 5],
    'username': ['Alice', 'Bob', 'Charlie', 'David', 'Eve'],
    'rating': [4.5, 3.8, 4.9, 3.2, 4.2],
    'exams': [['Math', 'Physics'], ['Biology'], ['Chemistry', 'Math'], ['History'], ['Math', 'CS']]
})

# Convert categorical exam data to numerical features
exam_list = list(set(exam for sublist in users['exams'] for exam in sublist))
for exam in exam_list:
    users[exam] = users['exams'].apply(lambda x: 1 if exam in x else 0)

feature_columns = ['rating'] + exam_list

# Train a simple KNN model
knn = NearestNeighbors(n_neighbors=3, metric='euclidean')
knn.fit(users[feature_columns])

@app.route('/search', methods=['GET'])
def search_users():
    query = request.args.get('query', '')
    filter_type = request.args.get('filter', 'top_ratings')

    if filter_type == 'top_ratings':
        result = users.sort_values(by='rating', ascending=False).to_dict(orient='records')
    elif filter_type == 'most_followed':
        result = users.to_dict(orient='records')  # Add logic for most followed
    else:
        result = users.to_dict(orient='records')  # Default

    return jsonify(result)

@app.route('/recommend', methods=['POST'])
def recommend_users():
    data = request.json
    user_features = pd.DataFrame([data])
    distances, indices = knn.kneighbors(user_features[feature_columns])
    recommended_users = users.iloc[indices[0]].to_dict(orient='records')
    return jsonify(recommended_users)

if __name__ == '__main__':
    app.run(debug=True)

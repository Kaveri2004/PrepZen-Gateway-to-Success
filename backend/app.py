from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Sample reviews data
reviews = [
    {"id": 1, "username": "Alice", "rating": 5, "comment": "Excellent"},
    {"id": 2, "username": "Bob", "rating": 4, "comment": "Good"},
    {"id": 3, "username": "Charlie", "rating": 3, "comment": "Average"},
    {"id": 4, "username": "David", "rating": 5, "comment": "Helpful"},
    {"id": 5, "username": "Eve", "rating": 4, "comment": "Nice"},
]

# Route to get all reviews
@app.route("/reviews", methods=["GET"])
def get_reviews():
    return jsonify(reviews)

# Route to add a new review
@app.route("/reviews", methods=["POST"])
def add_review():
    data = request.json
    new_review = {
        "id": len(reviews) + 1,
        "username": data["username"],
        "rating": data["rating"],
        "comment": data["comment"],
    }
    reviews.append(new_review)
    return jsonify({"message": "Review added successfully", "review": new_review})

if __name__ == "__main__":
    app.run(debug=True)

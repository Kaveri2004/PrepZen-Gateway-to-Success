from flask import Flask, request, jsonify
from flask_cors import CORS
import datetime

app = Flask(__name__)
CORS(app)

messages = [
    {"username": "Alice", "text": "Hello!", "time": "12:30 PM"},
    {"username": "Bob", "text": "Hey!", "time": "12:35 PM"},
    {"username": "Charlie", "text": "Good Morning!", "time": "9:00 AM"},
]

@app.route('/messages', methods=['GET'])
def get_messages():
    filter_type = request.args.get("filter", "sent")
    
    if filter_type == "sent":
        return jsonify(messages)
    elif filter_type == "received":
        return jsonify(messages[::-1])  
    elif filter_type == "requests":
        return jsonify([])  
    
    return jsonify(messages)

@app.route('/send_message', methods=['POST'])
def send_message():
    data = request.json
    new_message = {
        "username": data["username"],
        "text": data["text"],
        "time": datetime.datetime.now().strftime("%I:%M %p"),
    }
    messages.append(new_message)
    return jsonify({"message": "Sent successfully"}), 201

if __name__ == '__main__':
    app.run(debug=True)

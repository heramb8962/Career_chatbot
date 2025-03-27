from flask import Blueprint, request, jsonify, render_template
from .chatbot import get_chat_response

main = Blueprint('main', __name__)

@main.route("/")
def index():
    return render_template("index.html")  # Ensure this file exists in templates/

@main.route("/chat", methods=["POST"])
def chat():
    data = request.json
    user_input = data.get("message")

    if not user_input:
        return jsonify({"error": "No message provided"}), 400

    bot_response = get_chat_response(user_input)
    return jsonify({"response": bot_response})

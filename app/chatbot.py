import requests
import json
from config import OPENROUTER_API_KEY, OPENROUTER_BASE_URL

def get_chat_response(user_input):
    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "model": "openai/gpt-3.5-turbo",  # Use any model available on OpenRouter
        "messages": [
            {"role": "system", "content": "You are a helpful career counseling chatbot."},
            {"role": "user", "content": user_input}
        ],
        "temperature": 0.7
    }

    try:
        response = requests.post(OPENROUTER_BASE_URL, headers=headers, data=json.dumps(payload))
        response_data = response.json()

        if "choices" in response_data:
            return response_data["choices"][0]["message"]["content"]
        else:
            return "Error: No response from the API."
    except Exception as e:
        return f"Error: {str(e)}"

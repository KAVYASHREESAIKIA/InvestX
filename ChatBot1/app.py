from flask import Flask, render_template, request
import google.generativeai as genai

genai.configure(api_key="AIzaSyBaz0LyNG61swo-9cl-Uf_LJ9r4Y0WFbNU")

app = Flask(__name__)

generation_config = {"temperature": 0.9, "top_p": 1, "top_k": 1, "max_output_tokens": 2048}

@app.route("/")
def index():
    return render_template('chat.html')

@app.route("/get", methods=["GET", "POST"])
def chat():
    user_msg = request.form["msg"]
    return get_Chat_response(user_msg)

def get_Chat_response(user_input):
    model = genai.GenerativeModel("gemini-pro", generation_config=generation_config)
    response = model.generate_content([user_input])
    return response.text

@app.route("/start", methods=["POST"])
def start_action():
    return "Action started"

if __name__ == '__main__':
    app.run(debug=True)

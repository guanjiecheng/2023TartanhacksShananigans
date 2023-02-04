from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('public/index.html')

@app.route('/profile')
def my_profile():
    response_body = {
        "name": "Nagato",
        "about" :"Hello! I'm a full stack developer that loves python and javascript"
    }
    return response_body

if __name__ == "__main__":
    app.run(debug=True)
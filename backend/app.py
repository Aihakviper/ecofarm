from flask import Flask, render_template, request, jsonify
from routes.disease_routes import disease_bp
from routes.ecommerce_routes import ecommerce_bp

app = Flask(__name__)

app.register_blueprint(disease_bp, url_prefix="/api/disease")
app.register_blueprint(ecommerce_bp, url_prefix="/api/ecommerce")

@app.route("/")
def home():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)

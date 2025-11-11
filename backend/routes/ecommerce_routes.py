from flask import Blueprint, jsonify
ecommerce_bp = Blueprint("ecommerce_bp", __name__)

@ecommerce_bp.route("/products", methods=["GET"])
def list_products():
    # Placeholder for product listing
    return jsonify({"products": []})

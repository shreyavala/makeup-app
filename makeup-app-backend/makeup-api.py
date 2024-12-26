from flask import Flask, jsonify, request
import pandas as pd
import json
from flask_cors import CORS
import ast

#load csv
file_name ="makeup-products.csv"
df = pd.read_csv(file_name)

# restructure json:
def restructure_product(product):

    try:
        ingredients = ast.literal_eval(product.get("ingredients", "[]"))
    except (ValueError, SyntaxError):
        ingredients = []

    return {
        "product_id": product.get("product_id", ""), 
        "product_name": product.get("product_name", ""),
        "product_price": product.get("price_usd", 0),  
        "product_brand": product.get("brand_name", ""),
        "product_ingredients": ingredients
    }

def load_cart():
    with open("cart.json") as f:
        return json.load(f)
    
def save_cart(cart):
    with open("cart.json", "w") as f:
        json.dump(cart, f, indent=4)


data_json_parsed = df.head(10).apply(restructure_product, axis=1).tolist() # temporarily retrieve only first 5 rows (products) for testing


# create flask app
app = Flask(__name__)

# enable CORS
CORS(app, resources={r"/*": {"origins": "*"}})

# endpoint: get all products
@app.route('/products', methods=['GET'])
def get_all_products():
    return jsonify({"products": data_json_parsed})

# endpoint: get product by ID
@app.route('/products/<string:product_id>', methods=['GET'])
def get_product_by_id(product_id):
    for product in data_json_parsed:
        if product['product_id']==product_id:
            return jsonify({"product": product})
        
# endpoint: get all items added to cart
@app.route('/cart', methods=['GET'])
def get_cart():
    cart_data = load_cart()
    return jsonify(cart_data)
        
# endpoint: post: add item to cart 
@app.route('/cart', methods=['POST'])
def add_to_cart():
    product_id=request.json.get('product_id')
    for product in data_json_parsed:
        if product['product_id']==product_id:
            cart_data = load_cart()
            cart_data['cart'].append(product)
            save_cart(cart_data)
            return jsonify(cart_data)
        
# endpoint: delete: remove item from cart
@app.route('/cart/<string:product_id>', methods=['DELETE'])
def delete_from_cart(product_id):
    cart_data = load_cart()
    for product in cart_data['cart']:
        if product['product_id']==product_id:
            cart_data['cart'].remove(product)
            save_cart(cart_data)
            return jsonify(cart_data)
        
if __name__ == "__main__":
    app.run(debug=True)


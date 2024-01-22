import os

from flask import Flask, make_response, jsonify, request
from flask_migrate import Migrate
from flask_cors import CORS
from flask_restful import Api, Resource
from models import db, Restaurant, Pizza, RestaurantPizza


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URI')
# app.config['SQLALCHEMY_DATABASE_URI'] = export DATABASE_URI= ///pizza_restaurants_3j71_user:7lyKujEEtiKW8LiqKqjEvoWCcmyWFv1j@dpg-cmlnu521hbls73caofv0-a.oregon-postgres.render.com/pizza_restaurants_3j71
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)
db.init_app(app)
CORS(app)


@app.route('/', methods=['GET'])
def pizzas():
    response_dict = {
        "pizza": "Pizzas will go here"
    }

    return make_response(jsonify(response_dict), 200)
@app.route('/pizzas', methods=['GET'])
def get_pizzas():
    pizzas = Pizza.query.all()
    data = [{'id': p.id, 'name': p.name, 'ingredients': p.ingredients} for p in pizzas]
    
    return make_response(jsonify(data), 200)

@app.route('/restaurants', methods=['GET'])
def get_restaurants():
    restaurants = Restaurant.query.all()
    data = [{'id': r.id, 'name': r.name, 'address': r.address} for r in restaurants]
    
    return make_response(jsonify(data), 200)

@app.route('/restaurants/<int:restaurant_id>', methods=['GET', 'DELETE'])
def manage_restaurant(restaurant_id):
    restaurant = Restaurant.query.get(restaurant_id)
    
    if not restaurant:
        return make_response(jsonify({'error': 'Restaurant not found'}), 404)
    
    if request.method == 'GET':
        return make_response(jsonify({'id': restaurant.id, 'name': restaurant.name, 'address': restaurant.address}), 200)
    elif request.method == 'DELETE':
        db.session.delete(restaurant)
        db.session.commit()
        return make_response(jsonify({'message': 'Restaurant deleted successfully'}), 200)

@app.route('/restaurant_pizzas', methods=['POST'])
def create_restaurant_pizza():
    data = request.get_json()

    pizza_id = data.get('pizza_id')
    restaurant_id = data.get('restaurant_id')
    price = data.get('price')

    if not all([pizza_id, restaurant_id, price]):
        return make_response(jsonify({'error': 'Missing required fields'}), 400)

    pizza = Pizza.query.get(pizza_id)
    restaurant = Restaurant.query.get(restaurant_id)

    if not pizza or not restaurant:
        return make_response(jsonify({'error': 'Pizza or Restaurant not found'}), 404)

    restaurant_pizza = RestaurantPizza(pizza=pizza, restaurant=restaurant, price=price)
    db.session.add(restaurant_pizza)
    db.session.commit()

    return make_response(jsonify({'message': 'RestaurantPizza created successfully'}), 201)


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(port=5559)

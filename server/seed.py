
from app import app
from flask_migrate import Migrate
from models import db, Restaurant, Pizza, RestaurantPizza

migrate = Migrate(app, db)

with app.app_context():
    print('Creating restaurant and pizza objects...')
    sottocasa = Restaurant(name='Sottocasa NYC', address='298 Atlantic Ave, Brooklyn, NY 11201')
    pizzarte = Restaurant(name='PizzArte', address='69 W 55th St, New York, NY 10019')

    cheese_pizza = Pizza(name='Cheese', ingredients='Dough, Tomato Sauce, Cheese')
    pepperoni_pizza = Pizza(name='Pepperoni', ingredients='Dough, Tomato Sauce, Cheese, Pepperoni')

    
    restaurant_pizza_sottocasa_cheese = RestaurantPizza(restaurant=sottocasa, pizza=cheese_pizza, price=10.99)
    restaurant_pizza_sottocasa_pepperoni = RestaurantPizza(restaurant=sottocasa, pizza=pepperoni_pizza, price=12.99)

    print('Cooking that pizza...')
    db.session.add_all([sottocasa, pizzarte, cheese_pizza, pepperoni_pizza,
                        restaurant_pizza_sottocasa_cheese, restaurant_pizza_sottocasa_pepperoni])
    db.session.commit()

    print('Serving the tastiest pizza')

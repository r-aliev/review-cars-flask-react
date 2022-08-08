import os
from flask import Flask, request
from flask_restful import Resource, Api, marshal_with, fields
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
api = Api(app)

app.config['SECRET_KEY'] = 'hardsecretkey'

#app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///cars.db'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://rashidali:hardpassword123@auto-search-identifier.cbopgd7whczx.us-east-1.rds.amazonaws.com/autosearch'
db = SQLAlchemy(app)

# configure static folder
imageFolder = os.path.join('static', 'images')
app.config['UPLOAD_FOLDER'] = imageFolder

# typically this has to be it in models.py
class Car(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    brand = db.Column(db.String(200), nullable=False)
    price = db.Column(db.Float, nullable=False)
    mileage = db.Column(db.Float, nullable=False)
    production_year = db.Column(db.Integer, nullable=False)
    def __repr__(self):
        return self.brand


# sort of schema for the data that we want to return in serialized version
carFields = {
    'id':fields.Integer,
    'brand':fields.String,
    'price':fields.Float,
    'mileage':fields.Float,
    'production_year':fields.Integer,
}


class CarsAPI(Resource):
    @marshal_with(carFields)
    def get(self):
        cars = Car.query.all()
        return cars

    @marshal_with(carFields)
    def post(self):
        data = request.json
        car = Car(brand=data['brand'], price=data['price'], mileage=data['mileage'], production_year=data['production_year'])
        db.session.add(car)
        db.session.commit()
        cars = Car.query.all()
        return cars


class CarAPI(Resource):
    @marshal_with(carFields)
    def get(self, pk):
        car = Car.query.filter_by(id=pk).first()
        return car

    # update
    @marshal_with(carFields)
    def put(self, pk):
        data = request.json
        car = Car.query.filter_by(id=pk).first()
        car.brand = data['brand']
        db.session.commit()
        return car

    @marshal_with(carFields)
    def delete(self, pk):
        car = Car.query.filter_by(id=pk).first()
        db.session.delete(car)
        db.session.commit()
        cars = Car.query.all()
        return cars


api.add_resource(CarsAPI, '/cars')
api.add_resource(CarAPI, '/cars/<int:pk>')


if __name__ == "__main__":
    app.run(debug=True)

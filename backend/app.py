from flask import Flask, request
from flask_restful import Resource, Api, marshal_with, fields
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
api = Api(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///cars.db'
db = SQLAlchemy(app)


# typically this has to be it in models.py
class Car(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)

    def __repr__(self):
        return self.name


# sort of schema for the data that we want to return in serialized version
carFields = {
    'id': fields.Integer,
    'name':fields.String
}


class CarsAPI(Resource):
    @marshal_with(carFields)
    def get(self):
        cars = Car.query.all()
        return cars

    @marshal_with(carFields)
    def post(self):
        data = request.json
        car = Car(name=data['name'])
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
        car.name = data['name']
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

import pytest
from app import app, recommend_recipes, truncate
from flask import json

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_recommend_endpoint_success(client):
    data = {
        'calories': 100,
        'fat': 5,
        'carbohydrates': 20,
        'protein': 10,
        'cholesterol': 15,
        'sodium': 200,
        'fiber': 3,
        'ingredients': 'banana,apple'
    }
    response = client.post('/recommend', json=data)
    assert response.status_code == 200
    assert json.loads(response.data)['success'] == True
    assert len(json.loads(response.data)['recommendations']) == 3

def test_recommend_endpoint_missing_field(client):
    data = {
        'calories': 100,
        'fat': 5,
        'carbohydrates': 20,
        'protein': 10,
        'cholesterol': 15,
        'sodium': 200,
        'ingredients': 'banana,apple'
    }
    response = client.post('/recommend', json=data)
    assert response.status_code == 400
    assert json.loads(response.data)['success'] == False
    assert 'Missing required field' in json.loads(response.data)['error']

def test_recommend_endpoint_invalid_value(client):
    data = {
        'calories': 'not a number',
        'fat': 5,
        'carbohydrates': 20,
        'protein': 10,
        'cholesterol': 15,
        'sodium': 200,
        'fiber': 3,
        'ingredients': 'banana,apple'
    }
    response = client.post('/recommend', json=data)
    assert response.status_code == 400
    assert json.loads(response.data)['success'] == False
    assert 'Invalid value' in json.loads(response.data)['error']

def test_recommend_endpoint_empty_ingredients(client):
    data = {
        'calories': 100,
        'fat': 5,
        'carbohydrates': 20,
        'protein': 10,
        'cholesterol': 15,
        'sodium': 200,
        'fiber': 3,
        'ingredients': ''
    }
    response = client.post('/recommend', json=data)
    assert response.status_code == 200
    assert json.loads(response.data)['success'] == True

def test_recommend_endpoint_large_values(client):
    data = {
        'calories': 10000,
        'fat': 5000,
        'carbohydrates': 20000,
        'protein': 10000,
        'cholesterol': 15000,
        'sodium': 200000,
        'fiber': 3000,
        'ingredients': 'banana,apple'
    }
    response = client.post('/recommend', json=data)
    assert response.status_code == 200
    assert json.loads(response.data)['success'] == True

def test_recommend_endpoint_zero_values(client):
    data = {
        'calories': 0,
        'fat': 0,
        'carbohydrates': 0,
        'protein': 0,
        'cholesterol': 0,
        'sodium': 0,
        'fiber': 0,
        'ingredients': 'banana,apple'
    }
    response = client.post('/recommend', json=data)
    assert response.status_code == 200
    assert json.loads(response.data)['success'] == True

def test_recommend_endpoint_negative_values(client):
    data = {
        'calories': -100,
        'fat': -5,
        'carbohydrates': -20,
        'protein': -10,
        'cholesterol': -15,
        'sodium': -200,
        'fiber': -3,
        'ingredients': 'banana,apple'
    }
    response = client.post('/recommend', json=data)
    assert response.status_code == 200
    assert json.loads(response.data)['success'] == True

def test_recommend_endpoint_float_values(client):
    data = {
        'calories': 100.5,
        'fat': 5.2,
        'carbohydrates': 20.7,
        'protein': 10.1,
        'cholesterol': 15.9,
        'sodium': 200.3,
        'fiber': 3.6,
        'ingredients': 'banana,apple'
    }
    response = client.post('/recommend', json=data)
    assert response.status_code == 200
    assert json.loads(response.data)['success'] == True

def test_recommend_endpoint_many_ingredients(client):
    data = {
        'calories': 100,
        'fat': 5,
        'carbohydrates': 20,
        'protein': 10,
        'cholesterol': 15,
        'sodium': 200,
        'fiber': 3,
        'ingredients': 'banana,apple,orange,grape,kiwi,mango,pineapple,strawberry,blueberry,raspberry'
    }
    response = client.post('/recommend', json=data)
    assert response.status_code == 200
    assert json.loads(response.data)['success'] == True

def test_recommend_endpoint_special_characters(client):
    data = {
        'calories': 100,
        'fat': 5,
        'carbohydrates': 20,
        'protein': 10,
        'cholesterol': 15,
        'sodium': 200,
        'fiber': 3,
        'ingredients': 'banana,apple,salt&pepper,olive oil'
    }
    response = client.post('/recommend', json=data)
    assert response.status_code == 200
    assert json.loads(response.data)['success'] == True

def test_recommend_endpoint_method_not_allowed(client):
    response = client.get('/recommend')
    assert response.status_code == 405

def test_recommend_recipes_function():
    input_features = [100, 5, 20, 10, 15, 200, 3, 'banana apple']
    recommendations = recommend_recipes(input_features)
    assert len(recommendations) == 3
    assert 'recipe_name' in recommendations.columns
    assert 'ingredients_list' in recommendations.columns
    assert 'image_url' in recommendations.columns

def test_truncate_function_short():
    assert truncate("Short name", 30) == "Short name"

def test_truncate_function_long():
    assert truncate("This is a very long recipe name that needs truncation", 30) == "This is a very long recipe nam..."

def test_recommend_endpoint_empty_request(client):
    response = client.post('/recommend', json={})
    assert response.status_code == 400
    assert json.loads(response.data)['success'] == False

def test_recommend_endpoint_extra_fields(client):
    data = {
        'calories': 100,
        'fat': 5,
        'carbohydrates': 20,
        'protein': 10,
        'cholesterol': 15,
        'sodium': 200,
        'fiber': 3,
        'ingredients': 'banana,apple',
        'extra_field': 'should be ignored'
    }
    response = client.post('/recommend', json=data)
    assert response.status_code == 200
    assert json.loads(response.data)['success'] == True

def test_recommend_endpoint_ingredients_as_list(client):
    data = {
        'calories': 100,
        'fat': 5,
        'carbohydrates': 20,
        'protein': 10,
        'cholesterol': 15,
        'sodium': 200,
        'fiber': 3,
        'ingredients': ['banana', 'apple']
    }
    response = client.post('/recommend', json=data)
    assert response.status_code == 500
    assert json.loads(response.data)['success'] == False

def test_recommend_endpoint_very_long_ingredient_list(client):
    data = {
        'calories': 100,
        'fat': 5,
        'carbohydrates': 20,
        'protein': 10,
        'cholesterol': 15,
        'sodium': 200,
        'fiber': 3,
        'ingredients': ','.join(['ingredient'+str(i) for i in range(1000)])
    }
    response = client.post('/recommend', json=data)
    assert response.status_code == 200
    assert json.loads(response.data)['success'] == True

def test_recommend_endpoint_unicode_ingredients(client):
    data = {
        'calories': 100,
        'fat': 5,
        'carbohydrates': 20,
        'protein': 10,
        'cholesterol': 15,
        'sodium': 200,
        'fiber': 3,
        'ingredients': 'バナナ,りんご'
    }
    response = client.post('/recommend', json=data)
    assert response.status_code == 200
    assert json.loads(response.data)['success'] == True
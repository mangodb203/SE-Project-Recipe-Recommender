from flask import Flask, render_template, request, jsonify
import numpy as np
import pandas as pd
from sklearn.neighbors import NearestNeighbors
from sklearn.preprocessing import StandardScaler
from sklearn.feature_extraction.text import TfidfVectorizer
import ast


app = Flask(__name__)


# Absolute path example
data = pd.read_csv("data/recipe_final.csv")


# Convert string representation of list to actual list
data['ingredients_list'] = data['ingredients_list'].apply(ast.literal_eval)

# Convert ingredients list to string for TF-IDF
data['ingredients_str'] = data['ingredients_list'].apply(lambda x: ' '.join(x))

# Preprocess Ingredients with TF-IDF
vectorizer = TfidfVectorizer()
X_ingredients = vectorizer.fit_transform(data['ingredients_str'])

# Use raw numerical features without standardization
numerical_features = ['calories', 'fat', 'carbohydrates', 'protein', 'cholesterol', 'sodium', 'fiber']
X_numerical = data[numerical_features].values

# Combine Features
X_combined = np.hstack([X_numerical, X_ingredients.toarray()])

# Train KNN Model
knn = NearestNeighbors(n_neighbors=3, metric='euclidean')
knn.fit(X_combined)

def recommend_recipes(input_features):
    input_numerical = np.array(input_features[:7]).reshape(1, -1)
    input_ingredients_transformed = vectorizer.transform([input_features[7]])
    input_combined = np.hstack([input_numerical, input_ingredients_transformed.toarray()])
    
    distances, indices = knn.kneighbors(input_combined)
    recommendations = data.iloc[indices[0]]
    return recommendations[['recipe_name', 'ingredients_list', 'image_url']].head(5)

# Function to truncate product name
def truncate(text, length):
    if len(text) > length:
        return text[:length] + "..."
    else:
        return text



@app.route('/recommend', methods=['POST'])
def recommend():
    if request.method == 'POST':
        data = request.json  # Get data from request body
        
        try:
            calories = float(data['calories'])
            fat = float(data['fat'])
            carbohydrates = float(data['carbohydrates'])
            protein = float(data['protein'])
            cholesterol = float(data['cholesterol'])
            sodium = float(data['sodium'])
            fiber = float(data['fiber'])
            ingredients = data['ingredients']  # Assuming this is a string like "banana,apple"
            
            input_features = [calories, fat, carbohydrates, protein, cholesterol, sodium, fiber, ingredients]
            recommendations = recommend_recipes(input_features)
            
            # Convert recommendations to a list of dictionaries
            recommendations_list = recommendations.to_dict(orient='records')
            
            # Truncate recipe names if needed
            for rec in recommendations_list:
                rec['recipe_name'] = truncate(rec['recipe_name'], 30)  # Adjust length as needed
            
            return jsonify({
                'success': True,
                'recommendations': recommendations_list
            }), 200
        
        except KeyError as e:
            return jsonify({
                'success': False,
                'error': f'Missing required field: {str(e)}'
            }), 400
        except ValueError as e:
            return jsonify({
                'success': False,
                'error': f'Invalid value: {str(e)}'
            }), 400
        except Exception as e:
            return jsonify({
                'success': False,
                'error': f'An error occurred: {str(e)}'
            }), 500

    # This line should never be reached for a POST request, but including for completeness
    return jsonify({'success': False, 'error': 'Method not allowed'}), 405

if __name__ == '__main__':
    app.run(port=8000,debug=True)
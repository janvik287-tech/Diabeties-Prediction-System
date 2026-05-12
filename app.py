from flask import Flask, render_template, request
import numpy as np
import pickle

app = Flask(__name__)

# Load model
model = pickle.load(open("model.pkl", "rb"))

@app.route('/')
def home():
    return render_template("index.html")

@app.route('/predict', methods=['POST'])
def predict():

    # Original Inputs

    pregnancies = float(request.form['Pregnancies'])

    glucose = float(request.form['Glucose'])

    bloodpressure = float(request.form['BloodPressure'])

    skinthickness = float(request.form['SkinThickness'])

    insulin = float(request.form['Insulin'])

    bmi = float(request.form['BMI'])

    dpf = float(request.form['DiabetesPedigreeFunction'])

    age = float(request.form['Age'])


    # BMI Category

    if bmi < 18.5:
        bmi_category = 0

    elif bmi < 25:
        bmi_category = 1

    elif bmi < 30:
        bmi_category = 2

    else:
        bmi_category = 3


    # Age Group

    if age < 30:
        age_group = 0

    elif age < 50:
        age_group = 1

    else:
        age_group = 2


    # Glucose Level

    if glucose < 100:
        glucose_level = 0

    elif glucose < 140:
        glucose_level = 1

    else:
        glucose_level = 2


    # Final Features

    features = [[

        pregnancies,
        glucose,
        bloodpressure,
        skinthickness,
        insulin,
        bmi,
        dpf,
        age,
        bmi_category,
        age_group,
        glucose_level

    ]]

    prediction = model.predict(features)

    if prediction[0] == 1:
        result = "High Diabetes Risk"
    else:
        result = "Low Diabetes Risk"

    return render_template(
        "index.html",
        prediction_text=result
    )

if __name__ == "__main__":
    app.run(debug=True)
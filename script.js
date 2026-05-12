// ===============================
// DIABETES PREDICTION FRONTEND JS
// ===============================

const form = document.getElementById("prediction-form");

const resultContainer =
document.getElementById("result-container");

const errorMsg =
document.getElementById("error-msg");

const tipsContainer =
document.getElementById("health-tips");

const featureContainer =
document.getElementById("feature-importance");

// ===============================
// FORM SUBMIT
// ===============================

form.addEventListener("submit", function(e){

    e.preventDefault();

    // Clear old data
    resultContainer.innerHTML = "";
    tipsContainer.innerHTML = "";
    featureContainer.innerHTML = "";

    errorMsg.classList.add("d-none");

    // ===============================
    // GET INPUT VALUES
    // ===============================

    const pregnancies =
    parseFloat(form.Pregnancies.value);

    const glucose =
    parseFloat(form.Glucose.value);

    const bloodPressure =
    parseFloat(form.BloodPressure.value);

    const skinThickness =
    parseFloat(form.SkinThickness.value);

    const insulin =
    parseFloat(form.Insulin.value);

    const bmi =
    parseFloat(form.BMI.value);

    const dpf =
    parseFloat(form.DiabetesPedigreeFunction.value);

    const age =
    parseFloat(form.Age.value);

    // ===============================
    // VALIDATION
    // ===============================

    if(
        glucose <= 0 ||
        bloodPressure <= 0 ||
        bmi <= 0 ||
        age <= 0
    ){

        errorMsg.innerHTML =
        `
        <i class="bi bi-exclamation-triangle-fill"></i>
        Please enter valid patient details.
        `;

        errorMsg.classList.remove("d-none");

        return;
    }

    // ===============================
    // SIMPLE FRONTEND PREDICTION
    // (Temporary logic)
    // ===============================

    let riskScore = 0;

    if(glucose > 140) riskScore += 3;

    if(bmi > 30) riskScore += 2;

    if(age > 45) riskScore += 2;

    if(insulin > 150) riskScore += 1;

    if(dpf > 0.5) riskScore += 1;

    if(pregnancies > 4) riskScore += 1;

    // ===============================
    // RESULT
    // ===============================

    if(riskScore >= 5){

        resultContainer.innerHTML = `

        <h3>
            <i class="bi bi-heart-pulse-fill"></i>
            High Diabetes Risk
        </h3>

        <p>
            The patient has a higher probability
            of diabetes based on the entered values.
        </p>

        <div class="mt-3">
            <span class="badge bg-danger p-2">
                Risk Score: ${riskScore}/10
            </span>
        </div>
        `;

        tipsContainer.innerHTML = `

        <h3>
            <i class="bi bi-shield-check"></i>
            Health Recommendations
        </h3>

        <ul class="feature-list">

            <li>
                Exercise regularly for at least 30 minutes
            </li>

            <li>
                Reduce sugar and processed foods
            </li>

            <li>
                Monitor glucose levels frequently
            </li>

            <li>
                Maintain healthy body weight
            </li>

            <li>
                Consult a healthcare professional
            </li>

        </ul>
        `;

    } else {

        resultContainer.innerHTML = `

        <h3>
            <i class="bi bi-check-circle-fill"></i>
            Low Diabetes Risk
        </h3>

        <p>
            The patient currently shows lower
            chances of diabetes.
        </p>

        <div class="mt-3">
            <span class="badge bg-success p-2">
                Risk Score: ${riskScore}/10
            </span>
        </div>
        `;

        tipsContainer.innerHTML = `

        <h3>
            <i class="bi bi-heart"></i>
            Healthy Lifestyle Tips
        </h3>

        <ul class="feature-list">

            <li>
                Continue balanced nutrition
            </li>

            <li>
                Stay physically active
            </li>

            <li>
                Drink sufficient water daily
            </li>

            <li>
                Maintain proper sleep schedule
            </li>

            <li>
                Regular health checkups are recommended
            </li>

        </ul>
        `;
    }

    // ===============================
    // FEATURE IMPORTANCE SECTION
    // ===============================

    featureContainer.innerHTML = `

    <h3>
        <i class="bi bi-bar-chart-fill"></i>
        Key Risk Factors
    </h3>

    <div class="mb-3">

        <label>Glucose</label>

        <div class="progress">
            <div class="progress-bar bg-danger"
                style="width:${Math.min(glucose/2,100)}%">
            </div>
        </div>

    </div>

    <div class="mb-3">

        <label>BMI</label>

        <div class="progress">
            <div class="progress-bar bg-warning"
                style="width:${Math.min(bmi*2,100)}%">
            </div>
        </div>

    </div>

    <div class="mb-3">

        <label>Age</label>

        <div class="progress">
            <div class="progress-bar bg-info"
                style="width:${Math.min(age,100)}%">
            </div>
        </div>

    </div>

    <div class="mb-3">

        <label>Insulin</label>

        <div class="progress">
            <div class="progress-bar bg-success"
                style="width:${Math.min(insulin/2,100)}%">
            </div>
        </div>

    </div>
    `;

    // ===============================
    // SMOOTH SCROLL TO RESULT
    // ===============================

    resultContainer.scrollIntoView({
        behavior:"smooth"
    });

});
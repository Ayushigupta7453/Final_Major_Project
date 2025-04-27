# model.py – final Flask API for Transit Help
from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib, os, requests, urllib3, textwrap
from bs4 import BeautifulSoup
import re
import textwrap




app = Flask(__name__)
CORS(app)

base = os.path.dirname(__file__)
vectorizer = joblib.load(os.path.join(base, "vectorizer.pkl"))
model      = joblib.load(os.path.join(base, "model.pkl"))
print("  Vectorizer & model loaded")

UA = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121 Safari/537.36"
    )
}

def fetch_html(url: str, timeout=8) -> str:
    r = requests.get(url, headers=UA, timeout=timeout, verify=False)
    r.raise_for_status()
    return r.text

def extract_title_desc(html: str, max_len: int = 800) -> str:

    soup = BeautifulSoup(html, "html.parser")

    title_tag = soup.select_one('h1.t-24.t-bold.inline')
    title = title_tag.get_text(" ", strip=True) if title_tag else ""

   
    desc_paras = soup.select(
        'article.jobs-description__container p, '
        'div.jobs-description__content p'
    )
    desc = " ".join(p.get_text(" ", strip=True) for p in desc_paras if p.get_text(strip=True))


    if not (title or desc):
        visible_text = " ".join(soup.stripped_strings)
        return textwrap.shorten(visible_text, max_len)

    combined = f"{title} {desc}".strip()
    return textwrap.shorten(combined, max_len)

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json(silent=True) or {}
    url  = data.get("url")
    content = data.get("content")

    if content:                         
        text = content
    elif url:
        try:
            html = fetch_html(url)
        except Exception as err:
            return jsonify({"error": f"Fetch failed: {err}"}), 502
        text = extract_title_desc(html) or url
    else:
        return jsonify({"error": "Provide 'url' or 'content'"}), 400
    print(text)
    print('sdfasfasd')
    X     = vectorizer.transform([text])
    pred  = model.predict(X)[0]
    prob  = float(model.predict_proba(X)[0].max())
    label = "Real" if pred == 1 else "Fake"

    return jsonify({"label": label, "confidence": prob})

def testpredict():
    text ='''Technical Lead

About the job
#HCLTech Lucknow is currently hiring for Snowflake Developer with below skill sets.


Job Description:

As a Snowpark Developer, you will be responsible for designing, developing, and optimizing data applications and pipelines using Snowflake's Snowpark framework. You will collaborate with cross-functional teams to understand business requirements and translate them into scalable and efficient data solutions. Your expertise will be crucial in ensuring that our data processing is robust, efficient, and aligned with best practices.
Key Responsibilities:

Develop and maintain data applications and pipelines using Snowflake's Snowpark.
Collaborate with data engineers, data scientists, and other stakeholders to understand data requirements and deliver solutions that meet business needs.
Optimize and tune Snowpark applications for performance and scalability.
Implement data transformation and processing logic using Snowpark's APIs and capabilities.
Ensure data quality and integrity through rigorous testing and validation processes.
Stay up-to-date with the latest Snowflake and Snowpark features and best practices.
Troubleshoot and resolve issues related to data processing and application performance.
Document technical designs, processes, and solutions for knowledge sharing and future reference.


Preferred Qualifications:

Experience with Snowflake, Snowpark and AWS cloud platform.
Knowledge of data visualization tools and techniques.
Experience with CI/CD pipelines (Jenkins) and version control systems like Github.
Familiarity with other data processing frameworks and tools.
''' 
   
    X     = vectorizer.transform([text])
    pred  = model.predict(X)[0]
    prob  = float(model.predict_proba(X)[0].max())
    label = "Real" if pred == 1 else "Fake"
    print(label)
    print('fsdofjkopisdjfoipsdjfhiosdhjfiodhsfiohsdifhiosdahoi AAAAAAAAAAAAA|||||||||||||||||||||||||||')
    

#  testpredict()


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)

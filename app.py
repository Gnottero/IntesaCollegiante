from flask import Flask, render_template, jsonify, request, session
import random

app = Flask(__name__)
app.secret_key = "cambia_questa_chiave"  # necessaria per usare sessioni

with open("parole.txt", "r", encoding="utf-8") as f:
    PAROLE = [line.strip() for line in f.readlines() if line.strip()]

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/parola", methods=["GET"])
def get_parola():
    parole_usate = session.get("parole_usate", [])

    disponibili = list(set(PAROLE) - set(parole_usate))

    if not disponibili:
        # tutte le parole sono state usate: ricomincia da capo
        parole_usate = []
        disponibili = PAROLE.copy()

    parola = random.choice(disponibili)
    parole_usate.append(parola)
    session["parole_usate"] = parole_usate

    return jsonify({"parola": parola})

@app.route("/reset_session", methods=["GET"])
def reset_session():
    session.pop("parole_usate", None)
    return "Sessione resettata"

if __name__ == "__main__":
    app.run(debug=True)

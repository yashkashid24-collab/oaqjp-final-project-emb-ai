"""Flask server for the emotion detection web application."""

from flask import Flask, render_template, request, jsonify
from EmotionDetection.emotion_detection import emotion_detector

app = Flask(__name__)


@app.route("/")
def home():
    """Render the main webpage."""
    return render_template("index.html")


@app.route("/emotionDetector", methods=["GET"])
def emotion_detector_route():
    """Analyze the emotion in the supplied text."""
    text_to_analyze = request.args.get("textToAnalyze", "").strip()

    if not text_to_analyze:
        return jsonify({"error": "Please enter some text to analyze."}), 400

    try:
        result = emotion_detector(text_to_analyze)
        return jsonify(result)
    except Exception:
        app.logger.exception("Emotion detection failed")
        return jsonify({"error": "Emotion detection service failed."}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False)

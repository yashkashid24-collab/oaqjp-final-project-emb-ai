function RunSentimentAnalysis() {
    const text = document.getElementById("textToAnalyze").value.trim();
    const output = document.getElementById("system_response");

    if (!text) {
        output.textContent = "Please enter some text to analyze.";
        return;
    }

    fetch("/emotionDetector?textToAnalyze=" + encodeURIComponent(text))
        .then(response => response.json().then(data => ({
            ok: response.ok,
            data: data
        })))
        .then(result => {
            if (!result.ok) {
                output.textContent =
                    result.data.error || "Unable to analyze the text.";
                return;
            }

            const data = result.data;
            output.textContent =
                "For the given statement, the system response is " +
                "'anger': " + data.anger +
                ", 'disgust': " + data.disgust +
                ", 'fear': " + data.fear +
                ", 'joy': " + data.joy +
                ", 'sadness': " + data.sadness +
                ". The dominant emotion is " + data.dominant_emotion + ".";
        })
        .catch(() => {
            output.textContent = "Unable to connect to the emotion detection service.";
        });
}

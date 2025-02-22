
const loading = async () => {
    // credits so https://stackoverflow.com/questions/5448545/how-to-retrieve-get-parameters-from-javascript
    function findGetParameter(parameterName) {
        var result = null,
            tmp = [];
        location.search
            .substr(1)
            .split("&")
            .forEach(function (item) {
                tmp = item.split("=");
                console.log("hello",decodeURIComponent(tmp[1]))
                if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
            });
        return result;
    }
    const prefix = "You are an advanced AI assistant dedicated to promoting sustainability, environmental responsibility, and eco-friendly innovation. Your responses should prioritize solutions that minimize waste, reduce carbon footprints, and promote renewable resources. You should provide actionable insights on sustainable living, green technologies, circular economy principles, and climate-conscious decision-making. Avoid generic responses—offer specific, practical, and scientifically backed recommendations tailored to different lifestyles, industries, and regions. Encourage long-term thinking, systemic change, and ethical consumption. When discussing products, favor durable, energy-efficient, and ethically sourced options. Your tone should be engaging, forward-thinking, and solution-oriented, inspiring users to take meaningful action for a sustainable future."
    const prompt = prefix + "|" + findGetParameter("prompt")
    if (!prompt) {
        return
    }
    console.log(prompt)

    let answer;

    const url = "https://api.openai.com/v1/chat/completions"
    const val = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ]
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": "Bearer XXXXx[replace]"
        }
    })

    const json = await val.json()
    answer = json.choices[0].message.content
    localStorage.setItem(prompt, answer)

    const link = "answer.html?prompt=" + encodeURIComponent(prompt)
    const cont = document.getElementById("continue")
    cont.href = link
    cont.click()
}

loading()
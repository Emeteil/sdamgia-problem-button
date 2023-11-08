(function () {
    'use strict';

    var probViews = document.querySelectorAll('div.prob_view');

    probViews.forEach(async function (probView) {
        var commentsId = probView.querySelector('div[id^="comments"]');
        var decisionLink = probView.querySelector('a[href^="/problem?id="]');
        if (commentsId) {
            var id = commentsId.id.replace("comments", "");
            var answerLink = document.createElement('a');
            answerLink.href = window.location.href.split(".")[0] + '.sdamgia.ru/problem?id=' + id;
            answerLink.style = "margin-left: 4px;";
            answerLink.innerText = id;
            if (!decisionLink) {
                var probNums = probView.querySelector('span.prob_nums');
                probNums.innerText = probNums.innerText + " №";
                decisionLink = probNums.parentNode.insertBefore(answerLink, probNums.nextSibling);
            }
            try {
                var response = await fetch(answerLink.href);
                var data = await response.text();
                var answer = data.match(/Ответ:?<\/span>.*\./)[0].replace("<\/span>", "").split("<\/")[0].split("Ответ")[1];
                probView.insertAdjacentHTML("beforeEnd", `<details style="font-weight: normal; margin-left: 4px;"> <summary>Ответ</summary> <div style="position: absolute; transform: translate(47px, -19.2px);">${answer}</div> </details>`);
                probView.style = "margin-bottom: 15px;";
            } catch (e) {
                console.error(e);
            }
        }
    });
})();
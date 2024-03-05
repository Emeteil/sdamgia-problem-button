// ==UserScript==
// @name Problem button on sdamgia.ru
// @version 1.5
// @author Emeteil
// @homepageURL https://github.com/Emeteil/sdamgia-problem-button
// @supportURL https://github.com/Emeteil/sdamgia-problem-button/issues
// @downloadURL https://raw.githubusercontent.com/Emeteil/sdamgia-problem-button/main/tampermonkey/script.js
// @updateURL https://raw.githubusercontent.com/Emeteil/sdamgia-problem-button/main/tampermonkey/script.js
// @description Adds a problem button where there isn't one.
// @icon https://math-ege.sdamgia.ru/icon.svg
// @match https://*.sdamgia.ru/test*
// ==/UserScript==

const hiddenAnswer = true;

(function () {
    'use strict';

    var probViews = document.querySelectorAll('div.prob_view');

    probViews.forEach(async function (probView) {
        var commentsId = probView.querySelector('div[id^="comments"]'); // Stopped working as of 05.03.2024!
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
                probNums.parentNode.insertBefore(answerLink, probNums.nextSibling);
            }
        }
        try {
            if (hiddenAnswer) {
                var response = await fetch(decisionLink ? decisionLink.href : answerLink.href);
                var data = await response.text();
                var answer = data.match(/>Ответ:?.*<\//)[0].replace("<\/span>", "").split("<\/")[0].split(">Ответ")[1];
                probView.insertAdjacentHTML("beforeEnd", `<details style="font-weight: normal; margin-left: 4px;"> <summary>Ответ</summary> <div style="position: absolute; transform: translate(47px, -19.2px);">${answer}</div> </details>`);
                probView.style = "margin-bottom: 15px;";
            }
        } catch (e) {
            console.error(e);
        }
    });
})();
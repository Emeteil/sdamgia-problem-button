// ==UserScript==
// @name Problem button on sdamgia.ru
// @version 1.0
// @author Emeteil
// @description Adds a problem button where there isn't one.
// @match https://*.sdamgia.ru/test*
// ==/UserScript==

(function() {
    'use strict';

    var probViews = document.querySelectorAll('div.prob_view');

    probViews.forEach(function(probView) {
        var commentsId = probView.querySelector('div[id^="comments"]');
        var decisionLink = probView.querySelector('a[href^="/problem?id="]');
        if (commentsId && !decisionLink) {
            var id = commentsId.id.replace("comments", "");
            var answerLink = document.createElement('a');
            answerLink.href = window.location.href.split(".")[0] + '.sdamgia.ru/problem?id=' + id;
            answerLink.innerText = id;
            var probNums = probView.querySelector('span.prob_nums');
            probNums.innerText = probNums.innerText + " № ";
            probNums.parentNode.insertBefore(answerLink, probNums.nextSibling);
        }
    });
})();
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
            answerLink.style = "margin-left: 4px;";
            answerLink.innerText = id;
            var probNums = probView.querySelector('span.prob_nums');
            probNums.innerText = probNums.innerText + " №";
            probNums.parentNode.insertBefore(answerLink, probNums.nextSibling);
        }
    });
})();
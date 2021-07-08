
function getUserTemplate(node) {
    chrome.storage.sync.get("jira_template", function (data) {
        if (data.jira_template) {
            if (data.jira_template == "") {
                node.innerHTML = DOMPurify.sanitize('Setup A Template In The Toolbar!');
                return;
            }

            let clean = DOMPurify.sanitize(data.jira_template);
            node.innerHTML = clean;
            return;
        }

        node.innerHTML = DOMPurify.sanitize('Setup A Template In The Toolbar!');
    });
}

function fillHTML(node) {
    getUserTemplate(node);
}

function getParents(elem) {
    var parents = [];
    while (elem.parentNode && elem.parentNode.nodeName.toLowerCase() != 'body') {
        elem = elem.parentNode;
        parents.push(elem);
    }
    return parents;
}

// Callback function to execute when mutations are observed
var callback = function (mutationsList) {

    for (var mutation of mutationsList) {
        if (mutation.type === 'childList') {
            var nodes = mutation.addedNodes;

            if (nodes.length > 0) {
                if (nodes[0].matches("p")) {
                    var editor = nodes[0];
                    var parents = getParents(editor);
                    var shouldInject = true;

                    parents.forEach((nodeFamily) => {
                        var testid = nodeFamily.dataset.testId;
                        if (testid == "issue.activity.comment") {
                            shouldInject = false;
                        }
                    });

                    if (editor.innerHTML.indexOf("placeholder") !== -1 && shouldInject) {
                        console.log("Filling In Template");
                        fillHTML(editor);
                    }

                }
            }

        }
    }
};

// Create an observer instance linked to the callback function
var observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
var targetNode = document.querySelector('div[data-test-id="issue.views.issue-details.issue-layout.left-most-column"]');
observer.observe(targetNode, {
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true
});
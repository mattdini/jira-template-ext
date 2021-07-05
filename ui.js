
window.onload = function () {
    chrome.storage.sync.get("jira_template", function (data) {
        if (data.jira_template) {
            document.getElementById('user_template').value = data.jira_template;
        } else {
            document.getElementById('user_template').value = "Setup A Template In The Toolbar!"
        }
    });
}




function save() {
    chrome.storage.sync.set({ "jira_template": document.getElementById('user_template').value }, function () {
        console.log("Data was saved.");
    });

    document.getElementById('savebutton').value = "Saved";
    window.close();
}

document.getElementById('savebutton').onclick = save;

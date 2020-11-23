const FORM_POST_URL = "https://hook.integromat.com/fnfjacm07yb3p4angtplam32nbr6aevp"
function sendFormData(form) {
    var postUrl = FORM_POST_URL;

    var formData = new FormData(form);
    
    var data = {};
    data["timestamp"] = new Date();
    formData.forEach((value, key) => {
        data[key] = value
    });

    var response = fetch(postUrl, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)    
    });

    return response;
};

var form = $("#newsletter-subscription-form");
var spinner = form.find("button > .spinner");
var buttonLabel = form.find("span");

const subscribedLabel = "Subscribed!"
function toggleFormDisabled(previousContent) {
    var inputs = form.children("input");
    var button = form.children("button");

    if (inputs.attr("disabled")) {
        inputs.removeAttr("disabled");
    } else {
        inputs.attr("disabled", "disabled")
    }

    if (button.attr("disabled")) {
        button.removeAttr("disabled");
    } else {
        button.attr("disabled", "disabled");
    }

    var text = buttonLabel.text()
    if (text.trim() != subscribedLabel) {
        buttonLabel.text(subscribedLabel);

        if (previousContent) {
            window.setInterval(() => {
                buttonLabel.text(previousContent);
            }, 1000);
        }
    } 
};

form.on("submit", function(event) {
    event.preventDefault();

    var previousContent;
    previousContent = buttonLabel.text(); 

    toggleFormDisabled(); 
    var request = sendFormData(this)

    buttonLabel.text("Subscribing...")
    
    request.then(
        () => {},
        error => {
            console.log(error);
        }
    ).finally(() => {
            toggleFormDisabled(previousContent);
    });
});


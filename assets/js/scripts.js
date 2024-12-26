let form = document.querySelector(".form");
let btnForm = document.querySelector(".form__btn");
btnForm.addEventListener("click", function (event) {
    event.preventDefault();
    let valid = true;

    let formName = document.querySelector(".form__name");
    let formEmail = document.querySelector(".form__email");
    let formSubject = document.querySelector(".form__subject");
    let hiddenInput = document.getElementById("_wpnonce");
    let formComments = document.querySelector(".form__comments");

    if (!formName.value.match(/^[a-zA-Z\s]+$/) || !formName.value) {
        if (document.getElementById(`${formName.id}_valid`)) {
            document.getElementById(`${formName.id}_valid`).remove();
        }
        if (document.getElementById(`${formName.id}_invalid`)) {
            document.getElementById(`${formName.id}_invalid`).remove();
        }
        if (!formName.classList.contains("is-invalid")) {
            let div = document.createElement("div");
            div.className = "invalid-feedback";
            if (!formName.value) {
                div.innerHTML = "Value is empty.";
            } else {
                div.innerHTML = "Invalid Name.";
            }
            div.setAttribute("id", `${formName.id}_invalid`);
            formName.classList.remove("is-valid");
            formName.classList.add("is-invalid");
            formName.insertAdjacentHTML("afterEnd", div.outerHTML);
        }
        valid = false;
    } else {
        if (document.getElementById(`${formName.id}_valid`)) {
            document.getElementById(`${formName.id}_valid`).remove();
        }
        if (document.getElementById(`${formName.id}_invalid`)) {
            document.getElementById(`${formName.id}_invalid`).remove();
        }
        let div = document.createElement("div");
        div.className = "valid-feedback";
        div.innerHTML = "Name is valid.";
        div.setAttribute("id", `${formName.id}_valid`);
        formName.classList.remove("is-invalid");
        formName.classList.add("is-valid");
        formName.insertAdjacentHTML("afterEnd", div.outerHTML);
    }

    if (
        !formEmail.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) ||
        !formEmail.value
    ) {
        if (document.getElementById(`${formEmail.id}_valid`)) {
            document.getElementById(`${formEmail.id}_valid`).remove();
        }
        if (document.getElementById(`${formEmail.id}_invalid`)) {
            document.getElementById(`${formEmail.id}_invalid`).remove();
        }
        if (!formEmail.classList.contains("is-invalid")) {
            let div = document.createElement("div");
            div.className = "invalid-feedback";
            if (!formEmail.value) {
                div.innerHTML = "Value is empty.";
            } else {
                div.innerHTML = "Invalid Email.";
            }
            div.setAttribute("id", `${formEmail.id}_invalid`);
            formEmail.classList.remove("is-valid");
            formEmail.classList.add("is-invalid");
            formEmail.insertAdjacentHTML("afterEnd", div.outerHTML);
        }
        valid = false;
    } else {
        if (document.getElementById(`${formEmail.id}_valid`)) {
            document.getElementById(`${formEmail.id}_valid`).remove();
        }
        if (document.getElementById(`${formEmail.id}_invalid`)) {
            document.getElementById(`${formEmail.id}_invalid`).remove();
        }
        let div = document.createElement("div");
        div.className = "valid-feedback";
        div.innerHTML = "Email is valid.";
        div.setAttribute("id", `${formEmail.id}_valid`);
        formEmail.classList.remove("is-invalid");
        formEmail.classList.add("is-valid");
        formEmail.insertAdjacentHTML("afterEnd", div.outerHTML);
    }

    if (!formSubject.value.match(/^[a-zA-Z\s]+$/) || !formEmail.value) {
        if (document.getElementById(`${formSubject.id}_valid`)) {
            document.getElementById(`${formSubject.id}_valid`).remove();
        }
        if (document.getElementById(`${formSubject.id}_invalid`)) {
            document.getElementById(`${formSubject.id}_invalid`).remove();
        }
        if (!formSubject.classList.contains("is-invalid")) {
            let div = document.createElement("div");
            div.className = "invalid-feedback";
            if (!formSubject.value) {
                div.innerHTML = "Value is empty.";
            } else {
                div.innerHTML = "Invalid Title.";
            }
            div.setAttribute("id", `${formSubject.id}_invalid`);
            formSubject.classList.remove("is-valid");
            formSubject.classList.add("is-invalid");
            formSubject.insertAdjacentHTML("afterEnd", div.outerHTML);
        }
        valid = false;
    } else {
        if (document.getElementById(`${formSubject.id}_valid`)) {
            document.getElementById(`${formSubject.id}_valid`).remove();
        }
        if (document.getElementById(`${formSubject.id}_invalid`)) {
            document.getElementById(`${formSubject.id}_invalid`).remove();
        }
        let div = document.createElement("div");
        div.className = "valid-feedback";
        div.innerHTML = "Title is valid.";
        div.setAttribute("id", `${formSubject.id}_valid`);
        formSubject.classList.remove("is-invalid");
        formSubject.classList.add("is-valid");
        formSubject.insertAdjacentHTML("afterEnd", div.outerHTML);
    }

    if (valid) {
        jQuery(document).ready(function ($) {
            var data = {
                action: "feedback_action",
                form_nonce: hiddenInput.value,
                form_name: formName.value,
                form_email: formEmail.value,
                form_subject: formSubject.value,
                form_comments: formComments.value,
            };
            let jqRequest = jQuery.post(feedback_object.ajaxurl, data);

            jqRequest.done(function (response) {
                if (document.getElementById(`${form.id}_danger`)) {
                    document.getElementById(`${form.id}_danger`).remove();
                }
                if (document.getElementById(`${form.id}_success`)) {
                    document.getElementById(`${form.id}_success`).remove();
                }
                let div = document.createElement("div");
                div.className = "alert alert-success mb-3";
                div.innerHTML = "Your message has been sent.";
                div.setAttribute("id", `${form.id}_success`);
                form.insertAdjacentHTML("beforeBegin", div.outerHTML);
            });
            jqRequest.fail(function (response) {
                let resp = JSON.parse(response.responseText);
                let message = resp.data.message;
                if (document.getElementById(`${form.id}_danger`)) {
                    document.getElementById(`${form.id}_danger`).remove();
                }
                if (document.getElementById(`${form.id}_success`)) {
                    document.getElementById(`${form.id}_success`).remove();
                }
                let div = document.createElement("div");
                div.className = "alert alert-danger mb-3";
                div.innerHTML = `Error.\nResponse of server: ${message}.`;
                div.setAttribute("id", `${form.id}_danger`);
                form.insertAdjacentHTML("beforeBegin", div.outerHTML);
            });
        });
    }
});

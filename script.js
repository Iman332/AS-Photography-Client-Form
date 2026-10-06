const form = document.getElementById("photographyForm");

const formSteps =
    document.querySelectorAll(".form-step");

const nextButtons =
    document.querySelectorAll(".next-button");

const backButtons =
    document.querySelectorAll(".back-button");

const progressSteps =
    document.querySelectorAll(".progress-step");

const progressFill =
    document.getElementById("progressFill");

const successMessage =
    document.getElementById("successMessage");

const progressContainer =
    document.querySelector(".progress-container");

let currentStep = 0;


function showStep(stepNumber) {

    formSteps.forEach((step, index) => {
        step.classList.toggle(
            "active",
            index === stepNumber
        );
    });

    progressSteps.forEach(
        (progressStep, index) => {

            progressStep.classList.toggle(
                "active",
                index <= stepNumber
            );
        }
    );

    const percentage =
        (stepNumber /
            (formSteps.length - 1)) *
        100;

    progressFill.style.width =
        percentage + "%";

    document
        .getElementById("client-form")
        .scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
}


function validateCurrentStep() {

    const currentInputs =
        formSteps[currentStep]
            .querySelectorAll(
                "input[required], select[required], textarea[required]"
            );

    for (const input of currentInputs) {

        if (!input.checkValidity()) {

            input.reportValidity();

            return false;
        }
    }

    return true;
}


nextButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            if (!validateCurrentStep()) {
                return;
            }

            if (
                currentStep <
                formSteps.length - 1
            ) {

                currentStep++;

                showStep(currentStep);
            }
        }
    );

});


backButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            if (currentStep > 0) {

                currentStep--;

                showStep(currentStep);
            }
        }
    );

});


form.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        if (!validateCurrentStep()) {
            return;
        }

        const formData =
            new FormData(form);

        const data =
            Object.fromEntries(
                formData.entries()
            );

        const deliverables =
            Array.from(
                document.querySelectorAll(
                    'input[name="deliverables"]:checked'
                )
            ).map(
                checkbox =>
                    checkbox.value
            );

        data.deliverables =
            deliverables;

        console.log(
            "AS Photography Inquiry:",
            data
        );

        form.style.display =
            "none";

        progressContainer.style.display =
            "none";

        successMessage.classList.add(
            "active"
        );

        document
            .getElementById("client-form")
            .scrollIntoView({
                behavior: "smooth"
            });
    }
);


showStep(currentStep);

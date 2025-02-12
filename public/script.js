document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('estimateForm');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const progress = document.getElementById('progress');
    const progressBar = document.createElement('div');

    progress.appendChild(progressBar);

    let currentStep = 0;
    const steps = [
        { question: "What type of roof do you need?", options: ["Shingle", "Tile", "Metal"], priceMultiplier: [1, 1.5, 2] },
        { question: "Size of the roof?", options: ["Small", "Medium", "Large"], priceMultiplier: [1, 1.5, 2] },
        { question: "Installation complexity?", options: ["Easy", "Moderate", "Complex"], priceMultiplier: [1, 1.2, 1.5] }
    ];

    function showStep(step) {
        form.innerHTML = '';
        const stepData = steps[step];
        
        const h2 = document.createElement('h2');
        h2.textContent = stepData.question;
        form.appendChild(h2);

        stepData.options.forEach((option, index) => {
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = 'step-' + step;
            radio.value = option;
            radio.id = 'option-' + index;
            form.appendChild(radio);

            const label = document.createElement('label');
            label.htmlFor = 'option-' + index;
            label.textContent = option;
            form.appendChild(label);
            form.appendChild(document.createElement('br'));
        });

        progressBar.style.width = `${((step + 1) / steps.length) * 100}%`;

        if (step === 0) {
            prevBtn.style.display = 'none';
        } else {
            prevBtn.style.display = 'inline';
        }

        if (step === steps.length - 1) {
            nextBtn.textContent = 'Get Estimate';
        } else {
            nextBtn.textContent = 'Next';
        }
    }

    nextBtn.addEventListener('click', () => {
        if (currentStep < steps.length - 1) {
            currentStep++;
            showStep(currentStep);
        } else {
            let totalPrice = 1000; // Base price
            for (let i = 0; i < steps.length; i++) {
                const selected = document.querySelector('input[name="step-' + i + '"]:checked');
                if (selected) {
                    const index = steps[i].options.indexOf(selected.value);
                    totalPrice *= steps[i].priceMultiplier[index];
                }
            }
            alert(`Estimated Price Range: $${Math.round(totalPrice)} - $${Math.round(totalPrice * 1.2)}`);
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentStep > 0) {
            currentStep--;
            showStep(currentStep);
        }
    });

    showStep(currentStep);
});
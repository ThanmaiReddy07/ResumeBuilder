// Function to dynamically add Education fields
function addEducation() {
    let eduDiv = document.createElement("div");
    eduDiv.innerHTML = `
        <input type="text" placeholder="Degree / Course">
        <input type="text" placeholder="Institution">
        <input type="text" placeholder="Year of Completion">
    `;
    document.getElementById("educationInputs").appendChild(eduDiv);
}

// Function to dynamically add Experience fields
function addExperience() {
    let expDiv = document.createElement("div");
    expDiv.innerHTML = `
        <input type="text" placeholder="Job Title">
        <input type="text" placeholder="Company">
        <input type="text" placeholder="Years of Experience">
    `;
    document.getElementById("experienceInputs").appendChild(expDiv);
}

// Function to update the progress bar based on form completion
function updateProgressBar() {
    let inputs = document.querySelectorAll("input, textarea");
    let filledCount = 0;

    inputs.forEach(input => {
        if (input.value.trim() !== "") {
            filledCount++;
        }
    });

    let progress = (filledCount / inputs.length) * 100;
    document.getElementById("progressBar").style.width = progress + "%";
}

// Attach event listeners to form fields for real-time progress tracking
document.querySelectorAll("input, textarea").forEach(input => {
    input.addEventListener("input", updateProgressBar);
});

// Function to generate resume preview with all fields, including Education, Experience & Skills
document.getElementById("generateResume").addEventListener("click", function() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let summary = document.getElementById("summary").value;

    document.getElementById("previewName").innerText = name;
    document.getElementById("previewEmail").innerText = email;
    document.getElementById("previewPhone").innerText = phone;
    document.getElementById("previewSummary").innerText = summary;

    // Capture selected skills
    let selectedSkills = document.querySelectorAll("#skillOptions input:checked");
    let previewSkills = document.getElementById("previewSkills");
    previewSkills.innerHTML = ""; // Clear previous entries
    selectedSkills.forEach(skill => {
        let li = document.createElement("li");
        li.innerText = skill.value;
        previewSkills.appendChild(li);
    });

    // Update Education Section
    let educationEntries = document.querySelectorAll("#educationInputs div");
    let previewEducation = document.getElementById("previewEducation");
    previewEducation.innerHTML = ""; // Clear previous entries
    educationEntries.forEach(entry => {
        let inputs = entry.querySelectorAll("input");
        if (inputs.length === 3) {
            let degree = inputs[0].value;
            let institution = inputs[1].value;
            let year = inputs[2].value;
            if (degree && institution && year) {
                let li = document.createElement("li");
                li.innerText = `${degree} at ${institution} (${year})`;
                previewEducation.appendChild(li);
            }
        }
    });

    // Update Experience Section
    let experienceEntries = document.querySelectorAll("#experienceInputs div");
    let previewExperience = document.getElementById("previewExperience");
    previewExperience.innerHTML = ""; // Clear previous entries
    experienceEntries.forEach(entry => {
        let inputs = entry.querySelectorAll("input");
        if (inputs.length === 3) {
            let jobTitle = inputs[0].value;
            let company = inputs[1].value;
            let years = inputs[2].value;
            if (jobTitle && company && years) {
                let li = document.createElement("li");
                li.innerText = `${jobTitle} at ${company} (${years} years)`;
                previewExperience.appendChild(li);
            }
        }
    });
});

// Function to Download Resume as PDF
document.getElementById("downloadResume").addEventListener("click", function() {
    const { jsPDF } = window.jspdf;
    let pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
    });

    html2canvas(document.getElementById("resumePreview"), {backgroundColor: "#ffffff"}).then(canvas => {
        let imgData = canvas.toDataURL("image/png");
        pdf.addImage(imgData, "PNG", 10, 10, 190, 0); // Adjust for proper fit

        // Ensure skills are captured correctly
        let skillsText = "";
        document.querySelectorAll("#previewSkills li").forEach(skill => {
            skillsText += skill.innerText + ", ";
        });

        // Add skills manually to PDF
        if (skillsText !== "") {
            pdf.text(10, 100, "Skills: " + skillsText.slice(0, -2));
        }

        pdf.save("Resume.pdf");
    });
});
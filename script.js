
// ========================================
// THE HONOURED ONE - PORTFOLIO JAVASCRIPT
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    fetch("data.json")
        .then(function (response) {

            if (!response.ok) {
                throw new Error("Unable to fetch portfolio data.");
            }

            return response.json();

        })
        .then(function (data) {

            renderPortfolio(data);

            document.getElementById("loading").hidden = true;
            document.getElementById("portfolio").hidden = false;

        })
        .catch(function (error) {

            console.error("Portfolio loading error:", error);

            document.getElementById("loading").hidden = true;
            document.getElementById("errorMessage").hidden = false;

        });

});


// ========================================
// RENDER PORTFOLIO
// ========================================

function renderPortfolio(data) {

    const personal = data.personal;

    // Navbar
    document.getElementById("navName").textContent = personal.name;

    // Hero
    document.getElementById("heroName").textContent = personal.name;
    document.getElementById("heroTitle").textContent = personal.title;
    document.getElementById("heroIntro").textContent = personal.introduction;
    document.getElementById("heroGoal").textContent = personal.careerGoal;
    document.getElementById("status").textContent = personal.status;

    document.getElementById("profileImage").src = personal.profileImage;
    document.getElementById("aboutImage").src = personal.aboutImage;

    document.getElementById("courseTag").textContent = data.education[0].course;
    document.getElementById("yearTag").textContent = data.education[0].semester;

    document.getElementById("resumeButton").href = personal.resume;

    // About
    document.getElementById("aboutTitle").textContent = data.about.title;
    document.getElementById("aboutDescription").textContent = data.about.description;
    document.getElementById("aboutObjective").textContent = data.about.objective;

    renderAboutInfo(personal);

    // Skills
    renderSkills(data.skills);

    // Projects
    renderProjects(data.projects);

    // Education
    renderEducation(data.education);

    // Certifications
    renderCertifications(data.certifications);

    // Contact
    renderContact(personal);

    // Social Links
    renderSocialLinks(data.socialLinks);

    // Footer
    document.getElementById("footerName").textContent = personal.name;
    document.getElementById("footerText").textContent = data.footer.description;

    document.getElementById("copyrightText").textContent =
        "© " + new Date().getFullYear() + " " + personal.name +
        ". All Rights Reserved.";

}


// ========================================
// ABOUT INFORMATION
// ========================================

function renderAboutInfo(personal) {

    const aboutInfo = document.getElementById("aboutInfo");

    aboutInfo.innerHTML = `
        <div class="info-item">
            <strong><i class="bi bi-person"></i> Name</strong>
            ${escapeHTML(personal.name)}
        </div>

        <div class="info-item">
            <strong><i class="bi bi-envelope"></i> Email</strong>
            ${escapeHTML(personal.email)}
        </div>

        <div class="info-item">
            <strong><i class="bi bi-telephone"></i> Phone</strong>
            ${escapeHTML(personal.phone)}
        </div>

        <div class="info-item">
            <strong><i class="bi bi-geo-alt"></i> Location</strong>
            ${escapeHTML(personal.location)}
        </div>
    `;

}


// ========================================
// SKILLS
// ========================================

function renderSkills(skills) {

    const container = document.getElementById("skillsContainer");

    container.innerHTML = "";

    skills.forEach(function (skill) {

        const skillCard = document.createElement("div");

        skillCard.className = "col-sm-6 col-lg-4";

        skillCard.innerHTML = `
            <div class="anime-card skill-card">

                <div class="skill-icon">
                    <i class="${escapeHTML(skill.icon)}"></i>
                </div>

                <h3>${escapeHTML(skill.name)}</h3>

                <div class="skill-bar">
                    <div class="skill-progress"
                         style="width: ${skill.level}%">
                    </div>
                </div>

                <p>${escapeHTML(skill.description)}</p>

            </div>
        `;

        container.appendChild(skillCard);

    });

}


// ========================================
// PROJECTS
// ========================================

function renderProjects(projects) {

    const container = document.getElementById("projectsContainer");

    container.innerHTML = "";

    projects.forEach(function (project) {

        const projectCard = document.createElement("div");

        projectCard.className = "col-md-6 col-lg-4";

        const technologies = project.technologies.map(function (tech) {
            return `<span>${escapeHTML(tech)}</span>`;
        }).join("");

        projectCard.innerHTML = `
            <div class="anime-card project-card">

                <div class="project-image-wrap">
                    <img src="${escapeHTML(project.image)}"
                         alt="${escapeHTML(project.name)}"
                         class="project-image"
                         loading="lazy">
                </div>

                <div class="project-content">

                    <h3>${escapeHTML(project.name)}</h3>

                    <p>${escapeHTML(project.description)}</p>

                    <div class="tech-tags">
                        ${technologies}
                    </div>

                    <a href="${escapeHTML(project.link)}"
                       class="project-link"
                       target="_blank"
                       rel="noopener">

                        View Project
                        <i class="bi bi-arrow-up-right"></i>

                    </a>

                </div>

            </div>
        `;

        container.appendChild(projectCard);

    });

}


// ========================================
// EDUCATION
// ========================================

function renderEducation(education) {

    const container = document.getElementById("educationContainer");

    container.innerHTML = "";

    education.forEach(function (item) {

        const educationItem = document.createElement("div");

        educationItem.className = "timeline-item";

        educationItem.innerHTML = `
            <span class="timeline-date">
                ${escapeHTML(item.duration)}
            </span>

            <h3>${escapeHTML(item.course)}</h3>

            <p><strong>${escapeHTML(item.college)}</strong></p>

            <p>${escapeHTML(item.details)}</p>

            <p>
                <i class="bi bi-award"></i>
                ${escapeHTML(item.semester)}
            </p>
        `;

        container.appendChild(educationItem);

    });

}


// ========================================
// CERTIFICATIONS
// ========================================

function renderCertifications(certifications) {

    const container = document.getElementById("certificationsContainer");

    container.innerHTML = "";

    certifications.forEach(function (certificate) {

        const certificateCard = document.createElement("div");

        certificateCard.className = "col-md-6 col-lg-4";

        certificateCard.innerHTML = `
            <div class="anime-card certificate-card">

                <div class="certificate-icon">
                    <i class="bi bi-patch-check-fill"></i>
                </div>

                <h3>${escapeHTML(certificate.name)}</h3>

                <p>${escapeHTML(certificate.issuer)}</p>

                <p>${escapeHTML(certificate.year)}</p>

                <a href="${escapeHTML(certificate.link)}"
                   class="certificate-link"
                   target="_blank"
                   rel="noopener">

                    View Certificate
                    <i class="bi bi-arrow-up-right"></i>

                </a>

            </div>
        `;

        container.appendChild(certificateCard);

    });

}


// ========================================
// CONTACT INFORMATION
// ========================================

function renderContact(personal) {

    const container = document.getElementById("contactInfo");

    container.innerHTML = `
        <div class="contact-item">
            <i class="bi bi-envelope-fill"></i>
            <div>
                <strong>Email</strong>
                <span>${escapeHTML(personal.email)}</span>
            </div>
        </div>

        <div class="contact-item">
            <i class="bi bi-telephone-fill"></i>
            <div>
                <strong>Phone</strong>
                <span>${escapeHTML(personal.phone)}</span>
            </div>
        </div>

        <div class="contact-item">
            <i class="bi bi-geo-alt-fill"></i>
            <div>
                <strong>Location</strong>
                <span>${escapeHTML(personal.location)}</span>
            </div>
        </div>
    `;

}


// ========================================
// SOCIAL MEDIA LINKS
// ========================================

function renderSocialLinks(socialLinks) {

    const socialHTML = socialLinks.map(function (social) {

        return `
            <a href="${escapeHTML(social.url)}"
               target="_blank"
               rel="noopener"
               aria-label="${escapeHTML(social.name)}">

                <i class="${escapeHTML(social.icon)}"></i>

            </a>
        `;

    }).join("");

    document.getElementById("heroSocial").innerHTML = socialHTML;
    document.getElementById("contactSocial").innerHTML = socialHTML;
    document.getElementById("footerSocial").innerHTML = socialHTML;

}


// ========================================
// CONTACT FORM VALIDATION
// ========================================

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const name = document.getElementById("contactName");
    const email = document.getElementById("contactEmail");
    const subject = document.getElementById("contactSubject");
    const message = document.getElementById("contactMessage");

    const formMessage = document.getElementById("formMessage");

    let isValid = true;

    // Validate name
    if (name.value.trim().length < 2) {
        name.classList.add("is-invalid");
        isValid = false;
    } else {
        name.classList.remove("is-invalid");
    }

    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.value.trim())) {
        email.classList.add("is-invalid");
        isValid = false;
    } else {
        email.classList.remove("is-invalid");
    }

    // Validate subject
    if (subject.value.trim() === "") {
        subject.classList.add("is-invalid");
        isValid = false;
    } else {
        subject.classList.remove("is-invalid");
    }

    // Validate message
    if (message.value.trim().length < 10) {
        message.classList.add("is-invalid");
        isValid = false;
    } else {
        message.classList.remove("is-invalid");
    }

    if (!isValid) {

        formMessage.style.color = "#ff6b8a";
        formMessage.textContent = "Please correct the errors in the form.";

        return;

    }

    formMessage.style.color = "#48ff9b";

    formMessage.textContent =
        "Validation successful! This demo form does not send messages yet.";

    contactForm.reset();

    contactForm.querySelectorAll(".is-invalid").forEach(function (field) {
        field.classList.remove("is-invalid");
    });

});


// ========================================
// HTML ESCAPING
// Helps safely display text from JSON
// ========================================

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}

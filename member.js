function skillsMember() {
    var member = document.getElementById("member");
    var skills = document.getElementById("skills");
    var projects = document.getElementById("projects");
    var memberBtn = document.getElementById("memberBtn");
    var skillsBtn = document.getElementById("skillsBtn");
    var projectsBtn = document.getElementById("projectsBtn");

    member.style.display = "block";
    skills.style.display = "none";
    projects.style.display = "none";

    memberBtn.style.backgroundColor = "#f9f9f9";
    skillsBtn.style.backgroundColor = "#ffffff";
    projectsBtn.style.backgroundColor = "#ffffff";
}
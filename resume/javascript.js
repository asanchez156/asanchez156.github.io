var labelsTrans = new Map ([
    [ "es" , {
        "language" : "Español",
        "lg": "es",
        "personalData": "Perfil",
        "fullName" : "Nombre",
        "birthDate" : "Año de Nacimiento",
        "country" : "País",
        "cityTown" : "Ciudad",
        "professionalExperience" : "Experiencia Profesional",
        "company" : "Empresa",
        "occupation" : "Cargo",
        "educationalBackground" : "Formación Academica",
        "complementaryTraining" : "Formación Complementaria",
        "computingSkills" : "Habilidades Informáticas",
        "motherTonge" : "Idioma materno",
        "foreignLanguage": "Idioma extranjero",
        "level" : "Nivel",
        "coursing" : "Cursando",
        "certificate" : "Certificado"
    }],
    [ "en" , {
        "language" : "English",
        "lg": "en",
        "personalData": "Profile",
        "fullName" : "Name",
        "birthDate" : "Birthdate",
        "country" : "Country",
        "cityTown" : "City",
        "professionalExperience" : "Professional Experience",
        "company" : "Company",
        "occupation" : "Occupation",
        "educationalBackground" : "Educational Background",
        "complementaryTraining" : "Complementary Training",
        "computingSkills" : "Computing Skills",
        "motherTonge" : "Mother tonge",
        "foreignLanguage": "Foreign language",
        "level" : "Level",
        "coursing" : "Coursing",
        "certificate" : "Certificate"
    }]
]);

const COMMON = "common";
const ES = "es";
const EN = "en";

var languages = [ES, EN];
var resume = new Map([]);
var name = "";

function mapResume(data) {
    Object.keys(data).forEach(key => {
        resume.set(key, data[key]);
    });
}

function loadLabels(lang) {
    var langLabel = labelsTrans.get(lang);
    $("#labelPersonalData").text(langLabel.personalData);
    $("#labelFullName").text(langLabel.fullName);
    //$("#labelCountry").text(langLabel.country);
    //$("#labelBirthDate").text(langLabel.birthDate);
    //$("#labelCountry").text(langLabel.country);
    //$("#labelCityTown").text(langLabel.cityTown);
    $("#labelProfessionalExperience").text(langLabel.professionalExperience);
    $("#labelCompany").text(langLabel.company);
    $("#labelOccupation").text(langLabel.occupation);
    $("#labelEducationalBackground").text(langLabel.educationalBackground);
    $("#labelComplementaryTraining").text(langLabel.complementaryTraining);
    $("#labelComputingSkills").text(langLabel.computingSkills);
    $("#labelMotherTonge").text(langLabel.motherTonge);
    $("#labelForeignLanguage").text(langLabel.foreignLanguage);
    $("#labelLevel").text(langLabel.level);
    $("#labelCoursing").text(langLabel.coursing);
    $("#labelCertificate").text(langLabel.certificate);
}

function loadPersonalInfo(data, langLabel) {

    $("#titleEmail").html(`<div onclick="window.location='mailto:${data.contactInfo.email.address}';">${data.contactInfo.email.address}</div>`);
    //$("#titleWebsite").html(`<div onclick="window.open('${data.contactInfo.webSite.url}')">${data.contactInfo.webSite.url}</div>`);
    //$("#birthDate").text(data.birthDate);
    //$("#country").text(data.country);
    //$("#cityTown").text(data.cityTown);
    $("#cvPicture").html(`<img class="cv-photo" src="images/cv.png" alt="${name}"/>`);
}

function loadProfessionalExperience(data, langLabel) {
    $("#professionalExperience").html("");
    data.forEach((item, index, arr) => {
        $("#professionalExperience").append(
            `<div class="job">
				<h2><strong>${item.startDate} / ${item.endDate}</strong></h2>
				<h3><strong>${langLabel.company}: </strong>${item.company}</h3>
				<h3><strong>${langLabel.occupation}: </strong>${item.occupation}${item.description ? ` - ${item.description}` : ''}</h3>
			</div>`);
    });
}

function loadEducationalBackground(data, langLabel) {
    $("#educationalBackground").html("");
    data.forEach(function(item, index, arr){
        $("#educationalBackground").append(
            `<div class="job">
				<h2><strong>${item.startDate} / ${item.endDate}</strong></h2>
				<h3>${item.name}</h3>
				<h3>${item.center}</h3>
				${item.description ? `<h3>${item.description}</h3>` : ''}
			</div>`);
    });
}

function loadCourses(data, langLabel) {
    $("#courses").html("");
    data.forEach((item, index) => {
        $("#courses").append(
            `<div class="job">
				${item.startDate ? `<h3><strong>${item.startDate} / ${item.endDate}</strong></h3>` : ''}
				<h3>${item.name}</h3>
				${item.center ? `<h3>${item.center}</h3>` : ''}
				${item.description ? `<h3>${item.description}</h3>` : ''}
			</div>`);
    });
}

function loadOtherInformation(data, langLabel) {
    $("#motherTonge").html("");
    $("#foreignLanguage").html("");
    data.linguisticSkills.forEach((language, index) => {
        var motherTonge = '';
        var foreignLanguage ='';

        if (language.motherTongue==="yes") {
            $("#motherTonge").append(
                `<div class="talent">
			        <h2>${language.name}</h2>
			        <p>${langLabel.level}: ${language.level}</p>
			    </div>`);
        } else {
            var certificate = language.certificate !== undefined ? langLabel.certificate + ': ' + language.certificate : '';
            $("#foreignLanguage").append(
                `<div class="talent">
					<h2>${language.name}</h2>
					<p>${langLabel.coursing}: ${language.coursing}</p>
					${language.certificate ? `<p>${langLabel.certificate}: ${language.certificate}</p>` : ''}
				</div>`);
        }
    });

    var indexSkills = Math.round(data.skills.length / 3);
    var skills ='';
    $("#skills").html("");
    data.skills.forEach((skill, i) => {
        if (i % indexSkills === 0) {
            skills += `<ul class="talent">
						   <li>${skill}</li>`;
        } else if ((i+1) % indexSkills === 0) {
            skills += `<li class="last">${skill}</li></ul>`;
        } else {
            skills += `<li>${skill}</li>`;
        }
    });
    $("#skills").html(skills);
}

function loadSocialNetworks(data, langLabel) {
    $("#socialNetwork").html("");
    data.forEach((social) => {
        $("#socialNetwork").append(
            `<div class="social-item click" onclick="window.open('${social.url}')">
				<img class="social-image" src="${social.img}"/>
				<label class="social-name" href="${social.url}"> ${social.username}</label>
			</div>`);
    });
}

function loadResumeData(lang){
    var langLabel = labelsTrans.get(lang);
    var langResume = resume.get(lang);
    if (!langResume) {
        throw new Error("Language does not exist!");
    }

    var commonResume = resume.get(COMMON);
    Object.assign(langResume.personalInformation, commonResume.personalInformation);

    var name = commonResume.personalInformation.name.firstName + " " + commonResume.personalInformation.name.lastName;

    // name
    document.title = name;
    $("#fullName").text(name);
    $("#fullNameTitle").text(name);

    // languages
    $("#titleLanguage").html("");
    languages.forEach((language) => {
        $("#titleLanguage").append(`<div class="language-item" onclick="reloadResume('${labelsTrans.get(language).lg}')">${labelsTrans.get(language).language}</div>`);
    });

    // cv data
    loadPersonalInfo(langResume.personalInformation, langLabel);
    loadProfessionalExperience(langResume.professionalExperience, langLabel);
    loadEducationalBackground(langResume.educationalBackground, langLabel);
    loadCourses(langResume.educationalBackground, langLabel);
    loadOtherInformation(langResume.otherInformation, langLabel);
    loadSocialNetworks(langResume.personalInformation.contactInfo.socialNetwork, langLabel);

}

$loader = $(".loader-container");
$cv = $(".cv-container");

function hideCV() {
    $cv.hide();
    $loader.show();
    $cv.removeClass("visible").addClass("hidden");
    $loader.removeClass("hidden").addClass("visible");
}

function showCV() {
    $loader.hide();
    $cv.show();
    $loader.removeClass("visible").addClass("hidden");
    $cv.removeClass("hidden").addClass("visible");
}

function loadResume(lang) {
    loadLabels(lang);
    loadResumeData(lang);
    setTimeout(() => showCV(), 1000);
}

function reloadResume(lang) {
    hideCV();
    loadResume(lang);
}

$(document).ready(() => {
    var language = navigator.language || navigator.userLanguage;
    language = language.substr(0,2);

    if (language !== ES){
        language = EN;
    }
    console.log("Language: " + language);
    $.getJSON("resume.json?f=" + new Date(), (data) => {
        mapResume(data.resume);
        loadResume(language);
    }).fail((error) => {
        console.log( "JSON Error: " , JSON.stringify(error));
        console.log("JSON", JSON.stringify(JSON.parse(error.responseText)));
        window.location.href = "https://asanchez156.github.io/";
    }).always(() => {
        // console.log( "Loaded!" );
    });

});
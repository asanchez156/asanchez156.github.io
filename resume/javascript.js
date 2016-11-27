var labels = { "es" : {
				 "personalData": "Perfil",
				 "fullName" : "Nombre completo",
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
				},
			  "en" : {
				 "personalData": "Profile",
				 "fullName" : "Full name",
				 "birthDate" : "Birthdate",
				 "country" : "Country",
				 "cityTown" : "City",
				 "professionalExperience" : "Professional Experience",
				 "company" : "Company",
				 "occupation" : "Occupation",
				 "educationalBackground" : "Educational Background",
				 "complementaryTraining" : "complementary Training",
				 "computingSkills" : "Computing Skills",
				 "motherTonge" : "Mother tonge",
				 "foreignLanguage": "Foreign language",
				 "level" : "Level",
				 "coursing" : "Coursing",
				 "certificate" : "Certificate"
				},
			};

var resume = {};
var language = "";

var name = "";
var currentResume = {};
var currentLabel = {};


$( document ).ready(function() {
	//if (window.location.href.indexOf("-") !=-1){
		//window.location.href.substr(window.location.href.indexOf("-")+1,5);
	//}
	language=navigator.language || navigator.userLanguage;
	language=language.substr(0,2);

	if (language!=="es"){
		language="en";
	}

	$.getJSON("resume.json", function(data) {
	    console.log("Json loaded!");
		resume = data.resume;
		console.log(resume);
		loadResume(language);
		
	});
	
});

function loadResume(language) {
	console.log('Loaded');
	currentResume = resume[language];
	name = currentResume.personalInformation.name.firstName + " " + currentResume.personalInformation.name.lastName;
	currentLabel = labels[language];
	loadLabels();
	loadAllData();
}


function loadAllData(){

	document.title = name;
	$("#fullName").text(name);
	$("#fullNameTitle").text(name);
	$("#titleEmail").html('<a href="mailto:'+ currentResume.personalInformation.contactInfo.email.address +'">'+ currentResume.personalInformation.contactInfo.email.address +'</a>');
	$("#titleWebsite").html('<a href="' + currentResume.personalInformation.contactInfo.webSite.url + '">' + currentResume.personalInformation.contactInfo.webSite.url + '</a>');
	$("#birthDate").text(currentResume.personalInformation.birthDate);
	$("#country").text(currentResume.personalInformation.country);
	$("#cityTown").text(currentResume.personalInformation.cityTown);

	$("#cvPicture").html("<img src='images/cv.png' alt='"+ name +"' width='150' height='200'/>");

	$("#professionalExperience").html("");
	currentResume.professionalExperience.forEach(function(professionalExperience,index,arr){
		var profExperience = "";
		profExperience +=	'<div class="job">'+
                             	'<h2><strong>' + professionalExperience.startDate+ ' / '+ professionalExperience.endDate +'</strong></h2>'+
                            	'<h3><strong>' + currentLabel.company + ': </strong>' + professionalExperience.company+'</h3>'+
                             	'<h3><strong>' + currentLabel.occupation +': </strong>' + professionalExperience.occupation;
        profExperience += professionalExperience.description !== undefined ? ' - ' + professionalExperience.description : '';
        profExperience += '</h3></div>';	
		$("#professionalExperience").append(profExperience);
	});

	$("#educationalBackground").html("");
	currentResume.educationalBackground.forEach(function(educationalBackground,index,arr){
		var description = educationalBackground.description != undefined ? educationalBackground.description : '';
		$("#educationalBackground").append('<div class="job">'+
				                             	'<h2><strong>' + educationalBackground.startDate+ ' / '+ educationalBackground.endDate +'</strong></h2>'+
				                            	'<h3>' + educationalBackground.name + '</h3>'+
				                            	'<h3>' + educationalBackground.center + '</h3>'+
				                             	'<h3>' + description + '</h3>'+
				                            '</div>'
				                            );
	});

	$("#courses").html("");
	currentResume.courses.forEach( function(course, index) {
		var date = course.startDate != undefined ? course.startDate + ' / ' + course.endDate : '';
		var center = course.center != undefined ? course.center : "";
		var description = course.description != undefined ? course.description : '';
		$("#courses").append( '<div class="job">'+
									'<h3><strong>' + date + '</strong></h3>'+
									'<h3>'+course.name+'</h3>' +
									'<h3>'+center+'</h3>' +
									'<h3>'+description+'</h3>' +
							  '</div>'
							);
	});

	$("#motherTonge").html("");
	$("#foreignLanguage").html("");
	currentResume.otherInformation.linguisticSkills.forEach( function(language, index) {
		var motherTonge = '';
		var foreignLanguage ='';

		if(language.motherTongue==="yes"){
			$("#motherTonge").append('<div class="talent">'+
			                              '<h2>' + language.name + '</h2>'+
			                              '<p>' + currentLabel.level + ': ' + language.level + '</p>' +
			                         '</div>'
									);
		}else{
			var certificate = language.certificate !== undefined ? currentLabel.certificate + ': ' + language.certificate : '';
			$("#foreignLanguage").append('<div class="talent">'+
			                              '<h2>' + language.name + '</h2>'+
			                              '<p>' + currentLabel.coursing + ': ' + language.coursing + '</p>' +
			                              '<p>' + certificate + '</p>'+
			                         '</div>'
									);
		}
	});

	$("#socialNetwork").html("");
	currentResume.personalInformation.contactInfo.socialNetwork.forEach( function(social, index) {
 		$("#socialNetwork").append('<p>'+
 								'<a href="' + social.url + '">'+
 									'<img class="align" src="' + social.img +'" width="30px"/>'+
 								'</a> '+
 								'<a href="'+social.url+'">' + social.username + '</a>'+
 							'</p>');
 	});

 	var indexSkills = Math.round(currentResume.otherInformation.skills.length / 3);
 	var skills ='';
 	$("#skills").html("");
 	currentResume.otherInformation.skills.forEach( function(skill, i) {
		if(i % indexSkills == 0){
			skills += '<ul class="talent">'+
							'<li>' + skill + '</li>';
		}else if ((i+1) % indexSkills==0){
			skills += '<li class="last">' + skill + '</li></ul>';
		}else{
			skills += '<li>' + skill +'</li>';
		}
 	});
 	$("#skills").html(skills);

}

function loadLabels(){
	$("#labelPersonalData").text(currentLabel.personalData);
	$("#labelFullName").text(currentLabel.fullName);	
	$("#labelCountry").text(currentLabel.country);
	$("#labelBirthDate").text(currentLabel.birthDate);
	$("#labelCountry").text(currentLabel.country);
	$("#labelCityTown").text(currentLabel.cityTown);
	$("#labelProfessionalExperience").text(currentLabel.professionalExperience);
	$("#labelCompany").text(currentLabel.company);
	$("#labelOccupation").text(currentLabel.occupation);
	$("#labelEducationalBackground").text(currentLabel.educationalBackground);
	$("#labelComplementaryTraining").text(currentLabel.complementaryTraining);
	$("#labelComputingSkills").text(currentLabel.computingSkills);
	$("#labelMotherTonge").text(currentLabel.motherTonge);
	$("#labelForeignLanguage").text(currentLabel.foreignLanguage);
	$("#labelLevel").text(currentLabel.level);
	$("#labelCoursing").text(currentLabel.coursing);
	$("#labelCertificate").text(currentLabel.certificate);
}

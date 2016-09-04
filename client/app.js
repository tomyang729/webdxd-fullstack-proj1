var app = angular.module('Webdxd', []);

app.controller('AppCtrl', function($http){

	var appCtrl = this;

	$http.get('http://localhost:3000/student').success(function(studentList){
		appCtrl.student = studentList;
	});

	appCtrl.selectStudent = function(student){
		$http.get('http://localhost:3000/student/' + student._id).success(function(studentDetail){
		appCtrl.selectedStudent = studentDetail;
		appCtrl.fullName = studentDetail.firstname + studentDetail.lastname;
		appCtrl.email = studentDetail.email;
		appCtrl.age = studentDetail.age;
	});
    }

	appCtrl.flag = false;
	appCtrl.addNewButton = "Add New";

	appCtrl.addNew = function () {
		appCtrl.flag = !appCtrl.flag;

		appCtrl.addNewButton = appCtrl.flag ? "Close" : "Add New";

	}

	appCtrl.submitForm = function () {
		console.log("new obj:" + appCtrl.newStudent);
		$http.post('http://localhost:3000/new/', appCtrl.newStudent)
			.success(function(newStudent){
			appCtrl.student.push(newStudent);
			appCtrl.addNew();
				console.log("post success");
		})
	}


})
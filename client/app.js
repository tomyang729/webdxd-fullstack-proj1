var app = angular.module('Webdxd', []);

app.controller('AppCtrl', function($http){

	var zhe = this;

	$http.get('http://localhost:3000/student').success(function(studentList){
		zhe.student = studentList;
	});

	zhe.selectStudent = function(student){
		$http.get('http://localhost:3000/student/' + student._id).success(function(studentDetail){
		zhe.selectedStudent = studentDetail;
		zhe.fullName = studentDetail.firstname + studentDetail.lastname;
		zhe.email = studentDetail.email;
		zhe.age = studentDetail.age;
	});
	}

})
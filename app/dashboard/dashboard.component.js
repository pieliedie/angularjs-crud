angular.module('dashboard')
    .component('app-dashboard', {
        templateUrl: "./dashboard.component.html",
        controller: function dashboardController() {
            this.greetings = "Hello"
        }
    });

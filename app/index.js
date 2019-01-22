var appModule = angular.module('myApp', []);

appModule.controller('ItemsController', ['$scope', 'TodoItemsService', function($scope, TodoItemsService){
  var self = this;
  $scope.item = {id: null, content: null, dateCreated: null, dateModified: null};
  self.submitItem = submitItem;
  self.addItem = addItem;
  self.updateItem = updateItem;
  self.fetchItem = fetchItem;
  fetchAllItems();
  
  function fetchItem(id) {
    TodoItemsService.fetchItem(id).then(function(res){
      if(res && res.data) {
        $scope.item = res.data;
      }
    });
  }

  function fetchAllItems() {
    TodoItemsService.fetchAll().then(function(res){
      if(res && res.data && res.data.length) {
        $scope.items = res.data;
      }
    });
  }

  function addItem(item) {
    TodoItemsService.addItem(item).then(function(res){
      console.log("POST successfully");
      reset();
    });
  }

  function updateItem(item) {
    TodoItemsService.updateItem(item).then(function(){
      console.log("PUT successfully");
      reset();
    })
  }

  function removeItem(id) {
    TodoItemsService.removeItem(id).then(function(){
      console.log("DELETE successfully");
      reset();
    })
  }

  function submitItem() {
    if(!$scope.item.id) {
      $scope.item.dateCreated = moment().format("MMM DD YY, h:mm:ss a");
      $scope.item.id = Math.floor(Math.random()) * 10;
      addItem($scope.item);
    }
    else {
      $scope.item.dateModified = moment().format("MMM DD YY, h:mm:ss a");
      updateItem($scope.item);
    }
  }

  function reset() {
    fetchAllItems();
    $scope.item = {};
  }

}]);

appModule.factory('TodoItemsService', ['$http', function($http) {
  var url = "http://localhost:3000/todolist/";

  var factory = {
    fetchAll: fetchAllItems,
    fetchItem: fetchItem,
    addItem: addItem,
    updateItem: updateItem
  }

  function fetchAllItems() {
    return $http.get(url);
  }

  function fetchItem(id) {
    return $http.get(url + id);
  }

  function addItem(item) {
    $http.post(url, item, { headers: {"Content-Type": "application/json"}});
    // return $http.post(url, item);
  }

  function updateItem(item) {
    return $http.put(url + item.id, item);
  }

  function removeItem(id) {
    return $http.delete(url + id);
  }

  return factory;
}]);
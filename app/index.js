var appModule = angular.module('myApp', []);

appModule.controller('ItemsController', ['$scope', 'TodoItemsService', function($scope, TodoItemsService){
  var self = this;
  $scope.item = {};
  self.submitItem = submitItem;
  self.addItem = addItem;
  self.updateItem = updateItem;
  self.fetchItem = fetchItem;
  self.removeItem = removeItem;
  fetchAllItems();
  
  function fetchItem(id) {
    $scope.item = $scope.items.find(function(item){
      return item.id === id;
    }) || {};
  }

  function fetchAllItems() {
    TodoItemsService.fetchAll().then(function(res){
      if(res && res.data && res.data.length) {
        $scope.items = res.data;
      }
    });
  }

  function addItem(item) {
    TodoItemsService.addItem(item).then(function(){
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
      console.log(1);
      
      $scope.item.dateCreated = moment().format("MMM DD YY, h:mm:ss a");
      console.log($scope.item);
      
      addItem($scope.item);
    }
    else {
      console.log(2);
      
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
    updateItem: updateItem,
    removeItem: removeItem
  }

  function fetchAllItems() {
    return $http.get(url);
  }

  function fetchItem(id) {
    return $http.get(url + id);
  }

  function addItem(item) {
    // $http.post(url, item);
    return $http.post(url, item);
  }

  function updateItem(item) {
    return $http.put(url + item.id, item);
  }

  function removeItem(id) {
    return $http.delete(url + id);
  }

  return factory;
}]);
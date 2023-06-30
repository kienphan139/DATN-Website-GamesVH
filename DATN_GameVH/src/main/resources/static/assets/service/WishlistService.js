app.factory('WishlistService', function($http) {
  var baseUrl = host + '/api/restWishlist';

  return {
    getWishlist: function(accountid) {
      return $http.get(baseUrl + '/getAll/' + accountid);
    }
  };
});
app.controller("CustomerController", CustomerController);

function CustomerController($scope, AccountService, SweetAlert) {
  $scope.customers = [];
  $scope.pageNo = 0;
  $scope.pageSize = 2;
  $scope.nameFilter = "";
  $scope.usernameFilter = "";
  $scope.init = function () {
    getPage(0);
  };
  $scope.init();

  $scope.filterData = function () {
    getPage(0);
  };

  function getPage(page) {
    AccountService.getCustomers({
      page: page,
      size: $scope.size,
      username: $scope.usernameFilter,
      name: $scope.nameFilter,
      roleId: "CUST",
    })
      .then(function (response) {
        const data = response.data;
        $scope.customers = data.content;
        $scope.pageNo = data.pageNumber;
      })
      .catch(function (error) {
        console.error("Lỗi khi lấy danh sách nhân viên:", error);
      });
  }
  $scope.toggleAccountStatus = function (account) {
    AccountService.toggleStatus(account.username).then(function (response) {
      SweetAlert.success(
        "Toggle Account Status",
        `Status: ${response.data.status ? "Đang hoạt động" : "Không hoạt động"}`
      );
      $scope.init();
    });
  };
}

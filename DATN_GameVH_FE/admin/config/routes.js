app
  .config(function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix("");

    $routeProvider
      .when("/", {
        templateUrl: "/views/login.html",
        pageTitle: "Đăng nhập",
      })
      .when("/dashboard", {
        templateUrl: "/views/index.html",
        pageTitle: "Trang chủ",
      })
      .when("/index.html", {
        redirectTo: "/dashboard",
      })
      .when("/accessories-list", {
        templateUrl: "/views/accessories-list.html",
        pageTitle: "Accessories List",
      })
      .when("/blog-list", {
        templateUrl: "/views/blog-list.html",
        pageTitle: "Blog List",
      })
      .when("/category", {
        templateUrl: "/views/category.html",
        pageTitle: "Thể loại",
      })
      .when("/coupon-list", {
        templateUrl: "/views/coupon-list.html",
        pageTitle: "Danh sách mã giảm giá",
      })
      .when("/coupon-owner", {
        templateUrl: "/views/coupon-owner.html",
        pageTitle: "Mã giảm giá khách hàng",
      })
      .when("/customer-list", {
        templateUrl: "/views/customer-list.html",
        pageTitle: "Danh sách khách hàng",
      })
      .when("/order-detail", {
        templateUrl: "/views/order-detail.html",
        pageTitle: "Chi tiết đơn hàng",
      })
      .when("/order-list", {
        templateUrl: "/views/order-list.html",
        pageTitle: "Danh sách đơn hàng",
      })
      .when("/product-list", {
        templateUrl: "/views/product-list.html",
        pageTitle: "Product List",
      })
      .when("/staff-list", {
        templateUrl: "/views/staff-list.html",
        pageTitle: "Danh sách nhân viên",
      })
      .when("/login", {
        templateUrl: "/views/login.html",
        pageTitle: "Đăng nhập",
      })
      .when("/loading", {
        templateUrl: "/views/loading.html",
        pageTitle: "Loading",
      })
      .otherwise({
        templateUrl: "/views/error-404.html",
      });
  })
  .run(function ($rootScope, $route) {
    $rootScope.$on("$routeChangeSuccess", function () {
      $rootScope.pageTitle = $route.current.pageTitle;
      $rootScope.version = Math.random().toString().substr(2, 8);
    });
  });

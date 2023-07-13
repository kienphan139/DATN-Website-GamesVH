// Angular js
app.controller("CheckoutController", function (AccountService, MomoService, IPService, ZaloPayService, VNPayService, $scope, $window) {
	$scope.cart = [];
	$scope.TotalPrice = 0;
	$scope.paymentMethod = "cod";
	$scope.form = {};

	$scope.account = {}; // Biến lưu thông tin account 
    $scope.username = null;

    // Trở về trang đăng nhập
    $scope.logout = function () {
        $window.localStorage.removeItem("username");
        $window.sessionStorage.removeItem("username");
        $window.sessionStorage.setItem("messageLogin", "Bạn đã đăng xuất!");
        $window.location.href = 'login.html';
    };

    AccountService.checkLogin().then(function (account) {
        // Người dùng đã đăng nhập
        $scope.account = account;
    }).catch(function (error) {
        // Người dùng chưa đăng nhập hoặc có lỗi
        console.error('Lỗi đăng nhập hoặc chưa đăng nhập:', error);
        if (error === "Người dùng chưa đăng nhập") {
            // Xử lý logic khi người dùng chưa đăng nhập
            $window.localStorage.removeItem("username");
            $window.sessionStorage.removeItem("username");
            $window.sessionStorage.setItem("messageLogin", "Vui lòng đăng nhập!");
            $window.location.href = 'login.html';
        }
    });

	function getCartData() {
		$scope.cart = ($window.localStorage.getItem("carts") != null) ? JSON.parse($window.localStorage.getItem("carts")) : [];
		$scope.TotalPrice = 0;
		if ($scope.cart.length > 0) {
			$scope.cart.forEach(function (data) {
				$scope.TotalPrice += (data.salePrice - (data.salePrice * data.offer)) * data.Qty;
			});
		}
	}
	$scope.load_all = function () {
		getCartData();
	};

	$scope.load_all();

	$scope.checkout = function () {
		console.log($scope.form)
		// if ($scope.paymentMethod === "cod") {
		// 	// thánh toán khi nhận hàng

		// } else if ($scope.paymentMethod === "momo") {
		// 	// thánh toán qua momo
		// 	var date = new Date().getTime();
		// 	var orderId = "HD" + date;
		// 	var returnUrl = "http://localhost:3000/checkoutResult";
		// 	var totalPrice = $scope.TotalPrice;
		// 	var OrerInfo = "Thanh toán đơn hàng " + orderId;
		// 	$scope.createMomoData(orderId, returnUrl, totalPrice, OrerInfo);
		// } else if ($scope.paymentMethod === "vnpay") {
		// 	// thánh toán qua vnpay
		// 	var totalPrice = $scope.TotalPrice;
		// 	IPService.getIPAddress()
		// 		.then(function (ipAddress) {
		// 			var userIP = ipAddress.data;
		// 			VNPayService.createOrder(totalPrice, userIP.ip).then(function (resp) {
		// 				console.log(resp)
		// 				$scope.zalopay = resp.data;
		// 				// Hiển thị thông báo khi thanh toán
		// 				if ($scope.zalopay) {
		// 					// $window.sessionStorage.setItem("messageCheckout", JSON.stringify(statusCheckout));
		// 					$window.location.href = $scope.zalopay.url;
		// 				} 
		// 			})
		// 		})
		// 		.catch(function (error) {
		// 			console.log('Error:', error);
		// 		});

		// } else if ($scope.paymentMethod === "paypal") {
		// 	// thánh toán qua paypal

		// }
	}

	// $scope.zaloPayData = {
	// 	appUser: "ZaloPayDemo",
	// 	appTime: 1660717311101,
	// 	amount: 10000,
	// 	appTransID: "220817_1660717311101",
	// 	bankCode: "zalopayapp",
	// 	embedData: "{}",
	// 	items: [],
	// 	callbackUrl: "<http://localhost:3000/checkout>",
	// 	description: "ZaloPayDemo - Thanh toán cho đơn hàng #220817_1660717311101",
	// };

	// $scope.createZaloPayData = function () {
	// 	ZaloPayService.createPayment($scope.zaloPayData)
	// 		.then(function (response) {
	// 			// Xử lý kết quả từ API backend
	// 			if (response.data && response.data.return_code === 1) {
	// 				// Giao dịch thành công
	// 				console.log("Payment successful");
	// 			} else {
	// 				// Giao dịch thất bại
	// 				console.log("Payment failed");
	// 			}
	// 		})
	// 		.catch(function (error) {
	// 			// Xử lý lỗi
	// 			console.error("Error:", error);
	// 		});
	// };

	/*Tạo data cho momo
	inpOrderId: String  - Mã hóa đơn momo
	inpReturnUrl : String  - link trả về khi thanh toán
	inpAmount : Double  - tổng tiền của đơn hàng
	inpOrderInfo : String  - Mô tả của đơn hàng
	*/
	$scope.createMomoData = function (inpOrderId, inpReturnUrl, inpAmount, inpOrderInfo) {
		// Thông tin của momo business
		var accessKey = "hglxIRUGLnBd5h50";
		var partnerCode = "MOMOX7V920220806";
		var secretKey = "UMJQIJnOpNPnzQrDtWcRdLYu4oVt4UrV";
		var partnerName = "GamesVH";

		var date = new Date().getTime();

		// Thông tin của đơn hàng
		var requestId = date + "id";
		var orderId = inpOrderId; // Mã hóa đơn
		var autoCapture = true;
		var requestType = "captureWallet";
		var notifyUrl = inpReturnUrl;
		var returnUrl = inpReturnUrl; // thanh toán thành công về đâu
		var amount = inpAmount; // Giá đơn hàng
		var orderInfo = inpOrderInfo; // Thông tin thanh toán
		var extraData = "ew0KImVtYWlsIjogImh1b25neGRAZ21haWwuY29tIg0KfQ==";
		var lang = "vi";

		// Tạo signature
		var signature = "accessKey=" + accessKey + "&amount=" + amount + "&extraData=" + extraData + "&ipnUrl=" + notifyUrl + "&orderId=" + orderId + "&orderInfo=" + orderInfo + "&partnerCode=" + partnerCode + "&redirectUrl=" + returnUrl + "&requestId=" + requestId + "&requestType=" + requestType;
		var hash = CryptoJS.HmacSHA256(signature, secretKey);
		signature = CryptoJS.enc.Hex.stringify(hash);

		// Tạo data gửi về cho server
		var data = {
			"partnerCode": partnerCode,
			"partnerName": partnerName,
			"storeId": partnerCode,
			"requestType": requestType,
			"ipnUrl": notifyUrl,
			"redirectUrl": returnUrl,
			"orderId": orderId,
			"amount": amount,
			"lang": lang,
			"autoCapture": autoCapture,
			"orderInfo": orderInfo,
			"requestId": requestId,
			"extraData": extraData,
			"signature": signature
		}

		// Call API Momo
		MomoService.createOrder(data).then(function (response) {
			$scope.momo = response.data;
			$window.location.href = $scope.momo.payUrl;
		}).catch(function (error) {
			console.error('Lỗi khi tạo order Momo:', error);
		});
	}
});

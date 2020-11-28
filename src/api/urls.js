

var url = "http://vchains.jewelmarts.in/webservices/"

export const urls = {

    baseUrl: "http://vchains.jewelmarts.in/webservices/",

    imageUrl: "http://vchains.jewelmarts.in/",


    Login: {
        url: url + "User_registration/userLogin",
    },
    SendOtp: {
        url: url + "User_registration/send_otp",
    },
    //change_password  or FP
    ChangePassword: {
        url: url + "User_registration/change_password",
    },
    Register: {
        url: url + "User_registration",
    },
    HomePage: {
        url: url + "Home"
    },
    ProductGrid: {
        url: url + "Products_Grid"
    },

    ProductGridCount: {
        url: url + "Products_Count"
    },

    AddToCartFromDetails: {
        url: url + 'Product_Cart/add_to_cart'
    },
    TotalCartCount: {
        url: url + 'Product_Cart/cart_value_count'
    },
    CartData: {
        url: url + 'Product_Cart/get_cart_data'
    },
    addToCartWishlist: {
        url: url + 'Product_Cart/add_to_cart_grid'
    },
    sortByParams: {
        url: url + 'Sort_Parameter'
    },
    FilterParams: {
        url: url + 'Filter_Parameter'
    },
    ProductDetails: {
        url: url + 'Product_Details'
    },
    addToCartGridAdd: {
        url: url + 'Product_Cart/add_to_cart_grid_add'
    },
    OrderHistory: {
        url: url + 'Order_history'
    },
    OrderHistoryDetail: {
        url: url + "Order_history/order_details"
    },
    ReOrder: {
        url: url + 'Order_history/re_order'
    },
    DeleteFromCartWishList: {
        url: url + 'Product_Cart/delete_cart_product'
    },
    MoveProduct: {
        url: url + 'Product_Cart/move_products'
    },

    ClearCartWishlistData: {
        url: url + 'Product_Cart/clear_cart_data'
    },

    EditCartProduct: {
        url: url + 'Product_Cart/cart_change'
    },

    PlaceOrderFromCart: {
        url: url + 'Order'
    },

    CustomizeOrder: {
        url: url + 'Customized_Order'
    },
    GetProfile: {
        url: url + 'User_registration/get_profile_data'
    },

    AllParameter: {
        url: url + 'All_Parameters'
    },

    GetStateList: {
        url: url + 'User_registration/getStates'
    },

    GetCityList: {
        url: url + 'User_registration/getCities'
    },

    UpdateProfile: {
        url: url + 'User_registration/update_profile'
    },
    SearchGrid: {
        url: url + 'products_Grid/advanced_search_grid'
    },
    SearchByCodeGrid: {
        url: url + 'products_Grid/advanced_search_grid_by_search'
    },
    Notification: {
        url: url + 'Notification_List'
    },
    CartSummery: {
        url: url + 'Cart_summary'
    },
    CartWeight: {
        url: url + 'Cart_summary/total_cart'
    },

    Exclusive: {
        url: url + 'my_Collection'
    },
    CallEmail: {
        url: url + 'Call_Email_Us'
    },
    CustomOrder: {
        url: url + 'Customized_Order/order_assign'
    },
    sendFCMToken: {
        url: url + 'Worker/send_gcm'
    },


}

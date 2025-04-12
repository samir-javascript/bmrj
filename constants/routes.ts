export const ROUTES = {
    createProduct: "/admin/productsManagement/create",
    editProduct:(id:string) => `/admin/productsManagement/edit/${id}`,
    products: "/admin/productsManagement/products",
    userProfile: `/customer/account/profile`,
    productPage: (id:string) => `/products/${id}`,
    editShipping: (id:string) =>  `/customer/address/shipping/${id}`,
    editProfile: (id:string) =>  `/customer/account/edit/${id}`,
    createShipping: "/customer/address/new",
    shipping: "/customer/address",
    shipping_checkout: "/customer/shipping",
    coupons : '/customer/account/coupons',
    payment_checkout: "/checkout/payment",
    signup: "/customer/account/sign-up",
    orders: "/sales/orderHistory",
    orderDetails: (id:string) => `/sales/orderHistory/orderId/${id}`,
    wishlist: "/wishlist"
}
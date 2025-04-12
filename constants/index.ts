
import { Tv, ShoppingCart,ThumbsUp , ChartNoAxesCombined, BadgeCheck,  BookOpenText , Heart, Truck,  LocateIcon, LogOut, Book, UserRoundSearch, CircleDollarSign, Settings, BadgeDollarSign, Computer, ImagePlay, Grid2x2 } from "lucide-react"
import { ROUTES } from "./routes"

export const categories = [
    {
        imgSrc: "/dar-darek-1.png",
        name: "Dar Darek"
    },
    {
        imgSrc: "/electro2.png",
        name: "Electromènager"
    },
    {
        imgSrc: "/sportG-1.png",
        name: "Sport"
    },
    {
        imgSrc: "/maison-3.png",
        name: "Maison"
    },
    {
        imgSrc: "/tv4.png",
        name: "TV-SON"
    },
    {
        imgSrc: "/jamal2.png",
        name: "Beautè"
    },
    {
        imgSrc: "/info.png",
        name: "Informatique"
    },
    {
        imgSrc: "/tele.png",
        name: "Telephonie"
    },
    {
        imgSrc: "/moda.png",
        name: "Mode"
    },
    {
        imgSrc: "/bricolage1.png",
        name: "Bricolage"
    },
    {
        imgSrc: "/bebeich-1.png",
        name: "Bèbè & jouets"
    },
    {
        imgSrc: "/dar-darek-1.png",
        name: "Dar Darek"
    },
    {
        imgSrc: "/electro2.png",
        name: "Electromènager"
    },
    {
        imgSrc: "/sportG-1.png",
        name: "Sport"
    },
    {
        imgSrc: "/maison-3.png",
        name: "Maison"
    },
    {
        imgSrc: "/tv4.png",
        name: "TV-SON"
    },
    {
        imgSrc: "/jamal2.png",
        name: "Beautè"
    },
    {
        imgSrc: "/info.png",
        name: "Informatique"
    },
    {
        imgSrc: "/tele.png",
        name: "Telephonie"
    },
    {
        imgSrc: "/moda.png",
        name: "Mode"
    },
    {
        imgSrc: "/bricolage1.png",
        name: "Bricolage"
    },
    {
        imgSrc: "/bebeich-1.png",
        name: "Bèbè & jouets"
    }
]
export const ProfileItems = [
     {
        name: "mon compte",
        icon: Tv,
        pathname: ROUTES.userProfile
     },
     {
        name: "mes commandes",
        icon: ShoppingCart,
        pathname: ROUTES.orders
     },   {
        name: "ma list d'envie",
        icon: Heart,
        pathname: ROUTES.wishlist
     },  {
        name: "Carnet d'addresses",
        icon: LocateIcon,
        pathname: ROUTES.shipping
     }, 
      {
        name: "Information du compte",
        icon: LocateIcon,
        pathname: ROUTES.editProfile("kjkffd")
     }, 
     {
        name: "mes Coupons",
        icon: BadgeDollarSign,
        pathname:  ROUTES.coupons  
    },
    
    //  {
    //     name: "LogOut",
    //     icon: LogOut,
    //     pathname: ""
    //  },
     
     
]
export const features = [
    {
        icon: ThumbsUp,
        title: "Satisfait ou remboursé",
        show: true
    },
    {
        icon: BookOpenText,
        title: "Offre nationale et internationale",
        show: true
    },
    {
        icon: Truck,
        title: "Livraison partout au Maroc",
        show: true
    },
    {
        icon: BadgeCheck,
        title: "Produits 100% authentiques",
        show: false
    },
   
]
export const sidebarLinks = [
      {
        imgURL: ChartNoAxesCombined,
        route: "/admin/dashbord",
        label: "Dashbord",
      },
     {
        imgURL: ShoppingCart ,
        route: "/admin/productsManagement/products/create",
        label: "Products",
      },
      {
        imgURL: Grid2x2,
        route: "/admin/productsManagement/products/categories",
        label: "Categories",
      },
      {
        imgURL: ImagePlay ,
        route: "/admin/productsManagement/products/heroBanner",
        label: "Hero Config",
      },
      {
        imgURL: CircleDollarSign,
        route: "/admin/ordersManagement/orders",
        label: "Orders",
      },
      {
        imgURL: UserRoundSearch,
        route: "/admin/usersManagement/users",
        label: "Users",
      },
      {
        imgURL: Settings ,
        route: "/admin/settings",
        label: "Settings",
      },
]
export const products = [
    {
        brand: "Nike",
        _id: "kkjdkfjdk",
        description: "Compleu din satin albastru cu elastic in talie si maneci bufante Compleu din satin albastru cu elastic in talie si maneci bufante",
        prevPrice: 280.00,
        position: "top",
        category: "phone",
        images: [],
        countInStock: 5,
        numReviews: 0,
        rating: 0,
        reviews:"any",
        name: "Compleu din satin albastru cu elastic in talie si maneci bufante",
        image: "https://photos.starshiners.com/112731/compleu-din-satin-albastru-cu-elastic-in-talie-si-maneci-bufante-S062223-3-724916.jpg",
        price: 152.00
    },
    {
        name: "Compleu din satin albastru cu elastic in talie si maneci bufante",
        image: "https://photos.starshiners.com/112731/compleu-din-satin-albastru-cu-elastic-in-talie-si-maneci-bufante-S062223-3-724916.jpg",
        price: 152.00
    },
    {
        name: "Compleu din satin albastru cu elastic in talie si maneci bufante",
        image: "https://photos.starshiners.com/112731/compleu-din-satin-albastru-cu-elastic-in-talie-si-maneci-bufante-S062223-3-724916.jpg",
        price: 152.00
    },
    {
        name: "Compleu din satin albastru cu elastic in talie si maneci bufante",
        image: "https://photos.starshiners.com/112731/compleu-din-satin-albastru-cu-elastic-in-talie-si-maneci-bufante-S062223-3-724916.jpg",
        price: 152.00
    },
    {
        name: "Compleu din satin albastru cu elastic in talie si maneci bufante",
        image: "https://photos.starshiners.com/112731/compleu-din-satin-albastru-cu-elastic-in-talie-si-maneci-bufante-S062223-3-724916.jpg",
        price: 152.00
    },
    {
        name: "Compleu din satin albastru cu elastic in talie si maneci bufante",
        image: "https://photos.starshiners.com/112731/compleu-din-satin-albastru-cu-elastic-in-talie-si-maneci-bufante-S062223-3-724916.jpg",
        price: 152.00
    },
    {
        name: "Compleu din satin albastru cu elastic in talie si maneci bufante",
        image: "https://photos.starshiners.com/112731/compleu-din-satin-albastru-cu-elastic-in-talie-si-maneci-bufante-S062223-3-724916.jpg",
        price: 152.00
    },
    {
        name: "Compleu din satin albastru cu elastic in talie si maneci bufante",
        image: "https://photos.starshiners.com/112731/compleu-din-satin-albastru-cu-elastic-in-talie-si-maneci-bufante-S062223-3-724916.jpg",
        price: 152.00
    },
    {
        name: "Compleu din satin albastru cu elastic in talie si maneci bufante",
        image: "https://photos.starshiners.com/112731/compleu-din-satin-albastru-cu-elastic-in-talie-si-maneci-bufante-S062223-3-724916.jpg",
        price: 152.00
    },
    {
        name: "Compleu din satin albastru cu elastic in talie si maneci bufante",
        image: "https://photos.starshiners.com/112731/compleu-din-satin-albastru-cu-elastic-in-talie-si-maneci-bufante-S062223-3-724916.jpg",
        price: 152.00
    },
    {
        name: "Compleu din satin albastru cu elastic in talie si maneci bufante",
        image: "https://photos.starshiners.com/112731/compleu-din-satin-albastru-cu-elastic-in-talie-si-maneci-bufante-S062223-3-724916.jpg",
        price: 152.00
    },{
        name: "Compleu din satin albastru cu elastic in talie si maneci bufante",
        image: "https://photos.starshiners.com/112731/compleu-din-satin-albastru-cu-elastic-in-talie-si-maneci-bufante-S062223-3-724916.jpg",
        price: 152.00
    },
    {
        name: "Compleu din satin albastru cu elastic in talie si maneci bufante",
        image: "https://photos.starshiners.com/112731/compleu-din-satin-albastru-cu-elastic-in-talie-si-maneci-bufante-S062223-3-724916.jpg",
        price: 152.00
    },
]
export const brands = [
    "Nike",
    "Adidas",
    "Samsung",
    "Apple",
    "Xiaomi",
    "Bella Maison",
    "New Balance",
    "Essence",
    "Huawei",
    "La Roche Posay",
    "Oppo",
    "Puma",
    "Tommy Hilfiger",
    "Under Armour",
    "Infinix",
    "The North Face",
    "Asics",
    "Celio",
    "Honor",
    "Revox",
    "Ray-Ban",
    "Daniel Wellington",
    "Denwa",
    "L'Oréal Paris",
    "MSI",
    "Dyson",
    "Herbal Essence",
    "Maybelline",
    "Bosch",
    "Nivea",
    "Taurus",
    "Moulinex",
    "Garnier",
    "Neutrogena",
    "Philips",
    "Tissot",
    "Uriage",
    "Eastpak",
    "Mievic",
    "Nintendo",
    "Razer",
    "Casio",
    "Krohler",
    "Lamacom",
    "Chi",
    "Lattafa",
    "Head & Shoulders",
    "Nuxe",
    "Dans Ma Maison",
    "Catrice",
    "Acure",
    "Skala",
    "CeraVe",
    "Topface",
    "Mellerware",
    "Tefal",
    "Kenwood",
    "Bys",
    "Heinrich's",
    "Epson",
    "Oraimo",
    "Canon",
    "ITEL",
    "Golden Rose",
    "Logitech",
    "Sony",
    "TCL",
    "Baseus",
    "Lenovo",
    "The Purest Solution",
    "Sol de Janeiro",
    "Bourjois"
];
export const footerCategories = [
    "Téléphone & objets connectés",
    "Tv, Son, Photo",
    "Informatique & Gaming",
    "Electroménager",
    "Maison - Cuisine - Déco",
    "Beauté - Santé",
    "Vêtements - Chaussures - Bijoux - Accessoires",
    "Bébé & Jouets",
    "Sport",
    "Auto Moto",
    "Brico - Jardin - Animalerie",
    "Librairie",
    "Epicerie fine"
];

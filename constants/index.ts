
import { Tv, ShoppingCart,ThumbsUp , UserRound, ChartNoAxesCombined,
     BadgeCheck,  BookOpenText , Heart, Truck,  LocateIcon, 
     LogOut, Book, UserRoundSearch, CircleDollarSign, Settings, BadgeDollarSign, 
     Computer, ImagePlay, Grid2x2, BadgeInfo, BookUser, MapPin, DollarSign,
      GalleryThumbnails, GalleryHorizontalIcon, Users, MessageSquare } from "lucide-react"
      import { FaFileInvoiceDollar } from "react-icons/fa";
      import { TbCategoryFilled } from "react-icons/tb";
      import { PiLineSegmentsFill } from "react-icons/pi";
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
     icon: UserRound,
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
     icon: MapPin,
     pathname: ROUTES.shipping
  }, 
   {
     name: "Information du compte",
     icon: BadgeInfo,
     pathname: "/customer/account/edit"
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
// export const sidebarLinks = [
//       {
//         imgURL: ChartNoAxesCombined,
//         route: "/admin/dashbord",
//         label: "Dashbord",
//       },
//      {
//         imgURL: DollarSign ,
//         route: "/admin/productsManagement/products/create",
//         label: "Sales",
//       },
//       {
//         imgURL: ImagePlay,
//         route: "/admin/productsManagement/products/categories",
//         label: "Catalog",
//       },
//       {
//         imgURL: Users ,
//         route: "/admin/productsManagement/products/heroBanner",
//         label: "Customers",
//       },
//       {
//         imgURL: MessageSquare,
//         route: "/admin/ordersManagement/orders",
//         label: "Reviews",
//       },
//       {
//         imgURL: UserRoundSearch,
//         route: "/admin/usersManagement/users",
//         label: "Users",
//       },
//       {
//         imgURL: Settings ,
//         route: "/admin/settings",
//         label: "Settings",
//       },
// ]
export const sidebarLinks = [
    {
      imgURL: ChartNoAxesCombined,
      route: "/admin/dashbord",
      label: "Dashboard",
    },
    {
      imgURL: DollarSign,
      label: "Sales",
      children: [
        {
          label: "Orders",
          route: "/admin/ordersManagement/orders",
          imgIcon: DollarSign,
        },
        {
          label: "Invoices",
          route: "/admin/sales/invoices",
          imgIcon:  FaFileInvoiceDollar,
        },
      ],
    },
    {
      imgURL: ImagePlay,
    //   route: "/admin/productsManagement/products/categories",
      label: "Catalog",
      children: [
        {
          label: "Posters",
          route: "/admin/sales/orders",
          imgIcon: ImagePlay,
        },
        {
          label: "Categories",
          route: "/admin/sales/invoices",
          imgIcon: TbCategoryFilled,
        },
      ],
    },
    {
      imgURL: Users,
    //   route: "/admin/productsManagement/products/heroBanner",
      label: "Customers",
      children: [
        {
          label: "Customers",
          route: "/admin/sales/orders",
          imgIcon: Users,
        },
        {
          label: "Segments",
          route: "/admin/sales/invoices",
          imgIcon: PiLineSegmentsFill,
        },
      ],
    },
    {
      imgURL: MessageSquare,
      route: "/admin/products/reviews",
      label: "Reviews",
    },
    {
      imgURL: UserRoundSearch,
      route: "/admin/usersManagement/users",
      label: "Users",
    },
    {
      imgURL: Settings,
      route: "/admin/settings",
      label: "Settings",
    },
  ];
  
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


import { Tv, ShoppingCart,ThumbsUp , UserRound, ChartNoAxesCombined,
     BadgeCheck,  BookOpenText , Heart, Truck,  LocateIcon, 
     LogOut, Book, UserRoundSearch, CircleDollarSign, Settings, BadgeDollarSign, 
     Computer, ImagePlay, Grid2x2, BadgeInfo, BookUser, MapPin, DollarSign,
      GalleryThumbnails, GalleryHorizontalIcon, Users, MessageSquare } from "lucide-react"
      import { FaFileInvoiceDollar } from "react-icons/fa";
      import { TbCategoryFilled } from "react-icons/tb";
      import { PiLineSegmentsFill } from "react-icons/pi";
import { ROUTES } from "./routes"
import { useEffect, useState } from "react";

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
export const useCategoryNames = () => {
   const [isMobile, setIsMobile] = useState(false);
 
   useEffect(() => {
     const mediaQuery = window.matchMedia('(max-width: 768px)');
     setIsMobile(mediaQuery.matches);
 
     const handleMediaQueryChange = (event:any) => {
       setIsMobile(event.matches);
     };
 
     mediaQuery.addEventListener('change', handleMediaQueryChange);
     return () => {
       mediaQuery.removeEventListener('change', handleMediaQueryChange);
     };
   }, []);
 
   const categoryNames = [
     {
       id: "545458783212121",
       image: 'https://www.marjanemall.ma/media/wysiwyg/category/HOMEPAGE/homepage_desktop_webp/output_image_5__1.webp',
       name: 'Maison',
       imageBanner: isMobile
         ? 'https://www.marjanemall.ma/media/wysiwyg/offre_vedd/N1_maison/output_image_30_.webp'
         : 'https://www.marjanemall.ma/media/wysiwyg/offre_vedd/N1_maison/output_image_29_.webp',
     },
     {
       id: "545458783212121656565989845454545e4fdfdfdf",
       image: 'https://www.marjanemall.ma/media/wysiwyg/category/HOMEPAGE/homepage_desktop_webp/output_image_1.webp',
       name: 'Electronics',
       imageBanner: isMobile
         ? 'https://www.marjanemall.ma/media/wysiwyg/offre_vedd/N1_informatique/BANNIERES-N1_mobile2-gaming.webp'
         : 'https://www.marjanemall.ma/media/wysiwyg/offre_vedd/N1_informatique/SLIDE-N1-2-gaming.webp',
     },
     {
       id: "45554489663333660000zzdsdsd9890",
       image: 'https://www.marjanemall.ma/media/wysiwyg/category/HOMEPAGE/homepage_desktop_webp/output_image_6__1.webp',
       name :'TV-SON',
       imageBanner: isMobile ? 'https://www.marjanemall.ma/media/wysiwyg/offre_vedd/N1_tv/Mobile_tv-son_image_22_.webp'  :  "https://www.marjanemall.ma/media/wysiwyg/offre_vedd/N1_tv/desktiop_tv_son_image_21_.webp"
      
    },
   
    {
       id: "455544896633336600000",
       showcaseImage: 'https://www.marjanemall.ma/media/wysiwyg/category/n1_sport/Webp/output_image_12_.webp',
       image: 'https://www.marjanemall.ma/media/wysiwyg/category/HOMEPAGE/homepage_desktop_webp/output_image_2__1.webp',
       name :'sport',
       imageBanner:  isMobile ? "https://www.marjanemall.ma/media/wysiwyg/offre_vedd/N1_sport/BANNIERES-N1_mobile8_image_22_.webp" : "https://www.marjanemall.ma/media/wysiwyg/offre_vedd/N1_sport/SLIDE-N1-8-sport_image_21_.webp"
    },
    {
      
      name:"Electroménager",
      image:"/images/soso.webp",
      imageBanner: isMobile ? 'https://www.marjanemall.ma/media/wysiwyg/offre_vedd/N1_elctromege/output_image_37_.webp' : "https://www.marjanemall.ma/media/wysiwyg/offre_vedd/N1_elctromege/output_image_36_.webp",
      id:"8989ef656565fdfd554dsoand45454545"
    },
    
    
    {
       id: "0022559694998989dfdfdfd",
       image: 'https://www.marjanemall.ma/media/wysiwyg/category/HOMEPAGE/homepage_desktop_webp/output_image_8__1.webp',
       name :"Bébé & Jouets",
       imageBanner: isMobile ? "https://www.marjanemall.ma/media/wysiwyg/offre_vedd/N1_bebe/BANNIERES-N1_mobile6-b_b_jouet_image_23_.webp" :  "https://www.marjanemall.ma/media/wysiwyg/offre_vedd/N1_bebe/SLIDE-N1-6-b_b_joeut_image_24_.webp"
    },

    {
     id: "0022559694454549889",
     image: 'https://www.marjanemall.ma/media/wysiwyg/category/HOMEPAGE/homepage_desktop_webp/output_image_9__1.webp',
     name :'Beauté',
     imageBanner: isMobile ? 'https://www.marjanemall.ma/media/wysiwyg/offre_vedd/N1_beaute/output_image_13_.webp' : "https://www.marjanemall.ma/media/wysiwyg/offre_vedd/N1_beaute/output_image_14_.webp"
  },
  
  {
     id: "0022559694",
     image: 'https://www.marjanemall.ma/media/wysiwyg/category/HOMEPAGE/homepage_desktop_webp/output_image_7__1.webp',
     name :'Mode',
     imageBanner: isMobile ? 'https://www.marjanemall.ma/media/wysiwyg/offre_vedd/N1_mode/output_image_26_.webp' : "https://www.marjanemall.ma/media/wysiwyg/offre_vedd/N1_mode/output_image_25_.webp"
  },
  {
    id: "002887iiuiuip2559694",
    image: 'https://www.marjanemall.ma/media/wysiwyg/category/HOMEPAGE/homepage_desktop_webp/output_image_7__1.webp',
    name :'Bricolage',
    imageBanner: isMobile ? 'https://www.marjanemall.ma/media/wysiwyg/offre_vedd/N1_bricolage/output_image_24_.webp' : "https://www.marjanemall.ma/media/wysiwyg/offre_vedd/N1_bricolage/output_image_23_.webp"
 },
   ];
   // <source media="(max-width:768px)" srcset="https://www.marjanemall.ma/media/wysiwyg/offre_vedd/N1_bricolage/output_image_24_.webp">
 
   // Update the imageBanner property for each category based on isMobile
   const updatedCategoryNames = categoryNames.map(category => ({
     ...category,
   }));
 
   return updatedCategoryNames;
 };
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

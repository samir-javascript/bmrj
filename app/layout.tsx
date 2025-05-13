import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster"
import "./globals.css";
import { Roboto } from 'next/font/google'
import { SessionProvider } from "next-auth/react";
import CartSidebar from "@/components/shared/CartSidebar";
import { auth } from "@/auth";
import SyncCart  from "@/components/shared/SyncCart";
import { getAuthenticatedUserCart } from "@/actions/cart.actions";
import OrderDetailsSidebar from "@/components/modals/OrderDetailsSidebar";


import StoreProvider from "@/components/shared/StoreProvider";
import { UserCartElement } from "@/types/Elements";


const roboto = Roboto({
  weight: ["400","500", "700", "900"],
  subsets: ["latin"],
})
export const metadata: Metadata = {
  title : "marjanemall | Achat en ligne au Maroc aux meilleurs prix - Livraison rapide",
  description : "marjanemall Maroc, Marketplace Marocaine d'achat en ligne | Paiement en ligne ou à la livraison | Livraison rapide partout au Maroc",
  icons: {
    icon: "https://www.marjanemall.ma/static/version1747129563/frontend/Marjane/default/fr_FR/Magento_Theme/favicon.ico",
  },
};

export default async function RootLayout({

  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth()
  const result = session ? await getAuthenticatedUserCart({userId:session?.user.id}) : null;
  
  return (
    <html lang="en">
     
     
      <body
        className={`${roboto.className}`}
      >
         <StoreProvider>
         <SessionProvider session={session}>
       <CartSidebar isAuthenticated={session?.user.id !== ""}
        data={result?.data as unknown as UserCartElement || undefined}  />
       <OrderDetailsSidebar   />
       <SyncCart />
       {/* <CartInit /> */}
        {children}
        <Toaster />
        </SessionProvider>
        </StoreProvider>
      </body>
     
      
    </html>
  );
}

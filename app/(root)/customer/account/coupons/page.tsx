import React from 'react';
import ProfileItems from '@/components/navbar/ProfileItems';
import RightSidebar from '@/components/navbar/RightSidebar';


import Alert from '@/components/shared/Alert';
import { CalendarIcon} from 'lucide-react';
import ClipBoardIcon from '@/components/btns/ClipBoardIcon';

const Page = async () => {
//   const handleCopy = () => {
//   navigator.clipboard.writeText("BBD10")
//   toast({ title: "Copié", description: "Le code promo BBD10 a été copié 🎉" })
// }
  return (
    <div className='flex lg:flex-row flex-col lg:px-10 lg:py-8 gap-5 lg:gap-10'>
      <ProfileItems />
      <RightSidebar />

      {/* Separator for small screens */}
      <div className='w-full lg:hidden h-[10px] bg-gray-100' />

      {/* Main content */}
      <div className='w-full px-3 flex-1 my-5'>
       <div className="flex flex-col space-y-7">
  <h2 className="h2-bold">Mes coupons</h2>

  <div className="relative px-3 py-3 rounded-lg border border-light_blue w-full max-w-xs sm:max-w-sm">
    <div className="absolute bg-light_blue w-full h-[4px] top-0 left-0 rounded-t-lg" />

    <h3 className="text-light_blue font-extrabold text-[20px] lg:text-[24px]">10%</h3>
    <p className="text-gray-700 text-sm">Raison : -10%, <span className="font-medium text-black">max 500 DHS</span></p>

    <div className="bg-light_blue w-[75%] flex items-center justify-between rounded-lg px-2.5 py-2 mt-2">
      <p className="text-white font-medium text-[16px]">Code: <span>BBD10</span></p>
      <ClipBoardIcon />
    </div>

    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-2">
      <CalendarIcon size={14} /> Valide du 08 au 09 Juin 2025
    </p>
  </div>
</div>

         {/* <Alert message="Vous n’avez aucun coupon" /> */}
      </div>
     
    </div>
  );
};
export default Page
"use client"

import useMobile from "@/hooks/use-mobile";

const GridDisplay = () => {
    const isMobile = useMobile()
    
  return (
    <div className="my-7 flex flex-col">
      <h2 className="h2-bold mb-4 max-lg:px-3">Nos catégories vedettes</h2>
      <div className="grid max-sm:mx-3 grid-cols-4  max-sm:grid-cols-2 grid-rows-2 gap-3 sm:h-[600px]">
 {/* First (Tall) Image  */}
<div className="row-span-2 col-span-2">
  <img
    src={isMobile ? "https://www.marjanemall.ma/media/wysiwyg/mosaique-mobile_2.png" : "https://www.marjanemall.ma/media/wysiwyg/mosaique-desktop_2.png"}
    alt="Category 1"
    className=" h-full w-full object-fill rounded-lg"
  />
</div>

 {/* Second (Stacked Top)  */}
<div>
  <img
    src="https://www.marjanemall.ma/media/wysiwyg/terroir-mosaique-desktop_1.jpg"
    alt="Category 2"
    className="w-full h-full object-cover  rounded-lg"
  />
</div>

 {/* Third (Right Image)  */}
<div className="row-span-2">
  <img
   src={ isMobile ? "https://www.marjanemall.ma/media/wysiwyg/desktop_1.png" : "https://www.marjanemall.ma/media/wysiwyg/desktop_1.png"}
   
    alt="Category 3"
    className="w-full h-full object-cover rounded-lg"
  />
</div>

 {/* Fourth (Stacked Bottom)  */}
<div>
  <img
    src="https://www.marjanemall.ma/media/wysiwyg/priere-mosaique--desktop_3.png"
    alt="Category 4"
    className="w-full h-full object-cover rounded-lg"
  />
</div>
</div> 
     
    </div>
  );
};


export default GridDisplay;

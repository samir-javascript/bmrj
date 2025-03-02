
import ProductCard from "@/components/cards/ProductCard";
import CategoriesSlider from "@/components/shared/CategoriesSlider";
import { HeroCarousel } from "@/components/shared/HeroCarousel";
import TopFlow from "@/components/shared/TopFlow";


export default async function Home() {
 
  return (
    <div className="w-full">
      
        <HeroCarousel />
        <TopFlow />
     
      <CategoriesSlider />
       <section className="max-w-7xl mx-auto">
          <h2>Nos coups de cœurs</h2>
          <div className="flex items-center flex-wrap gap-3">
          {[0,1,2,3,4,5,6,7,8,9,10].map((_,index) => (
              <div key={index}>
                    <ProductCard />
              </div>
          ))}
          </div>
          
       </section>
       </div>
  );
}

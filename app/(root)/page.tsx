
import { hasSavedProduct } from "@/actions/collection.actions";
import { getProducts } from "@/actions/product.actions";
import { getHeroImages } from "@/actions/uploads.actions";

import ProductCard from "@/components/cards/ProductCard";

import CategoriesSlider from "@/components/shared/CategoriesSlider";
import GridDisplay from "@/components/shared/GridDisplay";
import { HeroCarousel } from "@/components/shared/HeroCarousel";
import HorizontalCarousel from "@/components/shared/HorizontalCarousel";
import TopFlow from "@/components/shared/TopFlow";


export default async function Home() {

  const [result, res] = await Promise.all([
    getProducts({}),
    getHeroImages(),
  ]);
  
   const { items } = res.data!;
   const { products} = result.data!;
  
  return (
    <div className="w-full">
      
        <HeroCarousel items={items!} />
        <TopFlow />
    
      <CategoriesSlider />
       <section className="max-w-7xl mx-auto">
         
          <HorizontalCarousel data={result.data?.products} showPagination={false} title="Nos Deals du printemps" />
          <GridDisplay />
          <HorizontalCarousel showPagination={true} title="Meilleures ventes" />
          <HorizontalCarousel showPagination={true} title="Notre sélection mode" />
         
       </section>
      
       </div>
  );
}

import mongoose from "mongoose";
export interface IHero {
  _id: string;
  title: string;
  imgUrl: {
    desktop: string;
    mobile: string;
  };
  isActive: boolean;
}
const HeroImageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
      imgUrl: {
        desktop: String,
        mobile: String
      },   
    isActive: {
      type: Boolean,
      default: true, // Only active hero images will be displayed
    },
  },
  { timestamps: true }
);

const HeroImage = mongoose.models.HeroImage || mongoose.model("HeroImage", HeroImageSchema);
export default HeroImage;

import React from "react";
import Section from "../components/Sections/Section";
import BrandSection from "../components/BrandSection/BrandSection";
import ContactUs from "../components/ContactUs";
import BannerCarousel from "../components/BannerCarousel/BannerCarousel";
import ProductList from "../components/ProductList/ProductList";
import Banner from "../components/Banner/Banner";
import qualitySvg from "../assets/quality.svg";
import { CommonLayout } from "../layouts/common";

const Home = () => {
  return (
    <div>
      <CommonLayout>
        <BannerCarousel></BannerCarousel>
        <ProductList></ProductList>
        <Banner></Banner>
        <BrandSection
          title="Thương hiệu yêu thích"
          svgImg={qualitySvg}
          categories={null}
        ></BrandSection>
        <Section title="Sản phẩm theo đối tượng" svgImg={qualitySvg}></Section>
        {/* <FeedBack></FeedBack> */}
        <ContactUs></ContactUs>
      </CommonLayout>
    </div>
  );
};

export default Home;

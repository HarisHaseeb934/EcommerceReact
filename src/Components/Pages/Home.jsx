import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";
import ProductCard from "./Ui/Product/ProductCard";
import { getCategory } from "../Api/axiosInstance";
import HomeSections from "./Ui/HomeSections";

const Home = () => {

  return (
    <section className="w-full">
      <div className="bg-[url(BG.jpg)] bg-center bg-no-repeat bg-fill bg-cover">
        <div className="bg-linear-to-t from-surface/80 via-surface/40 to-transparent">
          <div className="m-auto max-w-container-max text-center py-20 px-margin-mobile md:px-margin-desktop flex flex-col justify-center items-center gap-stack-md">
            <h1 className="text-display-lg-mobile md:text-display-lg text-on-surface font-sans">
              Upgrade Your Lifestyle
            </h1>
            <h2 className="text-on-surface-variant text-headline-md">
              Discover the latest in premium electronics and home goods
            </h2>
            <NavLink
              to={"/shop"}
              className="block bg-primary text-on-primary rounded-lg py-3 px-6 text-body-base font-semibold hover:bg-primary-container transition-colors"
            >
              Explore Collection
            </NavLink>
          </div>
        </div>
      </div>
      <HomeSections slug = {"laptops"} title={"Laptops"}/>
      <HomeSections slug = {"smartphones"} title={"SmartPhones"}/>
    </section>
  );
};

export default Home;

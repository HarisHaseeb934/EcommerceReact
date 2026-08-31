import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <section className="bg-[url(BG.jpg)] bg-center bg-no-repeat bg-fill bg-cover">
      <div className="bg-linear-to-t from-surface/80 via-surface/40 to-transparent">
        <div className="m-auto max-w-container-max text-center py-20 px-margin-mobile md:px-margin-desktop flex flex-col justify-center items-center gap-stack-md">
          <h1 className="text-on-surface text-display-lg-mobile md:text-display-lg">
            Upgrade Your Lifestyle
          </h1>
          <h2 className="text-on-surface-variant text-headline-md">
            Discover the latest in premium electronics and home goods
          </h2>
          <NavLink to={"/shop"} className="block w-50 bg-primary py-3 px-5 text-body-sm font-semibold text-on-primary rounded-lg text-center">
            Explore Collection
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default Home;
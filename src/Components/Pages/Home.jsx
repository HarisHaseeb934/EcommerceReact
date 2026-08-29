import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <section className="bg-[url(BG.jpg)] bg-center bg-no-repeat bg-fill bg-cover">
      <div className="bg-linear-to-t from-[#faf8ff]/80 via-[#faf8ff]/40 to-transparent">
        <div className="m-auto max-w-xl text-center py-25 flex flex-col justify-center items-center">
          <h1 className="text-[#131B2E] text-2xl sm:text-3xl md:text-5xl font-bold my-2">
            Upgrade Your Lifestyle
          </h1>
          <h2 className="text-[#464555] text-xl sm:text-2xl font-semibold my-2">
            Discover the latest in premium electronics and home goods
          </h2>
          <NavLink to={"/shop"} className="block w-[200px] bg-[#3525CD] py-3 px-5 text-[14px] my-2 font-semibold text-white rounded-xl">
            Explore Collection
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default Home;

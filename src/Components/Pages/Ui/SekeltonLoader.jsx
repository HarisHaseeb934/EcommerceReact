import { Loader } from "./Loader";

export const SkeletonLosder = () => {
  return (
    <section className="w-full">
      <div className="max-w-5xl w-full m-auto flex justify-evenly">
        <Loader/>
        <Loader/>
        <Loader/>
      </div>
    </section>
  );
};

import Link from "next/link";

const NotFound = () => {
  return (
    <section className="flex flex-col justify-center items-center h-svh text-center max-lg:top-[96px] relative bg-[#EAEEFE]">
      <h1 className="sm:text-[130px] text-8xl font-bold bg-text">404</h1>
      <p className="text-xl mb-6">Oops! This page does not exist.</p>
      <Link
        href="/"
        className="px-6 py-3 bg-black text-white font-semibold rounded btn-hover "
      >
        Go Back to Home
      </Link>
    </section>
  );
};

export default NotFound;

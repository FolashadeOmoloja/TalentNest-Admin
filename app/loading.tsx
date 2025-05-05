import Logo from "@/components/Elements/Logo";

const loading = () => (
  <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#EAEEFE] via-[#EAEEFE]  to-[#183dc23d]">
    <div className="flex flex-col items-center gap-6">
      {/* Logo Text */}
      <Logo />

      {/* Spinner with animated text */}
      <div className="flex items-center gap-4">
        {/* Circular Spinner */}
        <div
          className="w-16 h-16 rounded-full animate-spin"
          style={{
            background:
              "conic-gradient(from 0deg, #EAEEFE, #183dc2a8, #010D3E)",
            maskImage:
              "radial-gradient(farthest-side, transparent 40%, black 41%)",
            WebkitMaskImage:
              "radial-gradient(farthest-side, transparent 40%, black 41%)",
          }}
        ></div>
      </div>
    </div>
  </section>
);

export default loading;

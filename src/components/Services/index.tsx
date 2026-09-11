const services = [
  {
    title: "Landing & static pages",
    description:
      "One-page and multi-page sites for launches, services and campaigns. Responsive, quick to load, easy to update.",
    price: "from ₾2,500",
  },
  {
    title: "Web applications",
    description:
      "Dashboards, booking systems, portals and internal tools, with an admin panel and the integrations you already use.",
    price: "quoted on scope",
  },
  {
    title: "E-commerce",
    description:
      "Stores with catalogue, cart, local payment providers and delivery — built for real inventory and real traffic.",
    price: "quoted on scope",
  },
];

const brandingTags = [
  "Logo & identity",
  "Wireframes",
  "Interface design",
  "Design systems",
];

function ServiceIcon() {
  return (
    <svg width="26" height="20" viewBox="0 0 34 26" aria-hidden="true">
      <rect x="0" y="10" width="12" height="6" rx="1" fill="#FF7A00" />
      <polygon points="10,2 18,2 30,13 18,24 10,24 22,13" fill="#0E0E0E" />
    </svg>
  );
}

export default function Services() {
  return (
    <section
      id="services"
      className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-[56px] sm:py-20 lg:py-[104px]"
    >
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <span className="text-[12.5px] font-semibold tracking-[0.14em] uppercase text-[#FF7A00]">
            Services
          </span>
          <h2 className="mt-3 font-outfit font-extrabold text-[clamp(28px,3.4vw,46px)] leading-[1.08] tracking-[-0.03em] text-[#0E0E0E]">
            What we build
          </h2>
        </div>
        <p className="m-0 max-w-[38ch] text-[16px] leading-[1.6] text-[#4A4744]">
          Three ways to work with us, plus the design work that sits in front
          of the build.
        </p>
      </div>

      <div
        className="mt-10 grid gap-5"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}
      >
        {services.map((service) => (
          <div
            key={service.title}
            className="flex flex-col gap-3.5 rounded-xl border border-[#EDEAE6] p-7 transition-[border-color,transform] duration-[250ms] hover:border-[#FF7A00]/40 hover:-translate-y-1"
          >
            <ServiceIcon />
            <h3 className="mt-1.5 font-outfit font-bold text-[21px] text-[#0E0E0E]">
              {service.title}
            </h3>
            <p className="m-0 text-[15.5px] leading-[1.6] text-[#4A4744]">
              {service.description}
            </p>
            <div className="mt-auto pt-3.5 border-t border-[#F1EEEA] font-outfit font-bold text-[17px] text-[#0E0E0E]">
              {service.price}
            </div>
          </div>
        ))}
      </div>

      <div
        className="mt-5 grid items-center gap-[22px] rounded-xl border border-[#EDEAE6] bg-[#F7F6F4] p-7"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}
      >
        <div>
          <h3 className="m-0 font-outfit font-bold text-[21px] text-[#0E0E0E]">
            Branding &amp; UI/UX
          </h3>
          <p className="mt-2.5 max-w-[46ch] text-[15.5px] leading-[1.6] text-[#4A4744]">
            Identity, type and a small system that holds together — plus
            wireframes and interface design before the build starts.
          </p>
        </div>
        <div className="flex flex-wrap gap-2.5">
          {brandingTags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[#E3DFDA] bg-white px-3.5 py-2 text-[13.5px] text-[#0E0E0E]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

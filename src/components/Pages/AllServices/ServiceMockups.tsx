// Small code-drawn illustrations for the service cards. They scale with their
// container, so they stay sharp and add no image weight.

function BrowserFrame({
  children,
  dark = false,
}: {
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <div
      className={`absolute inset-x-[8%] top-[12%] bottom-0 rounded-t-[10px] overflow-hidden border border-b-0 ${
        dark
          ? "bg-[#1C1C1E] border-white/10 shadow-[0_-10px_40px_-12px_rgba(0,0,0,0.6)]"
          : "bg-white border-[#E3DFDA] shadow-[0_-10px_40px_-16px_rgba(14,14,14,0.25)]"
      }`}
    >
      <div
        className={`flex items-center gap-[3%] px-[4%] h-[11%] border-b ${
          dark ? "border-white/10" : "border-[#F1EEEA]"
        }`}
      >
        <span className="w-[2.2%] aspect-square rounded-full bg-[#FF5F57]" />
        <span className="w-[2.2%] aspect-square rounded-full bg-[#FEBC2E]" />
        <span className="w-[2.2%] aspect-square rounded-full bg-[#28C840]" />
        <span
          className={`ml-[4%] h-[38%] w-[40%] rounded-full ${
            dark ? "bg-white/10" : "bg-[#F3F1EE]"
          }`}
        />
      </div>
      <div className="relative h-[89%]">{children}</div>
    </div>
  );
}

export function LandingMockup() {
  return (
    <BrowserFrame>
      <div className="absolute inset-0 px-[6%] pt-[5%] flex flex-col">
        <div className="flex items-center justify-between">
          <span className="h-[7px] w-[16%] rounded-full bg-[#0E0E0E]" />
          <div className="flex gap-[6px] w-[38%] justify-end">
            <span className="h-[5px] w-[22%] rounded-full bg-[#D9D5CF]" />
            <span className="h-[5px] w-[22%] rounded-full bg-[#D9D5CF]" />
            <span className="h-[5px] w-[22%] rounded-full bg-[#D9D5CF]" />
          </div>
        </div>
        <div className="mt-[8%] flex items-center gap-[6%]">
          <div className="flex-1 flex flex-col gap-[7px]">
            <span className="h-[10px] w-[92%] rounded-full bg-[#0E0E0E]" />
            <span className="h-[10px] w-[70%] rounded-full bg-[#0E0E0E]" />
            <span className="mt-[2px] h-[5px] w-[85%] rounded-full bg-[#D9D5CF]" />
            <span className="h-[5px] w-[60%] rounded-full bg-[#D9D5CF]" />
            <span className="mt-[6px] h-[14px] w-[38%] rounded-full bg-[#FF7A00]" />
          </div>
          <div className="relative w-[38%] aspect-square rounded-[10px] bg-gradient-to-br from-[#FFB36B] to-[#FF7A00] overflow-hidden">
            <span className="absolute -right-[18%] -bottom-[18%] w-[70%] aspect-square rounded-full bg-white/25" />
            <span className="absolute left-[16%] top-[16%] w-[30%] aspect-square rounded-full bg-white/40" />
          </div>
        </div>
        <div className="mt-[8%] grid grid-cols-3 gap-[6px]">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-[6px] bg-[#F7F6F4] p-[8%] flex flex-col gap-[4px]">
              <span className="w-[22%] aspect-square rounded-full bg-[#FF7A00]/70" />
              <span className="h-[4px] w-[80%] rounded-full bg-[#D9D5CF]" />
            </div>
          ))}
        </div>
      </div>
    </BrowserFrame>
  );
}

export function DashboardMockup() {
  const bars = [42, 64, 50, 78, 58, 90, 70];
  return (
    <BrowserFrame dark>
      <div className="absolute inset-0 flex">
        <div className="w-[20%] border-r border-white/10 p-[4%] flex flex-col gap-[8px]">
          <span className="w-[40%] aspect-square rounded-[4px] bg-[#FF7A00]" />
          {[70, 55, 62, 48].map((w, i) => (
            <span
              key={i}
              className={`h-[5px] rounded-full ${i === 0 ? "bg-white/70" : "bg-white/20"}`}
              style={{ width: `${w}%` }}
            />
          ))}
        </div>
        <div className="flex-1 p-[4%] flex flex-col gap-[6%]">
          <div className="grid grid-cols-3 gap-[6px]">
            {["#FF7A00", "#FFFFFF", "#FFFFFF"].map((c, i) => (
              <div key={i} className="rounded-[6px] bg-white/[0.06] p-[8%] flex flex-col gap-[5px]">
                <span className="h-[4px] w-[50%] rounded-full bg-white/25" />
                <span className="h-[8px] w-[70%] rounded-full" style={{ backgroundColor: c, opacity: i ? 0.8 : 1 }} />
              </div>
            ))}
          </div>
          <div className="flex-1 rounded-[6px] bg-white/[0.06] p-[4%] flex items-end gap-[5%]">
            {bars.map((h, i) => (
              <span
                key={i}
                className={`flex-1 rounded-t-[3px] ${i === 5 ? "bg-[#FF7A00]" : "bg-white/25"}`}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

export function ShopMockup() {
  const products = [
    "from-[#FFD8B0] to-[#FFB36B]",
    "from-[#E9E6E1] to-[#CFCAC3]",
    "from-[#FFB36B] to-[#FF7A00]",
  ];
  return (
    <BrowserFrame>
      <div className="absolute inset-0 px-[6%] pt-[5%] flex flex-col">
        <div className="flex items-center justify-between">
          <span className="h-[7px] w-[16%] rounded-full bg-[#0E0E0E]" />
          <div className="relative w-[9%] aspect-square rounded-full bg-[#0E0E0E] flex items-center justify-center">
            <span className="w-[40%] aspect-square rounded-[2px] border-[1.5px] border-white" />
            <span className="absolute -top-[25%] -right-[25%] w-[55%] aspect-square rounded-full bg-[#FF7A00] border-2 border-white" />
          </div>
        </div>
        <div className="mt-[6%] flex gap-[5px]">
          <span className="h-[12px] w-[18%] rounded-full bg-[#0E0E0E]" />
          <span className="h-[12px] w-[16%] rounded-full bg-[#F3F1EE]" />
          <span className="h-[12px] w-[20%] rounded-full bg-[#F3F1EE]" />
        </div>
        <div className="mt-[6%] grid grid-cols-3 gap-[7px]">
          {products.map((g, i) => (
            <div key={i} className="flex flex-col gap-[5px]">
              <div className={`relative aspect-[4/5] rounded-[7px] bg-gradient-to-br ${g} overflow-hidden`}>
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[46%] aspect-square rounded-full bg-white/45" />
              </div>
              <span className="h-[4px] w-[80%] rounded-full bg-[#D9D5CF]" />
              <div className="flex items-center justify-between">
                <span className="h-[6px] w-[40%] rounded-full bg-[#0E0E0E]" />
                <span className="w-[22%] aspect-square rounded-full bg-[#FF7A00]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </BrowserFrame>
  );
}

import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const DARK = "#0E0E0E";
const ORANGE = "#FF7A00";
const GRAY = "#4A4A4E";

/** Fetches just the glyphs we need from Google Fonts (TTF, which the OG renderer understands) */
async function googleFont(family: string, weight: number, text: string): Promise<ArrayBuffer> {
  const url = `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, "+")}:wght@${weight}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const src = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1];
  if (!src) throw new Error(`Could not load font ${family} ${weight}`);
  return (await fetch(src)).arrayBuffer();
}

async function dataUri(path: string, width: number, format: "png" | "jpeg") {
  const buf = await sharp(await readFile(path))
    .resize({ width, withoutEnlargement: true })
    [format]({ quality: 82 })
    .toBuffer();
  return `data:image/${format};base64,${buf.toString("base64")}`;
}

/**
 * Maps a bundled image URL ("/_next/static/media/zmna.27xjdrztq_-ao.jpg") back to its
 * source file in src/Assets/images, so the OG image can embed the project screenshot.
 */
export function assetPathFromSrc(src: string): string | null {
  const file = src.split("/").pop() ?? "";
  const match = file.match(/^(.+?)\.[^.]+\.(\w+)$/);
  return match ? join(process.cwd(), "src/Assets/images", `${match[1]}.${match[2]}`) : null;
}

export async function renderOgImage({
  eyebrow,
  title,
  description,
  imagePath,
}: {
  eyebrow: string;
  title: string;
  description: string;
  /** Optional screenshot shown on the right (project pages) */
  imagePath?: string | null;
}) {
  const logo = await dataUri(join(process.cwd(), "src/Assets/images/gargari-logo-dark.png"), 360, "png");
  let screenshot: string | null = null;
  if (imagePath) {
    try {
      screenshot = await dataUri(imagePath, 720, "jpeg");
    } catch {
      screenshot = null;
    }
  }

  // Uppercase Latin eyebrows here (not with CSS) so the font subset includes the capitals;
  // Georgian stays as is, uppercasing it would turn it into Mtavruli
  const label = /[Ⴀ-ჿ]/.test(eyebrow) ? eyebrow : eyebrow.toUpperCase();
  const summary = description.length > 150 ? `${description.slice(0, 147).trimEnd()}…` : description;
  const text = `${label}${title}${summary}gargari.ge`;
  // Georgian fonts only when there is Georgian text; a missing font must not break the build
  const georgianText = text.match(/[Ⴀ-ჿ]/g)?.join("") ?? "";
  const load = (family: string, weight: number, chars: string) =>
    chars ? googleFont(family, weight, chars).catch(() => null) : Promise.resolve(null);
  const [titleLatin, titleGeorgian, bodyLatin, bodyGeorgian] = await Promise.all([
    load("Outfit", 800, text),
    load("Noto Sans Georgian", 800, georgianText),
    load("Outfit", 500, text),
    load("Noto Sans Georgian", 500, georgianText),
  ]);
  const fonts = [
    { name: "Outfit", data: titleLatin, weight: 800 as const },
    { name: "Noto Sans Georgian", data: titleGeorgian, weight: 800 as const },
    { name: "Outfit", data: bodyLatin, weight: 500 as const },
    { name: "Noto Sans Georgian", data: bodyGeorgian, weight: 500 as const },
  ].flatMap((f) => (f.data ? [{ ...f, data: f.data, style: "normal" as const }] : []));

  const fontFamily = "Outfit, Noto Sans Georgian";
  const hasImage = Boolean(screenshot);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: "#F7F6F4",
          backgroundImage: "radial-gradient(#E3DFDA 1.5px, transparent 1.5px)",
          backgroundSize: "26px 26px",
          fontFamily,
          position: "relative",
        }}
      >
        {/* Soft orange glow */}
        <div
          style={{
            position: "absolute",
            right: -160,
            top: -160,
            width: 560,
            height: 560,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(255,122,0,0.20) 0%, rgba(255,122,0,0) 70%)",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "64px 72px",
            width: hasImage ? 640 : 1200,
            height: "100%",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo} alt="" height={86} style={{ height: 86, width: 187 }} />

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                color: ORANGE,
                fontSize: 24,
                fontWeight: 800,
                letterSpacing: 2,
                marginBottom: 18,
              }}
            >
              {label}
            </div>
            <div
              style={{
                display: "flex",
                color: DARK,
                fontSize: hasImage ? 54 : 66,
                fontWeight: 800,
                lineHeight: 1.08,
                letterSpacing: -1.5,
              }}
            >
              {title}
            </div>
            <div
              style={{
                display: "flex",
                color: GRAY,
                fontSize: 26,
                fontWeight: 500,
                lineHeight: 1.45,
                marginTop: 22,
                maxWidth: hasImage ? 500 : 900,
              }}
            >
              {summary}
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ width: 44, height: 10, borderRadius: 4, backgroundColor: ORANGE, marginRight: 16 }} />
            <div style={{ display: "flex", color: DARK, fontSize: 26, fontWeight: 800 }}>gargari.ge</div>
          </div>
        </div>

        {screenshot && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 560,
              height: "100%",
              paddingRight: 64,
            }}
          >
            <div
              style={{
                display: "flex",
                padding: 10,
                backgroundColor: "#FFFFFF",
                border: "1px solid #E3E3E6",
                borderRadius: 18,
                boxShadow: "0 30px 60px -20px rgba(14,14,14,0.35)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={screenshot}
                alt=""
                width={476}
                height={357}
                style={{ width: 476, height: 357, objectFit: "cover", borderRadius: 10 }}
              />
            </div>
          </div>
        )}
      </div>
    ),
    {
      ...OG_SIZE,
      fonts,
    },
  );
}

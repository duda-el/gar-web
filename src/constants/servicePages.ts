// One landing page per service (/services/<slug>), each aimed at its own search queries:
// "ლენდინგ გვერდის დამზადება", "ონლაინ მაღაზიის დამზადება", "ვებ აპლიკაციის დამზადება",
// "ლოგოს დიზაინი". Facts (prices, timelines, support) match the rest of the site.
import { STARTING_PRICE_GEL } from "@/constants/site";
import type { Locale } from "@/i18n/config";

export type ServiceSection = { heading: string; paragraphs?: string[]; bullets?: string[] };

export type ServicePageContent = {
  /** Short name for links and breadcrumbs */
  name: string;
  /** One line for service cards and link lists */
  summary: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  /** H1, carries the main search phrase */
  title: string;
  intro: string;
  price: string;
  timeline: string;
  sections: ServiceSection[];
  faqs: { question: string; answer: string }[];
};

export type ServicePage = {
  slug: "landing-page" | "online-shop" | "web-app" | "branding";
  /** schema.org serviceType */
  serviceType: string;
  /** Lowest price in GEL, when there is a fixed starting price */
  minPrice?: number;
  /** Portfolio projects shown as examples (slugs from constants/projects) */
  projects: string[];
  content: Record<Locale, ServicePageContent>;
};

export const servicePages: ServicePage[] = [
  {
    slug: "landing-page",
    serviceType: "Website development",
    minPrice: STARTING_PRICE_GEL,
    projects: ["reagent-ge", "reputation-ge", "gms-turbo"],
    content: {
      ka: {
        name: "ლენდინგი და სავიზიტო საიტი",
        summary: "ერთ- და მრავალგვერდიანი საიტები ბიზნესისთვის, სერვისებისა და კამპანიებისთვის.",
        metaTitle: "ლენდინგ გვერდის და სავიზიტო საიტის დამზადება ₾1,000-დან",
        metaDescription:
          "ლენდინგ გვერდის, სავიზიტო და კორპორატიული საიტის დამზადება თბილისში. სწრაფი, მობილურზე მორგებული და SEO-სთვის მზა ვებსაიტი 2–3 კვირაში, ფასი ₾1,000-დან.",
        eyebrow: "ლენდინგი და სავიზიტო საიტი",
        title: "ლენდინგ გვერდისა და სავიზიტო საიტის დამზადება",
        intro:
          "ერთ- ან მრავალგვერდიანი საიტი თქვენი ბიზნესისთვის, სერვისისთვის ან სარეკლამო კამპანიისთვის. ვაწყობთ ნულიდან, შაბლონის გარეშე: სწრაფად იტვირთება, ტელეფონზე კარგად ჩანს და Google-ში მოსაძებნად პირველივე დღიდან მზადაა.",
        price: "₾1,000-დან",
        timeline: "2–3 კვირა",
        sections: [
          {
            heading: "ვისთვისაა ლენდინგი ან სავიზიტო საიტი",
            paragraphs: [
              "თუ გჭირდებათ ადგილი ინტერნეტში, სადაც კლიენტი გაიგებს, რას აკეთებთ, ნახავს ფასებს და დაგიკავშირდებათ, ეს სწორედ ის ფორმატია. ასეთ საიტს ყველაზე ხშირად გვიკვეთავენ:",
            ],
            bullets: [
              "მცირე და საშუალო ბიზნესები: სალონები, კლინიკები, რესტორნები, სამშენებლო და სერვისული კომპანიები",
              "ახალი პროდუქტის, სერვისის ან აპლიკაციის გასაშვებად",
              "Facebook-ისა და Google-ის სარეკლამო კამპანიებისთვის, სადაც მთავარია ერთი მოქმედება: ზარი, განაცხადი ან შეკვეთა",
              "ექსპერტები და ფრილანსერები, რომლებსაც პორტფოლიო საიტი სჭირდებათ",
            ],
          },
          {
            heading: "რა შედის საიტის დამზადებაში",
            bullets: [
              "საიტის სტრუქტურა და ტექსტების დალაგება ბრიფის მიხედვით",
              "ინდივიდუალური დიზაინი, რომელსაც დეველოპმენტამდე ამტკიცებთ",
              "ტელეფონზე, ტაბლეტსა და კომპიუტერზე მორგებული ვერსია",
              "ქართული და, საჭიროების შემთხვევაში, ინგლისური ვერსია",
              "საკონტაქტო ფორმა, ზარისა და მესენჯერის ღილაკები",
              "საბაზისო SEO: სათაურები, აღწერები, sitemap, სტრუქტურირებული მონაცემები და Google Search Console",
              "Google Analytics და Meta Pixel",
              "დომენის, ჰოსტინგისა და SSL სერტიფიკატის მოწყობა",
              "ერთი თვის უფასო მხარდაჭერა გაშვების შემდეგ",
            ],
          },
          {
            heading: "ლენდინგ გვერდის დამზადების ფასი და ვადები",
            paragraphs: [
              "ლენდინგ გვერდისა და სავიზიტო საიტის დამზადების ფასი ₾1,000-დან იწყება. საბოლოო ფასი დამოკიდებულია გვერდების რაოდენობაზე, ენებზე და დამატებით ფუნქციებზე, მაგალითად ჯავშნის ფორმაზე ან ბლოგზე. ფიქსირებულ ფასს ბრიფიდან ორ დღეში გიგზავნით და მუშაობის დროს ის არ იცვლება.",
              "საშუალოდ ლენდინგი 2–3 კვირაში ეშვება. სატესტო ბმულს პირველივე კვირიდან ხედავთ, ასე რომ ყოველ ეტაპზე იცით, სად ვართ.",
            ],
          },
          {
            heading: "რატომ არა მზა შაბლონი ან კონსტრუქტორი",
            paragraphs: [
              "კონსტრუქტორზე აწყობილი საიტები ხშირად ნელა იტვირთება და ერთმანეთს ჰგავს. ჩვენ კოდს ხელით ვწერთ Next.js-ზე, ამიტომ საიტი სწრაფია: ჩვენი პროექტების მედიანა PageSpeed-ში 98/100-ია, ხოლო სწრაფ საიტებს Google უკეთ აფასებს. საიტი სრულად თქვენი საკუთრებაა და კონსტრუქტორის ყოველთვიური გადასახადი არ გჭირდებათ.",
            ],
          },
        ],
        faqs: [
          {
            question: "რა ღირს ლენდინგ გვერდის დამზადება?",
            answer:
              "ფასი ₾1,000-დან იწყება. ზუსტ ფასს ბრიფის მიხედვით ვადგენთ და მუშაობის დაწყებამდე წერილობით გიგზავნით.",
          },
          {
            question: "რით განსხვავდება ლენდინგი სავიზიტო საიტისგან?",
            answer:
              "ლენდინგი ჩვეულებრივ ერთი გვერდია, რომელიც ერთ მიზანზეა ორიენტირებული, მაგალითად განაცხადზე ან ზარზე. სავიზიტო საიტს რამდენიმე გვერდი აქვს: მთავარი, სერვისები, ჩვენ შესახებ და კონტაქტი. ორივეს ერთნაირი ხარისხით ვაწყობთ, განსხვავება მოცულობაშია.",
          },
          {
            question: "ტექსტებს ვინ წერს?",
            answer:
              "ინფორმაციას თქვენი ბიზნესის შესახებ თქვენ გვაწვდით, ტექსტებს კი საჭიროების შემთხვევაში ერთად ვალაგებთ, რომ საიტზე მკაფიოდ იკითხებოდეს და Google-ისთვისაც სწორად იყოს დაწერილი.",
          },
          {
            question: "საიტი Google-ში გამოჩნდება?",
            answer:
              "დიახ. ყველა საიტს საბაზისო SEO-თი ვაბარებთ: სწორი სათაურებით, აღწერებით, sitemap-ით და Google Search Console-ში რეგისტრაციით. პოზიციები კონკურენციასა და კონტენტზეა დამოკიდებული, თუმცა ტექნიკურად საიტი ინდექსაციისთვის სრულად მზადაა.",
          },
        ],
      },
      en: {
        name: "Landing pages & business websites",
        summary: "Single and multi-page websites for businesses, services and campaigns.",
        metaTitle: "Landing Page & Business Website Development from ₾1,000",
        metaDescription:
          "Landing page, business and corporate website development in Tbilisi, Georgia. Fast, mobile-first, SEO-ready websites in 2–3 weeks, from ₾1,000.",
        eyebrow: "Landing pages & business websites",
        title: "Landing page and business website development",
        intro:
          "A single or multi-page website for your business, service or ad campaign. Built from scratch, no templates: it loads fast, looks right on phones and is ready to be found on Google from day one.",
        price: "from ₾1,000",
        timeline: "2–3 weeks",
        sections: [
          {
            heading: "Who a landing page or business website is for",
            paragraphs: [
              "If you need a place online where customers learn what you do, see your prices and get in touch, this is the format. It is most often ordered by:",
            ],
            bullets: [
              "Small and medium businesses: salons, clinics, restaurants, construction and service companies",
              "Launches of a new product, service or app",
              "Facebook and Google ad campaigns built around one action: a call, a lead or an order",
              "Experts and freelancers who need a portfolio site",
            ],
          },
          {
            heading: "What website development includes",
            bullets: [
              "Site structure and copy organised from your brief",
              "Custom design you approve before development",
              "Versions tuned for phones, tablets and desktops",
              "Georgian and, if needed, English versions",
              "Contact form, call and messenger buttons",
              "Core SEO: titles, descriptions, sitemap, structured data and Google Search Console",
              "Google Analytics and the Meta Pixel",
              "Domain, hosting and SSL setup",
              "One month of free support after launch",
            ],
          },
          {
            heading: "Landing page price and timeline",
            paragraphs: [
              "Landing pages and business websites start from ₾1,000. The final price depends on the number of pages, languages and extra features such as a booking form or a blog. You get a fixed price within two days of the brief, and it does not change during the work.",
              "A landing page typically launches in 2–3 weeks. You see a staging link from the first week, so you always know where things stand.",
            ],
          },
          {
            heading: "Why not a template or a site builder",
            paragraphs: [
              "Sites made with builders often load slowly and look alike. We hand-write the code in Next.js, so the site is fast: our projects score a median of 98/100 on PageSpeed, and Google rewards fast sites. The site is fully yours, with no monthly builder fee.",
            ],
          },
        ],
        faqs: [
          {
            question: "How much does a landing page cost?",
            answer:
              "Prices start from ₾1,000. We set the exact price from your brief and send it in writing before any work begins.",
          },
          {
            question: "What is the difference between a landing page and a business website?",
            answer:
              "A landing page is usually one page focused on a single goal, such as a lead or a call. A business website has several pages: home, services, about and contact. We build both to the same standard; the difference is scope.",
          },
          {
            question: "Who writes the copy?",
            answer:
              "You give us the facts about your business, and if needed we shape the copy together so it reads clearly and is written correctly for Google.",
          },
          {
            question: "Will the site show up on Google?",
            answer:
              "Yes. Every site ships with core SEO: proper titles and descriptions, a sitemap and Google Search Console setup. Rankings depend on competition and content, but technically the site is fully ready to be indexed.",
          },
        ],
      },
    },
  },
  {
    slug: "online-shop",
    serviceType: "E-commerce website development",
    projects: ["i-techno", "gms-turbo", "mechanx"],
    content: {
      ka: {
        name: "ონლაინ მაღაზია",
        summary: "ინტერნეტ მაღაზია კატალოგით, კალათითა და ბანკის ონლაინ გადახდით.",
        metaTitle: "ონლაინ მაღაზიის დამზადება: კატალოგი, კალათა, ონლაინ გადახდა",
        metaDescription:
          "ონლაინ მაღაზიის დამზადება თბილისში: პროდუქტების კატალოგი, კალათა, ბანკის ონლაინ გადახდა, მიწოდება და მართვის პანელი. სწრაფი და Google-ისთვის ოპტიმიზებული ინტერნეტ მაღაზია.",
        eyebrow: "ონლაინ მაღაზია",
        title: "ონლაინ მაღაზიის დამზადება",
        intro:
          "ინტერნეტ მაღაზია, რომელიც ყიდის: მარტივი კატალოგით, სწრაფი კალათით და ადგილობრივი ბანკების ონლაინ გადახდით. ვაწყობთ რეალური მარაგისა და ტრაფიკისთვის, რომ მაღაზია ზრდასთან ერთად არ შენელდეს.",
        price: "ფასი მოცულობის მიხედვით",
        timeline: "4–8 კვირა",
        sections: [
          {
            heading: "რა შეიძლება ჰქონდეს თქვენს მაღაზიას",
            bullets: [
              "პროდუქტების კატალოგი კატეგორიებით, ფილტრებითა და ძებნით",
              "პროდუქტის გვერდი ფოტოებით, ვარიანტებით (ზომა, ფერი) და მარაგის სტატუსით",
              "კალათა და მარტივი შეკვეთის გაფორმება",
              "ონლაინ გადახდა ბარათით, ადგილობრივი ბანკების სისტემებით",
              "მიწოდების ზონები და ღირებულება",
              "მართვის პანელი პროდუქტების, ფასებისა და შეკვეთებისთვის",
              "ფასდაკლებები და პრომო კოდები",
              "შეკვეთის შეტყობინებები ელ-ფოსტაზე",
            ],
          },
          {
            heading: "SEO ონლაინ მაღაზიისთვის",
            paragraphs: [
              "მაღაზიის ტრაფიკის დიდი ნაწილი Google-იდან მოდის, როცა ადამიანი კონკრეტულ პროდუქტს ეძებს. ამიტომ ყველა პროდუქტსა და კატეგორიას საკუთარი სათაური, აღწერა და სტრუქტურირებული მონაცემები აქვს, რომ Google-მა ფასი და მარაგი ძიების შედეგებშივე აჩვენოს. გვერდები სწრაფად იტვირთება, რაც პოზიციებზეც მოქმედებს და გაყიდვებზეც.",
            ],
          },
          {
            heading: "ონლაინ მაღაზიის დამზადების ფასი და ვადები",
            paragraphs: [
              "ფასი დამოკიდებულია პროდუქტების რაოდენობაზე, გადახდისა და მიწოდების სისტემებზე და დამატებით ინტეგრაციებზე. პირველი ზარის შემდეგ მოცულობას ვაზუსტებთ და ფიქსირებულ ფასს მუშაობის დაწყებამდე გიგზავნით. მაღაზიის აწყობა საშუალოდ 4–8 კვირა გრძელდება.",
            ],
          },
        ],
        faqs: [
          {
            question: "რა ღირს ონლაინ მაღაზიის დამზადება?",
            answer:
              "ფასი მოცულობაზეა დამოკიდებული: პროდუქტების რაოდენობაზე, ფუნქციებსა და ინტეგრაციებზე. პირველი ზარის შემდეგ ზუსტ ფასს წერილობით გიგზავნით.",
          },
          {
            question: "შეიძლება ონლაინ გადახდის დამატება?",
            answer:
              "დიახ, ვაერთებთ ადგილობრივი ბანკების ონლაინ გადახდის სისტემებს, რომ მყიდველმა ბარათით პირდაპირ საიტზე გადაიხადოს.",
          },
          {
            question: "პროდუქტებს თავად დავამატებ?",
            answer:
              "დიახ, მაღაზიას მართვის პანელით ვაწყობთ, სადაც პროდუქტებს, ფასებსა და შეკვეთებს თავად მართავთ, პროგრამისტის დახმარების გარეშე.",
          },
          {
            question: "არსებული მაღაზიის გადმოტანა შეიძლება?",
            answer:
              "დიახ. პროდუქტებს და SEO ისტორიას ახალ საიტზე გადმოვიტანთ და ძველ ბმულებს გადავამისამართებთ, რომ Google-ში პოზიციები არ დაიკარგოს.",
          },
        ],
      },
      en: {
        name: "Online stores",
        summary: "E-commerce stores with a catalogue, cart and online card payments.",
        metaTitle: "Online Store Development: Catalogue, Cart, Online Payments",
        metaDescription:
          "Online store development in Tbilisi, Georgia: product catalogue, cart, bank card payments, delivery and an admin panel. Fast e-commerce websites optimised for Google.",
        eyebrow: "Online stores",
        title: "Online store development",
        intro:
          "An online store that sells: a simple catalogue, a fast cart and online payments through local banks. Built for real stock and real traffic, so the store doesn't slow down as it grows.",
        price: "priced on scope",
        timeline: "4–8 weeks",
        sections: [
          {
            heading: "What your store can include",
            bullets: [
              "Product catalogue with categories, filters and search",
              "Product pages with photos, variants (size, colour) and stock status",
              "Cart and a simple checkout",
              "Online card payments through local bank systems",
              "Delivery zones and pricing",
              "Admin panel for products, prices and orders",
              "Discounts and promo codes",
              "Order notifications by email",
            ],
          },
          {
            heading: "SEO for online stores",
            paragraphs: [
              "Most store traffic comes from Google, when people search for a specific product. So every product and category gets its own title, description and structured data, letting Google show price and stock right in the results. Pages load fast, which helps both rankings and sales.",
            ],
          },
          {
            heading: "Online store price and timeline",
            paragraphs: [
              "The price depends on the number of products, payment and delivery systems and extra integrations. After the first call we confirm the scope and send a fixed price before work begins. A store typically takes 4–8 weeks to build.",
            ],
          },
        ],
        faqs: [
          {
            question: "How much does an online store cost?",
            answer:
              "It depends on scope: the number of products, features and integrations. After the first call we send you the exact price in writing.",
          },
          {
            question: "Can you add online payments?",
            answer:
              "Yes, we connect local banks' online payment systems so buyers can pay by card right on the site.",
          },
          {
            question: "Can I add products myself?",
            answer:
              "Yes, the store comes with an admin panel where you manage products, prices and orders yourself, without a developer.",
          },
          {
            question: "Can you move an existing store?",
            answer:
              "Yes. We move your products and SEO history to the new site and redirect the old links, so you keep your Google rankings.",
          },
        ],
      },
    },
  },
  {
    slug: "web-app",
    serviceType: "Web application development",
    projects: ["bizon-ge", "zmna-ge", "reputation-ge"],
    content: {
      ka: {
        name: "ვებ აპლიკაცია",
        summary: "ჯავშნის სისტემები, პორტალები, მართვის პანელები და შიდა ინსტრუმენტები.",
        metaTitle: "ვებ აპლიკაციის დამზადება: პორტალი, ჯავშნის სისტემა, CRM",
        metaDescription:
          "ვებ აპლიკაციის დამზადება თბილისში: ჯავშნის სისტემები, პორტალები, მართვის პანელები და შიდა ინსტრუმენტები, თქვენს ბიზნეს პროცესზე მორგებული. დიზაინიდან გაშვებამდე ერთი გუნდი.",
        eyebrow: "ვებ აპლიკაცია",
        title: "ვებ აპლიკაციის დამზადება",
        intro:
          "როცა ჩვეულებრივი საიტი აღარ კმარა: ჯავშნის სისტემა, კლიენტის კაბინეტი, მარკეტპლეისი ან შიდა ინსტრუმენტი, რომელიც Excel-ს და ხელით შესრულებულ სამუშაოს ცვლის. ვაწყობთ ზუსტად თქვენი პროცესისთვის და იმ სერვისებთან ინტეგრაციით, რომლებსაც უკვე იყენებთ.",
        price: "ფასი მოცულობის მიხედვით",
        timeline: "4–8 კვირა",
        sections: [
          {
            heading: "რას ვაწყობთ",
            bullets: [
              "ჯავშნისა და ჩაწერის სისტემები",
              "კლიენტისა და პარტნიორის პორტალები პირადი კაბინეტით",
              "მარკეტპლეისები და კატალოგები",
              "მართვის პანელები, CRM და შიდა ინსტრუმენტები",
              "საინფორმაციო პორტალები და მედია საიტები",
              "ინტეგრაციები გადახდებთან, ელ-ფოსტასთან, SMS-თან და სხვა API-ებთან",
            ],
          },
          {
            heading: "როგორ ვმუშაობთ დიდ პროექტზე",
            paragraphs: [
              "დიდი პროექტი ტექნიკური დავალებით იწყება: ერთად ვწერთ, რა უნდა აკეთოს სისტემამ, ვინ გამოიყენებს და რა მონაცემებით. შემდეგ ვაწყობთ ინტერფეისის პროტოტიპს, რომელსაც დეველოპმენტამდე ამტკიცებთ. დეველოპმენტს ეტაპებად ვყოფთ, რომ სამუშაო ვერსია ადრევე ნახოთ და გამოცადოთ.",
            ],
          },
          {
            heading: "ვებ აპლიკაციის დამზადების ფასი და ვადები",
            paragraphs: [
              "ფასი ფუნქციების მოცულობაზეა დამოკიდებული. პირველი ზარის შემდეგ ვაზუსტებთ ფუნქციებს და ფიქსირებულ ფასს ვადებთან ერთად გიგზავნით. საშუალო ზომის პროექტი 4–8 კვირა გრძელდება, დიდი სისტემები კი ეტაპებად ეშვება.",
            ],
          },
        ],
        faqs: [
          {
            question: "რა ღირს ვებ აპლიკაციის დამზადება?",
            answer:
              "ფასი ფუნქციების მოცულობაზეა დამოკიდებული. ტექნიკური დავალების შეთანხმების შემდეგ ფიქსირებულ ფასს წერილობით გიგზავნით, მოგვიანებით სიურპრიზების გარეშე.",
          },
          {
            question: "სისტემა ჩვენს არსებულ პროგრამებს დაუკავშირდება?",
            answer:
              "დიახ, ვაერთებთ გადახდის სისტემებს, ელ-ფოსტას, SMS სერვისებს, საბუღალტრო და სხვა პროგრამებს, თუ მათ API აქვთ.",
          },
          {
            question: "გაშვების შემდეგ ვინ უზრუნველყოფს მხარდაჭერას?",
            answer:
              "ყველა პროექტს ერთი თვის უფასო მხარდაჭერა ახლავს, ამის შემდეგ კი გთავაზობთ მომსახურების პაკეტს განახლებებისა და ახალი ფუნქციებისთვის.",
          },
        ],
      },
      en: {
        name: "Web applications",
        summary: "Booking systems, portals, dashboards and internal tools.",
        metaTitle: "Web Application Development: Portals, Booking Systems, CRM",
        metaDescription:
          "Web application development in Tbilisi, Georgia: booking systems, portals, dashboards and internal tools built around your business process. One team from design to launch.",
        eyebrow: "Web applications",
        title: "Web application development",
        intro:
          "When a regular website is no longer enough: a booking system, a client portal, a marketplace or an internal tool that replaces spreadsheets and manual work. Built for your exact process and integrated with the services you already use.",
        price: "priced on scope",
        timeline: "4–8 weeks",
        sections: [
          {
            heading: "What we build",
            bullets: [
              "Booking and appointment systems",
              "Client and partner portals with personal accounts",
              "Marketplaces and catalogues",
              "Dashboards, CRMs and internal tools",
              "News portals and media sites",
              "Integrations with payments, email, SMS and other APIs",
            ],
          },
          {
            heading: "How we run a larger project",
            paragraphs: [
              "A larger project starts with a specification: together we write down what the system must do, who uses it and with what data. Then we build an interface prototype you approve before development. Development is split into stages, so you see and test a working version early.",
            ],
          },
          {
            heading: "Web application price and timeline",
            paragraphs: [
              "The price depends on the scope of features. After the first call we confirm the features and send a fixed price with a timeline. A mid-size project takes 4–8 weeks; large systems launch in stages.",
            ],
          },
        ],
        faqs: [
          {
            question: "How much does a web application cost?",
            answer:
              "It depends on the features. Once the specification is agreed we send a fixed price in writing, with no surprises later.",
          },
          {
            question: "Will it connect to the software we already use?",
            answer:
              "Yes, we integrate payment systems, email, SMS services, accounting and other software, as long as they offer an API.",
          },
          {
            question: "Who supports the app after launch?",
            answer:
              "Every project includes one month of free support, after which we offer a maintenance plan for updates and new features.",
          },
        ],
      },
    },
  },
  {
    slug: "branding",
    serviceType: "Branding and logo design",
    projects: ["coffeeon", "unistats", "nostal-ge"],
    content: {
      ka: {
        name: "ბრენდინგი და UI/UX",
        summary: "ლოგო, ვიზუალური იდენტობა, ბრენდბუქი და ინტერფეისის დიზაინი.",
        metaTitle: "ბრენდინგი და ლოგოს დიზაინი: ვიზუალური იდენტობა და UI/UX",
        metaDescription:
          "ლოგოს დიზაინი, ვიზუალური იდენტობა, ბრენდბუქი და UI/UX დიზაინი თბილისში. ერთიანი ბრენდი, რომელიც საიტზე, სოციალურ ქსელებსა და შეფუთვაზე ერთნაირად კარგად გამოიყურება.",
        eyebrow: "ბრენდინგი და UI/UX",
        title: "ბრენდინგი და ლოგოს დიზაინი",
        intro:
          "ბრენდი მხოლოდ ლოგო არ არის. ვქმნით ერთიან ვიზუალურ სისტემას: ლოგოს, ფერებს, შრიფტებს და გამოყენების წესებს, რომ თქვენი ბიზნესი საიტზე, სოციალურ ქსელებსა და შეფუთვაზე ერთნაირად ცნობადი იყოს. ასევე ვაპროექტებთ ინტერფეისებს საიტებისა და აპლიკაციებისთვის.",
        price: "ფასი მოცულობის მიხედვით",
        timeline: "ბრიფის მიხედვით",
        sections: [
          {
            heading: "რა შედის ბრენდინგში",
            bullets: [
              "ლოგო და მისი ვერსიები სხვადასხვა ზომისა და ფონისთვის",
              "ფერთა პალიტრა და შრიფტები",
              "ბრენდბუქი გამოყენების წესებით",
              "სავიზიტო ბარათები, ბლანკები და ბეჭდვითი მასალა",
              "სოციალური ქსელების შაბლონები",
              "შეფუთვის დიზაინი",
            ],
          },
          {
            heading: "UI/UX დიზაინი",
            paragraphs: [
              "საიტის ან აპლიკაციის აწყობამდე Figma-ში ვქმნით ვაირფრეიმებს და ინტერფეისის დიზაინს. ასე დეველოპმენტამდე ხედავთ, როგორ გამოიყურება და იმუშავებს ყველა ეკრანი, ცვლილებები კი სწრაფი და იაფია. საჭიროების შემთხვევაში ვქმნით დიზაინ სისტემას, რომ პროდუქტი ზრდასთან ერთად ერთიანი დარჩეს.",
            ],
          },
          {
            heading: "ბრენდინგის ფასი და ვადები",
            paragraphs: [
              "ფასი მოცულობაზეა დამოკიდებული: მხოლოდ ლოგო გჭირდებათ, სრული იდენტობა ბრენდბუქით თუ ინტერფეისის დიზაინი. ბრიფის შემდეგ ფიქსირებულ ფასს და ვადებს წერილობით გიგზავნით.",
            ],
          },
        ],
        faqs: [
          {
            question: "რა ღირს ლოგოს დიზაინი?",
            answer:
              "ფასი დამოკიდებულია იმაზე, მხოლოდ ლოგო გჭირდებათ თუ სრული ვიზუალური იდენტობა. ბრიფის შემდეგ ზუსტ ფასს წერილობით გიგზავნით.",
          },
          {
            question: "ბრენდინგს და საიტს ერთად აკეთებთ?",
            answer:
              "დიახ, და ეს საუკეთესო ვარიანტია: ერთი გუნდის ხელში ბრენდი და საიტი ერთიანი გამოდის, ვიზუალური სტილი კი პირდაპირ საიტის დიზაინში გადადის.",
          },
          {
            question: "ფაილებს რა ფორმატში მივიღებ?",
            answer:
              "ლოგოს და ყველა მასალას მიიღებთ ვექტორულ და რასტრულ ფორმატებში (SVG, PDF, PNG), ბეჭდვისა და ციფრული გამოყენებისთვის.",
          },
        ],
      },
      en: {
        name: "Branding & UI/UX",
        summary: "Logo, visual identity, brand book and interface design.",
        metaTitle: "Branding & Logo Design: Visual Identity and UI/UX",
        metaDescription:
          "Logo design, visual identity, brand books and UI/UX design in Tbilisi, Georgia. One consistent brand that looks right on your website, social media and packaging.",
        eyebrow: "Branding & UI/UX",
        title: "Branding and logo design",
        intro:
          "A brand is more than a logo. We build one visual system: logo, colours, typefaces and usage rules, so your business is recognisable on your website, social media and packaging alike. We also design interfaces for websites and apps.",
        price: "priced on scope",
        timeline: "set by the brief",
        sections: [
          {
            heading: "What branding includes",
            bullets: [
              "Logo and its versions for different sizes and backgrounds",
              "Colour palette and typefaces",
              "Brand book with usage rules",
              "Business cards, letterheads and print materials",
              "Social media templates",
              "Packaging design",
            ],
          },
          {
            heading: "UI/UX design",
            paragraphs: [
              "Before a website or app is built, we design wireframes and the interface in Figma. You see how every screen looks and works before development, while changes are still quick and cheap. When needed we build a design system so the product stays consistent as it grows.",
            ],
          },
          {
            heading: "Branding price and timeline",
            paragraphs: [
              "The price depends on scope: just a logo, a full identity with a brand book, or interface design. After the brief we send a fixed price and timeline in writing.",
            ],
          },
        ],
        faqs: [
          {
            question: "How much does logo design cost?",
            answer:
              "It depends on whether you need just a logo or a full visual identity. After the brief we send the exact price in writing.",
          },
          {
            question: "Do you do branding and the website together?",
            answer:
              "Yes, and it works best that way: with one team the brand and the site come out consistent, and the visual style carries straight into the website design.",
          },
          {
            question: "What file formats will I get?",
            answer:
              "You get the logo and all materials in vector and raster formats (SVG, PDF, PNG), for print and digital use.",
          },
        ],
      },
    },
  },
];

export const getServicePage = (slug: string) => servicePages.find((page) => page.slug === slug);

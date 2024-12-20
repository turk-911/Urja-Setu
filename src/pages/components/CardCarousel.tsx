import { Carousel, Card } from "@/components/ui/cards-carousel";

export function CardCarousel() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full py-20">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans text-center">
        Get familiar with{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-green-900">
          Urja Setu
        </span>{" "}
        in 6 Steps
      </h2>
      <Carousel items={cards} />
    </div>
  );
}

const DummyContent = ({ src, description }: { src: string, description: string }) => {
  console.log(src);
  return (
    <>
      <div className=" dark:bg-neutral-800  rounded-3xl mb-4 h-full w-full">
        <p className="text-left mb-2 font-semibold">
          {description}
        </p>
        <img
          src={src}
          alt="Content Image"
          className=" h-full w-full mx-auto object-cover rounded-lg"
        />
      </div>
    </>
  );
};

const data = [
  {
    category: "Step 1",
    title: "Upload Image of waste generated.",
    src: "/sell-garbage.jpg",
    content: (
      <DummyContent
        src="/images/wasteImageUpload.webp"
        description="Capture and upload waste images to track and analyze disposal."
      />
    ),
  },
  {
    category: "Step 2",
    title: "Get Urja Coins After Waste Pick",
    src: "/reward-coins.jpg",
    content: (
      <DummyContent
        src="/reward-landscape.jpg"
        description="Earn Urja Coins as a reward for responsible waste collection."
      />
    ),
  },
  {
    category: "Step 3",
    title: "Waste driven to Recycling Plant",
    src: "/waste-to-energy.jpg",
    content: (
      <DummyContent
        src="/recycle.jpg"
        description="Waste is transported to a recycling plant for eco-friendly processing."
      />
    ),
  },

  {
    category: "Step 4",
    title: "Waste gets recycled",
    src: "/platform.jpg",
    content: (
      <DummyContent
        src="/platform.jpg"
        description="Waste is transformed into reusable materials through recycling processes."
      />
    ),
  },
  {
    category: "Step 5",
    title: "Recycled Products leave for supermarket",
    src: "/reduce.jpg",
    content: (
      <DummyContent
        src="/reduce.jpg"
        description="Recycled Products leave for supermarket"
      />
    ),
  },
  {
    category: "Step 6",
    title: "Redeem Urja Coins and Buy Recycled Products",
    src: "/direct.jpg",
    content: (
      <DummyContent
        src="/direct.jpg"
        description="Use Urja Coins to purchase eco-friendly recycled products easily"
      />
    ),
  },
];


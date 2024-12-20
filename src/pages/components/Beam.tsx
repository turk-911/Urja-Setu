"use client";
import React from "react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { TracingBeam } from "@/components/ui/tracing-beam";

export default function Steps() {
  return (
    <>
      <div className="border border-black">
    <h1 className="text-center text-5xl p-4 mb-10 mt-4">How it Works</h1>
        <TracingBeam className="px-6">
          <div className="max-w-2xl mx-auto antialiased pt-4 relative">
            {dummyContent.map((item, index) => (
              <div key={`content-${index}`} className="mb-10">
                <h2 className="bg-black text-white rounded-full text-sm w-fit px-4 py-1 mb-4">
                  {item.badge}
                </h2>

                <p className={twMerge("text-2xl mb-4")}>{item.title}</p>

                <div className="text-sm  prose prose-sm dark:prose-invert lg:flex lg:justify-between lg:items-center block text-[15px]">
                  {item?.image && (
                    <Image
                      src={item.image}
                      alt="blog thumbnail"
                      height="200"
                      width="200"
                      className="rounded-lg mb-5 object-cover mr-10"
                    />
                  )}
                  {item.description}
                </div>
              </div>
            ))}
          </div>
        </TracingBeam>
      </div>
    </>
  );
}

const dummyContent = [
  {
    title: "Upload Image of waste generated",
    description: (
      <>
        <p>
          Easily monitor your waste footprint with our AI-powered analysis tool.
          Simply upload an image of the waste you've generated, and our
          intelligent model will evaluate the contents to estimate their weight
          and categorize the materials. This innovative feature enables precise
          tracking of your waste output, helping you make informed decisions
          about recycling and disposal while contributing to a sustainable
          environment.
        </p>
      </>
    ),
    badge: "Step 1",
    image: "/click.jpg",
  },
  {
    title: "Get a Waste Picker Assigned and Urja Coins",
    description: (
      <>
        <p>
          Simplify waste disposal with our seamless process. Once you upload
          your waste details, a nearby waste picker will be assigned to collect
          it from your location. Earn Urja Coins for every successful pickup,
          which can be redeemed for exciting rewards. Powered by blockchain
          technology, Urja Coins ensure transparency and security, promoting a
          circular economy while rewarding you for sustainable practices.
        </p>
      </>
    ),
    badge: "Step 2",
    image: "/reward-landscape.jpg",
  },
  {
    title: "Picker drives the waste to Recycling Plant",
    description: (
      <>
        <p>
          Once the waste is collected, the designated waste picker transports it
          to the nearest Recycling Plant. Here, the waste is carefully sorted,
          processed, and transformed into reusable materials. This step ensures
          that waste is diverted from landfills, promoting a circular economy
          and contributing to a cleaner, greener environment. By participating
          in this process, you're actively contributing to sustainability
          efforts while reducing your environmental footprint.
        </p>
      </>
    ),
    badge: "Step 3",
    image: "/driver.jpg",
  },
  {
    title: "Your Waste Gets Recycled",
    description: (
      <>
        <p>
          After the waste reaches the recycling plant, it undergoes a thorough
          sorting and processing procedure. The recyclable materials are
          separated, cleaned, and transformed into new products, reducing the
          need for raw materials and conserving valuable resources. This step
          not only prevents waste from ending up in landfills but also helps in
          minimizing pollution and energy consumption. By recycling, you're
          playing a vital role in the circular economy, where waste is
          repurposed into valuable resources, contributing to a more sustainable
          future.
        </p>
      </>
    ),
    badge: "Step 4",
    image: "/recycle.jpg",
  },
  {
    title: "Recycled Waste Goes to the Supermarket",
    description: (
      <>
        <p>
          Once the waste is recycled and transformed into new products, it is
          ready to be distributed. The recycled materials are sent to local
          supermarkets and retailers, where they are used to create new
          packaging, products, and goods that consumers can purchase. This helps
          reduce the demand for new raw materials and encourages the use of
          eco-friendly, sustainable alternatives. By purchasing these recycled
          products, consumers actively support the circular economy and
          contribute to a greener, more sustainable future.
        </p>
      </>
    ),
    badge: "Step 5",
    image: "/waste-to-supermarket.jpg",
  },
  {
    title: "Redeem Urja Coins and Buy Recycled Products",
    description: (
      <>
        <p>
          With Urja Coins, you can enjoy rewards for your commitment to
          sustainability. These blockchain-backed coins can be redeemed for
          discounts on the purchase of recycled products at participating
          supermarkets and retailers. By using your Urja Coins, you not only
          save money but also promote a circular economy, supporting the use of
          recycled materials in everyday products. It's a win-win for both you
          and the planet—reap the benefits of your efforts to recycle and
          contribute to a greener, more sustainable future.
        </p>
      </>
    ),
    badge: "Step 6",
    image: "/buy-waste.jpg",
  },
];

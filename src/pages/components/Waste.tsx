"use client";
import { CardStackDemo1 } from "./CardStack1";
import { CardStackDemo2 } from "./CardStack2";
import { CardStackDemo3 } from "./CardStack3";
import { CompareImages } from "./Compare";

export default function Waste() {
    return (
      <>
      <h1 className="text-4xl text-center mt-20">Waste Generation: A Problem for India</h1>
        <div className="block lg:flex justify-between">
            <CardStackDemo1 />
            <CardStackDemo2 />
            <CardStackDemo3 />
        </div>
      </>
    );
}
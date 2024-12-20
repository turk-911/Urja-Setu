import React from "react";
import Header from "./components/Header";
import Footer from "@/components/ui/Footer";

const contributors = [
    {
      name: "Alice Johnson",
      role: "Frontend Developer",
      image: "profile.jpg",
      description: "Specializes in building intuitive and responsive user interfaces with React and TailwindCSS.",
    },
    {
      name: "Bob Smith",
      role: "Backend Developer",
      image: "profile.jpg",
      description: "Expert in creating scalable APIs and robust backend systems with Node.js and MongoDB.",
    },
    {
      name: "Charlie Davis",
      role: "UI/UX Designer",
      image: "profile.jpg",
      description: "Passionate about designing user-centric interfaces that enhance user experiences.",
    },
    {
      name: "Diana Lee",
      role: "DevOps Engineer",
      image: "profile.jpg",
      description: "Ensures smooth deployment pipelines and system reliability with Docker and Kubernetes.",
    },
    {
      name: "Ethan Brown",
      role: "Full Stack Developer",
      image: "profile.jpg",
      description: "Combines frontend and backend skills to build end-to-end applications with React and Express.",
    },
    {
      name: "Fiona Green",
      role: "Project Manager",
      image: "profile.jpg",
      description: "Drives project success by coordinating teams and ensuring timely delivery.",
    },
  ];
  
  const About: React.FC = () => {
    return (
      <>
        <Header />
        <div className="bg-emerald-100 dark:bg-emerald-700/[0.2] text-emerald-700 dark:text-emerald-500">
         
          <div
            className="min-h-screen relative bg-gradient-to-br from-emerald-50 to-emerald-100 flex items-center justify-center px-8 py-12 text-center"
          >
            <div className="absolute inset-0"></div>
            <div className="relative z-10 max-w-4xl">
              <h1 className="text-5xl font-bold mb-6 text-emerald-800">
                Welcome to <span className="text-emerald-500">Urja Setu</span>
              </h1>
              <p className="text-lg text-emerald-700 mb-4">
                We aim to revolutionize waste management by enabling efficient recycling and waste-to-energy solutions.
                Our platform encourages user participation through AI-driven waste identification, geolocation services,
                and blockchain-based rewards, ensuring a cleaner environment and a sustainable future.
              </p>
              <p className="text-lg leading-relaxed">
                Join us in creating a world where every piece of waste contributes to renewable energy production
                and a greener tomorrow.
              </p>
            </div>
          </div>
  
          
          <div
            className="relative bg-fixed bg-cover bg-center py-32"
            style={{ backgroundImage: "url('about1.webp')" }}
          >
            <div className="bg-emerald-700 bg-opacity-90 px-8 py-12">
              <div className="max-w-5xl mx-auto text-center text-white">
                <h2 className="text-4xl font-bold mb-8">Our Vision & Features</h2>
                <p className="text-lg mb-8">
                  To transform the world of recycling, reduce pollution, and foster renewable energy production by
                  connecting users, waste plants, and collection points seamlessly.
                </p>
                <ul className="text-left list-disc list-inside space-y-4">
                  <li>
                    <strong>AI-Driven Waste Identification:</strong> Advanced AI/ML technology to categorize waste and
                    calculate its potential for energy production.
                  </li>
                  <li>
                    <strong>Blockchain Rewards System:</strong> Earn incentives such as coupons and energy credits,
                    redeemable via cryptocurrency or NFTs.
                  </li>
                  <li>
                    <strong>Geolocation-Based Connectivity:</strong> Easily locate nearby waste-to-energy plants or
                    collection points for convenient drop-offs or pickups.
                  </li>
                  <li>
                    <strong>Real-Time Monitoring:</strong> Track your recycling contributions and waste-processing
                    progress.
                  </li>
                </ul>
              </div>
            </div>
          </div>
  
          
          <div className="bg-white dark:bg-emerald-700/[0.2] py-16 px-8">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-12 text-emerald-700 dark:text-emerald-500">
                Meet Our Contributors
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
                {contributors.map((contributor, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300 dark:bg-emerald-700/[0.2]"
                  >
                    <img
                      src={contributor.image}
                      alt={contributor.name}
                      className="w-24 h-24 mx-auto rounded-full mb-4 border-4 border-emerald-700 dark:border-emerald-500"
                    />
                    <h3 className="text-xl font-semibold text-emerald-700 dark:text-emerald-500">
                      {contributor.name}
                    </h3>
                    <p className="text-sm">{contributor.role}</p>
                    <p className="text-xs font-semibold  text-emerald-600 mt-2 dark:text-emerald-300">
                      {contributor.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </>
    );
  };
  
export default About;
  
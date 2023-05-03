import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import DropDown, { MapType } from "../components/DropDown";
import SiteDropdown from "../components/SiteDropdown";
import Footer from "../components/Footer";
import Github from "../components/GitHub";
import Header from "../components/Header";
import LoadingDots from "../components/LoadingDots";

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);

  const [map, setMap] = useState<MapType>("Oregon");
  const [site, setSite] = useState("B Laundry Room and B Supply Room");
  const [side, setSide] = useState("Attacker");

  const [generatedStrategies, setGeneratedStrategies] = useState<String>("");

  const bioRef = useRef<null | HTMLDivElement>(null);

  const scrollToBios = () => {
    if (bioRef.current !== null) {
      bioRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const generateStrategies = async (e: any, action: string) => {

    const prompt = `
    Generate specific gameplay strategies ensuring teamwork for ${action} the ${site} site in ${map} map in rainbow six siege. 
    Write concise and creative bullet points showing select 5 operators and their utilities.

    Remove all pre-text like "Here are the gameplay strategies for attacking Laundry Room in Clubhouse map in Rainbow Six Siege along with 5 operators and their utilities:".

    Format it as !! {operator} : {50 words on the strategy}

    Add !! at the beginning of each bullet point. 
    `;

    e.preventDefault();
    setGeneratedStrategies("");
    setLoading(true);
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);

      console.log("\n chunks" + chunkValue)
      setGeneratedStrategies((prev) => prev + chunkValue);
    }
    scrollToBios();
    setLoading(false);
  };

  const sites = [
    { site: "Gym and Bedroom", map: "Clubhouse" },
    { site: "CCTV Room and Cash Room", map: "Clubhouse" },
    { site: "Bar and Stage", map: "Clubhouse" },
    { site: "Church and Arsenal Room", map: "Clubhouse" },
  
    { site: "2F Consul Office and 2F Meeting Room", map: "Consulate" },
    { site: "1F Lobby and 1F Press Room", map: "Consulate" },
    { site: "B Garage and B Cafeteria", map: "Consulate" },
    { site: "1F Tellers and B Archives", map: "Consulate" },
  
    { site: "2F Armory Lockers & 2F Archives", map: "Border" },
    { site: "1F Workshop & 1F Ventilation Room", map: "Border" },
    { site: "1F Customs Inspection & 1F Supply Room", map: "Border" },
    { site: "1F Tellers & 1F Bathroom", map: "Border" },
  
    { site: "2F Aviator Room & 2F Games Room", map: "Villa" },
    { site: "2F Trophy Room & 2F Statuary Room", map: "Villa" },
    { site: "1F Living Room & 1F Library", map: "Villa" },
    { site: "1F Dining Room & 1F Kitchen", map: "Villa" },
  
    { site: "2F Main Dorms Hall and 2F Kids Dormitory", map: "Oregon" },
    { site: "1F Dining Hall and 1F Kitchen", map: "Oregon" },
    { site: "1F Meeting Hall and 1F Kitchen", map: "Oregon" },
    { site: "B Laundry Room and B Supply Room", map: "Oregon" },
  
    { site: "B Lockers and B CCTV Room", map: "Bank" },
    { site: "2F Executive Lounge and 2F CEO Office", map: "Bank" },
    { site: "1F Teller's Office and 1F Archives", map: "Bank" },
    { site: "1F Staff Room and 1F Open Area", map: "Bank" },
  
    { site: "2F Master Bedroom and 2F Office", map: "Chalet" },
    { site: "1F Bar and 1F Gaming Room", map: "Chalet" },
    { site: "1F Dining Room and 1F Kitchen", map: "Chalet" },
    { site: "B Wine Cellar and B Snowmobile Garage", map: "Chalet" },
  
    { site: "2F Theater & 2F Penthouse", map: "Coastline" },
    { site: "2F Hookah Lounge & 2F Billiards Room", map: "Coastline" },
    { site: "1F Blue Bar & 1F Sunrise Bar", map: "Coastline" },
    { site: "1F Service Entrance & 1F Kitchen", map: "Coastline" },
  
    { site: "3F Cocktail Lounge & 3F Bar", map: "Kafe Dostoyevsky" },
    { site: "2F Mining Room & 2F Fireplace Hall", map: "Kafe Dostoyevsky" },
    { site: "2F Reading Room & 2F Fireplace Hall", map: "Kafe Dostoyevsky" },
    { site: "1F Kitchen Service & 1F Kitchen Cooking", map: "Kafe Dostoyevsky" },
  
    { site: "2F Tea Room & 2F Karaoke", map: "Skyscraper" },
    { site: "2F Exhibition Room & 2F Office", map: "Skyscraper" },
    { site: "1F Kitchen & 1F BBQ", map: "Skyscraper" },
    { site: "1F Bedroom & 1F Bathroom", map: "Skyscraper" },
  
    { site: "2F Office & 2F Initiation Room", map: "Theme Park" },
    { site: "2F Bunk & 2F Day Care", map: "Theme Park" },
    { site: "1F Armory & 1F Throne Room", map: "Theme Park" },
    { site: "1F Lab & 1F Storage", map: "Theme Park" },
  ];

  const handleAttackerClick = (e: any) => {
    setSide("Attacker");
    generateStrategies(e, "attacking");
  };
  
  const handleDefenderClick = (e: any) => {
    setSide("Defender");
    generateStrategies(e, "defending");
  };

  return (
    //add toggle button to switch between attacker / defender
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 wu-screen">
      <Head>
        <title>Siege GPT</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-12 sm:mt-20">
        <a
          className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-gray-600 shadow-md transition-colors hover:bg-gray-100 mb-5"
          href="https://github.com/joqim/SiegeGPT"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github />
          <p>Star on GitHub</p>
        </a>
        <h1 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900">
          Redesign your gameplay using ChatGPT
        </h1>
        <p className="text-slate-500 mt-5 mb-10">47,118 simluations generated so far.</p>
        <div className="max-w-xl w-full">
          <div className="flex mb-3 items-center space-x-3">
            <Image src="/1-black.png" width={30} height={30} alt="1 icon" />
            <p className="text-left font-medium">Select a Map</p>
          </div>
          <div className="block">
          <DropDown map={map} setMap={(newMap) => {
            setMap(newMap);
            const siteList = sites.filter(site => site.map === newMap);
            if (siteList.length > 0) {
              setSite(siteList[0].site);
            } else {
              setSite("");
            }
          }} />
          </div>

          <div className="flex mb-3 items-center space-x-3 mt-10">
            <Image src="/2-black.png" width={30} height={30} alt="2 icon" />
            <p className="text-left font-medium">Select a Site</p>
          </div>
          <div className="block">
            <SiteDropdown map={map} site={site} setSite={(newSite) => {
              scrollToBios();
              setSite(newSite);
              setSide("Attacker");
            }} />
          </div>

          {!loading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
              onClick={(e) => generateStrategies(e, side)}
            >
              Render strategies &rarr;
            </button>
          )}
          {loading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
              disabled
            >
              <LoadingDots color="white" style="large" />
            </button>
          )}
        </div>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />
        <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />
        <div className="space-y-10 my-10">
          {generatedStrategies && (
            <>
              <h2 className="sm:text-4xl text-3xl font-bold text-slate-900 mt-5">
                Strategies
              </h2>
              <div style={{ marginTop: "25px"}}>
                <button
                  className={`cursor-pointer py-2 px-7 rounded-l-lg font-medium focus:outline-none ${
                    side === "Attacker" ? "bg-black text-white bg-black/100" : "text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={(e) => handleAttackerClick(e)}
                  disabled={loading}
                >
                  Attacker
                </button>
                <button
                  className={`cursor-pointer py-2 px-7 rounded-r-lg font-medium focus:outline-none ${
                    side === "Defender" ? "bg-black text-white bg-black/100" : "text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={(e) => handleDefenderClick(e)}
                  disabled={loading}
                >
                  Defender
                </button>
              </div>

              <div ref={bioRef} className="space-y-6 flex flex-col items-center justify-center max-w-xl mx-auto">
                {generatedStrategies.split("!!").map((strategy, index) => {
                  if (strategy.length > 0) {
                    return (
                      <div
                        className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition border"
                        key={index}
                      >
                        <p>{strategy}</p>
                      </div>
                    );
                  }
                })}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;

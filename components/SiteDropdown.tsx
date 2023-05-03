import { Menu, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react";

interface SiteDropDownProps {
  map: string;
  site: string;
  setSite: (newSite: string) => void;
}

interface SiteType {
  site: string;
  map: string;
}

const sites: SiteType[] = [
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

export default function SiteDropdown({ map, site, setSite }: SiteDropDownProps) {
  let selectedSite = site;
  console.log("site in dropdown", site);
  const filteredSites = sites.filter((site) => site.map === map);

  return (
    <Menu as="div" className="relative block text-left w-full">
      <div>
        <Menu.Button className="inline-flex w-full justify-between items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black">
          {site}
          <ChevronUpIcon className="-mr-1 ml-2 h-5 w-5 ui-open:hidden" aria-hidden="true" />
          <ChevronDownIcon className="-mr-1 ml-2 ml-2 h-5 w-5 hidden ui-open:block" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute left-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" key={map}>
          <div className="">
            {filteredSites.map((siteIterator) => (
              <Menu.Item key={siteIterator.site}>
                {({ active }) => (
                  <a
                    className={`${
                      active
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-700"
                    } block px-4 py-2 text-sm cursor-pointer`}
                    onClick={(e) => {
                      //e.preventDefault();
                      setSite(siteIterator.site);
                    }}
                  >
                    {siteIterator.site}
                    {selectedSite === siteIterator.site ? (
                      <CheckIcon className="float-right h-5 w-5 text-green-500" />
                    ) : null}
                  </a>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}


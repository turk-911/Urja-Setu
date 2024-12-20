import { CalendarDaysIcon, HandRaisedIcon } from "@heroicons/react/24/outline";

export default function Footer() {
  return (
    <>
      <div className="relative isolate overflow-hidden py-16 sm:py-24 lg:py-32 border-t-1 border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
            <div className="max-w-xl lg:max-w-lg">
              <h2 className="text-4xl font-semibold tracking-tight">
                Send a Feedback
              </h2>
              <p className="mt-4 text-lg ">
                Urja Setu is dedicated to providing solutions that empower
                individuals and improve academic outcomes. We’re passionate
                about helping you succeed.
              </p>
              <div className="mt-6 flex max-w-md gap-x-4">
                <label htmlFor="email-address" className="sr-only">
                  Feedback
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  required
                  placeholder="Enter feedback"
                  autoComplete="email"
                  className="min-w-0 flex-auto rounded-md bg-white/5 px-3.5 py-2 text-base  outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6 border border-black"
                />
                <button
                  type="submit"
                  className="flex-none rounded-md bg-[#94C973] px-3.5 py-2.5 text-sm font-semibold shadow-sm hover:bg-[#2F5233] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2F5233] transition duration-200"
                >
                  Send
                </button>
              </div>
            </div>
            <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
              <div className="flex flex-col items-start">
                <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                  <CalendarDaysIcon aria-hidden="true" className="size-6 " />
                </div>
                <dt className="mt-4 text-base font-semibold ">
                  Recycle the Urja Way
                </dt>
                <dd className="mt-2 text-base/7 ">
                  Recycle the Urja way for a sustainable and eco-friendly
                  future.
                </dd>
              </div>
              <div className="flex flex-col items-start">
                <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                  <HandRaisedIcon aria-hidden="true" className="size-6" />
                </div>
                <dt className="mt-4 text-base font-semibold ">Cleaner World</dt>
                <dd className="mt-2 text-base/7 ">
                  A cleaner world promotes health, sustainability, and a
                  brighter future.
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#B1D8B7] to-[#94C973] opacity-30"
          />
        </div>
      </div>
      <div className="bg-[#2F5233] p-2">
        <p className="text-center bottom-0 text-white">
          &copy; {new Date().getFullYear()} Team IIITA. All rights reserved.
        </p>
      </div>
      
    </>
  );
}

import { AnimatedArrowButton, AnimatedArrowLink } from "../ui/AnimatedArrowCta";
import { SectionDivider } from "../ui/SectionDivider";

export function ContactSection() {
    return (
        <section id="contact" className="border-t border-(--brand-border) bg-(--brand-blue-soft)/45 py-24 text-(--brand-dark) md:py-40">
            <div className="mx-auto grid w-full max-w-360 grid-cols-1 gap-16 px-6 md:gap-24 md:px-12 lg:grid-cols-2 lg:gap-32 lg:px-20">
                <div className="space-y-10">
                    <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-bold leading-[0.95] tracking-tight text-(--brand-blue)">
                        Contact us
                    </h2>
                    <SectionDivider className="max-w-40" />
                    <p className="max-w-xl text-lg font-medium leading-relaxed text-[rgba(51,51,51,0.72)] md:text-xl">
                        We&apos;re happy to answer any questions and get you introduced to Aqua Pharma.
                        Send us an e-mail, call one of our regional managers or fill out the form. Either way we will respond as quickly as possible.
                    </p>

                    <div className="pt-8 space-y-4">
                        <a href="mailto:contact@aqua-pharma.com" className="block text-2xl font-medium text-(--brand-tangerine) transition-colors hover:text-[#ef9a4e] md:text-3xl">
                            contact@aqua-pharma.com
                        </a>
                        <p className="text-lg text-[rgba(51,51,51,0.72)] md:text-xl">
                            Phone: +47 61 24 70 10
                        </p>
                    </div>

                    <div className="pt-12">
                        <h3 className="mb-4 text-2xl font-bold text-(--brand-blue)">Headquarters</h3>
                        <p className="mb-6 text-[17px] leading-relaxed text-[rgba(51,51,51,0.72)]">
                            Hovemoveien 1<br />
                            2624 Lillehammer<br />
                            Norway
                        </p>
                        <AnimatedArrowLink
                            href="https://www.google.no/maps/place/Aqua+Pharma+AS"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[13px] font-bold uppercase tracking-widest text-(--brand-glaucous) transition-opacity hover:opacity-80"
                        >
                            Directions at Google maps
                        </AnimatedArrowLink>
                    </div>
                </div>

                <div className="rounded-none border border-(--brand-border) bg-white p-8 shadow-[0_4px_40px_rgba(21,31,109,0.08)] md:p-14">
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[rgba(51,51,51,0.78)]">First name</label>
                                <input type="text" className="w-full rounded-none border border-(--brand-border) bg-white px-4 py-3 shadow-sm transition-colors focus:border-(--brand-glaucous) focus:outline-none" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[rgba(51,51,51,0.78)]">Last name</label>
                                <input type="text" className="w-full rounded-none border border-(--brand-border) bg-white px-4 py-3 shadow-sm transition-colors focus:border-(--brand-glaucous) focus:outline-none" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-[rgba(51,51,51,0.78)]">Email address</label>
                            <input type="email" className="w-full rounded-none border border-(--brand-border) bg-white px-4 py-3 shadow-sm transition-colors focus:border-(--brand-glaucous) focus:outline-none" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-[rgba(51,51,51,0.78)]">Subject</label>
                            <input type="text" className="w-full rounded-none border border-(--brand-border) bg-white px-4 py-3 shadow-sm transition-colors focus:border-(--brand-glaucous) focus:outline-none" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-[rgba(51,51,51,0.78)]">Message</label>
                            <textarea rows={4} className="w-full resize-none rounded-none border border-(--brand-border) bg-white px-4 py-3 shadow-sm transition-colors focus:border-(--brand-glaucous) focus:outline-none"></textarea>
                        </div>

                        <div className="flex items-start gap-3 mt-8">
                            <input type="checkbox" id="terms" className="mt-1 h-4 w-4 rounded-none border-(--brand-border) text-(--brand-glaucous) shadow-sm focus:ring-(--brand-glaucous)" />
                            <label htmlFor="terms" className="text-[15px] font-medium leading-tight text-[rgba(51,51,51,0.72)]">
                                Yes, I accept that my information is stored and processed.
                            </label>
                        </div>

                        <AnimatedArrowButton
                            type="submit"
                            className="mt-8 w-full justify-center bg-(--brand-tangerine) py-4 text-[13px] font-bold uppercase tracking-widest text-(--brand-dark) transition-colors hover:bg-[#ef9a4e]"
                        >
                            Send Message
                        </AnimatedArrowButton>
                    </form>
                </div>
            </div>
        </section>
    );
}

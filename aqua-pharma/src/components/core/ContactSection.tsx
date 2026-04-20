import { AnimatedArrowButton, AnimatedArrowLink } from "../ui/AnimatedArrowCta";
import { SectionDivider } from "../ui/SectionDivider";

export function ContactSection() {
    return (
        <section id="contact" className="border-t border-(--brand-blue)/10 bg-(--brand-paper) py-16 text-(--brand-dark) md:py-24 min-h-[66vh] flex items-center">
            <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-6 md:gap-16 md:px-12 lg:grid-cols-2 lg:gap-24">
                <div className="space-y-10 flex flex-col justify-center">
                    <h2 className="font-heading text-[clamp(2.5rem,5vw,4.5rem)] font-light leading-[1.1] tracking-wide text-(--brand-blue) uppercase">
                        CONTACT US
                    </h2>
                    <SectionDivider className="max-w-24 bg-(--brand-blue)/20" />
                    <p className="max-w-md text-[1.1rem] font-light leading-[1.8] text-(--brand-dark)/70 md:text-[1.2rem]">
                        We&apos;re happy to answer any questions and get you introduced to Aqua Pharma.
                        Send us an e-mail, call one of our regional managers or fill out the form.
                    </p>

                    <div className="pt-8 space-y-3">
                        <a href="mailto:contact@aqua-pharma.com" className="block text-[1.2rem] font-medium tracking-wide text-(--brand-blue) transition-colors hover:text-(--brand-tangerine)">
                            contact@aqua-pharma.com
                        </a>
                        <p className="text-[1.1rem] font-light text-(--brand-dark)/60">
                            +47 61 24 70 10
                        </p>
                    </div>

                    <div className="pt-12">
                        <h3 className="mb-4 text-[0.8rem] font-medium uppercase tracking-[0.2em] text-(--brand-blue)/50">Headquarters</h3>
                        <p className="mb-6 text-[1.05rem] font-light leading-[1.8] text-(--brand-dark)/70">
                            Hovemoveien 1<br />
                            2624 Lillehammer<br />
                            Norway
                        </p>
                        <AnimatedArrowLink
                            href="https://www.google.no/maps/place/Aqua+Pharma+AS"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[0.75rem] font-medium uppercase tracking-[0.15em] text-(--brand-tangerine) transition-opacity hover:opacity-80"
                        >
                            Directions at Google maps
                        </AnimatedArrowLink>
                    </div>
                </div>

                <div className="rounded-none border-[1px] border-(--brand-blue)/10 bg-transparent backdrop-blur-sm p-8 md:p-14">
                    <form className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <label className="text-[0.75rem] font-medium uppercase tracking-[0.15em] text-(--brand-blue)/60">First name</label>
                                <input type="text" className="w-full bg-transparent border-b border-(--brand-blue)/20 px-0 py-3 text-[1.1rem] font-light text-(--brand-dark) transition-colors focus:border-(--brand-tangerine) focus:outline-none placeholder-transparent" />
                            </div>
                            <div className="space-y-3">
                                <label className="text-[0.75rem] font-medium uppercase tracking-[0.15em] text-(--brand-blue)/60">Last name</label>
                                <input type="text" className="w-full bg-transparent border-b border-(--brand-blue)/20 px-0 py-3 text-[1.1rem] font-light text-(--brand-dark) transition-colors focus:border-(--brand-tangerine) focus:outline-none placeholder-transparent" />
                            </div>
                        </div>
                        <div className="space-y-3">
                            <label className="text-[0.75rem] font-medium uppercase tracking-[0.15em] text-(--brand-blue)/60">Email address</label>
                            <input type="email" className="w-full bg-transparent border-b border-(--brand-blue)/20 px-0 py-3 text-[1.1rem] font-light text-(--brand-dark) transition-colors focus:border-(--brand-tangerine) focus:outline-none placeholder-transparent" />
                        </div>
                        <div className="space-y-3">
                            <label className="text-[0.75rem] font-medium uppercase tracking-[0.15em] text-(--brand-blue)/60">Subject</label>
                            <input type="text" className="w-full bg-transparent border-b border-(--brand-blue)/20 px-0 py-3 text-[1.1rem] font-light text-(--brand-dark) transition-colors focus:border-(--brand-tangerine) focus:outline-none placeholder-transparent" />
                        </div>
                        <div className="space-y-3">
                            <label className="text-[0.75rem] font-medium uppercase tracking-[0.15em] text-(--brand-blue)/60">Message</label>
                            <textarea rows={4} className="w-full resize-none bg-transparent border-b border-(--brand-blue)/20 px-0 py-3 text-[1.1rem] font-light text-(--brand-dark) transition-colors focus:border-(--brand-tangerine) focus:outline-none"></textarea>
                        </div>

                        <div className="flex items-start gap-4 mt-10">
                            <input type="checkbox" id="terms" className="mt-1 h-4 w-4 shrink-0 rounded-none border-(--brand-blue)/20 text-(--brand-tangerine) focus:ring-(--brand-tangerine)" />
                            <label htmlFor="terms" className="text-[0.95rem] font-light leading-relaxed text-(--brand-dark)/60 cursor-pointer">
                                Yes, I accept that my information is stored and processed.
                            </label>
                        </div>

                        <AnimatedArrowButton
                            type="submit"
                            className="mt-12 w-full justify-center border border-(--brand-blue)/20 bg-transparent py-5 text-[0.8rem] font-medium uppercase tracking-[0.15em] text-(--brand-blue) transition-colors hover:bg-(--brand-blue) hover:text-white"
                        >
                            Send Message
                        </AnimatedArrowButton>
                    </form>
                </div>
            </div>
        </section>
    );
}

import { Navbar } from "@/components/core/Navbar";
import { Footer } from "@/components/core/Footer";
import { ContactSection } from "@/components/core/ContactSection";

export const metadata = {
  title: "Our Team | Aqua Pharma",
  description: "Meet the global team of experts dedicated to aquaculture innovation",
};

interface TeamMember {
  name: string;
  role: string;
  region?: string;
  image?: string;
}

interface TeamSection {
  title: string;
  members: TeamMember[];
}

const teamSections: TeamSection[] = [
  {
    title: "Management",
    members: [
      { name: "Elvin Bugge", role: "CEO & Founder" },
      { name: "Hanne Mertens", role: "Chief Operating Officer" },
      { name: "Dr. Per Johnsen", role: "Chief Science Officer" },
      { name: "Marina Silva", role: "Director of Global Operations" },
    ]
  },
  {
    title: "South America",
    members: [
      { name: "Carlos Rodriguez", role: "Regional Director" },
      { name: "Ana Santos", role: "Sales Manager" },
      { name: "Felipe Oliveira", role: "Technical Specialist" },
      { name: "Lucia Mendoza", role: "Customer Support" },
    ]
  },
  {
    title: "North Atlantic",
    members: [
      { name: "John Campbell", role: "Regional Director" },
      { name: "Sophie Larsson", role: "Product Specialist" },
      { name: "Michael O'Brien", role: "Sales Manager" },
      { name: "Emma Petersen", role: "Quality Assurance" },
    ]
  },
  {
    title: "South-East Asia",
    members: [
      { name: "Dr. Sitthichai Phornsuwanruang", role: "Regional Director" },
      { name: "Lim Wei Chen", role: "Technical Lead" },
      { name: "Ananya Sharma", role: "Sales Manager" },
      { name: "Priya Nair", role: "Field Specialist" },
    ]
  },
  {
    title: "Group Support Services",
    members: [
      { name: "Kristen Johansson", role: "HR Director" },
      { name: "Thomas Berg", role: "Finance Manager" },
      { name: "Sarah Mitchell", role: "Compliance Officer" },
      { name: "David Nguyen", role: "IT Systems Manager" },
    ]
  },
  {
    title: "Research & Development",
    members: [
      { name: "Dr. Isabella Romano", role: "Lead Researcher" },
      { name: "Dr. Hans Mueller", role: "Senior Scientist" },
      { name: "Yuki Tanaka", role: "Product Developer" },
      { name: "Dr. James Wilson", role: "Clinical Trials Manager" },
    ]
  }
];

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-(--brand-paper)">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative flex h-[500px] w-full items-end justify-center bg-(--brand-blue) md:h-[600px]" style={{ backgroundImage: "linear-gradient(135deg, rgba(21,31,109,1) 0%, rgba(78,96,173,0.9) 58%, rgba(85,109,90,0.42) 100%)" }}>
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
        }}></div>
        
        <div className="relative z-10 text-center pb-16 px-4 max-w-4xl mx-auto">
          <p className="mb-4 text-sm font-semibold tracking-wider text-[var(--brand-tangerine)] md:text-base">OUR TEAM</p>
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Meet Our Experts
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-white/78 md:text-xl">
            A global team of veterinary professionals, scientists, and specialists dedicated to advancing aquaculture
          </p>
        </div>
      </section>

      {/* Team Content */}
      <section className="w-full bg-(--brand-paper) px-4 py-16 md:py-24">
        <div className="max-w-5xl mx-auto">
          {/* Intro */}
          <div className="mb-16 md:mb-24">
            <p className="max-w-3xl text-lg text-[rgba(51,51,51,0.72)]">
              Our team brings together decades of combined expertise in aquaculture healthcare, research, operations, and customer support. We're committed to delivering exceptional service and innovation to farmers across the globe.
            </p>
          </div>

          {/* Team Sections */}
          <div className="space-y-16 md:space-y-24">
            {teamSections.map((section, idx) => (
              <div key={idx}>
                <h2 className="mb-8 border-b-2 border-(--brand-glaucous) pb-4 font-heading text-2xl font-bold text-(--brand-blue) md:text-3xl">
                  {section.title}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  {section.members.map((member, memberIdx) => (
                    <div key={memberIdx} className="rounded-lg border border-(--brand-border) bg-white p-6 transition-shadow hover:shadow-[0_18px_40px_rgba(21,31,109,0.12)]">
                      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-(--brand-blue-soft) to-(--brand-glaucous)">
                        <span className="text-white font-bold text-xl">
                          {member.name.charAt(0)}
                        </span>
                      </div>
                      <h3 className="mb-1 font-heading text-lg font-bold text-(--brand-blue)">
                        {member.name}
                      </h3>
                      <p className="mb-2 text-sm font-semibold text-(--brand-tangerine)">
                        {member.role}
                      </p>
                      {member.region && (
                        <p className="text-sm text-[rgba(51,51,51,0.6)]">
                          {member.region}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                {idx < teamSections.length - 1 && (
                  <div className="my-16 h-px bg-linear-to-r from-transparent via-(--brand-glaucous)/30 to-transparent"></div>
                )}
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-20 rounded-xl bg-linear-to-r from-(--brand-glaucous) to-(--brand-green) p-8 text-center md:mt-28 md:p-12">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-4">
              Connect With Us
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Have questions about our products or services? Our team is here to help you succeed.
            </p>
            <a href="/contact" className="inline-block rounded-lg bg-(--brand-tangerine) px-8 py-3 font-semibold text-(--brand-dark) transition-colors hover:bg-[#ef9a4e]">
              Get In Touch
            </a>
          </div>
        </div>
      </section>

      <ContactSection />
      <Footer />
    </div>
  );
}

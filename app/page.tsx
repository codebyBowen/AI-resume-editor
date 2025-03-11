import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, Star, Users, FileText, Zap, Clock } from "lucide-react"
import Image from "next/image"
import FeatureCard from "@/components/feature-card"
import TestimonialCard from "@/components/testimonial-card"
import AnimatedSection from "@/components/animated-section"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,#4f46e5,transparent)]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                  AI-Powered Resumes
                </span>{" "}
                That Get You Hired
              </h1>
              <p className="text-xl text-slate-300 max-w-xl">
                Create professional, ATS-optimized resumes in seconds with our cutting-edge AI technology. Stand out
                from the competition and land your dream job.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="border-slate-600 text-white hover:bg-slate-700">
                  See How It Works
                </Button>
              </div>
              <div className="flex items-center gap-4 pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-slate-800 overflow-hidden bg-slate-300"
                    >
                      <Image src={`/placeholder.svg?height=32&width=32`} alt="User avatar" width={32} height={32} />
                    </div>
                  ))}
                </div>
                <p className="text-sm text-slate-300">
                  <span className="font-bold">10,000+</span> professionals hired using our platform
                </p>
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="relative rounded-lg overflow-hidden shadow-2xl border border-slate-700">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  alt="AI Resume Builder Demo"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-30"></div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-indigo-600 text-white p-4 rounded-lg shadow-lg">
                <p className="font-bold">93% Success Rate</p>
                <p className="text-sm">Interview callbacks</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features to Boost Your Career</h2>
              <p className="text-lg text-slate-600">
                Our AI-powered platform offers everything you need to create professional resumes that get noticed by
                recruiters and pass through ATS systems.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatedSection delay={0.1}>
              <FeatureCard
                icon={<Zap className="h-8 w-8 text-indigo-600" />}
                title="AI Resume Generator"
                description="Generate tailored resumes in seconds with our advanced AI that understands your experience and the job requirements."
              />
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <FeatureCard
                icon={<FileText className="h-8 w-8 text-indigo-600" />}
                title="ATS-Optimized Templates"
                description="Our templates are designed to pass through Applicant Tracking Systems with the highest success rate in the industry."
              />
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <FeatureCard
                icon={<CheckCircle className="h-8 w-8 text-indigo-600" />}
                title="Keyword Optimization"
                description="AI analyzes job descriptions and optimizes your resume with relevant keywords to increase your match score."
              />
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <FeatureCard
                icon={<Clock className="h-8 w-8 text-indigo-600" />}
                title="Quick Customization"
                description="Customize your resume for each job application in minutes, not hours, with our intuitive editor."
              />
            </AnimatedSection>

            <AnimatedSection delay={0.5}>
              <FeatureCard
                icon={<Users className="h-8 w-8 text-indigo-600" />}
                title="Expert Feedback"
                description="Get instant feedback from our AI career experts on how to improve your resume and increase your chances."
              />
            </AnimatedSection>

            <AnimatedSection delay={0.6}>
              <FeatureCard
                icon={<Star className="h-8 w-8 text-indigo-600" />}
                title="Premium Designs"
                description="Stand out with professionally designed templates that highlight your skills and experience."
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <Image
                src="/placeholder.svg?height=600&width=600"
                alt="Why choose our platform"
                width={600}
                height={600}
                className="rounded-lg shadow-xl"
              />
            </div>
            <div className="flex-1 space-y-8">
              <AnimatedSection>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose Our Platform?</h2>
                <p className="text-lg text-slate-600 mb-8">
                  We combine cutting-edge AI technology with proven resume strategies to give you the best chance of
                  landing your dream job.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <div className="flex gap-4 items-start">
                  <div className="bg-indigo-100 p-3 rounded-full">
                    <CheckCircle className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Data-Driven Results</h3>
                    <p className="text-slate-600">
                      Our AI is trained on millions of successful resumes and hiring data to know exactly what works.
                    </p>
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <div className="flex gap-4 items-start">
                  <div className="bg-indigo-100 p-3 rounded-full">
                    <CheckCircle className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Time-Saving Automation</h3>
                    <p className="text-slate-600">
                      Create and customize professional resumes in minutes instead of hours or days.
                    </p>
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.3}>
                <div className="flex gap-4 items-start">
                  <div className="bg-indigo-100 p-3 rounded-full">
                    <CheckCircle className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Industry-Specific Expertise</h3>
                    <p className="text-slate-600">
                      Our AI understands the nuances of different industries and tailors your resume accordingly.
                    </p>
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.4}>
                <div className="flex gap-4 items-start">
                  <div className="bg-indigo-100 p-3 rounded-full">
                    <CheckCircle className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Continuous Improvement</h3>
                    <p className="text-slate-600">
                      Our AI learns from successful hires and continuously improves its recommendations.
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
              <p className="text-lg text-slate-600">
                Thousands of professionals have landed their dream jobs with our AI-powered resume builder.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatedSection delay={0.1}>
              <TestimonialCard
                name="Sarah Johnson"
                position="Marketing Manager at Google"
                image="/placeholder.svg?height=80&width=80"
                rating={5}
                testimonial="I was struggling to get interviews for months. After using this platform, I got 3 interview calls in the first week and landed my dream job at Google!"
              />
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <TestimonialCard
                name="Michael Chen"
                position="Software Engineer at Microsoft"
                image="/placeholder.svg?height=80&width=80"
                rating={5}
                testimonial="The AI suggestions were spot-on for my industry. My resume went from generic to outstanding, and I received multiple offers within weeks."
              />
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <TestimonialCard
                name="Jessica Williams"
                position="Financial Analyst at JP Morgan"
                image="/placeholder.svg?height=80&width=80"
                rating={5}
                testimonial="The ATS optimization feature is a game-changer. My resume finally made it past the initial screening, and I'm now working at my dream company."
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-indigo-600 text-white">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Get Started Today</h2>
              <p className="text-xl mb-8">
                Join thousands of professionals who have accelerated their careers with our AI-powered resume builder.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" className="bg-white text-indigo-600 hover:bg-slate-100">
                  Create Your Resume Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-indigo-700">
                  View Pricing Plans
                </Button>
              </div>
              <p className="mt-6 text-indigo-200">No credit card required. Start with our free plan today.</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-white mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Templates
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-white transition">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Resume Tips
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Career Advice
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Interview Prep
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Success Stories
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Cookie Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    GDPR
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p>© 2025 AI Resume Builder. All rights reserved.</p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="hover:text-white transition">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a href="#" className="hover:text-white transition">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}


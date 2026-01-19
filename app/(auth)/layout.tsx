import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation";

export default async function layout({children}: {children: React.ReactNode}) {
    const session = await auth.api.getSession({ headers: await headers()});
    if(session?.user) redirect('/');

    return (
        <main className="auth-layout">
            <section className="auth-left-section scrollbar-hide-default">
                <Link href="/" className="auth-logo">
                    <Image src="/icons/logo.svg" alt="Stocks App" width={140} height={32} className="h-8 w-auto" /> 
                </Link>
                <div className="pb-6 lg:pb-8 flex-1">{children}</div>
            </section>

            <section className="auth-right-section">
                <div className="z-10 relative lg:mt-4 lg:mb-16">
                    <blockquote className="auth-blockquote">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus aut quos consequuntur ab nihil esse perspiciatis illo hic fugit, alias minus quia velit earum commodi illum quasi? Id, doloremque dicta!
                    </blockquote>
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <cite className="auth-testimonial-author">- Benjamin N. </cite>
                        <p className="max-md:text-xs text-gray-500">P.M</p>
                    </div>
                </div>
                <div className="flex items-center gap-0.5">
                    {Array.from(Array(5).keys()).map((star) => (
                        <Image src="/icons/star.svg" alt="Star" key={star} width={20} height={20} className="w-5 h-5"/> 
                    ))}
                </div>

                <div className="flex-1 relative">
                    <Image src="/images/dashboard.png" alt="Dashboard preview" width={1440} height={1150} className="auth-dashboard-preview absolute top-0" />
                </div>
            </section>
        </main>
    )
}
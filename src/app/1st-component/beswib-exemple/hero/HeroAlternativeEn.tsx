/**
 * HeroAlternativeEn - Standalone English version
 *
 * This is a standalone version of HeroAlternative with hardcoded English text,
 * designed for sharing with the open source community.
 *
 * No dependencies on the i18n system - can be copied directly into other projects.
 */

import Image from 'next/image'
import Link from 'next/link'

import { AnimatedLife } from './AnimatedLife'
import TemplateRun from './TemplateRun'

export default function HeroAlternativeEn() {
	return (
		<div className="relative pb-0 md:pb-0 xl:pb-24">
			<TemplateRun />
			<AnimatedLife />
			<div className="absolute top-8 left-0 z-20 w-full text-center text-[0.9rem] font-bold tracking-tight text-neutral-800 lg:top-10 lg:text-[1.5rem] xl:top-24 xl:text-[2rem] dark:text-neutral-50">
				<h1
					dangerouslySetInnerHTML={{
						__html: "Can't Attend Your Race? <span>Transfer</span> Your Bib Safely!",
					}}
					className="font-geist [&_span]:font-bowlby-one-sc [&_span]:mx-2 [&_span]:text-[3.5rem] [&_span]:lg:text-[6rem] [&_span]:xl:text-[8rem]"
				/>
				<div className="flex flex-col justify-start gap-6 px-4 lg:hidden">
					<p
						dangerouslySetInnerHTML={{
							__html:
								'Legal race bib transfers for running, trail, triathlon & cycling events worldwide. <br />Secure PayPal payments, verified sellers, and instant organizer approval. Join thousands of athletes who trust Beswib.',
						}}
						className="text-center text-lg text-neutral-800 dark:text-neutral-100"
					/>
					<div className="flex flex-row justify-center gap-4">
						<div>
							<Link
								className="border-input bg-background ring-offset-background hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring inline-flex h-11 items-center justify-center rounded-md border px-3 text-sm font-medium shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none md:px-8 dark:shadow-none"
								href="/contact"
							>
								Organizer? List your race
							</Link>
						</div>
						<div>
							<Link
								className="bg-primary text-primary-foreground ring-offset-background hover:bg-primary/90 focus-visible:ring-ring inline-flex h-11 items-center justify-center rounded-md px-3 text-sm font-medium shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none md:px-8 dark:shadow-none"
								href="/events"
							>
								Browse races
							</Link>
						</div>
					</div>
				</div>
			</div>

			<section className="pointer-events-none relative">
				<div className="absolute top-0 left-0 z-0 flex h-screen w-screen">
					<div className="flex h-full items-end">
						<Image
							alt="template-youpi"
							className="z-0 mb-[40vh] h-[50vh] w-[50vw] max-w-[50vw] min-w-[50vw] object-cover object-center opacity-75 grayscale lg:mb-[42vh] lg:opacity-100 xl:mb-[25vh] xl:h-[55vh] dark:opacity-50"
							height={500}
							width={500}
							src={'/landing/youpi.jpg'}
						/>
					</div>
					<div className="z-0 h-[50vh] max-h-[50vh] w-[50vw] max-w-[50vw] -translate-y-14 overflow-hidden bg-[url('/svgs/topography.svg')] bg-center bg-repeat opacity-100 dark:opacity-50"></div>
				</div>
			</section>
			<div className="z-20 mx-auto flex max-w-full justify-end">
				<div className="grid min-h-screen w-1/2 grid-cols-12 gap-4">
					<div className="col-span-12 hidden flex-col justify-start gap-6 px-20 pt-[50vh] lg:flex">
						<p
							dangerouslySetInnerHTML={{
								__html:
									'Legal race bib transfers for running, trail, triathlon & cycling events worldwide. <br />Secure PayPal payments, verified sellers, and instant organizer approval. Join thousands of athletes who trust Beswib.',
							}}
							className="text-lg text-neutral-800 dark:text-neutral-300"
						/>
						<div className="flex flex-row gap-4">
							<div>
								<Link
									className="border-input bg-background ring-offset-background hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring inline-flex h-11 items-center justify-center rounded-md border px-3 text-sm font-medium shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none lg:px-8 dark:shadow-none"
									href="/contact"
								>
									Organizer? List your race
								</Link>
							</div>
							<div>
								<Link
									className="bg-primary text-primary-foreground ring-offset-background hover:bg-primary/90 focus-visible:ring-ring inline-flex h-11 items-center justify-center rounded-md px-3 text-sm font-medium shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none lg:px-8 dark:shadow-none"
									href="/events"
								>
									Browse races
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

/* eslint-disable @next/next/no-img-element */
"use client";

import { GithubLogo, XLogo } from '@phosphor-icons/react';
import { Bot, Brain, Command, GraduationCap, Image, Search, Share2, Sparkles, Star, Trophy, Users, AlertTriangle, Github, Twitter } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { TextLoop } from '@/components/core/text-loop';
import { TextShimmer } from '@/components/core/text-shimmer';
import { Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { TavilyLogo } from '@/components/logos/tavily-logo';
import NextImage from 'next/image';
import { useLanguage } from '../providers';

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export default function AboutPage() {
    const router = useRouter();
    const { language, direction, t } = useLanguage();
    const [showWarning, setShowWarning] = useState(false);
    
    useEffect(() => {
        // Check if user has seen the warning
        const hasSeenWarning = localStorage.getItem('hasSeenWarning');
        if (!hasSeenWarning) {
            setShowWarning(true);
        }
    }, []);

    const handleDismissWarning = () => {
        setShowWarning(false);
        localStorage.setItem('hasSeenWarning', 'true');
    };

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const query = formData.get('query')?.toString();
        if (query) {
            router.push(`/?q=${encodeURIComponent(query)}`);
        }
    };

    return (
        <div className={`min-h-screen bg-background text-foreground !font-sans ${direction}`}>
            <Dialog open={showWarning} onOpenChange={setShowWarning}>
                <DialogContent className="sm:max-w-[425px] p-0 bg-neutral-50 dark:bg-neutral-900">
                    <div className="p-6 border-b border-neutral-200 dark:border-neutral-800">
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2 text-yellow-600 dark:text-yellow-500">
                                <AlertTriangle className="h-5 w-5" />
                                Warning
                            </DialogTitle>
                            <DialogDescription className="text-neutral-600 dark:text-neutral-400">
                                ذكي is an AI search engine and is not associated with any cryptocurrency, memecoin, or token activities. Beware of impersonators.
                            </DialogDescription>
                        </DialogHeader>
                    </div>
                    <DialogFooter className="p-6 pt-4">
                        <Button 
                            variant="default" 
                            onClick={handleDismissWarning}
                            className="w-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200"
                        >
                            Got it, thanks
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Hero Section */}
            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-b from-neutral-100/40 dark:from-neutral-900/40" />
                <div className="absolute inset-0 bg-grid-neutral-700/[0.05] dark:bg-grid-neutral-300/[0.05]" />
                <div className="relative pt-20 pb-20 px-4">
                    <motion.div 
                        className="container max-w-5xl mx-auto space-y-12"
                        variants={container}
                        initial="hidden"
                        animate="show"
                    >
                        {/* Company Name/Logo */}
                        <motion.div variants={item} className="text-center">
                            <Link href="/" className="inline-flex items-end gap-3 text-5xl font-syne font-bold">
                                <NextImage src="/dhaki_logo-removebg-preview.png" alt="ذكي Logo" className="h-16 w-16" width={64} height={64} unoptimized quality={100}/>
                                <span className=''>ذكي</span>
                            </Link>
                        </motion.div>

                        <motion.form 
                            variants={item} 
                            className="max-w-2xl mx-auto w-full"
                            onSubmit={handleSearch}
                        >
                            <div className="relative group">
                                <input
                                    type="text"
                                    name="query"
                                    placeholder="Ask anything..."
                                    className="w-full h-14 px-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 focus:border-neutral-300 dark:focus:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-300 dark:focus:ring-neutral-700 transition-all duration-300"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            const query = e.currentTarget.value;
                                            if (query) {
                                                router.push(`/?q=${encodeURIComponent(query)}`);
                                            }
                                        }
                                    }}
                                />
                                <button
                                    type="submit"
                                    className="absolute right-2 top-2 h-10 px-4 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium hover:opacity-90 transition-opacity"
                                >
                                    Ask ذكي
                                </button>
                            </div>
                        </motion.form>

                        <motion.div variants={item} className="text-center space-y-6">
                            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                                A minimalistic AI-powered search engine with RAG and search grounding capabilities. Open source and built for everyone.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Powered By Section */}
            <div className="py-24 px-4 bg-white dark:bg-black border-y border-neutral-200 dark:border-neutral-800">
                <motion.div 
                    className="container max-w-5xl mx-auto space-y-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="text-center space-y-4">
                        <h2 className="text-3xl font-bold">{t('poweredBy')}</h2>
                        <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                            {t('dhakiPoweredBy')}
                        </p>
                    </div>

                    <div className="flex justify-center items-center">
                        <div className="p-8 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex flex-col items-center justify-center gap-4 max-w-lg">
                            <img src="/nuqtalogo.webp" alt="شركة نقطة للحلول التقنية" className="h-24 object-contain" />
                            <p className="text-neutral-600 dark:text-neutral-400 text-center text-lg font-medium">
                                {t('nuqtaTechSolutions')}
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Stats Section */}
            <div className="py-24 px-4 bg-white dark:bg-black border-y border-neutral-200 dark:border-neutral-800">
                <motion.div 
                    className="container max-w-5xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center space-y-2">
                            <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-600 dark:from-white dark:to-neutral-400">
                                350K+
                            </div>
                            <p className="text-neutral-600 dark:text-neutral-400">{t('questionsAnswered')}</p>
                        </div>
                        <div className="text-center space-y-2">
                            <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-600 dark:from-white dark:to-neutral-400">
                                100K+
                            </div>
                            <p className="text-neutral-600 dark:text-neutral-400">{t('activeUsers')}</p>
                        </div>
                        <div className="text-center space-y-2">
                            <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-600 dark:from-white dark:to-neutral-400">
                                7K+
                            </div>
                            <p className="text-neutral-600 dark:text-neutral-400">{t('communityStars')}</p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Models Section */}
            <div className="py-24 px-4">
                <motion.div 
                    className="container max-w-5xl mx-auto space-y-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="text-center space-y-4">
                        <h2 className="text-3xl font-bold">{t('poweredByAdvanced')}</h2>
                        <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                            {t('eachModelSelected')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                            <h3 className="font-semibold">{t('grok2')}</h3>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">{t('bestInClass')}</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                            <h3 className="font-semibold">{t('dhakiPlus')}</h3>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">{t('exceptionalUnderstanding')}</p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Features Section */}
            <div className="py-24 px-4">
                <motion.div 
                    className="container max-w-5xl mx-auto space-y-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="text-center space-y-4">
                        <h2 className="text-3xl font-bold">{t('advancedSearchFeatures')}</h2>
                        <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                            {t('experienceSmarter')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { 
                                icon: Brain, 
                                title: t('smartUnderstanding'),
                                description: t('usesMultipleAI')
                            },
                            { 
                                icon: Search, 
                                title: t('comprehensiveSearch'),
                                description: t('searchesAcross')
                            },
                            { 
                                icon: Image, 
                                title: t('imageUnderstanding'),
                                description: t('canUnderstand')
                            },
                            { 
                                icon: Command, 
                                title: t('smartCalculations'),
                                description: t('performsComplex')
                            },
                            { 
                                icon: GraduationCap, 
                                title: t('researchAssistant'),
                                description: t('helpsFind')
                            },
                            { 
                                icon: Sparkles, 
                                title: t('naturalConversations'),
                                description: t('respondsInClear')
                            }
                        ].map((feature, i) => (
                            <motion.div
                                key={i}
                                variants={item}
                                className="p-6 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900"
                            >
                                <div className="size-12 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-4">
                                    <feature.icon className="size-6 text-neutral-600 dark:text-neutral-400" />
                                </div>
                                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                                <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* New Use Cases Section */}
            <div className="py-24 px-4 bg-neutral-50 dark:bg-neutral-900/50 border-y border-neutral-200 dark:border-neutral-800">
                <motion.div className="container max-w-5xl mx-auto space-y-16">
                    <div className="text-center space-y-4">
                        <h2 className="text-3xl font-bold">Built For Everyone</h2>
                        <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                            Whether you need quick answers or in-depth research, ذكي adapts to your search needs.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                            <h3 className="text-lg font-semibold mb-2">Students</h3>
                            <ul className="list-disc list-inside space-y-2 text-neutral-600 dark:text-neutral-400">
                                <li>Research paper assistance</li>
                                <li>Complex topic explanations</li>
                                <li>Math problem solving</li>
                            </ul>
                        </div>
                        <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                            <h3 className="text-lg font-semibold mb-2">Researchers</h3>
                            <ul className="list-disc list-inside space-y-2 text-neutral-600 dark:text-neutral-400">
                                <li>Academic paper analysis</li>
                                <li>Data interpretation</li>
                                <li>Literature review</li>
                            </ul>
                        </div>
                        <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                            <h3 className="text-lg font-semibold mb-2">Professionals</h3>
                            <ul className="list-disc list-inside space-y-2 text-neutral-600 dark:text-neutral-400">
                                <li>Market research</li>
                                <li>Technical documentation</li>
                                <li>Data analysis</li>
                            </ul>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Footer Section */}
            <footer className="bg-neutral-50 dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800">
                <div className="mx-auto max-w-5xl px-4 py-12">
                    <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
                        <div className="flex items-center gap-3">
                            <img src="/dhaki_logo-removebg-preview.png" alt="ذكي Logo" className="h-8 w-8" />
                            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                © {new Date().getFullYear()} {t('allRightsReserved')}
                            </p>
                        </div>
                        
                        <div className="flex items-center gap-3">
                            <Link
                                href="https://x.com/sciraai"
                                className="rounded-lg p-2 text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800 transition-colors"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <XLogo className="h-5 w-5" />
                            </Link>
                            <Link
                                href="https://git.new/scira"
                                className="rounded-lg p-2 text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800 transition-colors"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Github className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
} 
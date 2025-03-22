/* eslint-disable @next/next/no-img-element */
"use client";
import 'katex/dist/katex.min.css';

import { BorderTrail } from '@/components/core/border-trail';
import { TextShimmer } from '@/components/core/text-shimmer';
import { FlightTracker } from '@/components/flight-tracker';
import { InstallPrompt } from '@/components/InstallPrompt';
import InteractiveChart from '@/components/interactive-charts';
import { MapComponent, MapContainer } from '@/components/map-components';
import TMDBResult from '@/components/movie-info';
import MultiSearch from '@/components/multi-search';
import NearbySearchMapView from '@/components/nearby-search-map-view';
import TrendingResults from '@/components/trending-tv-movies-results';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import WeatherChart from '@/components/weather-chart';
import { cn, getUserId, SearchGroupId } from '@/lib/utils';
import { Wave } from "@foobar404/wave";
import { CheckCircle, CurrencyDollar, Flag, Info, Memory, RoadHorizon, SoccerBall, TennisBall, XLogo, Clock as PhosphorClock, CalendarBlank } from '@phosphor-icons/react';
import { TextIcon } from '@radix-ui/react-icons';
import { ToolInvocation } from 'ai';
import { useChat, UseChatOptions } from '@ai-sdk/react';
import { AnimatePresence, motion } from 'framer-motion';
import { GeistMono } from 'geist/font/mono';
import {
    AlignLeft,
    ArrowRight,
    Book,
    Brain,
    Building,
    Calculator,
    Calendar,
    Check,
    ChevronDown,
    Cloud,
    Code,
    Copy,
    Download,
    ExternalLink,
    FileText,
    Film,
    Globe,
    Heart,
    Loader2,
    LucideIcon,
    MapPin,
    Moon,
    Pause,
    Plane,
    Play as PlayIcon,
    Plus,
    Sparkles,
    Sun,
    TrendingUp,
    TrendingUpIcon,
    Tv,
    User2,
    Users,
    X,
    YoutubeIcon,
    RefreshCw,
    WrapText,
    ArrowLeftRight,
    Mountain
} from 'lucide-react';
import Marked, { ReactRenderer } from 'marked-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import { parseAsString, useQueryState } from 'nuqs';
import React, {
    memo,
    Suspense,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState
} from 'react';
import Latex from 'react-latex-next';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark, oneLight, oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Tweet } from 'react-tweet';
import { toast } from 'sonner';
import {
    fetchMetadata,
    generateSpeech,
    suggestQuestions
} from './actions';
import InteractiveStockChart from '@/components/interactive-stock-chart';
import { CurrencyConverter } from '@/components/currency_conv';
import { ReasoningUIPart, ToolInvocationUIPart, TextUIPart, SourceUIPart } from '@ai-sdk/ui-utils';
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import FormComponent from '@/components/ui/form-component';
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import ReasonSearch from '@/components/reason-search';
import he from 'he';
import { ScrollArea } from "@/components/ui/scroll-area";
import MemoryManager from '@/components/memory-manager';

export const maxDuration = 120;

interface Attachment {
    name: string;
    contentType: string;
    url: string;
    size: number;
}

interface XResult {
    id: string;
    url: string;
    title: string;
    author?: string;
    publishedDate?: string;
    text: string;
    highlights?: string[];
    tweetId: string;
}

interface AcademicResult {
    title: string;
    url: string;
    author?: string | null;
    publishedDate?: string;
    summary: string;
}

const SearchLoadingState = ({
    icon: Icon,
    text,
    color
}: {
    icon: LucideIcon,
    text: string,
    color: "red" | "green" | "orange" | "violet" | "gray" | "blue"
}) => {
    const colorVariants = {
        red: {
            background: "bg-red-50 dark:bg-red-950",
            border: "from-red-200 via-red-500 to-red-200 dark:from-red-400 dark:via-red-500 dark:to-red-700",
            text: "text-red-500",
            icon: "text-red-500"
        },
        green: {
            background: "bg-green-50 dark:bg-green-950",
            border: "from-green-200 via-green-500 to-green-200 dark:from-green-400 dark:via-green-500 dark:to-green-700",
            text: "text-green-500",
            icon: "text-green-500"
        },
        orange: {
            background: "bg-orange-50 dark:bg-orange-950",
            border: "from-orange-200 via-orange-500 to-orange-200 dark:from-orange-400 dark:via-orange-500 dark:to-orange-700",
            text: "text-orange-500",
            icon: "text-orange-500"
        },
        violet: {
            background: "bg-violet-50 dark:bg-violet-950",
            border: "from-violet-200 via-violet-500 to-violet-200 dark:from-violet-400 dark:via-violet-500 dark:to-violet-700",
            text: "text-violet-500",
            icon: "text-violet-500"
        },
        gray: {
            background: "bg-neutral-50 dark:bg-neutral-950",
            border: "from-neutral-200 via-neutral-500 to-neutral-200 dark:from-neutral-400 dark:via-neutral-500 dark:to-neutral-700",
            text: "text-neutral-500",
            icon: "text-neutral-500"
        },
        blue: {
            background: "bg-blue-50 dark:bg-blue-950",
            border: "from-blue-200 via-blue-500 to-blue-200 dark:from-blue-400 dark:via-blue-500 dark:to-blue-700",
            text: "text-blue-500",
            icon: "text-blue-500"
        }
    };

    const variant = colorVariants[color];

    return (
        <Card className="relative w-full h-[100px] my-4 overflow-hidden shadow-none">
            <BorderTrail
                className={cn(
                    'bg-gradient-to-l',
                    variant.border
                )}
                size={80}
            />
            <CardContent className="p-6">
                <div className="relative flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className={cn(
                            "relative h-10 w-10 rounded-full flex items-center justify-center",
                            variant.background
                        )}>
                            <BorderTrail
                                className={cn(
                                    "bg-gradient-to-l",
                                    variant.border
                                )}
                                size={40}
                            />
                            <Icon className={cn("h-5 w-5", variant.icon)} />
                        </div>
                        <div className="space-y-2">
                            <TextShimmer
                                className="text-base font-medium"
                                duration={2}
                            >
                                {text}
                            </TextShimmer>
                            <div className="flex gap-2">
                                {[...Array(3)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="h-1.5 rounded-full bg-neutral-200 dark:bg-neutral-700 animate-pulse"
                                        style={{
                                            width: `${Math.random() * 40 + 20}px`,
                                            animationDelay: `${i * 0.2}s`
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

interface VideoDetails {
    title?: string;
    author_name?: string;
    author_url?: string;
    thumbnail_url?: string;
    type?: string;
    provider_name?: string;
    provider_url?: string;
    height?: number;
    width?: number;
}

interface VideoResult {
    videoId: string;
    url: string;
    details?: VideoDetails;
    captions?: string;
    timestamps?: string[];
    views?: string;
    likes?: string;
    summary?: string;
}

interface YouTubeSearchResponse {
    results: VideoResult[];
}

interface YouTubeCardProps {
    video: VideoResult;
    index: number;
}

const VercelIcon = ({ size = 16 }: { size: number }) => {
    return (
        <svg
            height={size}
            strokeLinejoin="round"
            viewBox="0 0 16 16"
            width={size}
            style={{ color: "currentcolor" }}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8 1L16 15H0L8 1Z"
                fill="currentColor"
            ></path>
        </svg>
    );
};

"use client";

import Image from 'next/image';
import { impactProjects } from '@/constants/impact';
import { FaInstagram, FaVimeo, FaYoutube } from 'react-icons/fa';

export function ImpactCard({ project }: { project: typeof impactProjects[0] }) {
    const isDark = project.theme === 'dark';
    const bgColor = isDark ? 'bg-gray-dark-2' : 'bg-gray-light-2';
    const textColor = isDark ? 'text-gray-light-1' : 'text-gray-dark-1';

    return (
        <div className={`${bgColor} rounded-2xl overflow-hidden h-full min-h-[650px] flex flex-col shadow-xl`}>
            {(project.logo || project.logoText || project.button || project.navigation) && (
                <div className={`px-6 py-4 border-b ${isDark ? 'border-gray-dark-4' : 'border-gray-light-4'} flex items-center justify-between`}>
                    <div className="flex items-center gap-3">
                        {project.logo && (
                            <Image
                                src={project.logo}
                                alt={project.logoText || ''}
                                width={40}
                                height={40}
                                className="object-contain"
                            />
                        )}
                        {project.logoText && (
                            <div className="flex flex-col">
                                <span className={`text-lg font-bold ${textColor}`}>{project.logoText}</span>
                                {project.logoSubtext && (
                                    <span className={`text-xs ${isDark ? 'text-gray-light-3' : 'text-gray-dark-6'}`}>
                                        {project.logoSubtext}
                                    </span>
                                )}
                            </div>
                        )}
                    </div>
                    {project.navigation && (
                        <nav className="hidden md:flex gap-4 text-xs">
                            {project.navigation.map((item, idx) => (
                                <a
                                    key={idx}
                                    href="#"
                                    className={`${textColor} ${idx === 0 ? 'underline' : ''} hover:opacity-80 transition-opacity`}
                                >
                                    {item}
                                </a>
                            ))}
                        </nav>
                    )}
                    {project.button?.variant === 'primary' && (
                        <div className="flex items-center gap-3">
                            <button className="px-4 py-2 rounded-lg font-semibold text-sm bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                                {project.button.text}
                            </button>
                            <span className={`text-sm ${textColor}`}>LOG IN</span>
                        </div>
                    )}
                </div>
            )}

            <div className="flex-1 relative px-6 py-8">
                {project.mainContent.type === 'image' ? (
                    <div className="relative w-full h-80 rounded-lg overflow-hidden mb-6">
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-900 via-amber-800 to-amber-900 flex items-center justify-center">
                            <div className="text-center">
                                <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                                    <span className="text-6xl">🍦</span>
                                </div>
                                <span className={`text-sm ${textColor} opacity-70`}>Ice Cream Image</span>
                            </div>
                        </div>
                        {project.socialIcons && (
                            <div className="absolute right-4 top-4 flex flex-col gap-3">
                                {project.socialIcons.map((icon, idx) => {
                                    const IconComponent = {
                                        instagram: FaInstagram,
                                        vimeo: FaVimeo,
                                        youtube: FaYoutube,
                                    }[icon];

                                    return IconComponent ? (
                                        <div
                                            key={idx}
                                            className={`w-8 h-8 rounded-full ${isDark ? 'bg-gray-dark-4' : 'bg-gray-light-4'} flex items-center justify-center`}
                                        >
                                            <IconComponent className={textColor} size={16} />
                                        </div>
                                    ) : null;
                                })}
                            </div>
                        )}
                    </div>
                ) : (
                    <div className={`text-8xl font-bold ${textColor} mb-6 ${!project.title ? 'mt-8' : ''}`}>
                        {project.mainContent.content}
                    </div>
                )}

                {project.title && (
                    <h3 className={`text-3xl font-bold ${textColor} mb-3`}>{project.title}</h3>
                )}
                {project.description && (
                    <p className={`text-sm mb-6 ${isDark ? 'text-gray-light-3' : 'text-gray-dark-6'} leading-relaxed`}>
                        {project.description}
                    </p>
                )}

                {project.metrics && (
                    <div className="flex items-center justify-between gap-4 p-4 rounded-lg bg-gray-dark-3">
                        <span className={`text-sm ${textColor} flex-1`}>{project.metrics.label}</span>
                        <div className={`px-4 py-2 rounded-lg ${isDark ? 'bg-gray-dark-4' : 'bg-gray-light-4'} shrink-0`}>
                            <span className={`font-bold ${textColor}`}>{project.metrics.value}</span>
                        </div>
                    </div>
                )}

                {project.button?.variant === 'secondary' && (
                    <button className="mt-6 px-6 py-3 rounded-lg font-semibold flex items-center gap-2 bg-gray-dark-4 text-gray-light-1 hover:bg-gray-dark-5 transition-colors">
                        {project.button.text}
                        <span>→</span>
                    </button>
                )}
            </div>

            <div className={`h-1 ${isDark ? 'bg-gray-dark-4' : 'bg-gray-light-4'} relative`}>
                <div className={`h-full w-1/3 ${isDark ? 'bg-gray-light-3' : 'bg-gray-dark-6'}`} />
            </div>
        </div>
    );
}


import React from 'react'
import { useEffect, useState } from 'react';
import { Button, Spinner, Badge } from 'flowbite-react'; // Bỏ Card của Flowbite để tự custom cho dễ
import {HiRefresh, HiGlobeAlt, HiCalendar, HiLightningBolt, HiLightBulb, HiOutlineSearchCircle} from 'react-icons/hi';
import {Link, useLocation} from 'react-router-dom';

export default function Fotd() {
    const [fruit, setFruit] = useState(null);
    const [loading, setLoading] = useState(true);

    const location = useLocation();

    const fetchFruit = async () => {
        setLoading(true);
        try {
            const searchParams = new URLSearchParams(location.search);
            const fakeHour = searchParams.get('fakeHour');
            let apiUrl = `${import.meta.env.VITE_API_URL}/api/fotd`;

            if (fakeHour) {
                apiUrl += `?fakeHour=${fakeHour}`;
            } else {
                const date = new Date();
                const currentHour = date.getHours();
                apiUrl += `?fakeHour=${currentHour}`;
            }

            const res = await fetch(apiUrl);
            const data = await res.json();
            if (res.ok) {
                setFruit(data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFruit();
    }, [location.search]);

    if (loading) return (
        <div className='min-h-screen flex justify-center items-center bg-amber-50 dark:bg-slate-900'>
            <Spinner size='xl' color="warning" />
        </div>
    );

    return (
        <div className='min-h-screen flex flex-col items-center justify-center p-4 bg-amber-50 dark:bg-slate-900 font-sans'>
            <h1 className='text-3xl md:text-4xl font-bold mb-6 text-center'>
                🍎 Fruit of the Day 🍎
            </h1>

            {fruit && (
                <div className='max-w-5xl w-full bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row transition-all duration-300'>

                    <div className='relative w-full md:w-5/12 h-64 md:h-auto group overflow-hidden'>
                        <img
                            src={`https://image.pollinations.ai/prompt/realistic ${fruit.englishName} fruit professional photography 4k lighting`}
                            alt={fruit.name}
                            className='w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700'
                        />
                        {/* Overlay tên trái cây ngay trên ảnh */}
                        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white drop-shadow-lg">
                                {fruit.name}
                            </h2>
                            <p className="text-gray-200 text-sm opacity-90">{fruit.englishName}</p>
                        </div>
                    </div>

                    <div className="w-full md:w-7/12 p-6 md:p-8 flex flex-col justify-between">

                        <div>
                            <p className="text-gray-700 dark:text-gray-300 italic text-lg leading-relaxed mb-4 border-l-4 border-amber-400 pl-4">
                                "{fruit.description}"
                            </p>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="flex items-center gap-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                                    <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                                        <HiGlobeAlt className="w-5 h-5 text-blue-600 dark:text-blue-300" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-blue-700 dark:text-blue-400 text-sm">Origin</p>
                                        <p className="font-semibold text-gray-800 dark:text-gray-200">{fruit.origin}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg p-3">
                                    <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-full">
                                        <HiCalendar className="w-5 h-5 text-orange-600 dark:text-orange-300" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-orange-700 dark:text-orange-400 text-sm">Season</p>
                                        <p className="font-semibold text-gray-800 dark:text-gray-200">{fruit.season}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg flex gap-3 items-start">
                                    <HiLightningBolt className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-bold text-green-700 dark:text-green-400 text-sm">Nutrition</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">{fruit.nutrition}</p>
                                    </div>
                                </div>

                                <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg flex gap-3 items-start">
                                    <HiLightBulb className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-bold text-purple-700 dark:text-purple-400 text-sm">Fun Fact</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">{fruit.funFact}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='pt-6 mt-auto flex justify-end'>
                            <Link to={`/search?searchTerm=${fruit.name}`}>
                                <Button
                                    className="shadow-md hover:shadow-lg transition-all w-full md:w-auto
                                bg-gradient-to-r from-indigo-500
                               via-purple-500 to-pink-500 rounded-lg"
                                >
                                    <HiOutlineSearchCircle className="mr-2 h-5 w-5" />
                                    Find Blog Posts about {fruit.name}
                                </Button>
                            </Link>
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
}
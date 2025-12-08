import { Button } from 'flowbite-react';

export default function CallToAction() {
    return (
        <div className='flex border border-teal-500 p-3 justify-center items-center rounded-tl-3xl rounded-br-3xl flex-col sm:flex-row text-center'>
            <div className='flex-1 justify-center flex flex-col'>
                <h2 className='text-2xl'>
                    Want to learn fruit by fun and engaging
                    projects?
                </h2>
                <p className='text-gray-500 my-2'>
                    Check our member's facebook and start learning from him
                </p>
                <a
                    href='https://www.facebook.com/Kun413'
                    target='_blank'
                    rel='noopener noreferrer'
                >
                    <Button
                        gradientduotone='purpleToPink'
                        className='rounded-tl-xl rounded-bl-none rounded-br-xl w-full'
                    >
                        Click here to learn more
                    </Button>
                </a>
            </div>
            <div className='flex-1 p-7'>
                <img src='http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcR67SpjSn0Uoz1RoNl0FAfodMn0LSUoYnTWYRLe3YcHTQisOuauevTcCC3qJQbOW6_CJaky3_9h6cZwbAbSV34'  alt={"Anh Tuan"}/>
            </div>
        </div>
    );
}
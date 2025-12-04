import {Link} from "react-router-dom";
import {Label, TextInput} from "flowbite-react";

export default function SignUp() {
    return (
        <div className='min-h-screen mt-20'>
            <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row
            md:item-center">
                {/*left*/}
                <div className=''>
                    <Link to="/" className='font-bold dark:text-white text-4xl'>
                        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500
                        via-purple-500 to-pink-500 rounded-lg text-white'>Blog</span>
                        Fruit
                    </Link>
                    <p className='text-sm mt-5'>
                        This is a demo project. You can sign up with your email and password or with Google.
                    </p>
                </div>
                
                {/*right*/}
                <div className="">
                    <form>
                        <div>

                            <Label htmlFor='username'/>
                            <TextInput
                                type='text'
                                placeholder='Username'
                                id='username'
                            />
                        </div>
                        <div>
                            <Label value='Your email'/>
                            <TextInput
                                type='text'
                                placeholder='Email'
                                id='email'
                            />
                        </div>
                        <div>
                            <Label value='Your password'/>
                            <TextInput
                                type='text'
                                placeholder='Password'
                                id='password'
                            />
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}
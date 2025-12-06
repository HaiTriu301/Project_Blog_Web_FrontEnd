import {Link} from "react-router-dom";
import {Button, Label, TextInput} from "flowbite-react";
import {useState} from "react";

export default function SignIn() {
    const [formData, setFormData] = useState({})
    const handleChange = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value});
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Need path from Tuan
        // try {
        //     const res = await fetch ('', {
        //         method: 'POST',
        //         headers: {'Content-Type': 'application/json'},
        //         body: JSON.stringify(formData),
        //     })
        //     const data = await res.json()
        // } catch (error) {
        //
        // }
    }

    return (
        <div className='min-h-screen mt-20'>
            <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row
            md:item-center gap-5">
                {/*left*/}
                <div className='flex-1'>
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
                <div className="flex-1">
                    <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                        <div>
                            <Label>Your username</Label>
                            <TextInput
                                type='text'
                                placeholder='Username'
                                id='username'
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label>Your password</Label>
                            <TextInput
                                type='password'
                                placeholder='Password'
                                id='password'
                                onChange={handleChange}
                            />
                        </div>
                        <Button className="bg-gradient-to-r from-purple-500 to-pink-500
                        text-white hover:bg-gradient-to-l focus:ring-purple-200
                        dark:focus:ring-purple-800" type='submit'>
                            Sign up
                        </Button>
                    </form>
                    <div className="flex gap-2 text-sm mt-5">
                        <span>Have an account?</span>
                        <Link to='/signin' className='text-blue-500'>
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
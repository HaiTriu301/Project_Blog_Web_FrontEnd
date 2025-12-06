import {Link, useNavigate} from "react-router-dom";
import {Alert, Button, Label, Spinner, TextInput} from "flowbite-react";
import {useState} from "react";

export default function SignUp() {
    const [formData, setFormData] = useState({})
    const [errorsMessage, setErrorMessages] = useState(null)
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value.trim()});
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.username || !formData.password || !formData.email) {
            return setErrorMessages('Please fill out all fields!');
        }

        // Need path from Tuan
        try {
        setLoading(true);
        setErrorMessages(null)
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signup`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formData),
            })
            const data = await res.json()
            if (data.success === false){
                return setErrorMessages(data.errors)
            }
            setLoading(false)
            if (res.ok){
                navigate('/signin');
            }
        } catch (error) {
            setErrorMessages(errorsMessage)
            setLoading(false)
        }
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
                            <Label>Your email</Label>
                            <TextInput
                                type='email'
                                placeholder='name@company.com'
                                id='email'
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
                        dark:focus:ring-purple-800" type='submit' disabled={loading}>
                            {
                                loading ? (
                                    <>
                                        <Spinner size='sm'/>
                                        <span className='pl-3'>Loading...</span>
                                    </>
                                ) : 'Sign up'
                            }
                        </Button>
                    </form>
                    <div className="flex gap-2 text-sm mt-5">
                        <span>Have an account?</span>
                        <Link to='/signin' className='text-blue-500'>
                            Sign In
                        </Link>
                    </div>
                    {
                        errorsMessage && (
                            <Alert className="mt-5" color="failure">
                                {errorsMessage}
                            </Alert>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
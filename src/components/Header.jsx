import {
    Avatar,
    Button,
    Dropdown, DropdownDivider,
    DropdownHeader, DropdownItem,
    Navbar,
    NavbarCollapse,
    NavbarLink,
    NavbarToggle,
    TextInput
} from "flowbite-react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {AiOutlineSearch} from "react-icons/ai";
import {FaMoon, FaSun} from "react-icons/fa";
import {useSelector, useDispatch} from "react-redux";
import {toggleTheme} from "../redux/theme/themeSlice";
import {signoutSuccess} from "../redux/user/userSlice.js";
import {useEffect, useState} from "react";
import ColorBlindSettings from "./ColorBlind.jsx";

export default function Header() {
    const path = useLocation().pathname;
    const location = useLocation();
    const dispatch = useDispatch();
    const {currentUser} = useSelector(state => state.user)
    const {theme} = useSelector(state => state.theme)
    const [searchTerm, setSearchTerm] = useState('')
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromURL = urlParams.get('searchTerm');
        if (searchTermFromURL) {
            setSearchTerm(searchTermFromURL);
        }
    }, [location.search]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('searchTerm', searchTerm);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    };

    const handleSignout = async () => {
        try{
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/user/signout`, {
                method: 'POST',
                credentials: "include",
            })
            const data = await res.json()
            if (!res.ok) {
                console.log(data.message)
            } else {
                dispatch(signoutSuccess())
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <Navbar className='border-b-2'>
            <Link to="/" className='seft-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
                <span className='px-2 py-1 bg-gradient-to-r from-indigo-500
                via-purple-500 to-pink-500 rounded-lg text-white'>Blog</span>
                Fruit
            </Link>

            <form onSubmit={handleSubmit}>
                <TextInput
                    type='text'
                    placeholder='Search...'
                    rightIcon={AiOutlineSearch}
                    className='hidden lg:inline'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </form>

            <Button className='w-12 h-10 lg:hidden' color='gray' pill>
                <AiOutlineSearch/>
            </Button>

            <div className="flex gap-2 md:order-2">
                <ColorBlindSettings />
                {currentUser ? (
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            <Avatar
                                alt='user'
                                img={currentUser.profilePicture}
                                rounded
                            />
                        }
                    >
                        <DropdownHeader>
                            <span className='block text-sm'>@{currentUser.username}</span>
                            <span className='block text-sm font-medium truncate'>{currentUser.email}</span>
                        </DropdownHeader>
                        <Link to={'/dashboard?tab=profile'}>
                            <DropdownItem>Profile</DropdownItem>
                        </Link>
                        <DropdownDivider />
                        <DropdownItem onClick={handleSignout}>Sign out</DropdownItem>
                    </Dropdown>
                ): (
                    <Link to='/signin'>
                        <Button gradientduotone='purpleToBlue' outline>
                            Sign In
                        </Button>
                    </Link>
                )}

                {/*<Link to='/signin'>*/}
                {/*    <Button className="bg-gradient-to-br from-purple-600*/}
                {/*    to-blue-500 text-white hover:bg-gradient-to-bl*/}
                {/*    focus:ring-blue-300 dark:focus:ring-blue-800">*/}
                {/*        Sign in*/}
                {/*    </Button>*/}
                {/*</Link>*/}

                <NavbarToggle/>
            </div>

            <NavbarCollapse>
                <NavbarLink
                    as={Link} to='/'
                    active={path === '/'}
                >
                    Home
                </NavbarLink>

                <NavbarLink
                    as={Link} to='/about'
                    active={path === '/about'}
                >
                    About
                </NavbarLink>

                <NavbarLink
                    as={Link} to='projects'
                    active={path === '/projects'}
                >
                    Projects
                </NavbarLink>
                <NavbarLink active={path === '/fotd'} as={'div'}>
                    <Link to="/fotd">
                        Fruit of the Day
                    </Link>
                </NavbarLink>
            </NavbarCollapse>
        </Navbar>
    )
}
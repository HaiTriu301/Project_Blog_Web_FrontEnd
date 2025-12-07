import {Sidebar, SidebarItem, SidebarItemGroup, SidebarItems} from "flowbite-react";
import {HiArrowSmRight, HiUser} from "react-icons/hi";
import {Link, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {signoutSuccess} from "../redux/user/userSlice";
import {useDispatch} from "react-redux";

export default function DashSidebar() {
    const location = useLocation();
    const dispatch = useDispatch();
    const [tab, setTab] = useState('');
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get('tab');
        if (tabFromUrl) {
            setTab(tabFromUrl)
        }
    }, [location.search])

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
        <Sidebar className='w-full md:w-56'>
            <SidebarItems>
                <SidebarItemGroup>
                    <SidebarItem
                        as={Link}
                        to='/dashboard?tab=profile'
                        active={tab === 'profile'}
                        icon={HiUser}
                        label={"User"}
                        labelColor='dark'
                        as='div'
                    >
                        Profile
                    </SidebarItem>

                    <SidebarItem
                        icon={HiArrowSmRight}
                        className='cursor-pointer'
                        onClick={handleSignout}
                    >
                        Sign Out
                    </SidebarItem>
                </SidebarItemGroup>
            </SidebarItems>
        </Sidebar>
    )
}
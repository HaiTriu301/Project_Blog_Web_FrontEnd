import {
    FooterDivider,
    Footer,
    FooterCopyright,
    FooterLink,
    FooterLinkGroup,
    FooterTitle,
    FooterIcon
} from 'flowbite-react';
import {Link} from "react-router-dom";
import {BsFacebook, BsGithub, BsInstagram, BsTwitter} from "react-icons/bs";
import ColorBlindSettings from "./ColorBlind.jsx";

export default function FooterCom() {
    return (
        <Footer container className='border border-t-8 border-teal-500'>
            <div className="w-full max-w-7xl mx-auto">
                <div className="grid w-full justify-between sm:flex md:grid-cols-1">
                    <div className="mt-5">
                        <Link to="/"
                              className='seft-center whitespace-nowrap text-sm
                              sm:text-xl font-semibold dark:text-white'
                        >
                        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500
                        via-purple-500 to-pink-500 rounded-lg text-white'>
                            Blog
                        </span>
                            Fruit
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3
                    sm:gap-6">
                        <div>
                            <FooterTitle title='About'/>
                            <FooterLinkGroup col>
                                <FooterLink
                                    href='/about'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                >
                                    Blog Fruit
                                </FooterLink>
                            </FooterLinkGroup>
                        </div>

                        <div>
                            <FooterTitle title='Follow us' />
                            <FooterLinkGroup col>
                                <FooterLink
                                    href='https://github.com/HaiTriu301'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                >
                                    Github
                                </FooterLink>

                                <FooterLink
                                    href='https://www.facebook.com/LuNguyenHaiTrieu.3012005/'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                >
                                    Facebook
                                </FooterLink>
                            </FooterLinkGroup>
                        </div>

                        <div>
                            <FooterTitle title='Legal' />
                            <FooterLinkGroup col>
                                <FooterLink
                                    href='#'
                                >
                                    Privacy Policy
                                </FooterLink>

                                <FooterLink
                                    href='#'
                                >
                                    Terms &amp; Conditions
                                </FooterLink>
                            </FooterLinkGroup>
                        </div>
                    </div>
                </div>
                <FooterDivider />
                <div className="w-full sm:flex sm:items-center sm:justify-between">
                    <FooterCopyright
                        href='#'
                        by="Blog Fruit"
                        year={new Date().getFullYear()}
                    />
                    <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
                        <FooterIcon href="#" icon={BsFacebook}/>
                        <FooterIcon href="#" icon={BsInstagram}/>
                        <FooterIcon href="#" icon={BsTwitter}/>
                        <FooterIcon href="#" icon={BsGithub}/>
                    </div>
                </div>
            </div>
        </Footer>
    )
}
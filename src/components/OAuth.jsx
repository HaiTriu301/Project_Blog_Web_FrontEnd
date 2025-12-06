import {Button} from "flowbite-react";
import {AiFillGoogleCircle} from "react-icons/ai";
import {DiGoogleAnalytics} from "react-icons/di";

class GoogleAuthProvider {
}

export default function OAuth() {
    return(
        <Button type='button' gradientduotone='pinkToOrange' outline>
            <AiFillGoogleCircle className='w-6 h-6 mr-2' />
            Continue with Google
        </Button>
    )
}
import ErrorMessage from "../../ErrorMessage/ErrorMessage";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return(
        <section style={{position: 'relative', height: '100vh'}}>
            <ErrorMessage msg='404 page not found!' smile='👻'/>
            <Link className='button main' style={{position: 'absolute', bottom: '30%', left: '50%', transform: 'translateX(-50%)'}} to='/'>Go home</Link>
        </section>
    )
}

export default NotFoundPage
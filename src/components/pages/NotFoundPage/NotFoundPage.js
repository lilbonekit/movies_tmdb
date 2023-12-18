import ErrorMessage from "../../ErrorMessage/ErrorMessage"
import { Link } from "react-router-dom";

import { Helmet } from "react-helmet";

const NotFoundPage = () => {
    return(
        <section style={{position: 'relative', height: '100vh'}}>
            <Helmet>
                <title>TheMovideDB | 404 not found</title>
            </Helmet>
            <ErrorMessage msg='404 page not found!' smile='👻'/>
            <Link className='button main' style={{position: 'absolute', bottom: '25%', left: '50%', transform: 'translateX(-50%)'}} to='/'>Go home</Link>
        </section>
    )
}

export default NotFoundPage
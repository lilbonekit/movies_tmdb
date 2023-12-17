import './Layout.scss'
import { NavLink, Outlet, Link } from "react-router-dom"
import { useState, useEffect, useRef } from 'react'

import { Logo } from '../Icons/Icons'

const Layout = () => {
    return(
        <>
           <Header/>
            <main>
                <Outlet/>
            </main>
            <footer>lilbonekit's pet project</footer>
        </>
    )
}

const Header = () => {
    const [scrollY, setScrollY] = useState(0)
    const [hidden, setHidden] = useState(false)
    const prevScrollYRef = useRef(0)

    const handleScroll = () => {
        setScrollY(window.scrollY)
    }

    useEffect(() => {
          window.addEventListener('scroll', handleScroll)
      
          return () => {
            window.removeEventListener('scroll', handleScroll)
          }
        }, [])

    useEffect(() => {
        if(prevScrollYRef.current > scrollY) {
            setHidden(false)
        }
        if(prevScrollYRef.current < scrollY) {
            setHidden(true)

        }
        prevScrollYRef.current = scrollY;
    }, [scrollY])
    
    return(
        <header className={`${scrollY > 75 ? 'blured' : ''} ${hidden ? 'hidden' : ''}`}>
                <Link to='/' className="logo">
                    <Logo className='logo'/>
                    <p>TheMovieDB</p>
                </Link>
                <nav>
                    <NavLink to='/'>Home</NavLink>
                    <NavLink to='library'>My library</NavLink>
                </nav>
        </header>    
    )
}

export default Layout
"use client";

import Image from 'next/image'
import { useSelectedLayoutSegment } from "next/navigation";

export default function Nav() {
    const segment = useSelectedLayoutSegment()

    const navArr = [
        { name: "games", link: "/games" },
        { name: "genres", link: "/genres" },
        { name: "developers", link: "/developers" },
        { name: "publishers", link: "/publishers" },
    ];
    const getItem = (item) => {
        const isActive = item.name === segment ? " active" : ""

        return (
            <li className="nav-item" key={item.name}>
                <a className={`nav-link${isActive}`} aria-current="page" href={item.link}>{item.name}</a>
            </li>)
    }

    return <nav className="nav">
        <div className="nav-container">
            <ul className="nav-list">
                <li className="nav-item">
                    <a href="/" className="logo-link">
                        <Image
                            src="/UI/logo.svg"
                            alt="logo"
                            width={40}
                            height={40}
                        />
                    </a>
                </li>
                {navArr.map((item) => getItem(item))}
            </ul>
        </div>
    </nav>

}


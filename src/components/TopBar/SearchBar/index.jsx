import React from 'react'
import searchIcon from "icons/search2.svg"
import styles from "./SearchBar.module.css"

export default function SearchBar() {
    const inputRef = React.useRef();

    return (
        <div className={styles.bar} onClick={() => inputRef.current?.focus()}>
            <img src={searchIcon} alt="" />
            <input type="search" ref={inputRef} placeholder="Buscar!"/>
        </div>
    )
}

import React, { Component } from 'react';
class Navbar extends Component {
    // state = {  }
    render() { 
        return (<div className="Navbar">
        <div className="logo">Shopbiz</div>
        <ul>
            <li><a link="">Kategori</a></li>
            <li><a link="">Beranda</a></li>
            <li><a link="">Daftar</a></li>
            <li><a link="">Masuk</a></li>
        </ul>
        </div>  );
    }
}
 
export default Navbar;
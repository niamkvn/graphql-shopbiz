import React, { Component } from 'react';

class Footer extends Component {
//   state = {};
  render() {
    return (
      <div className="Footer ">
        <div className="footer-menu ">
          <div className="footer-item ">
            <h3>Shopbiz</h3>
            <li>
              <a link="# ">Tentang Kami</a>
            </li>
          </div>
          <div className="footer-item ">
            <h3>Bantuan</h3>
            <li>
              <a link="# ">Syarat dan Ketentuan</a>
            </li>
            <li>
              <a link="# ">Hubungi Kami</a>
            </li>
            <li>
              <a link="# ">Panduan Keamanan</a>
            </li>
          </div>
        </div>
        <div className="box ">
          <a link="# ">
            <i className="fa fa-phone " />
            <h3>Coming Soon!</h3>
            <p>Mobile App Version</p>
            <p>Android and IOS</p>
          </a>
        </div>
        <footer>
          <p>Shopbiz &copy; 2018</p>
        </footer>
      </div>
    );
  }
}

export default Footer;

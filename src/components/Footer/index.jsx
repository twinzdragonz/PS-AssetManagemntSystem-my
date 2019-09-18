import React from "react";
import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container-fluid">
        <div className="row justify-content-around">
          <div className="col-8 col-md-5">
            <h5 className={styles.title}>Policy Street Agent Portal</h5>
            <p className={styles.description}>
              Where Consumer and Agents meet satisfaction
            </p>
          </div>
          <div className="col-2">
            <ul className="list-unstyled">
              <li>
                <a className={styles.footerlink} href="https://policystreet.com/">
                Policy Street Offical Website
                </a>
              </li>
              <li>
                <a className={styles.footerlink} href="https://fintechnews.my/tag/policy-street/">
                  Fintech News
                </a>
              </li>
              <li>
                <a className={styles.footerlink} href="https://www.crunchbase.com/organization/policystreet">
                  Crunch Base
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

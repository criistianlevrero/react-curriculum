import React from 'react';

import styles from './main-with-aside.module.scss';
//var classNames = require('classnames');


export default function MainWithAsideLayout({ aside, main }) {

 
  return (
    <div className={styles.mainWithAsideLayout}>
      <aside className={styles.aside}>
        {aside}
      </aside>
      <main className={styles.main}>
        {main}
      </main>
    </div>
  );
}

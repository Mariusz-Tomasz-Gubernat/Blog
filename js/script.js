'use strict';

const activeLinks = document.querySelectorAll('.titles a.active');
const activeArticles = document.querySelectorAll('.posts .post.active')

function titleClickHandler(event) {
  console.log('Link was clicked!');
  console.log(event);

  /* remove class 'active' from all article links  */

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* add class 'active' to the clicked link */

  /* remove class 'active' from all articles */

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active')
  }

  /* get 'href' attribute from the clicked link */

  /* find the correct article using the selector (value of 'href' attribute) */

  /* add class 'active' to the correct article */
}

const links = document.querySelectorAll('.titles a');

for (let link of links) {
  link.addEventListener('click', titleClickHandler);
}
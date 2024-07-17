'use strict';

function titleClickHandler(event) {
  event.preventDefault();

  /* [DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */

  this.classList.add('active');

  /* [DONE] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.posts .post.active');

  for (let article of activeArticles) {
    article.classList.remove('active');
  }

  /*[DONE] get 'href' attribute from the clicked link */

  const linkHref = this.getAttribute('href').replace('#', '');

  /* find the correct article using the selector (value of 'href' attribute) */

  const articles = document.querySelectorAll('.posts .post');


  for (let article of articles) {

    const articleId = article.getAttribute('id')

    /* add class 'active' to the correct article */

    if (linkHref === articleId) {
      article.classList.add('active');
    }
  }

}

const links = document.querySelectorAll('.titles a');

for (let link of links) {
  link.addEventListener('click', titleClickHandler);
}
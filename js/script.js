'use strict';

const articles = document.querySelectorAll('.posts .post');

function titleClickHandler(event) {
  event.preventDefault();

  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  this.classList.add('active');

  const activeArticles = document.querySelectorAll('.posts .post.active');

  for (let article of activeArticles) {
    article.classList.remove('active');
  }

  const linkHref = this.getAttribute('href').replace('#', '');

  for (let article of articles) {
    const articleId = article.getAttribute('id');
    if (linkHref === articleId) {
      article.classList.add('active');
    }
  }

}

function clearMessage() {
  document.querySelector('.sidebar .list').innerHTML = '';
}

function generateTitleLinks() {

  const titleList = document.querySelector('.sidebar .list');

  for (let article of articles) {

    const articleId = article.getAttribute('id');
    const articleTitle = article.querySelector('.post-title').innerHTML;
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    titleList.innerHTML = titleList.innerHTML + linkHTML;
  }

  const links = document.querySelectorAll('.titles a');
  console.log(links);

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

clearMessage();
generateTitleLinks();
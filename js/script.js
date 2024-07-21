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

function generateTitleLinks(customSelector = '') {

  const articles = document.querySelectorAll('.posts .post' + customSelector);
  const titleList = document.querySelector('.sidebar .list');

  for (let article of articles) {

    const articleId = article.getAttribute('id');
    const articleTitle = article.querySelector('.post-title').innerHTML;
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    titleList.innerHTML = titleList.innerHTML + linkHTML;
  }

  const links = document.querySelectorAll('.titles a');

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}


function generateTags() {

  for (let article of articles) {

    const tagsWrapper = article.querySelector('.list.list-horizontal');
    let html = '';
    const articleDataTag = article.getAttribute('data-tags');
    const dataTagsArray = articleDataTag.split(' ');

    for (let tag of dataTagsArray) {
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li> ';
      html = html + linkHTML;
    }

    tagsWrapper.innerHTML = html;
  }
}

function tagClickHandler(event) {
  event.preventDefault();

  const clickedElement = this;
  const hrefClickedElement = clickedElement.getAttribute('href');
  const href = hrefClickedElement;
  const activeTags = document.querySelectorAll('a.active[href ^= "#tag-"]');

  for (let activeTag of activeTags) {
    activeTag.classList.remove('active');
  }

  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');

  for (let tagLink of tagLinks) {
    tagLink.classList.add('active');
  }

  generateTitleLinks('[data-tags~="' + href + '"]');
}

function addClickListenersToTags() {

  const links = document.querySelectorAll('.list-horizontal a');

  for (let link of links) {
    link.addEventListener('click', tagClickHandler);
  }
}

clearMessage();
generateTags();
generateTitleLinks();
addClickListenersToTags();
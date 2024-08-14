'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  articleTagLink: Handlebars.compile(document.querySelector('#template-article-tag-link').innerHTML),
  articleAuthorLink: Handlebars.compile(document.querySelector('#template-article-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML),
}

let articles = document.querySelectorAll('.posts .post');

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

  clearMessage();

  let articles = document.querySelectorAll('.posts .post' + customSelector);
  const titleList = document.querySelector('.sidebar .list');

  for (let article of articles) {

    const articleId = article.getAttribute('id');
    const articleTitle = article.querySelector('.post-title').innerHTML;
    const linkHTMLData = { id: articleId, title: articleTitle };
    const linkHTML = templates.articleLink(linkHTMLData);
    titleList.innerHTML = titleList.innerHTML + linkHTML;
  }

  const links = document.querySelectorAll('.titles a');

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

function calculateTagsParams(tags) {
  const params = {
    'max': 0,
    'min': 999999,
  }

  for (let tag in tags) {
    if (tags[tag] > params.max) {
      params.max = tags[tag];
    }
    if (tags[tag] < params.min) {
      params.min = tags[tag];
    }
  }

  return params;
}

function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (5 - 1) + 1);

  return 'tag-size-' + classNumber;
}

function generateTags() {
  let allTags = {};

  for (let article of articles) {

    const tagsWrapper = article.querySelector('.list.list-horizontal');
    let html = '';
    const articleDataTag = article.getAttribute('data-tags');
    const dataTagsArray = articleDataTag.split(' ');

    for (let tag of dataTagsArray) {
      const linkHTMLData = { id: tag };
      const linkHTML = templates.articleTagLink(linkHTMLData);
      html = html + linkHTML;

      if (!allTags.hasOwnProperty(tag)) {
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    }

    tagsWrapper.innerHTML = html;
  }
  const tagList = document.querySelector('.tags.list');
  const tagsParams = calculateTagsParams(allTags)
  const allTagsData = { tags: [] };

  for (let tag in allTags) {
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });

  }

  tagList.innerHTML = templates.tagCloudLink(allTagsData);
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

  const tag = href.replace('#tag-', '');

  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {

  const links = document.querySelectorAll('.list-horizontal a');

  for (let link of links) {
    link.addEventListener('click', tagClickHandler);
  }
}

function generateAuthors() {
  let allAuthors = {};

  for (let article of articles) {
    const authorsWrapper = article.querySelector('.post-author');
    let html = '';

    const authorsDataTags = article.getAttribute('data-authors');
    const linkHTMLData = { id: authorsDataTags, author: authorsDataTags };
    const linkHtml = templates.articleAuthorLink(linkHTMLData);

    html = html + linkHtml;
    authorsWrapper.innerHTML = html;

    if (!allAuthors.hasOwnProperty(authorsDataTags)) {
      allAuthors[authorsDataTags] = 1;
    } else {
      allAuthors[authorsDataTags]++;
    }
  }

  const authorList = document.querySelector('.authors.list');
  const allAuthorsData = { authors: [] };


  for (let authorName in allAuthors) {
    allAuthorsData.authors.push({
      author: authorName,
    });
  }

  authorList.innerHTML = templates.authorCloudLink(allAuthorsData);
}

function authorClickhandler() {
  event.preventDefault();
  const clickedElement = this;
  const clickedAuthorHref = clickedElement.getAttribute('href').replace('#', '');
  const activeAuthors = document.querySelectorAll('.post-autor a.active');

  for (let activeAuthor of activeAuthors) {
    activeAuthor.classList.remove('active');
  }

  const authors = document.querySelectorAll('.post-author a')

  for (let author of authors) {
    author.classList.add('active');
  }

  generateTitleLinks('[data-authors ="' + clickedAuthorHref + '"]');

}

function addClickListenersToAuthors() {
  const authors = document.querySelectorAll('.post-author a');

  for (let auhtor of authors) {
    auhtor.addEventListener('click', authorClickhandler);
  }
}

generateTags();
generateTitleLinks();
addClickListenersToTags();
generateAuthors();
addClickListenersToAuthors();
function getArticleSummary() {

  var z, i, elmnt, file, xhttp;
  /*loop through a collection of all HTML elements:*/
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("get-article-summary");
    if (file) {
      /*make an HTTP request using the attribute value as the file name:*/
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {elmnt.innerHTML = this.responseText;}
          if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
          /*remove the attribute, and call this function once more:*/
          elmnt.removeAttribute("get-article-summary");
          getArticleSummary();
        }
      }      
      xhttp.open("GET", file, true);
      xhttp.send();
      return;
    }
  }
};


function loadArticle(articlePath, callback){

  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  let sections = select('section', true)
  let section = select('#articles')
  sections.forEach((item) => {
    item.classList.remove('section-show');
  })
  section.classList.add('section-show');

  articleDiv = document.getElementById("get-article")
  if (articleDiv) {
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status == 200) {articleDiv.innerHTML = this.responseText;}
        if (this.status == 404) {articleDiv.innerHTML = "Page not found.";}
      }
    }
    xhttp.open("GET", articlePath, false);
    xhttp.send()
    Prism.highlightAll();    
    return;
  }


};
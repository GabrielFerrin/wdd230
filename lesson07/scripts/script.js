const imagesToLoad = document.querySelectorAll('[actual-url]');

const imgOptions = {
  threshold: 1,
  rootMargin: "0px 0px 50px 0px"
};

const loadImages = (image) => {
  image.setAttribute('src', image.getAttribute('actual-url'));
  image.onload = () => { image.removeAttribute('actual-url'); };
}

if ("IntersectionObserver" in window) {
  const imgObserver = new IntersectionObserver((items, observer) => {
    items.forEach((item) => {
      if (item.isIntersecting) {
        loadImages(item.target);
        observer.unobserve(item.target);
      }
    });
  }, imgOptions);

  imagesToLoad.forEach((img) => {
    imgObserver.observe(img);
  });
} else {
  console.log("Hello")

  imagesToLoad.forEach((img) => {
    loadImages(img);
  })
}
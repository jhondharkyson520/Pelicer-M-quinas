const addProductToDOM = (product, index) => {
  const productsSection = document.querySelector('.products');
  const productsDiv = document.createElement('div');
  productsDiv.classList.add('product');
  productsDiv.setAttribute('data-aos', 'fade-up');
  productsDiv.setAttribute('data-aos-delay', '150');

  const carouselDiv = document.createElement('div');
  carouselDiv.classList.add('carousel');
  carouselDiv.id = `carousel-${index}`;

  const carouselInnerDiv = document.createElement('div');
  carouselInnerDiv.classList.add('carousel-inner');
  carouselDiv.appendChild(carouselInnerDiv);

  product.media.forEach((media, mediaIndex) => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('carousel-item');
    if (mediaIndex === 0) itemDiv.classList.add('active');

    if (media.type === 'image') {
      const img = document.createElement('img');
      img.src = media.src;
      img.alt = product.title;
      itemDiv.appendChild(img);
    } else if (media.type === 'video') {
      const video = document.createElement('video');
      video.controls = true;
      video.autoplay = true;

      const source = document.createElement('source');
      source.src = media.src;
      source.type = 'video/mp4';

      video.appendChild(source);
      itemDiv.appendChild(video);

      video.addEventListener('play', () => stopCarousel(carouselInnerDiv));
      video.addEventListener('ended', () => moveSlide(carouselInnerDiv, 1));
    }

    carouselInnerDiv.appendChild(itemDiv);
  });

  const prevButton = document.createElement('button');
  prevButton.classList.add('carousel-control', 'prev');
  prevButton.innerHTML = '&#10094;';
  prevButton.onclick = () => {
    stopCarousel(carouselInnerDiv);
    moveSlide(carouselInnerDiv, -1);
  };

  const nextButton = document.createElement('button');
  nextButton.classList.add('carousel-control', 'next');
  nextButton.innerHTML = '&#10095;';
  nextButton.onclick = () => {
    stopCarousel(carouselInnerDiv);
    moveSlide(carouselInnerDiv, 1);
  };

  carouselDiv.appendChild(prevButton);
  carouselDiv.appendChild(nextButton);
  productsDiv.appendChild(carouselDiv);

  const productInfoDiv = document.createElement('div');
  productInfoDiv.classList.add('product-info');

  const strong = document.createElement('strong');
  strong.textContent = product.title;
  productInfoDiv.appendChild(strong);

  const p = document.createElement('p');
  p.textContent = product.description;
  productInfoDiv.appendChild(p);

  const button = document.createElement('button');
  button.textContent = 'Saiba mais';
  button.addEventListener('click', () => handleContato(product.title));
  productInfoDiv.appendChild(button);

  productsDiv.appendChild(productInfoDiv);
  productsSection.appendChild(productsDiv);

  carouselDiv.addEventListener('mouseenter', () => stopCarousel(carouselInnerDiv));
  carouselDiv.addEventListener('mouseleave', () => {
    const activeItem = carouselInnerDiv.querySelector('.carousel-item.active');
    const video = activeItem.querySelector('video');
    if (!video || video.paused) {
      startCarousel(carouselInnerDiv);
    }
  });
  carouselDiv.addEventListener('click', () => stopCarousel(carouselInnerDiv));

  startCarousel(carouselInnerDiv);
};

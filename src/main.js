import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.css';

import { searchImages } from './js/api-service';

const refs = {
  header: document.querySelector('.header'),
  nav: document.querySelector('.nav-list'),
  form: document.querySelector('#search-form'),
  btnSearch: document.querySelector('#search-form button[type=submit]'),
  searchInput: document.querySelector('#search-form input[name=searchQuery]'),
  gallery: document.querySelector('.gallery'),
  btnLoadMore: document.querySelector('.load-more'),
  loadMoreObserve: document.querySelector('.load-more-observe'),
};

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && store.load_type === 'infinit_scroll') {
        loadData();
      }
    });
  },
  {
    root: null,
    rootMargin: '300px',
  }
);

const store = new Proxy(
  {
    query: '',
    page: 0,
    per_page: 40,
    is_loadable: false,
    load_type: null, // loadmore, infinite scroll
  },
  {
    set(target, property, value) {
      const is_loadable =
        property === 'is_loadable' ? value : target.is_loadable;
      const load_type = property === 'load_type' ? value : target.load_type;

      if (property === 'load_type') {
        localStorage.setItem('load_type', load_type);

        Array.from(refs.nav.querySelectorAll('.nav-link')).forEach(link => {
          const { type } = link.dataset;
          if (type === load_type) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }

      if (load_type === 'loadmore' && is_loadable) {
        refs.btnLoadMore.classList.remove('hidden');
        observer.unobserve(refs.loadMoreObserve);
      } else if (load_type === 'infinit_scroll' && is_loadable) {
        refs.btnLoadMore.classList.add('hidden');
        observer.observe(refs.loadMoreObserve);
      } else {
        refs.btnLoadMore.classList.add('hidden');
        observer.unobserve(refs.loadMoreObserve);
      }

      target[property] = value;
      return true;
    },
  }
);

store.load_type = localStorage.getItem('load_type') ?? 'loadmore';

const lightboxInstance = new SimpleLightbox(`.gallery .photo-link`, {});

const enableBtnLoading = btnRef => {
  btnRef.classList.add('loading');
  btnRef.setAttribute('disabled', true);
};

const disableBtnLoading = btnRef => {
  btnRef.classList.remove('loading');
  btnRef.removeAttribute('disabled');
};

const scrollToElementWithOffset = id => {
  setTimeout(() => {
    const headerHeight = refs.header.offsetHeight;
    const gap = parseInt(window.getComputedStyle(refs.gallery).gap);
    const cardRef = refs.gallery.querySelector(`.photo-card[data-id="${id}"]`);
    const cardPosition = cardRef.getBoundingClientRect().top;
    const offsetPosition = cardPosition - headerHeight - gap - gap / 2;

    window.scrollBy({
      top: offsetPosition,
      behavior: 'smooth',
    });
  }, 500);
};

const galleryItemMarkup = ({
  id,
  largeImageURL: original,
  webformatURL: thumb,
  tags: title,
  likes,
  views,
  comments,
  downloads,
}) => {
  return `
  <div class="photo-card" data-id="${id}">
    <a class="photo-link" href="${original}" >
      <img src="${thumb}" alt="${title}" title="${title}" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>Likes</b>
          ${likes}
        </p>
        <p class="info-item">
          <b>Views</b>
          ${views}
        </p>
        <p class="info-item">
          <b>Comments</b>
          ${comments}
        </p>
        <p class="info-item">
          <b>Downloads</b>
          ${downloads}
        </p>
      </div>
    </a>
  </div>`;
};

const loadData = () => {
  store.page++;
  const { page, per_page, query } = store;

  return searchImages({
    query,
    page,
    per_page,
  })
    .then(data => {
      if (data.hits?.length === 0) {
        throw new Error(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }

      if (page === 1) {
        iziToast.success({
          position: 'topRight',
          message: `Hooray! We found ${data.totalHits} images.`,
        });
      }

      const itemsMarkup = data.hits
        .map(item => galleryItemMarkup(item))
        .join('');

      refs.gallery.insertAdjacentHTML('beforeend', itemsMarkup);

      store.is_loadable = store.page * store.per_page < data.totalHits;
      lightboxInstance.refresh();
      return data;
    })
    .catch(error => {
      console.error(error);
      iziToast.error({
        position: 'topRight',
        message: error.message,
      });
    })
    .finally(() => {
      disableBtnLoading(refs.btnSearch);
      disableBtnLoading(refs.btnLoadMore);
    });
};

refs.searchInput.addEventListener('input', function () {
  if (this.value?.length) {
    refs.btnSearch.removeAttribute('disabled');
  } else {
    refs.btnSearch.setAttribute('disabled', true);
  }
});

refs.form.addEventListener('submit', evt => {
  evt.preventDefault();
  refs.gallery.innerHTML = '';
  enableBtnLoading(refs.btnSearch);
  refs.btnLoadMore.classList.add('hidden');

  store.page = 0;
  store.query = refs.searchInput.value;
  store.is_loadable = false;

  loadData();
});

refs.btnLoadMore.addEventListener('click', async () => {
  enableBtnLoading(refs.btnLoadMore);
  const result = await loadData();
  scrollToElementWithOffset(result.hits[0]?.id);
});

refs.nav.addEventListener('click', evt => {
  evt.preventDefault();
  const { currentTarget, target } = evt;
  if (currentTarget === target) {
    return;
  }

  store.load_type = target.dataset.type;
});

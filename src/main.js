import './style.css';
import { marked } from 'marked';

document.querySelector('#year').textContent = new Date().getFullYear();

const files = import.meta.glob('../posts/*.md', { query: '?raw', import: 'default', eager: true });
const escapeHtml = (value) => value.replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
const posts = Object.entries(files).map(([path, raw]) => {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) throw new Error(`Thiếu phần đầu bài viết: ${path}`);
  const metadata = Object.fromEntries(match[1].split(/\r?\n/).map((line) => {
    const colon = line.indexOf(':');
    return [line.slice(0, colon).trim(), line.slice(colon + 1).trim().replace(/^(["'])(.*)\1$/, '$2')];
  }));
  if (!metadata.title || !metadata.excerpt || !/^\d{4}-\d{2}-\d{2}$/.test(metadata.date)) {
    throw new Error(`Phần đầu cần title, date (YYYY-MM-DD), excerpt: ${path}`);
  }
  return { ...metadata, slug: path.split('/').pop().replace(/\.md$/, ''), body: match[2] };
}).sort((a, b) => b.date.localeCompare(a.date));

const formatDate = (date) => new Intl.DateTimeFormat('vi-VN', {
  day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'UTC',
}).format(new Date(`${date}T00:00:00Z`));

const main = document.querySelector('main');
const home = document.createElement('div');
while (main.firstChild) home.append(main.firstChild);
home.querySelector('.post-grid').innerHTML = posts.map((post) => `
  <article class="post-card">
    <div class="post-top"><span class="tag">Học AI</span><time datetime="${post.date}">${formatDate(post.date)}</time></div>
    <h3><a href="#/bai/${encodeURIComponent(post.slug)}">${escapeHtml(post.title)}</a></h3>
    <p>${escapeHtml(post.excerpt)}</p>
    <a class="post-bottom" href="#/bai/${encodeURIComponent(post.slug)}" aria-label="Đọc bài: ${escapeHtml(post.title)}">Đọc bài viết <span aria-hidden="true">→</span></a>
  </article>`).join('');

function render() {
  const hash = window.location.hash;
  if (!hash.startsWith('#/')) {
    main.replaceChildren(home);
    document.title = 'Góc nhỏ của mình';
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
    return;
  }
  const route = hash.match(/^#\/bai\/([^/]+)$/);
  let slug;
  try { slug = route && decodeURIComponent(route[1]); } catch { slug = null; }
  const post = posts.find((item) => item.slug === slug);
  const article = document.createElement('article');
  article.className = 'article-page';
  article.innerHTML = `<a class="read-link" href="#bai-viet">← Quay lại danh sách bài viết</a>`;
  if (post) {
    article.innerHTML += `<header><p class="eyebrow">HỌC AI CHO NGƯỜI MỚI</p><h1 tabindex="-1">${escapeHtml(post.title)}</h1><time datetime="${post.date}">${formatDate(post.date)}</time><p class="intro">${escapeHtml(post.excerpt)}</p></header><div class="article-content">${marked.parse(post.body)}</div>`;
  } else {
    article.innerHTML += '<h1 tabindex="-1">Không tìm thấy bài viết</h1><p>Bài viết này chưa có trong góc nhỏ. Bạn hãy quay lại để đọc những bài khác nhé.</p>';
  }
  main.replaceChildren(article);
  document.title = `${post?.title ?? 'Không tìm thấy bài viết'} | Góc nhỏ của mình`;
  window.scrollTo(0, 0);
  article.querySelector('h1').focus({ preventScroll: true });
}

window.addEventListener('hashchange', render);
render();

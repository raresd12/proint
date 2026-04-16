/**
 * =============================================
 *  BLOG SYSTEM — blog - Copy.js
 *  Vanilla JS blog using localStorage only.
 *  Shared by about - Copy.html and blog - Copy.html
 * =============================================
 */

/**
 * i18n helper — get translated text if lang system is loaded.
 */
function t(key, fallback) {
  if (typeof translations !== 'undefined' && typeof getCurrentLang === 'function') {
    const lang = getCurrentLang();
    if (translations[lang] && translations[lang][key] !== undefined) {
      return translations[lang][key];
    }
  }
  return fallback;
}

/**
 * showConfirmModal — Show a custom styled confirm dialog.
 * @param {string} title — Modal title text
 * @param {string} message — Modal body text
 * @param {Function} onConfirm — Callback if user confirms
 */
function showConfirmModal(title, message, onConfirm) {
  const overlay = document.getElementById('custom-modal-overlay');
  const titleEl = document.getElementById('custom-modal-title');
  const textEl = document.getElementById('custom-modal-text');
  const confirmBtn = document.getElementById('custom-modal-confirm');
  const cancelBtn = document.getElementById('custom-modal-cancel');

  if (!overlay) {
    // Fallback if modal HTML is missing
    if (confirm(message)) onConfirm();
    return;
  }

  titleEl.textContent = title;
  textEl.textContent = message;

  // Show
  overlay.classList.add('visible');

  // Clean up previous listeners
  const newConfirm = confirmBtn.cloneNode(true);
  const newCancel = cancelBtn.cloneNode(true);
  confirmBtn.parentNode.replaceChild(newConfirm, confirmBtn);
  cancelBtn.parentNode.replaceChild(newCancel, cancelBtn);

  // Re-apply translations on cloned buttons
  if (typeof applyLanguage === 'function') {
    applyLanguage(typeof getCurrentLang === 'function' ? getCurrentLang() : 'en');
  }

  function closeModal() {
    overlay.classList.remove('visible');
  }

  newConfirm.addEventListener('click', () => {
    closeModal();
    onConfirm();
  });

  newCancel.addEventListener('click', closeModal);

  // Close on overlay click (outside modal)
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  }, { once: true });

  // Close on Escape key
  const escHandler = (e) => {
    if (e.key === 'Escape') {
      closeModal();
      document.removeEventListener('keydown', escHandler);
    }
  };
  document.addEventListener('keydown', escHandler);
}

/* ---- Constants ---- */
const BLOG_STORAGE_KEY = 'userBlogPosts';

/* =============================================
 *  CORE DATA FUNCTIONS
 * ============================================= */

/**
 * getBlogs — Retrieve all blog posts from localStorage.
 * Returns an array of blog objects sorted newest-first.
 */
function getBlogs() {
  try {
    const data = JSON.parse(localStorage.getItem(BLOG_STORAGE_KEY));
    if (Array.isArray(data)) {
      // Sort newest first
      return data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
  } catch (e) {
    // Corrupted data — reset
    console.warn('Blog data corrupted, resetting.');
  }
  return [];
}

/**
 * saveBlogs — Persist an array of blog objects to localStorage.
 */
function saveBlogs(blogs) {
  localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(blogs));
}

/**
 * generateId — Create a simple unique ID using timestamp + random string.
 */
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
}

/**
 * createBlog — Validate and create a new blog post.
 * Returns { success, blog?, error? }
 */
function createBlog(title, content, topic) {
  const trimmedTitle = title.trim();
  const trimmedContent = content.trim();
  const trimmedTopic = (topic || '').trim();

  // Validate inputs
  if (!trimmedTitle) {
    return { success: false, error: 'Title is required.' };
  }
  if (!trimmedTopic) {
    return { success: false, error: 'Please select a topic.' };
  }
  if (!trimmedContent) {
    return { success: false, error: 'Content is required.' };
  }
  if (trimmedTitle.length > 120) {
    return { success: false, error: 'Title must be 120 characters or less.' };
  }

  // Check for duplicate title (case-insensitive)
  const blogs = getBlogs();
  const titleLower = trimmedTitle.toLowerCase();
  const duplicate = blogs.find((b) => b.title.toLowerCase() === titleLower);
  if (duplicate) {
    return { success: false, error: 'A blog post with this title already exists. Choose a different title.' };
  }

  // Create the new blog object
  const newBlog = {
    id: generateId(),
    title: trimmedTitle,
    topic: trimmedTopic,
    content: trimmedContent,
    createdAt: new Date().toISOString()
  };

  // Save
  blogs.push(newBlog);
  saveBlogs(blogs);

  return { success: true, blog: newBlog };
}

/**
 * deleteBlog — Remove a blog by ID.
 * Returns true if deleted, false if not found.
 */
function deleteBlog(id) {
  let blogs = getBlogs();
  const before = blogs.length;
  blogs = blogs.filter((b) => b.id !== id);
  if (blogs.length < before) {
    saveBlogs(blogs);
    return true;
  }
  return false;
}

/**
 * getBlogById — Find a single blog by its ID.
 */
function getBlogById(id) {
  return getBlogs().find((b) => b.id === id) || null;
}

/**
 * formatDate — Turn an ISO date string into a readable format.
 */
function formatDate(isoString) {
  const date = new Date(isoString);
  const locale = (typeof getCurrentLang === 'function' && getCurrentLang() === 'ro') ? 'ro-RO' : 'en-US';
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

/**
 * escapeHtml — Prevent XSS by escaping HTML entities in user content.
 */
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * getTopicBadgeClass — Return a CSS class based on the topic for colored badges.
 */
function getTopicBadgeClass(topic) {
  switch (topic) {
    case 'Stephen Curry': return 'badge-curry';
    case 'LeBron James': return 'badge-lebron';
    case 'Victor Wembanyama': return 'badge-wemby';
    case 'Joel Embiid': return 'badge-embiid';
    case 'The Team': return 'badge-team';
    default: return 'badge-team';
  }
}

/* =============================================
 *  ABOUT PAGE — BLOG LIST & FORM
 *  Only runs if the blog-create-form exists.
 * ============================================= */

/**
 * renderBlogs — Render all blog cards into #blog-list.
 * Accepts an optional filter string for search.
 */
function renderBlogs(filter) {
  const container = document.getElementById('blog-list');
  const countBadge = document.getElementById('blog-count');
  if (!container) return;

  let blogs = getBlogs();

  // Apply search filter (case-insensitive, matches title)
  if (filter && filter.trim()) {
    const q = filter.trim().toLowerCase();
    blogs = blogs.filter((b) => b.title.toLowerCase().includes(q));
  }

  // Update count badge
  if (countBadge) {
    countBadge.textContent = blogs.length;
  }

  // Empty state
  if (blogs.length === 0) {
    container.innerHTML = `
      <div class="blog-empty-state">
        <i class="bi bi-journal-x"></i>
        <p>${filter ? t('blog.no_match', 'No posts match your search.') : t('blog.no_posts', 'No blog posts yet. Create the first one!')}</p>
      </div>
    `;
    return;
  }

  // Build cards HTML
  container.innerHTML = blogs.map((blog) => `
    <article class="user-blog-card" data-blog-id="${escapeHtml(blog.id)}">
      <div class="d-flex align-items-center gap-2 mb-2">
        <span class="blog-topic-badge ${getTopicBadgeClass(blog.topic)}">${escapeHtml(blog.topic || 'General')}</span>
      </div>
      <h4 class="user-blog-title">${escapeHtml(blog.title)}</h4>
      <div class="user-blog-date">
        <i class="bi bi-calendar3"></i>
        <span>${formatDate(blog.createdAt)}</span>
      </div>
      <p class="user-blog-preview">${escapeHtml(blog.content)}</p>
      <div class="d-flex gap-2 align-items-center">
        <a href="blog - Copy.html?id=${encodeURIComponent(blog.id)}" class="btn btn-primary btn-sm user-blog-read-btn">
          ${t('blog.read_more', 'Read More')} <i class="bi bi-arrow-right ms-1"></i>
        </a>
        <button class="user-blog-delete-btn" data-delete-id="${escapeHtml(blog.id)}" title="Delete this post">
          <i class="bi bi-trash3 me-1"></i>${t('blog.delete', 'Delete')}
        </button>
      </div>
    </article>
  `).join('');

  // Attach delete handlers
  container.querySelectorAll('.user-blog-delete-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const id = btn.getAttribute('data-delete-id');
      showConfirmModal(
        t('blog.confirm_title', 'Delete this post?'),
        t('blog.confirm_delete', 'Are you sure you want to delete this post? This action cannot be undone.'),
        () => {
          deleteBlog(id);
          renderBlogs(document.getElementById('blog-search')?.value || '');
        }
      );
    });
  });
}

/* ---- Initialize About page blog system ---- */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('blog-create-form');
  const searchInput = document.getElementById('blog-search');
  const errorEl = document.getElementById('blog-form-error');
  const successEl = document.getElementById('blog-form-success');

  // Only run on the About page (where the form exists)
  if (!form) return;

  // Initial render of blog list
  renderBlogs();

  // Handle form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Hide previous messages
    if (errorEl) { errorEl.classList.remove('visible'); errorEl.textContent = ''; }
    if (successEl) { successEl.classList.remove('visible'); successEl.textContent = ''; }

    const titleInput = document.getElementById('blog-title');
    const topicInput = document.getElementById('blog-topic');
    const contentInput = document.getElementById('blog-content');

    const result = createBlog(titleInput.value, contentInput.value, topicInput.value);

    if (!result.success) {
      // Show error
      if (errorEl) {
        errorEl.textContent = result.error;
        errorEl.classList.add('visible');
      }
      return;
    }

    // Show brief success message, then redirect to the new blog
    if (successEl) {
      successEl.textContent = 'Post created! Redirecting...';
      successEl.classList.add('visible');
    }

    // Clear form
    form.reset();

    // Redirect to the blog detail page after a short delay
    setTimeout(() => {
      window.location.href = 'blog - Copy.html?id=' + encodeURIComponent(result.blog.id);
    }, 600);
  });

  // Live search filtering
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      renderBlogs(searchInput.value);
    });
  }
});

/* =============================================
 *  BLOG DETAIL PAGE
 *  Reads the blog ID from the URL query string
 *  and renders the full blog content.
 * ============================================= */

/**
 * loadBlogFromUrl — Read ?id= from the URL, find the blog, and render it.
 * Called from blog - Copy.html.
 */
function loadBlogFromUrl() {
  const container = document.getElementById('blog-detail-container');
  if (!container) return;

  // Get the blog ID from the URL query string
  const params = new URLSearchParams(window.location.search);
  const blogId = params.get('id');

  // If no ID provided, show not-found
  if (!blogId) {
    showBlogNotFound(container);
    return;
  }

  // Find the blog
  const blog = getBlogById(blogId);

  if (!blog) {
    showBlogNotFound(container);
    return;
  }

  // Update page title
  document.title = blog.title + ' - Proint MLD Blog';

  // Render the blog detail
  container.innerHTML = `
    <a href="about - Copy.html#blog-system" class="blog-detail-back">
      <i class="bi bi-arrow-left"></i> ${t('blog.back', 'Back to Blog')}
    </a>
    <div class="blog-detail-card">
      <span class="blog-topic-badge ${getTopicBadgeClass(blog.topic)} mb-3" style="display:inline-block;">${escapeHtml(blog.topic || 'General')}</span>
      <h1 class="blog-detail-title">${escapeHtml(blog.title)}</h1>
      <div class="blog-detail-date">
        <i class="bi bi-calendar3"></i>
        <span>${formatDate(blog.createdAt)}</span>
      </div>
      <div class="blog-detail-content">${escapeHtml(blog.content)}</div>
    </div>
  `;
}

/**
 * showBlogNotFound — Render the "not found" message.
 */
function showBlogNotFound(container) {
  document.title = t('blog.not_found_title', 'Blog Not Found') + ' - Proint MLD';

  container.innerHTML = `
    <div class="blog-not-found">
      <i class="bi bi-exclamation-triangle"></i>
      <h2 class="fw-bold">${t('blog.not_found_title', 'Blog Not Found')}</h2>
      <p>${t('blog.not_found_text', "The blog post you're looking for doesn't exist or has been deleted.")}</p>
      <a href="about - Copy.html#blog-system" class="btn btn-primary">
        <i class="bi bi-arrow-left me-1"></i> ${t('blog.back', 'Back to Blog')}
      </a>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const modal = document.getElementById('giftModal');
  const closeBtn = document.querySelector('.close-btn');
  const giftCards = document.querySelectorAll('.gift-card');
  const getStartedBtn = document.querySelector('.hero-btn');
  const giftForm = document.getElementById('giftForm');
  const toast = document.getElementById('toast');

  // LocalStorage Key
  const STORAGE_KEY = 'giftLove_sent_cards';

  // --- Modal Logic ---

  function openModal(cardTitle = "Gift Card") {
    // Set title in modal if specific card clicked
    const modalTitle = document.getElementById('modalTitle');
    if (modalTitle) {
        modalTitle.innerText = `Personalize: ${cardTitle}`;
    }

    modal.classList.add('show');
    // Focus on first input
    setTimeout(() => document.getElementById('recipientName').focus(), 100);
  }

  function closeModal() {
    modal.classList.remove('show');
  }

  // Event Listeners for Opening Modal
  if (getStartedBtn) {
    getStartedBtn.addEventListener('click', () => openModal("General Gift"));
  }

  giftCards.forEach(card => {
    card.addEventListener('click', function() {
      const title = this.querySelector('h4').innerText;
      openModal(title);
    });
  });

  // Event Listeners for Closing Modal
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // --- Form Submission & LocalStorage ---

  if (giftForm) {
    giftForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Gather data
      const recipient = document.getElementById('recipientName').value;
      const message = document.getElementById('message').value;
      const title = document.getElementById('modalTitle').innerText.replace('Personalize: ', '');
      const date = new Date().toLocaleString();

      const giftData = {
        id: Date.now(),
        recipient,
        message,
        cardTitle: title,
        date
      };

      // Save to LocalStorage
      saveGift(giftData);

      // UI Feedback
      closeModal();
      giftForm.reset();
      showToast();
    });
  }

  function saveGift(data) {
    let gifts = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    gifts.push(data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gifts));
    console.log('Gift saved:', data);
  }

  // --- Toast Notification ---

  function showToast() {
    toast.classList.add('show');

    // Hide after 3 seconds
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
});

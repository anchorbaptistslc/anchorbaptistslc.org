---
layout: single
title: Spring Revival
description: Anchor Baptist Church Spring Revival
featured_image: /images/uploads/anchor-friend-day-2025-03-3093.jpeg
tagline: April 26-29, 2026
content_images:
  - image: /images/uploads/nice-work-2.png
    alt_text: Spring Revival
menu:
  main:
    parent: ministries
    name: Spring Revival
---
Join us for this exciting week of revival preaching, Spirit-filled singing, and encouraging fellowship!

Registration is FREE.

Senior pastors who pre-register receive a free hotel night.

## Event Registration

<div class="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
  <form action="https://formspree.io/f/xqabgyae" method="POST" id="registrationForm" class="space-y-6">
    <div>
      <label for="title" class="block text-sm font-medium text-gray-700 mb-2">Title:</label>
      <select id="title" name="Title" required class="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-link focus:border-brand-link">
        <option value="">Select Title</option>
        <option>Pastor</option>
        <option>Assistant Pastor</option>
        <option>Mr</option>
        <option>Mrs</option>
      </select>
    </div>
    <div>
      <label for="name" class="block text-sm font-medium text-gray-700 mb-2">Full Name:</label>
      <input type="text" id="name" name="Full Name" required class="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-link focus:border-brand-link" />
    </div>
    <div>
      <label for="address" class="block text-sm font-medium text-gray-700 mb-2">Mailing Address:</label>
      <textarea id="address" name="Address" rows="2" required class="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-link focus:border-brand-link"></textarea>
    </div>
    <div>
      <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email Address:</label>
      <input type="email" id="email" name="Email" required class="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-link focus:border-brand-link" />
    </div>
    <div>
      <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">Phone Number:</label>
      <input type="tel" id="phone" name="Phone Number" required class="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-link focus:border-brand-link" />
    </div>
    <div>
      <label for="homeChurch" class="block text-sm font-medium text-gray-700 mb-2">Home Church:</label>
      <input type="text" id="homeChurch" name="Home Church" required class="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-link focus:border-brand-link" />
    </div>
    <div class="mt-6">
      <label class="block text-sm font-medium text-gray-700 mb-2">Will you attend the Tuesday luncheon?</label>
      <div class="flex items-center gap-6">
        <label class="flex items-center">
          <input type="radio" name="Attending Tuesday Luncheon" value="Yes" required class="mr-2 text-brand-link focus:ring-brand-link" />
          <span class="text-sm text-gray-700">Yes</span>
        </label>
        <label class="flex items-center">
          <input type="radio" name="Attending Tuesday Luncheon" value="No" required class="mr-2 text-brand-link focus:ring-brand-link" />
          <span class="text-sm text-gray-700">No</span>
        </label>
      </div>
    </div>
    <div class="mt-6">
      <label class="block text-sm font-medium text-gray-700 mb-2">Are you requesting the free hotel?</label>
      <div class="flex items-center gap-6">
        <label class="flex items-center">
          <input type="radio" name="Requesting Free Hotel" value="Yes" required class="mr-2 text-brand-link focus:ring-brand-link" />
          <span class="text-sm text-gray-700">Yes</span>
        </label>
        <label class="flex items-center">
          <input type="radio" name="Requesting Free Hotel" value="No" required class="mr-2 text-brand-link focus:ring-brand-link" />
          <span class="text-sm text-gray-700">No</span>
        </label>
      </div>
    </div>
    <button type="submit" class="w-full mt-8 bg-brand-link hover:bg-brand-dark text-white font-semibold py-3 px-4 rounded-md shadow transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-link">Submit Registration</button>
  </form>
  <div class="hidden text-center text-green-600 font-semibold mt-6" id="successMessage">✅ Thank you for registering! We've received your submission.</div>
  <div class="hidden text-center mt-8" id="qrSection"><h3 class="text-lg font-medium text-gray-900 mb-4">📣 Share the Spring Revival!</h3><img id="qrImage" src="" alt="Spring Revival QR Code" class="mx-auto max-w-[200px] mb-4" /><p><a id="qrLink" href="#" target="_blank" class="text-brand-link hover:text-brand-dark underline">Visit the Spring Revival page</a></p></div>
</div>

<script>
  const form = document.getElementById('registrationForm');
  const successMessage = document.getElementById('successMessage');
  const qrSection = document.getElementById('qrSection');
  // Set QR code to current page URL
  const qrImage = document.getElementById('qrImage');
  if (qrImage) {
    const currentUrl = window.location.href;
    qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(currentUrl)}`;
  }
  // Set QR link to current page URL
  const qrLink = document.getElementById('qrLink');
  if (qrLink) {
    qrLink.href = window.location.href;
  }
  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    const formData = new FormData(form);
    fetch(form.action, {
      method: "POST",
      body: formData,
      headers: { 'Accept': 'application/json' }
    }).then(response => {
      if (response.ok) {
        form.reset();
        successMessage.classList.remove('hidden');
        qrSection.classList.remove('hidden');
      } else {
        alert('There was a problem submitting the form. Please try again.');
      }
    }).catch(error => {
      alert('Error submitting form. Please try again later.');
    });
  });
</script>
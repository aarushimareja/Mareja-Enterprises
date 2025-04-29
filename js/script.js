/**
 * Mareja Enterprises Website
 * Main JavaScript functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // ===== Mobile Menu Toggle =====
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Change icon based on menu state
            const icon = mobileMenuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // ===== Smooth Scrolling for Navigation Links =====
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = mobileMenuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
            
            const targetId = this.getAttribute('href');
            
            // Special case for '#' which points to the top
            if (targetId === '#') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('#header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                
                window.scrollTo({
                    top: targetPosition - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== Active Navigation Link on Scroll =====
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', function() {
        let currentSection = '';
        const headerHeight = document.querySelector('#header').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navItems.forEach(navItem => {
            navItem.classList.remove('active');
            if (navItem.getAttribute('href') === `#${currentSection}`) {
                navItem.classList.add('active');
            }
        });
    });
    
    // ===== Product Category Tabs =====
    const categoryButtons = document.querySelectorAll('.category-btn');
    const productCategories = document.querySelectorAll('.product-category');
    
    if (categoryButtons.length > 0) {
        categoryButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Hide all product categories
                productCategories.forEach(category => category.classList.remove('active'));
                
                // Show the selected product category
                const categoryId = this.getAttribute('data-category');
                document.getElementById(categoryId).classList.add('active');
            });
        });
    }
    
    // ===== Back to Top Button =====
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
    }
    
    // ===== Header Scroll Effect =====
    const header = document.querySelector('#header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 80) {
                header.style.boxShadow = 'var(--shadow-md)';
                header.style.height = '70px';
            } else {
                header.style.boxShadow = 'var(--shadow-sm)';
                header.style.height = '80px';
            }
        });
    }
    
    // ===== Contact Form Submission =====
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Simple form validation
            let isValid = true;
            const errors = [];
            
            if (formData.name.trim() === '') {
                isValid = false;
                errors.push('Name is required');
            }
            
            if (formData.email.trim() === '') {
                isValid = false;
                errors.push('Email is required');
            } else if (!isValidEmail(formData.email)) {
                isValid = false;
                errors.push('Please enter a valid email address');
            }
            
            if (formData.phone.trim() === '') {
                isValid = false;
                errors.push('Phone number is required');
            }
            
            if (formData.message.trim() === '') {
                isValid = false;
                errors.push('Message is required');
            }
            
            if (!isValid) {
                alert(errors.join('\n'));
                return;
            }
            
            // In a real application, you would send this data to a server
            // For this demo, we'll just show a success message
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }
    
    // Helper function to validate email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // ===== Gallery Image Popup =====
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            const title = this.querySelector('.gallery-info h3').textContent;
            const description = this.querySelector('.gallery-info p').textContent;
            
            // Create popup elements
            const popup = document.createElement('div');
            popup.className = 'gallery-popup';
            
            popup.innerHTML = `
                <div class="popup-content">
                    <span class="close-popup">&times;</span>
                    <img src="${imgSrc}" alt="${title}">
                    <div class="popup-info">
                        <h3>${title}</h3>
                        <p>${description}</p>
                    </div>
                </div>
            `;
            
            // Add popup to body
            document.body.appendChild(popup);
            
            // Add popup styles dynamically
            const style = document.createElement('style');
            style.textContent = `
                .gallery-popup {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.9);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1001;
                    padding: 2rem;
                }
                
                .popup-content {
                    max-width: 800px;
                    width: 90%;
                    background-color: white;
                    border-radius: var(--border-radius-md);
                    overflow: hidden;
                    position: relative;
                }
                
                .close-popup {
                    position: absolute;
                    top: 10px;
                    right: 15px;
                    font-size: 1.5rem;
                    color: white;
                    background-color: var(--primary-color);
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    z-index: 2;
                }
                
                .popup-content img {
                    width: 100%;
                }
                
                .popup-info {
                    padding: 1.5rem;
                }
                
                .popup-info h3 {
                    color: var(--primary-color);
                    margin-bottom: 0.5rem;
                }
            `;
            
            document.head.appendChild(style);
            
            // Close popup when clicking the close button
            const closeButton = popup.querySelector('.close-popup');
            closeButton.addEventListener('click', function() {
                document.body.removeChild(popup);
                document.head.removeChild(style);
            });
            
            // Close popup when clicking outside the content
            popup.addEventListener('click', function(e) {
                if (e.target === popup) {
                    document.body.removeChild(popup);
                    document.head.removeChild(style);
                }
            });
        });
    });
});

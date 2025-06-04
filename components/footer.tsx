export default function Footer() {
  return (
    <footer className="bg-amber-50 py-3 font-sans">
      <div className="container mx-auto flex flex-col items-center">
        {/* Title Row */}
        <div className="flex items-center justify-between w-full mb-2">
          <div className="flex items-center">
            <span className="text-gold-700 text-xl font-bold leading-tight tracking-tight font-noto">
              中國基督教播道會雅博堂
            </span>
          </div>
          <div className="flex space-x-3">
            <a
              href="https://www.facebook.com/share/1AhHkBYtqg/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gold-700"
              aria-label="Facebook page"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.99 3.656 9.128 8.437 9.878v-6.988h-2.54v-2.89h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.344 21.128 22 16.99 22 12z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/breezychurchhk?igsh=dGl5b2h5ZGEzaXZr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gold-700"
              aria-label="Instagram page"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.8.2 2.2.4.5.2.9.5 1.3.9.4.4.7.8.9 1.3.2.4.3 1 .4 2.2.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.2 1.8-.4 2.2-.2.5-.5.9-.9 1.3-.4.4-.8.7-1.3.9-.4.2-1 .3-2.2.4-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.8-.2-2.2-.4-.5-.2-.9-.5-1.3-.9-.4-.4-.7-.8-.9-1.3-.2-.4-.3-1-.4-2.2-.1-1.2-.1-1.6-.1-4.8s0-3.6.1-4.8c.1-1.2.2-1.8.4-2.2.2-.5.5-.9.9-1.3.4-.4.8-.7 1.3-.9.4-.2 1-.3 2.2-.4 1.2-.1 1.6-.1 4.8-.1zm0-2.2C8.7 0 8.2 0 7 .1c-1.3.1-2.2.3-3 .6-.8.3-1.5.7-2.2 1.4C1.1.7.7 1.4.4 2.2c-.3.8-.5 1.7-.6 3C0 8.2 0 8.7 0 12s0 3.8.1 5c.1 1.3.3 2.2.6 3 .3.8.7 1.5 1.4 2.2.7.7 1.4 1.1 2.2 1.4.8.3 1.7.5 3 .6 1.2.1 1.7.1 5 .1s3.8 0 5-.1c1.3-.1 2.2-.3 3-.6.8-.3 1.5-.7 2.2-1.4.7-.7 1.1-1.4 1.4-2.2.3-.8.5-1.7.6-3 .1-1.2.1-1.7.1-5s0-3.8-.1-5c-.1-1.3-.3-2.2-.6-3-.3-.8-.7-1.5-1.4-2.2-.7-.7-1.4-1.1-2.2-1.4-.8-.3-1.7-.5-3-.6-1.2-.1-1.7-.1-5-.1zm0 5.8a6.2 6.2 0 1 0 0 12.4 6.2 6.2 0 0 0 0-12.4zm0 10.2a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-10.6a1.4 1.4 0 1 0 0-2.8 1.4 1.4 0 0 0 0 2.8z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a
              href="https://www.youtube.com/@breezychurch"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gold-700"
              aria-label="YouTube channel"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M23.5 6.3c-.3-1.1-1.1-2-2.2-2.3C19.3 3.5 12 3.5 12 3.5s-7.3 0-9.3.5c-1.1.3-1.9 1.2-2.2 2.3C0 8.3 0 12 0 12s0 3.7.5 5.7c.3 1.1 1.1 2 2.2 2.3 2 .5 9.3.5 9.3.5s7.3 0 9.3-.5c1.1-.3 1.9-1.2 2.2-2.3.5-2 .5-5.7.5-5.7s0-3.7-.5-5.7zM9.7 15.7V8.3l6.2 3.7-6.2 3.7z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* Address Row */}
        <div className="flex items-center justify-center w-full mb-1 text-gold-700 text-base font-normal leading-relaxed tracking-wide font-noto">
          <svg
            className="w-4 h-4 mr-1.5"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" />
          </svg>
          <span>東涌馬灣新村28號地下及一樓</span>
        </div>

        {/* Contact Info Row */}
        <div className="flex flex-wrap items-center justify-center w-full mb-1 text-gray-800 text-sm font-normal leading-normal tracking-normal gap-4">
          <div className="flex items-center">
            <svg
              className="w-4 h-4 mr-1.5"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.12.35.03.74-.24 1.02l-2.2 2.2z" />
            </svg>
            <a href="tel:+85246120100" className="hover:underline">
              (852) 4612 0100
            </a>
          </div>
          <div className="flex items-center">
            <svg
              className="w-4 h-4 mr-1.5"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
            <a
              href="mailto:breezychurchhk@gmail.com"
              className="hover:underline"
            >
              breezychurchhk@gmail.com
            </a>
          </div>
          <div className="flex items-center">
            <svg
              className="w-4 h-4 mr-1.5"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 2v2h-2V4h2zm-4 0v6h-2V4h2zm-4 0v2h-2V4h2zm-4 0v6h-2V4h2zm-4 0v2h-2V4h2zm14 4v2h-2V8h2zm-4 0v6h-2V8h2zm-4 0v2h-2V8h2zm-4 0v6h-2V8h2zm-4 0v2h-2V8h2zm14 4v6h-2v-6h2zm-4 0v2h-2v-2h2zm-4 0v6h-2v-6h2zm-4 0v2h-2v-2h2zm-4 0v6h-2v-6h2z" />
            </svg>
            <a href="tel:+85246120100" className="hover:underline">
              (852) 4612 0100
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-xs text-gray-600 font-light leading-normal tracking-wide">
          <p>
            Copyright © {new Date().getFullYear()} by Evangelical Free Church of
            China Breezy Church. All rights reserved. Powered by{" "}
            <a
              href="https://github.com/GaryHsieh0422"
              className="hover:underline text-gray-600"
              target="_blank"
              rel="noopener noreferrer"
            >
              GaryHsieh0422
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}

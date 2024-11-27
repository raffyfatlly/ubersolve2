import React, { useState } from 'react';
import { ArrowRight, Bot, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';

const chatExamples = [
  {
    title: "AI Assistant",
    subtitle: "Powered by GPT-4",
    conversations: [
      {
        user: "I'm interested to transform my WhatsApp with AI. How many languages can it handle?",
        bot: <>Hello! 👋 Thanks for your interest! Our AI is powered by GPT-4.0, which means it can understand and respond in virtually any language worldwide! 🌍
          <p className="mt-2">Most commonly used languages include:</p>
          <ul className="list-disc ml-4 mt-1">
            <li>English 🇬🇧</li>
            <li>Bahasa Malaysia 🇲🇾</li>
            <li>Mandarin 🇨🇳</li>
            <li>Tamil 🇮🇳</li>
          </ul>
          <p className="mt-2">And many more! The AI automatically detects and responds in your customer's preferred language. ✨</p>
        </>
      },
      {
        user: "How does the AI learn about my specific business information?",
        bot: <>Great question! 🎯 We train the AI with your business data, so it becomes your perfect virtual team member! It learns everything about:
          <ul className="list-disc ml-4 mt-2">
            <li>Your products and services 📦</li>
            <li>Business policies and procedures 📋</li>
            <li>Common customer questions ❓</li>
            <li>Your brand's unique communication style 🎨</li>
          </ul>
        </>
      },
      {
        user: "Can you show me how it works in a real situation?",
        bot: <>Of course! Let's say a customer messages you in Malay asking about your latest product... 🛍️
          <p className="mt-2">The AI will:</p>
          <p className="mt-1">1️⃣ Instantly understand their query in Malay</p>
          <p className="mt-1">2️⃣ Check your current inventory and pricing</p>
          <p className="mt-1">3️⃣ Respond naturally in Malay with accurate info</p>
          <p className="mt-1">4️⃣ Handle follow-up questions about payment, delivery, etc.</p>
          <p className="mt-2">All this happens in seconds, 24/7! 🚀</p>
        </>
      },
      {
        user: "This sounds exactly what I need. How do I get started?",
        bot: <>It's super easy! 🎉 Just click the 'Start Free Trial' button above or message us directly. We'll take care of everything:
          <p className="mt-2">✨ Set up your WhatsApp Business API</p>
          <p className="mt-1">🎯 Configure your AI assistant</p>
          <p className="mt-1">🌍 Enable multi-language support</p>
          <p className="mt-1">🚀 Get you up and running in no time!</p>
        </>
      }
    ]
  },
  {
    title: "Property Rental",
    subtitle: "Villa Booking Assistant",
    conversations: [
      {
        user: "Hi, is your Penang villa pet-friendly?",
        bot: "Hi! 🐾 Yes, our Penang villa is pet-friendly! Let us know in advance if you're bringing your furry friend, so we can prepare everything for your stay."
      },
      {
        user: "What's the rate for 2 nights this weekend?",
        bot: <>💰 Rate: RM 850 per night
          <br />📅 Total for 2 nights: RM 1,700
          <p className="mt-2">Would you like to book?</p>
        </>
      },
      {
        user: "Yes, but what amenities are included?",
        bot: <>Here's what's included:
          <p className="mt-2">✅ Free Wi-Fi</p>
          <p className="mt-1">✅ Fully equipped kitchen</p>
          <p className="mt-1">✅ BBQ facilities</p>
          <p className="mt-1">✅ Private parking</p>
          <p className="mt-1">✅ Pet-friendly setup</p>
          <p className="mt-2">For a full list of amenities, click here: [www.villabooking.my/penang-amenities].</p>
        </>
      },
      {
        user: "That's great. How do I book?",
        bot: "You can book here: [www.villabooking.my/book-now]. 💡 Once payment is confirmed, check-in details will be sent via email and WhatsApp. Let me know if you need help with anything else!"
      }
    ]
  },
  {
    title: "E-commerce",
    subtitle: "Customer Support for Orders",
    conversations: [
      {
        user: "Hai, ada jual baju kurung plus size tak?",
        bot: "Hai! 😊 Kami ada koleksi baju kurung plus size yang cantik-cantik. 👉 Boleh klik sini untuk tengok: [www.shopstyle.my/plussize]. Kalau ada apa-apa nak tanya lagi, saya ada je nak bantu!"
      },
      {
        user: "Ada warna biru ke?",
        bot: <>Ya, kami ada:
          <p className="mt-1">✅ Biru navy</p>
          <p className="mt-1">✅ Biru pastel</p>
          Nak tengok gambar atau tahu saiz yang ada?
        </>
      },
      {
        user: "Gambar boleh. Saiz XXL ada?",
        bot: <>Ni gambar untuk:
          <p className="mt-2">🖼 Biru navy: [www.shopstyle.my/navy-xxl]</p>
          <p className="mt-1">🖼 Biru pastel: [www.shopstyle.my/pastel-xxl]</p>
          <p className="mt-2">Untuk saiz XXL, kedua-dua warna ada stok sekarang. Nak tambah ke troli?</p>
        </>
      },
      {
        user: "Tambah biru navy XXL. Berapa harga?",
        bot: <>Noted!
          <p className="mt-1">💰 Harga: RM 149</p>
          <p className="mt-1">🚚 Free shipping sebab lebih RM 150.</p>
          <p className="mt-2">Nak saya hantar link pembayaran?</p>
        </>
      },
      {
        user: "Okey, hantarkan.",
        bot: "Link pembayaran ni: [www.shopstyle.my/payment]. Lepas buat pembayaran, hantar resit di sini, dan kami akan proses order anda. 😊"
      }
    ]
  },
  {
    title: "Healthcare Clinic",
    subtitle: "Appointment FAQs",
    conversations: [
      {
        user: "Hi, how much is the consultation fee for new patients?",
        bot: <>Hi! 😊
          <p className="mt-1">💰 Consultation fee: RM 150</p>
          <p className="mt-2">📋 Includes:</p>
          <ul className="list-disc ml-4 mt-2">
            <li>Full health review</li>
            <li>Physical exam</li>
            <li>Personalized treatment plan</li>
          </ul>
          <p className="mt-2">If additional tests are needed, the doctor will discuss them with you.</p>
        </>
      },
      {
        user: "Can I book for this Thursday?",
        bot: <>Sure! For Thursday, we have:
          <p className="mt-2">🕒 10:00 AM</p>
          <p className="mt-1">🕒 2:30 PM</p>
          <p className="mt-1">🕒 4:00 PM</p>
          <p className="mt-2">Which one works for you?</p>
        </>
      },
      {
        user: "2:30 PM.",
        bot: <>Great! Your appointment is booked for:
          <p className="mt-2">📅 Thursday</p>
          <p className="mt-1">🕒 2:30 PM</p>
          <p className="mt-2">You'll receive a confirmation email shortly. Do you need any prep instructions?</p>
        </>
      },
      {
        user: "Yes, please.",
        bot: <>📝 No special prep is needed for general consultations.
          <p className="mt-2">✅ Arrive 15 minutes early</p>
          <p className="mt-1">✅ Bring any previous medical records</p>
          <p className="mt-2">If you'd like to see your appointment details, visit: [www.healthcheck.my/appointment-details]. Feel free to ask if you have more questions! 😊</p>
        </>
      }
    ]
  }
];

export default function Hero() {
  const [currentExample, setCurrentExample] = useState(0);

  const nextExample = () => {
    setCurrentExample((prev) => (prev + 1) % chatExamples.length);
  };

  const prevExample = () => {
    setCurrentExample((prev) => (prev - 1 + chatExamples.length) % chatExamples.length);
  };

  return (
    <header className="container mx-auto px-4 py-24">
      <div className="flex flex-col lg:flex-row items-center gap-12">
        <div className="lg:w-1/2 space-y-6">
          <div className="text-sm font-semibold text-green-500 mb-2">by Ubersolve</div>
          <h1 className="text-5xl font-bold leading-tight text-white">
            Supercharge{' '}
            <span className="text-green-500">WhatsApp Business</span>{' '}
            with AI
          </h1>
          <p className="text-xl text-gray-400">
            Make customer interactions faster, smarter and effortless - in Whatsapp
          </p>
          <div className="flex gap-4">
            <a 
              href="https://wa.link/f0ui3h" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all"
            >
              <span>Let's Build Your Chatbot</span>
              <ArrowRight size={20} />
            </a>
            <a 
              href="https://wa.link/5puj88" 
              target="_blank" 
              rel="noopener noreferrer"
              className="border border-gray-700 hover:border-green-500 px-8 py-3 rounded-lg font-semibold transition-all flex items-center gap-2"
            >
              <span>AirBnB Bot Demo</span>
              <MessageCircle size={20} />
            </a>
          </div>
        </div>
        <div className="lg:w-1/2" id="about">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg blur opacity-30"></div>
            <div className="relative bg-gray-800 p-6 rounded-lg shadow-xl">
              <div className="flex items-center justify-between border-b border-gray-700 pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <Bot className="text-green-500" size={32} />
                  <div>
                    <h3 className="font-semibold">{chatExamples[currentExample].title}</h3>
                    <p className="text-sm text-gray-400">{chatExamples[currentExample].subtitle}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={prevExample}
                    className="p-1 hover:bg-gray-700 rounded-full transition-colors"
                    aria-label="Previous example"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button 
                    onClick={nextExample}
                    className="p-1 hover:bg-gray-700 rounded-full transition-colors"
                    aria-label="Next example"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
                {chatExamples[currentExample].conversations.map((conv, idx) => (
                  <React.Fragment key={idx}>
                    <div className="bg-gray-700 p-3 rounded-lg max-w-[80%]">
                      <p>{conv.user}</p>
                    </div>
                    <div className="bg-green-500/10 p-3 rounded-lg max-w-[80%] ml-auto">
                      {conv.bot}
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
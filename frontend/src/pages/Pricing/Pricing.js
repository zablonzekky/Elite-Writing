import React from "react";
import Header from "../../shared/header/Header";
import Footer from "../Home/components/Footer";

const faqList = [
  {
    question: "What is included in your CV writing service?",
    answer:
      "We craft a modern, ATS-optimized CV tailored to your career goals, using compelling language and a professional layout.",
  },
  {
    question: "How long does it take to get my documents?",
    answer:
      "Turnaround time is usually 2–3 business days. Express delivery options are available at checkout.",
  },
  {
    question: "Can I request revisions?",
    answer:
      "Absolutely! All our services come with up to 2 free revisions within 7 days of delivery.",
  },
  {
    question: "Do you offer LinkedIn profile optimization separately?",
    answer:
      "Yes. We offer LinkedIn optimization as a standalone service or bundled with CV and cover letter writing.",
  },
  {
    question: "Is your service confidential?",
    answer:
      "Yes. Your data is secure and handled with strict confidentiality.",
  },
];

const FAQs = () => {
  return (
    <>
      <Header />
      <div className="container py-5">
        <h1 className="text-center mb-4">Frequently Asked Questions</h1>
        <div className="accordion" id="faqAccordion">
          {faqList.map((faq, index) => (
            <div className="accordion-item mb-3" key={index}>
              <h2 className="accordion-header" id={`heading-${index}`}>
                <button
                  className={`accordion-button ${index !== 0 ? "collapsed" : ""}`}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse-${index}`}
                  aria-expanded={index === 0}
                  aria-controls={`collapse-${index}`}
                >
                  {faq.question}
                </button>
              </h2>
              <div
                id={`collapse-${index}`}
                className={`accordion-collapse collapse ${index === 0 ? "show" : ""}`}
                aria-labelledby={`heading-${index}`}
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">{faq.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FAQs;

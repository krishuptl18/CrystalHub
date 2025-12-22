import React from "react";
import "../style/Contact.css";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

const Contact = () => {
  return (
    <>
   <Header/>
    <section className="contact-page py-5 mt-5">
      <div className="container ">

        {/* Heading */}
        <div className="text-center mb-5 ">
          <h2 className="fw-bold mt-5">Contact Us</h2>
          <p className="text-muted">
            We’d love to hear from you. Get in touch with us!
          </p>
        </div>

        <div className="row g-4">

          {/* Contact Info */}
          <div className="col-lg-4">
            <div className="contact-info p-4 h-100">
              <h5 className="mb-3">Get In Touch</h5>

              <p>
                <i className="bi bi-geo-alt-fill"></i>
                Ahmedabad, Gujarat, India
              </p>

              <p>
                <i className="bi bi-envelope-fill"></i>
                support@crystalhub.com
              </p>

              <p>
                <i className="bi bi-telephone-fill"></i>
                +91 98765 43210
              </p>

              <div className="social-icons mt-4">
                <i className="bi bi-facebook"></i>
                <i className="bi bi-instagram"></i>
                <i className="bi bi-whatsapp"></i>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-lg-8">
            <div className="contact-form p-4">
              <form>
                <div className="row g-3">

                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Your Name"
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Your Email"
                      required
                    />
                  </div>

                  <div className="col-12">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Subject"
                    />
                  </div>

                  <div className="col-12">
                    <textarea
                      className="form-control"
                      rows="5"
                      placeholder="Your Message"
                      required
                    ></textarea>
                  </div>

                  <div className="col-12 text-end">
                    <button type="submit" className="btn btn-dark px-4">
                      Send Message
                    </button>
                  </div>

                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
    <Footer/>
     </>
  );
};

export default Contact;

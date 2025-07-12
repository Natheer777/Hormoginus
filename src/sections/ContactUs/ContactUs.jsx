import './ContactUs.css';
import { useState } from 'react';

export default function ContactUs() {
    const [sent, setSent] = useState(false);
    const [form, setForm] = useState({ name: '', email: '', comment: '' });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSent(true);
        setForm({ name: '', email: '', comment: '' });
    };

    return (
        <div className="contact-section glass-bg">
            <div className="container contact-container">
                <div className="row">
                    <div className="col-xl-6 col-lg-6 contact-info mb-4">
                        <h1 className="contact-title-alt">Let's Connect</h1>
                        <p className="contact-desc-alt">
                            Have a question or feedback? Reach out and our team will get back to you soon!
                        </p>
                    </div>
                    <div className="col-xl-6 col-lg-6 contact-form-card">
                        <div className="contact-card-alt">
                            {!sent ? (
                                <form onSubmit={handleSubmit} autoComplete="off">
                                    <h2 className="contact-card-title-alt">Contact Us</h2>
                                    <label htmlFor="name">Name</label>
                                    <input type="text" id="name" name="name" value={form.name} onChange={handleChange} placeholder="Enter your name" required />
                                    <label htmlFor="email">Email</label>
                                    <input type="email" id="email" name="email" value={form.email} onChange={handleChange} placeholder="Enter your email" required />
                                    <label htmlFor="comment">Comment</label>
                                    <textarea id="comment" name="comment" value={form.comment} onChange={handleChange} placeholder="Enter your message" rows={4} required></textarea>
                                    <button type="submit" className="contact-submit-alt">Send Message</button>
                                </form>
                            ) : (
                                <div className="success-message">
                                    <span role="img" aria-label="success" className="success-icon">✅</span>
                                    <p>Your notes have been successfully sent!</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 
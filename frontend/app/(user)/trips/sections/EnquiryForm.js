"use client";
import { useState } from "react";
import styles from "./EnquiryForm.module.css";

const EnquiryForm=()=> {
  const [form, setForm] = useState({ name: "", phone: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Enquiry submitted!\nName: ${form.name}\nPhone: ${form.phone}`);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Don’t Just Dream, Travel! 🔥</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter your name*"
          value={form.name}
          onChange={handleChange}
          className={styles.input}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Enter your phone number*"
          value={form.phone}
          onChange={handleChange}
          className={styles.input}
          required
        />
        <button type="submit" className={styles.button}>
          ENQUIRE NOW
        </button>
      </form>
    </div>
  );
}
export default EnquiryForm ;

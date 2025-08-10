// src/components/ContactForm.jsx
import React from 'react';

const ContactForm = ({ propertyCode }) => {
  const handleSubmit = (event) => {
    event.preventDefault(); // Previene que la página se recargue
    // Por ahora, solo mostraremos una alerta. En el futuro, esto enviaría un email.
    alert(`Formulario enviado para el inmueble con código: ${propertyCode}. ¡Gracias!`);
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <h4>Contacta a un Asesor</h4>
      <p>¿Interesado en este inmueble? Déjanos tus datos.</p>
      <div className="form-group">
        <label htmlFor="name">Nombre</label>
        <input type="text" id="name" required />
      </div>
      <div className="form-group">
        <label htmlFor="email">Correo Electrónico</label>
        <input type="email" id="email" required />
      </div>
      <div className="form-group">
        <label htmlFor="phone">Teléfono</label>
        <input type="tel" id="phone" required />
      </div>
      <div className="form-group">
        <label htmlFor="message">Mensaje</label>
        <textarea id="message" rows="4" defaultValue={`Hola, estoy interesado/a en el inmueble con código ${propertyCode}.`}></textarea>
      </div>
      <button type="submit" className="submit-button">Enviar Mensaje</button>
    </form>
  );
};

export default ContactForm;
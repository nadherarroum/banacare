import { FaFacebookSquare, FaPhoneAlt } from 'react-icons/fa';
import { AiFillInstagram } from 'react-icons/ai';

const contacts = [
  {
    title: 'Call Us',
    description: '964 123 123 1234',
    icon: <FaPhoneAlt />,
    link: 'tel:124fd',
  },

  {
    title: 'Instagram',
    description: '@bana-care',
    icon: <AiFillInstagram />,
    link: 'https://www.instagram.com/',
  },

  {
    title: 'Facebook',
    description: '@bana-care',
    icon: <FaFacebookSquare />,
    link: 'https://www.facebook.com/',
  },
];

const Contact = () => {
  return (
    <div>
      {/* Hero */}
      <section className="subpage-hero contact">
        <div className="container py-5">
          <div>
            <h1>Contact</h1>
          </div>
        </div>
      </section>

      {/* Contact Boxes */}
      <section className="contacts container section-y-padding">
        <div className="row text-center">
          {contacts.map((contact) => (
            <div key={contact.title} className="col-lg-4 px-2">
              <div className="p-3 contact-box">
                <a href={contact.link} target="_blank" rel="noreferrer">
                  <div className="pb-3">{contact.icon}</div>

                  <h3 className="color-blue-dark">{contact.title}</h3>
                  <p>{contact.description}</p>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Contact;

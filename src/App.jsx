import Navbar from "./components/Navbar";
import Search from "./components/Search";
import ContactCard from "./components/ContactCard";
import { useEffect, useState } from "react";
import AddAndUpdateContact from "./components/AddAndUpdateContact";
import useDisclouse from "./hooks/useDisclouse";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFoundContact from "./components/NotFoundContact";

const App = () => {
  const [contact, setContect] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclouse();

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactRef = collection(db, "contacts");
        onSnapshot(contactRef, (snapshot) => {
          const contactList = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setContect(contactList);
          return contactList;
        });
      } catch (error) {
        console.log(error);
      }
    };
    getContacts();
  }, []);

  const filterContact = (e) => {
    const value = e.target.value;
    const contactRef = collection(db, "contacts");
    onSnapshot(contactRef, (snapshot) => {
      const contactList = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      const filteredContacts = contactList.filter((contact) =>
        contact.name.toLowerCase().includes(value.toLowerCase())
      );
      setContect(filteredContacts);
      return filteredContacts;
    });
  };

  return (
    <>
      <div className=" mx-auto max-w-[361px] ">
        <Navbar />
        <Search onOpen={onOpen} filterContact={filterContact} />
        {contact.length<= 0 ? <NotFoundContact /> : contact.map((contact) => (
          <ContactCard key={contact.id} contact={contact} />
        ))}
      </div>
      <AddAndUpdateContact isOpen={isOpen} onClose={onClose} />
      <ToastContainer position="bottom-center" />
    </>
  );
};

export default App;

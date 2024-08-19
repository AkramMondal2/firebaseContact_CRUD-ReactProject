import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";
import { HiOutlineUserCircle } from "react-icons/hi";
import { RiEditCircleLine } from "react-icons/ri";
import { IoMdTrash } from "react-icons/io";
import AddAndUpdateContact from "./AddAndUpdateContact";
import useDisclouse from "../hooks/useDisclouse";
import { toast } from "react-toastify";

const ContactCard = ({ contact }) => {
  const { isOpen, onOpen, onClose } = useDisclouse();

  const deleteContact = async (id) => {
    try {
      await deleteDoc(doc(db, "contacts", id));
      toast.success("Contact Deleted Succesfuly")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        key={contact.id}
        className="flex items-center justify-between bg-yellow-300 p-2 rounded-lg mt-3"
      >
        <div className="flex items-center gap-1">
          <HiOutlineUserCircle className=" text-orange-500 text-4xl" />
          <div>
            <h2 className=" font-medium">{contact.name}</h2>
            <p className="text-sm">{contact.email}</p>
          </div>
        </div>
        <div className="flex text-4xl">
          <RiEditCircleLine onClick={onOpen} className=" cursor-pointer" />
          <IoMdTrash
            onClick={() => deleteContact(contact.id)}
            className=" text-orange-500 cursor-pointer"
          />
        </div>
      </div>
      <AddAndUpdateContact
        contact={contact}
        isUpdate
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};

export default ContactCard;

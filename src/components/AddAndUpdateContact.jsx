import React from "react";
import Modal from "./Modal";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { toast } from "react-toastify";
import * as Yup from "yup"

const contactSchemaValidation = Yup.object().shape({
  name:Yup.string().required("Name is Required"),
  email:Yup.string().email("Invalid Email").required("Email is Required")
})

const AddAndUpdateContact = ({ isOpen, onClose, isUpdate, contact }) => {
  const addContact = async (contact) => {
    try {
      const contactRef = collection(db, "contacts");
      await addDoc(contactRef, contact);
      onClose();
      toast.success("Contact Added Succesfuly")
    } catch (error) {
      console.log(error);
    }
  };

  const updateContact = async (contact, id) => {
    try {
      const contactRef = doc(db, "contacts", id);
      await updateDoc(contactRef, contact);
      onClose();
      toast.success("Contact Update Succesfuly")
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Formik
         validationSchema={contactSchemaValidation}
          initialValues={
            isUpdate
              ? {
                  name: contact.name,
                  email: contact.email,
                }
              : {
                  name: "",
                  email: "",
                }
          }
          onSubmit={(values) => {
            isUpdate ? updateContact(values, contact.id) : addContact(values);
          }}
        >
          <Form className=" flex flex-col gap-2">
            <div className=" flex flex-col">
              <label htmlFor="name" className=" font-medium">
                NAME
              </label>
              <Field
                name="name"
                className=" h-10 border-solid border-2 border-black p-2"
              />
              <div className="text-xs text-red-500">
                <ErrorMessage name="name"/>
              </div>
            </div>
            <div className=" flex flex-col">
              <label htmlFor="email" className=" font-medium">
                Email
              </label>
              <Field
                name="email"
                type="email"
                className=" h-10 border-solid border-2 border-black p-2"
              />
               <div className="text-xs text-red-500">
                <ErrorMessage name="email"/>
              </div>
            </div>
            <button
              type="submit"
              className=" bg-orange-500 px-3 py-1.5 border-solid border-2 border-black p-1 font-medium self-end"
            >
              {isUpdate ? "update" : "add"} contact
            </button>
          </Form>
        </Formik>
      </Modal>
    </div>
  );
};

export default AddAndUpdateContact;

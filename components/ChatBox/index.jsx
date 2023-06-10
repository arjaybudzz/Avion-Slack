"use client"
import { useEffect, useState } from "react";
import { MdSend } from "react-icons/md";
import {useCreateMessage} from "@/app/dataService";
import "./index.css"

export default function ChatBox({ id, type }) {
  const { mutate } = useCreateMessage(id);

  const [values, setValues] = useState({
    receiver_id: id,
    receiver_class: type,
    body: "",
  });

  useEffect(() => {
    setValues({ ...values, receiver_id: id });
  }, [id]);

  function handleSubmit(e) {
    e.preventDefault();
    mutate(values);
    setValues({ ...values, body: "" });
  }
  return (
    <div className="main-cont">
      <form className="form-cont" 
      onSubmit={handleSubmit}
      >
        <div className="text-box">
          <input
            type="text"
            placeholder="Message Channel name"
            value={values.body}
            onChange={(e) => setValues({ ...values, body: e.target.value })}
          />
        <div className="attatchments">
          <button>
            <MdSend className="fill-white text-xl" />
          </button>
        </div>
        </div>
        
      </form>
    </div>
  );
}

"use client"

import { useState } from "react";
import Select, { createFilter } from "react-select";
import ErrorMessage from "@/components/ErrorMessage";
import {useUsers} from "@/app/dataService";
import { getStoredUser } from "@/storage/storeData";
import { useCreateChannel } from "@/app/dataService";
import { useRouter } from "next/navigation";

export default function ChannelForm() {
  const router = useRouter();
  const currentUser = getStoredUser();
  const [userIds, setUserIds] = useState([currentUser.data.id]);
  const [title, setTitle] = useState("");

  const { users, userOptions } = useUsers();

  const {
          isLoading,
          mutate,
          isSuccess,
          isError,
          error,
        } = useCreateChannel();

  const selectedUsers = users.filter((user) => {
           return userIds.includes(user.id);
        });

  const handleSelect = (opt) => {
        setUserIds([...userIds,opt.value,]);
        };

  const handleCancel = (id) => {
        setUserIds(userIds.filter((userId) => userId !== id),);
        };

  const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
              name: title,
              user_ids: userIds,
                      };
        mutate(data, {onSuccess: ({ data }) => {
              if (data) {
              return router.push(`dashboard/channels/${data.id}`);
                }
              },});
          };

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1> Create New Channel </h1>
        {isSuccess ? <div>Channel Successfully Created!</div> : null}
        {isError ? <ErrorMessage errors={error} /> : null}

        <div>
          <div>
            <label htmlFor="name">Channel Name:</label>
            <input 
              type="text"
              placeholder="Enter Channel Name"
              id="name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password">Add A User:</label>
            <Select
              options={userOptions}
              onChange={(opt) => handleSelect(opt)}
              filterOption={createFilter({ ignoreAccents: false })}
            />
          </div>

          <div>
            <h3 >Users:</h3>
            <div>
              {selectedUsers.map((user) => {
                return (
                  <div key={user.id} >
                    <p>{user.email}</p>
                    <button type="button" onClick={() => handleCancel(user.id)}> X </button>
                  </div>)
                  })}
            </div>
          </div>
          <button type="submit" > Create new Channel </button>
        </div>
      </form>
    </div>
  );
}
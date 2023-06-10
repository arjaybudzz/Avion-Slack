"use client"
import {useUsers, useChannelDetails, useInviteUser} from "@/app/dataService";
import Select, { createFilter } from "react-select";
import { useState } from "react";
import { useParams } from 'next/navigation'

export default function ChannelInvite() {
  const { id } = useParams();
  const { details } = useChannelDetails(id);
  const { userOptions, users } = useUsers();
  const [selected, setSelected] = useState({});
  const membersId = details.channel_members?.map((user) => user.user_id);
  const members = users?.filter((user) => membersId?.includes(user.id));
  const { mutate } = useInviteUser(id);

  function handleSelect(opt) {
    setSelected(opt);
  }

  function handleInvite() {
    mutate({
      id: id,
      member_id: selected.value,
    }, {
      onSuccess: () => {
        setSelected({});
      },
    });
  }

  return (
    <div>
      <div >
        Invite User:
      </div>
      <Select
        options={userOptions}
        onChange={(opt) => handleSelect(opt)}
        filterOption={createFilter({ ignoreAccents: false })}
      />
      <div >
        <p>selected: {selected.label}</p>
      </div>
      <button onClick={handleInvite} >
        Invite user
      </button>

      <div >
        <p >members:</p>
        {members.map((user) => {
          return (
            <div key={user.id}>
              <div className="flex gap-2">
                <p>{user.email}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
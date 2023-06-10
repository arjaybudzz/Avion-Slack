"use client"

import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import * as API from "./api/route";
import { setStoredUser } from "@/storage/storeData";

export function useChannelDetails(id, type) {
  const { data } = useQuery(
    ["details", `${id}`],
    () => API.fetchChannelDetails(id, type),
  );
  const [details, setDetails] = useState([]);

  useEffect(() => {
    if (data) {
      setDetails(data.data);
    }
  }, [data]);

  return { data, details };
}

export function useChannels() {
  return useQuery("channels", API.fetchChannels);
}

export function useCreateChannel() {
  const queryClient = useQueryClient();
  return useMutation(API.createChannel, {
    onSettled: () => {
      queryClient.invalidateQueries("channels");
    },
  });
}

export function useCreateMessage(id) {
  const queryClient = useQueryClient();
  return useMutation(API.createMessage, {
    onSettled: () => {
      queryClient.invalidateQueries("messages", `${id}`);
    },
  });
}
export function useCreateUser() {
  return useMutation(API.registerUser);
}

export function useInviteUser(id) {
  const queryClient = useQueryClient();
  return useMutation(API.inviteUser, {
    onSettled: () => {
      queryClient.invalidateQueries("details", `${id}`);
    },
  });
}

export function useLoginUser() {
  return useMutation(API.loginUser, {
    onSuccess: (data) => {
      setStoredUser({
        ...data.data,
        headers: data.headers,
      });
    },
  });
}

export function useMessages(id, type) {
  const { data } = useQuery(
    ["messages", `${id}`],
    () => API.fetchMessages(id, type),
    {
      refetchInterval: 1000,
    }
  );
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (data) {
      setMessages(data.data);
    }
  }, [data]);

  return { data, messages };
}

export function useUsers() {
  const { data } = useQuery("users", API.fetchUsers);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data]);

  const userOptions = users.map((user) => {
    return {
      value: user.id,
      label: user.email,
    };
  });

  return { users, userOptions };
}
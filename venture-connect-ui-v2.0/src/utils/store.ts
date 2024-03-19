import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { produce } from 'immer';
import { v4 as uuid } from 'uuid';
import io from 'socket.io-client';
const socket = io('http://localhost:3001');
interface UserStoreType {
    currentUser: { [key: string]: any };
    allUsers: { [key: string]: any }[];
    setCurrentUser: (userdetails: { [key: string]: any }) => void;
    setAllUsers: (users: { [key: string]: any }[]) => void;
    socket: any;
}
export const useUserStore = create<UserStoreType>()(
    immer((set) => ({
        currentUser: {},
        allUsers: [],
        setCurrentUser: (currentUser) =>
            set(
                produce((draft: UserStoreType) => {
                    draft.currentUser = currentUser;
                })
            ),
        setAllUsers: (users) =>
            set(
                produce((draft: UserStoreType) => {
                    draft.allUsers = users;
                })
            ),
        socket: socket,
    }))
);



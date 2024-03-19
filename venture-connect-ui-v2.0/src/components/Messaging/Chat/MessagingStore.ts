import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { produce } from 'immer';

interface Conversation {
    group_key: string;
    room_id: string;
    profileImages: string[]; 
    lastReadMessage: string;
}

interface ConversationsType {
    conversations: Conversation[];
    setConversations: (conversations: Conversation[], reset: number) => void;
    cursorVal: number | null;
    setCursorVal: (cursorVal: number | null) => void;
    scroll: boolean | true;
    maxScroll: number | 0;
    setMaxScroll: (maxScroll: number | null) => void;
    setScroll: (scroll: boolean | true) => void;
    showIndicator: boolean | true;
    setShowIndicator: (showIndicator: boolean | true) => void;
}


export const useMessagingStore = create<ConversationsType>()(
    immer((set) => ({
        conversations: [],
        cursorVal: null,
        scroll: true,
        maxScroll: 0,
        showIndicator: true,
        setMaxScroll: (maxScroll) =>
            set(
                produce((draft: ConversationsType) => {
                    draft.maxScroll = maxScroll;
                })
            ),
        setCursorVal: (cursorVal) =>
            set(
                produce((draft: ConversationsType) => {
                    draft.cursorVal = cursorVal;
                })
            ),
        setScroll: (scroll) =>
            set(
                produce((draft: ConversationsType) => {
                    draft.scroll = scroll;
                })
            ),
        setShowIndicator: (showIndicator) =>
        set(
            produce((draft: ConversationsType) => {
                draft.showIndicator = showIndicator;
            })
        ),
        setConversations: (newConversations: Conversation[], reset: number) =>
            set(
                produce((draft: ConversationsType) => {
                    if (reset === 1) {
                        draft.conversations = newConversations;
                    } else {
                        draft.conversations = [
                            ...draft.conversations,
                            ...newConversations
                        ];
                    }
                })
            )
    }))
);

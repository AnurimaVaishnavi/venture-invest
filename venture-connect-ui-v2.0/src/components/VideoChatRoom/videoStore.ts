import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { produce } from 'immer';
import { v4 as uuid } from 'uuid';
interface VideoType {
}
export const useVideoStore = create<VideoType>()(
    immer((set) => ({
    }))
);

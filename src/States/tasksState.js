import { atom } from "recoil";
import localStorageEffect from "../Effects/localStorageEffect";

export const tasksState = atom({
	key: "tasksState",
	default: [],
	effects_UNSTABLE: [localStorageEffect("tasksData")],
});

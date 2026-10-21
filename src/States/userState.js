import { atom } from "recoil";
import localStorageEffect from "../Effects/localStorageEffect";

export const userState = atom({
    key: "userState",
    default: {},
    effects_UNSTABLE: [localStorageEffect("userData")]
})